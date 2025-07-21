import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, insertSubscriberSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function registerRoutes(app: Express): Server {
  // Middleware to handle blog post metadata for social media crawlers
  app.get("/blog/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const userAgent = req.get('User-Agent') || '';
      
      // Check if request is from a social media crawler/bot
      const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|WhatsApp|Googlebot|bingbot/i.test(userAgent);
      
      if (isCrawler) {
        const post = await storage.getBlogPost(slug);
        
        if (post) {
          // Read the base HTML template
          const htmlPath = path.join(__dirname, "..", "client", "index.html");
          let html = fs.readFileSync(htmlPath, "utf-8");
          
          // Replace meta tags with blog post specific data
          const title = `${post.title} | 26weeks.ai - Your AI Marathon Coach`;
          const description = post.excerpt;
          const url = `${req.protocol}://${req.get('host')}/blog/${post.slug}`;
          const image = `${req.protocol}://${req.get('host')}/logo-corners-1080p.png`;
          
          // Replace title
          html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
          
          // Replace or add meta description
          html = html.replace(
            /(<meta\s+name="description"\s+content=")[^"]*(")/,
            `$1${description}$2`
          );
          
          // Replace Open Graph tags with more flexible regex
          html = html.replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:title" content="${post.title}" />`
          );
          html = html.replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:description" content="${description}" />`
          );
          html = html.replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:url" content="${url}" />`
          );
          html = html.replace(
            /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:image" content="${image}" />`
          );
          html = html.replace(
            /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
            `<meta property="og:type" content="article" />`
          );
          
          // Replace Twitter Card tags
          html = html.replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:title" content="${post.title}" />`
          );
          html = html.replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:description" content="${description}" />`
          );
          html = html.replace(
            /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="twitter:image" content="${image}" />`
          );
          
          // Add article specific meta tags
          const articleMeta = `
    <meta property="article:author" content="${post.author}" />
    <meta property="article:published_time" content="${post.publishedAt}" />
    <meta property="article:modified_time" content="${post.updatedAt}" />
    <meta name="author" content="${post.author}" />
    ${post.tags ? post.tags.map(tag => `<meta property="article:tag" content="${tag}" />`).join('\n    ') : ''}
          `;
          
          // Insert article meta tags before closing head tag
          html = html.replace('</head>', `${articleMeta}\n  </head>`);
          
          res.set('Content-Type', 'text/html').send(html);
          return;
        }
      }
      
      // For non-crawlers or missing posts, continue to normal route handling
      next();
    } catch (error) {
      console.error('Error serving blog post metadata:', error);
      next();
    }
  });
  app.post("/api/waitlist", async (req, res) => {
    try {
      const entry = insertWaitlistSchema.parse(req.body);
      const existingEntry = await storage.getWaitlistEntry(entry.email);

      if (existingEntry) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const waitlistEntry = await storage.addToWaitlist(entry);
      res.status(201).json(waitlistEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const entry = insertSubscriberSchema.parse(req.body);
      const existingSubscriber = await storage.getSubscriber(entry.email);

      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.addSubscriber(entry);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Blog API routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const posts = await storage.searchBlogPosts(q);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const post = insertBlogPostSchema.parse(req.body);
      const newPost = await storage.createBlogPost(post);
      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}