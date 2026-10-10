import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, FileText, ChevronRight, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "description", title: "2. Description of Service" },
  { id: "registration", title: "3. Account Registration" },
  { id: "google-integration", title: "4. Google Business Profile Integration" },
  { id: "automated-replies", title: "5. Automated Review Replies" },
  { id: "acceptable-use", title: "6. Acceptable Use" },
  { id: "user-content", title: "7. User Content" },
  { id: "intellectual-property", title: "8. Intellectual Property" },
  { id: "third-party", title: "9. Third-Party Services" },
  { id: "availability", title: "10. Service Availability" },
  { id: "disclaimer", title: "11. Disclaimer" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "termination", title: "13. Suspension and Termination" },
  { id: "changes", title: "14. Changes to These Terms" },
  { id: "governing-law", title: "15. Governing Law" },
  { id: "contact", title: "16. Contact Us" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-[15px] leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

const TermsOfService = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200/70 bg-[#f5f2e9]/90 px-5 py-6 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950 to-amber-500 shadow-lg shadow-emerald-950/25">
              <Star className="h-5 w-5 fill-white text-white" />
            </div>
            <div>
              <p className="font-display text-base font-bold tracking-tight text-slate-950">
                Google ReviewPilot
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Reputation made simple
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200/70 px-5 py-10 sm:px-8 text-center">
        <div className="mx-auto max-w-8xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            <FileText className="h-3.5 w-3.5" />
            The rules of using ReviewPilot
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last Updated: September 26, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-8xl px-5 py-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Sticky TOC */}
          <nav className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                On this page
              </p>
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`flex w-full items-center gap-1.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                        activeId === s.id
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <ChevronRight
                        className={`h-3 w-3 shrink-0 transition-transform ${
                          activeId === s.id ? "translate-x-0.5 text-amber-500" : "text-slate-300"
                        }`}
                      />
                      <span className="truncate">{s.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="min-w-0 space-y-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>
                These Terms of Service ("Terms") govern your access to and use of
                ReviewPilot ("ReviewPilot", "we", "us", or "our"), including our
                website, application, integrations, and related services.
              </p>
              <p>
                By creating an account, accessing, or using ReviewPilot, you
                agree to be bound by these Terms. If you do not agree with these
                Terms, you should not use the service.
              </p>
            </Section>

            <Section id="description" title="2. Description of Service">
              <p>
                ReviewPilot is a business software platform designed to help
                businesses manage customer reviews and related review
                communication workflows.
              </p>
              <p>
                Features may include review monitoring, review analytics,
                AI-assisted response generation, automated review responses,
                business profile integrations, and other tools introduced from
                time to time.
              </p>
            </Section>

            <Section id="registration" title="3. Account Registration">
              <p>
                You are responsible for providing accurate information and
                maintaining the security of your account.
              </p>
              <p>
                You are responsible for all activities performed through your
                account and must notify us promptly if you believe your account
                has been accessed without authorization.
              </p>
            </Section>

            <Section id="google-integration" title="4. Google Business Profile Integration">
              <p>
                ReviewPilot may integrate with Google services, including Google
                Business Profile APIs, to provide review management features.
              </p>
              <p>
                By connecting a Google account, you authorize ReviewPilot to
                access and perform actions permitted by the Google permissions
                and scopes that you approve.
              </p>
              <p>
                You must have the appropriate rights and authorization to connect
                and manage the Google Business Profile associated with your
                account.
              </p>
              <p>
                Your use of Google services remains subject to Google's applicable
                terms, policies, and requirements.
              </p>
            </Section>

            <Section id="automated-replies" title="5. Automated Review Replies">
              <p>
                ReviewPilot may provide AI-generated or automated replies to
                customer reviews.
              </p>
              <p>
                If you enable automatic publishing, you authorize ReviewPilot to
                publish generated responses through your connected Google
                Business Profile, subject to the permissions granted by you.
              </p>
              <p>
                You are responsible for reviewing your automation settings and
                ensuring that automated responses are appropriate for your
                business.
              </p>
              <p>
                AI-generated responses may contain errors, inaccuracies, or
                inappropriate suggestions. ReviewPilot does not guarantee that
                every generated response will be accurate, complete, or suitable
                for every situation.
              </p>
            </Section>

            <Section id="acceptable-use" title="6. Acceptable Use">
              <p>You agree not to use ReviewPilot to:</p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-amber-500">
                <li>Violate applicable laws or regulations.</li>
                <li>Violate Google's policies or platform requirements.</li>
                <li>Access accounts or data without authorization.</li>
                <li>Submit misleading, fraudulent, or deceptive content.</li>
                <li>Attempt to interfere with or disrupt the service.</li>
                <li>Reverse engineer or abuse the platform.</li>
                <li>Use the service for unlawful or harmful activities.</li>
              </ul>
            </Section>

            <Section id="user-content" title="7. User Content">
              <p>
                You retain ownership of content and information that you provide
                to ReviewPilot.
              </p>
              <p>
                You grant ReviewPilot the limited rights necessary to host,
                process, analyze, display, and transmit that content solely for
                providing the services you request.
              </p>
              <p>
                You are responsible for ensuring that you have the necessary
                rights and permissions to provide such content to us.
              </p>
            </Section>

            <Section id="intellectual-property" title="8. Intellectual Property">
              <p>
                ReviewPilot and its software, branding, designs, interfaces,
                documentation, and underlying technology are owned by or licensed
                to us and are protected by applicable intellectual property laws.
              </p>
              <p>
                Except as expressly permitted under these Terms, you may not
                copy, modify, distribute, sell, sublicense, or reverse engineer
                any part of the service.
              </p>
            </Section>

            <Section id="third-party" title="9. Third-Party Services">
              <p>
                ReviewPilot may depend on third-party services, including Google
                APIs, cloud infrastructure, authentication providers, AI
                services, and other integrations.
              </p>
              <p>
                Third-party services may have their own terms and privacy
                policies. ReviewPilot is not responsible for third-party
                services outside our control.
              </p>
            </Section>

            <Section id="availability" title="10. Service Availability">
              <p>
                We aim to keep ReviewPilot available and reliable, but we do not
                guarantee uninterrupted or error-free service.
              </p>
              <p>
                Service availability may be affected by maintenance, technical
                issues, third-party service outages, API limitations, network
                problems, or circumstances outside our reasonable control.
              </p>
            </Section>

            <Section id="disclaimer" title="11. Disclaimer">
              <p>
                ReviewPilot is provided on an "as is" and "as available" basis to
                the extent permitted by applicable law.
              </p>
              <p>
                We do not guarantee that automated or AI-generated review
                responses will always be accurate, appropriate, complete, or
                accepted by third-party platforms.
              </p>
            </Section>

            <Section id="liability" title="12. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, ReviewPilot
                and its owners, employees, affiliates, and service providers
                will not be liable for indirect, incidental, special,
                consequential, or business losses arising from your use of the
                service.
              </p>
            </Section>

            <Section id="termination" title="13. Suspension and Termination">
              <p>
                We may suspend or terminate access to ReviewPilot if you violate
                these Terms, misuse the service, create security risks, or use
                the platform in a manner that may expose us or others to legal or
                operational risk.
              </p>
              <p>
                You may stop using ReviewPilot and disconnect your integrations
                at any time.
              </p>
            </Section>

            <Section id="changes" title="14. Changes to These Terms">
              <p>
                We may update these Terms from time to time. Updated Terms will
                be published on this page with a revised "Last Updated" date.
              </p>
              <p>
                Continued use of ReviewPilot after changes become effective
                constitutes acceptance of the updated Terms to the extent
                permitted by applicable law.
              </p>
            </Section>

            <Section id="governing-law" title="15. Governing Law">
              <p>
                These Terms will be governed by the applicable laws of India,
                without regard to conflict-of-law principles, unless otherwise
                required by applicable law.
              </p>
            </Section>

            <section id="contact" className="scroll-mt-28 rounded-2xl border border-amber-100 bg-amber-50/60 p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                16. Contact Us
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                If you have questions regarding these Terms, contact us:
              </p>
              <div className="mt-4 space-y-1.5 text-[15px] text-slate-700">
              <p>
              <strong className="font-semibold text-slate-900">Company:</strong>{" "}
              <a
                href="https://vortexwebtechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Vortex Web Technologies
              </a>
            </p>
            <p>
              <strong className="font-semibold text-slate-900">Email:</strong>{" "}
              <a
                href="mailto:info@vortexwebtechnologies.com"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                info@vortexwebtechnologies.com
              </a>
            </p>
                <p>
                  <strong className="font-semibold text-slate-900">Website:</strong>{" "}
                  <a
                    href="https://reviewpilot.vortexwebtechnologies.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    reviewpilot.vortexwebtechnologies.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;