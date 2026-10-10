import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Shield, ChevronRight, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "google-api-services", title: "3. Google API Services" },
  { id: "how-we-use-information", title: "4. How We Use Information" },
  { id: "automated-responses", title: "5. Automated Review Responses" },
  { id: "data-sharing", title: "6. Data Sharing" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "security", title: "8. Security" },
  { id: "google-disconnection", title: "9. Google Account Disconnection" },
  { id: "cookies", title: "10. Cookies" },
  { id: "your-rights", title: "11. Your Rights" },
  { id: "childrens-privacy", title: "12. Children's Privacy" },
  { id: "changes", title: "13. Changes to This Privacy Policy" },
  { id: "contact", title: "14. Contact Us" },
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

const PrivacyPolicy = () => {
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
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
      <div className="border-b border-slate-200/70 px-5 py-14 sm:px-8 text-center">
        <div className="mx-auto max-w-8xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            <Shield className="h-3.5 w-3.5" />
            Your data, handled responsibly
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
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
            <Section id="introduction" title="1. Introduction">
              <p>
                Welcome to ReviewPilot ("ReviewPilot", "we", "us", or "our").
                ReviewPilot is a software platform that helps businesses manage
                their online customer reviews and improve their review
                management workflow.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store,
                disclose, and protect information when you use our website,
                application, and services.
              </p>
            </Section>

            <Section id="information-we-collect" title="2. Information We Collect">
              <div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Account Information
                </h3>
                <p>
                  We may collect information such as your name, email address,
                  business name, phone number, account credentials, and other
                  information you provide when creating or using an account.
                </p>
              </div>

              <div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Business Information
                </h3>
                <p>
                  Depending on the services you use, we may process business
                  information such as business name, location, Google Business
                  Profile information, review information, ratings, review dates,
                  and related business metadata.
                </p>
              </div>

              <div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Google Account and API Information
                </h3>
                <p>
                  If you connect your Google Business Profile through Google APIs,
                  ReviewPilot may receive information authorized by you through
                  Google's authorization process. This may include information
                  necessary to identify your authorized business profile and
                  retrieve, manage, or respond to reviews on your behalf.
                </p>
                <p className="mt-3">
                  We only request access to Google data and permissions that are
                  necessary for the functionality you choose to use.
                </p>
              </div>
            </Section>

            <Section id="google-api-services" title="3. Google API Services">
              <p>
                ReviewPilot uses Google APIs to provide features related to
                Google Business Profile and customer review management.
              </p>
              <p>
                When you connect your Google account, you authorize ReviewPilot
                to access the applicable Google data and perform the actions
                permitted by the scopes you approve.
              </p>
              <p>
                Google user data obtained through Google APIs is used only to
                provide, maintain, and improve the features of ReviewPilot that
                require such access.
              </p>
              <p>
                We do not sell Google user data or use Google user data for
                advertising purposes.
              </p>
              <p>
                ReviewPilot's use and transfer of information received from
                Google APIs will comply with applicable Google API Services User
                Data Policy requirements.
              </p>
            </Section>

            <Section id="how-we-use-information" title="4. How We Use Information">
              <p>We may use collected information to:</p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-amber-500">
                <li>Provide and operate ReviewPilot.</li>
                <li>Connect and manage authorized Google Business Profiles.</li>
                <li>Retrieve and display customer review information.</li>
                <li>
                  Generate or assist with responses to customer reviews when
                  enabled by the business.
                </li>
                <li>Publish review responses when explicitly authorized.</li>
                <li>Provide analytics and reporting.</li>
                <li>Maintain account security.</li>
                <li>Prevent fraud, abuse, and unauthorized access.</li>
                <li>Improve the reliability and performance of our services.</li>
                <li>Provide customer support.</li>
              </ul>
            </Section>

            <Section id="automated-responses" title="5. Automated Review Responses">
              <p>
                ReviewPilot may provide automated or AI-assisted responses to
                customer reviews. Depending on the settings selected by the
                business, responses may be generated, reviewed, edited, or
                automatically published through authorized integrations.
              </p>
              <p>
                Businesses are responsible for configuring automated responses
                appropriately and ensuring that responses comply with applicable
                laws, platform rules, and their own business policies.
              </p>
            </Section>

            <Section id="data-sharing" title="6. Data Sharing">
              <p>We do not sell or rent your personal information.</p>
              <p>
                We may share information with trusted service providers that
                help us operate our platform, such as cloud hosting, database,
                authentication, analytics, security, and AI service providers.
              </p>
              <p>
                Such providers are permitted to process information only as
                necessary to provide services to us and are expected to maintain
                appropriate security safeguards.
              </p>
              <p>
                We may also disclose information where required by law, legal
                process, governmental request, or to protect our rights,
                property, users, or the security of our services.
              </p>
            </Section>

            <Section id="data-retention" title="7. Data Retention">
              <p>
                We retain information only for as long as reasonably necessary
                to provide our services, comply with legal obligations, resolve
                disputes, enforce agreements, and maintain legitimate business
                records.
              </p>
              <p>
                When you disconnect a Google account or delete your ReviewPilot
                account, we will take reasonable steps to remove or deauthorize
                associated data in accordance with our retention requirements.
              </p>
            </Section>

            <Section id="security" title="8. Security">
              <p>
                We use reasonable technical and organizational safeguards to
                protect information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
              <p>
                However, no internet-based service can guarantee absolute
                security.
              </p>
            </Section>

            <Section id="google-disconnection" title="9. Google Account Disconnection">
              <p>
                You may disconnect your Google Business Profile integration from
                ReviewPilot through the available account settings or by
                contacting us.
              </p>
              <p>
                Disconnecting Google access may prevent certain ReviewPilot
                features from functioning.
              </p>
            </Section>

            <Section id="cookies" title="10. Cookies">
              <p>
                ReviewPilot may use cookies and similar technologies to maintain
                sessions, remember preferences, improve functionality, analyze
                usage, and protect the security of the platform.
              </p>
            </Section>

            <Section id="your-rights" title="11. Your Rights">
              <p>
                Depending on your location and applicable law, you may have
                rights to access, correct, delete, restrict, or object to certain
                processing of your personal information.
              </p>
              <p>
                To exercise applicable rights, contact us using the information
                below.
              </p>
            </Section>

            <Section id="childrens-privacy" title="12. Children's Privacy">
              <p>
                ReviewPilot is intended for businesses and is not directed toward
                children under the age required by applicable law. We do not
                knowingly collect personal information from children.
              </p>
            </Section>

            <Section id="changes" title="13. Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated "Last Updated" date.
              </p>
            </Section>

            <section id="contact" className="scroll-mt-28 rounded-2xl border border-amber-100 bg-amber-50/60 p-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                14. Contact Us
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                If you have questions about this Privacy Policy or our data
                practices, contact us:
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

export default PrivacyPolicy;