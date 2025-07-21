import { pgTable, text, serial, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Helper functions for input sanitization
function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, ''); // Basic XSS prevention
}

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const runnerStatusEnum = pgEnum('runner_status', [
  'couch_potato',
  'beginner',
  'enthusiast',
  'endurance_pro'
]);

export const longestRunEnum = pgEnum('longest_run', [
  '0_2km',
  '2_5km',
  '5_10km',
  '10_plus_km'
]);

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  status: runnerStatusEnum("status").notNull(),
  longestRun: longestRunEnum("longest_run").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertWaitlistSchema = createInsertSchema(waitlist)
  .pick({
    name: true,
    email: true,
    status: true,
    longestRun: true,
  })
  .transform((data) => ({
    ...data,
    name: sanitizeString(data.name),
    email: sanitizeEmail(data.email),
  }));

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

// New subscribers table with enhanced validation
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertSubscriberSchema = createInsertSchema(subscribers)
  .pick({
    email: true,
  })
  .transform((data) => ({
    email: sanitizeEmail(data.email),
  }));

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// Blog posts table for storing blog metadata
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: text("published_at").notNull(),
  tags: text("tags").array(),
  readingTime: integer("reading_time").notNull(), // in minutes
  featured: boolean("featured").default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .pick({
    slug: true,
    title: true,
    excerpt: true,
    content: true,
    author: true,
    publishedAt: true,
    tags: true,
    readingTime: true,
    featured: true,
  })
  .transform((data) => ({
    ...data,
    title: sanitizeString(data.title),
    excerpt: sanitizeString(data.excerpt),
    author: sanitizeString(data.author),
  }));

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;