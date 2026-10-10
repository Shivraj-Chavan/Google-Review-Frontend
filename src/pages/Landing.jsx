// import { useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Star, QrCode, Sparkles, ArrowUpRight, ShieldCheck,
//   UserPlus, Building2, Share2, ScanLine, PenLine, ThumbsUp,
//   X, Check
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import { getErrorMessage } from '../services/api';
// import DevLoginForm from '../components/DevLoginForm';

// export default function Landing() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const handleCredential = useCallback(async (idToken) => {
//     setLoading(true);
//     try {
//       const res = await api.post('/auth/google', { idToken });
//       const { token, user } = res.data.data;
//       login(token, user);
//       navigate('/business/dashboard');
//     } catch (err) {
//       toast.error(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   }, [login, navigate]);

//   return (
//     <div className="min-h-screen overflow-hidden bg-paper">
//       <header className="mx-auto flex max-w-8xl items-center justify-between px-5 py-6 sm:px-8">
//         <div className="flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
//             <Star className="h-4 w-4 fill-amber-400" />
//           </div>
//           <span className="font-display text-xl font-semibold text-ink-900">Google ReviewPilot</span>
//         </div>
//         {/* <a href="/admin/login" className="text-sm font-medium text-ink-300 hover:text-ink-700">Admin</a> */}
//       </header>

//       <section className="mx-auto grid max-w-8xl items-center gap-12 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-2 lg:pt-2">
//         <div>
//           <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
//             <Sparkles className="h-3 w-3" /> AI-assisted, never AI-faked
//           </div>
//           <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl lg:text-[3.4rem]">
//             Every happy customer is one tap from a Google review.
//           </h1>
//           <p className="mt-5 max-w-md text-base text-ink-500 sm:text-lg">
//             Loop gives your business a QR code that turns a five-star moment into
//             a written review — with an AI assist that helps customers put their
//             real experience into words, never invents one for them.
//           </p>

//           <div className="mt-8 max-w-xs">
//             <GoogleLoginButton onCredential={handleCredential} />
//             {loading && <p className="mt-3 text-center text-sm text-ink-300">Signing you in…</p>}
//             <p className="mt-3 text-center text-xs text-ink-300">Free to start · No credit card required</p>

//             {/* {import.meta.env.DEV && (
//               <DevLoginForm onLoggedIn={() => navigate('/business/dashboard')} />
//             )} */}
//           </div>

//           <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-500">
//             <div className="flex items-center gap-2"><QrCode className="h-4 w-4 text-ink-700" /> Instant QR &amp; link</div>
//             <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-ink-700" /> No fake reviews, ever</div>
//           </div>
//         </div>

//         <div className="relative mx-auto w-full max-w-sm">
//           <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-200/40 to-ink-100/40 blur-2xl" />
//           <div className="rounded-xl2 border border-ink-100 bg-surface p-6 shadow-pop">
//             <div className="mb-4 flex items-center gap-3">
//               <div className="h-12 w-12 rounded-full bg-ink-50" />
//               <div>
//                 <p className="font-display font-semibold text-ink-900">Mumbai Dental Care</p>
//                 <p className="text-xs text-ink-300">Dental Clinic</p>
//               </div>
//             </div>
//             <div className="mb-4 flex gap-1">
//               {[0, 1, 2, 3, 4].map((i) => (
//                 <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" style={{ animationDelay: `${i * 80}ms` }} />
//               ))}
//             </div>
//             <div className="rounded-xl bg-amber-50/70 p-3 text-sm text-ink-700">
//               "The doctor was professional and explained everything clearly.
//               The staff was friendly and the clinic was spotless. Highly recommend!"
//             </div>
//             <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink-700 py-2.5 text-sm font-medium text-paper">
//               Leave a Google review <ArrowUpRight className="h-3.5 w-3.5" />
//             </button>
//           </div>
//           </div>
//       </section>

//       {/* How it works */}
//       <section className="border-t border-ink-100 bg-surface px-5 py-16 sm:px-8">
//         <div className="mx-auto max-w-8xl">
//           <div className="mb-12 text-center">
//             <h2 className="font-display text-3xl font-semibold text-ink-900">How it works</h2>
//             <p className="mx-auto mt-3 max-w-xl text-ink-500">
//               Two sides, one loop — set up once as a business, then every customer visit becomes a chance for a real review.
//             </p>
//           </div>

//           <div className="grid gap-10 lg:grid-cols-2">
//             {/* Business owner steps */}
//             <div>
//               <p className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
//                 <Building2 className="h-5 w-5 text-ink-700" /> For business owners
//               </p>
//               <ol className="space-y-5">
//                 <Step icon={UserPlus} title="Sign in with Google" description="No forms, no passwords — one tap and you're in." />
//                 <Step icon={Building2} title="Add your business details" description="Name, category, logo, photos, and your Google review link." />
//                 <Step icon={Share2} title="Get your QR code & link" description="Instantly generated, ready to print for your counter or share online." />
//               </ol>
//             </div>

//             {/* Customer steps */}
//             <div>
//               <p className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
//                 <ScanLine className="h-5 w-5 text-ink-700" /> For customers
//               </p>
//               <ol className="space-y-5">
//                 <Step icon={ScanLine} title="Scan the QR code" description="No app, no login — opens straight in their browser." />
//                 <Step icon={PenLine} title="Rate & get an AI-drafted review" description="They rate their real experience; Loop helps them put it into words." />
//                 <Step icon={ThumbsUp} title="Edit, copy, and post to Google" description="They review the draft, tweak anything, then post it themselves." />
//               </ol>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Before / After */}
//       <section className="border-t border-ink-100 px-5 py-16 sm:px-8">
//         <div className="mx-auto max-w-6xl">
//           <div className="mb-10 text-center">
//             <h2 className="font-display text-3xl font-semibold text-ink-900">Before Loop vs. after Loop</h2>
//           </div>
//           <div className="grid gap-6 sm:grid-cols-2">
//             <div className="rounded-xl2 border border-ink-100 bg-surface p-6">
//               <p className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900">
//                 <X className="h-4 w-4 text-coral-500" /> Before
//               </p>
//               <ul className="space-y-3 text-sm text-ink-500">
//                 <li>Customers forget to leave a review after they leave</li>
//                 <li>Staff have to ask verbally, which feels awkward</li>
//                 <li>Customers stare at a blank Google review box and give up</li>
//                 <li>No visibility into how many people even saw the request</li>
//               </ul>
//             </div>
//             <div className="rounded-xl2 border border-amber-200 bg-amber-50/50 p-6">
//               <p className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900">
//                 <Check className="h-4 w-4 text-ink-700" /> After
//               </p>
//               <ul className="space-y-3 text-sm text-ink-700">
//                 <li>One QR code on the counter does the asking for you</li>
//                 <li>Customers get help writing a genuine review in seconds</li>
//                 <li>Higher completion rate — no blank page, no writer's block</li>
//                 <li>Dashboard shows views, drafts generated, and Google clicks</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         </section>

// {/* Footer */}
// <footer className="border-t border-ink-100 bg-surface px-5 py-10 sm:px-8">
//   <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-6 sm:flex-row">
//     <div className="flex items-center gap-2">
//       <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
//         <Star className="h-3.5 w-3.5 fill-amber-400" />
//       </div>
//       <span className="font-display text-base font-semibold text-ink-900">Google ReviewPilot</span>
//     </div>

//     <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-300">
//       {/* <a href="/admin/login" className="hover:text-ink-700">Admin login</a> */}
//       {/* <a href="#" className="hover:text-ink-700">Privacy policy</a>
//       <a href="#" className="hover:text-ink-700">Terms of service</a> */}
//               <a    
//               href="https://wa.me/917400332999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Google%20Review"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-ink-700"
//             >
//               Contact
//             </a>
//     </nav>

//     <p className="text-xs text-ink-300">© {new Date().getFullYear()} Vortex Web Technology. All rights reserved.</p>
//   </div>
// </footer>
// </div>
// );
// }

// function Step({ icon: Icon, title, description }) {
//   return (
//     <li className="flex gap-4">
//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-700">
//         <Icon className="h-4 w-4" />
//       </div>
//       <div>
//         <p className="font-medium text-ink-900">{title}</p>
//         <p className="text-sm text-ink-300">{description}</p>
//       </div>
//     </li>
//   );
// }















import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import journeyBg from "../assets/journey.png";
import cnclogo from "../assets/cnclogo.png";
import { HelpCircle } from "lucide-react";
import dentalImage from "../assets/dental.avif";
import leaveimage from '../assets/LEAVE.jpg'
import tempoImage from '../assets/tapmo.webp'
import {
  Star,
  QrCode,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  UserPlus,
  Building2,
  Share2,
  ScanLine,
  PenLine,
  ThumbsUp,
  BarChart3,
  Smartphone,
  Check,
  ChevronDown,
  Zap,
  MessageSquare,
  MousePointer2,
  TrendingUp,
  Users,
  Clock3,
  ExternalLink,
  Play,
  Menu,
  X,
  LogIn,
} from 'lucide-react';

import toast from 'react-hot-toast';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';
import api, { getErrorMessage } from '../services/api';
import DarkTestimonialCard from "../components/TestimonialCard"

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);


   // TEMP — local testing only, since Google login doesn't work on localhost.
  // Hits the existing /auth/dev-login endpoint (already auto-disabled in
  // production by authController.js). Does not touch Google login at all.
  const [devEmail, setDevEmail] = useState('');
  const [devLoading, setDevLoading] = useState(false);

  const handleDevLogin = useCallback(async () => {
    if (!devEmail.trim()) {
      toast.error('Enter a test email');
      return;
    }
    setDevLoading(true);
    try {
      const res = await api.post('/auth/dev-login', { email: devEmail.trim() });
      const { token, user } = res.data.data;
      login(token, user);
      navigate('/business/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDevLoading(false);
    }
  }, [devEmail, login, navigate]);

  const testimonials = [
    {
      name: 'Priya Sharma',
      business: 'Mumbai Dental Care',
      location: 'Mumbai',
      rating: 5,
      review:
        'The doctor was extremely professional and explained everything clearly. The staff was friendly and the entire experience was wonderful.',
      initials: 'PS',
    },
  
    {
      name: 'Rahul Patil',
      business: 'The Green Table',
      location: 'Pune',
      rating: 5,
      review:
        'Amazing food and excellent service. Everyone was welcoming and the whole experience was better than expected.',
      initials: 'RP',
    },
  
    {
      name: 'Neha Joshi',
      business: 'Glow Studio',
      location: 'Bengaluru',
      rating: 5,
      review:
        'Absolutely loved the service. The staff understood exactly what I wanted and the result was perfect.',
      initials: 'NJ',
    },
  
    {
      name: 'Amit Shah',
      business: 'Tech India',
      location: 'Ahmedabad',
      rating: 5,
      review:
        'Very smooth experience from start to finish. The team was responsive, professional and genuinely helpful.',
      initials: 'AS',
    },
  
    {
      name: 'Sneha Kulkarni',
      business: 'Urban Stay',
      location: 'Mumbai',
      rating: 5,
      review:
        'The room was clean, comfortable and the staff were incredibly helpful. Would definitely recommend this place.',
      initials: 'SK',
    },
  
    {
      name: 'Karan Mehta',
      business: 'DriveCare Auto',
      location: 'Nashik',
      rating: 5,
      review:
        'Great service and very transparent communication. My car was ready on time and everything was explained properly.',
      initials: 'KM',
    },
  
    {
      name: 'Riya Deshmukh',
      business: 'Style & Shine',
      location: 'Pune',
      rating: 5,
      review:
        'Really happy with the service. The team was professional, friendly and made the entire experience comfortable.',
      initials: 'RD',
    },
  
    {
      name: 'Vivek Rao',
      business: 'Café Central',
      location: 'Hyderabad',
      rating: 5,
      review:
        'One of the best café experiences I have had recently. Great atmosphere, friendly staff and excellent service.',
      initials: 'VR',
    },
  ];

  const handleCredential = useCallback(
    async (idToken) => {
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
    },
    [login, navigate]
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });

    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f2e9] text-slate-900">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

<header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-[#f5f2e9]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-8xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950 to-amber-500 shadow-lg shadow-emerald-950/25">
              <Star className="h-5 w-5 fill-white text-white" />
            </div>

            <div className="text-left">
              <p className="font-display text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                Google ReviewPilot
              </p>
              <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
                Reputation made simple
              </p>
            </div>
          </button>

     {/* Desktop Navigation */}
<nav className="hidden items-center gap-7 lg:flex">

<button
  onClick={() => scrollTo('how-it-works')}
  className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
>
  How it works
</button>

<button
  onClick={() => scrollTo('use-cases')}
  className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
>
  Use cases
</button>

<button
  onClick={() => scrollTo('ai')}
  className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
>
  AI assistance
</button>

<button
  onClick={() => scrollTo('faq')}
  className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
>
  FAQ
</button>

</nav>


{/* Right Side Actions */}
<div className="hidden items-center gap-3 lg:flex">

{/* Call */}
<a
  href="tel:+917400193799"
  className="group flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
>
  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 transition group-hover:bg-emerald-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0122 16.92z"
      />
    </svg>
  </div>

  Call
</a>


{/* WhatsApp */}
<a
   href="https://wa.me/7400193799?text=Google%20Review%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot."
  target="_blank"
  rel="noopener noreferrer"
  className="group flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
>
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 transition group-hover:bg-amber-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.5a8.38 8.38 0 01-9 8.5 8.5 8.5 0 01-4.08-1.04L3 20l1.08-4.58A8.38 8.38 0 013 11.5a8.5 8.5 0 118.5 8.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.5 2 2.6 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.1-1.3-.3-2.6-1-3.7-2.1-1.1-1.1-1.8-2.4-2.1-3.7-.2-.5-.1-1.1.1-1.5z"
      />
    </svg>
  </div>

  WhatsApp
</a>


{/* Divider */}
<div className="mx-1 h-7 w-px bg-slate-200" />


{/* Powered by */}

<div className="hidden xl:block">
  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
    Powered by
  </p>

  <a
    href="https://www.vortexwebtechnologies.com"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-0.5 block whitespace-nowrap text-[12px] font-bold text-slate-700 transition hover:text-emerald-700"
  >
    Vortex Web Technologies
  </a>
</div>





{/* <button
  type="button"
  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
  title="Continue with Google"
  onClick={() => handleCredential()}
>
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39z"
    />
    <path
      fill="#34A853"
      d="M12 21.99c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.99z"
    />
    <path
      fill="#FBBC05"
      d="M6.54 14.08a5.85 5.85 0 0 1 0-3.75V7.82H3.3a9.98 9.98 0 0 0 0 8.77l3.24-2.51z"
    />
    <path
      fill="#EA4335"
      d="M12 6.3c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.34 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.32l3.24 2.51C7.31 8.02 9.46 6.3 12 6.3z"
    />
  </svg>
</button> */}


</div>

          {/* Mobile menu */}
                  <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          >
            {mobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo('how-it-works')}
                className="text-left text-sm font-medium text-slate-600"
              >
                How it works
              </button>

              <button
                onClick={() => scrollTo('use-cases')}
                className="text-left text-sm font-medium text-slate-600"
              >
                Use cases
              </button>

              <button
                onClick={() => scrollTo('ai')}
                className="text-left text-sm font-medium text-slate-600"
              >
                AI assistance
              </button>

              <button
                onClick={() => scrollTo('faq')}
                className="text-left text-sm font-medium text-slate-600"
              >
                FAQ
              </button>

              {/* Call + WhatsApp */}
              <div className="flex gap-3 pt-1">
                <a
                  href="tel:+917400193799"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0122 16.92z"
                      />
                    </svg>
                  </div>
                  Call
                </a>

                <a
                  href="https://wa.me/7400193799?text=Google%20Review%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 11.5a8.38 8.38 0 01-9 8.5 8.5 8.5 0 01-4.08-1.04L3 20l1.08-4.58A8.38 8.38 0 013 11.5a8.5 8.5 0 118.5 8.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.5 2 2.6 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.1-1.3-.3-2.6-1-3.7-2.1-1.1-1.1-1.8-2.4-2.1-3.7-.2-.5-.1-1.1.1-1.5z"
                      />
                    </svg>
                  </div>
                  WhatsApp
                </a>
              </div>

              <div className="pt-2">
                <GoogleLoginButton onCredential={handleCredential} />
              </div>

              {/* Powered by */}
              <div className="border-t border-slate-100 pt-4 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Powered by
                </p>

                <a
                  href="https://www.vortexwebtechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-block text-[12px] font-bold text-slate-700 transition hover:text-emerald-700"
                >
                  Vortex Web Technologies
                </a>
              </div>
            </div>
          </div>
        )}
      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#f5f2e9] pt-12">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-amber-100/50 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-8xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:pb-28 lg:pt-24">

          {/* Hero content */}
          <div className="relative z-10 pt-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI-assisted. Never AI-faked.
            </div>

            <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.6rem]">
              Turn happy customers into{' '}
              <span className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-amber-500 bg-clip-text text-transparent">
                genuine reviews.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              ReviewPilot makes it effortless for customers to share their
              real experience — from one simple QR scan to a ready-to-post
              Google review.
            </p>

            
<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
  <div className="w-full sm:w-auto">
    <div className="relative inline-block w-full sm:w-auto">
      {/* Highlight glow */}
      <div className="absolute -inset-1 animate-pulse rounded-xl bg-emerald-400/30 blur-md" />

      {/* Google Login Button */}
      <div className="relative rounded-xl border-2 border-emerald-400 bg-white p-1 shadow-lg shadow-emerald-500/20">
        <GoogleLoginButton onCredential={handleCredential} />
      </div>
    </div>

    {loading && (
      <p className="mt-2 text-center text-xs font-medium text-emerald-600">
        Signing you in...
      </p>
    )}

    {import.meta.env.DEV && (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-2">
        <input
          type="email"
          value={devEmail}
          onChange={(e) => setDevEmail(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleDevLogin(); }}
          placeholder="test email (dev login)"
          className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          type="button"
          onClick={handleDevLogin}
          disabled={devLoading}
          className="shrink-0 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {devLoading ? '...' : 'Go'}
        </button>
      </div>  
    )}
  </div>
{/* </div> */}


              <button
                onClick={() => scrollTo('how-it-works')}
                className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <Play className="h-4 w-4 fill-current" />
                See how it works
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-500" />
                No customer app
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-500" />
                Customer controlled
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-500" />
                Free to start
              </div>
            </div>
          </div>  


          {/* =====================================================
              3D HERO VISUAL
          ===================================================== */}

<div className="relative mx-auto h-[280px] w-full min-[400px]:h-[350px] sm:h-[540px] sm:max-w-[570px] [perspective:1200px]">

{/* Fixed 570x540 canvas — every child's position/animation stays exactly as designed. Only visually scaled down on mobile, always centered. */}
<div className="absolute left-1/2 top-0 h-[540px] w-[570px] origin-top -translate-x-1/2 scale-[0.48] min-[400px]:scale-[0.62] sm:scale-100">

  <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2 animate-bounce">
    <div className="relative flex items-center gap-1.5 rounded-full bg-emerald-950 px-4 py-2 text-[10px] font-bold text-white shadow-xl">
      <span className="text-amber-400">✦</span>
      7 Days Free Trial

      <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-emerald-950" />
    </div>
  </div>

  {/* Glow */}
  <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-300/30 to-amber-300/30 blur-3xl" />

  {/* Rotating rings */}
  <div className="hero-ring absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/60" />

  <div className="hero-ring-reverse absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/70 border-dashed" />

  {/* QR floating card */}
  <div className="float-slow absolute left-[3%] top-[20%] z-20 w-[145px] rotate-[-8deg] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.15)]">

    <div className="mb-3 flex items-center justify-between">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
        <QrCode className="h-4 w-4 text-emerald-600" />
      </div>

      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
        Scan
      </span>
    </div>

    <FakeQR />

    <p className="mt-3 text-center text-[10px] font-semibold text-slate-600">
      Scan to review
    </p>
  </div>


  {/* Main phone */}
  <div  onClick={() =>
    (window.location.href =
      "https://reviewpilot.vortexwebtechnologies.com/review/cnc-webworld")
  }
  className="float-phone absolute left-1/2 top-1/2 z-10 h-[465px] w-[280px] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-[38px] border-[7px] border-slate-900 bg-slate-950 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.3)]">

    {/* Dynamic island */}
    <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-900" />

    <div className="relative h-full overflow-hidden rounded-[29px] bg-gradient-to-b from-slate-50 to-white">

      {/* Phone header */}
      <div className="px-5 pb-3 pt-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold text-slate-400">
              GOOGLE REVIEWPILOT
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              How was your visit?
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
            <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="px-5 py-4">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className="star-pop flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50"
              style={{ animationDelay: `${star * 0.12}s` }}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          ))}
        </div>
      </div>

      {/* AI card */}
      <div className="mx-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">

        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white overflow-hidden">
            <img
              src={cnclogo}
              alt="CNC WEB WORLD"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-800">
              CNC WEB WORLD
            </p>

            <p className="text-[8px] text-slate-400">
              Customer review
            </p>
          </div>
        </div>

        {/* Review */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-3 w-3 fill-amber-400 text-amber-400"
            />
          ))}
        </div>

        <p className="text-[10px] leading-5 text-slate-500">
          "CNC WEB WORLD provided excellent service and delivered exactly
          what we needed. The team was professional, responsive, and easy
          to work with. Highly recommended!"
        </p>

        <div className="mt-3 flex items-center justify-between">
          <button
            // onClick={() =>
            //   window.location.href =
            //     "https://reviewpilot.vortexwebtechnologies.com/review/cnc-webworld"
            // }
            className="flex h-6 items-center gap-1 rounded-lg bg-emerald-950 px-6 text-[8px] font-semibold text-white transition hover:bg-emerald-900"
          >
            <ExternalLink className="h-3 w-3" />
            Post to Google
          </button>
        </div>

      </div>

    </div>
  </div>


  {/* Review floating card */}
  <div className="float-review absolute bottom-[12%] right-[1%] z-20 w-[175px] rotate-[6deg] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.15)]">

    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 text-[10px] font-bold text-white">
        MC
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-800">
          Mumbai Dental Care
        </p>
        <div className="mt-0.5 flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
      </div>
    </div>

    <p className="mt-3 text-[9px] leading-4 text-slate-500">
      "Excellent experience. Friendly staff and very professional
      doctor."
    </p>

    <div className="mt-3 flex items-center gap-1 text-[8px] font-semibold text-amber-600">
      <Check className="h-3 w-3" />
      Published on Google
    </div>
  </div>


  {/* Analytics bubble */}
  <div className="float-slow absolute right-[2%] top-[9%] rounded-xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
        <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
      </div>

      <div>
        <p className="text-[9px] text-slate-400">
          Google clicks
        </p>
        <p className="text-sm font-bold text-slate-900">
          +28.4%
        </p>
      </div>
    </div>
  </div>

</div>
</div>
</div>
</section>


      {/* =========================================================
          TRUST STRIP
      ========================================================= */}

      <section className="border-y border-slate-100 bg-[#0e2620]">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-5 text-xs font-semibold text-slate-200 sm:px-8">

          <TrustItem
            icon={QrCode}
            text="Instant QR & link"
          />

          <TrustItem
            icon={Smartphone}
            text="No customer app"
          />

          <TrustItem
            icon={ShieldCheck}
            text="No fake reviews"
          />

          <TrustItem
            icon={Zap}
            text="Setup in minutes"
          />

          <TrustItem
            icon={BarChart3}
            text="Track performance"
          />

        </div>
      </section>


      {/* =========================================================
          PROBLEM
      ========================================================= */}

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-8xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              The problem
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Great experiences happen.
              <br />
              Reviews don't always follow.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Customers may love your business but still forget to leave a
              review once they walk out the door.
            </p>
          </div>


          <div className="mt-16 grid gap-5 md:grid-cols-4">

            <ProblemCard
              number="01"
              icon={Clock3}
              title="They forget"
              text="The customer leaves happy, but the review never happens."
            />

            <ProblemCard
              number="02"
              icon={MessageSquare}
              title="Asking feels awkward"
              text="Staff don't want to repeatedly ask customers for reviews."
            />

            <ProblemCard
              number="03"
              icon={PenLine}
              title="Blank page problem"
              text="Customers open Google and don't know what to write."
            />

            <ProblemCard
              number="04"
              icon={BarChart3}
              title="No visibility"
              text="You don't know how many customers interacted with your request."
            />

          </div>

        </div>
      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

<section
  id="how-it-works"
  className="relative overflow-hidden bg-[#061a14] px-5 py-16 text-white sm:px-8"
>
  {/* Background glow */}
  <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

  <div className="relative z-10 mx-auto max-w-8xl">

    {/* TOP CONTENT */}
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">

      {/* LEFT - TEXT */}
      <div className="relative z-20 max-w-2xl">

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          From scan to review
        </span>

        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          One simple journey.
          <br />
          <span className="text-slate-400">
            Zero friction.
          </span>
        </h2>

        <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
          ReviewPilot connects the business and customer experience
          in one simple loop.
        </p>

        {/* Flow */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">

          <FlowStep
            number="01"
            icon={ScanLine}
            title="Scan"
            description="Customer scans the QR code."
          />

          <FlowStep
            number="02"
            icon={Star}
            title="Rate"
            description="They rate their real experience."
          />

          <FlowStep
            number="03"
            icon={Sparkles}
            title="AI Assist"
            description="AI helps turn their thoughts into words."
          />

          <FlowStep
            number="04"
            icon={PenLine}
            title="Edit"
            description="Customer reviews and edits the draft."
          />

          <FlowStep
            number="05"
            icon={ThumbsUp}
            title="Post"
            description="They choose to publish it on Google."
          />

        </div>

      </div>


      {/* RIGHT - IMAGE */}
      <div className="relative flex items-center justify-center lg:min-h-[520px]">

        {/* Image glow */}
        <div className="absolute h-72 w-72 rounded-full bg-amber-500/20 blur-[100px]" />

        <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
          <img
            src={journeyBg}
            alt="ReviewPilot customer review journey"
            className="h-auto w-full max-w-[700px] object-cover"
          />
        </div>

      </div>

    </div>


    {/* DEMO PANEL BELOW */}
    {/* <div className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-8">

      <div className="mb-7 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-white">
            Customer experience
          </p>

          <p className="mt-1 text-xs text-slate-500">
            A realistic ReviewPilot journey
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-semibold text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Live flow
        </div>

      </div>


      <div className="grid gap-5 md:grid-cols-4">

        <DemoPanel
          icon={QrCode}
          step="01"
          title="Scan QR"
          description="No app. No login."
        >
          <div className="mx-auto w-24">
            <FakeQR dark />
          </div>
        </DemoPanel>


        <DemoPanel
          icon={Star}
          step="02"
          title="Rate"
          description="Share your experience."
        >
          <div className="flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="h-6 w-6 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </DemoPanel>


        <DemoPanel
          icon={Sparkles}
          step="03"
          title="AI assists"
          description="Your words become a review."
        >
          <div className="rounded-xl bg-slate-800 p-3 text-[10px] leading-5 text-slate-300">
            "The staff was friendly and the doctor explained everything
            clearly..."
          </div>
        </DemoPanel>


        <DemoPanel
          icon={ThumbsUp}
          step="04"
          title="Post"
          description="Customer decides."
        >
          <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold text-slate-900">
            <ExternalLink className="h-3.5 w-3.5" />
            Post to Google
          </div>
        </DemoPanel>

      </div>

    </div> */}

  </div>
</section>


      {/* =========================================================
          REAL USE CASE
      ========================================================= */}

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-8xl">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Image / visual */}
            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-emerald-100 to-amber-100 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl">

              <img
  src={dentalImage}
  alt="Modern dental clinic"
  className="h-[460px] w-full object-cover"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-white/60">
                          Example business
                        </p>

                        <p className="mt-1 text-lg font-bold text-white">
                          Mumbai Dental Care
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>


            {/* Story */}
            <div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                Real-world use case
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Imagine a patient just finished a great appointment.
              </h2>

              <p className="mt-5 leading-7 text-slate-500">
                Instead of hoping they'll remember to leave a review later,
                ReviewPilot captures the moment while the experience is still
                fresh.
              </p>


              <div className="mt-9 space-y-6">

                <UseCaseStep
                  number="01"
                  title="The happy moment"
                  text="The patient finishes their appointment feeling satisfied."
                />

                <UseCaseStep
                  number="02"
                  title="One simple scan"
                  text="They scan the ReviewPilot QR code at reception."
                />

                <UseCaseStep
                  number="03"
                  title="AI helps with the words"
                  text="Their rating and thoughts become a natural review draft."
                />

                <UseCaseStep
                  number="04"
                  title="The customer stays in control"
                  text="They edit the review and decide whether to publish it."
                />

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          AI SECTION
      ========================================================= */}

      <section
        id="ai"
        className="overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-8xl">

          <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                AI assistance
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                AI helps write it.
                <br />
                <span className="text-slate-500">
                  The customer owns it.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">
                ReviewPilot doesn't manufacture experiences. It helps
                customers express what they actually experienced.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Authentic by design
                  </p>
                  <p className="text-xs text-slate-500">
                    Customer reviews, edits and approves the final text.
                  </p>
                </div>
              </div>
            </div>


            {/* AI transformation */}
            <div className="relative">

              <div className="rounded-[2rem] border border-white bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,.12)] sm:p-7">

                {/* Customer input */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Customer's thoughts
                    </span>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500">
                      Original
                    </span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                    "Doctor was really good. Explained everything clearly.
                    Staff was friendly. Clinic was clean."
                  </div>
                </div>


                {/* Arrow */}
                <div className="my-5 flex justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                  </div>
                </div>


                {/* AI output */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      AI-assisted draft
                    </span>

                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-600">
                      Based on experience
                    </span>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-amber-50/60 p-5 text-sm leading-6 text-slate-700">
                    "I had a great experience at the clinic. The doctor was
                    professional and explained everything clearly. The staff
                    was friendly and the clinic was clean and welcoming."
                  </div>
                </div>


                {/* Customer approval */}
                <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                      <Check className="h-4 w-4 text-amber-600" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Customer reviews the draft
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Edit anything before posting
                      </p>
                    </div>
                  </div>

                  <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-semibold text-white">
                    <PenLine className="h-3 w-3" />
                    Edit review
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>




            {/* =========================================================
          SETUP
      ========================================================= */}

   {/* =========================================================
    HOW REVIEWPILOT WORKS — VISUAL FLOW
========================================================= */}

<section className="overflow-hidden bg-[#0e2620] px-5 py-16 text-white sm:px-8">

<div className="mx-auto max-w-8xl">

  {/* Heading */}
  <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">

    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">
        Simple from day one
      </span>

      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        From setup to your next review.
      </h2>
    </div>

    <p className="mx-auto max-w-md text-sm leading-6 text-[#91aaa4] sm:mx-0">
      Set up once. Place your QR code. Let ReviewPilot guide customers
      from a happy moment to an authentic Google review.
    </p>

  </div>


 


    {/* =====================================================
        FLOW IMAGE
    ===================================================== */}

    <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102f28] via-[#0b2923] to-[#09231f] p-5 shadow-2xl sm:p-8">

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-60 w-60 rounded-full bg-amber-400/5 blur-[90px]" />

      <div className="pointer-events-none absolute right-1/4 bottom-0 h-60 w-60 rounded-full bg-teal-400/10 blur-[90px]" />


      {/* Flow */}
      <div className="relative">

        <svg
          viewBox="0 0 1200 360"
          className="h-auto w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          {/* ===============================================
              CONNECTING LINE
          =============================================== */}

          <path
            d="M120 150 H1080"
            stroke="#31544C"
            strokeWidth="2"
            strokeDasharray="7 8"
          />

          {/* ===============================================
              STEP 1 — SIGN IN
          =============================================== */}

          <g>

            <circle
              cx="100"
              cy="150"
              r="48"
              fill="#12372F"
              stroke="#31544C"
            />

            <circle
              cx="100"
              cy="150"
              r="38"
              fill="#173F36"
            />

            {/* user icon */}
            <circle
              cx="100"
              cy="141"
              r="8"
              stroke="#F5B43C"
              strokeWidth="2.5"
            />

            <path
              d="M84 169 C84 156 116 156 116 169"
              stroke="#F5B43C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="100"
              y="220"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
            >
              Sign in
            </text>

            <text
              x="100"
              y="242"
              fill="#78928D"
              textAnchor="middle"
              fontSize="10"
            >
              Google login
            </text>

          </g>


          {/* ===============================================
              ARROW
          =============================================== */}

          <path
            d="M160 150 H190"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M184 144 L191 150 L184 156"
            stroke="#5CA9A0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* ===============================================
              STEP 2 — BUSINESS
          =============================================== */}

          <g>

            <circle
              cx="245"
              cy="150"
              r="48"
              fill="#12372F"
              stroke="#31544C"
            />

            <rect
              x="225"
              y="130"
              width="40"
              height="40"
              rx="8"
              fill="#173F36"
              stroke="#5CA9A0"
              strokeWidth="2"
            />

            <path
              d="M233 143 H257 M233 151 H257 M233 159 H250"
              stroke="#79C1B7"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <text
              x="245"
              y="220"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
            >
              Add business
            </text>

            <text
              x="245"
              y="242"
              fill="#78928D"
              textAnchor="middle"
              fontSize="10"
            >
              Details &amp; review link
            </text>

          </g>


          {/* ===============================================
              ARROW
          =============================================== */}

          <path
            d="M305 150 H335"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M329 144 L336 150 L329 156"
            stroke="#5CA9A0"
            strokeWidth="2"
          />


          {/* ===============================================
              STEP 3 — QR
          =============================================== */}

          <g>

            <circle
              cx="390"
              cy="150"
              r="48"
              fill="#12372F"
              stroke="#F5B43C"
              strokeOpacity=".35"
            />

            {/* QR */}
            <rect
              x="369"
              y="129"
              width="42"
              height="42"
              rx="4"
              fill="#F4F1E8"
            />

            <rect x="374" y="134" width="10" height="10" fill="#0E2620" />
            <rect x="396" y="134" width="10" height="10" fill="#0E2620" />
            <rect x="374" y="156" width="10" height="10" fill="#0E2620" />

            <rect x="388" y="148" width="5" height="5" fill="#0E2620" />
            <rect x="398" y="154" width="5" height="5" fill="#0E2620" />
            <rect x="388" y="160" width="5" height="5" fill="#0E2620" />

            <text
              x="390"
              y="220"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
            >
              Get your QR
            </text>

            <text
              x="390"
              y="242"
              fill="#78928D"
              textAnchor="middle"
              fontSize="10"
            >
              Print or share it
            </text>

          </g>


          {/* ===============================================
              CUSTOMER ZONE
          =============================================== */}

          <rect
            x="455"
            y="75"
            width="365"
            height="150"
            rx="24"
            fill="#081F1B"
            stroke="#31544C"
            strokeDasharray="4 5"
          />

          <text
            x="637"
            y="98"
            fill="#5CA9A0"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            letterSpacing="2"
          >
            CUSTOMER EXPERIENCE
          </text>


          {/* QR → CUSTOMER */}
          <path
            d="M438 150 H465"
            stroke="#F5B43C"
            strokeWidth="2"
          />

          <path
            d="M459 144 L466 150 L459 156"
            stroke="#F5B43C"
            strokeWidth="2"
          />


          {/* CUSTOMER 1 */}

          <circle
            cx="520"
            cy="150"
            r="30"
            fill="#12372F"
          />

          <rect
            x="507"
            y="135"
            width="26"
            height="32"
            rx="5"
            stroke="#79C1B7"
            strokeWidth="2"
          />

          <circle
            cx="520"
            cy="160"
            r="2"
            fill="#79C1B7"
          />

          <text
            x="520"
            y="200"
            fill="#C6D5D2"
            textAnchor="middle"
            fontSize="10"
          >
            Scan
          </text>


          {/* arrow */}

          <path
            d="M552 150 H575"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M570 145 L577 150 L570 155"
            stroke="#5CA9A0"
            strokeWidth="2"
          />


          {/* CUSTOMER 2 */}

          <circle
            cx="620"
            cy="150"
            r="30"
            fill="#12372F"
          />

          <text
            x="620"
            y="157"
            fill="#F5B43C"
            textAnchor="middle"
            fontSize="20"
          >
            ★★★★★
          </text>

          <text
            x="620"
            y="200"
            fill="#C6D5D2"
            textAnchor="middle"
            fontSize="10"
          >
            Rate
          </text>


          {/* arrow */}

          <path
            d="M652 150 H675"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M670 145 L677 150 L670 155"
            stroke="#5CA9A0"
            strokeWidth="2"
          />


          {/* CUSTOMER 3 */}

          <circle
            cx="720"
            cy="150"
            r="30"
            fill="#12372F"
          />

          <circle
            cx="720"
            cy="150"
            r="18"
            fill="#1B4640"
          />

          <text
            x="720"
            y="156"
            fill="#79C1B7"
            textAnchor="middle"
            fontSize="15"
          >
            ✦
          </text>

          <text
            x="720"
            y="200"
            fill="#C6D5D2"
            textAnchor="middle"
            fontSize="10"
          >
            AI assist
          </text>


          {/* arrow */}

          <path
            d="M752 150 H775"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M770 145 L777 150 L770 155"
            stroke="#5CA9A0"
            strokeWidth="2"
          />


          {/* CUSTOMER 4 */}

          <circle
            cx="790"
            cy="150"
            r="30"
            fill="#12372F"
          />

          <path
            d="M780 160 L800 140"
            stroke="#69B99E"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M780 150 L790 160"
            stroke="#69B99E"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <text
            x="790"
            y="200"
            fill="#C6D5D2"
            textAnchor="middle"
            fontSize="10"
          >
            Approve
          </text>


          {/* ===============================================
              FINAL ARROW
          =============================================== */}

          <path
            d="M820 150 H850"
            stroke="#F5B43C"
            strokeWidth="2"
          />

          <path
            d="M844 144 L851 150 L844 156"
            stroke="#F5B43C"
            strokeWidth="2"
          />


          {/* ===============================================
              STEP 4 — GOOGLE REVIEW
          =============================================== */}

          <g>

            <circle
              cx="915"
              cy="150"
              r="48"
              fill="#12372F"
              stroke="#69B99E"
              strokeOpacity=".4"
            />

            <rect
              x="894"
              y="130"
              width="42"
              height="40"
              rx="8"
              fill="#173F36"
            />

            <text
              x="915"
              y="153"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
            >
              G
            </text>

            <text
              x="915"
              y="220"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
            >
              Google review
            </text>

            <text
              x="915"
              y="242"
              fill="#78928D"
              textAnchor="middle"
              fontSize="10"
            >
              Customer publishes
            </text>

          </g>


          {/* ===============================================
              FINAL ARROW
          =============================================== */}

          <path
            d="M970 150 H1000"
            stroke="#5CA9A0"
            strokeWidth="2"
          />

          <path
            d="M994 144 L1001 150 L994 156"
            stroke="#5CA9A0"
            strokeWidth="2"
          />


          {/* ===============================================
              STEP 5 — ANALYTICS
          =============================================== */}

          <g>

            <circle
              cx="1060"
              cy="150"
              r="48"
              fill="#12372F"
              stroke="#5CA9A0"
              strokeOpacity=".4"
            />

            <path
              d="M1039 166 L1050 154 L1058 159 L1075 139"
              stroke="#69B99E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M1067 139 H1075 V147"
              stroke="#69B99E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x="1060"
              y="220"
              fill="#F4F1E8"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
            >
              Track results
            </text>

            <text
              x="1060"
              y="242"
              fill="#78928D"
              textAnchor="middle"
              fontSize="10"
            >
              Insights &amp; activity
            </text>

          </g>

        </svg>

      </div>


      {/* =====================================================
          BOTTOM HIGHLIGHTS
      ===================================================== */}

      <div className="relative mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">

        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <Check className="h-4 w-4 text-[#69B99E]" />
          <span className="text-xs text-[#A9BCB8]">
            No customer app required
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4 text-[#69B99E]" />
          <span className="text-xs text-[#A9BCB8]">
            Customer stays in control
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Check className="h-4 w-4 text-[#69B99E]" />
          <span className="text-xs text-[#A9BCB8]">
            Setup takes minutes
          </span>
        </div>

      </div>

    </div>

  </div>

</section>


      {/* =========================================================
          USE CASES
      ========================================================= */}

<section
  id="use-cases"
  className="px-4 py-12 sm:px-6"
>
  <div className="mx-auto max-w-8xl">

    {/* Header */}
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
          Use cases
        </span>

        <h2 className="mt-2 max-w-xl font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Built for businesses that depend on trust.
        </h2>
      </div>

      <p className="max-w-sm text-xs leading-5 text-slate-500">
        Wherever a great customer experience happens, ReviewPilot can make
        the next review easier.
      </p>
    </div>

    {/* Compact Industry Cards */}
    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

      <IndustryCard
        icon="🦷"
        title="Dental Clinics"
        text="Reviews after appointments."
        color="blue"
      />

      <IndustryCard
        icon="🍽️"
        title="Restaurants"
        text="Reviews after dining."
        color="teal"
      />

      <IndustryCard
        icon="💇"
        title="Salons & Spas"
        text="Feedback after services."
        color="purple"
      />

      <IndustryCard
        icon="🏨"
        title="Hotels"
        text="Reviews from happy guests."
        color="orange"
      />

      <IndustryCard
        icon="🚗"
        title="Auto Services"
        text="Feedback after service."
        color="cyan"
      />

      <IndustryCard
        icon="🏪"
        title="Local Businesses"
        text="Build local reputation."
        color="green"
      />

      <IndustryCard
        icon="🏥"
        title="Healthcare"
        text="Patient feedback."
        color="blue"
      />

      <IndustryCard
        icon="🛍️"
        title="Retail Stores"
        text="Reviews from shoppers."
        color="orange"
      />

      <IndustryCard
        icon="🏋️"
        title="Gyms & Fitness"
        text="Member reviews."
        color="purple"
      />

      <IndustryCard
        icon="🎓"
        title="Education"
        text="Student feedback."
        color="teal"
      />

      <IndustryCard
        icon="🏠"
        title="Real Estate"
        text="Client experiences."
        color="green"
      />

      <IndustryCard
        icon="💻"
        title="IT & Software"
        text="Project reviews."
        color="cyan"
      />

      <IndustryCard
        icon="💼"
        title="Professional Services"
        text="Build credibility."
        color="blue"
      />

      <IndustryCard
        icon="🐾"
        title="Pet Services"
        text="Pet owner reviews."
        color="purple"
      />

      <IndustryCard
        icon="📸"
        title="Photography"
        text="Reviews from clients."
        color="orange"
      />

    </div>
  </div>
</section>


      {/* =========================================================
          DASHBOARD
      ========================================================= */}

      {/* <section className="bg-slate-50 px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Your reputation, visible
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Know what happens after the QR code is scanned.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              See how customers interact with your ReviewPilot experience and
              understand where your review journey is working.
            </p>

          </div>

       
          <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_100px_rgba(15,23,42,.12)]">

       
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              </div>

              <div className="hidden rounded-lg bg-slate-50 px-5 py-2 text-[10px] text-slate-400 sm:block">
                app.googlereviewpilot.com/dashboard
              </div>

              <div className="w-10" />
            </div>


            <div className="grid md:grid-cols-[180px_1fr]">

           
              <div className="hidden border-r border-slate-100 bg-slate-50/60 p-5 md:block">

                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-950 to-amber-500">
                    <Star className="h-3.5 w-3.5 fill-white text-white" />
                  </div>

                  <span className="text-xs font-bold">
                    ReviewPilot
                  </span>
                </div>

                <div className="mt-8 space-y-2">
                  <DashboardNav active text="Overview" />
                  <DashboardNav text="Reviews" />
                  <DashboardNav text="QR Code" />
                  <DashboardNav text="Analytics" />
                </div>

              </div>


              <div className="p-5 sm:p-8">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-slate-400">
                      Welcome back
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-950">
                      Mumbai Dental Care
                    </h3>
                  </div>

                  <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-semibold text-white">
                    <QrCode className="h-3.5 w-3.5" />
                    View QR
                  </button>
                </div>


         
                <div className="mt-7 grid gap-4 sm:grid-cols-3">

                  <DashboardStat
                    icon={ScanLine}
                    label="QR scans"
                    value="428"
                    change="+18.2%"
                  />

                  <DashboardStat
                    icon={Sparkles}
                    label="AI drafts"
                    value="312"
                    change="+24.6%"
                  />

                  <DashboardStat
                    icon={ExternalLink}
                    label="Google clicks"
                    value="267"
                    change="+28.4%"
                  />

                </div>


           
                <div className="mt-6 rounded-2xl border border-slate-100 p-5">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Customer activity
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Last 7 days
                      </p>
                    </div>

                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  </div>


                  <div className="mt-8 flex h-32 items-end gap-2 sm:gap-5">

                    {[38, 53, 45, 70, 61, 86, 96].map((height, index) => (
                      <div
                        key={index}
                        className="group relative flex h-full flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-amber-400 transition-all duration-500 group-hover:opacity-80"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}

                  </div>

                  <div className="mt-3 flex justify-between text-[9px] text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                </div>


              
                <div className="mt-6">

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800">
                      Recent activity
                    </p>

                    <button className="text-[10px] font-semibold text-amber-600">
                      View all
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">

                    <ActivityRow
                      initials="RS"
                      text="Customer generated a review draft"
                      time="2 min ago"
                    />

                    <ActivityRow
                      initials="AK"
                      text="Google review link opened"
                      time="8 min ago"
                    />

                    <ActivityRow
                      initials="PM"
                      text="5-star experience submitted"
                      time="21 min ago"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section> */}


      {/* =========================================================
          BEFORE / AFTER
      ========================================================= */}

<section className="px-5 py-8 sm:px-8">
  <div className="mx-auto max-w-8xl">

    {/* Heading */}
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
        The difference
      </span>

      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        From forgotten reviews
        <br className="hidden sm:block" />
        to effortless feedback.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
        Turn the right customer moment into a simple review experience.
      </p>
    </div>

    {/* Comparison */}
    <div className="mt-10 grid gap-5 lg:grid-cols-2">

      {/* WITHOUT */}
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">

        {/* Image */}
        <div className="relative h-52 overflow-hidden sm:h-60 ">
          <img
            src={leaveimage}
            alt="Customer scanning a review QR code"
            className="h-full w-full object-cover grayscale-[0.35]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <X className="h-4 w-4 text-red-500" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                Without ReviewPilot
              </p>
              <p className="text-base font-bold text-white">
                The old way
              </p>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">

            <CompareMini
              icon={Clock3}
              text="Customer leaves and forgets"
            />

            <CompareMini
              icon={MessageSquare}
              text="Staff have to ask manually"
            />

            <CompareMini
              icon={PenLine}
              text="Blank review box creates friction"
            />

          </div>
        </div>
      </div>


      {/* WITH */}
      <div className="overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 shadow-sm">

        {/* Image */}
        <div className="relative h-52 overflow-hidden sm:h-60">
          <img
            src={tempoImage}
            alt="Customer scanning a business review QR code"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <Check className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">
                With ReviewPilot
              </p>
              <p className="text-base font-bold text-white">
                The smarter way
              </p>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">

            <CompareMini
              icon={QrCode}
              text="One QR code at the right moment"
              positive
            />

            <CompareMini
              icon={Sparkles}
              text="AI helps customers find the words"
              positive
            />

            <CompareMini
              icon={ThumbsUp}
              text="Customer edits and approves"
              positive
            />

          </div>
        </div>
      </div>

    </div>

  </div>
</section>





{/* =========================================================
    TESTIMONIALS
========================================================= */}

<section className="relative overflow-hidden bg-gradient-to-br from-[#041916] via-[#082824] to-[#063936] py-24">

  {/* Ambient gradient glows */}
  <div className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-[#F5B43C]/10 blur-[110px]" />

  <div className="pointer-events-none absolute right-[-100px] bottom-0 h-[420px] w-[420px] rounded-full bg-[#5CA9A0]/15 blur-[120px]" />

  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

  {/* Subtle grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
    }}
  />

  <div className="relative">

    {/* =====================================================
        HEADER
    ===================================================== */}

    <div className="mx-auto max-w-8xl px-5 text-center sm:px-8">

      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#F5B43C]/20 bg-[#F5B43C]/10 px-4 py-2 text-xs font-semibold text-[#F5B43C]">

        <Star className="h-3.5 w-3.5 fill-current" />

        Customer experiences

      </div>


      <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-[#F4F1E8] sm:text-5xl">

        Great experiences deserve  <span className="bg-gradient-to-r from-[#F5B43C] via-[#79C1B7] to-[#5CA9A0] bg-clip-text text-transparent">
          to be shared.
        </span>

       

       

      </h2>


      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#9CB5B0] sm:text-base">
        Real experiences from customers who chose to share what they
        loved about their visit.
      </p>


      {/* Rating summary */}

      <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 shadow-xl backdrop-blur-xl">

        <div className="flex gap-1">

          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-[#F5B43C] text-[#F5B43C]"
            />
          ))}

        </div>

        <div className="h-4 w-px bg-white/15" />

        <span className="text-xs font-semibold text-[#D6E2DF]">
          5.0 customer rating
        </span>

      </div>

    </div>


    {/* =====================================================
        AUTO SCROLL
    ===================================================== */}

    <div className="testimonial-marquee mt-16">

      <div className="testimonial-track">

        {/* First set */}

        {testimonials.map((review, index) => (
          <DarkTestimonialCard
            key={`first-${index}`}
            review={review}
          />
        ))}


        {/* Duplicate set for seamless scrolling */}

        {testimonials.map((review, index) => (
          <DarkTestimonialCard
            key={`second-${index}`}
            review={review}
          />
        ))}

      </div>

    </div>


    {/* Edge fades */}

    <div className="pointer-events-none absolute bottom-0 left-0 top-[330px] z-10 w-20 bg-gradient-to-r from-[#041916] to-transparent sm:w-44" />

    <div className="pointer-events-none absolute bottom-0 right-0 top-[330px] z-10 w-20 bg-gradient-to-l from-[#063936] to-transparent sm:w-44" />

  </div>


  {/* =====================================================
      ANIMATION
  ===================================================== */}

  <style>{`

    .testimonial-marquee {
      width: 100%;
      overflow: hidden;
    }

    .testimonial-track {
      display: flex;
      width: max-content;
      gap: 20px;
      animation: reviewMarquee 45s linear infinite;
    }

    .testimonial-track:hover {
      animation-play-state: paused;
    }

    @keyframes reviewMarquee {

      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(calc(-50% - 10px));
      }

    }

    @media (max-width: 640px) {

      .testimonial-track {
        gap: 14px;
        animation-duration: 34s;
      }

    }

    @media (prefers-reduced-motion: reduce) {

      .testimonial-track {
        animation: none;
      }

    }

  `}</style>

</section>






      {/* =========================================================
         PLANS
      ========================================================= */}
<section className="bg-slate-50 px-4 py-16">
  <div className="mx-auto max-w-7xl">
    {/* Heading */}
    <div className="mb-12 text-center">
      <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-700">
        SIMPLE & TRANSPARENT PRICING
      </span>

      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
        Choose Your Review Plan
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
        Everything you need to get more genuine Google reviews for your
        business.
      </p>
    </div>

    {/* Pricing Cards */}
    <div className="grid gap-6 md:grid-cols-2 md:items-stretch">

      {/* First Year */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500 bg-white p-7 shadow-xl shadow-emerald-900/10">
        {/* Popular Badge */}
        <div className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-950">
          Get Started
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-emerald-950">
            🚀 Go For Review Plan
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            One-time payment for the first year
          </p>
        </div>

        {/* Price */}
        <div className="mb-7">
          <span className="text-4xl font-black text-emerald-950">
            ₹4,000
          </span>
          <span className="ml-2 text-sm font-medium text-slate-400">
            / first year
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {[
            "Custom QR code for your business",
            "AI-generated personalized reviews",
            "Mobile-optimized review page",
            "Direct Google Reviews integration",
            "Unlimited scans & reviews",
            "24/7 WhatsApp support",
            "Free updates & improvements",
            "Setup within 24 hours",
          ].map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-600"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                ✓
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={() => {
            window.location.href =
              "https://wa.me/7400193799?text=Google%20Review%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot.";
          }}
          className="mt-8 w-full rounded-xl bg-emerald-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-900 hover:shadow-xl"
        >
          Get Started — ₹4,000
        </button>
      </div>

      {/* Second Year */}
   {/* Second Year */}
<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg">
  <div className="absolute right-5 top-5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-950">
    Continued Access
  </div>

  <div className="mb-6">
    <h3 className="text-xl font-extrabold text-emerald-950">
      🔄 Renewal from Second Year
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Everything from your first year, plus continued support and updates
    </p>
  </div>

  {/* Price */}
  <div className="mb-7">
    <span className="text-4xl font-black text-emerald-950">
      ₹5,000
    </span>

    <span className="ml-2 text-sm font-medium text-slate-400">
      / year
    </span>
  </div>

  {/* Features */}
  <ul className="space-y-3">
    {[ "Custom QR code + mobile-optimized review page", "AI-generated reviews + direct Google Reviews integration", "Unlimited scans & reviews remain active", "Continued QR code access — no downtime", "Ongoing access to AI review generator", "Google review page remains live", "24/7 WhatsApp support + lifetime assistance", "Annual maintenance, security updates & future upgrades", ].map((feature, index) => (
      <li
        key={index}
        className="flex items-start gap-3 text-sm text-slate-600"
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
          ✓
        </span>

        <span>{feature}</span>
      </li>
    ))}
  </ul>

  {/* Button */}
  <button
    onClick={() => {
      window.location.href =
        "https://wa.me/7400193799?text=Google%20Review%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot.";
    }}
    className="mt-8 w-full rounded-xl border-2 border-emerald-950 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
  >
    Renew — ₹5,000 / Year
  </button>
</div>
    </div>

    {/* Bottom Note */}
    <p className="mt-8 text-center text-xs text-slate-400">
      No hidden charges • Secure payment • 24/7 support
    </p>
  </div>
</section>








      {/* =========================================================
          FAQ
      ========================================================= */}

      <section id="faq" className="px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              FAQ
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Questions, answered.
            </h2>
          </div>


          <div className="mt-12 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">

          <FaqItem
  icon={<HelpCircle className="h-5 w-5 text-amber-600" />}
  question="Does ReviewPilot create fake reviews?"
  answer="No. ReviewPilot is designed to assist customers with wording based on their own experience. The customer reviews, edits and decides whether to publish the final review."
  open={openFaq === 0}
  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
/>

<FaqItem
  icon={<HelpCircle className="h-5 w-5 text-amber-600" />}
  question="Does the customer need to install an app?"
  answer="No. The QR code opens the ReviewPilot experience directly in the customer's browser."
  open={openFaq === 1}
  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
/>

<FaqItem
  icon={<HelpCircle className="h-5 w-5 text-amber-600" />}
  question="Can customers edit the AI-generated review?"
  answer="Yes. The customer remains in control and can edit the generated draft before deciding whether to post it."
  open={openFaq === 2}
  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
/>

<FaqItem
  icon={<HelpCircle className="h-5 w-5 text-amber-600" />}
  question="Where can I put the QR code?"
  answer="You can place it at reception desks, checkout counters, tables, service areas, receipts, printed cards or anywhere else customers interact with your business."
  open={openFaq === 3}
  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
/>

<FaqItem
  icon={<HelpCircle className="h-5 w-5 text-amber-600" />}
  question="What can I track?"
  answer="Your ReviewPilot dashboard can surface activity such as QR scans, review drafts and Google review clicks."
  open={openFaq === 4}
  onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
/>
          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

<section className="px-5 pb-20 sm:px-8">
  <div
    className="relative mx-auto max-w-8xl overflow-hidden rounded-[2rem] bg-cover bg-center px-6 py-16 text-center shadow-2xl sm:px-10 sm:py-20"
    style={{
      backgroundImage:
        `url(${tempoImage})`,
    }}
  >

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-emerald-850/75" />

    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/55 to-amber-900/60" />

    {/* Glow */}
    <div className="absolute left-1/2 top-[-100px] h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

    <div className="relative">

      {/* Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
        <Star className="h-7 w-7 fill-white text-white" />
      </div>

      {/* Heading */}
      <h2 className="mx-auto mt-7 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Your next great review could be one scan away.
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-emerald-100 sm:text-base">
        Give happy customers an easier way to share what they already
        love about your business.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <GoogleLoginButton onCredential={handleCredential} />
      </div>

      <p className="mt-4 text-[11px] text-white/60">
        Free to start · No credit card required
      </p>

    </div>
  </div>
</section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950 to-amber-500">
              <Star className="h-4 w-4 fill-white text-white" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Google ReviewPilot
              </p>

              <p className="text-[10px] text-slate-400">
                Reputation made simple.
              </p>
            </div>

          </div>


          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">

<a
  href="/privacy-policy"
  className="transition hover:text-slate-900"
>
  Privacy Policy
</a>

<a
  href="/terms-and-conditions"
  className="transition hover:text-slate-900"
>
  Terms & Conditions
</a>

<a
  href="https://wa.me/7400193799?text=Google%20Review%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot."
  target="_blank"
  rel="noopener noreferrer"
>
  Contact 
</a>

</nav>


          <p className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} Vortex Web Technology.
            All rights reserved.
          </p>

        </div>


            {/* WhatsApp Floating Button */}
    <a
      href="https://wa.me/7400193799?text=Google%20ReviewPilot%20Enquiry%20%E2%80%93%20Hi%2C%20I%E2%80%99d%20like%20to%20know%20more%20about%20Google%20ReviewPilot."
      target="_blank"
      rel="noopener noreferrer"
     className="whatsapp-float fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-current"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L.03 24l6.28-1.65a11.9 11.9 0 0 0 5.73 1.46h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.43ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.86 9.86 0 0 1-1.51-5.28C2.16 6.45 6.6 2.01 12.05 2.01c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c-.01 5.45-4.45 9.89-9.89 9.89Zm5.42-7.42c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.2-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>

      </footer>


      {/* =========================================================
          ANIMATION CSS
      ========================================================= */}

      <style>{`

        @keyframes floatPhone {
          0%, 100% {
            transform:
              translate(-50%, -50%)
              rotate(5deg)
              translateY(0px);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(2deg)
              translateY(-14px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(-8deg);
          }

          50% {
            transform: translateY(-12px) rotate(-5deg);
          }
        }

        @keyframes floatReview {
          0%, 100% {
            transform: rotate(6deg) translateY(0px);
          }

          50% {
            transform: rotate(3deg) translateY(-12px);
          }
        }

        @keyframes ring {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }
        }

        @keyframes ringReverse {
          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }
        }

        @keyframes starPop {
          0% {
            transform: scale(.75);
            opacity: .3;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .float-phone {
          animation: floatPhone 5s ease-in-out infinite;
        }

        .float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .float-review {
          animation: floatReview 5.5s ease-in-out infinite;
        }

        .hero-ring {
          animation: ring 22s linear infinite;
        }

        .hero-ring-reverse {
          animation: ringReverse 17s linear infinite;
        }

        .star-pop {
          animation: starPop 2s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-phone,
          .float-slow,
          .float-review,
          .hero-ring,
          .hero-ring-reverse,
          .star-pop {
            animation: none;
          }
        }

        @keyframes whatsappFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.whatsapp-float {
  animation: whatsappFloat 2s ease-in-out infinite;
}

      `}</style>

    </div>
  );
}


/* =============================================================
   COMPONENTS
============================================================= */

function TrustItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-emerald-300" />
      {text}
    </div>
  );
}


function ProblemCard({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">

      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-emerald-50">
          <Icon className="h-5 w-5 text-slate-500 transition group-hover:text-amber-600" />
        </div>

        <span className="text-xs font-bold text-slate-300">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-base font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


function FlowStep({
  number,
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group relative text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-400/30 group-hover:bg-amber-400/10">

        <Icon className="h-6 w-6 text-amber-300" />

      </div>

      <div className="mt-5">

        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
          {number}
        </span>

        <h3 className="mt-1 font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}


function DemoPanel({
  icon: Icon,
  step,
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
          <Icon className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <span className="text-[9px] font-bold text-slate-600">
          {step}
        </span>

      </div>

      <div className="flex min-h-[100px] items-center justify-center">
        {children}
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}


function UseCaseStep({
  number,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-[10px] font-bold text-amber-600">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {text}
        </p>
      </div>

    </div>
  );
}


function IndustryCard({ icon, title, text, color }) {
  const colors = {
    blue: "bg-blue-50 border-blue-100",
    teal: "bg-teal-50 border-teal-100",
    purple: "bg-purple-50 border-purple-100",
    orange: "bg-orange-50 border-orange-100",
    cyan: "bg-cyan-50 border-cyan-100",
    green: "bg-emerald-50 border-emerald-100",
  };

  return (
    <div
      className={`
        ${colors[color]}
        rounded-lg border
        px-2.5 py-8
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-sm
      `}
    >
      <div className="flex items-center gap-2">
        
        {/* Small icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-sm shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-slate-900">
            {title}
          </h3>

          <p className="truncate text-[12px] leading-3.5 text-slate-500">
            {text}
          </p>
        </div>

      </div>
    </div>
  );
}


function DashboardStat({
  icon: Icon,
  label,
  value,
  change,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
          <Icon className="h-4 w-4 text-amber-600" />
        </div>

        <span className="text-[9px] font-bold text-amber-600">
          {change}
        </span>

      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">
        {label}
      </p>

    </div>
  );
}


function DashboardNav({
  text,
  active,
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
        active
          ? 'bg-emerald-50 text-amber-600'
          : 'text-slate-400'
      }`}
    >
      {text}
    </div>
  );
}


function ActivityRow({
  initials,
  text,
  time,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">

      <div className="flex items-center gap-3">
      text-amber-600
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-bold text-amber-600">
          {initials}
        </div>

        <p className="text-[10px] font-medium text-slate-600 sm:text-xs">
          {text}
        </p>

      </div>

      <span className="ml-3 whitespace-nowrap text-[9px] text-slate-400">
        {time}
      </span>

    </div>
  );
}


function CompareRow({
  icon: Icon,
  text,
  negative = false,
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          negative
            ? 'bg-red-50 text-red-400'
            : 'bg-white text-amber-600 shadow-sm'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <p className="text-sm font-medium text-slate-600">
        {text}
      </p>

    </div>
  );
}


function SetupStep({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-amber-300" />
        </div>

        <span className="text-2xl font-bold text-white/10">
          {number}
        </span>

      </div>

      <h3 className="mt-7 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


function FaqItem({ icon, question, answer, open, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50 sm:px-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            {icon}
          </div>

          <span className="font-semibold text-slate-900">
            {question}
          </span>
        </div>

        <span className="shrink-0 text-xl text-slate-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 pl-[4.5rem] text-sm leading-7 text-slate-600 sm:px-8 sm:pl-[5.5rem]">
          {answer}
        </div>
      )}
    </div>
  );
}


function CompareMini({ icon: Icon, text, positive = false }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/80 px-3.5 py-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          positive ? "bg-emerald-50" : "bg-slate-100"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${
            positive ? "text-emerald-600" : "text-slate-500"
          }`}
        />
      </div>

      <span className="text-sm font-medium text-slate-700">
        {text}
      </span>
    </div>
  );
}


/* =============================================================
   FAKE QR
============================================================= */

function FakeQR({ dark = false }) {

  const blocks = [
    [0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
    [6, 0], [7, 0], [8, 0], [6, 1], [8, 1], [6, 2], [7, 2], [8, 2],
    [0, 6], [1, 6], [2, 6], [0, 7], [2, 7], [0, 8], [1, 8], [2, 8],

    [4, 1], [5, 2], [3, 3], [5, 3], [4, 4],
    [6, 4], [7, 5], [3, 6], [5, 7], [7, 7],
    [4, 8], [8, 5], [5, 6], [3, 8],
  ];

  return (
    <div
      className={`grid aspect-square w-full grid-cols-9 gap-[2px] rounded-lg p-1 ${
        dark ? 'bg-white' : 'bg-slate-50'
      }`}
    >
      {Array.from({ length: 81 }).map((_, index) => {

        const x = index % 9;
        const y = Math.floor(index / 9);

        const active = blocks.some(
          ([bx, by]) => bx === x && by === y
        );

        return (
          <div
            key={index}
            className={active ? 'rounded-[1px] bg-slate-950' : 'bg-transparent'}
          />
        );
      })}

      
    </div>
  );
}



























// import { useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Star,
//   QrCode,
//   Sparkles,
//   ArrowUpRight,
//   ShieldCheck,
//   UserPlus,
//   Building2,
//   Share2,
//   ScanLine,
//   PenLine,
//   ThumbsUp,
//   BarChart3,
//   Smartphone,
//   Check,
//   ChevronDown,
//   Zap,
//   MessageSquare,
//   MousePointer2,
//   TrendingUp,
//   Users,
//   Clock3,
//   ExternalLink,
//   Play,
//   Menu,
//   X,
// } from 'lucide-react';

// import toast from 'react-hot-toast';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import { useAuth } from '../context/AuthContext';
// import api, { getErrorMessage } from '../services/api';

// export default function Landing() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);

//   const handleCredential = useCallback(
//     async (idToken) => {
//       setLoading(true);

//       try {
//         const res = await api.post('/auth/google', { idToken });
//         const { token, user } = res.data.data;

//         login(token, user);
//         navigate('/business/dashboard');
//       } catch (err) {
//         toast.error(getErrorMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     },
//     [login, navigate]
//   );

//   const scrollTo = (id) => {
//     document.getElementById(id)?.scrollIntoView({
//       behavior: 'smooth',
//     });

//     setMobileMenu(false);
//   };

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-[#0b1f1a] text-slate-100">

//       {/* =========================================================
//           NAVBAR
//       ========================================================= */}

//       <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1f1a]/90 backdrop-blur-xl">
//         <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

//           {/* Logo */}
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//             className="flex items-center gap-3"
//           >
//             {/* <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950 to-amber-500 shadow-lg shadow-emerald-950/25">
//               <Star className="h-5 w-5 fill-white text-white" />
//             </div> */}

//             <div className="text-left">
//               <p className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
//                 Google ReviewPilot
//               </p>
//               <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
//                 Reputation made simple
//               </p>
//             </div>
//           </button>

//      {/* Desktop Navigation */}
// <nav className="hidden items-center gap-7 lg:flex">

// <button
//   onClick={() => scrollTo('how-it-works')}
//   className="text-sm font-medium text-slate-400 transition hover:text-white"
// >
//   How it works
// </button>

// <button
//   onClick={() => scrollTo('use-cases')}
//   className="text-sm font-medium text-slate-400 transition hover:text-white"
// >
//   Use cases
// </button>

// <button
//   onClick={() => scrollTo('ai')}
//   className="text-sm font-medium text-slate-400 transition hover:text-white"
// >
//   AI assistance
// </button>

// <button
//   onClick={() => scrollTo('faq')}
//   className="text-sm font-medium text-slate-400 transition hover:text-white"
// >
//   FAQ
// </button>

// </nav>


// {/* Right Side Actions */}
// <div className="hidden items-center gap-3 lg:flex">

// {/* Call */}
// <a
//   href="tel:+917400332999"
//   className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
// >
//   <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-400/10 transition group-hover:bg-emerald-400/20">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-3.5 w-3.5"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0122 16.92z"
//       />
//     </svg>
//   </div>

//   Call
// </a>


// {/* WhatsApp */}
// <a
//   href="https://wa.me/917400332999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Google%20ReviewPilot"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs font-semibold text-slate-300 transition hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-300"
// >
//   <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400/10 transition group-hover:bg-amber-400/20">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-3.5 w-3.5"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M21 11.5a8.38 8.38 0 01-9 8.5 8.5 8.5 0 01-4.08-1.04L3 20l1.08-4.58A8.38 8.38 0 013 11.5a8.5 8.5 0 118.5 8.5"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.5 2 2.6 2.6l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.1-1.3-.3-2.6-1-3.7-2.1-1.1-1.1-1.8-2.4-2.1-3.7-.2-.5-.1-1.1.1-1.5z"
//       />
//     </svg>
//   </div>

//   WhatsApp
// </a>


// {/* Divider */}
// <div className="mx-1 h-7 w-px bg-white/10" />


// {/* Powered by */}
// <div className="hidden xl:block">
//   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
//     Powered by
//   </p>

//   <p className="mt-0.5 whitespace-nowrap text-[14px] font-bold text-slate-300">
//     Vortex Web Technologies
//   </p>
// </div>


// {/* Login / CTA */}
// {/* <GoogleLoginButton onCredential={handleCredential} /> */}

// </div>

//           {/* Mobile menu */}
//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
//           >
//             {mobileMenu ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>
//         </div>

//         {mobileMenu && (
//           <div className="border-t border-white/10 bg-[#0b1f1a] px-5 py-5 md:hidden">
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={() => scrollTo('how-it-works')}
//                 className="text-left text-sm font-medium text-slate-300"
//               >
//                 How it works
//               </button>

//               <button
//                 onClick={() => scrollTo('use-cases')}
//                 className="text-left text-sm font-medium text-slate-300"
//               >
//                 Use cases
//               </button>

//               <button
//                 onClick={() => scrollTo('ai')}
//                 className="text-left text-sm font-medium text-slate-300"
//               >
//                 AI assistance
//               </button>

//               <button
//                 onClick={() => scrollTo('faq')}
//                 className="text-left text-sm font-medium text-slate-300"
//               >
//                 FAQ
//               </button>

//               <div className="pt-2">
//                 <GoogleLoginButton onCredential={handleCredential} />
//               </div>
//             </div>
//           </div>
//         )}
//       </header>


//       {/* =========================================================
//           HERO
//       ========================================================= */}

//       <section className="relative overflow-hidden bg-[#0b1f1a]">

//         {/* Background decoration */}
//         <div className="pointer-events-none absolute inset-0">
//           <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
//           <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />

//           <div
//             className="absolute inset-0 opacity-[0.035]"
//             style={{
//               backgroundImage:
//                 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
//               backgroundSize: '48px 48px',
//             }}
//           />
//         </div>

//         <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:pb-28 lg:pt-24">

//           {/* Hero content */}
//           <div className="relative z-10">

//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
//               <Sparkles className="h-3.5 w-3.5" />
//               AI-assisted. Never AI-faked.
//             </div>

//             <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.6rem]">
//               Turn happy customers into{' '}
//               <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
//                 genuine reviews.
//               </span>
//             </h1>

//             <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
//               ReviewPilot makes it effortless for customers to share their
//               real experience — from one simple QR scan to a ready-to-post
//               Google review.
//             </p>

//             <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">

//               <div className="w-full sm:w-auto">
//                 <GoogleLoginButton onCredential={handleCredential} />

//                 {loading && (
//                   <p className="mt-2 text-center text-xs text-slate-500">
//                     Signing you in...
//                   </p>
//                 )}
//               </div>

//               <button
//                 onClick={() => scrollTo('how-it-works')}
//                 className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
//               >
//                 <Play className="h-4 w-4 fill-current" />
//                 See how it works
//               </button>
//             </div>

//             <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
//               <div className="flex items-center gap-2">
//                 <Check className="h-4 w-4 text-amber-500" />
//                 No customer app
//               </div>

//               <div className="flex items-center gap-2">
//                 <Check className="h-4 w-4 text-amber-500" />
//                 Customer controlled
//               </div>

//               <div className="flex items-center gap-2">
//                 <Check className="h-4 w-4 text-amber-500" />
//                 Free to start
//               </div>
//             </div>
//           </div>


//           {/* =====================================================
//               3D HERO VISUAL
//           ===================================================== */}

//           <div className="relative mx-auto h-[540px] w-full max-w-[570px] [perspective:1200px]">

//             {/* Glow */}
//             <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400/15 to-amber-400/15 blur-3xl" />

//             {/* Rotating rings */}
//             <div className="hero-ring absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20" />

//             <div className="hero-ring-reverse absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20 border-dashed" />

//             {/* QR floating card */}
//             <div className="float-slow absolute left-[3%] top-[20%] z-20 w-[145px] rotate-[-8deg] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.15)]">

//               <div className="mb-3 flex items-center justify-between">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
//                   <QrCode className="h-4 w-4 text-emerald-600" />
//                 </div>

//                 <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
//                   Scan
//                 </span>
//               </div>

//               <FakeQR />

//               <p className="mt-3 text-center text-[10px] font-semibold text-slate-600">
//                 Scan to review
//               </p>
//             </div>


//             {/* Main phone */}
//             <div className="float-phone absolute left-1/2 top-1/2 z-10 h-[465px] w-[235px] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-[38px] border-[7px] border-slate-900 bg-slate-950 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.3)]">

//               {/* Dynamic island */}
//               <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-900" />

//               <div className="relative h-full overflow-hidden rounded-[29px] bg-gradient-to-b from-slate-50 to-white">

//                 {/* Phone header */}
//                 <div className="px-5 pb-3 pt-10">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-[9px] font-semibold text-slate-400">
//                         GOOGLE REVIEWPILOT
//                       </p>
//                       <p className="mt-1 text-sm font-bold text-slate-900">
//                         How was your visit?
//                       </p>
//                     </div>

//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
//                       <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Stars */}
//                 <div className="px-5 py-4">
//                   <div className="flex justify-center gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <div
//                         key={star}
//                         className="star-pop flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50"
//                         style={{ animationDelay: `${star * 0.12}s` }}
//                       >
//                         <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* AI card */}
//                 <div className="mx-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">

//                   <div className="mb-3 flex items-center gap-2">
//                     <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-950 to-amber-500">
//                       <Sparkles className="h-3.5 w-3.5 text-white" />
//                     </div>

//                     <div>
//                       <p className="text-[10px] font-bold text-slate-800">
//                         AI Review Assist
//                       </p>
//                       <p className="text-[8px] text-slate-400">
//                         Based on your experience
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-[10px] leading-5 text-slate-500">
//                     "The doctor was professional and explained everything
//                     clearly. The staff was friendly and the clinic was
//                     spotless."
//                   </p>

//                   <div className="mt-3 flex items-center justify-between">
//                     <span className="text-[8px] font-semibold text-amber-600">
//                       Customer approved
//                     </span>

//                     <div className="flex h-6 items-center gap-1 rounded-lg bg-slate-100 px-2">
//                       <PenLine className="h-3 w-3 text-slate-500" />
//                       <span className="text-[8px] font-medium text-slate-500">
//                         Edit
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Google button */}
//                 <div className="absolute bottom-5 left-4 right-4">
//                   <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-950 text-[10px] font-semibold text-white shadow-lg">
//                     <ExternalLink className="h-3.5 w-3.5" />
//                     Post to Google
//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/* Review floating card */}
//             <div className="float-review absolute bottom-[12%] right-[1%] z-20 w-[175px] rotate-[6deg] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.15)]">

//               <div className="flex items-center gap-2">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 text-[10px] font-bold text-white">
//                   MC
//                 </div>

//                 <div>
//                   <p className="text-[10px] font-bold text-slate-800">
//                     Mumbai Dental Care
//                   </p>
//                   <div className="mt-0.5 flex gap-0.5">
//                     {[1, 2, 3, 4, 5].map((s) => (
//                       <Star
//                         key={s}
//                         className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-3 text-[9px] leading-4 text-slate-500">
//                 "Excellent experience. Friendly staff and very professional
//                 doctor."
//               </p>

//               <div className="mt-3 flex items-center gap-1 text-[8px] font-semibold text-amber-600">
//                 <Check className="h-3 w-3" />
//                 Published on Google
//               </div>
//             </div>


//             {/* Analytics bubble */}
//             <div className="float-slow absolute right-[5%] top-[9%] rounded-xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
//                   <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
//                 </div>

//                 <div>
//                   <p className="text-[9px] text-slate-400">
//                     Google clicks
//                   </p>
//                   <p className="text-sm font-bold text-slate-900">
//                     +28.4%
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =========================================================
//           TRUST STRIP
//       ========================================================= */}

//       <section className="border-y border-white/10 bg-white/[0.03]">
//         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-5 text-xs font-semibold text-slate-300 sm:px-8">

//           <TrustItem
//             icon={QrCode}
//             text="Instant QR & link"
//           />

//           <TrustItem
//             icon={Smartphone}
//             text="No customer app"
//           />

//           <TrustItem
//             icon={ShieldCheck}
//             text="No fake reviews"
//           />

//           <TrustItem
//             icon={Zap}
//             text="Setup in minutes"
//           />

//           <TrustItem
//             icon={BarChart3}
//             text="Track performance"
//           />

//         </div>
//       </section>


//       {/* =========================================================
//           PROBLEM
//       ========================================================= */}

//       <section className="px-5 py-24 sm:px-8">
//         <div className="mx-auto max-w-7xl">

//           <div className="mx-auto max-w-2xl text-center">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
//               The problem
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
//               Great experiences happen.
//               <br />
//               Reviews don't always follow.
//             </h2>

//             <p className="mt-5 text-base leading-7 text-slate-400">
//               Customers may love your business but still forget to leave a
//               review once they walk out the door.
//             </p>
//           </div>


//           <div className="mt-16 grid gap-5 md:grid-cols-4">

//             <ProblemCard
//               number="01"
//               icon={Clock3}
//               title="They forget"
//               text="The customer leaves happy, but the review never happens."
//             />

//             <ProblemCard
//               number="02"
//               icon={MessageSquare}
//               title="Asking feels awkward"
//               text="Staff don't want to repeatedly ask customers for reviews."
//             />

//             <ProblemCard
//               number="03"
//               icon={PenLine}
//               title="Blank page problem"
//               text="Customers open Google and don't know what to write."
//             />

//             <ProblemCard
//               number="04"
//               icon={BarChart3}
//               title="No visibility"
//               text="You don't know how many customers interacted with your request."
//             />

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           HOW IT WORKS
//       ========================================================= */}

//       <section
//         id="how-it-works"
//         className="relative overflow-hidden bg-[#0e2620] px-5 py-24 text-white sm:px-8"
//       >

//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-amber-600 blur-[130px]" />
//           <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-500 blur-[130px]" />
//         </div>

//         <div className="relative mx-auto max-w-7xl">

//           <div className="mx-auto max-w-3xl text-center">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
//               From scan to review
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
//               One simple journey.
//               <br />
//               <span className="text-slate-400">
//                 Zero friction.
//               </span>
//             </h2>

//             <p className="mt-5 text-base leading-7 text-slate-400">
//               ReviewPilot connects the business and customer experience in
//               one simple loop.
//             </p>
//           </div>


//           {/* Flow */}
//           <div className="mt-20 grid gap-8 md:grid-cols-5">

//             <FlowStep
//               number="01"
//               icon={ScanLine}
//               title="Scan"
//               description="Customer scans the QR code."
//             />

//             <FlowStep
//               number="02"
//               icon={Star}
//               title="Rate"
//               description="They rate their real experience."
//             />

//             <FlowStep
//               number="03"
//               icon={Sparkles}
//               title="AI Assist"
//               description="AI helps turn their thoughts into words."
//             />

//             <FlowStep
//               number="04"
//               icon={PenLine}
//               title="Edit"
//               description="Customer reviews and edits the draft."
//             />

//             <FlowStep
//               number="05"
//               icon={ThumbsUp}
//               title="Post"
//               description="They choose to publish it on Google."
//             />

//           </div>


//           {/* Connecting line */}
//           <div className="mx-auto mt-10 hidden max-w-5xl border-t border-dashed border-slate-700 md:block" />


//           {/* Big phone demo */}
//           <div className="mx-auto mt-20 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur sm:p-8">

//             <div className="mb-7 flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-semibold text-white">
//                   Customer experience
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   A realistic ReviewPilot journey
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-semibold text-amber-300">
//                 <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
//                 Live flow
//               </div>
//             </div>


//             <div className="grid gap-5 md:grid-cols-4">

//               <DemoPanel
//                 icon={QrCode}
//                 step="01"
//                 title="Scan QR"
//                 description="No app. No login."
//               >
//                 <div className="mx-auto w-24">
//                   <FakeQR dark />
//                 </div>
//               </DemoPanel>

//               <DemoPanel
//                 icon={Star}
//                 step="02"
//                 title="Rate"
//                 description="Share your experience."
//               >
//                 <div className="flex justify-center gap-1.5">
//                   {[1, 2, 3, 4, 5].map((s) => (
//                     <Star
//                       key={s}
//                       className="h-6 w-6 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>
//               </DemoPanel>

//               <DemoPanel
//                 icon={Sparkles}
//                 step="03"
//                 title="AI assists"
//                 description="Your words become a review."
//               >
//                 <div className="rounded-xl bg-slate-800 p-3 text-[10px] leading-5 text-slate-300">
//                   "The staff was friendly and the doctor explained everything
//                   clearly..."
//                 </div>
//               </DemoPanel>

//               <DemoPanel
//                 icon={ThumbsUp}
//                 step="04"
//                 title="Post"
//                 description="Customer decides."
//               >
//                 <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold text-slate-900">
//                   <ExternalLink className="h-3.5 w-3.5" />
//                   Post to Google
//                 </div>
//               </DemoPanel>

//             </div>
//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           REAL USE CASE
//       ========================================================= */}

//       <section className="px-5 py-24 sm:px-8">
//         <div className="mx-auto max-w-7xl">

//           <div className="grid items-center gap-14 lg:grid-cols-2">

//             {/* Image / visual */}
//             <div className="relative">

//               <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-emerald-100 to-amber-100 blur-2xl" />

//               <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">

//                 <img
//                   src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
//                   alt="Modern dental clinic"
//                   className="h-[460px] w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

//                 <div className="absolute bottom-6 left-6 right-6">
//                   <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-xs font-medium text-white/60">
//                           Example business
//                         </p>

//                         <p className="mt-1 text-lg font-bold text-white">
//                           Mumbai Dental Care
//                         </p>
//                       </div>

//                       <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
//                         <Building2 className="h-5 w-5 text-white" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </div>

//             </div>


//             {/* Story */}
//             <div>

//               <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//                 Real-world use case
//               </span>

//               <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                 Imagine a patient just finished a great appointment.
//               </h2>

//               <p className="mt-5 leading-7 text-slate-400">
//                 Instead of hoping they'll remember to leave a review later,
//                 ReviewPilot captures the moment while the experience is still
//                 fresh.
//               </p>


//               <div className="mt-9 space-y-6">

//                 <UseCaseStep
//                   number="01"
//                   title="The happy moment"
//                   text="The patient finishes their appointment feeling satisfied."
//                 />

//                 <UseCaseStep
//                   number="02"
//                   title="One simple scan"
//                   text="They scan the ReviewPilot QR code at reception."
//                 />

//                 <UseCaseStep
//                   number="03"
//                   title="AI helps with the words"
//                   text="Their rating and thoughts become a natural review draft."
//                 />

//                 <UseCaseStep
//                   number="04"
//                   title="The customer stays in control"
//                   text="They edit the review and decide whether to publish it."
//                 />

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           AI SECTION
//       ========================================================= */}

//       <section
//         id="ai"
//         className="overflow-hidden bg-gradient-to-br from-emerald-950/40 via-[#0b1f1a] to-amber-950/20 px-5 py-24 sm:px-8"
//       >

//         <div className="mx-auto max-w-7xl">

//           <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">

//             <div>
//               <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//                 AI assistance
//               </span>

//               <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//                 AI helps write it.
//                 <br />
//                 <span className="text-slate-400">
//                   The customer owns it.
//                 </span>
//               </h2>

//               <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
//                 ReviewPilot doesn't manufacture experiences. It helps
//                 customers express what they actually experienced.
//               </p>

//               <div className="mt-8 flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
//                   <ShieldCheck className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-bold text-white">
//                     Authentic by design
//                   </p>
//                   <p className="text-xs text-slate-400">
//                     Customer reviews, edits and approves the final text.
//                   </p>
//                 </div>
//               </div>
//             </div>


//             {/* AI transformation */}
//             <div className="relative">

//               <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_100px_rgba(0,0,0,.3)] backdrop-blur sm:p-7">

//                 {/* Customer input */}
//                 <div>
//                   <div className="mb-3 flex items-center justify-between">
//                     <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
//                       Customer's thoughts
//                     </span>

//                     <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-slate-400">
//                       Original
//                     </span>
//                   </div>

//                   <div className="rounded-2xl bg-white/5 p-5 text-sm leading-6 text-slate-300">
//                     "Doctor was really good. Explained everything clearly.
//                     Staff was friendly. Clinic was clean."
//                   </div>
//                 </div>


//                 {/* Arrow */}
//                 <div className="my-5 flex justify-center">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
//                     <Sparkles className="h-4 w-4 text-amber-400" />
//                   </div>
//                 </div>


//                 {/* AI output */}
//                 <div>
//                   <div className="mb-3 flex items-center justify-between">
//                     <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
//                       AI-assisted draft
//                     </span>

//                     <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[9px] font-semibold text-amber-400">
//                       Based on experience
//                     </span>
//                   </div>

//                   <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-amber-400/10 p-5 text-sm leading-6 text-slate-200">
//                     "I had a great experience at the clinic. The doctor was
//                     professional and explained everything clearly. The staff
//                     was friendly and the clinic was clean and welcoming."
//                   </div>
//                 </div>


//                 {/* Customer approval */}
//                 <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 sm:flex-row sm:items-center sm:justify-between">

//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10">
//                       <Check className="h-4 w-4 text-amber-400" />
//                     </div>

//                     <div>
//                       <p className="text-xs font-bold text-white">
//                         Customer reviews the draft
//                       </p>
//                       <p className="text-[10px] text-slate-400">
//                         Edit anything before posting
//                       </p>
//                     </div>
//                   </div>

//                   <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-semibold text-white">
//                     <PenLine className="h-3 w-3" />
//                     Edit review
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           USE CASES
//       ========================================================= */}

//       <section
//         id="use-cases"
//         className="px-5 py-24 sm:px-8"
//       >

//         <div className="mx-auto max-w-7xl">

//           <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

//             <div>
//               <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//                 Use cases 
//               </span>

//               <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//                 Built for businesses that depend on trust.
//               </h2>
//             </div>

//             <p className="max-w-md text-sm leading-6 text-slate-400">
//               Wherever a great customer experience happens, ReviewPilot can
//               make the next review easier.
//             </p>

//           </div>


//           <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

//             <IndustryCard
//               icon="🦷"
//               title="Dental Clinics"
//               text="Capture reviews right after a successful appointment."
//               color="blue"
//             />

//             <IndustryCard
//               icon="🍽️"
//               title="Restaurants"
//               text="Turn a great dining experience into a fresh review."
//               color="teal"
//             />

//             <IndustryCard
//               icon="💇"
//               title="Salons & Spas"
//               text="Ask customers while they are still enjoying the result."
//               color="purple"
//             />

//             <IndustryCard
//               icon="🏨"
//               title="Hotels"
//               text="Make it easy for happy guests to share their stay."
//               color="orange"
//             />

//             <IndustryCard
//               icon="🚗"
//               title="Auto Services"
//               text="Capture feedback immediately after a vehicle service."
//               color="cyan"
//             />

//             <IndustryCard
//               icon="🏪"
//               title="Local Businesses"
//               text="Build a stronger local reputation one experience at a time."
//               color="green"
//             />

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           DASHBOARD
//       ========================================================= */}

//       {/* <section className="bg-white/[0.03] px-5 py-24 sm:px-8">

//         <div className="mx-auto max-w-7xl">

//           <div className="mx-auto max-w-2xl text-center">

//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//               Your reputation, visible
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//               Know what happens after the QR code is scanned.
//             </h2>

//             <p className="mt-5 leading-7 text-slate-400">
//               See how customers interact with your ReviewPilot experience and
//               understand where your review journey is working.
//             </p>

//           </div>


      
//           <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_100px_rgba(15,23,42,.12)]">

            
//             <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

//               <div className="flex gap-1.5">
//                 <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
//                 <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
//                 <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
//               </div>

//               <div className="hidden rounded-lg bg-slate-50 px-5 py-2 text-[10px] text-slate-400 sm:block">
//                 app.googlereviewpilot.com/dashboard
//               </div>

//               <div className="w-10" />
//             </div>


//             <div className="grid md:grid-cols-[180px_1fr]">

              
//               <div className="hidden border-r border-slate-100 bg-slate-50/60 p-5 md:block">

//                 <div className="flex items-center gap-2">
//                   <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-950 to-amber-500">
//                     <Star className="h-3.5 w-3.5 fill-white text-white" />
//                   </div>

//                   <span className="text-xs font-bold">
//                     ReviewPilot
//                   </span>
//                 </div>

//                 <div className="mt-8 space-y-2">
//                   <DashboardNav active text="Overview" />
//                   <DashboardNav text="Reviews" />
//                   <DashboardNav text="QR Code" />
//                   <DashboardNav text="Analytics" />
//                 </div>

//               </div>


            
//               <div className="p-5 sm:p-8">

//                 <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Welcome back
//                     </p>

//                     <h3 className="mt-1 text-xl font-bold text-slate-950">
//                       Mumbai Dental Care
//                     </h3>
//                   </div>

//                   <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-semibold text-white">
//                     <QrCode className="h-3.5 w-3.5" />
//                     View QR
//                   </button>
//                 </div>


               
//                 <div className="mt-7 grid gap-4 sm:grid-cols-3">

//                   <DashboardStat
//                     icon={ScanLine}
//                     label="QR scans"
//                     value="428"
//                     change="+18.2%"
//                   />

//                   <DashboardStat
//                     icon={Sparkles}
//                     label="AI drafts"
//                     value="312"
//                     change="+24.6%"
//                   />

//                   <DashboardStat
//                     icon={ExternalLink}
//                     label="Google clicks"
//                     value="267"
//                     change="+28.4%"
//                   />

//                 </div>


              
//                 <div className="mt-6 rounded-2xl border border-slate-100 p-5">

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-bold text-slate-800">
//                         Customer activity
//                       </p>

//                       <p className="mt-1 text-[10px] text-slate-400">
//                         Last 7 days
//                       </p>
//                     </div>

//                     <TrendingUp className="h-4 w-4 text-amber-500" />
//                   </div>


//                   <div className="mt-8 flex h-32 items-end gap-2 sm:gap-5">

//                     {[38, 53, 45, 70, 61, 86, 96].map((height, index) => (
//                       <div
//                         key={index}
//                         className="group relative flex h-full flex-1 items-end"
//                       >
//                         <div
//                           className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-amber-400 transition-all duration-500 group-hover:opacity-80"
//                           style={{ height: `${height}%` }}
//                         />
//                       </div>
//                     ))}

//                   </div>

//                   <div className="mt-3 flex justify-between text-[9px] text-slate-400">
//                     <span>Mon</span>
//                     <span>Tue</span>
//                     <span>Wed</span>
//                     <span>Thu</span>
//                     <span>Fri</span>
//                     <span>Sat</span>
//                     <span>Sun</span>
//                   </div>

//                 </div>


               
//                 <div className="mt-6">

//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-bold text-slate-800">
//                       Recent activity
//                     </p>

//                     <button className="text-[10px] font-semibold text-amber-600">
//                       View all
//                     </button>
//                   </div>

//                   <div className="mt-3 space-y-2">

//                     <ActivityRow
//                       initials="RS"
//                       text="Customer generated a review draft"
//                       time="2 min ago"
//                     />

//                     <ActivityRow
//                       initials="AK"
//                       text="Google review link opened"
//                       time="8 min ago"
//                     />

//                     <ActivityRow
//                       initials="PM"
//                       text="5-star experience submitted"
//                       time="21 min ago"
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </section> */}


//       {/* =========================================================
//           BEFORE / AFTER
//       ========================================================= */}

//       <section className="px-5 py-24 sm:px-8">

//         <div className="mx-auto max-w-7xl">

//           <div className="mx-auto max-w-2xl text-center">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//               The difference
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//               Stop hoping customers remember.
//               <br />
//               Start making it effortless.
//             </h2>
//           </div>


//           <div className="mt-14 grid gap-6 lg:grid-cols-2">

//             {/* Before */}
//             <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">

//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
//                   <X className="h-5 w-5 text-red-500" />
//                 </div>

//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
//                     Without ReviewPilot
//                   </p>

//                   <p className="mt-1 text-lg font-bold text-white">
//                     The old way
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-8 space-y-5">
//                 <CompareRow
//                   icon={Clock3}
//                   text="Customer leaves and forgets"
//                   negative
//                 />

//                 <CompareRow
//                   icon={MessageSquare}
//                   text="Staff have to ask verbally"
//                   negative
//                 />

//                 <CompareRow
//                   icon={PenLine}
//                   text="Customer faces a blank review box"
//                   negative
//                 />

//                 <CompareRow
//                   icon={BarChart3}
//                   text="Little visibility into activity"
//                   negative
//                 />
//               </div>

//             </div>


//             {/* After */}
//             <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-amber-400/10 p-7 sm:p-9">

//               <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />

//               <div className="relative flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15">
//                   <Check className="h-5 w-5 text-amber-400" />
//                 </div>

//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
//                     With ReviewPilot
//                   </p>

//                   <p className="mt-1 text-lg font-bold text-white">
//                     The smarter way
//                   </p>
//                 </div>
//               </div>

//               <div className="relative mt-8 space-y-5">
//                 <CompareRow
//                   icon={QrCode}
//                   text="One QR code asks at the right moment"
//                 />

//                 <CompareRow
//                   icon={Sparkles}
//                   text="AI helps customers find the words"
//                 />

//                 <CompareRow
//                   icon={ThumbsUp}
//                   text="Customers edit and approve their review"
//                 />

//                 <CompareRow
//                   icon={TrendingUp}
//                   text="Dashboard shows customer activity"
//                 />
//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           SETUP
//       ========================================================= */}

//       <section className="bg-white/[0.03]  px-5 py-24 text-white sm:px-8">

//         <div className="mx-auto max-w-6xl">

//           <div className="mx-auto max-w-2xl text-center">

//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
//               Setup
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">
//               Start collecting better reviews
//               <br />
//               in minutes.
//             </h2>

//           </div>


//           <div className="mt-16 grid gap-8 md:grid-cols-3">

//             <SetupStep
//               number="01"
//               icon={UserPlus}
//               title="Sign in"
//               text="Use Google to create your business account without another password."
//             />

//             <SetupStep
//               number="02"
//               icon={Building2}
//               title="Add your business"
//               text="Add your business details, logo and Google review destination."
//             />

//             <SetupStep
//               number="03"
//               icon={Share2}
//               title="Share your QR"
//               text="Print it at your counter, table, reception or anywhere customers interact."
//             />

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           FAQ
//       ========================================================= */}

//       <section id="faq" className="px-5 py-24 sm:px-8">

//         <div className="mx-auto max-w-4xl">

//           <div className="text-center">
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
//               FAQ
//             </span>

//             <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//               Questions, answered.
//             </h2>
//           </div>


//           <div className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">

//             <FaqItem
//               question="Does ReviewPilot create fake reviews?"
//               answer="No. ReviewPilot is designed to assist customers with wording based on their own experience. The customer reviews, edits and decides whether to publish the final review."
//               open={openFaq === 0}
//               onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
//             />

//             <FaqItem
//               question="Does the customer need to install an app?"
//               answer="No. The QR code opens the ReviewPilot experience directly in the customer's browser."
//               open={openFaq === 1}
//               onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
//             />

//             <FaqItem
//               question="Can customers edit the AI-generated review?"
//               answer="Yes. The customer remains in control and can edit the generated draft before deciding whether to post it."
//               open={openFaq === 2}
//               onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
//             />

//             <FaqItem
//               question="Where can I put the QR code?"
//               answer="You can place it at reception desks, checkout counters, tables, service areas, receipts, printed cards or anywhere else customers interact with your business."
//               open={openFaq === 3}
//               onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
//             />

//             <FaqItem
//               question="What can I track?"
//               answer="Your ReviewPilot dashboard can surface activity such as QR scans, review drafts and Google review clicks."
//               open={openFaq === 4}
//               onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
//             />

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           FINAL CTA
//       ========================================================= */}

//       <section className="px-5 pb-20 sm:px-8">

//         <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-500 px-6 py-16 text-center shadow-2xl shadow-emerald-950/30 sm:px-10 sm:py-20">

//           <div className="absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

//           <div className="relative">

//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
//               <Star className="h-7 w-7 fill-white text-white" />
//             </div>

//             <h2 className="mx-auto mt-7 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
//               Your next great review could be one scan away.
//             </h2>

//             <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-emerald-100 sm:text-base">
//               Give happy customers an easier way to share what they already
//               love about your business.
//             </p>

//             <div className="mt-8 flex justify-center">
//               <GoogleLoginButton onCredential={handleCredential} />
//             </div>

//             <p className="mt-4 text-[11px] text-emerald-100/70">
//               Free to start · No credit card required
//             </p>

//           </div>

//         </div>

//       </section>


//       {/* =========================================================
//           FOOTER
//       ========================================================= */}

//       <footer className="border-t border-white/10 bg-[#0b1f1a] px-5 py-10 sm:px-8">

//         <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">

//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950 to-amber-500">
//               <Star className="h-4 w-4 fill-white text-white" />
//             </div>

//             <div>
//               <p className="text-sm font-bold text-white">
//                 Google ReviewPilot
//               </p>

//               <p className="text-[10px] text-slate-500">
//                 Reputation made simple.
//               </p>
//             </div>

//           </div>


// <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-400">

//   <a
//     href="/privacy-policy"
//     className="transition hover:text-white"
//   >
//     Privacy Policy
//   </a>

//   <a
//     href="/terms-and-conditions"
//     className="transition hover:text-white"
//   >
//     Terms & Conditions
//   </a>

// </nav>

//           <p className="text-[10px] text-slate-500">
//             © {new Date().getFullYear()} Vortex Web Technology.
//             All rights reserved.
//           </p>

//         </div>

//       </footer>


//       {/* =========================================================
//           ANIMATION CSS
//       ========================================================= */}

//       <style>{`

//         @keyframes floatPhone {
//           0%, 100% {
//             transform:
//               translate(-50%, -50%)
//               rotate(5deg)
//               translateY(0px);
//           }

//           50% {
//             transform:
//               translate(-50%, -50%)
//               rotate(2deg)
//               translateY(-14px);
//           }
//         }

//         @keyframes floatSlow {
//           0%, 100% {
//             transform: translateY(0px) rotate(-8deg);
//           }

//           50% {
//             transform: translateY(-12px) rotate(-5deg);
//           }
//         }

//         @keyframes floatReview {
//           0%, 100% {
//             transform: rotate(6deg) translateY(0px);
//           }

//           50% {
//             transform: rotate(3deg) translateY(-12px);
//           }
//         }

//         @keyframes ring {
//           from {
//             transform:
//               translate(-50%, -50%)
//               rotate(0deg);
//           }

//           to {
//             transform:
//               translate(-50%, -50%)
//               rotate(360deg);
//           }
//         }

//         @keyframes ringReverse {
//           from {
//             transform:
//               translate(-50%, -50%)
//               rotate(360deg);
//           }

//           to {
//             transform:
//               translate(-50%, -50%)
//               rotate(0deg);
//           }
//         }

//         @keyframes starPop {
//           0% {
//             transform: scale(.75);
//             opacity: .3;
//           }

//           50% {
//             transform: scale(1.08);
//             opacity: 1;
//           }

//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .float-phone {
//           animation: floatPhone 5s ease-in-out infinite;
//         }

//         .float-slow {
//           animation: floatSlow 5s ease-in-out infinite;
//         }

//         .float-review {
//           animation: floatReview 5.5s ease-in-out infinite;
//         }

//         .hero-ring {
//           animation: ring 22s linear infinite;
//         }

//         .hero-ring-reverse {
//           animation: ringReverse 17s linear infinite;
//         }

//         .star-pop {
//           animation: starPop 2s ease-out infinite;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .float-phone,
//           .float-slow,
//           .float-review,
//           .hero-ring,
//           .hero-ring-reverse,
//           .star-pop {
//             animation: none;
//           }
//         }

//       `}</style>

//     </div>
//   );
// }


// /* =============================================================
//    COMPONENTS
// ============================================================= */

// function TrustItem({ icon: Icon, text }) {
//   return (
//     <div className="flex items-center gap-2">
//       <Icon className="h-4 w-4 text-emerald-500" />
//       {text}
//     </div>
//   );
// }


// function ProblemCard({
//   number,
//   icon: Icon,
//   title,
//   text,
// }) {
//   return (
//     <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.06]">

//       <div className="flex items-center justify-between">
//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-emerald-400/10">
//           <Icon className="h-5 w-5 text-slate-400 transition group-hover:text-amber-400" />
//         </div>

//         <span className="text-xs font-bold text-white/10">
//           {number}
//         </span>
//       </div>

//       <h3 className="mt-6 text-base font-bold text-white">
//         {title}
//       </h3>

//       <p className="mt-2 text-sm leading-6 text-slate-400">
//         {text}
//       </p>

//     </div>
//   );
// }


// function FlowStep({
//   number,
//   icon: Icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="group relative text-center">

//       <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-400/30 group-hover:bg-amber-400/10">

//         <Icon className="h-6 w-6 text-amber-300" />

//       </div>

//       <div className="mt-5">

//         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
//           {number}
//         </span>

//         <h3 className="mt-1 font-semibold text-white">
//           {title}
//         </h3>

//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }


// function DemoPanel({
//   icon: Icon,
//   step,
//   title,
//   description,
//   children,
// }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">

//       <div className="mb-6 flex items-center justify-between">

//         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
//           <Icon className="h-3.5 w-3.5 text-amber-300" />
//         </div>

//         <span className="text-[9px] font-bold text-slate-600">
//           {step}
//         </span>

//       </div>

//       <div className="flex min-h-[100px] items-center justify-center">
//         {children}
//       </div>

//       <div className="mt-5">
//         <p className="text-xs font-bold text-white">
//           {title}
//         </p>

//         <p className="mt-1 text-[10px] leading-4 text-slate-500">
//           {description}
//         </p>
//       </div>

//     </div>
//   );
// }


// function UseCaseStep({
//   number,
//   title,
//   text,
// }) {
//   return (
//     <div className="flex gap-4">

//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-[10px] font-bold text-amber-600">
//         {number}
//       </div>

//       <div>
//         <h3 className="text-sm font-bold text-white">
//           {title}
//         </h3>

//         <p className="mt-1 text-sm leading-6 text-slate-400">
//           {text}
//         </p>
//       </div>

//     </div>
//   );
// }


// function IndustryCard({
//   icon,
//   title,
//   text,
// }) {
//   return (
//     <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.06]">

//       <div className="absolute right-[-25px] top-[-25px] h-24 w-24 rounded-full bg-emerald-400/10 opacity-0 blur-2xl transition group-hover:opacity-100" />

//       <div className="relative">

//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl transition group-hover:scale-105 group-hover:bg-emerald-400/10">
//           {icon}
//         </div>

//         <h3 className="mt-6 text-base font-bold text-white">
//           {title}
//         </h3>

//         <p className="mt-2 text-sm leading-6 text-slate-400">
//           {text}
//         </p>

//         <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-amber-400 opacity-0 transition group-hover:opacity-100">
//           See how it works
//           <ArrowUpRight className="h-3.5 w-3.5" />
//         </div>

//       </div>

//     </div>
//   );
// }


// function DashboardStat({
//   icon: Icon,
//   label,
//   value,
//   change,
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

//       <div className="flex items-center justify-between">

//         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
//           <Icon className="h-4 w-4 text-amber-600" />
//         </div>

//         <span className="text-[9px] font-bold text-amber-600">
//           {change}
//         </span>

//       </div>

//       <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
//         {value}
//       </p>

//       <p className="mt-1 text-[10px] text-slate-400">
//         {label}
//       </p>

//     </div>
//   );
// }


// function DashboardNav({
//   text,
//   active,
// }) {
//   return (
//     <div
//       className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
//         active
//           ? 'bg-emerald-50 text-amber-600'
//           : 'text-slate-400'
//       }`}
//     >
//       {text}
//     </div>
//   );
// }


// function ActivityRow({
//   initials,
//   text,
//   time,
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">

//       <div className="flex items-center gap-3">
//       text-amber-600
//         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-bold text-amber-600">
//           {initials}
//         </div>

//         <p className="text-[10px] font-medium text-slate-600 sm:text-xs">
//           {text}
//         </p>

//       </div>

//       <span className="ml-3 whitespace-nowrap text-[9px] text-slate-400">
//         {time}
//       </span>

//     </div>
//   );
// }


// function CompareRow({
//   icon: Icon,
//   text,
//   negative = false,
// }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div
//         className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
//           negative
//             ? 'bg-red-500/10 text-red-400'
//             : 'bg-white/10 text-amber-400'
//         }`}
//       >
//         <Icon className="h-4 w-4" />
//       </div>

//       <p className="text-sm font-medium text-slate-300">
//         {text}
//       </p>

//     </div>
//   );
// }


// function SetupStep({
//   number,
//   icon: Icon,
//   title,
//   text,
// }) {
//   return (
//     <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7">

//       <div className="flex items-center justify-between">

//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
//           <Icon className="h-5 w-5 text-amber-300" />
//         </div>

//         <span className="text-2xl font-bold text-white/10">
//           {number}
//         </span>

//       </div>

//       <h3 className="mt-7 text-lg font-bold text-white">
//         {title}
//       </h3>

//       <p className="mt-3 text-sm leading-6 text-slate-500">
//         {text}
//       </p>

//     </div>
//   );
// }


// function FaqItem({
//   question,
//   answer,
//   open,
//   onClick,
// }) {
//   return (
//     <div>

//       <button
//         onClick={onClick}
//         className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
//       >

//         <span className="text-sm font-semibold text-white">
//           {question}
//         </span>

//         <ChevronDown
//           className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
//             open ? 'rotate-180' : ''
//           }`}
//         />

//       </button>

//       <div
//         className={`grid transition-all duration-300 ${
//           open
//             ? 'grid-rows-[1fr]'
//             : 'grid-rows-[0fr]'
//         }`}
//       >

//         <div className="overflow-hidden">
//           <p className="px-5 pb-6 text-sm leading-6 text-slate-400 sm:px-7">
//             {answer}
//           </p>
//         </div>

//       </div>

//     </div>
//   );
// }


// /* =============================================================
//    FAKE QR
// ============================================================= */

// function FakeQR({ dark = false }) {

//   const blocks = [
//     [0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
//     [6, 0], [7, 0], [8, 0], [6, 1], [8, 1], [6, 2], [7, 2], [8, 2],
//     [0, 6], [1, 6], [2, 6], [0, 7], [2, 7], [0, 8], [1, 8], [2, 8],

//     [4, 1], [5, 2], [3, 3], [5, 3], [4, 4],
//     [6, 4], [7, 5], [3, 6], [5, 7], [7, 7],
//     [4, 8], [8, 5], [5, 6], [3, 8],
//   ];

//   return (
//     <div
//       className={`grid aspect-square w-full grid-cols-9 gap-[2px] rounded-lg p-1 ${
//         dark ? 'bg-white' : 'bg-slate-50'
//       }`}
//     >
//       {Array.from({ length: 81 }).map((_, index) => {

//         const x = index % 9;
//         const y = Math.floor(index / 9);

//         const active = blocks.some(
//           ([bx, by]) => bx === x && by === y
//         );

//         return (
//           <div
//             key={index}
//             className={active ? 'rounded-[1px] bg-slate-950' : 'bg-transparent'}
//           />
//         );
//       })}
//     </div>
//   );
// }