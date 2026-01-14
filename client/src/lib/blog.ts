import fm from "front-matter";

export interface BlogFrontMatter {
  title?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  content: string;
}

const TAG_LABEL_OVERRIDES: Record<string, string> = {
  "vo2 max": "VO2 Max",
  hrv: "HRV",
  rhr: "RHR",
  "it band": "IT band",
  "itb syndrome": "ITB syndrome",
};

export function normalizeTag(tag: string): string {
  return tag.trim().replace(/\s+/g, " ").toLowerCase();
}

export function formatTagLabel(tag: string): string {
  const normalized = normalizeTag(tag);
  const override = TAG_LABEL_OVERRIDES[normalized];
  if (override) return override;

  return normalized
    .split(" ")
    .map((word) => {
      if (!word) return word;
      const firstLetterIndex = word.search(/[a-z]/i);
      if (firstLetterIndex === -1) return word;

      return (
        word.slice(0, firstLetterIndex) +
        word[firstLetterIndex].toUpperCase() +
        word.slice(firstLetterIndex + 1)
      );
    })
    .join(" ");
}

const markdownFiles = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const allPosts: BlogPost[] = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "post";
    const { attributes, body } = fm<BlogFrontMatter>(raw);

    return {
      id: slug,
      slug,
      title: attributes.title ?? slug,
      excerpt: attributes.excerpt ?? "",
      author: attributes.author ?? "26weeks.ai Coach",
      publishedAt: attributes.publishedAt ?? new Date().toISOString(),
      tags: Array.isArray(attributes.tags)
        ? attributes.tags.map(normalizeTag).filter(Boolean)
        : [],
      readingTime:
        typeof attributes.readingTime === "number"
          ? attributes.readingTime
          : calculateReadingTime(body),
      featured: Boolean(attributes.featured),
      content: body.trim(),
    };
  })
  .sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getFeaturedPosts(): BlogPost[] {
  return allPosts.filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const postTags = post.tags ?? [];
  if (postTags.length === 0) return [];

  return allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => candidate.tags?.some((tag) => postTags.includes(tag)))
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  if (!dateString) return "Invalid Date";
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return "Invalid Date";
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateShareUrls(post: BlogPost, baseUrl?: string) {
  const origin = baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "https://26weeks.ai");
  const url = `${origin}/blog/${post.slug}`;
  const text = `Check out this article: ${post.title}`;

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    copy: url,
  };
}

export function extractUniqueTags(posts: BlogPost[]): string[] {
  const allTags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(allTags)).sort((a, b) =>
    formatTagLabel(a).localeCompare(formatTagLabel(b)),
  );
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) => post.tags?.includes(tag));
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
}
