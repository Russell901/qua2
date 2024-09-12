import { defineSchema, defineTable } from "convex/server";
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
  guests: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    gender: v.string(),
  }),
  hostels: defineTable({
    name: v.string(),
    location: v.string(),
    capacity: v.number(),
    description: v.string(),
    currentOccupancy: v.optional(v.number()),
    availability: v.union(
      v.literal("full"),
      v.literal("medium"),
      v.literal("high")
    ),
    pricePerNight: v.number(), // Add this line
  }),
  bookings: defineTable({
    guestId: v.id("guests"),
    hostelId: v.id("hostels"),
    checkInDate: v.string(),
    checkOutDate: v.string(),
    totalPrice: v.number(),
    createdAt: v.string(),
    status: v.union(
      v.literal("completed"),
      v.literal("canceled"),
      v.literal("pending")
    ),
  }),
});
