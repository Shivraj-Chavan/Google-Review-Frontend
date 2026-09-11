import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save, Tag, Plus, X, Pencil, Check } from 'lucide-react';
import { Card, Loader } from '../../components/Basics';
import { Input, Textarea } from '../../components/Input';
import { LogoUploader } from '../../components/ImageUploader';
import Button from '../../components/Button';
import api, { getErrorMessage } from '../../services/api';

const CATEGORIES = [
  'Restaurant', 'Cafe', 'Salon & Spa', 'Dental Clinic', 'Clinic / Hospital', 'Retail Store',
  'Gym & Fitness', 'Hotel', 'Automotive', 'Real Estate', 'Education', 'Professional Services', 'Other'
];

export default function Profile() {
  const navigate = useNavigate();
  const [business, setBusiness] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [pendingLogoPreview, setPendingLogoPreview] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [keywords, setKeywords] = useState([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [addingKeyword, setAddingKeyword] = useState(false);
  const [editingKeywordId, setEditingKeywordId] = useState(null);
  const [editKeywordValue, setEditKeywordValue] = useState('');
  const [savingKeywordId, setSavingKeywordId] = useState(null);
  const [deletingKeywordId, setDeletingKeywordId] = useState(null);

  // Held locally until the business is created for the first time — same
  // pattern as pendingLogoFile below.
  const [pendingKeywords, setPendingKeywords] = useState([]);
  const [editingPendingIndex, setEditingPendingIndex] = useState(null);
  const [editPendingValue, setEditPendingValue] = useState('');

  useEffect(() => {
    api.get('/businesses/my').then((res) => {
      const b = res.data.data.business;
      setBusiness(b);
      if (b) reset(b);
    });
  }, [reset]);

  useEffect(() => {
    if (!business?.id) return;
    setLoadingKeywords(true);
    api.get(`/businesses/${business.id}/keywords`)
      .then((res) => setKeywords(res.data.data?.keywords || res.data.keywords || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoadingKeywords(false));
  }, [business?.id]);

  async function handleAddKeyword(e) {
    e?.preventDefault?.();
    const trimmed = newKeyword.trim();
    if (!trimmed) return;

    // No business yet — hold it locally; it saves automatically once
    // "Save profile" creates the business (see onSubmit).
    if (!business?.id) {
      if (pendingKeywords.includes(trimmed)) {
        toast.error('Keyword already added');
        return;
      }
      setPendingKeywords((prev) => [...prev, trimmed]);
      setNewKeyword('');
      return;
    }

    setAddingKeyword(true);
    try {
      const res = await api.post(`/businesses/${business.id}/keywords`, { keyword: trimmed });
      const created = res.data.data?.keyword || res.data.keyword;
      setKeywords((prev) => [created, ...prev]);
      setNewKeyword('');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setAddingKeyword(false);
    }
  }

  function startEditPendingKeyword(index) {
    setEditingPendingIndex(index);
    setEditPendingValue(pendingKeywords[index]);
  }

  function cancelEditPendingKeyword() {
    setEditingPendingIndex(null);
    setEditPendingValue('');
  }

  function saveEditPendingKeyword(index) {
    const trimmed = editPendingValue.trim();
    if (!trimmed) return;
    setPendingKeywords((prev) => prev.map((k, i) => (i === index ? trimmed : k)));
    cancelEditPendingKeyword();
  }

  function removePendingKeyword(index) {
    setPendingKeywords((prev) => prev.filter((_, i) => i !== index));
  }

  function startEditKeyword(kw) {
    setEditingKeywordId(kw.id);
    setEditKeywordValue(kw.keyword);
  }

  function cancelEditKeyword() {
    setEditingKeywordId(null);
    setEditKeywordValue('');
  }

  async function handleSaveKeyword(keywordId) {
    const trimmed = editKeywordValue.trim();
    if (!trimmed || !business?.id) return;
    setSavingKeywordId(keywordId);
    try {
      await api.put(`/businesses/${business.id}/keywords/${keywordId}`, { keyword: trimmed });
      setKeywords((prev) => prev.map((k) => (k.id === keywordId ? { ...k, keyword: trimmed } : k)));
      cancelEditKeyword();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingKeywordId(null);
    }
  }

  async function handleDeleteKeyword(keywordId) {
    if (!business?.id) return;
    setDeletingKeywordId(keywordId);
    try {
      await api.delete(`/businesses/${business.id}/keywords/${keywordId}`);
      setKeywords((prev) => prev.filter((k) => k.id !== keywordId));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingKeywordId(null);
    }
  }

  async function uploadLogoFor(businessId, file) {
    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('logo', file);
    try {
      const res = await api.put(`/businesses/${businessId}/logo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.data.logo;
    } finally {
      setUploadingLogo(false);
    }
  }

  async function onSubmit(values) {
    setSaving(true);
    const isFirstCreate = !business;
    try {
      let savedBusiness;
      if (business) {
        const res = await api.put(`/businesses/${business.id}`, values);
        savedBusiness = res.data.data.business;
      } else {
        const res = await api.post('/businesses', values);
        savedBusiness = res.data.data.business;
      }

      // If a logo was picked before the business existed (or was changed since), upload it now.
      if (pendingLogoFile) {
        const logoUrl = await uploadLogoFor(savedBusiness.id, pendingLogoFile);
        savedBusiness = { ...savedBusiness, logo: logoUrl };
        setPendingLogoFile(null);
        setPendingLogoPreview(null);
      }

      // Same for keywords added before the business existed.
      if (isFirstCreate && pendingKeywords.length > 0) {
        const results = await Promise.allSettled(
          pendingKeywords.map((kw) => api.post(`/businesses/${savedBusiness.id}/keywords`, { keyword: kw }))
        );
        const created = results
          .filter((r) => r.status === 'fulfilled')
          .map((r) => r.value.data.data?.keyword || r.value.data.keyword);
        setKeywords((prev) => [...created, ...prev]);

        const failedCount = results.filter((r) => r.status === 'rejected').length;
        if (failedCount > 0) {
          setPendingKeywords((prev) => prev.filter((_, i) => results[i].status === 'rejected'));
          toast.error(`${failedCount} keyword(s) couldn't be saved — you can re-add them.`);
        } else {
          setPendingKeywords([]);
        }
      }

      setBusiness(savedBusiness);
      toast.success(isFirstCreate ? 'Business created! Slug generated automatically.' : 'Profile saved successfully.');

      if (isFirstCreate) {
        navigate('/business/review-link');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }
  async function handleLogoUpload(file) {
    // Business already exists — upload immediately, as before.
    if (business) {
      try {
        const logoUrl = await uploadLogoFor(business.id, file);
        setBusiness((b) => ({ ...b, logo: logoUrl }));
        toast.success('Logo updated!');
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
      return;
    }

    // No business yet — hold the file locally and preview it; it uploads
    // automatically the moment "Save profile" creates the business.
    setPendingLogoFile(file);
    setPendingLogoPreview(URL.createObjectURL(file));
    toast.success('Logo selected — it will upload when you save your profile.');
  }

  if (business === undefined) return <Loader label="Loading profile…" />;

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Business profile</h1>
        <p className="text-sm text-ink-300">This information appears on your public review page.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="space-y-4">
          <p className="font-medium text-ink-900">Logo</p>
          <LogoUploader currentUrl={pendingLogoPreview || business?.logo} onUpload={handleLogoUpload} uploading={uploadingLogo} />
        </Card>

        <Card className="space-y-4">
          <p className="font-medium text-ink-900">Basic information</p>
          <Input
            label="Business name"
            placeholder="e.g. Mumbai Dental Care"
            error={errors.business_name?.message}
            {...register('business_name', { required: 'Business name is required' })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-900">Category</span>
              <select
                {...register('category')}
                className="w-full rounded-xl border border-ink-100 bg-surface px-3.5 py-2.5 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <Input
              label="Phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9876543210"
              error={errors.phone?.message}
              onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); }}
              {...register('phone', {
                pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits' }
              })}
            />
          </div>
          <Textarea label="Description" rows={3} placeholder="What makes your business great?" {...register('description')} />

<div>
  <p className="mb-1.5 block text-sm font-medium text-ink-900">
    Services / Highlights <span className="font-normal text-ink-300">(optional)</span>
  </p>
  <p className="mb-2 text-xs text-ink-300">
    Add keywords describing your services — customers pick these when leaving a review.
  </p>

  <div className="flex gap-2 mb-3">
    <input
      type="text"
      value={newKeyword}
      onChange={(e) => setNewKeyword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddKeyword(e);
        }
      }}
      placeholder="e.g. Free consultation"
      maxLength={100}
      className="flex-1 rounded-xl border border-ink-100 bg-surface px-3.5 py-2.5 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
    />
    <Button type="button" onClick={handleAddKeyword} icon={Plus} loading={addingKeyword} disabled={!newKeyword.trim()}>
      Add
    </Button>
  </div>

  {!business && pendingKeywords.length > 0 && (
    <p className="mb-2 text-xs text-amber-600">
      These will save automatically once you save your profile below.
    </p>
  )}

  {!business ? (
    pendingKeywords.length === 0 ? (
      <p className="text-sm text-ink-300">No keywords added yet.</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {pendingKeywords.map((kw, index) => (
          <div
            key={`${kw}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-100 px-3 py-1.5 text-sm font-medium text-ink-700"
          >
            {editingPendingIndex === index ? (
              <>
                <input
                  autoFocus
                  value={editPendingValue}
                  onChange={(e) => setEditPendingValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditPendingKeyword(index);
                    if (e.key === 'Escape') cancelEditPendingKeyword();
                  }}
                  className="w-32 rounded border border-ink-100 px-2 py-0.5 text-sm"
                />
                <button type="button" onClick={() => saveEditPendingKeyword(index)}>
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={cancelEditPendingKeyword}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <>
                <Tag className="h-3.5 w-3.5 text-ink-300" />
                <span>{kw}</span>
                <button type="button" onClick={() => startEditPendingKeyword(index)}>
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => removePendingKeyword(index)}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    )
  ) : loadingKeywords ? (
    <p className="text-sm text-ink-300">Loading keywords…</p>
  ) : keywords.length === 0 ? (
    <p className="text-sm text-ink-300">No keywords added yet.</p>
  ) : (
    <div className="flex flex-wrap gap-2">
      {keywords.map((kw) => (
        <div
          key={kw.id}
          className="inline-flex items-center gap-2 rounded-full border border-ink-100 px-3 py-1.5 text-sm font-medium text-ink-700"
        >
          {editingKeywordId === kw.id ? (
            <>
              <input
                autoFocus
                value={editKeywordValue}
                onChange={(e) => setEditKeywordValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveKeyword(kw.id);
                  if (e.key === 'Escape') cancelEditKeyword();
                }}
                className="w-32 rounded border border-ink-100 px-2 py-0.5 text-sm"
              />
              <button type="button" onClick={() => handleSaveKeyword(kw.id)} disabled={savingKeywordId === kw.id}>
                <Check className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={cancelEditKeyword}>
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <Tag className="h-3.5 w-3.5 text-ink-300" />
              <span>{kw.keyword}</span>
              <button type="button" onClick={() => startEditKeyword(kw)}>
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => handleDeleteKeyword(kw.id)} disabled={deletingKeywordId === kw.id}>
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )}
</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
            <Input label="Website" placeholder="https://" error={errors.website?.message} {...register('website')} />
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="font-medium text-ink-900">Address</p>
          <Input label="Address" {...register('address')} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" {...register('city')} />
            <Input label="State" {...register('state')} />
            <Input label="Pincode" {...register('pincode')} />
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="font-medium text-ink-900">Google review link</p>
          <Input
            placeholder="https://g.page/r/xxxxxxxx/review"
            error={errors.google_review_url?.message}
            hint="Customers are redirected here after generating a review."
            {...register('google_review_url')}
          />
        </Card>

        <Card className="space-y-4">
          <p className="font-medium text-ink-900">Social links</p>
          <Input label="Instagram" placeholder="https://instagram.com/…" error={errors.instagram_url?.message} {...register('instagram_url')} />
          <Input label="YouTube" placeholder="https://youtube.com/…" error={errors.youtube_url?.message} {...register('youtube_url')} />
          <Input label="Facebook" placeholder="https://facebook.com/…" error={errors.facebook_url?.message} {...register('facebook_url')} />
        </Card>

        <div className="sticky bottom-16 z-10 sm:bottom-0 sm:static">
          <Button type="submit" size="lg" icon={Save} loading={saving} className="w-full shadow-pop sm:w-auto">
            Save profile
          </Button>
        </div>
      </form>
    </div>
  );
}
