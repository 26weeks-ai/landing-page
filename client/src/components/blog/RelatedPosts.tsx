import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
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