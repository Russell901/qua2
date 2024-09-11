import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("categories", args);
    return categoryId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});