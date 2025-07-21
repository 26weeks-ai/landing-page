import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  // Debug log to check post data
  if (typeof window !== 'undefined') {
    console.log('BlogCard post data:', {
      author: post.author,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      formatted: formatDate(post.publishedAt)
    });
  }
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        featured ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' : ''
      }`}>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.featured && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                Featured
              </Badge>
            )}
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className={`font-semibold leading-tight group-hover:text-orange-600 transition-colors ${
            featured ? 'text-xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}