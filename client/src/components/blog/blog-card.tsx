import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card
        className={`group h-full cursor-pointer border border-neutral-900 bg-neutral-900/40 text-white transition-all duration-300 hover:border-orange-500/60 hover:bg-neutral-900/70 ${
          featured ? "md:col-span-2" : ""
        }`}
      >
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.featured && (
              <Badge className="bg-orange-500/20 text-orange-200">
                Featured
              </Badge>
            )}
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-neutral-800 text-neutral-300">
                {tag}
              </Badge>
            ))}
          </div>
          <h3
            className={`font-semibold leading-tight transition-colors group-hover:text-orange-400 ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="mb-4 line-clamp-3 text-neutral-400">
            {post.excerpt}
          </p>
          <div className="flex flex-col gap-3 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            <time dateTime={post.publishedAt} className="text-neutral-500 sm:text-right">
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
