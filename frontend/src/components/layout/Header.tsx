'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/', icon: 'dashboard' },
    { name: 'Scanner', href: '/scanner', icon: 'biotech' },
    { name: 'History', href: '/history', icon: 'history' },
    { name: 'Settings', href: '#', icon: 'settings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-surface/60 backdrop-blur-xl flex items-center justify-between px-container-padding z-50">
      <div className="flex items-center gap-8">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logos.png" 
            alt="ArthroScan AI Logo" 
            width={40} 
            height={40} 
            className="rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <h1 className="font-headline-md text-[24px] font-semibold text-primary tracking-tight leading-none">ArthroScan AI</h1>
            <p className="text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest opacity-70">
              Precision Entomology
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors group ${
                  isActive
                    ? 'text-primary bg-primary/10 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? '' : 'group-hover:text-primary transition-colors'
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {link.icon}
                </span>
                <span className="font-label-md text-[14px]">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block w-64 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-primary/50 transition-all font-label-md text-[14px] placeholder:text-on-surface-variant/50"
            placeholder="Search records..."
            type="text"
          />
        </div>
        <button className="relative w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-white/10 transition-colors group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer">
          <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
