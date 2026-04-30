"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { getBlogs, type Blog } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBlogs()
      .then(setBlogs)
      .catch(() => setError("Failed to load blogs. Is the API running?"))
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white to-slate-50/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(20,184,166,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(16,185,129,0.04),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-700 mb-4">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Auto i18n for Spring Boot
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
            i18n Demo{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-500 leading-relaxed sm:text-base md:text-lg">
            Switch languages above to see auto-translated content powered by{" "}
            <span className="font-semibold text-teal-600">smart-i18n-auto</span>.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="https://central.sonatype.com/artifact/in.devtamakuwala/smart-i18n-auto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-teal-300 hover:shadow-md hover:text-teal-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
              </svg>
              Maven Central
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://mvnrepository.com/artifact/in.devtamakuwala/smart-i18n-auto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-teal-300 hover:shadow-md hover:text-teal-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 7l-8-4-8 4v10l8 4 8-4V7zm-8 11l-6-3V9l6 3v6zm1-7.5L7 7.5 12 5l5.5 2.5L12 10.5zM19 15l-6 3v-6l6-3v6z" />
              </svg>
              MVN Repository
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://devtamakuwala.in/documentation/smarti18nauto/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-doc-animated inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 transition-all hover:border-teal-300 hover:text-teal-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg> 
              Documentation
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Blog list */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 md:py-14">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-500 animate-spin" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Loading posts…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">No blogs found.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
