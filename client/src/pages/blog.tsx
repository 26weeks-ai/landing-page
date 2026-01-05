import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { SearchFilter } from "@/components/blog/search-filter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import WaitlistForm from "@/components/waitlist-form";
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
      <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-gradient-to-b from-background to-card/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtle">
              <Sparkles className="h-4 w-4 text-ring" />
              Insights & Stories
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground text-balance">
              Training intel for runners chasing <span className="text-ring">26.2</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground text-balance">
              Practical tactics, mindset shifts, and data-backed lessons from our coaching lab. Everything we learn while
              helping athletes go from couch to marathon lives here.
            </p>
          </div>
          <Link href="/">
            <Button
              variant="ghost"
              className="self-start text-ring hover:text-ring/90 hover:bg-ring/10 focus-visible:ring-ring/60"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        {featuredPosts.length > 0 && !searchQuery && !selectedTag && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-subtle">Editor's picks</p>
                <h2 className="text-2xl font-semibold text-foreground">Highlighted reads</h2>
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-subtle">
                {searchQuery || selectedTag ? "Search results" : "All posts"}
              </p>
              <h2 className="text-2xl font-semibold text-foreground">{filteredPosts.length} article(s)</h2>
            </div>
            {(searchQuery || selectedTag) && (
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground hover:bg-card/40"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-elev-2">
              <h3 className="text-xl font-semibold text-foreground">Nothing matched just yet</h3>
              <p className="mt-2 text-muted-foreground">
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

        <section className="rounded-3xl border border-border bg-card p-10 text-center shadow-elev-2">
          <h2 className="text-2xl font-semibold text-foreground">Want a personalized plan?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Join the 26weeks.ai waitlist for early access to adaptive coaching built for real schedules and real
            recovery.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm label="Join waitlist" />
          </div>
        </section>
      </main>
      </div>
    </>
  );
}
