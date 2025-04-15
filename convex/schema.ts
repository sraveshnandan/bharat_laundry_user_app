import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// database schema
export default defineSchema({
  users: defineTable({
    full_name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.string(),
    gender: v.optional(v.string()),
    created_at: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_email", ["email"]),
});
