'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2, Zap } from 'lucide-react';
import LoadingScanner from './LoadingScanner';

interface UploadZoneProps {
  image: File | null;
  preview: string | null;
  loading: boolean;
  onImageChange: (file: File) => void;
  onClear: () => void;
  onAnalyze: () => void;
}

export default function UploadZone({
  image,
  preview,
  loading,
  onImageChange,
  onClear,
  onAnalyze,
}: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageChange(file);
      } else {
        alert('File harus berupa gambar (PNG, JPG, JPEG)');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* Upload Box Card */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative overflow-hidden bg-zinc-900/60 border-2 border-dashed rounded-3xl p-6 transition-all duration-300 backdrop-blur-md flex flex-col items-center justify-center min-h-[320px] ${
          isDragActive 
            ? 'border-emerald-550 bg-emerald-950/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
            : preview 
              ? 'border-zinc-800/80 animate-pulse-glow' 
              : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/30'
        }`}
      >
        {/* Loading Scanner Overlay */}
        {loading && <LoadingScanner />}

        {preview ? (
          <div className="relative w-full h-[280px] flex items-center justify-center p-2 rounded-2xl bg-zinc-950/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={preview} 
              alt="Preview serangga" 
              className="h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]" 
            />
            
            {/* Action buttons inside preview */}
            {!loading && (
              <button
                onClick={onClear}
                className="absolute top-4 right-4 p-2 bg-red-950/80 border border-red-500/30 text-red-400 rounded-full hover:bg-red-900 hover:text-white transition-all duration-200 shadow-lg cursor-pointer"
                title="Hapus gambar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 cursor-pointer w-full" onClick={onButtonClick}>
            <div className="p-4 bg-zinc-800/60 border border-zinc-700 rounded-full text-zinc-400 transition-all duration-300 shadow-inner">
              <Upload className="w-8 h-8 text-zinc-500" />
            </div>
            <div>
              <p className="text-zinc-200 text-sm font-medium">
                Tarik gambar serangga Anda ke sini, atau{' '}
                <span className="text-emerald-400 font-semibold hover:underline">pilih file</span>
              </p>
              <p className="text-zinc-500 text-xs mt-1">Mendukung PNG, JPG, JPEG (Maks. 5MB)</p>
            </div>
          </div>
        )}

        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={loading}
        />
      </div>

      {/* Action Button */}
      {image && !loading && (
        <button
          onClick={onAnalyze}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-2xl transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] cursor-pointer text-sm tracking-wide"
        >
          <Zap className="w-4 h-4 text-emerald-100" />
          Mulai Identifikasi
        </button>
      )}
    </div>
  );
}
