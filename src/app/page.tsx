import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import {
  Link2,
  ScanSearch,
  Download,
  Search,
  Sparkles,
  RefreshCw,
  Code2,
  Shield,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "PASTE YOUR URL",
    desc: "Enter your website URL and we'll handle the rest. No signup required to get started.",
    icon: <Link2 className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "AI SCANS YOUR SITE",
    desc: "Our AI analyzes your website, detecting analytics, cookies, payment processors, and third-party integrations.",
    icon: <ScanSearch className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    num: "03",
    title: "DOWNLOAD YOUR DOCS",
    desc: "Get production-ready Privacy Policy, Terms of Service, and Cookie Policy — tailored to your site.",
    icon: <Download className="w-6 h-6" strokeWidth={1.5} />,
  },
];

const features = [
  {
    title: "Intelligent URL Scanning",
    desc: "Detects Google Analytics, Facebook Pixel, Stripe, cookies, forms, and 50+ integrations automatically.",
    icon: <Search className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    title: "AI-Powered Generation",
    desc: "Claude AI creates legally-sound documents based on exactly what your website uses. No generic templates.",
    icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    title: "Always Up-to-Date",
    desc: "Re-scan anytime your site changes. Documents update to reflect new integrations and data practices.",
    icon: <RefreshCw className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    title: "Copy & Embed Ready",
    desc: "Download as HTML, copy to clipboard, or embed directly on your website. Works with any platform.",
    icon: <Code2 className="w-5 h-5" strokeWidth={1.5} />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid">
        {/* Scan line sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent animate-scan-line" />
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Trust signal */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-badge border border-border bg-brand-surface/50 text-txt-secondary text-xs font-mono mb-8">
            <Shield className="w-3.5 h-3.5 text-teal" strokeWidth={1.5} />
            Trusted by 1,000+ websites
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-bold font-heading leading-[1.1] tracking-tight-h1 mb-5">
            Legal compliance
            <br />
            <span className="text-teal">in 60 seconds</span>
          </h1>

          <p className="text-lg text-txt-secondary max-w-xl mx-auto mb-10 leading-relaxed">
            Paste your URL. Get your legal docs.
          </p>

          {/* URL Input */}
          <div className="max-w-xl mx-auto mb-6">
            <Link href="/app" className="group block">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-txt-muted font-mono text-sm">https://</span>
                  </div>
                  <div className="w-full pl-[76px] pr-4 py-3.5 rounded-card bg-brand-surface border border-border text-txt-muted font-mono text-sm cursor-pointer group-hover:border-teal/40 group-hover:shadow-teal-glow transition-all duration-200">
                    yourwebsite.com
                  </div>
                </div>
                <div className="px-6 py-3.5 rounded-button bg-teal text-white font-heading font-semibold text-sm group-hover:bg-teal-deep transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap">
                  Scan
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {["GDPR", "CCPA", "No signup"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-badge border border-border text-txt-muted text-xs font-mono uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mb-4">
              How it <span className="text-teal">works</span>
            </h2>
            <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
              Three simple steps to full legal compliance. No legal expertise
              required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-px bg-border" />

            {steps.map((step) => (
              <div
                key={step.num}
                className="relative p-6 rounded-card border border-border bg-brand-surface hover:border-teal/40 hover:shadow-teal-glow transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-card bg-brand-dark border border-border flex items-center justify-center text-teal group-hover:border-teal/40 transition-colors duration-200">
                    {step.icon}
                  </div>
                  <span className="text-txt-muted/20 text-4xl font-bold font-heading">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xs font-semibold font-heading text-teal-soft uppercase tracking-widest mb-2">
                  {step.title}
                </h3>
                <p className="text-txt-secondary text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mb-4">
              Built for <span className="text-teal">modern websites</span>
            </h2>
            <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
              Intelligent scanning meets AI generation. Every document is tailored
              to your specific tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-5 rounded-card border border-border bg-brand-dark hover:border-teal/40 hover:shadow-teal-glow transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-button bg-brand-surface border border-border flex items-center justify-center text-teal mb-4 group-hover:border-teal/40 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold font-heading mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-txt-secondary text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mb-4">
              Simple, transparent <span className="text-teal">pricing</span>
            </h2>
            <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you&apos;re ready. No surprises.
            </p>
          </div>

          <PricingSection />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 sm:p-12 rounded-card border border-border bg-brand-gradient relative overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mb-4">
                Ready to get <span className="text-teal-soft">compliant</span>?
              </h2>
              <p className="text-txt-secondary text-lg mb-8 max-w-xl mx-auto">
                Join thousands of websites using LegalForge. Generate your first
                document in under 60 seconds.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-button bg-teal text-white font-heading font-semibold text-base hover:bg-teal-deep transition-colors duration-150"
              >
                Scan Your Website Now
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
