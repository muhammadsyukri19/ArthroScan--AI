'use client';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

import Image from 'next/image';

export default function DashboardPage() {
  return (
    <main className="max-w-desktop-max mx-auto px-container-padding pt-32 pb-20">
      {/* Top Section / Hero Intro */}
      <div className="mb-12">
        <h2 className="font-display-lg text-[48px] font-bold text-on-surface tracking-tight mb-2">
          Welcome back, <span className="text-primary">Syukri</span>
        </h2>
        
        <div className="mt-8 relative overflow-hidden glass-card rounded-3xl border border-primary/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
            {/* Text & Action */}
            <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                <h3 className="font-headline-lg text-[28px] text-white">What is ArthroScan AI?</h3>
              </div>
              
              <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed mb-6">
                <strong className="text-primary font-medium">ArthroScan AI</strong> is an advanced machine learning platform designed for rapid, high-precision insect identification. 
                Trained on a robust dataset of over 11,000 global specimens, our Neural Engine assists researchers, farmers, and entomologists in:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 font-body-md text-[16px] text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  Instantly identifying agricultural pests and tracking biodiversity.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  Retrieving deep taxonomic insights powered by Gemini AI.
                </li>
              </ul>
              
              <div>
                <Link
                  href="/scanner"
                  className="group relative inline-flex items-center justify-center px-8 py-5 bg-primary text-on-primary rounded-xl font-bold font-label-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(78,222,163,0.4)]"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
                  <span className="material-symbols-outlined mr-3 text-[24px]">center_focus_strong</span>
                  Initialize Biological Scan
                </Link>
              </div>
            </div>

            {/* Visual Image */}
            <div className="lg:w-[45%] relative min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-white/10 hidden md:block">
              <Image 
                src="/hero-visual.png" 
                alt="ArthroScan AI Neural Scan Visualization"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/90 via-background/20 to-transparent"></div>
              <div className="absolute bottom-4 right-4 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-label-sm text-primary uppercase tracking-widest">Neural Vision Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
        <GlassCard hoverEffect>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">database</span>
            <h3 className="font-label-md text-[14px] text-on-surface-variant">Global Records</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-[32px] font-semibold text-on-surface">11,205</span>
            <span className="font-label-sm text-[12px] text-primary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> Dataset Size
            </span>
          </div>
        </GlassCard>

        <GlassCard hoverEffect>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-lg">biotech</span>
            <h3 className="font-label-md text-[14px] text-on-surface-variant">Today&apos;s Scans</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-[32px] font-semibold text-on-surface">156</span>
            <span className="font-label-sm text-[12px] text-secondary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +4%
            </span>
          </div>
        </GlassCard>

        <GlassCard hoverEffect>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-tertiary p-2 bg-tertiary/10 rounded-lg">verified</span>
            <h3 className="font-label-md text-[14px] text-on-surface-variant">Model Accuracy</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-[32px] font-semibold text-on-surface">72.0%</span>
            <span className="font-label-sm text-[12px] text-on-surface-variant">Avg F1: 0.62</span>
          </div>
        </GlassCard>

        <GlassCard hoverEffect className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary animate-pulse">memory</span>
              <h3 className="font-label-md text-[14px] text-on-surface-variant">API Status</h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <div className="font-headline-md text-[24px] text-primary">Connected</div>
          <p className="font-label-sm text-[12px] text-on-surface-variant opacity-70 mt-1">Latency: 24ms</p>
        </GlassCard>
      </section>

      {/* Dynamic Data Preview Section */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Taxonomy Distribution */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-headline-md text-[24px] text-on-surface mb-6">Top 5 Taxonomic Distribution</h3>
          <div className="flex items-end gap-2 h-48 mb-6">
            <div className="flex-1 bg-primary/20 rounded-t-lg group relative h-[95%]">
              <div className="absolute inset-0 bg-primary opacity-30 group-hover:opacity-60 transition-opacity rounded-t-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label-sm text-[12px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">629 samples</div>
            </div>
            <div className="flex-1 bg-secondary/20 rounded-t-lg group relative h-[94%]">
              <div className="absolute inset-0 bg-secondary opacity-30 group-hover:opacity-60 transition-opacity rounded-t-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label-sm text-[12px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">620 samples</div>
            </div>
            <div className="flex-1 bg-tertiary/20 rounded-t-lg group relative h-[87%]">
              <div className="absolute inset-0 bg-tertiary opacity-30 group-hover:opacity-60 transition-opacity rounded-t-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label-sm text-[12px] text-tertiary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">574 samples</div>
            </div>
            <div className="flex-1 bg-error/20 rounded-t-lg group relative h-[85%]">
              <div className="absolute inset-0 bg-error opacity-30 group-hover:opacity-60 transition-opacity rounded-t-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label-sm text-[12px] text-error opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">565 samples</div>
            </div>
            <div className="flex-1 bg-primary/20 rounded-t-lg group relative h-[80%]">
              <div className="absolute inset-0 bg-primary opacity-30 group-hover:opacity-60 transition-opacity rounded-t-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label-sm text-[12px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">531 samples</div>
            </div>
          </div>
          <div className="flex justify-between font-label-sm text-[12px] text-on-surface-variant px-2 overflow-x-auto gap-4">
            <span className="truncate w-20 text-center">Grasshopper</span>
            <span className="truncate w-20 text-center">Aphids</span>
            <span className="truncate w-20 text-center">Cicadellidae</span>
            <span className="truncate w-20 text-center">Leaf Beetle</span>
            <span className="truncate w-20 text-center">Lycorma</span>
          </div>
        </div>

        {/* AI Engine Status */}
        <div className="glass-card rounded-2xl p-6 bg-surface-container-high/40">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-[24px] text-on-surface">Neural Engine</h3>
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#4edea3]"></span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-[14px] text-on-surface-variant">Processing Load</span>
                <span className="font-label-md text-[14px] text-on-surface">12%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full">
                <div className="h-full bg-primary/40 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-[14px] text-on-surface-variant">Inference Latency</span>
                <span className="font-label-md text-[14px] text-on-surface">42ms</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full">
                <div className="h-full bg-secondary/40 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 mt-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">cloud_done</span>
                <div>
                  <p className="font-label-md text-[14px] text-on-surface">Database Sync Active</p>
                  <p className="font-label-sm text-[12px] text-on-surface-variant">2.4M records indexed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}