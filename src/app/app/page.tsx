"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ScanResult, Detection } from "@/lib/detector";
import {
  Shield,
  FileText,
  Cookie,
  Copy,
  Download,
  Check,
  Globe,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ScanLine,
  Sparkles,
} from "lucide-react";

type DocType = "privacy" | "terms" | "cookie";

interface GeneratedDoc {
  document: string;
  documentType: DocType;
}

const DOC_LABELS: Record<DocType, { label: string; icon: React.ReactNode }> = {
  privacy: {
    label: "Privacy Policy",
    icon: <Shield className="w-4 h-4" strokeWidth={1.5} />,
  },
  terms: {
    label: "Terms of Service",
    icon: <FileText className="w-4 h-4" strokeWidth={1.5} />,
  },
  cookie: {
    label: "Cookie Policy",
    icon: <Cookie className="w-4 h-4" strokeWidth={1.5} />,
  },
};

const SCAN_STEPS = [
  "Connecting to website...",
  "Downloading page content...",
  "Analyzing HTML structure...",
  "Detecting analytics & tracking...",
  "Scanning for payment processors...",
  "Identifying third-party services...",
  "Checking cookie usage...",
  "Compiling results...",
];

export default function AppPage() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<DocType | null>(null);
  const [documents, setDocuments] = useState<Record<string, GeneratedDoc>>({});
  const [activeTab, setActiveTab] = useState<DocType>("privacy");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = useCallback(async () => {
    if (!url.trim()) return;

    setError(null);
    setScanning(true);
    setScanResult(null);
    setDocuments({});
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < SCAN_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to scan website");
      }

      clearInterval(interval);
      setScanStep(SCAN_STEPS.length - 1);
      setScanResult(data);

      await generateDocument(data, "privacy");
    } catch (err: unknown) {
      clearInterval(interval);
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
    } finally {
      setScanning(false);
    }
  }, [url]);

  const generateDocument = async (scan: ScanResult, docType: DocType) => {
    if (documents[docType]) {
      setActiveTab(docType);
      return;
    }

    setGenerating(true);
    setGeneratingType(docType);
    setActiveTab(docType);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanResult: scan, documentType: docType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate document");
      }

      setDocuments((prev) => ({
        ...prev,
        [docType]: data,
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
    } finally {
      setGenerating(false);
      setGeneratingType(null);
    }
  };

  const handleCopy = () => {
    const doc = documents[activeTab];
    if (!doc) return;
    navigator.clipboard.writeText(doc.document);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const doc = documents[activeTab];
    if (!doc) return;

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${DOC_LABELS[activeTab].label} — ${scanResult?.siteName || "Website"}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 22px; margin-top: 32px; color: #111; }
    h3 { font-size: 18px; margin-top: 24px; }
    p { margin-bottom: 16px; }
    ul, ol { margin-bottom: 16px; padding-left: 24px; }
    li { margin-bottom: 8px; }
    a { color: #0D9488; }
    table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>${DOC_LABELS[activeTab].label}</h1>
  ${doc.document}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${activeTab}-policy-${scanResult?.siteName || "website"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <main className="min-h-screen bg-brand-dark bg-grid">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mb-3">
              Generate Legal <span className="text-teal">Documents</span>
            </h1>
            <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
              Enter your website URL below and we&apos;ll scan it to generate
              tailored legal documents.
            </p>
          </div>

          {/* URL Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-4 h-4 text-txt-muted" strokeWidth={1.5} />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  placeholder="https://yourwebsite.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-card bg-brand-surface border border-border text-txt-primary placeholder-txt-muted font-mono text-sm focus:border-teal focus:shadow-teal-glow transition-all duration-200"
                  disabled={scanning}
                />
              </div>
              <button
                onClick={handleScan}
                disabled={scanning || !url.trim()}
                className="px-6 py-3.5 rounded-button bg-teal text-white font-heading font-semibold text-sm hover:bg-teal-deep transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                    Scanning...
                  </>
                ) : (
                  <>
                    Scan
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>

            {/* Scanning progress — terminal style */}
            {scanning && (
              <div className="mt-6 rounded-card border border-border bg-brand-surface overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-brand-dark/50">
                  <ScanLine className="w-3.5 h-3.5 text-teal animate-pulse" strokeWidth={1.5} />
                  <span className="text-xs font-mono text-txt-muted">Scanning {url}</span>
                </div>
                {/* Scan steps */}
                <div className="p-4 relative">
                  {/* Sweep line */}
                  <div className="absolute left-0 right-0 h-6 bg-gradient-to-b from-teal/5 to-transparent animate-scan-line pointer-events-none" />
                  <div className="space-y-1.5 stagger-children">
                    {SCAN_STEPS.map((step, i) => (
                      <div
                        key={step}
                        className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-200 ${
                          i <= scanStep ? "opacity-100" : "opacity-20"
                        }`}
                      >
                        {i < scanStep ? (
                          <span className="text-status-green">✓</span>
                        ) : i === scanStep ? (
                          <Loader2 className="w-3 h-3 text-teal animate-spin" strokeWidth={2} />
                        ) : (
                          <span className="text-txt-muted">·</span>
                        )}
                        <span className={i <= scanStep ? "text-txt-secondary" : "text-txt-muted"}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 rounded-card bg-status-rose/5 border border-status-rose/20 text-status-rose text-sm flex items-start gap-3 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Results */}
          {scanResult && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 animate-fade-in">
              {/* Sidebar - Detections */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24 rounded-card border border-border bg-brand-surface overflow-hidden">
                  {/* Detection header */}
                  <div className="px-4 py-3 border-b border-border bg-brand-dark/50">
                    <h3 className="font-heading font-semibold text-sm">
                      Detected on your site
                    </h3>
                    <p className="text-txt-muted text-xs font-mono mt-0.5">
                      {scanResult.detections.length} integration{scanResult.detections.length !== 1 ? "s" : ""} found
                    </p>
                  </div>

                  <div className="p-4">
                    {scanResult.detections.length === 0 ? (
                      <p className="text-txt-muted text-xs font-mono">
                        No integrations detected. The site may use server-side
                        tracking or have limited client-side scripts.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {Object.entries(scanResult.categories).map(
                          ([category, items]) => (
                            <div key={category}>
                              <h4 className="text-[10px] font-heading font-semibold text-teal uppercase tracking-widest mb-2">
                                {category}
                              </h4>
                              <ul className="space-y-1.5">
                                {items.map((item: Detection) => (
                                  <li
                                    key={item.name}
                                    className="flex items-start gap-2 text-xs font-mono"
                                  >
                                    <CheckCircle2
                                      className="w-3.5 h-3.5 text-status-green mt-0.5 shrink-0"
                                      strokeWidth={1.5}
                                    />
                                    <div>
                                      <span className="text-txt-primary">
                                        {item.name}
                                      </span>
                                      <p className="text-txt-muted text-[11px] mt-0.5">
                                        {item.description}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main content - Document */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(["privacy", "terms", "cookie"] as DocType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        if (scanResult) {
                          generateDocument(scanResult, type);
                        }
                      }}
                      disabled={generating}
                      className={`flex items-center gap-2 px-4 py-2 rounded-button text-xs font-heading font-semibold transition-all duration-150 ${
                        activeTab === type
                          ? "bg-teal text-white"
                          : "bg-brand-surface border border-border text-txt-secondary hover:text-txt-primary hover:border-teal/40"
                      } disabled:opacity-40`}
                    >
                      {DOC_LABELS[type].icon}
                      {DOC_LABELS[type].label}
                      {documents[type] && (
                        <Check className="w-3 h-3 text-status-green" strokeWidth={2.5} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Document content */}
                <div className="rounded-card border border-border bg-brand-surface overflow-hidden">
                  {/* Toolbar */}
                  {documents[activeTab] && (
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-brand-dark/50">
                      <span className="text-xs font-mono text-txt-muted">
                        {DOC_LABELS[activeTab].label} —{" "}
                        <span className="text-txt-secondary">
                          {scanResult.siteName}
                        </span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-heading font-medium border border-border text-txt-secondary hover:text-txt-primary hover:border-teal/40 transition-all duration-150"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-status-green" strokeWidth={2} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" strokeWidth={1.5} />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-heading font-medium bg-teal text-white hover:bg-teal-deep transition-colors duration-150"
                        >
                          <Download className="w-3 h-3" strokeWidth={1.5} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Document body */}
                  <div className="p-6 sm:p-8 min-h-[400px]">
                    {generating && generatingType === activeTab ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-card border border-border flex items-center justify-center bg-brand-dark">
                            <Sparkles className="w-5 h-5 text-teal animate-pulse" strokeWidth={1.5} />
                          </div>
                        </div>
                        <p className="text-txt-secondary mt-6 font-heading font-medium text-sm">
                          Generating {DOC_LABELS[activeTab].label}...
                        </p>
                        <p className="text-txt-muted text-xs font-mono mt-2">
                          AI is crafting a document tailored to your website
                        </p>
                        <div className="mt-4 w-48 h-1 rounded-full bg-brand-dark overflow-hidden">
                          <div className="h-full w-full animate-shimmer rounded-full bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
                        </div>
                      </div>
                    ) : documents[activeTab] ? (
                      <div
                        className="prose-legal"
                        dangerouslySetInnerHTML={{
                          __html: documents[activeTab].document,
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-14 h-14 rounded-card bg-brand-dark border border-border flex items-center justify-center mb-4">
                          {DOC_LABELS[activeTab].icon}
                        </div>
                        <p className="text-txt-secondary text-sm font-heading">
                          Click the tab to generate this document
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!scanResult && !scanning && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-card bg-brand-surface border border-border flex items-center justify-center">
                <Globe className="w-7 h-7 text-txt-muted" strokeWidth={1} />
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2 text-txt-secondary">
                Enter a website URL to get started
              </h3>
              <p className="text-txt-muted max-w-md mx-auto text-sm">
                We&apos;ll scan your website and detect all the integrations,
                cookies, and third-party services to generate tailored legal
                documents.
              </p>

              {/* Example detection output */}
              <div className="mt-10 max-w-sm mx-auto rounded-card border border-border bg-brand-surface overflow-hidden text-left">
                <div className="px-4 py-2.5 border-b border-border bg-brand-dark/50">
                  <span className="text-[10px] font-mono text-txt-muted uppercase tracking-wider">
                    Example scan output
                  </span>
                </div>
                <div className="p-4 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-status-green">✓</span>
                    <span className="text-txt-secondary">
                      Google Analytics detected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-status-green">✓</span>
                    <span className="text-txt-secondary">
                      Stripe payments detected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-status-amber" strokeWidth={1.5} />
                    <span className="text-status-amber">
                      No cookie consent found
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-status-rose" strokeWidth={1.5} />
                    <span className="text-status-rose">
                      Missing privacy policy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
