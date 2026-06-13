'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadDropzone from '@/components/scanner/UploadDropzone';

interface Prediction {
  class_name: string;
  confidence: number;
}

interface ScanResult {
  predictions: Prediction[];
  top_prediction: string;
  ai_insight: string;
}

export default function ScannerPage() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleImageChange = (file: File) => {
    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setResult(null); // Reset result on new image
  };

  const handleClear = () => {
    setImage(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiBaseUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server.');
      }

      const data: ScanResult = await response.json();
      setResult(data);

      // Save to sessionStorage for History / Insight page
      const currentHistory = JSON.parse(sessionStorage.getItem('arthroscan_history') || '[]');
      const newRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image: preview,
        ...data
      };
      sessionStorage.setItem('arthroscan_history', JSON.stringify([newRecord, ...currentHistory]));
      
      // Store current insight data
      sessionStorage.setItem('arthroscan_current_insight', JSON.stringify(newRecord));

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memproses gambar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-desktop-max mx-auto px-container-padding pt-32 pb-20 flex flex-col lg:flex-row gap-gutter">
      {/* Upload Zone Section */}
      <div className="flex-[1.5] flex flex-col">
        <UploadDropzone
          image={image}
          preview={preview}
          loading={loading}
          onImageChange={handleImageChange}
          onClear={handleClear}
          onAnalyze={handleAnalyze}
        />
      </div>

      {/* Results Section */}
      <div className={`flex-1 transition-opacity duration-500 ${result ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
          {/* Background glow based on result */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="mb-8">
            <h2 className="font-headline-md text-[24px] text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              Top-3 Predictions
            </h2>
            <p className="font-body-md text-[16px] text-on-surface-variant mt-2">
              Neural network classification based on ArthroData v4.2
            </p>
          </div>
          
          <div className="space-y-8 flex-1">
            {result?.predictions?.slice(0, 3).map((pred, idx) => {
              const isTop = idx === 0;
              const colorClass = isTop ? 'primary' : idx === 1 ? 'secondary' : 'tertiary';
              const textClass = isTop ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-tertiary';
              const bgClass = isTop ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-tertiary';
              const confidence = Math.round(pred.confidence * 100);

              return (
                <div key={idx} className={`space-y-3 ${isTop ? 'group cursor-pointer' : 'opacity-60 hover:opacity-100 transition-opacity cursor-pointer group'}`}>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={`font-label-sm text-[12px] uppercase tracking-widest ${isTop ? 'text-primary' : 'text-on-surface-variant'}`}>
                        Match Candidate 0{idx + 1}
                      </p>
                      <h3 className={`font-body-lg text-[18px] font-bold text-on-surface transition-colors group-hover:${textClass}`}>
                        {pred.class_name}
                      </h3>
                    </div>
                    <span className={`font-headline-md text-[24px] ${textClass}`}>{confidence}%</span>
                  </div>
                  
                  <div className={`w-full bg-white/5 rounded-full overflow-hidden ${isTop ? 'h-4 p-[2px] border border-white/10' : 'h-3'}`}>
                    <div className={`h-full rounded-full ${bgClass} ${isTop ? 'shadow-[0_0_15px_rgba(78,222,163,0.5)]' : ''}`} style={{ width: `${confidence}%` }}></div>
                  </div>
                  
                  {isTop && (
                    <div className="flex gap-4 pt-1">
                      <span className="font-label-sm text-[12px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant">
                        Detected
                      </span>
                      <span className="font-label-sm text-[12px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant">
                        Confidence: {confidence > 90 ? 'Critical' : 'High'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <button
              onClick={() => router.push('/insight')}
              className="w-full py-4 rounded-xl font-label-md text-[14px] font-bold flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group active:scale-[0.98]"
            >
              View Full Taxonomic Details
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
