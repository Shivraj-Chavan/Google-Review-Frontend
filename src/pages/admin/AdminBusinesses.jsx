import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus, Eye, Pencil, Trash2, Power, Copy, CalendarClock, Check, X } from 'lucide-react';
import DataTable from '../../components/DataTable';
import Button from '../../components/Button';
import { Badge, Modal, ConfirmDialog } from '../../components/Basics';
import { Input, Textarea, Select } from '../../components/Input';
import api, { getErrorMessage } from '../../services/api';
import { copyText } from '../../utils/clipboard';
import { useForm } from 'react-hook-form';

const CATEGORIES = ['Restaurant', 'Cafe', 'Salon & Spa', 'Dental Clinic', 'Clinic / Hospital', 'Retail Store', 'Gym & Fitness', 'Hotel', 'Automotive', 'Real Estate', 'Education', 'Professional Services', 'Other'];

export default function AdminBusinesses() {
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editBusiness, setEditBusiness] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subTarget, setSubTarget] = useState(null);
  const [subDates, setSubDates] = useState({ subscription_start_date: '', subscription_end_date: '' });
  const [savingSub, setSavingSub] = useState(false);
  const [detailKeywords, setDetailKeywords] = useState([]);
  const [detailKeywordsLoading, setDetailKeywordsLoading] = useState(false);

  useEffect(() => {
    if (!detail?.id) {
      setDetailKeywords([]);
      return;
    }
    setDetailKeywordsLoading(true);
    api.get(`/public/businesses/${detail.id}/keywords`)
      .then((res) => setDetailKeywords(res.data.keywords || []))
      .catch(() => setDetailKeywords([]))
      .finally(() => setDetailKeywordsLoading(false));
  }, [detail?.id]);

  const fetchBusinesses = useCallback((page = 1) => {
    setLoading(true);
    api.get('/admin/businesses', { params: { search, status, page, limit: 10 } })
      .then((res) => {
        setRows(res.data.data.businesses);
        setPagination(res.data.data.pagination);
      })
      .finally(() => setLoading(false));
  }, [search, status]);

  useEffect(() => { fetchBusinesses(1); }, [fetchBusinesses]);

  async function toggleStatus(b) {
    const next = b.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await api.put(`/admin/businesses/${b.id}/status`, { status: next });
      toast.success(`Business ${next === 'ACTIVE' ? 'activated' : 'deactivated'}`);
      fetchBusinesses(pagination.page);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDelete() {
    try {

      await api.delete(`/admin/businesses/${deleteTarget.id}`);
      toast.success('Business deleted');
      setDeleteTarget(null);
      fetchBusinesses(pagination.page);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  function copyLink(slug) {
    const reviewLink = `${window.location.origin}/review/${slug}`;
    copyText(reviewLink)
      .then(() => toast.success('Review link copied!'))
      .catch(() => toast.error('Could not copy — please copy the link manually.'));
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
      fetchBusinesses(pagination.page);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingSub(false);
    }
  }

  const columns = [
    { key: 'business_name', label: 'Business', render: (r) => (
      <div>
        <p className="font-medium text-ink-900">{r.business_name}</p>
        <p className="font-mono text-xs text-ink-300">/{r.slug}</p>
      </div>
    ) },
    { key: 'owner_name', label: 'Owner', render: (r) => (
      <div><p>{r.owner_name}</p><p className="text-xs text-ink-300">{r.owner_email}</p></div>
    ) },
    { key: 'category', label: 'Category', render: (r) => r.category || '—' },
    { key: 'status', label: 'Status', render: (r) => (
      <Badge tone={r.status === 'ACTIVE' ? 'green' : 'coral'}>{r.status}</Badge>
    ) },
    { key: 'created_at', label: 'Created', render: (r) => new Date(r.created_at).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (r) => (
      <div className="flex items-center gap-1">
        <IconBtn title="View" onClick={() => setDetail(r)}><Eye className="h-4 w-4" /></IconBtn>
        <IconBtn title="Edit" onClick={() => setEditBusiness(r)}><Pencil className="h-4 w-4" /></IconBtn>
        <IconBtn title="Copy link" onClick={() => copyLink(r.slug)}><Copy className="h-4 w-4" /></IconBtn>
        <IconBtn title={r.status === 'ACTIVE' ? 'Deactivate' : 'Activate'} onClick={() => toggleStatus(r)}><Power className="h-4 w-4" /></IconBtn>
        <IconBtn title="Set subscription" onClick={() => openSubscription(r)}><CalendarClock className="h-4 w-4" /></IconBtn>
        <IconBtn title="Delete" danger onClick={() => setDeleteTarget(r)}><Trash2 className="h-4 w-4" /></IconBtn>
      </div>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Businesses</h1>
          <p className="text-sm text-ink-300">{pagination.total ?? 0} total</p>
        </div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add business</Button>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, slug or owner email…"
        filters={
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="!w-40">
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </Select>
        }
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={fetchBusinesses}
        emptyLabel={loading ? 'Loading…' : 'No businesses found'}
      />

      <BusinessFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={() => { setAddOpen(false); fetchBusinesses(1); }}
        mode="create"
      />
      <BusinessFormModal
        open={!!editBusiness}
        onClose={() => setEditBusiness(null)}
        onSaved={() => { setEditBusiness(null); fetchBusinesses(pagination.page); }}
        mode="edit"
        business={editBusiness}
      />

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.business_name || ''}>
      {detail && (
          <div className="space-y-2 text-sm text-ink-700">
            <p><span className="text-ink-300">Slug:</span> /{detail.slug}</p>
            <p><span className="text-ink-300">Owner:</span> {detail.owner_name} ({detail.owner_email})</p>
            <p><span className="text-ink-300">Category:</span> {detail.category || '—'}</p>
            <p><span className="text-ink-300">Phone:</span> {detail.phone || '—'}</p>
            <p><span className="text-ink-300">Email:</span> {detail.email || '—'}</p>
            <p><span className="text-ink-300">Website:</span> {detail.website || '—'}</p>
            <p><span className="text-ink-300">Address:</span> {[detail.address, detail.city, detail.state].filter(Boolean).join(', ') || '—'}</p>
            <p><span className="text-ink-300">Google review URL:</span> {detail.google_review_url || 'Not set'}</p>
            <p><span className="text-ink-300">Instagram:</span> {detail.instagram_url || '—'}</p>
            <p><span className="text-ink-300">Facebook:</span> {detail.facebook_url || '—'}</p>
            <p><span className="text-ink-300">YouTube:</span> {detail.youtube_url || '—'}</p>
            <p><span className="text-ink-300">Subscription start:</span> {detail.subscription_start_date ? new Date(detail.subscription_start_date).toLocaleDateString() : 'Not set'}</p>
            <p><span className="text-ink-300">Subscription expiry:</span> {detail.subscription_end_date ? new Date(detail.subscription_end_date).toLocaleDateString() : 'Not set'}</p>
            <p><span className="text-ink-300">Status:</span> <Badge tone={detail.status === 'ACTIVE' ? 'green' : 'coral'}>{detail.status}</Badge></p>
            <div>
              <p className="mb-1.5 text-ink-300">Keywords:</p>
              {detailKeywordsLoading ? (
                <p className="text-xs text-ink-300">Loading…</p>
              ) : detailKeywords.length === 0 ? (
                <p className="text-xs text-ink-300">None added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {detailKeywords.map((k) => (
                    <span key={k} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700">{k}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete business?"
        description={`This will permanently remove "${deleteTarget?.business_name}" and all of its data.`}
        confirmText="Delete"
        danger
      />

      <Modal open={!!subTarget} onClose={() => setSubTarget(null)} title={`Subscription — ${subTarget?.business_name || ''}`}>
        <div className="space-y-4">
          <Input
            label="Start date"
            type="date"
            value={subDates.subscription_start_date}
            onChange={(e) => setSubDates((d) => ({ ...d, subscription_start_date: e.target.value }))}
          />
          <Input
            label="End date"
            type="date"
            value={subDates.subscription_end_date}
            onChange={(e) => setSubDates((d) => ({ ...d, subscription_end_date: e.target.value }))}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setSubTarget(null)}>Cancel</Button>
            <Button type="button" loading={savingSub} onClick={handleSaveSubscription}>Save subscription</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`rounded-lg p-1.5 transition-colors hover:bg-ink-50 ${danger ? 'text-coral-500 hover:bg-coral-500/10' : 'text-ink-500'}`}
    >
      {children}
    </button>
  );
}

function BusinessFormModal({ open, onClose, onSaved, mode, business }) {
  const { register, handleSubmit, reset } = useForm();
  const [saving, setSaving] = useState(false);

    // ---- Keywords (edit mode only) ----
    const [keywords, setKeywords] = useState([]);
    const [keywordsLoading, setKeywordsLoading] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');
    const [addingKeyword, setAddingKeyword] = useState(false);
    const [editingKeywordId, setEditingKeywordId] = useState(null);
    const [editingKeywordValue, setEditingKeywordValue] = useState('');
    const [savingKeywordId, setSavingKeywordId] = useState(null);
    const [deletingKeywordId, setDeletingKeywordId] = useState(null);

    const [pendingKeywords, setPendingKeywords] = useState([]);
    const [editingPendingIndex, setEditingPendingIndex] = useState(null);
    const [editingPendingValue, setEditingPendingValue] = useState('');
  
    useEffect(() => {
      if (open) reset(mode === 'edit' ? business || {} : {});
      if (!open || mode === 'edit') {
        setPendingKeywords([]);
        setEditingPendingIndex(null);
        setEditingPendingValue('');
      }
    }, [open, business, mode, reset]);
  
    const fetchKeywords = useCallback(async () => {
      if (mode !== 'edit' || !business?.id) {
        setKeywords([]);
        return;
      }
  
      setKeywordsLoading(true);
  
      try {
        const res = await api.get(`/keywords/${business.id}`);
        setKeywords(res.data?.keywords || []);
      } catch (error) {
        console.error('Fetch keywords error:', error);
        setKeywords([]);
        toast.error(getErrorMessage(error));
      } finally {
        setKeywordsLoading(false);
      }
    }, [mode, business?.id]);
  
    useEffect(() => {
      if (open && mode === 'edit' && business?.id) {
        fetchKeywords();
      } else {
        setKeywords([]);
        setNewKeyword('');
        setEditingKeywordId(null);
        setEditingKeywordValue('');
      }
    }, [open, mode, business?.id, fetchKeywords]);
  
    async function handleAddKeyword() {
      const value = newKeyword.trim();
  
      if (!value) {
        toast.error('Please enter a keyword');
        return;
      }

      // Create mode — no business yet, hold it locally.
      if (mode === 'create') {
        if (pendingKeywords.includes(value)) {
          toast.error('Keyword already added');
          return;
        }
        setPendingKeywords((prev) => [...prev, value]);
        setNewKeyword('');
        return;
      }

      if (!business?.id) {
        toast.error('Business ID not found');
        return;
      }
  
      setAddingKeyword(true);
  
      try {
        await api.post(`/keywords/${business.id}`, { keyword: value });
        toast.success('Keyword added');
        setNewKeyword('');
        await fetchKeywords();
      } catch (err) {
        console.error('Add keyword error:', err);
        toast.error(getErrorMessage(err));
      } finally {
        setAddingKeyword(false);
      }
    }

    function startEditPendingKeyword(index) {
      setEditingPendingIndex(index);
      setEditingPendingValue(pendingKeywords[index]);
    }

    function cancelEditPendingKeyword() {
      setEditingPendingIndex(null);
      setEditingPendingValue('');
    }

    function saveEditPendingKeyword(index) {
      const value = editingPendingValue.trim();
      if (!value) return;
      setPendingKeywords((prev) => prev.map((k, i) => (i === index ? value : k)));
      cancelEditPendingKeyword();
    }

    function removePendingKeyword(index) {
      setPendingKeywords((prev) => prev.filter((_, i) => i !== index));
    }
  
    function startEditKeyword(k) {
      setEditingKeywordId(k.id);
      setEditingKeywordValue(k.keyword);
    }
  
    function cancelEditKeyword() {
      setEditingKeywordId(null);
      setEditingKeywordValue('');
    }
  
    async function handleSaveEditKeyword(keywordId) {
      const value = editingKeywordValue.trim();
  
      if (!value) {
        toast.error('Keyword cannot be empty');
        return;
      }
      if (!business?.id || !keywordId) {
        toast.error('Invalid business or keyword ID');
        return;
      }
  
      setSavingKeywordId(keywordId);
  
      try {
        await api.put(`/keywords/${business.id}/${keywordId}`, { keyword: value });
        toast.success('Keyword updated');
        cancelEditKeyword();
        await fetchKeywords();
      } catch (err) {
        console.error('Update keyword error:', err);
        toast.error(getErrorMessage(err));
      } finally {
        setSavingKeywordId(null);
      }
    }
  
    async function handleDeleteKeyword(keywordId) {
      if (!business?.id || !keywordId) {
        toast.error('Invalid business or keyword ID');
        return;
      }
      if (!window.confirm('Delete this keyword?')) return;
  
      setDeletingKeywordId(keywordId);
  
      try {
        await api.delete(`/keywords/${business.id}/${keywordId}`);
        toast.success('Keyword deleted');
        await fetchKeywords();
      } catch (err) {
        console.error('Delete keyword error:', err);
        toast.error(getErrorMessage(err));
      } finally {
        setDeletingKeywordId(null);
      }
    }

    async function onSubmit(values) {
      setSaving(true);
      try {
        if (mode === 'create') {
          const res = await api.post('/admin/businesses', values);
          const created = res.data?.data?.business || res.data?.business;
  
          if (created?.id && pendingKeywords.length > 0) {
            const results = await Promise.allSettled(
              pendingKeywords.map((kw) => api.post(`/keywords/${created.id}`, { keyword: kw }))
            );
            const failedCount = results.filter((r) => r.status === 'rejected').length;
            if (failedCount > 0) {
              toast.error(`Business created, but ${failedCount} keyword(s) couldn't be saved.`);
            }
          }
  
          toast.success('Business created successfully');
        } else {
          await api.put(`/admin/businesses/${business.id}`, values);
          toast.success('Business updated successfully');
        }
        onSaved();
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setSaving(false);
      }
    }

  return (
    <Modal open={open} onClose={onClose} title={mode === 'create' ? 'Add business' : 'Edit business'} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Business name" required {...register('business_name', { required: true })} />
          <Select label="Category" {...register('category')}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
        {mode === 'create' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Owner name" {...register('owner_name')} />
            <Input label="Owner email" type="email" required {...register('owner_email', { required: true })} />
          </div>
        )}
        <Textarea label="Description" rows={2} {...register('description')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Phone" {...register('phone')} />
          <Input label="Email" type="email" {...register('email')} />
        </div>
        <Input label="Address" {...register('address')} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="City" {...register('city')} />
          <Input label="State" {...register('state')} />
          <Input label="Pincode" {...register('pincode')} />
        </div>
        <Input label="Google review URL" {...register('google_review_url')} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Instagram" {...register('instagram_url')} />
          <Input label="YouTube" {...register('youtube_url')} />
          <Input label="Facebook" {...register('facebook_url')} />
        </div>

        {(mode === 'edit' ? business?.id : true) && (
          <div className="space-y-3 rounded-xl border border-ink-100 p-4">
            <p className="text-sm font-medium text-ink-900">Keywords</p>

            <div className="flex gap-2">
              <Input
                placeholder="Add a keyword…"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
              />
              <Button type="button" icon={Plus} loading={addingKeyword} onClick={handleAddKeyword}>
                Add
              </Button>
            </div>

            {mode === 'create' ? (
              pendingKeywords.length === 0 ? (
                <p className="text-xs text-ink-300">No keywords added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {pendingKeywords.map((kw, index) =>
                    editingPendingIndex === index ? (
                      <div key={`${kw}-${index}`} className="flex items-center gap-1 rounded-full bg-ink-50 px-2 py-1">
                        <input
                          autoFocus
                          value={editingPendingValue}
                          onChange={(e) => setEditingPendingValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); saveEditPendingKeyword(index); }
                            if (e.key === 'Escape') cancelEditPendingKeyword();
                          }}
                          className="w-32 bg-transparent text-xs font-medium text-ink-700 outline-none"
                        />
                        <button type="button" title="Save" onClick={() => saveEditPendingKeyword(index)} className="rounded-full p-0.5 text-emerald-600 hover:bg-emerald-100">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" title="Cancel" onClick={cancelEditPendingKeyword} className="rounded-full p-0.5 text-ink-400 hover:bg-ink-100">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div key={`${kw}-${index}`} className="flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700">
                        <span>{kw}</span>
                        <button type="button" title="Edit" onClick={() => startEditPendingKeyword(index)} className="rounded-full p-0.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700">
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button type="button" title="Delete" onClick={() => removePendingKeyword(index)} className="rounded-full p-0.5 text-coral-500 hover:bg-coral-500/10">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )
            ) : keywordsLoading ? (
              <p className="text-xs text-ink-300">Loading…</p>
            ) : keywords.length === 0 ? (
              <p className="text-xs text-ink-300">No keywords added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
              {keywords.map((k) =>
  editingKeywordId === k.id ? (
    <div
      key={k.id}
      className="flex items-center gap-1 rounded-full bg-ink-50 px-2 py-1"
    >
      <input
        autoFocus
        value={editingKeywordValue}
        onChange={(e) => setEditingKeywordValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSaveEditKeyword(k.id);
          }

          if (e.key === "Escape") {
            cancelEditKeyword();
          }
        }}
        className="w-32 bg-transparent text-xs font-medium text-ink-700 outline-none"
      />

      <button
        type="button"
        title="Save"
        disabled={savingKeywordId === k.id}
        onClick={() => handleSaveEditKeyword(k.id)}
        className="rounded-full p-0.5 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50"
      >
        <Check className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        title="Cancel"
        onClick={cancelEditKeyword}
        className="rounded-full p-0.5 text-ink-400 hover:bg-ink-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : (
    <div
      key={k.id}
      className="flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700"
    >
      <span>{k.keyword}</span>

      <button
        type="button"
        title="Edit"
        onClick={() => startEditKeyword(k)}
        className="rounded-full p-0.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
      >
        <Pencil className="h-3 w-3" />
      </button>

      <button
        type="button"
        title="Delete"
        disabled={deletingKeywordId === k.id}
        onClick={() => handleDeleteKeyword(k.id)}
        className="rounded-full p-0.5 text-coral-500 hover:bg-coral-500/10 disabled:opacity-50"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  )
)}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={saving}>{mode === 'create' ? 'Create business' : 'Save changes'}</Button>
        </div>
      </form>
    </Modal>
  );
}
