import { Star } from "lucide-react";

export default function DarkTestimonialCard({ review }) {
    return (
      <article
        className="
          group
          relative
          w-[320px]
          shrink-0
          overflow-hidden
          rounded-[1.5rem]
          border
          border-white/10
          bg-white/[0.055]
          p-6
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#5CA9A0]/40
          hover:bg-white/[0.08]
          hover:shadow-[0_25px_70px_rgba(0,0,0,.3)]
          sm:w-[390px]
        "
      >
  
        {/* Card glow */}
  
        <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-32 w-32 rounded-full bg-[#5CA9A0]/10 blur-3xl transition group-hover:bg-[#F5B43C]/10" />
  
  
        {/* =====================================================
            TOP
        ===================================================== */}
  
        <div className="relative flex items-center justify-between">
  
          <div className="flex gap-1">
  
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-[#F5B43C] text-[#F5B43C]"
              />
            ))}
  
          </div>
  
  
          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-[#78928D]">
  
            <span className="h-1.5 w-1.5 rounded-full bg-[#69B99E]" />
  
            Google Review
  
          </div>
  
        </div>
  
  
        {/* =====================================================
            QUOTE
        ===================================================== */}
  
        <div className="relative mt-7">
  
          <div className="absolute -left-1 -top-4 font-serif text-5xl leading-none text-[#F5B43C]/20">
            “
          </div>
  
          <p className="min-h-[120px] pl-2 text-sm leading-6 text-[#C6D5D2]">
            {review.review}
          </p>
  
        </div>
  
  
        {/* =====================================================
            DIVIDER
        ===================================================== */}
  
        <div className="my-5 h-px bg-white/[0.08]" />
  
  
        {/* =====================================================
            USER
        ===================================================== */}
  
        <div className="relative flex items-center justify-between">
  
          <div className="flex items-center gap-3">
  
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#F5B43C]/20 to-[#5CA9A0]/20 text-xs font-bold text-[#E9F0EE]">
              {review.initials}
            </div>
  
  
            <div>
  
              <p className="text-xs font-bold text-[#F4F1E8]">
                {review.name}
              </p>
  
              <p className="mt-1 text-[10px] text-[#78928D]">
                {review.business}
              </p>
  
            </div>
  
          </div>
  
  
          {/* Google badge */}
  
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold text-[#9CB5B0] transition group-hover:border-[#5CA9A0]/30 group-hover:text-[#5CA9A0]">
            G
          </div>
  
        </div>
  
  
        {/* =====================================================
            BOTTOM META
        ===================================================== */}
  
        <div className="mt-5 flex items-center justify-between">
  
          <span className="text-[9px] text-[#58736E]">
            {review.location}
          </span>
  
          <span className="flex items-center gap-1 text-[9px] font-semibold text-[#69B99E]">
  
            <span className="h-1 w-1 rounded-full bg-[#69B99E]" />
  
            Verified experience
  
          </span>
  
        </div>
  
      </article>
    );
  }