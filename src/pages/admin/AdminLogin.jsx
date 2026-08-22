import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import api, { getErrorMessage } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

async function onSubmit(values) {
    console.log('SUBMIT FIRED', values); // TEMP DEBUG
    setLoading(true);
    try {
      const res = await api.post('/auth/admin-login', values);
      const { token, user } = res.data.data;
      login(token, user);
      navigate('/admin/dashboard');
} catch (err) {
      console.error('LOGIN DEBUG:', err); // TEMP DEBUG
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-surface p-8 shadow-pop">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-ink-900">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink-900">Master Admin</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" {...register('email', { required: true })} />
          <Input label="Password" type="password" {...register('password', { required: true })} />
          <Button type="submit" className="w-full" loading={loading}>Sign in</Button>
        </form>
      </div>
    </div>
  );
}
