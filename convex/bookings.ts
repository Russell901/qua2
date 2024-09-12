import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addBooking = mutation({
  args: {
    guestId: v.id("guests"),
    hostelId: v.id("hostels"),
    checkInDate: v.string(),
    checkOutDate: v.string(),
    totalPrice: v.number(),
    status: v.union(
      v.literal("completed"),
      v.literal("canceled"),
      v.literal("pending")
    ),
  },
  handler: async (ctx, args) => {
    const hostel = await ctx.db.get(args.hostelId);
    if (!hostel) {
      throw new Error("Hostel not found");
    }

    const checkInDate = new Date(args.checkInDate);
    const checkOutDate = new Date(args.checkOutDate);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    const totalPrice = nights * hostel.pricePerNight;

    const bookingId = await ctx.db.insert("bookings", {
      guestId: args.guestId,
      hostelId: args.hostelId,
      checkInDate: args.checkInDate,
      checkOutDate: args.checkOutDate,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: args.status,
    });

    return bookingId;
  },
});

export const getMonthlyRevenue = query(async (ctx) => {
  // Implement the logic to calculate monthly revenue
  // Return the calculated value
  const currentMonth = new Date().getMonth() + 1;
  const bookings = await ctx.db.query("bookings").collect();
  const monthlyRevenue = bookings.reduce((total, booking) => {
    const bookingDate = new Date(booking.createdAt);
    if (bookingDate.getMonth() + 1 === currentMonth) {
      return total + (booking.totalPrice || 0);
    }
    return total;
  }, 0); // Add initial value of 0

  return monthlyRevenue;
});

export const getRecentBookings = query(async ({ db }) => {
  const recentBookings = await db.query("bookings").order("desc").take(5);

  const bookingsWithGuestInfo = await Promise.all(
    recentBookings.map(async (booking) => {
      const guest = await db.get(booking.guestId);
      return {
        ...booking,
        guestName: guest ? `${guest.firstName} ${guest.lastName}` : "Unknown Guest",
      };
    })
  );

  return bookingsWithGuestInfo;
});

export const completeBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    const { bookingId } = args;

    // Fetch the booking
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Update the booking status to completed
    await ctx.db.patch(bookingId, { status: "completed" });

    return { success: true };
  },
});

export const getBookingById = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  },
});

export const getGuestById = query({
  args: { id: v.id("guests") },
  handler: async (ctx, args) => {
    const guest = await ctx.db.get(args.id);
    if (!guest) {
      throw new Error("Guest not found");
    }
    return {
      id: guest._id,
      name: `${guest.firstName} ${guest.lastName}`,
      email: guest.email,
      phone: guest.phoneNumber,
    };
  },
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

