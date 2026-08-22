import { forwardRef } from 'react';

export const Input = forwardRef(function Input({ label, error, hint, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-900">{label}</span>}
      <input
        ref={ref}
        className={`w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${error ? 'border-coral-500' : 'border-ink-100'} ${className}`}
        {...props}
      />
      {hint && !error && <span className="mt-1 block text-xs text-ink-300">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-coral-500">{error}</span>}
    </label>
  );
});

export const Textarea = forwardRef(function Textarea({ label, error, hint, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-900">{label}</span>}
      <textarea
        ref={ref}
        className={`w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${error ? 'border-coral-500' : 'border-ink-100'} ${className}`}
        {...props}
      />
      {hint && !error && <span className="mt-1 block text-xs text-ink-300">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-coral-500">{error}</span>}
    </label>
  );
});

export const Select = forwardRef(function Select({ label, error, children, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-900">{label}</span>}
      <select
        ref={ref}
        className={`w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink-900 transition-colors focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${error ? 'border-coral-500' : 'border-ink-100'} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-coral-500">{error}</span>}
    </label>
  );
});
