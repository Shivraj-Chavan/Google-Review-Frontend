import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
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

  useEffect(() => {
    api.get('/businesses/my').then((res) => {
      const b = res.data.data.business;
      setBusiness(b);
      if (b) reset(b);
    });
  }, [reset]);

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
