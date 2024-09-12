import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    hostelId: v.id("hostels"),
    change: v.number(),
  },
  handler: async (ctx, args) => {
    const { hostelId, change } = args;

    const hostel = await ctx.db.get(hostelId);
    if (!hostel) {
      throw new Error("Hostel not found");
    }

    const newOccupancy = (hostel.currentOccupancy || 0) + change;
    
    // Ensure occupancy doesn't go below 0 or exceed capacity
    const clampedOccupancy = Math.max(0, Math.min(newOccupancy, hostel.capacity));

    await ctx.db.patch(hostelId, { currentOccupancy: clampedOccupancy });

    return clampedOccupancy;
  },
});
