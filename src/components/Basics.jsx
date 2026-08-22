import { Loader2, Inbox, X } from 'lucide-react';
import { useEffect } from 'react';
import Button from './Button';

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl2 border border-ink-100 bg-surface p-5 shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-300">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-ink-100 bg-surface/60 px-6 py-14 text-center">
      <div className="rounded-full bg-ink-50 p-3">
        <Icon className="h-6 w-6 text-ink-500" />
      </div>
      <h3 className="font-display text-lg font-medium text-ink-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-300">{description}</p>}
      {action}
    </div>
  );
}

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 backdrop-blur-sm sm:items-center">
      <div className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface p-6 shadow-pop animate-[fillStar_.25s_ease]`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink-300 hover:bg-ink-50 hover:text-ink-900">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmText = 'Confirm', danger = false, loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="mb-6 text-sm text-ink-300">{description}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>{confirmText}</Button>
      </div>
    </Modal>
  );
}

export function Badge({ children, tone = 'ink' }) {
  const tones = {
    ink: 'bg-ink-50 text-ink-700',
    amber: 'bg-amber-50 text-amber-600',
    coral: 'bg-coral-500/10 text-coral-600',
    green: 'bg-ink-500/10 text-ink-500'
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
