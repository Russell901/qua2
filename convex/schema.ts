import { defineSchema, defineTable } from 'convex/server';
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    date: v.string(),
    description: v.string(),
    amount: v.number(),
    type: v.union(v.literal("income"), v.literal("expense")),
    category: v.string(),
  }),
  categories: defineTable({
    name: v.string(),
  }),
});