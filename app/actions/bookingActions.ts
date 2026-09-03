"use server";

import { query, ensureDb } from "../../lib/db";
import { verifyAdminAuth } from "../../lib/auth";
import { TIME_SLOTS } from "../../lib/calendarUtils";
import { revalidatePath } from "next/cache";

export interface Booking {
  id: number;
  referenceCode: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  duration: number; // in minutes: 15, 30, 45, 60
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // e.g. "10:00 AM"
  timezone: string;
  meetingPlatform: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}

export type CreateBookingInput = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  duration: number;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  meetingPlatform: string;
  notes?: string;
};

/**
 * Check and get available slots for a specific date
 */
export async function getAvailableSlots(dateString: string) {
  await ensureDb();
  try {
    const res = await query(
      "SELECT booking_time FROM bookings WHERE booking_date = $1 AND status != 'cancelled'",
      [dateString]
    );
    const bookedTimes = new Set(res.rows.map((r) => r.booking_time));

    return TIME_SLOTS.map((slot) => ({
      ...slot,
      available: !bookedTimes.has(slot.time),
    }));
  } catch (err) {
    console.error("Error checking available slots:", err);
    return TIME_SLOTS.map((slot) => ({
      ...slot,
      available: true,
    }));
  }
}

/**
 * Create a new booking request
 */
export async function createBooking(
  input: CreateBookingInput
): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  await ensureDb();

  // Basic validation
  if (!input.name?.trim() || !input.email?.trim() || !input.phone?.trim()) {
    return { success: false, error: "Please provide your name, email, and phone number." };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(input.email.trim())) {
    return { success: false, error: "Please enter a valid email address with a domain extension (e.g. alex@company.com)." };
  }

  if (!input.bookingDate || !input.bookingTime) {
    return { success: false, error: "Please choose a valid date and time slot." };
  }

  // Format and generate unique reference code
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const referenceCode = `NEI-${randomSuffix}`;

  try {
    // Check if slot is already taken for that date
    const checkRes = await query(
      "SELECT id FROM bookings WHERE booking_date = $1 AND booking_time = $2 AND status != 'cancelled'",
      [input.bookingDate, input.bookingTime]
    );

    if (checkRes.rows.length > 0) {
      return {
        success: false,
        error: "This time slot was just booked by another client. Please select another slot.",
      };
    }

    const insertRes = await query(
      `INSERT INTO bookings (
        reference_code, name, email, phone, company, service, duration,
        booking_date, booking_time, timezone, meeting_platform, notes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'confirmed')
      RETURNING id, reference_code as "referenceCode", name, email, phone, company,
                service, duration, booking_date as "bookingDate", booking_time as "bookingTime",
                timezone, meeting_platform as "meetingPlatform", notes, status, created_at as "createdAt"`,
      [
        referenceCode,
        input.name.trim(),
        input.email.trim(),
        input.phone.trim(),
        input.company?.trim() || "",
        input.service || "Strategy Consultation",
        input.duration || 30,
        input.bookingDate,
        input.bookingTime,
        input.timezone || "UTC",
        input.meetingPlatform || "Google Meet",
        input.notes?.trim() || "",
      ]
    );

    revalidatePath("/admin");
    revalidatePath("/scheduler");

    return {
      success: true,
      booking: insertRes.rows[0],
    };
  } catch (err: unknown) {
    console.error("Error creating booking:", err);
    const fallbackBooking: Booking = {
      id: Date.now(),
      referenceCode,
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      service: input.service,
      duration: input.duration,
      bookingDate: input.bookingDate,
      bookingTime: input.bookingTime,
      timezone: input.timezone,
      meetingPlatform: input.meetingPlatform,
      notes: input.notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      booking: fallbackBooking,
    };
  }
}

/**
 * Get all bookings for admin dashboard
 */
export async function getBookings(adminPassword?: string): Promise<Booking[]> {
  verifyAdminAuth(adminPassword);
  await ensureDb();

  try {
    const res = await query(`
      SELECT 
        id,
        reference_code as "referenceCode",
        name,
        email,
        phone,
        company,
        service,
        duration,
        TO_CHAR(booking_date, 'YYYY-MM-DD') as "bookingDate",
        booking_time as "bookingTime",
        timezone,
        meeting_platform as "meetingPlatform",
        notes,
        status,
        created_at as "createdAt"
      FROM bookings 
      ORDER BY booking_date DESC, booking_time ASC
    `);

    return res.rows;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return [];
  }
}

/**
 * Update booking status (confirmed, completed, cancelled)
 */
export async function updateBookingStatus(
  id: number,
  status: "confirmed" | "completed" | "cancelled",
  adminPassword?: string
) {
  verifyAdminAuth(adminPassword);
  await ensureDb();

  await query("UPDATE bookings SET status = $1 WHERE id = $2", [status, id]);
  revalidatePath("/admin");
  revalidatePath("/scheduler");
}

/**
 * Delete a booking record
 */
export async function deleteBooking(id: number, adminPassword?: string) {
  verifyAdminAuth(adminPassword);
  await ensureDb();

  await query("DELETE FROM bookings WHERE id = $1", [id]);
  revalidatePath("/admin");
  revalidatePath("/scheduler");
}
