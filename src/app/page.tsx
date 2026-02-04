import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    num: "01",
    title: "Paste Your URL",
    desc: "Enter your website URL and we'll handle the rest. No signup required to get started.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.504a4.5 4.5 0 00-6.364-6.364L4.5 8.257m7.5-1.757l4.5 4.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI Scans Your Site",
    desc: "Our AI analyzes your website, detecting analytics, cookies, payment processors, and third-party integrations.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Download Your Docs",
    desc: "Get production-ready Privacy Policy, Terms of Service, and Cookie Policy — tailored to your site.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Intelligent URL Scanning",
    desc: "Detects Google Analytics, Facebook Pixel, Stripe, cookies, forms, and 50+ integrations automatically.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Generation",
    desc: "Claude AI creates legally-sound documents based on exactly what your website uses. No generic templates.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Always Up-to-Date",
    desc: "Re-scan anytime your site changes. Documents update to reflect new integrations and data practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    title: "Copy & Embed Ready",
    desc: "Download as HTML, copy to clipboard, or embed directly on your website. Works with any platform.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try it out — no credit card needed",
    features: ["1 document", "LegalForge branding", "Basic scanning", "Copy to clipboard"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    desc: "For personal websites and blogs",
    features: ["3 documents per site", "No branding", "Full scanning", "HTML download", "Email support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For businesses and growing sites",
    features: [
      "Unlimited documents",
      "No branding",
      "Full scanning",
      "HTML download",
      "Auto-update on changes",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: "$59",
    period: "/month",
    desc: "For agencies managing multiple clients",
    features: [
      "Unlimited documents",
      "White-label",
      "Full scanning",
      "API access",
      "Auto-updates",
      "Custom branding",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.05),transparent_50%)]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Powered by AI — trusted by 1,000+ websites
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-outfit leading-tight mb-6">
            Legal compliance
            <br />
            <span className="text-gradient">in 60 seconds</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste your website URL and our AI scans it to generate tailored Privacy
            Policies, Terms of Service, and Cookie Policies — based on exactly what
            your site uses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="px-8 py-3.5 rounded-button bg-gradient-accent text-white font-sora font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20"
            >
              Scan Your Website →
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-3.5 rounded-button border border-zinc-700 text-zinc-300 font-sora font-medium text-lg hover:bg-zinc-900 transition-all"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-zinc-500 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              GDPR Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              CCPA Ready
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              No signup required
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit mb-4">
              How it <span className="text-gradient">works</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Three simple steps to full legal compliance. No legal expertise
              required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative p-8 rounded-card border border-zinc-800 bg-zinc-900/50 hover:border-indigo-500/30 transition-all group"
              >
                <div className="text-indigo-400/20 text-6xl font-bold font-outfit absolute top-4 right-6">
                  {step.num}
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold font-outfit mb-3">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit mb-4">
              Built for <span className="text-gradient">modern websites</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Intelligent scanning meets AI generation. Every document is tailored
              to your specific tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-card border border-zinc-800 bg-black/50 hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold font-outfit mb-2">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit mb-4">
              Simple, transparent <span className="text-gradient">pricing</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you&apos;re ready. No surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-card border ${
                  plan.popular
                    ? "border-indigo-500 bg-indigo-500/5 animate-pulse-glow"
                    : "border-zinc-800 bg-zinc-900/50"
                } flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-white text-xs font-semibold font-sora">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold font-outfit mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold font-outfit">{plan.price}</span>
                  <span className="text-zinc-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <svg
                        className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app"
                  className={`block text-center px-4 py-2.5 rounded-button font-sora font-medium text-sm transition-all ${
                    plan.popular
                      ? "bg-gradient-accent text-white hover:opacity-90"
                      : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-card border border-zinc-800 bg-zinc-900/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.08),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold font-outfit mb-4">
                Ready to get <span className="text-gradient">compliant</span>?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of websites using LegalForge. Generate your first
                document in under 60 seconds.
              </p>
              <Link
                href="/app"
                className="inline-block px-8 py-3.5 rounded-button bg-gradient-accent text-white font-sora font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20"
              >
                Scan Your Website Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
