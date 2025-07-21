import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { storage } from '../storage';
import type { InsertBlogPost } from '@shared/schema';

// Function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Function to generate slug from filename
function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

// Function to load and parse a single markdown file
async function loadBlogPost(filePath: string, filename: string): Promise<InsertBlogPost | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // Validate required frontmatter
    if (!data.title || !data.excerpt || !data.author || !data.publishedAt) {
      console.warn(`Missing required frontmatter in ${filename}`);
      return null;
    }

    const slug = generateSlug(filename);
    const readingTime = data.readingTime || calculateReadingTime(content);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      author: data.author,
      publishedAt: data.publishedAt,
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime,
      featured: Boolean(data.featured),
    };
  } catch (error) {
    console.error(`Error loading blog post ${filename}:`, error);
    return null;
  }
}

// Function to load all blog posts from the content/blog directory
export async function loadAllBlogPosts(): Promise<void> {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    // Check if directory exists
    try {
      await fs.access(blogDir);
    } catch {
      console.log('Blog directory does not exist, creating it...');
      await fs.mkdir(blogDir, { recursive: true });
      return;
    }

    const files = await fs.readdir(blogDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    console.log(`Found ${markdownFiles.length} markdown files in blog directory`);

    for (const filename of markdownFiles) {
      const filePath = path.join(blogDir, filename);
      const blogPost = await loadBlogPost(filePath, filename);
      
      if (blogPost) {
        try {
          // Check if post already exists
          const existing = await storage.getBlogPost(blogPost.slug);
          
          if (existing) {
            // Update existing post
            await storage.updateBlogPost(blogPost.slug, blogPost);
            console.log(`Updated blog post: ${blogPost.title}`);
          } else {
            // Create new post
            await storage.createBlogPost(blogPost);
            console.log(`Created new blog post: ${blogPost.title}`);
          }
        } catch (error) {
          console.error(`Error saving blog post ${blogPost.title}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

// Function to watch for file changes and reload blog posts
export function watchBlogDirectory(): void {
  // In a production environment, you might want to implement file watching
  // For now, we'll just load on server start
  console.log('Blog directory watching is not implemented in this version');
}