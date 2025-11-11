import { Link } from "wouter";
import type { BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-neutral-900 pt-8">
      <h3 className="mb-8 text-2xl font-semibold text-white">Related Articles</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((relatedPost) => (
          <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
            <div className="group cursor-pointer">
              <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 transition-colors group-hover:border-orange-500/60">
                <h4 className="mb-2 font-semibold text-white transition-colors group-hover:text-orange-400 line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="mb-3 line-clamp-2 text-sm text-neutral-400">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
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
