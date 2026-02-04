"use client";

import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";

const pricingPlans = [
  {
    name: "Free",
    slug: "free",
    price: "$0",
    period: "forever",
    desc: "Try it out — no credit card needed",
    features: [
      "1 document",
      "LegalForge branding",
      "Basic scanning",
      "Copy to clipboard",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Starter",
    slug: "starter",
    price: "$9",
    period: "/month",
    desc: "For personal websites and blogs",
    features: [
      "3 documents per site",
      "No branding",
      "Full scanning",
      "HTML download",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    slug: "pro",
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
    slug: "agency",
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

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");

  const handlePricingClick = useCallback((planSlug: string) => {
    // Track the click
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: planSlug,
        action: "pricing_click",
        page: "/",
      }),
    }).catch(() => {});

    setSelectedPlan(planSlug);
    setModalOpen(true);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-5 rounded-card border flex flex-col ${
              plan.popular
                ? "border-teal bg-teal/5 shadow-teal-glow"
                : "border-border bg-brand-surface hover:border-teal/40 hover:shadow-teal-glow"
            } transition-all duration-200`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-badge bg-teal text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <h3 className="text-base font-semibold font-heading mb-1">
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-1.5">
              <span className="text-3xl font-bold font-heading">
                {plan.price}
              </span>
              <span className="text-txt-muted text-sm">{plan.period}</span>
            </div>
            <p className="text-txt-muted text-xs mb-5">{plan.desc}</p>
            <ul className="space-y-2.5 mb-6 flex-grow">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-txt-secondary"
                >
                  <Check
                    className="w-4 h-4 text-teal mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePricingClick(plan.slug)}
              className={`block w-full text-center px-4 py-2.5 rounded-button font-heading font-semibold text-sm transition-colors duration-150 cursor-pointer ${
                plan.popular
                  ? "bg-teal text-white hover:bg-teal-deep"
                  : "border border-border text-txt-secondary hover:text-txt-primary hover:border-teal/40"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <ComingSoonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        page="/"
      />
    </>
  );
}
