"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => setShowHint(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm shadow-slate-200/30">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 shadow-md shadow-teal-500/20">
            <span className="text-sm font-bold text-white">i18n</span>
          </div>
          <div className="min-w-0">
            <span className="text-sm font-bold text-slate-800 truncate block sm:inline">smart-i18n-auto</span>
            <span className="hidden sm:inline ml-1.5 text-xs text-slate-400 font-medium">by Dev Tamakuwala</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Flashy language selector */}
          <div className="relative">
            {/* Animated glow ring */}
            {showHint && (
              <>
                <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 opacity-60 blur-md animate-lang-glow pointer-events-none" />
                <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 opacity-40 animate-lang-spin pointer-events-none" />
              </>
            )}

            {/* Bouncing arrow pointing down */}
            {showHint && (
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center animate-lang-bounce pointer-events-none z-20">
                <span className="whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-lg shadow-teal-500/30">
                  🌍 Switch Language!
                </span>
                <svg className="h-3 w-4 text-teal-600 -mt-0.5" viewBox="0 0 16 8" fill="currentColor">
                  <path d="M8 8L0 0h16z" />
                </svg>
              </div>
            )}

            <div className="pointer-events-none absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-10">
              <svg className={`h-3.5 w-3.5 ${showHint ? "text-white" : "text-teal-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </div>
            <select
              id="language-select"
              value={language}
              onChange={(e) => { setLanguage(e.target.value); dismiss(); }}
              onFocus={dismiss}
              className={`relative z-10 cursor-pointer appearance-none rounded-lg py-2 pl-7 sm:pl-8 pr-7 sm:pr-9 text-[11px] sm:text-xs font-bold outline-none transition-all ${
                showHint
                  ? "border-2 border-teal-400 bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30"
                  : "border-2 border-teal-300 bg-white text-slate-700 hover:border-teal-400 hover:shadow-md hover:shadow-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              }`}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-700 bg-white">
                  {lang.label}
                </option>
              ))}
            </select>
            <svg
              className={`pointer-events-none absolute right-2 sm:right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 z-10 ${showHint ? "text-white" : "text-teal-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>
      </div>
    </nav>
  );
}
