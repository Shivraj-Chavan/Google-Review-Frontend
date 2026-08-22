import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-ink-700 text-paper hover:bg-ink-900 active:bg-ink-900',
  amber: 'bg-amber-400 text-ink-900 hover:bg-amber-500 active:bg-amber-500',
  outline: 'border border-ink-700/20 text-ink-700 hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-50',
  danger: 'bg-coral-500 text-white hover:bg-coral-600'
};

export default function Button({
  children, variant = 'primary', size = 'md', loading = false,
  className = '', disabled, icon: Icon, ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
