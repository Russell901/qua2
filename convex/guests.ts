import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const guests = await ctx.db.query('guests').collect();
    return guests.map(guest => ({
      _id: guest._id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      name: `${guest.firstName} ${guest.lastName}`,
      email: guest.email,
      phoneNumber: guest.phoneNumber,
      gender: guest.gender,
    }));
  },
});

export const addGuest = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    gender: v.string(),
  },
  handler: async (ctx, args) => {
    const guestId = await ctx.db.insert("guests", args);
    return guestId;
  },
});

export const deleteGuest = mutation({
  args: { id: v.id('guests') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteGuestAndUpdateBookings = mutation({
  args: { guestId: v.id("guests") },
  handler: async (ctx, args) => {
    const { guestId } = args;

    // Fetch the guest
    const guest = await ctx.db.get(guestId);
    if (!guest) {
      throw new Error("Guest not found");
    }

    // Find all bookings associated with this guest
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("guestId"), guestId))
      .collect();

    // Delete all associated bookings
    for (const booking of bookings) {
      await ctx.db.delete(booking._id);
    }

    // Delete the guest
    await ctx.db.delete(guestId);

    return { success: true, deletedBookings: bookings.length };
  },
});

export const getGuestById = query({
  args: { id: v.id("guests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getGuest = query({
  args: { id: v.id("guests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});