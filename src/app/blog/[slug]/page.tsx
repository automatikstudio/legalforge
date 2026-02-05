import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { marked } from "marked";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — LegalForge Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://legalforge-chi.vercel.app/blog/${post.slug}`,
      siteName: "LegalForge",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const htmlContent = marked.parse(post.content, { async: false }) as string;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-dark bg-grid">
        <article className="pt-32 pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-txt-muted hover:text-teal transition-colors duration-150 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-badge bg-teal/10 text-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight-h1 mb-4 text-txt-primary">
                {post.title}
              </h1>
              <p className="text-txt-secondary text-lg mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-txt-muted">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </header>

            {/* Content */}
            <div
              className="prose-legal"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 rounded-card bg-brand-surface border border-border text-center">
              <h3 className="text-xl font-bold font-heading mb-2">
                Generate Your Legal Documents in 60 Seconds
              </h3>
              <p className="text-txt-secondary mb-6 max-w-md mx-auto">
                LegalForge uses AI to scan your website and create tailored
                Privacy Policies, Terms of Service, and Cookie Policies.
              </p>
              <Link
                href="/app"
                className="inline-block px-6 py-3 rounded-button bg-teal text-white font-heading font-semibold text-sm hover:bg-teal-deep transition-colors duration-150"
              >
                Try LegalForge Free →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
