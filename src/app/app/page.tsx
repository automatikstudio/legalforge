"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ScanResult, Detection } from "@/lib/detector";

type DocType = "privacy" | "terms" | "cookie";

interface GeneratedDoc {
  document: string;
  documentType: DocType;
}

const DOC_LABELS: Record<DocType, { label: string; icon: JSX.Element }> = {
  privacy: {
    label: "Privacy Policy",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  terms: {
    label: "Terms of Service",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  cookie: {
    label: "Cookie Policy",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
      </svg>
    ),
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

    // Animate scan steps
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

      // Auto-generate privacy policy
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
    a { color: #4338ca; }
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
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-outfit mb-3">
              Generate Legal <span className="text-gradient">Documents</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Enter your website URL below and we&apos;ll scan it to generate
              tailored legal documents.
            </p>
          </div>

          {/* URL Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  placeholder="https://yourwebsite.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-card bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-outfit"
                  disabled={scanning}
                />
              </div>
              <button
                onClick={handleScan}
                disabled={scanning || !url.trim()}
                className="px-8 py-3.5 rounded-button bg-gradient-accent text-white font-sora font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {scanning ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Scanning...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    Scan &amp; Generate
                  </>
                )}
              </button>
            </div>

            {/* Scanning progress */}
            {scanning && (
              <div className="mt-6 p-4 rounded-card bg-zinc-900/50 border border-zinc-800">
                <div className="space-y-2">
                  {SCAN_STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                        i <= scanStep ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      {i < scanStep ? (
                        <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      ) : i === scanStep ? (
                        <svg className="w-4 h-4 text-indigo-400 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-600 shrink-0" />
                      )}
                      <span className={i <= scanStep ? "text-zinc-300" : "text-zinc-600"}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 rounded-card bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Results */}
          {scanResult && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
              {/* Sidebar - Detections */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24 p-5 rounded-card border border-zinc-800 bg-zinc-900/50">
                  <h3 className="font-semibold font-outfit text-lg mb-1">
                    Detected on your site
                  </h3>
                  <p className="text-zinc-500 text-xs mb-4">
                    {scanResult.detections.length} integration{scanResult.detections.length !== 1 ? "s" : ""} found
                  </p>

                  {scanResult.detections.length === 0 ? (
                    <p className="text-zinc-500 text-sm">
                      No integrations detected. The site may use server-side
                      tracking or have limited client-side scripts.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(scanResult.categories).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                            {category}
                          </h4>
                          <ul className="space-y-1.5">
                            {items.map((item: Detection) => (
                              <li
                                key={item.name}
                                className="flex items-start gap-2 text-sm"
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <div>
                                  <span className="text-zinc-200">{item.name}</span>
                                  <p className="text-zinc-500 text-xs mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
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
                      className={`flex items-center gap-2 px-4 py-2 rounded-button text-sm font-sora font-medium transition-all ${
                        activeTab === type
                          ? "bg-gradient-accent text-white"
                          : "bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                      } disabled:opacity-50`}
                    >
                      {DOC_LABELS[type].icon}
                      {DOC_LABELS[type].label}
                      {documents[type] && (
                        <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* Document content */}
                <div className="rounded-card border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  {/* Actions bar */}
                  {documents[activeTab] && (
                    <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900">
                      <span className="text-sm text-zinc-400">
                        {DOC_LABELS[activeTab].label} for{" "}
                        <span className="text-white">{scanResult.siteName}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-sora border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                        >
                          {copied ? (
                            <>
                              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                              </svg>
                              Copy HTML
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-sora bg-gradient-accent text-white hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download HTML
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Document body */}
                  <div className="p-6 sm:p-8 min-h-[400px]">
                    {generating && generatingType === activeTab ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-2 border-zinc-700 border-t-indigo-400 animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-zinc-400 mt-6 font-outfit">
                          Generating {DOC_LABELS[activeTab].label}...
                        </p>
                        <p className="text-zinc-600 text-sm mt-2">
                          AI is crafting a document tailored to your website
                        </p>
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
                        <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
                          {DOC_LABELS[activeTab].icon}
                        </div>
                        <p className="text-zinc-400">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-outfit mb-2 text-zinc-300">
                Enter a website URL to get started
              </h3>
              <p className="text-zinc-500 max-w-md mx-auto">
                We&apos;ll scan your website and detect all the integrations,
                cookies, and third-party services to generate tailored legal
                documents.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
