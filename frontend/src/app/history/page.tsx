'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HistoryRecord {
  id: string;
  date: string;
  image: string;
  top_prediction: string;
  predictions: Array<{ class_name: string; confidence: number }>;
  ai_insight: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('arthroscan_history') || '[]');
    setHistory(data);
  }, []);

  return (
    <main className="max-w-desktop-max mx-auto px-container-padding pt-32 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="font-headline-md text-[32px] text-on-surface">Scan History</h2>
          <p className="text-on-surface-variant mt-2 font-body-md text-[16px]">
            Comprehensive log of all neural network insect identifications
          </p>
        </div>
        
        {/* Filters/Sorting */}
        <div className="flex gap-4">
          <div className="bg-surface-container-high rounded-lg p-1 flex">
            <button className="px-4 py-1.5 rounded-md bg-white/10 text-on-surface font-label-sm text-[12px]">All</button>
            <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-[12px]">Recent</button>
            <button className="px-4 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-[12px]">Favorites</button>
          </div>
          <button className="px-4 py-2 border border-white/10 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span className="font-label-sm text-[12px]">Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {history.map((record) => {
          const confidence = Math.round((record.predictions[0]?.confidence || 0) * 100);
          
          return (
            <article key={record.id} className="glass-card rounded-2xl overflow-hidden flex flex-col relative group">
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={record.image} 
                  alt={record.top_prediction} 
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-primary/20 backdrop-blur-md border border-primary/40 text-primary px-3 py-1 rounded-full font-label-sm text-[12px]">
                    {confidence}% Match
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-[20px] text-primary truncate leading-none mb-1">
                      {record.top_prediction}
                    </h3>
                    <p className="text-on-surface-variant font-label-sm italic text-[12px]">Identified Species</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span className="font-label-sm text-[12px]">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Link 
                    href="/insight"
                    onClick={() => sessionStorage.setItem('arthroscan_current_insight', JSON.stringify(record))}
                    className="text-secondary font-label-md text-[14px] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Full Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {/* Add New Identification Card */}
        <Link 
          href="/scanner"
          className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary/40 transition-all bg-white/5 min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">add</span>
          </div>
          <h3 className="font-headline-md text-[20px] text-on-surface group-hover:text-primary transition-colors">
            New Identification
          </h3>
          <p className="text-on-surface-variant font-label-sm text-[12px] mt-2">
            Start a new high-precision scan from image or camera feed.
          </p>
        </Link>
      </div>

      {history.length > 0 && (
        <div className="mt-16 flex justify-center items-center gap-8">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface disabled:opacity-30" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
            <span className="font-label-md text-[14px]">Previous</span>
          </button>
          <div className="flex gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</span>
          </div>
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface group">
            <span className="font-label-md text-[14px]">Next</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  );
}
