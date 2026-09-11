import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Eye, Power, Trash2, CalendarClock } from 'lucide-react';
import DataTable from '../../components/DataTable';
import { Badge, Modal, ConfirmDialog } from '../../components/Basics';
import api, { getErrorMessage } from '../../services/api';

export default function AdminUsers() {
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subTarget, setSubTarget] = useState(null); // business being edited
  const [subDates, setSubDates] = useState({ subscription_start_date: '', subscription_end_date: '' });
  const [savingSub, setSavingSub] = useState(false);

  const fetchUsers = useCallback((page = 1) => {
    setLoading(true);
    api.get('/admin/users', { params: { search, page, limit: 10 } })
      .then((res) => { setRows(res.data.data.users); setPagination(res.data.data.pagination); })
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { fetchUsers(1); }, [fetchUsers]);

  async function viewDetail(u) {
    const res = await api.get(`/admin/users/${u.id}`);
    setDetail(res.data.data);
  }

  async function toggleStatus(u) {
    const next = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await api.put(`/admin/users/${u.id}/status`, { status: next });
      toast.success(`User ${next === 'ACTIVE' ? 'activated' : 'deactivated'}`);
      fetchUsers(pagination.page);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/admin/users/${deleteTarget.id}`);
      toast.success('User deleted');
      setDeleteTarget(null);
      fetchUsers(pagination.page);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  function openSubscription(b) {
    setSubTarget(b);
    setSubDates({
      subscription_start_date: b.subscription_start_date?.slice(0, 10) || '',
      subscription_end_date: b.subscription_end_date?.slice(0, 10) || '',
    });
  }

  async function handleSaveSubscription() {
    if (!subDates.subscription_start_date || !subDates.subscription_end_date) {
      toast.error('Please set both dates');
      return;
    }
    setSavingSub(true);
    try {
      await api.put(`/admin/businesses/${subTarget.id}/subscription`, subDates);
      toast.success('Subscription updated');
      setSubTarget(null);
      const res = await api.get(`/admin/users/${detail.user.id}`);
      setDetail(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingSub(false);
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'businessCount', label: 'Businesses', render: (r) => r.businessCount },
    { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'ACTIVE' ? 'green' : 'coral'}>{r.status}</Badge> },
    { key: 'created_at', label: 'Created', render: (r) => new Date(r.created_at).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex items-center gap-1">
        <button title="View" onClick={() => viewDetail(r)} className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-50"><Eye className="h-4 w-4" /></button>
        <button title={r.status === 'ACTIVE' ? 'Deactivate' : 'Activate'} onClick={() => toggleStatus(r)} className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-50"><Power className="h-4 w-4" /></button>
        <button title="Delete" onClick={() => setDeleteTarget(r)} className="rounded-lg p-1.5 text-coral-500 hover:bg-coral-500/10"><Trash2 className="h-4 w-4" /></button>
      </div>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Business users</h1>
        <p className="text-sm text-ink-300">{pagination.total ?? 0} total</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or email…"
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={fetchUsers}
        emptyLabel={loading ? 'Loading…' : 'No users found'}
      />

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.user?.name || ''}>
        {detail && (
          <div className="space-y-4">
            <p className="text-sm text-ink-500">{detail.user.email}</p>
            <div>
              <p className="mb-2 text-sm font-medium text-ink-900">Businesses ({detail.businesses.length})</p>
              <div className="space-y-2">
                {detail.businesses.length === 0 && <p className="text-sm text-ink-300">No businesses yet.</p>}
                {detail.businesses.map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2 text-sm">
                    <span>{b.business_name}</span>
                    <div className="flex items-center gap-2">
                      <Badge tone={b.status === 'ACTIVE' ? 'green' : 'coral'}>{b.status}</Badge>
                      <button
                        title="Set subscription"
                        onClick={() => openSubscription(b)}
                        className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-100"
                      >
                        <CalendarClock className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete user?"
        description={`This will permanently remove "${deleteTarget?.name}" and their businesses.`}
        confirmText="Delete"
        danger
      />

      <Modal open={!!subTarget} onClose={() => setSubTarget(null)} title={`Subscription — ${subTarget?.business_name || ''}`}>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-900">Start date</span>
            <input
              type="date"
              value={subDates.subscription_start_date}
              onChange={(e) => setSubDates((d) => ({ ...d, subscription_start_date: e.target.value }))}
              className="w-full rounded-xl border border-ink-100 bg-surface px-3.5 py-2.5 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-900">End date</span>
            <input
              type="date"
              value={subDates.subscription_end_date}
              onChange={(e) => setSubDates((d) => ({ ...d, subscription_end_date: e.target.value }))}
              className="w-full rounded-xl border border-ink-100 bg-surface px-3.5 py-2.5 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </label>
          <button
            onClick={handleSaveSubscription}
            disabled={savingSub}
            className="w-full rounded-xl bg-ink-700 px-4 py-2.5 text-sm font-medium text-paper hover:bg-ink-800 disabled:opacity-50"
          >
            {savingSub ? 'Saving…' : 'Save subscription'}
          </button>
        </div>
      </Modal>
    </div>
  );
}