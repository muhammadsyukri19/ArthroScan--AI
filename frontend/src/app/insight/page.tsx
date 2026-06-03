'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface InsightData {
  id?: string;
  date?: string;
  image: string;
  top_prediction: string;
  predictions: Array<{ class_name: string; confidence: number }>;
  ai_insight: string;
}

export default function InsightPage() {
  const [data, setData] = useState<InsightData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('arthroscan_current_insight');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <main className="max-w-desktop-max mx-auto px-container-padding pt-32 pb-20 flex justify-center">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-error text-[48px] mb-4">error</span>
          <h2 className="font-headline-md text-on-surface mb-2">No Insight Data Found</h2>
          <p className="text-on-surface-variant font-body-md mb-6">Please initialize a new scan or select a record from the history.</p>
          <Link href="/scanner" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md font-bold hover:scale-105 transition-transform inline-block">
            Go to Scanner
          </Link>
        </div>
      </main>
    );
  }

  const confidence = Math.round((data.predictions[0]?.confidence || 0) * 100);

  return (
    <main className="max-w-desktop-max mx-auto px-container-padding pt-24 pb-20">
      <Link href="/history" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-label-md">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to History
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hero Image & Identity */}
        <div className="xl:col-span-5 relative">
          <div className="sticky top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={data.image} 
              alt={data.top_prediction} 
              className="w-full aspect-square object-cover rounded-[32px] insect-hero-mask shadow-[0_0_40px_rgba(78,222,163,0.1)] mb-8"
            />
            <div>
              <h2 className="font-display-lg text-[48px] text-white leading-none tracking-tight mb-4">
                {data.top_prediction}
              </h2>
              <div className="flex gap-4 mb-6 flex-wrap">
                <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-label-sm text-[12px] uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  AI Verified
                </span>
                <span className="bg-white/5 text-on-surface-variant border border-white/10 px-3 py-1 rounded-full font-label-sm text-[12px] uppercase tracking-widest">
                  Match: {confidence}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Data */}
        <div className="xl:col-span-7">
          <div className="space-y-8">
            
            {/* Taxonomy & Habitat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-pane p-6 rounded-3xl group transition-all hover:bg-white/5">
                <h3 className="font-headline-md text-[20px] text-white flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">label</span>
                  Taxonomy
                </h3>
                <div className="space-y-3 font-body-md text-on-surface-variant">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="opacity-70">Kingdom</span>
                    <span className="text-white">Animalia</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="opacity-70">Phylum</span>
                    <span className="text-white">Arthropoda</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="opacity-70">Class</span>
                    <span className="text-white">Insecta</span>
                  </div>
                </div>
              </div>

              <div className="glass-pane p-6 rounded-3xl group transition-all hover:bg-white/5">
                <h3 className="font-headline-md text-[20px] text-white flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">distance</span>
                  Details
                </h3>
                <div className="space-y-3 font-body-md text-on-surface-variant">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="opacity-70">Region</span>
                    <span className="text-white">Global</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="opacity-70">Status</span>
                    <span className="text-secondary flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Active</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="opacity-70">Identified</span>
                    <span className="text-white">{data.date ? new Date(data.date).toLocaleDateString() : 'Just now'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="glass-pane p-8 rounded-3xl green-glow border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
              <h3 className="font-headline-lg text-[28px] text-primary flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[32px]">psychology</span>
                AI Insights & Facts
              </h3>
              
              <div className="prose prose-invert prose-emerald max-w-none font-body-md text-on-surface-variant leading-relaxed">
                {data.ai_insight.split('\n').map((line, idx) => {
                  if (!line.trim()) return <br key={idx} />;
                  // Bold styling for strong items
                  const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mb-4" />
                  );
                })}
              </div>
            </div>

            {/* Probability & Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-pane p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-label-md text-[14px] text-white">Detection Confidence</h4>
                  <span className="text-primary font-bold">{confidence}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse" style={{ width: `${confidence}%` }}></div>
                </div>
                <div className="space-y-4">
                  {data.predictions.slice(1, 4).map((pred, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[12px]">
                      <span className="text-on-surface-variant truncate pr-4">{pred.class_name}</span>
                      <span className="text-white">{Math.round(pred.confidence * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-pane p-6 rounded-3xl flex flex-col justify-center items-center text-center">
                <div className="h-20 w-20 rounded-full border-4 border-primary/20 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                </div>
                <h4 className="font-headline-md text-[20px] text-white mb-2">Scan Verified</h4>
                <p className="font-label-sm text-[12px] text-on-surface-variant">Authenticated against ArthroScan Neural Network.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
