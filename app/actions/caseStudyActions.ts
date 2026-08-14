"use server";

import pool, { query, initDb } from "../../lib/db";
import { revalidatePath } from "next/cache";

export type CaseStudy = {
  id: number;
  number: string;
  category: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  year: string;
  services: string[];
};

// Ensure DB is initialized
async function ensureDb() {
  await initDb();
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  await ensureDb();
  try {
    const res = await query("SELECT * FROM case_studies ORDER BY id DESC");
    return res.rows;
  } catch (err) {
    console.error("Error fetching case studies:", err);
    return [];
  }
}

export async function createCaseStudy(data: Omit<CaseStudy, "id">, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  const { number, category, type, title, subtitle, description, image, year, services } = data;
  await query(
    "INSERT INTO case_studies (number, category, type, title, subtitle, description, image, year, services) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [number, category, type, title, subtitle, description, image, year, services]
  );
  revalidatePath("/case-studies");
  revalidatePath("/admin");
}

export async function updateCaseStudy(id: number, data: Partial<Omit<CaseStudy, "id">>, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  const { number, category, type, title, subtitle, description, image, year, services } = data;
  await query(
    `UPDATE case_studies 
     SET number = COALESCE($1, number), 
         category = COALESCE($2, category), 
         type = COALESCE($3, type), 
         title = COALESCE($4, title), 
         subtitle = COALESCE($5, subtitle), 
         description = COALESCE($6, description), 
         image = COALESCE($7, image), 
         year = COALESCE($8, year), 
         services = COALESCE($9, services) 
     WHERE id = $10`,
    [number, category, type, title, subtitle, description, image, year, services, id]
  );
  revalidatePath("/case-studies");
  revalidatePath("/admin");
}

export async function deleteCaseStudy(id: number, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  await query("DELETE FROM case_studies WHERE id = $1", [id]);
  revalidatePath("/case-studies");
  revalidatePath("/admin");
}
