'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LOADING_STEPS = [
  "Mengunggah gambar ke server...",
  "Menganalisis struktur tubuh serangga...",
  "Mengekstrak fitur visual (Transfer Learning)...",
  "Memproses klasifikasi spesies...",
  "Menghubungi Gemini AI untuk fakta unik...",
  "Menyusun wawasan taksonomi dan habitat..."
];

export default function LoadingScanner() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 overflow-hidden animate-in fade-in duration-300">
      
      {/* Scanning Laser Line */}
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan z-10"></div>
      
      {/* Glowing scanner core */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="relative p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-emerald-400">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>

      {/* Loading Texts */}
      <div className="space-y-2 max-w-xs relative z-10">
        <h3 className="text-emerald-400 font-semibold tracking-wider uppercase text-xs">ArthroScan AI Scanner</h3>
        <p className="text-white font-medium text-sm transition-all duration-500 animate-pulse h-10 flex items-center justify-center">
          {LOADING_STEPS[stepIndex]}
        </p>
        <p className="text-xs text-zinc-500">Mohon tunggu beberapa saat...</p>
      </div>

      {/* Decorative HUD corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/40"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/40"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/40"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/40"></div>
    </div>
  );
}
