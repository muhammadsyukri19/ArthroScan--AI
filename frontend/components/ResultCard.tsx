'use client';

import ReactMarkdown from 'react-markdown';
import { Sparkles, BarChart2, ShieldAlert } from 'lucide-react';

interface ResultProps {
  result: {
    top_prediction: string;
    predictions: { class_name: string; confidence: number }[];
    ai_insight: string;
  };
}

export default function ResultCard({ result }: ResultProps) {
  const isFallback = result.ai_insight.includes("Sistem lokal kami") || result.ai_insight.includes("503");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
      
      {/* Left Column: Classification Scores */}
      <div className="md:col-span-1">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between h-full shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-6">
              <BarChart2 className="w-4 h-4" />
              Hasil Klasifikasi
            </div>
            
            <h3 className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Spesies Terdeteksi</h3>
            <div className="text-3xl font-extrabold tracking-tight text-white capitalize bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent mt-1 filter drop-shadow">
              {result.top_prediction.replace(/_/g, ' ')}
            </div>
            
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              Model deep learning berhasil mengidentifikasi gambar serangga Anda dengan daftar tingkat kecocokan probabilitas berikut:
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest border-b border-zinc-800/60 pb-2">Detail Probabilitas</h4>
            {result.predictions.map((p, idx) => {
              const percentage = p.confidence * 100;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-300 capitalize">{p.class_name.replace(/_/g, ' ')}</span>
                    <span className="font-mono text-emerald-400">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/40">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: AI Insights & Details */}
      <div className="md:col-span-2">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col h-full">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-6 pb-3 border-b border-zinc-800/60">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            Wawasan AI Gemini (AI Insights)
          </div>

          {/* AI Insight content */}
          <div className="flex-grow">
            {isFallback ? (
              <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-5 flex gap-3 text-sm text-zinc-300">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <span className="font-semibold text-amber-400">Pemberitahuan Sistem (Fallback):</span>
                  <p className="mt-1 leading-relaxed text-zinc-400">{result.ai_insight}</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-invert prose-emerald max-w-none text-zinc-300 text-sm leading-relaxed prose-headings:font-semibold prose-headings:text-emerald-400 prose-strong:text-emerald-300 prose-p:mb-4">
                <ReactMarkdown>
                  {result.ai_insight}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}