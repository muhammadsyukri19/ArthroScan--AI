import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className = '', hoverEffect = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${
        hoverEffect ? 'glass-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
