import os
import argparse
import random
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import pandas as pd
import pathlib


def parse_args():
    p = argparse.ArgumentParser(description='Train transfer-learning model (Kaggle-friendly)')
    p.add_argument('--data-dir', default=os.environ.get('DATA_DIR', 'dataset'), help='Path to dataset root')
    p.add_argument('--img-size', type=int, default=224)
    p.add_argument('--batch-size', type=int, default=32)
    p.add_argument('--epochs', type=int, default=20)
    p.add_argument('--seed', type=int, default=42)
    return p.parse_args()


def main():
    args = parse_args()
    BASE_DIR = args.data_dir
    TRAIN_DIR = os.path.join(BASE_DIR, 'train')
    VAL_DIR = os.path.join(BASE_DIR, 'val')
    TEST_DIR = os.path.join(BASE_DIR, 'test')

    SEED = args.seed
    tf.random.set_seed(SEED)
    np.random.seed(SEED)
    random.seed(SEED)

    IMG_SIZE = (args.img_size, args.img_size)
    BATCH_SIZE = args.batch_size
    AUTOTUNE = tf.data.AUTOTUNE

    classes_file = os.path.join(BASE_DIR, 'classes.txt')
    if os.path.exists(classes_file):
        with open(classes_file, 'r', encoding='utf-8') as f:
            class_names = [c.strip() for c in f.read().splitlines() if c.strip()]
    else:
        class_names = sorted([d for d in os.listdir(TRAIN_DIR) if os.path.isdir(os.path.join(TRAIN_DIR, d))])
    NUM_CLASSES = len(class_names)
    print('Using data dir:', BASE_DIR)
    print('Found classes:', NUM_CLASSES)

    train_ds = tf.keras.utils.image_dataset_from_directory(
        TRAIN_DIR,
        labels='inferred',
        label_mode='int',
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=True,
        seed=SEED,
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        VAL_DIR,
        labels='inferred',
        label_mode='int',
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=False,
    )

    train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

    data_augmentation = keras.Sequential([
        layers.RandomFlip('horizontal'),
        layers.RandomRotation(0.1),
        layers.RandomZoom(0.1),
    ], name='data_augmentation')

    preprocess_input = tf.keras.applications.efficientnet.preprocess_input
    base_model = tf.keras.applications.EfficientNetB0(include_top=False, input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3), weights='imagenet')
    base_model.trainable = False

    inputs = keras.Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3))
    x = data_augmentation(inputs)
    x = preprocess_input(x)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(NUM_CLASSES, activation='softmax')(x)
    model = keras.Model(inputs, outputs)

    model.compile(optimizer=keras.optimizers.Adam(learning_rate=1e-3),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    checkpoint_path = os.environ.get('CHECKPOINT_PATH', 'best_model.h5')
    callbacks = [
        keras.callbacks.ModelCheckpoint(checkpoint_path, save_best_only=True, monitor='val_accuracy', mode='max'),
        keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-6),
        keras.callbacks.EarlyStopping(monitor='val_loss', patience=6, restore_best_weights=True),
    ]

    history = model.fit(train_ds, validation_data=val_ds, epochs=args.epochs, callbacks=callbacks)

    base_model.trainable = True
    fine_tune_at = 150
    for layer in base_model.layers[:fine_tune_at]:
        layer.trainable = False

    model.compile(optimizer=keras.optimizers.Adam(learning_rate=1e-5),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    ft_epochs = max(5, args.epochs // 4)
    model.fit(train_ds, validation_data=val_ds, epochs=args.epochs + ft_epochs, initial_epoch=history.epoch[-1] if hasattr(history, 'epoch') else 0, callbacks=callbacks)

    from sklearn.metrics import confusion_matrix, classification_report, f1_score

    y_true = []
    y_pred = []
    for images, labels in val_ds:
        preds = model.predict(images)
        y_true.extend(labels.numpy().tolist())
        y_pred.extend(np.argmax(preds, axis=1).tolist())

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    cm = confusion_matrix(y_true, y_pred)
    print('Confusion matrix shape:', cm.shape)
    print(classification_report(y_true, y_pred, target_names=class_names))
    print('Macro F1:', f1_score(y_true, y_pred, average='macro'))

    save_dir = os.environ.get('OUTPUT_DIR', '/kaggle/working')
    os.makedirs(save_dir, exist_ok=True)
    model.save(os.path.join(save_dir, 'final_model'))
    print('Saved final_model to', os.path.join(save_dir, 'final_model'))

    test_images = list(pathlib.Path(TEST_DIR).rglob('*.jpg')) + list(pathlib.Path(TEST_DIR).rglob('*.png'))
    test_images = sorted(test_images)
    if len(test_images) > 0:
        file_paths = [str(p) for p in test_images]

        def load_and_preprocess(path):
            img = tf.io.read_file(path)
            img = tf.image.decode_image(img, channels=3)
            img = tf.image.resize(img, IMG_SIZE)
            img = tf.cast(img, tf.float32)
            img = preprocess_input(img)
            return img

        test_ds = tf.data.Dataset.from_tensor_slices(file_paths)
        test_ds = test_ds.map(lambda x: load_and_preprocess(x), num_parallel_calls=AUTOTUNE)
        test_ds = test_ds.batch(BATCH_SIZE).prefetch(AUTOTUNE)
        preds = model.predict(test_ds)
        pred_idxs = np.argmax(preds, axis=1)
        label_map = {i: n for i, n in enumerate(class_names)}
        results = pd.DataFrame({'file': file_paths, 'pred': [label_map[i] for i in pred_idxs]})
        out_csv = os.path.join(save_dir, 'test_predictions.csv')
        results.to_csv(out_csv, index=False)
        print('Saved', out_csv)


if __name__ == '__main__':
    main()
