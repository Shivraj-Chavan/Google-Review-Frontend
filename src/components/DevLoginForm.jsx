// frontend/src/components/DevLoginForm.jsx
// TESTING ONLY — bypasses Google Sign-In. Only rendered when import.meta.env.DEV is true,
// and the backend refuses this route entirely when NODE_ENV=production.
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import api, { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DevLoginForm({ onLoggedIn }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleDevLogin(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await api.post('/auth/dev-login', { email });
      const { token, user } = res.data.data;
      login(token, user);
      onLoggedIn?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleDevLogin} className="mt-4 rounded-xl border border-dashed border-amber-400/50 bg-amber-50/50 p-3">
      <p className="mb-2 text-center text-xs font-medium text-amber-600">Dev login (testing only)</p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-ink-100 bg-surface px-3 py-2 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-3 py-2 text-sm font-medium text-paper disabled:opacity-50"
        >
          <LogIn className="h-4 w-4" /> {loading ? '...' : 'Go'}
        </button>
      </div>
    </form>
  );
}