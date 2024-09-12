import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const guests = await ctx.db.query('guests').collect();
    return guests.map(guest => ({
      _id: guest._id,
      name: guest.name,
      hostel: guest.hostel,
      status: guest.status,
    }));
  },
});

export const addGuest = mutation({
  args: { name: v.string(), hostel: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("guests", args);
  },
});

export const updateGuest = mutation(
  async ({ db }, { id, status }: { id: Id<"guests">, status: string }) => {
    await db.patch(id, { status });
  }
);

export const deleteGuest = mutation({
  args: { id: v.id('guests') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteGuestAndUpdateOccupancy = mutation({
  args: { guestId: v.id("guests") },
  handler: async (ctx, args) => {
    const { guestId } = args;

    // Fetch the guest
    const guest = await ctx.db.get(guestId);
    if (!guest) {
      throw new Error("Guest not found");
    }

    // Find the hostel
    const hostel = await ctx.db
      .query("hostels")
      .filter((q) => q.eq(q.field("name"), guest.hostel))
      .first();

    if (!hostel) {
      throw new Error(`Hostel "${guest.hostel}" not found`);
    }

    // Calculate the new occupancy
    const newOccupancy = Math.max(0, (hostel.currentOccupancy || 0) - 1);

    // Update the hostel's occupancy
    await ctx.db.patch(hostel._id, { currentOccupancy: newOccupancy });

    // Delete the guest
    await ctx.db.delete(guestId);

    return { success: true, newOccupancy };
  },
});