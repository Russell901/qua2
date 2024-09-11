import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    date: v.string(),
    description: v.string(),
    amount: v.number(),
    type: v.union(v.literal("income"), v.literal("expense")),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const transactionId = await ctx.db.insert("transactions", {
      date: args.date,
      description: args.description,
      amount: args.amount,
      type: args.type,
      category: args.category,
    });
    return transactionId;
  },
});

// Add this query
export const list = query(async (ctx) => {
  return await ctx.db.query("transactions").collect();
});