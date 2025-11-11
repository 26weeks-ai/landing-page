import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "./blog";

describe("blog content loader", () => {
  const posts = getAllPosts();

  it("loads at least one post", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("exposes posts by slug", () => {
    const first = posts[0];
    const match = getPostBySlug(first.slug);
    expect(match).toBeDefined();
    expect(match?.title).toBe(first.title);
  });
});
