import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const hostels = await ctx.db.query("hostels").collect();
    return hostels.map(hostel => ({
      _id: hostel._id,
      name: hostel.name,
      location: hostel.location,
      capacity: hostel.capacity,
      description: hostel.description,
      currentOccupancy: hostel.currentOccupancy,
      availability: hostel.availability,
      pricePerNight: hostel.pricePerNight,
    }));
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    capacity: v.number(),
    description: v.string(),
    currentOccupancy: v.optional(v.number()),
    availability: v.union(v.literal("full"), v.literal("medium"), v.literal("high")),
    pricePerNight: v.number(), // Add this line
  },
  handler: async (ctx, args) => {
    const hostelId = await ctx.db.insert("hostels", {
      name: args.name,
      location: args.location,
      capacity: args.capacity,
      description: args.description,
      currentOccupancy: args.currentOccupancy ?? 0,
      availability: args.availability,
      pricePerNight: args.pricePerNight, // Add this line
    });
    return hostelId;
  },
});

export const get = query({
  args: { _id: v.id("hostels") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});

export const updateOccupancy = mutation({
  args: { hostelName: v.string(), increment: v.number() },
  handler: async (ctx, args) => {
    const { hostelName, increment } = args;

    // Find the hostel
    const hostel = await ctx.db
      .query("hostels")
      .filter((q) => q.eq(q.field("name"), hostelName))
      .first();

    if (!hostel) {
      throw new Error(`Hostel "${hostelName}" not found`);
    }

    // Calculate the new occupancy
    const newOccupancy = Math.max(0, (hostel.currentOccupancy || 0) + increment);

    // Ensure the new occupancy doesn't exceed the capacity
    if (newOccupancy > hostel.capacity) {
      throw new Error(`Cannot exceed hostel capacity of ${hostel.capacity}`);
    }

    // Update the hostel's occupancy
    await ctx.db.patch(hostel._id, { currentOccupancy: newOccupancy });

    return { success: true, newOccupancy };
  },
});

export const getTotalHostels = query(async (ctx) => {
  const hostels = await ctx.db.query("hostels").collect();
  return hostels.length;
});

export const getAverageOccupancy = query(async (ctx) => {
  // Implement the logic to calculate average occupancy
  const hostels = await ctx.db.query("hostels").collect();
  if (hostels.length === 0) {
    return 0;
  }

  const totalOccupancy = hostels.reduce((sum, hostel) => sum + (hostel.currentOccupancy || 0), 0);
  const averageOccupancy = totalOccupancy / hostels.length;

  return averageOccupancy;
});

export const getOccupancyData = query(async (ctx) => {
  const hostels = await ctx.db.query("hostels").collect();
  return hostels.map(hostel => ({
    name: hostel.name,
    occupancy: hostel.currentOccupancy || 0,
    capacity: hostel.capacity,
  }));
});

export const getHostelById = query({
  args: { id: v.id("hostels") },
  handler: async (ctx, args) => {
    const hostel = await ctx.db.get(args.id);
    if (!hostel) {
      throw new Error("Hostel not found");
    }
    return { name: hostel.name };
  },
});


