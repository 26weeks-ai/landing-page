import { pgTable, text, serial, integer, boolean, pgEnum, timestamp, foreignKey, date, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Helper functions for input sanitization
function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, ''); // Basic XSS prevention
}

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

// Enhanced users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: runnerStatusEnum("status").notNull().default('beginner'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImage: text("profile_image"),
  targetRace: text("target_race"),
  targetDate: date("target_date"),
});

// Schema for user creation/update
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    status: true,
    firstName: true,
    lastName: true,
    targetRace: true,
    targetDate: true,
  })
  .transform((data) => ({
    ...data,
    email: sanitizeEmail(data.email),
    firstName: data.firstName ? sanitizeString(data.firstName) : undefined,
    lastName: data.lastName ? sanitizeString(data.lastName) : undefined,
  }));

// Running activities table
export const runningActivities = pgTable("running_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  distance: decimal("distance").notNull(), // in kilometers
  duration: integer("duration").notNull(), // in seconds
  avgPace: decimal("avg_pace"), // min/km
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRunningActivitySchema = createInsertSchema(runningActivities)
  .pick({
    userId: true,
    date: true,
    distance: true,
    duration: true,
    avgPace: true,
    notes: true,
  })
  .transform((data) => ({
    ...data,
    notes: data.notes ? sanitizeString(data.notes) : undefined,
  }));

// Training plans table
export const trainingPlans = pgTable("training_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  targetRace: text("target_race").notNull(),
  status: text("status").notNull().default('active'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTrainingPlanSchema = createInsertSchema(trainingPlans)
  .pick({
    userId: true,
    startDate: true,
    endDate: true,
    targetRace: true,
    status: true,
  });

// Existing waitlist and subscribers tables remain unchanged
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

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRunningActivity = z.infer<typeof insertRunningActivitySchema>;
export type RunningActivity = typeof runningActivities.$inferSelect;
export type InsertTrainingPlan = z.infer<typeof insertTrainingPlanSchema>;
export type TrainingPlan = typeof trainingPlans.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;