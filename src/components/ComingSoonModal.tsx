"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Lock, ArrowRight, Check, Loader2 } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  page: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  plan,
  page,
}: ComingSoonModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setSubmitted(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || submitting) return;

      setSubmitting(true);
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan,
            page,
            action: "email_capture",
            meta: { email: email.trim() },
          }),
        });
      } catch {
        // silent
      }
      setSubmitting(false);
      setSubmitted(true);
    },
    [email, plan, page, submitting]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-[8px] border border-border bg-brand-dark shadow-2xl overflow-hidden animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-txt-muted hover:text-txt-primary transition-colors z-10"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-6 rounded-[8px] bg-teal/10 border border-teal/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-teal" strokeWidth={1.5} />
          </div>

          {!submitted ? (
            <>
              <h3 className="text-xl font-bold font-heading tracking-tight mb-2">
                Launching Soon
              </h3>
              <p className="text-txt-secondary text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                We&apos;re putting the finishing touches on LegalForge. Enter
                your email for early access.
              </p>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-[8px] bg-brand-surface border border-border text-txt-primary placeholder-txt-muted text-sm font-mono focus:border-teal focus:outline-none focus:shadow-teal-glow transition-all duration-200"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={submitting || !email.trim()}
                  className="w-full px-4 py-3 rounded-[8px] bg-teal text-white font-heading font-semibold text-sm hover:bg-teal-deep transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        strokeWidth={2}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Early Access
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-teal" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold font-heading tracking-tight mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-txt-secondary text-sm leading-relaxed mb-6">
                We&apos;ll notify you as soon as LegalForge is ready. Stay tuned!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-[8px] border border-border text-txt-secondary text-sm font-heading font-medium hover:text-txt-primary hover:border-teal/40 transition-all duration-150"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
