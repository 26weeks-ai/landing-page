import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { SearchFilter } from "@/components/blog/search-filter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import WaitlistForm from "@/components/waitlist-form";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";
import Navbar from "@/components/layout/navbar";
import {
  extractUniqueTags,
  filterPostsByTag,
  getAllPosts,
  getFeaturedPosts,
  searchPosts,
} from "@/lib/blog";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  const availableTags = useMemo(() => extractUniqueTags(posts), [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = filterPostsByTag(result, selectedTag);
    }
    if (searchQuery) {
      result = searchPosts(result, searchQuery);
    }

    return result;
  }, [posts, searchQuery, selectedTag]);

  return (
    <>
      <MetaHead {...seo.blog} />
      <div className="min-h-screen bg-background text-paper">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-paper focus:shadow-none focus:border focus:border-border"
        >
          Skip to content
        </a>
        <Navbar />
        <header className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 pt-24 pb-14">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <Masthead
                kicker="BLOG"
                stamp="ARCHIVE"
                title={
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.06]">
                    The coaching journal for runners chasing{" "}
                    <span className="text-copper-500">26.2</span>
                  </h1>
                }
                subtitle={
                  <>
                    Tactical training notes, recovery science, and mindset shifts from the 26weeks.ai coaching lab —
                    written for real schedules and real life.
                  </>
                }
                showRule={false}
              />

              <Link href="/">
                <Button variant="outline" className="self-start">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
              <Sparkles className="h-4 w-4 text-midnight-400" aria-hidden="true" strokeWidth={1.75} />
              Insights & stories
            </div>
          </div>
        </header>

        <main id="main-content" className="mx-auto max-w-6xl px-6 py-16 space-y-16">
          {featuredPosts.length > 0 && !searchQuery && !selectedTag && (
            <section className="space-y-8">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                    Editor's picks
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
                    Highlighted reads
                  </h2>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.slice(0, 2).map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </section>
          )}

          <SearchFilter
            onSearch={setSearchQuery}
            onTagFilter={setSelectedTag}
            availableTags={availableTags}
            selectedTag={selectedTag}
            searchQuery={searchQuery}
          />

          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                  {searchQuery || selectedTag ? "Search results" : "All posts"}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
                  {filteredPosts.length} article(s)
                </h2>
              </div>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="ghost"
                  className="w-fit text-paper-secondary hover:text-paper"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>

            <Hairline className="opacity-70" />

            {filteredPosts.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-12 text-center">
                <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
                  Nothing matched just yet
                </h3>
                <p className="mt-3 text-paper-secondary">
                  Try tweaking your search terms or explore a different tag — we add fresh drops every sprint.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-border bg-card p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                  Want a personalized plan?
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
                  Join the waitlist
                </h2>
                <p className="mt-3 max-w-2xl text-paper-secondary">
                  Join the 26weeks.ai waitlist for early access to adaptive coaching built for real schedules and real
                  recovery.
                </p>
              </div>
              <WaitlistForm label="Join waitlist" className="md:w-auto" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
