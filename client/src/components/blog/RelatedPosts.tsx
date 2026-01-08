import { Link } from "wouter";
import type { BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border pt-8">
      <h3 className="mb-8 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
        Related articles
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((relatedPost) => (
          <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
            <div className="group cursor-pointer">
              <div className="rounded-3xl border border-border bg-card p-6 transition-colors group-hover:border-copper-500/70">
                <h4 className="mb-2 font-serif font-semibold tracking-[-0.02em] text-paper transition-colors group-hover:text-copper-400 line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="mb-3 line-clamp-2 text-sm text-paper-secondary">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-paper-muted">
                  <span>{relatedPost.author}</span>
                  <span>{relatedPost.readingTime} min</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
