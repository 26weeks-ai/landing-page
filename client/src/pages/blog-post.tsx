import { lazy, Suspense } from "react";
import { Link, useRoute } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialShare } from "@/components/blog/social-share";
import { MetaHead } from "@/components/MetaHead";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import WaitlistForm from "@/components/waitlist-form";
import { formatDate, formatTagLabel, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import "highlight.js/styles/github-dark-dimmed.css";

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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Article not found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
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
    <div className="min-h-screen bg-background text-foreground">
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
      <div className="border-b border-border bg-gradient-to-b from-background to-card/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 text-ring hover:text-ring/90 hover:bg-ring/10 focus-visible:ring-ring/60"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.featured && (
                <Badge className="bg-ring/15 text-ring">
                  Featured
                </Badge>
              )}
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border text-muted-foreground">
                  {formatTagLabel(tag)}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
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
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-3 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground leading-relaxed [&>p]:inline [&>p]:m-0">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-4 border-ring/40 bg-ring/10 px-6 py-2 text-foreground italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => {
                const className =
                  "text-ring underline decoration-ring/40 underline-offset-4 hover:text-ring/90";

                if (!href) {
                  return <span>{children}</span>;
                }

                if (href.startsWith("#")) {
                  return (
                    <a href={href} className={className}>
                      {children}
                    </a>
                  );
                }

                if (href.startsWith("/")) {
                  return (
                    <Link href={href} className={className}>
                      {children}
                    </Link>
                  );
                }

                return (
                  <a
                    href={href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                );
              },
              hr: () => <hr className="my-10 border-border" />,
              pre: ({ children }) => (
                <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-transparent p-0">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-lg border border-border">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-card/60">{children}</thead>,
              th: ({ children }) => (
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-border/70 px-4 py-3 align-top text-muted-foreground">
                  {children}
                </td>
              ),
              code: ({ children, className }) => {
                if (className) {
                  return (
                    <code className={`text-sm ${className}`}>
                      {children}
                    </code>
                  );
                }

                return (
                  <code className="rounded bg-background/60 px-2 py-1 text-sm text-foreground border border-border/60">
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-elev-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            Want an adaptive plan for your next race?
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Join the 26weeks.ai waitlist for early access to AI coaching that adjusts workouts using your schedule,
            recovery, and goals.
          </p>
          <div className="mt-6">
            <WaitlistForm label="Join waitlist" />
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-12 border-t border-border pt-8">
          <SocialShare post={post} />
        </div>

        {/* Related Posts */}
        <Suspense fallback={
          <div className="mt-16 border-t border-border pt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-6 shadow-elev-1"
                >
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
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
