import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { Card, ConfirmDialog } from '../../components/Basics';
import Button from '../../components/Button';
import api, { getErrorMessage } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await api.get('/businesses/my');
      const business = res.data.data.business;
      if (business) await api.delete(`/businesses/${business.id}`);
      toast.success('Business profile deleted.');
      logout();
      navigate('/');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Settings</h1>
        <p className="text-sm text-ink-300">Manage your account.</p>
      </div>

      <Card className="space-y-2">
        <p className="font-medium text-ink-900">Signed in as</p>
        <p className="text-sm text-ink-500">{user?.name} · {user?.email}</p>
      </Card>

      <Card className="space-y-3 border-coral-500/20">
        <p className="font-medium text-coral-600">Danger zone</p>
        <p className="text-sm text-ink-300">
          Deleting your business removes your public review page, QR code, and all analytics. This can't be undone.
        </p>
        <Button variant="danger" icon={Trash2} onClick={() => setConfirmOpen(true)}>Delete business profile</Button>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete business profile?"
        description="This will permanently remove your business, images, review link, and analytics."
        confirmText="Delete"
        danger
        loading={deleting}
      />
    </div>
  );
}
