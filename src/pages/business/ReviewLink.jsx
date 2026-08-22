import { useEffect, useState } from 'react';
import { Building2, Clock, MessageCircle } from 'lucide-react';
import { EmptyState, Loader } from '../../components/Basics';
import Button from '../../components/Button';
import QRCodeCard from '../../components/QRCodeCard';
import api from '../../services/api';

// TODO: replace with your real admin WhatsApp number (country code, no + or spaces)
const ADMIN_WHATSAPP_NUMBER = '917400332999';

export default function ReviewLink() {
  const [business, setBusiness] = useState(undefined);
  const [qr, setQr] = useState(undefined);

useEffect(() => {
    api.get('/businesses/my').then((res) => {
      const b = res.data.data.business;
      setBusiness(b);
      if (b && b.status === 'ACTIVE') api.get(`/businesses/${b.id}/qr`).then((r) => setQr(r.data.data));
    });
  }, []);

  if (business === undefined) return <Loader label="Loading…" />;

if (business === null) {
    return (
      <EmptyState icon={Building2} title="Create your business first" description="You'll get a review link and QR code once your profile is set up." />
    );
  }

  if (business.status !== 'ACTIVE') {
    const whatsappMessage = encodeURIComponent(
      `Hi, I'd like to request activation for my business "${business.business_name}" (slug: ${business.slug}) on Loop.`
    );
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Review link & QR code</h1>
          <p className="text-sm text-ink-300">Print the QR code for your counter, or share the link directly with customers.</p>
        </div>
        <EmptyState
          icon={Clock}
          title="Pending approval"
          description="Your business is under review. Your review link and QR code will be available once an admin activates your profile."
          action={
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" icon={MessageCircle}>
                Contact admin on WhatsApp
              </Button>
            </a>
          }
        />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Review link & QR code</h1>
        <p className="text-sm text-ink-300">Print the QR code for your counter, or share the link directly with customers.</p>
      </div>
      <QRCodeCard url={qr?.url} qrDataUrl={qr?.qrDataUrl} slug={business.slug} loading={qr === undefined} />
    </div>
  );
}
