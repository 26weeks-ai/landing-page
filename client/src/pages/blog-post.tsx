import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialShare } from "@/components/blog/social-share";
import { MetaHead } from "@/components/MetaHead";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { formatDate } from "@/lib/blog";
import "highlight.js/styles/github.css";

// Lazy load related posts for better performance
const LazyRelatedPosts = lazy(() => import("@/components/blog/RelatedPosts"));

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  // Debug log to check what slug we're getting
  if (typeof window !== 'undefined') {
    console.log('BlogPost slug:', slug);
  }

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes cache for posts
    retry: 2, // Limit retries for faster failure handling
  });

  // Load related posts with lower priority (defer loading)
  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    select: (posts) => {
      if (!post) return [];
      // Find posts with similar tags
      const postTags = post.tags || [];
      return posts
        .filter(p => p.id !== post.id && p.tags?.some(tag => postTags.includes(tag)))
        .slice(0, 3);
    },
    enabled: !!post,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  if (!match) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-24 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex gap-4 mb-8">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-28"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://26weeks.ai/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Meta Tags */}
      <MetaHead
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedAt={post.publishedAt}
        readingTime={post.readingTime}
        url={currentUrl}
        tags={post.tags || undefined}
        type="article"
      />
      
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.featured && (
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  Featured
                </Badge>
              )}
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-orange-200 pl-6 py-2 my-6 bg-orange-50 text-gray-700 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                if (className) {
                  return (
                    <code className={`${className} block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Social Share */}
        <div className="mt-12 pt-8 border-t">
          <SocialShare post={post} />
        </div>

        {/* Related Posts */}
        <Suspense fallback={
          <div className="mt-16 pt-8 border-t">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }>
          <LazyRelatedPosts posts={relatedPosts} />
        </Suspense>
      </div>
    </div>
  );
}