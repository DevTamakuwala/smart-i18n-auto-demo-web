"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getBlogById, type Blog } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBlogById(Number(id))
      .then(setBlog)
      .catch(() => setError("Blog not found."))
      .finally(() => setLoading(false));
  }, [id, language]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-500 animate-spin" />
        </div>
        <span className="text-xs text-slate-400 font-medium">Loading…</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-4">
          <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">{error ?? "Blog not found."}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition-all hover:border-teal-200 hover:text-teal-600 hover:shadow-md"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All posts
      </Link>

      <header className="mt-6 sm:mt-8 pb-6 sm:pb-8 border-b border-slate-200/60">
        <div className="flex items-center gap-2 mb-4">
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
            Blog
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <time className="text-xs font-medium text-slate-400">
            {formatDate(blog.created_at)}
          </time>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
          {blog.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
          {blog.summary}
        </p>
      </header>

      <div className="prose-blog mt-6 sm:mt-10">{blog.content}</div>
    </article>
  );
}
