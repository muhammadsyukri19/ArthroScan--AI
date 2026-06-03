# Prompt untuk Claude: Pembuatan Laporan Final Project ML

**Konteks Project:**
Saya telah menyelesaikan "Final Project ML Lab: Smart Insect Identifier & AI Insights". Sistem ini adalah aplikasi identifikasi serangga otomatis yang mengenali spesies serangga dari gambar (menggunakan model TensorFlow/Keras) dan memberikan wawasan mendalam (taksonomi, habitat, dan fun facts) menggunakan integrasi LLM Gemini.

**Status Pemenuhan Syarat (Rules dari PDF Praktikum):**
Semua syarat yang diminta di modul PDF **TELAH KITA PENUHI** dengan sangat baik dan bahkan melebihi ekspektasi standar:
1. **Framework ML:** Menggunakan TensorFlow/Keras dengan model `.keras` (EfficientNet backend).
2. **Backend (FastAPI):** Menyediakan endpoint `/analyze` yang menggabungkan *Inference* model klasifikasi dan integrasi Gemini API. Dilengkapi *fallback mechanism* (jika Gemini sibuk/error, prediksi ML tetap keluar).
3. **Frontend (Next.js & Tailwind CSS):** Menggunakan Next.js App Router (`src/app`). 
4. **Kustomisasi UI (Nilai Plus):** Kita tidak sekadar memakai template, melainkan mendesain ulang secara total dengan tema *Dark Mode Glassmorphism*, animasi *scanning* neon futuristik, visual feedback (*Loading State* yang interaktif), typography modern (Inter & Geist), serta integrasi grafik distribusi taksonomi yang dinamis.
5. **Fitur Frontend:** 
   - *Image Upload & Preview* terimplementasi rapi.
   - *Markdown Rendering* menggunakan `react-markdown` agar teks tebal, list, dan struktur dari Gemini tampil rapi di halaman Insight.
   - *Visual Feedback* (Loading state saat AI "berpikir") diimplementasikan dengan animasi UI.

**Data Tambahan untuk Laporan:**
- **Model Evaluation:** Model mencapai *Accuracy* sebesar **72.0%** (berdasarkan 11.205 sampel data uji). *Macro Avg F1-Score* sebesar **0.62**. Lima kelas dominan: Grasshopper, Aphids, Cicadellidae, Leaf beetle, Lycorma delicatula. (Catatan: Anda bisa melampirkan screenshot confusion matrix & kurva loss dari notebook Anda nanti).

---

**TUGAS UNTUK CLAUDE:**
Tolong buatkan **Draf Laporan Lengkap (Laporan Praktikum / Project Output)** berdasarkan spesifikasi dan pencapaian di atas. Laporan harus profesional, terstruktur, dan mencakup poin-poin *Deliverables* berikut:

1. **Pendahuluan & Arsitektur Sistem:**
   Jelaskan secara singkat aplikasi "ArthroScan AI" yang dibangun menggunakan Next.js (Frontend), FastAPI (Backend), TensorFlow/Keras (Model ML), dan Gemini API (LLM). Sebutkan desain antarmuka *Glassmorphism* yang inovatif.

2. **Evaluasi Model:**
   Bahas performa model berdasarkan angka akurasi 72.0% dan Macro F1 0.62. Jelaskan sedikit bahwa model mampu mengklasifikasikan spesies dengan cukup baik meskipun terdapat kelas yang sangat banyak (imbalance dataset pada 5 kelas dominan). (Berikan *placeholder* teks untuk gambar Confusion Matrix dan Training Curve).

3. **Analisis Singkat Jawaban Gemini:**
   Jelaskan bagaimana Gemini merespons prediksi ML. (Contoh analisis: "Gemini berhasil memberikan konteks taksonomi, habitat, dan *fun facts* yang relevan berdasarkan input nama ilmiah yang dihasilkan oleh model ML, dirender dengan sempurna menggunakan react-markdown di frontend. *Fallback mechanism* juga memastikan sistem tidak hancur saat limit API tercapai.")

4. **Saran Pengembangan Model Lanjutan:**
   Berikan 3-4 saran logis (misalnya: penanganan *data imbalance* dengan teknik *oversampling/SMOTE*, penggunaan arsitektur yang lebih kompleks/Ringan, atau penambahan dataset lokal).

5. **Penutup:**
   Kesimpulan singkat keberhasilan proyek ini.

*Tolong tuliskan dalam format Markdown yang rapi agar saya bisa langsung menyalinnya ke Microsoft Word atau Google Docs.*
