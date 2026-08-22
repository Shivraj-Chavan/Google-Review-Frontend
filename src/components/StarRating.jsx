import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StarRating({ value, onChange, size = 'lg' }) {
  const [hover, setHover] = useState(0);
  const dims = size === 'lg' ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-7 w-7';
  const active = hover || value;

  const labels = ['', 'Not great', 'Could be better', 'It was okay', 'Really good', 'Excellent'];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5 sm:gap-2" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star`}
            // onMouseEnter={() => setHover(n)}
            // onClick={() => onChange(n)}
            className="transition-transform active:scale-90"
            // style={{ transitionDelay: `${(n - 1) * 25}ms` }}
          >
            <Star
              className={`${dims} transition-all duration-200 ${
                n <= active ? 'fill-amber-400 text-amber-400 animate-fillStar' : 'fill-transparent text-ink-100'
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {/* <span className="h-5 text-sm font-medium text-ink-500">{labels[active] || 'Tap a star to rate'}</span> */}
    </div>
  );
}
