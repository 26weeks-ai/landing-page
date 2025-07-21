import matter from 'gray-matter';
import type { BlogPost } from '@shared/schema';

export interface BlogPostMeta {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export interface ParsedBlogPost extends BlogPostMeta {
  slug: string;
  content: string;
}

// Utility to parse markdown files with frontmatter
export function parseBlogPost(content: string, slug: string): ParsedBlogPost {
  const { data, content: markdownContent } = matter(content);
  
  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    author: data.author || '',
    publishedAt: data.publishedAt || '',
    tags: data.tags || [],
    readingTime: data.readingTime || 5,
    featured: data.featured || false,
    content: markdownContent
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return 'Invalid Date';
  
  // Handle different date formats
  let date: Date;
  
  // If it's already a valid date string (ISO format)
  if (dateString.includes('T') || dateString.includes('Z')) {
    date = new Date(dateString);
  } 
  // If it's a simple date format like "2024-07-20"
  else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(dateString + 'T00:00:00.000Z');
  }
  // Try parsing as-is
  else {
    date = new Date(dateString);
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Calculate reading time based on content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate social sharing URLs
export function generateShareUrls(post: BlogPost, baseUrl: string = window.location.origin) {
  const url = `${baseUrl}/blog/${post.slug}`;
  const text = `Check out this article: ${post.title}`;
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    copy: url
  };
}

// Extract tags from blog posts for filtering
export function extractUniqueTags(posts: BlogPost[]): string[] {
  const allTags = posts.flatMap(post => post.tags || []);
  return Array.from(new Set(allTags)).sort();
}

// Filter posts by tag
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => post.tags?.includes(tag));
}

// Search posts by title, excerpt, or content
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery)
  );
}