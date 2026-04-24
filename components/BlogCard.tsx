import Link from "next/link";
import type { Blog } from "@/lib/api";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.id}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/8">
        {/* Subtle top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-center gap-2">
          <time className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            {formatDate(blog.created_at)}
          </time>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-[11px] font-medium text-teal-600/70">Blog</span>
        </div>

        <h2 className="mt-3 text-base font-semibold leading-snug text-slate-800 transition-colors group-hover:text-teal-700">
          {blog.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {blog.summary}
        </p>

        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Read article
          <svg
            className="h-3 w-3 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
