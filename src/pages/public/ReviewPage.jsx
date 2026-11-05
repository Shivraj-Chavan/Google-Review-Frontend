// import { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Phone, MapPin, Globe, Instagram, Youtube, Facebook, Star } from 'lucide-react';
// import { Loader, EmptyState } from '../../components/Basics';
// import StarRating from '../../components/StarRating';
// import ReviewGenerator from '../../components/ReviewGenerator';
// import api from '../../services/api';

// function track(businessId, eventType) {
//   if (!businessId) return;
//   api.post('/analytics/event', { businessId, eventType }).catch(() => {});
// }

// export default function PublicReviewPage() {
//   const { slug } = useParams();
//   const [state, setState] = useState({ loading: true, available: null, business: null, notFound: false });
//   const [rating, setRating] = useState(5);
//   const trackedView = useRef(false);

//   useEffect(() => {
//     api.get(`/public/business/${slug}`)
//       .then((res) => {
//         const { available, business } = res.data.data;
//         setState({ loading: false, available, business, notFound: false });
//         document.title = `${business.business_name} | Reviews & Business Information`;
//         if (available && !trackedView.current) {
//           trackedView.current = true;
//           track(business.id, 'PAGE_VIEW');
//         }
//       })
//       .catch(() => setState({ loading: false, available: false, business: null, notFound: true }));
//   }, [slug]);

//   if (state.loading) return <div className="min-h-screen bg-paper"><Loader label="Loading business…" /></div>;

//   if (state.notFound) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-paper px-4">
//         <EmptyState title="Page not found" description="This review link doesn't exist or may have been removed." />
//       </div>
//     );
//   }

//   if (!state.available) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-paper px-4">
//         <EmptyState title="This business page is currently unavailable" description="Please check back later." />
//       </div>
//     );
//   }

//   const b = state.business;

//   return (
//     <div className="min-h-screen bg-paper pb-2">
//       {/* Hero */}
//       {/* <div className="border-b border-ink-100 bg-surface px-5 pb-6 pt-8 text-center sm:pt-12">
//         <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 shadow-card">
//           {b.logo ? <img src={b.logo} alt={b.business_name} className="h-full w-full object-cover" /> : (
//             <div className="flex h-full w-full items-center justify-center text-2xl font-display text-ink-300">
//               {b.business_name[0]}
//             </div>
//           )}
//         </div>
//         <h1 className="font-display text-2xl font-semibold text-ink-900">{b.business_name}</h1>
//         {b.category && <p className="text-sm text-ink-300">{b.category}</p>}
//       </div> */}

//       <div className="mx-auto max-w-lg space-y-2 px-5 pt-5">
//         {/* Gallery */}
//         {/* {b.images?.length > 0 && (
//           <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
//             {b.images.map((img) => (
//               <img
//                 key={img.id}
//                 src={img.image_url}
//                 alt=""
//                 className="h-40 w-56 shrink-0 snap-start rounded-xl2 border border-ink-100 object-cover"
//               />
//             ))}
//           </div>
//         )} */}

//         {/* About */}
//         {/* {(b.description || b.address || b.phone || b.website) && (
//           <div className="rounded-xl2 border border-ink-100 bg-surface p-5">
//             <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-300">About</p>
//             {b.description && <p className="mb-3 text-sm text-ink-700">{b.description}</p>}
//             <div className="space-y-2 text-sm text-ink-500">
//               {b.address && (
//                 <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />
//                   <span>{[b.address, b.city, b.state, b.pincode].filter(Boolean).join(', ')}</span>
//                 </div>
//               )}
//               {b.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={`tel:${b.phone}`}>{b.phone}</a></div>}
//               {b.website && <div className="flex items-center gap-2"><Globe className="h-4 w-4 shrink-0" /><a href={b.website} target="_blank" rel="noreferrer" className="truncate">{b.website}</a></div>}
//             </div>
//           </div>
//         )} */}

//         {/* Social */}
//         {(b.instagram_url || b.youtube_url || b.facebook_url) && (
//           <div className="flex justify-center gap-3">
//             {b.instagram_url && <SocialIcon href={b.instagram_url} icon={Instagram} />}
//             {b.youtube_url && <SocialIcon href={b.youtube_url} icon={Youtube} />}
//             {b.facebook_url && <SocialIcon href={b.facebook_url} icon={Facebook} />}
//           </div>
//         )}

//        {/* Rating + AI review */}
//         <div className="rounded-xl2 border border-ink-100 bg-surface p-4 sm:p-5">
//           <div className="mb-5 flex items-center gap-3">
//             <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border border-ink-100 bg-ink-50">
//               {b.logo ? (
//                 <img src={b.logo} alt={b.business_name} className="h-full w-full object-cover" />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center text-lg font-display text-ink-300">
//                   {b.business_name[0]}
//                 </div>
//               )}
//             </div>
//             <div className="min-w-0 text-left">
//               <p className="truncate font-display text-base sm:text-lg font-semibold text-ink-900">{b.business_name}</p>
//               {(b.city || b.state) && (
//                 <p className="flex items-center gap-1 text-xs sm:text-sm text-ink-300">
//                   <MapPin className="h-3.5 w-3.5 shrink-0" />
//                   <span className="truncate">{[b.city, b.state].filter(Boolean).join(', ')}</span>
//                 </p>
//               )}
//             </div>
//           </div>
//           <p className="mb-1 text-center font-display text-base sm:text-lg font-semibold text-ink-900">How was your experience?</p>
//           <div className="mb-5 mt-2 flex justify-center">
//             <StarRating value={rating} onChange={setRating} />
//           </div>

//           {rating > 0 && (
//             <ReviewGenerator
//               businessId={b.id}
//               rating={rating}
//               googleReviewUrl={b.google_review_url}
//               onEvent={(evt) => track(b.id, evt)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function SocialIcon({ href, icon: Icon }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noreferrer"
//       className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 bg-surface text-ink-700 transition-colors hover:bg-ink-50"
//     >
//       <Icon className="h-5 w-5" />
//     </a>
//   );
// }










import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Instagram, Youtube, Facebook, Star, ThumbsUp, MessageSquareQuote, Heart, Sparkles, Quote } from 'lucide-react';
import { Loader, EmptyState } from '../../components/Basics';
import StarRating from '../../components/StarRating';
import ReviewGenerator from '../../components/ReviewGenerator';
import api from '../../services/api';

function track(businessId, eventType) {
  if (!businessId) return;
  api.post('/analytics/event', { businessId, eventType }).catch(() => {});
}

/* Scoped keyframes – no tailwind.config changes needed */
const bgStyles = `
@keyframes prp-drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(40px,30px,0) scale(1.08); } }
@keyframes prp-drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-50px,-25px,0) scale(1.1); } }
@keyframes prp-float   { 0%,100% { transform: translateY(0) rotate(var(--r)); } 50% { transform: translateY(-18px) rotate(calc(var(--r) + 8deg)); } }
@keyframes prp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .prp-anim { animation: none !important; }
}
`;

/* Floating stars: [top%, left%, size(px), duration(s), delay(s), rotation(deg)] */
const FLOATERS = [
  [8, 6, 28, 9, 0, -12],
  [18, 88, 36, 11, 1.5, 14],
  [38, 3, 22, 8, 0.8, 8],
  [55, 93, 26, 10, 2.2, -6],
  [72, 8, 34, 12, 0.4, 18],
  [86, 82, 24, 9, 1.8, -16],
  [92, 45, 20, 10, 3, 10],
];

const WATERMARK_ICONS = [Quote, Star, ThumbsUp, MessageSquareQuote, Heart, Sparkles];

function BackgroundDecor({ logo }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Soft theme-tinted glows */}
      <div
        className="prp-anim absolute -left-24 -top-24 h-64 w-64 rounded-full bg-ink-100 opacity-70 blur-3xl sm:-left-32 sm:-top-32 sm:h-[26rem] sm:w-[26rem]"
        style={{ animation: 'prp-drift-a 18s ease-in-out infinite' }}
      />
      <div
        className="prp-anim absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-ink-50 opacity-90 blur-3xl sm:-bottom-40 sm:-right-32 sm:h-[30rem] sm:w-[30rem]"
        style={{ animation: 'prp-drift-b 22s ease-in-out infinite' }}
      />

      {/* Review-themed icon watermark: quotes, stars, thumbs-up, hearts (slow alternating drift) */}
      <div className="absolute inset-0 flex -rotate-12 scale-125 flex-col justify-center gap-12 text-ink-900 opacity-[0.045]">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="overflow-hidden whitespace-nowrap">
            <div
              className="prp-anim inline-flex items-center"
              style={{ animation: `prp-marquee ${70 + row * 8}s linear infinite ${row % 2 ? 'reverse' : ''}` }}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const Icon = WATERMARK_ICONS[(i + row * 2) % WATERMARK_ICONS.length];
                return <Icon key={i} className="mx-7 h-9 w-9 shrink-0 sm:mx-10 sm:h-14 sm:w-14" strokeWidth={1.25} />;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Large logo watermark */}
      {logo && (
        <img
          src={logo}
          alt=""
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 sm:h-[28rem] sm:w-[28rem] -translate-y-1/2 object-contain opacity-[0.04] grayscale"
        />
      )}

      {/* Floating stars */}
      {FLOATERS.map(([top, left, size, dur, delay, rot], i) => (
        <Star
          key={i}
          className={`prp-anim absolute text-ink-300 opacity-20 ${i % 2 ? 'hidden sm:block' : ''}`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            '--r': `${rot}deg`,
            animation: `prp-float ${dur}s ease-in-out ${delay}s infinite`,
          }}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function PublicReviewPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, available: null, business: null, notFound: false });
  const [rating, setRating] = useState(5);
  const trackedView = useRef(false);

  useEffect(() => {
    api.get(`/public/business/${slug}`)
      .then((res) => {
        const { available, business } = res.data.data;
        setState({ loading: false, available, business, notFound: false });
        document.title = `${business.business_name} | Reviews & Business Information`;
        if (available && !trackedView.current) {
          trackedView.current = true;
          track(business.id, 'PAGE_VIEW');
        }
      })
      .catch(() => setState({ loading: false, available: false, business: null, notFound: true }));
  }, [slug]);

  if (state.loading) return <div className="min-h-screen bg-paper"><Loader label="Loading business…" /></div>;

  if (state.notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <EmptyState title="Page not found" description="This review link doesn't exist or may have been removed." />
      </div>
    );
  }

  if (!state.available) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <EmptyState title="This business page is currently unavailable" description="Please check back later." />
      </div>
    );
  }

  const b = state.business;

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-2">
      <style>{bgStyles}</style>
      <BackgroundDecor logo={b.logo} />

      <div className="relative z-10 mx-auto max-w-4xl space-y-2 px-5 pt-5">
        {/* Social */}
        {(b.instagram_url || b.youtube_url || b.facebook_url) && (
          <div className="flex justify-center gap-3">
            {b.instagram_url && <SocialIcon href={b.instagram_url} icon={Instagram} />}
            {b.youtube_url && <SocialIcon href={b.youtube_url} icon={Youtube} />}
            {b.facebook_url && <SocialIcon href={b.facebook_url} icon={Facebook} />}
          </div>
        )}

       {/* Rating + AI review */}
        <div className="rounded-xl2 border border-ink-100 bg-surface p-4 sm:p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border border-ink-100 bg-ink-50">
              {b.logo ? (
                <img src={b.logo} alt={b.business_name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-display text-ink-300">
                  {b.business_name[0]}
                </div>
              )}
            </div>
            <div className="min-w-0 text-left">
              <p className="truncate font-display text-base sm:text-lg font-semibold text-ink-900">{b.business_name}</p>
              {(b.city || b.state) && (
                <p className="flex items-center gap-1 text-xs sm:text-sm text-ink-300">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{[b.city, b.state].filter(Boolean).join(', ')}</span>
                </p>
              )}
            </div>
          </div>
          <p className="mb-1 text-center font-display text-base sm:text-lg font-semibold text-ink-900">How was your experience?</p>
          <div className="mb-5 mt-2 flex justify-center">
            <StarRating value={rating} onChange={setRating} />
          </div>

          {rating > 0 && (
            <ReviewGenerator
              businessId={b.id}
              rating={rating}
              googleReviewUrl={b.google_review_url}
              onEvent={(evt) => track(b.id, evt)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 bg-surface text-ink-700 transition-colors hover:bg-ink-50"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}