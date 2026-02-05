import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — LegalForge | Privacy, Compliance & Legal Tech Insights",
  description:
    "Expert guides on privacy policies, GDPR compliance, terms of service, and legal requirements for websites, apps, and startups.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-dark bg-grid">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight-h1 mb-4">
              Legal<span className="text-teal">Forge</span> Blog
            </h1>
            <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
              Expert guides on privacy policies, compliance, and legal
              requirements for startups, developers, and small businesses.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-24 px-4">
          <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-brand-surface border border-border rounded-card p-6 hover:border-teal/40 hover:shadow-teal-glow transition-all duration-200"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-0.5 rounded-badge bg-teal/10 text-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-semibold font-heading text-txt-primary group-hover:text-teal-soft transition-colors duration-150 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-txt-secondary mb-4 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-txt-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
