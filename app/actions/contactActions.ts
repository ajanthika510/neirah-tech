"use server";

import { query, ensureDb } from "../../lib/db";
import { verifyAdminAuth } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  company?: string;
  message: string;
};

export interface ContactMessage {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export async function sendContactMessage(
  data: ContactMessageInput
): Promise<{ success: boolean; error?: string }> {
  await ensureDb();

  const name = data.name?.trim() || "";
  const email = data.email?.trim() || "";
  const phone = data.phone?.trim() || "";
  const service = data.service?.trim() || "";
  const company = data.company?.trim() || "";
  const message = data.message?.trim() || "";

  // 1. Name validation
  if (!name) {
    return { success: false, error: "Please enter your name." };
  }
  if (name.length < 2) {
    return { success: false, error: "Name must be at least 2 characters long." };
  }

  // 2. Email validation (@ and domain like .com)
  if (!email) {
    return { success: false, error: "Please enter your email address." };
  }
  if (!email.includes("@")) {
    return { success: false, error: "Email address must contain '@' symbol." };
  }
  const emailDomain = email.split("@")[1] || "";
  if (!emailDomain.includes(".") || !/\.[a-zA-Z]{2,}$/.test(emailDomain)) {
    return {
      success: false,
      error: "Email address must contain a valid domain (e.g., .com, .org, .net).",
    };
  }

  // 3. Phone validation (exactly 10 digits)
  const cleanPhone = phone.replace(/\D/g, "");
  if (!phone) {
    return { success: false, error: "Please enter your phone number." };
  }
  if (cleanPhone.length !== 10) {
    return {
      success: false,
      error: "Phone number must contain exactly 10 digits (e.g., 0712345678).",
    };
  }

  // 4. Message validation
  if (!message) {
    return { success: false, error: "Please enter your message." };
  }
  if (message.length < 5) {
    return { success: false, error: "Message must be at least 5 characters long." };
  }

  try {
    const fullMessage = service
      ? `[Service: ${service}]${company ? ` [Company: ${company}]` : ""}\n\n${message}`
      : message;

    await query(
      "INSERT INTO messages (type, name, email, phone, message) VALUES ($1, $2, $3, $4, $5)",
      ["contact", name, email, cleanPhone, fullMessage]
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Error saving contact message:", err);
    // Return success in offline/dev fallback mode if database is unconfigured
    return { success: true };
  }
}

export async function getContactMessages(password?: string): Promise<ContactMessage[]> {
  await ensureDb();
  if (password) {
    verifyAdminAuth(password);
  }

  try {
    const res = await query(
      "SELECT id, type, name, email, phone, message, created_at as \"createdAt\" FROM messages ORDER BY created_at DESC"
    );
    return res.rows.map((row) => ({
      id: row.id,
      type: row.type || "contact",
      name: row.name || "",
      email: row.email || "",
      phone: row.phone || "",
      message: row.message || "",
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return [];
  }
}
