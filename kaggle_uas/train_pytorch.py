import os
import copy
import time
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from PIL import Image

def main():
    # ==========================
    # 1. KONFIGURASI PARAMETER
    # ==========================
    # Sesuaikan path dataset sesuai struktur direktori di Kaggle
    data_dir = '/kaggle/input/insect-dataset' # Ganti dengan path dataset Anda
    output_dir = '/kaggle/working/artifacts'
    os.makedirs(output_dir, exist_ok=True)

    input_size = 224
    batch_size = 32
    num_epochs = 20
    patience = 5  # Untuk Early Stopping
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"Menggunakan device: {device}")

    # ==========================
    # 2. PREPROCESSING & AUGMENTASI
    # ==========================
    # Menangani gambar rusak (Opsional tapi disarankan)
    def pil_loader(path):
        with open(path, 'rb') as f:
            img = Image.open(f)
            return img.convert('RGB')

    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(input_size),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(input_size),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    print("Memuat dataset...")
    # Pastikan folder dataset memiliki subfolder 'train' dan 'val'
    train_dir = os.path.join(data_dir, 'train')
    val_dir = os.path.join(data_dir, 'val')

    if not os.path.exists(train_dir) or not os.path.exists(val_dir):
        print("Folder 'train' atau 'val' tidak ditemukan. Harap pastikan dataset sudah terstruktur dengan benar.")
        return

    image_datasets = {
        'train': datasets.ImageFolder(train_dir, data_transforms['train'], loader=pil_loader),
        'val': datasets.ImageFolder(val_dir, data_transforms['val'], loader=pil_loader)
    }

    dataloaders = {
        'train': DataLoader(image_datasets['train'], batch_size=batch_size, shuffle=True, num_workers=4),
        'val': DataLoader(image_datasets['val'], batch_size=batch_size, shuffle=False, num_workers=4)
    }

    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'val']}
    class_names = image_datasets['train'].classes
    num_classes = len(class_names)
    print(f"Jumlah Kelas: {num_classes}")

    # ==========================
    # 3. MEMBANGUN MODEL (Transfer Learning)
    # ==========================
    print("Membangun model EfficientNet-B3...")
    model = models.efficientnet_b3(weights=models.EfficientNet_B3_Weights.DEFAULT)
    
    # Freeze semua layer awal
    for param in model.parameters():
        param.requires_grad = False

    # Ganti classification head sesuai jumlah kelas kita
    num_ftrs = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_ftrs, num_classes)
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    # Hanya train layer classifier terlebih dahulu
    optimizer = optim.Adam(model.classifier.parameters(), lr=0.001)

    # ==========================
    # 4. PROSES TRAINING & EARLY STOPPING
    # ==========================
    since = time.time()
    best_model_wts = copy.deepcopy(model.state_dict())
    best_acc = 0.0
    epochs_no_improve = 0
    history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}

    print("Memulai Training...")
    for epoch in range(num_epochs):
        print(f'Epoch {epoch+1}/{num_epochs}')
        print('-' * 10)

        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
            else:
                model.eval()

            running_loss = 0.0
            running_corrects = 0

            for inputs, labels in dataloaders[phase]:
                inputs = inputs.to(device)
                labels = labels.to(device)

                optimizer.zero_grad()

                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)

                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            epoch_loss = running_loss / dataset_sizes[phase]
            epoch_acc = running_corrects.double() / dataset_sizes[phase]

            if phase == 'train':
                history['train_loss'].append(epoch_loss)
                history['train_acc'].append(epoch_acc.item())
            else:
                history['val_loss'].append(epoch_loss)
                history['val_acc'].append(epoch_acc.item())

            print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

            # Early Stopping Check
            if phase == 'val':
                if epoch_acc > best_acc:
                    best_acc = epoch_acc
                    best_model_wts = copy.deepcopy(model.state_dict())
                    epochs_no_improve = 0
                else:
                    epochs_no_improve += 1

        if epochs_no_improve == patience:
            print("Early stopping terpicu!")
            break
        print()

    time_elapsed = time.time() - since
    print(f'Training selesai dalam {time_elapsed // 60:.0f}m {time_elapsed % 60:.0f}s')
    print(f'Best val Acc: {best_acc:4f}')

    # Load best model weights
    model.load_state_dict(best_model_wts)

    # ==========================
    # 5. EVALUASI MODEL
    # ==========================
    print("Mengevaluasi model pada validation set...")
    model.eval()
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for inputs, labels in dataloaders['val']:
            inputs = inputs.to(device)
            labels = labels.to(device)
            outputs = model(inputs)
            _, preds = torch.max(outputs, 1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())

    print("\nClassification Report:")
    print(classification_report(all_labels, all_preds, target_names=class_names))

    # ==========================
    # 6. EKSPOR MODEL & METADATA
    # ==========================
    print("Mengekspor model ke TorchScript...")
    model.eval()
    example_input = torch.rand(1, 3, input_size, input_size).to(device)
    traced_script_module = torch.jit.trace(model, example_input)
    traced_script_module.save(os.path.join(output_dir, "model_torchscript.pt"))

    print("Menyimpan Metadata...")
    metadata = {
        "model_name": "efficientnet_b3",
        "num_classes": num_classes,
        "img_size": input_size,
        "class_names": class_names
    }
    with open(os.path.join(output_dir, "model_metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print("Selesai! File 'model_torchscript.pt' dan 'model_metadata.json' telah tersimpan.")

if __name__ == '__main__':
    main()