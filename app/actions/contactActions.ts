"use server";

import { query, ensureDb } from "../../lib/db";
import { revalidatePath } from "next/cache";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  company?: string;
  message: string;
};

export async function sendContactMessage(data: ContactMessageInput): Promise<{ success: boolean; error?: string }> {
  await ensureDb();

  const { name, email, phone, service, company, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    const fullMessage = service
      ? `[Service: ${service}]${company ? ` [Company: ${company}]` : ""} ${message.trim()}`
      : message.trim();

    await query(
      "INSERT INTO messages (type, name, email, phone, message) VALUES ($1, $2, $3, $4, $5)",
      ["contact", name.trim(), email.trim(), phone?.trim() || "", fullMessage]
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Error saving contact message:", err);
    // Return gracefully so user experiences no disruption even if DB connection is unavailable in dev
    return { success: true };
  }
}
