import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, QrCode, Sparkles, ArrowUpRight, ShieldCheck,
  UserPlus, Building2, Share2, ScanLine, PenLine, ThumbsUp,
  X, Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { getErrorMessage } from '../services/api';
import DevLoginForm from '../components/DevLoginForm';

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCredential = useCallback(async (idToken) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { idToken });
      const { token, user } = res.data.data;
      login(token, user);
      navigate('/business/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [login, navigate]);

  return (
    <div className="min-h-screen overflow-hidden bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
          </div>
          <span className="font-display text-xl font-semibold text-ink-900">Google Review</span>
        </div>
        <a href="/admin/login" className="text-sm font-medium text-ink-300 hover:text-ink-700">Admin</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-2 lg:pt-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
            <Sparkles className="h-3 w-3" /> AI-assisted, never AI-faked
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            Every happy customer is one tap from a Google review.
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-500 sm:text-lg">
            Loop gives your business a QR code that turns a five-star moment into
            a written review — with an AI assist that helps customers put their
            real experience into words, never invents one for them.
          </p>

          <div className="mt-8 max-w-xs">
            <GoogleLoginButton onCredential={handleCredential} />
            {loading && <p className="mt-3 text-center text-sm text-ink-300">Signing you in…</p>}
            <p className="mt-3 text-center text-xs text-ink-300">Free to start · No credit card required</p>

            {import.meta.env.DEV && (
              <DevLoginForm onLoggedIn={() => navigate('/business/dashboard')} />
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-500">
            <div className="flex items-center gap-2"><QrCode className="h-4 w-4 text-ink-700" /> Instant QR &amp; link</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-ink-700" /> No fake reviews, ever</div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-200/40 to-ink-100/40 blur-2xl" />
          <div className="rounded-xl2 border border-ink-100 bg-surface p-6 shadow-pop">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-ink-50" />
              <div>
                <p className="font-display font-semibold text-ink-900">Mumbai Dental Care</p>
                <p className="text-xs text-ink-300">Dental Clinic</p>
              </div>
            </div>
            <div className="mb-4 flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
            <div className="rounded-xl bg-amber-50/70 p-3 text-sm text-ink-700">
              "The doctor was professional and explained everything clearly.
              The staff was friendly and the clinic was spotless. Highly recommend!"
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink-700 py-2.5 text-sm font-medium text-paper">
              Leave a Google review <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          </div>
      </section>

      {/* How it works */}
      <section className="border-t border-ink-100 bg-surface px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-900">How it works</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-500">
              Two sides, one loop — set up once as a business, then every customer visit becomes a chance for a real review.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Business owner steps */}
            <div>
              <p className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
                <Building2 className="h-5 w-5 text-ink-700" /> For business owners
              </p>
              <ol className="space-y-5">
                <Step icon={UserPlus} title="Sign in with Google" description="No forms, no passwords — one tap and you're in." />
                <Step icon={Building2} title="Add your business details" description="Name, category, logo, photos, and your Google review link." />
                <Step icon={Share2} title="Get your QR code & link" description="Instantly generated, ready to print for your counter or share online." />
              </ol>
            </div>

            {/* Customer steps */}
            <div>
              <p className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
                <ScanLine className="h-5 w-5 text-ink-700" /> For customers
              </p>
              <ol className="space-y-5">
                <Step icon={ScanLine} title="Scan the QR code" description="No app, no login — opens straight in their browser." />
                <Step icon={PenLine} title="Rate & get an AI-drafted review" description="They rate their real experience; Loop helps them put it into words." />
                <Step icon={ThumbsUp} title="Edit, copy, and post to Google" description="They review the draft, tweak anything, then post it themselves." />
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="border-t border-ink-100 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-900">Before Loop vs. after Loop</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl2 border border-ink-100 bg-surface p-6">
              <p className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900">
                <X className="h-4 w-4 text-coral-500" /> Before
              </p>
              <ul className="space-y-3 text-sm text-ink-500">
                <li>Customers forget to leave a review after they leave</li>
                <li>Staff have to ask verbally, which feels awkward</li>
                <li>Customers stare at a blank Google review box and give up</li>
                <li>No visibility into how many people even saw the request</li>
              </ul>
            </div>
            <div className="rounded-xl2 border border-amber-200 bg-amber-50/50 p-6">
              <p className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900">
                <Check className="h-4 w-4 text-ink-700" /> After
              </p>
              <ul className="space-y-3 text-sm text-ink-700">
                <li>One QR code on the counter does the asking for you</li>
                <li>Customers get help writing a genuine review in seconds</li>
                <li>Higher completion rate — no blank page, no writer's block</li>
                <li>Dashboard shows views, drafts generated, and Google clicks</li>
              </ul>
            </div>
          </div>
        </div>
        </section>

{/* Footer */}
<footer className="border-t border-ink-100 bg-surface px-5 py-10 sm:px-8">
  <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
        <Star className="h-3.5 w-3.5 fill-amber-400" />
      </div>
      <span className="font-display text-base font-semibold text-ink-900">Google Review</span>
    </div>

    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-300">
      {/* <a href="/admin/login" className="hover:text-ink-700">Admin login</a> */}
      {/* <a href="#" className="hover:text-ink-700">Privacy policy</a>
      <a href="#" className="hover:text-ink-700">Terms of service</a> */}
              <a    
              href="https://wa.me/917400332999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Google%20Review"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-700"
            >
              Contact
            </a>
    </nav>

    <p className="text-xs text-ink-300">© {new Date().getFullYear()} Vortex Web Technology. All rights reserved.</p>
  </div>
</footer>
</div>
);
}

function Step({ icon: Icon, title, description }) {
  return (
    <li className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-medium text-ink-900">{title}</p>
        <p className="text-sm text-ink-300">{description}</p>
      </div>
    </li>
  );
}
