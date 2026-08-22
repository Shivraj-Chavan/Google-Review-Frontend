import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Link2, QrCode, Sparkles, Eye, MousePointerClick, Copy, ArrowRight } from 'lucide-react';
import { Card, Loader, EmptyState } from '../../components/Basics';
import Button from '../../components/Button';
import api from '../../services/api';

export default function Dashboard() {
  const [business, setBusiness] = useState(undefined); // undefined = loading, null = none yet
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/businesses/my').then((res) => {
      const b = res.data.data.business;
      setBusiness(b);
      if (b) api.get(`/businesses/${b.id}/analytics`).then((r) => setAnalytics(r.data.data.summary));
    });
  }, []);

  if (business === undefined) return <Loader label="Loading your dashboard…" />;

  if (business === null) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <EmptyState
          icon={Building2}
          title="Welcome! Let's set up your business."
          description="Create your business profile to get a public review page, QR code, and AI review assistant."
          action={
            <Link to="/business/profile">
              <Button icon={ArrowRight}>Create business profile</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const stats = [
    { label: 'Page views', value: analytics?.PAGE_VIEW ?? 0, icon: Eye },
    { label: 'Google clicks', value: analytics?.GOOGLE_CLICK ?? 0, icon: MousePointerClick },
    { label: 'AI reviews generated', value: analytics?.REVIEW_GENERATED ?? 0, icon: Sparkles },
    { label: 'Reviews copied', value: analytics?.REVIEW_COPIED ?? 0, icon: Copy }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Hey, {business.business_name} 👋</h1>
        <p className="text-sm text-ink-300">Here's how your review page is doing.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="text-center sm:text-left">
            <Icon className="mb-2 h-5 w-5 text-ink-500" />
            <p className="font-display text-2xl font-semibold text-ink-900">{value.toLocaleString()}</p>
            <p className="text-xs text-ink-300">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/business/profile">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <Building2 className="mb-3 h-5 w-5 text-ink-700" />
            <div>
              <p className="font-medium text-ink-900">Business profile</p>
              <p className="text-xs text-ink-300">Edit details, logo & links</p>
            </div>
          </Card>
        </Link>
        <Link to="/business/images">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <Sparkles className="mb-3 h-5 w-5 text-ink-700" />
            <div>
              <p className="font-medium text-ink-900">Gallery images</p>
              <p className="text-xs text-ink-300">Showcase your business</p>
            </div>
          </Card>
        </Link>
        <Link to="/business/review-link">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <QrCode className="mb-3 h-5 w-5 text-ink-700" />
            <div>
              <p className="font-medium text-ink-900">Review link & QR</p>
              <p className="text-xs text-ink-300">Share it in-store</p>
            </div>
          </Card>
        </Link>
      </div>

      <Card className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link2 className="h-5 w-5 text-ink-700" />
          <div>
            <p className="text-sm font-medium text-ink-900">Public page</p>
            <p className="break-all font-mono text-xs text-ink-300">/review/{business.slug}</p>
          </div>
        </div>
        <a href={`/review/${business.slug}`} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">View page</Button>
        </a>
      </Card>
    </div>
  );
}
