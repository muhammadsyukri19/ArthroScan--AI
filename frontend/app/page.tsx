'use client';

import { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import ResultCard from '@/components/ResultCard';
import { Bug, Compass, Sparkles } from 'lucide-react';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Reset hasil jika ganti gambar
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null); // Kosongkan hasil sebelumnya
    
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Terjadi kesalahan pada server");
      }
      
      setResult(data);
    } catch (error: any) {
      console.error("Gagal menganalisis gambar:", error);
      
      // Fallback local error handling
      setResult({
        top_prediction: "Koneksi Terputus",
        predictions: [
          { class_name: "Koneksi Backend Gagal", confidence: 0.0 }
        ],
        ai_insight: `### Gagal Menghubungi API Server\n\nSistem tidak dapat terhubung ke server lokal Anda di \`http://localhost:8000\`. \n\n**Silakan periksa beberapa langkah berikut:**\n1. Pastikan Anda telah mengaktifkan virtual environment backend dengan menjalankan \`env\\Scripts\\activate\` (Windows).\n2. Pastikan server backend Anda sudah aktif dengan menjalankan perintah \`uvicorn main:app --reload\` di folder backend.\n3. Periksa apakah ada error/crash di terminal server backend Anda.\n\n*Detail Error: ${error.message || "Network Error"}*`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-zinc-100 font-sans flex flex-col items-center justify-between py-12 px-4 md:px-8 relative">
      
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl w-full space-y-12 relative z-10 my-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* API Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-xs font-medium text-emerald-400 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ArthroScan Core v1.0
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Bug className="w-9 h-9 text-emerald-400" />
            Arthro<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Scan</span> AI
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            Identifikasi serangga secara instan menggunakan Deep Learning. Dapatkan taksonomi, habitat, dan fakta unik langsung dari Gemini AI.
          </p>
        </div>

        {/* Upload Container */}
        <div className="max-w-xl mx-auto w-full">
          <UploadZone 
            image={image}
            preview={preview}
            loading={loading}
            onImageChange={handleImageChange}
            onClear={handleClear}
            onAnalyze={analyzeImage}
          />
        </div>

        {/* Result Container */}
        {result && (
          <div className="pt-4 border-t border-zinc-900/40">
            <ResultCard result={result} />
          </div>
        )}

        {/* Feature Highlights (Only show when no image or results) */}
        {!image && !result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6 text-center">
            <div className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
              <div className="mx-auto w-10 h-10 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <Bug className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-200">Klasifikasi Akurat</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Dilatih dengan ribuan gambar untuk mengenali berbagai jenis spesies serangga.</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
              <div className="mx-auto w-10 h-10 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-200">Integrasi Gemini AI</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Memberikan wawasan taksonomi lengkap, habitat, dan fakta menarik serangga secara mendalam.</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl space-y-2 backdrop-blur-sm">
              <div className="mx-auto w-10 h-10 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-200">Tampilan Demo Modern</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Tampilan interaktif dan animasi pemindaian futuristik untuk demo aplikasi.</p>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-zinc-650 mt-12 border-t border-zinc-900/40">
        <p>© 2026 ArthroScan AI • Tugas Akhir Praktikum Pembelajaran Mesin (Machine Learning)</p>
      </footer>
    </main>
  );
}