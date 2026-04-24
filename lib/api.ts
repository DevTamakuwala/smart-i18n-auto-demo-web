import axios from "axios";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

export interface Blog {
  id: number;
  title: string;
  summary: string;
  content: string;
  created_at: string;
}

let currentLanguage = DEFAULT_LANGUAGE;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
});

// Attach Accept-Language header to every request
api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = currentLanguage;
  return config;
});

export function setApiLanguage(lang: string) {
  currentLanguage = lang;
}

export async function getBlogs(): Promise<Blog[]> {
  const { data } = await api.get<Blog[]>("/blogs");
  return data;
}

export async function getBlogById(id: number): Promise<Blog> {
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.id === id);
  if (!blog) throw new Error("Blog not found");
  return blog;
}
