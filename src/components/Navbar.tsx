"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold font-outfit">
              Legal<span className="text-gradient">Forge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Privacy
            </Link>
            <Link
              href="/app"
              className="px-5 py-2 rounded-button bg-gradient-accent text-white font-sora font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/#features"
              className="block text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="block text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="block text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Privacy
            </Link>
            <Link
              href="/app"
              className="block w-full text-center px-5 py-2 rounded-button bg-gradient-accent text-white font-sora font-medium hover:opacity-90 transition-opacity"
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
