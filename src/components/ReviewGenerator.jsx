import { useState, useEffect, useRef } from 'react';
import { Sparkles, Copy, RefreshCw, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './Button';
import api from '../services/api';

const POINT_OPTIONS = ['Service', 'Staff', 'Quality', 'Price', 'Ambience', 'Product', 'Cleanliness'];

export default function ReviewGenerator({ businessId, rating, googleReviewUrl, onEvent }) {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [review, setReview] = useState('');
  const [generating, setGenerating] = useState(false);
  const [variant, setVariant] = useState(0);
  const lastRating = useRef(null);

function togglePoint(p) {
    setSelectedPoints((prev) => {
      const next = prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p];
      generate(variant, next); // regenerate immediately using the new selection
      return next;
    });
  }

 async function generate(nextVariant = 0, pointsOverride = null) {
    setGenerating(true);
    try {
      const res = await api.post('/ai/generate-review', {
        businessId, rating, selectedPoints: pointsOverride ?? selectedPoints, customerFeedback: feedback, variant: nextVariant
      });
      setReview(res.data.data.review);
      setVariant(nextVariant);
      onEvent?.('REVIEW_GENERATED');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not generate a review suggestion. You can still write your own below.');
    } finally {
      setGenerating(false);
    }
  }

  // Auto-generate a written review the moment we have a business (no click needed),
  // and again whenever the customer changes their rating (stars remain tappable).
  useEffect(() => {
    if (businessId && rating && lastRating.current !== rating) {
      lastRating.current = rating;
      generate(0);
    }
  }, [businessId, rating]); // eslint-disable-line react-hooks/exhaustive-deps

  function copyAndPost() {
    navigator.clipboard.writeText(review || feedback);
    onEvent?.('REVIEW_COPIED');
    onEvent?.('GOOGLE_CLICK');
    toast.success('Review copied! Opening Google…');
    setTimeout(() => window.open(googleReviewUrl, '_blank', 'noopener'), 500);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-ink-900">What did you like? <span className="font-normal text-ink-300">(optional)</span></p>
        <div className="flex flex-wrap gap-2">
          {POINT_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePoint(p)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedPoints.includes(p)
                  ? 'border-ink-700 bg-ink-700 text-paper'
                  : 'border-ink-100 text-ink-700 hover:border-ink-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl2 border border-ink-100 bg-surface p-4">
        <textarea
          value={generating && !review ? 'Writing your review…' : generating ? review : review}
          onChange={(e) => setReview(e.target.value)}
          readOnly={generating}
          rows={4}
          placeholder="Your review will appear here…"
          className="w-full resize-none rounded-lg border-none bg-transparent p-0 text-sm text-ink-900 focus:outline-none focus:ring-0 disabled:opacity-60"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-300">
          <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI suggestion — edit freely before posting</span>
          <span>{review.length} chars</span>
        </div>
      </div>

    <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-2">
        {googleReviewUrl ? (
          <Button
            variant="primary"
            size="sm"
            icon={ExternalLink}
            disabled={generating || !review}
            onClick={copyAndPost}
            className="flex h-auto min-h-[48px] w-full flex-wrap items-center justify-center gap-1.5 whitespace-normal px-3 py-2.5 text-center text-[13px] leading-snug sm:min-h-[52px] sm:px-4 sm:text-sm"
          >
            Copy &amp; post to Google
          </Button>
        ) : (
          <p className="flex items-center justify-center rounded-xl bg-ink-50 px-4 py-3 text-center text-sm text-ink-300">
            Google review link hasn't been configured yet.
          </p>
        )}
        <Button
          variant="amber"
          size="sm"
          icon={RefreshCw}
          loading={generating}
          onClick={() => generate(variant + 1)}
          className="flex h-auto min-h-[48px] w-full flex-wrap items-center justify-center gap-1.5 whitespace-normal px-3 py-2.5 text-center text-[13px] leading-snug sm:min-h-[52px] sm:px-4 sm:text-sm"
        >
          Generate new review
        </Button>
      </div>

      <p className="text-center text-xs text-ink-300">
        You choose what to post — nothing is submitted to Google automatically.
      </p>
    </div>
  );
}
