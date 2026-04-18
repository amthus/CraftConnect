import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ArrowUpRight } from 'lucide-react';

/**
 * MillimeterPerfect - A collection of UI components holding strictly to the
 * refined design standards: exact padding, font-mono for numbers, 
 * subtle borders, and specific elevation for a "technical but warm" aesthetic.
 */

// --- Card ---
interface MCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}
export const MCard = React.forwardRef<HTMLDivElement, MCardProps>(
  ({ className, glass, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-terracotta/10 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all",
        glass ? "bg-white/60 backdrop-blur-md" : "bg-white",
        className
      )}
      {...props}
    />
  )
);
MCard.displayName = "MCard";

// --- Stat Card ---
interface MStatProps {
  label: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}
export const MStatCard = ({ label, value, trend, icon, color, delay = 0 }: MStatProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
  >
    <MCard className="p-6 group hover:border-terracotta/30">
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105",
          color || "bg-terracotta"
        )}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-tight text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
            <ArrowUpRight size={10} strokeWidth={3} /> {trend}
          </div>
        )}
      </div>
      <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-foreground/40 mb-1">{label}</p>
      <h3 className="text-3xl font-heading tracking-tighter text-foreground/90 font-medium">{value}</h3>
    </MCard>
  </motion.div>
);

// --- Table Header ---
export const MTableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-8 py-5 text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-foreground/30 border-b border-terracotta/5">
    {children}
  </th>
);

// --- Table Data ---
export const MTableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={cn("px-8 py-6 text-sm font-medium border-b border-terracotta/5", className)}>
    {children}
  </td>
);

// --- Badge ---
export const MBadge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' }) => {
  const styles = {
    default: "bg-terracotta/5 text-terracotta border-terracotta/10",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-red-50 text-red-600 border-red-100"
  };
  return (
    <span className={cn(
      "text-[9px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border",
      styles[variant]
    )}>
      {children}
    </span>
  );
};
