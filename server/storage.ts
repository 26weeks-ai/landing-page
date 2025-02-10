import { users, waitlist, type User, type InsertUser, type Waitlist, type InsertWaitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Existing user methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // New waitlist methods
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntry(email: string): Promise<Waitlist | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Existing user methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // New waitlist methods
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const [waitlistEntry] = await db
      .insert(waitlist)
      .values(entry)
      .returning();
    return waitlistEntry;
  }

  async getWaitlistEntry(email: string): Promise<Waitlist | undefined> {
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, email));
    return entry || undefined;
  }
}

export const storage = new DatabaseStorage();