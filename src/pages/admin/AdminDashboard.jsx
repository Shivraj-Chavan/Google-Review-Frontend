import { useEffect, useState } from 'react';
import { Building2, Users, CheckCircle2, XCircle, Eye, MousePointerClick, QrCode, Sparkles } from 'lucide-react';
import { Card, Loader } from '../../components/Basics';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data.data));
  }, []);

  if (!stats) return <Loader label="Loading dashboard…" />;

  const cards = [
    { label: 'Total business users', value: stats.totalBusinessUsers, icon: Users },
    { label: 'Total businesses', value: stats.totalBusinesses, icon: Building2 },
    { label: 'Active businesses', value: stats.activeBusinesses, icon: CheckCircle2 },
    { label: 'Inactive businesses', value: stats.inactiveBusinesses, icon: XCircle },
    { label: 'Review page visits', value: stats.totalReviewPageVisits, icon: Eye },
    { label: 'Google redirects', value: stats.totalGoogleRedirects, icon: MousePointerClick },
    { label: 'AI reviews generated', value: stats.totalReviewsGenerated, icon: Sparkles },
    { label: 'QR generations', value: stats.totalQrGenerated, icon: QrCode }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Admin dashboard</h1>
        <p className="text-sm text-ink-300">Platform-wide overview.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <Icon className="mb-2 h-5 w-5 text-ink-500" />
            <p className="font-display text-2xl font-semibold text-ink-900">{value.toLocaleString()}</p>
            <p className="text-xs text-ink-300">{label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
