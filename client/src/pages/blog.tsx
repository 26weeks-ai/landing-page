import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { SearchFilter } from "@/components/blog/search-filter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
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
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-neutral-900/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-neutral-400">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Insights & Stories
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Training intel for runners chasing <span className="text-orange-400">26.2</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-400">
              Practical tactics, mindset shifts, and data-backed lessons from our coaching lab. Everything we learn while
              helping athletes go from couch to marathon lives here.
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" className="self-start text-orange-400 hover:bg-orange-500/10">
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
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Editor's picks</p>
                <h2 className="text-2xl font-semibold text-white">Highlighted reads</h2>
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
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                {searchQuery || selectedTag ? "Search results" : "All posts"}
              </p>
              <h2 className="text-2xl font-semibold text-white">{filteredPosts.length} article(s)</h2>
            </div>
            {(searchQuery || selectedTag) && (
              <Button
                variant="ghost"
                className="text-sm text-neutral-300 hover:bg-neutral-900/60"
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
            <div className="rounded-3xl border border-neutral-900 bg-neutral-900/40 p-12 text-center">
              <h3 className="text-xl font-semibold text-white">Nothing matched just yet</h3>
              <p className="mt-2 text-neutral-400">
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
      </main>
    </div>
  );
}
