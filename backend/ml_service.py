import json
import io
import numpy as np
from PIL import Image
import os
import tensorflow as tf
from tensorflow import keras

# Monkey-patch Dense.__init__ untuk mengabaikan parameter quantization_config yang tidak dikenal
original_dense_init = keras.layers.Dense.__init__

def patched_dense_init(self, *args, **kwargs):
    kwargs.pop("quantization_config", None)
    original_dense_init(self, *args, **kwargs)

keras.layers.Dense.__init__ = patched_dense_init

# Kelas untuk klasifikasi gambar
class InsectClassifier:
    def __init__(self, model_path):
        # Memuat model TensorFlow/Keras (.keras)
        self.model = keras.models.load_model(model_path, compile=False)

        # Memuat metadata kelas
        metadata_path = os.path.join(os.path.dirname(model_path), "model_metadata.json")
        with open(metadata_path, 'r') as f:
            metadata = json.load(f)
            
        self.class_names = metadata["class_names"]
        self.img_size = metadata.get("img_size", 224)

    def predict(self, image_bytes, top_k=1):
        # Memuat dan praproses gambar agar sesuai dengan EfficientNet Keras
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((self.img_size, self.img_size))
        
        # Mengubah ke array numpy (H, W, C) dan menambahkan batch dimension (1, H, W, C)
        img_array = np.array(image)
        img_array = np.expand_dims(img_array, axis=0)

        # Preprocessing khusus untuk arsitektur EfficientNet bawaan Keras
        img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)

        # Melakukan prediksi
        preds = self.model.predict(img_array)[0]
        
        # Mendapatkan index dari probabilitas tertinggi (top-k)
        top_indices = np.argsort(preds)[-top_k:][::-1]
        
        predictions = []
        for i in range(top_k):
            class_idx = top_indices[i]
            prob = preds[class_idx]
            class_name = self.class_names[class_idx]
            predictions.append({
                "class_name": class_name,
                "confidence": float(prob)
            })

        return predictions
