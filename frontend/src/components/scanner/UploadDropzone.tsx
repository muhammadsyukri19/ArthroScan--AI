'use client';

import React, { useState, useRef } from 'react';
import LoadingScanner from '@/components/LoadingScanner';

interface UploadDropzoneProps {
  image: File | null;
  preview: string | null;
  loading: boolean;
  onImageChange: (file: File) => void;
  onClear: () => void;
  onAnalyze: () => void;
}

export default function UploadDropzone({
  image,
  preview,
  loading,
  onImageChange,
  onClear,
  onAnalyze,
}: UploadDropzoneProps) {
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
    if (!loading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl glass-pane border-dashed border-2 flex items-center justify-center transition-all ${
          isDragActive
            ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(78,222,163,0.2)]'
            : preview
            ? 'border-white/10'
            : 'border-white/20 hover:border-primary/50 cursor-pointer min-h-[400px]'
        }`}
        style={preview ? { minHeight: 'auto', padding: '1rem' } : {}}
      >
        {loading && <LoadingScanner />}

        {preview ? (
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview serangga"
              className="max-h-[500px] max-w-full object-contain rounded-xl insect-hero-mask transition-transform duration-500 hover:scale-[1.02]"
            />

            {!loading && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={onClear}
                  className="p-3 bg-error/20 border border-error/30 text-error rounded-full hover:bg-error hover:text-on-error transition-all"
                  title="Hapus gambar"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 flex flex-col items-center" onClick={onButtonClick}>
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">upload_file</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
              Drop image to initialize scan
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
              or click to browse local files (JPG, PNG, WebP)
            </p>
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

      {image && !loading && (
        <button
          onClick={onAnalyze}
          className="w-full py-4 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-3 bg-primary text-on-primary hover:scale-105 transition-all shadow-[0_0_20px_rgba(78,222,163,0.3)] active:scale-95"
        >
          <span className="material-symbols-outlined">center_focus_strong</span>
          Initialize Neural Engine Scan
        </button>
      )}
    </div>
  );
}
