# 🧠 Kaggle UAS Pack: AI Training Experiments

Folder ini didedikasikan secara khusus untuk **proses eksperimen dan pelatihan model *Machine Learning*** (Training Phase) yang dilakukan di platform seperti Kaggle atau Google Colab. Folder ini terpisah dari *backend* utama agar kode *production* (inferensi API) tidak tercampur dengan kode untuk riset.

## 📁 Daftar Isi Folder

### 1. 📓 `training-insect.ipynb` (Utama)
Ini adalah **Jupyter Notebook** yang berisi seluruh tahapan eksperimen secara interaktif dan terdokumentasi dengan sangat baik. Di dalamnya terdapat proses:
- Pembersihan Dataset (*Data Cleaning*)
- Augmentasi Gambar
- Membangun Arsitektur *Transfer Learning* (EfficientNetB0)
- Pelatihan Model & Visualisasi Metrik (Akurasi/Loss)

Sangat disarankan untuk membaca dan mempresentasikan file ini karena setiap tahapan sudah memiliki penjelasan (Markdown) mengenai tujuan pembuatannya.

### 2. 🐍 `train.py` (TensorFlow/Keras)
Skrip Python (*Command-Line Interface*) yang berfungsi sama seperti Notebook di atas, namun dirancang untuk **dieksekusi langsung melalui terminal**. Sangat efisien jika Anda ingin menjalankan training secara otomatis tanpa harus membuka antarmuka Jupyter.

### 3. 🔥 `train_pytorch.py` (PyTorch)
Skrip eksperimental alternatif bagi Anda yang ingin membandingkan kinerja model jika dilatih menggunakan *framework* **PyTorch** alih-alih TensorFlow. Kode ini siap digunakan untuk bereksperimen dengan model PyTorch.

### 4. ⚙️ `run_kaggle.sh`
*Bash script* (skrip terminal) yang dirancang untuk menjalankan proses training secara *batch*. Sangat berguna apabila Anda ingin men-deploy sesi *training* ke mesin Cloud atau Virtual Machine Kaggle hanya dengan satu baris perintah.

### 5. 📦 `requirements.txt`
Daftar pustaka/dependensi Python (seperti `tensorflow`, `torch`, `matplotlib`) yang secara khusus dibutuhkan untuk fase eksperimen. Ini berbeda dengan `requirements.txt` di *backend* utama yang difokuskan untuk menjalankan *server FastAPI*.

---

## 🚀 Cara Menjalankan Sesi Training (Via Skrip Terminal)

Jika Anda tidak ingin menggunakan Jupyter Notebook, Anda bisa langsung melatih model menggunakan `train.py`.

### Cara 1: Menggunakan Python CLI
```bash
python train.py --data-dir /kaggle/input/<dataset-name> --batch-size 32 --epochs 20
```
*(Ubah `<dataset-name>` sesuai dengan path dataset Anda)*

### Cara 2: Menggunakan Bash Script (Cepat)
```bash
bash run_kaggle.sh
```

## 📝 Tips Untuk UAS
- Pastikan Anda memahami perbedaan antara fase **Training** (di folder ini) dan fase **Inference / Serving** (di `backend/main.py`).
- Jelaskan kepada penguji bahwa kode dipisah ke folder ini untuk menerapkan prinsip **Pemisahan Kekhawatiran (Separation of Concerns)** agar struktur proyek setara dengan aplikasi standar industri.
