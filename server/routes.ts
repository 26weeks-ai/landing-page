import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
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

  const httpServer = createServer(app);
  return httpServer;
}