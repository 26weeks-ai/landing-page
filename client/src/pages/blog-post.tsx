import { useRoute } from "wouter";
import { lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialShare } from "@/components/blog/social-share";
import { MetaHead } from "@/components/MetaHead";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { Link } from "wouter";
import { formatDate, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import "highlight.js/styles/github.css";

// Lazy load related posts for better performance
const LazyRelatedPosts = lazy(() => import("@/components/blog/RelatedPosts"));

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post) : [];

  if (!match) {
    return null;
  }

  if (!post) {
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

  // Generate current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://26weeks.ai/blog/${post.slug}`;
  
  // Generate a blog-specific image URL or use the default logo
  const blogImageUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/logo-corners-1080p.png` 
    : `https://26weeks.ai/logo-corners-1080p.png`;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Dynamic Meta Tags */}
      <MetaHead
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedAt={post.publishedAt}
        readingTime={post.readingTime}
        url={currentUrl}
        image={blogImageUrl}
        tags={post.tags || undefined}
        type="article"
      />
      
      {/* Header */}
      <div className="border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-neutral-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 text-orange-400 hover:text-orange-200 hover:bg-orange-500/15 focus-visible:ring-orange-500/60"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.featured && (
                <Badge className="bg-orange-500/20 text-orange-200">
                  Featured
                </Badge>
              )}
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="border-neutral-800 text-neutral-300">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed text-balance">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
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
        <article className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-50 mb-6 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-4 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-200 mb-3 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-neutral-200 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-200">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-neutral-200 leading-relaxed [&>p]:inline [&>p]:m-0">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-4 border-orange-500/40 bg-orange-500/10 px-6 py-2 text-neutral-100 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                if (className) {
                  return (
                    <code className={`${className} block rounded-lg bg-neutral-900/70 p-4 text-sm`}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="rounded bg-neutral-900/70 px-2 py-1 text-sm text-neutral-100">
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
        <div className="mt-12 border-t border-neutral-900 pt-8">
          <SocialShare post={post} />
        </div>

        {/* Related Posts */}
        <Suspense fallback={
          <div className="mt-16 border-t border-neutral-900 pt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6">
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-neutral-800"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-800"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-800"></div>
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
