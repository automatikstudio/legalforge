"use client";

import Link from "next/link";
import { useState } from "react";
import { Scale, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-button bg-teal flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold font-heading tracking-tight">
              Legal<span className="text-teal">Forge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
            >
              How it works
            </Link>
            <Link
              href="/#features"
              className="text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className="px-5 py-2 rounded-button bg-teal text-white font-heading font-semibold text-sm hover:bg-teal-deep transition-colors duration-150"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-txt-secondary hover:text-txt-primary transition-colors duration-150"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-surface border-b border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/#how-it-works"
              className="block text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/#features"
              className="block text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="block text-txt-secondary hover:text-txt-primary transition-colors duration-150 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className="block w-full text-center px-5 py-2.5 rounded-button bg-teal text-white font-heading font-semibold text-sm hover:bg-teal-deep transition-colors duration-150"
              onClick={() => setMobileOpen(false)}
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
