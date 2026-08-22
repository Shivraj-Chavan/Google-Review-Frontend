import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GalleryUploader } from '../../components/ImageUploader';
import { Card, Loader, EmptyState } from '../../components/Basics';
import { Building2 } from 'lucide-react';
import api, { getErrorMessage } from '../../services/api';

export default function Images() {
  const [business, setBusiness] = useState(undefined);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get('/businesses/my').then((res) => setBusiness(res.data.data.business));
  }, []);

  async function handleUpload(file) {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.post(`/businesses/${business.id}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBusiness((b) => ({
        ...b,
        images: [...b.images, { id: res.data.data.id, image_url: res.data.data.image_url }]
      }));
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageId) {
    try {
      await api.delete(`/businesses/${business.id}/images/${imageId}`);
      setBusiness((b) => ({ ...b, images: b.images.filter((img) => img.id !== imageId) }));
      toast.success('Image removed');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleReorder(order) {
    setBusiness((b) => ({ ...b, images: order.map((id) => b.images.find((img) => img.id === id)) }));
    try {
      await api.put(`/businesses/${business.id}/images/reorder`, { order });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  if (business === undefined) return <Loader label="Loading images…" />;

  if (business === null) {
    return (
      <EmptyState
        icon={Building2}
        title="Create your business first"
        description="Add your business profile before uploading gallery images."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Gallery images</h1>
        <p className="text-sm text-ink-300">Shown on your public review page. The first image is used as the primary photo.</p>
      </div>
      <Card>
        <GalleryUploader
          images={business.images}
          onUpload={handleUpload}
          onDelete={handleDelete}
          onReorder={handleReorder}
          uploading={uploading}
        />
      </Card>
    </div>
  );
}
