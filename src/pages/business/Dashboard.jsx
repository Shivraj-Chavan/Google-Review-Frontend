
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Building2,
  Link2,
  QrCode,
  Sparkles,
  Eye,
  MousePointerClick,
  Copy,
  ArrowRight,
  CalendarClock,
  MessageSquareReply,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { getErrorMessage } from '../../services/api';
import { Card, Loader, EmptyState } from '../../components/Basics';
import Button from '../../components/Button';
import api from '../../services/api';

export default function Dashboard() {
  const [business, setBusiness] = useState(undefined);
  const [analytics, setAnalytics] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Google Business Profile connection & Auto Reply
  const [googleConnected, setGoogleConnected] = useState(false);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [savingAutoReply, setSavingAutoReply] = useState(false);

  // Handle OAuth callback status from URL
  useEffect(() => {
    const status = searchParams.get('google_business');
    if (!status) return;

    if (status === 'connected') {
      toast.success('Google Business Profile connected successfully! Auto Reply is now enabled.');
      setGoogleConnected(true);
      setAutoReplyEnabled(true);
    } else if (status === 'cancelled') {
      toast.error('Google authorization was cancelled.');
    } else if (status === 'no_account') {
      toast.error(
        'No Google Business Profile account found for this Google login. Please use the Google account that manages your business.',
        { duration: 6000 }
      );
    } else if (status === 'no_location') {
      toast.error(
        'Google account connected, but no business locations were found in Google Business Profile.',
        { duration: 6000 }
      );
    } else if (status === 'api_error' || status === 'error') {
      const rawMsg = searchParams.get('message') || 'Google Business connection failed. Please check Google Cloud API permissions.';
      toast.error(`Connection failed: ${decodeURIComponent(rawMsg)}`, { duration: 7000 });
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('google_business');
    newParams.delete('message');
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    api.get('/businesses/my').then((res) => {
      const b = res.data.data.business;

      setBusiness(b);

      if (b) {
        api
          .get(`/businesses/${b.id}/analytics`)
          .then((r) => setAnalytics(r.data.data.summary))
          .catch(() => {});

        // Fetch auto-reply settings
        api
          .get(`/businesses/${b.id}/auto-reply`)
          .then((r) => {
            const enabled = Boolean(
              r.data?.data?.settings?.enabled
            );

            setAutoReplyEnabled(enabled);
          })
          .catch(() => {
            setAutoReplyEnabled(false);
          });

        // Fetch Google Business Profile connection status
        api
          .get(`/google-business/status/${b.id}`)
          .then((r) => {
            setGoogleConnected(Boolean(r.data?.data?.connected));
          })
          .catch(() => {
            setGoogleConnected(false);
          });
      }
    });
  }, []);

  /**
   * Initiate Google Business Profile OAuth
   */
  const connectGoogleAccount = async () => {
    if (!business?.id || connectingGoogle) return;

    try {
      const res = await api.post('/google-business/connect', {
        businessId: business.id,
      });
  
      const authUrl = res.data?.data?.authUrl;
  
      if (!authUrl) {
        toast.error('Google authorization URL was not returned');
        return;
      }
  
      window.location.href = authUrl;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        'Unable to connect Google Business Profile'
      );
      setConnectingGoogle(false);
    }
  };

  /**
   * Disconnect Google Business Profile
   */
  const disconnectGoogleAccount = async () => {
    if (!business?.id) return;

    try {
      await api.post('/google-business/disconnect', {
        businessId: business.id,
      });

      setGoogleConnected(false);
      setAutoReplyEnabled(false);
      toast.success('Google Business Profile disconnected');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to disconnect Google Business Profile'
      );
    }
  };

  /**
   * Toggle Auto Reply.
   *
   * OFF = no automatic processing.
   * ON  = backend starts/permits automatic processing.
   */
  const toggleAutoReply = async () => {
    if (!business?.id || savingAutoReply) return;

    if (!googleConnected && !autoReplyEnabled) {
      await connectGoogleAccount();
      return;
    }

    const newValue = !autoReplyEnabled;

    try {
      setSavingAutoReply(true);

      const res = await api.put(
        `/businesses/${business.id}/auto-reply`,
        {
          enabled: newValue,
        }
      );

      const savedValue = Boolean(
        res.data?.data?.settings?.enabled
      );

      setAutoReplyEnabled(savedValue);

      if (savedValue) {
        toast.success('Google Review Auto Reply is now ON');
      } else {
        toast.success('Google Review Auto Reply is now OFF');
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        '';

      if (
        message.toLowerCase().includes('connect your google business')
      ) {
        await connectGoogleAccount();
      } else {
        toast.error(
          message || 'Failed to update Auto Reply'
        );
      }
    } finally {
      setSavingAutoReply(false);
    }
  };

  if (business === undefined) {
    return <Loader label="Loading your dashboard…" />;
  }

  if (business === null) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <EmptyState
          icon={Building2}
          title="Welcome! Let's set up your business."
          description="Create your business profile to get a public review page, QR code, and AI review assistant."
          action={
            <Link to="/business/profile">
              <Button icon={ArrowRight}>
                Create business profile
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const stats = [
    {
      label: 'Page views',
      value: analytics?.PAGE_VIEW ?? 0,
      icon: Eye,
    },
    {
      label: 'Google clicks',
      value: analytics?.GOOGLE_CLICK ?? 0,
      icon: MousePointerClick,
    },
    {
      label: 'AI reviews generated',
      value: analytics?.REVIEW_GENERATED ?? 0,
      icon: Sparkles,
    },
    {
      label: 'Reviews copied',
      value: analytics?.REVIEW_COPIED ?? 0,
      icon: Copy,
    },
  ];

  const subStart = business.subscription_start_date;
  const subEnd = business.subscription_end_date;

  let daysRemaining = null;
  let subExpired = false;

  if (subEnd) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const todayStart = new Date(new Date().toDateString());
    const endDate = new Date(subEnd);

    daysRemaining = Math.ceil(
      (endDate - todayStart) / msPerDay
    );

    subExpired = daysRemaining < 0;
  }

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '—';

  return (
    <div className="space-y-6">

      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          Hey, {business.business_name} 👋
        </h1>

        <p className="text-sm text-ink-300">
          Here's how your review page is doing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card
            key={label}
            className="text-center sm:text-left"
          >
            <Icon className="mb-2 h-5 w-5 text-ink-500" />

            <p className="font-display text-2xl font-semibold text-ink-900">
              {value.toLocaleString()}
            </p>

            <p className="text-xs text-ink-300">
              {label}
            </p>
          </Card>
        ))}
      </div>

      {/* Business shortcuts */}
      <div className="grid gap-4 sm:grid-cols-3">

        <Link to="/business/profile">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <Building2 className="mb-3 h-5 w-5 text-ink-700" />

            <div>
              <p className="font-medium text-ink-900">
                Business profile
              </p>

              <p className="text-xs text-ink-300">
                Edit details, logo & links
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/business/images">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <Sparkles className="mb-3 h-5 w-5 text-ink-700" />

            <div>
              <p className="font-medium text-ink-900">
                Gallery images
              </p>

              <p className="text-xs text-ink-300">
                Showcase your business
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/business/review-link">
          <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-pop">
            <QrCode className="mb-3 h-5 w-5 text-ink-700" />

            <div>
              <p className="font-medium text-ink-900">
                Review link & QR
              </p>

              <p className="text-xs text-ink-300">
                Share it in-store
              </p>
            </div>
          </Card>
        </Link>

      </div>

      {/* Public page */}
      <Card className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link2 className="h-5 w-5 text-ink-700" />

          <div>
            <p className="text-sm font-medium text-ink-900">
              Public page
            </p>

            <p className="break-all font-mono text-xs text-ink-300">
              /review/{business.slug}
            </p>
          </div>
        </div>

        <a
          href={`/review/${business.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="sm">
            View page
          </Button>
        </a>
      </Card>

      {/* Subscription */}
      {subEnd && (
        <Card className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-ink-700" />

            <div>
              <p className="text-sm font-medium text-ink-900">
                Subscription
              </p>

              <p className="text-xs text-ink-300">
                {fmtDate(subStart)} → {fmtDate(subEnd)}
              </p>
            </div>
          </div>

          <div className="text-right">
            {subExpired ? (
              <p className="font-display text-lg font-semibold text-coral-500">
                Expired
              </p>
            ) : (
              <>
                <p className="font-display text-2xl font-semibold text-ink-900">
                  {daysRemaining}
                </p>

                <p className="text-xs text-ink-300">
                  {daysRemaining === 1
                    ? 'day left'
                    : 'days left'}
                </p>
              </>
            )}
          </div>

        </Card>
      )}

<Card className="flex items-center justify-between gap-4">
  <div>
    <p className="font-medium text-ink-900">
      Google Business Profile
    </p>
    <p className="text-xs text-ink-300">
      Connect your Google Business Profile to enable Auto Reply.
    </p>
  </div>

  <Button
    type="button"
    onClick={connectGoogleBusiness}
  >
    Connect Google
  </Button>
</Card>

      {/* Google Review Auto Reply */}
      <Card className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <MessageSquareReply className="h-5 w-5 text-ink-700" />
            <div>
              <p className="font-medium text-ink-900">
                Google Review Auto Reply
              </p>
              <p className="text-xs text-ink-300">
                Automatically reply to new Google reviews using AI.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {googleConnected ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Google Connected
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => connectGoogleAccount()}
                loading={connectingGoogle}
              >
                Connect Google Account
              </Button>
            )}

            {/* ON / OFF Switch */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleAutoReply()}
                disabled={savingAutoReply || connectingGoogle}
                aria-label="Toggle Auto Reply"
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  autoReplyEnabled ? 'bg-emerald-500' : 'bg-ink-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    autoReplyEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>

              <span className="text-xs font-medium text-ink-700">
                {autoReplyEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-medium ${
            autoReplyEnabled
              ? 'bg-emerald-50 text-emerald-700'
              : googleConnected
              ? 'bg-sky-50 text-sky-700'
              : 'bg-ink-50 text-ink-500'
          }`}
        >
          <span>
            {autoReplyEnabled
              ? '● Auto Reply Active — AI will automatically respond to new reviews'
              : googleConnected
              ? '● Google Connected — Auto Reply is currently paused (toggle ON to activate)'
              : '○ Google Account Not Connected — Connect your Google Business Profile to enable AI replies'}
          </span>

          {googleConnected && (
            <button
              type="button"
              onClick={() => disconnectGoogleAccount()}
              className="font-normal text-ink-400 underline transition hover:text-coral-500"
            >
              Disconnect Google Profile
            </button>
          )}
        </div>
      </Card>

    </div>
  );
}

