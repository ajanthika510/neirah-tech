"use server";

import pool, { query, initDb } from "../../lib/db";
import { revalidatePath } from "next/cache";

export type Project = {
  id: number;
  title: string;
  category: string;
  country: string;
  countryCode: string;
  status: string;
  website: string;
  description: string;
};

// Ensure DB is initialized
async function ensureDb() {
  await initDb();
}

export async function getProjects(): Promise<Project[]> {
  await ensureDb();
  try {
    const res = await query("SELECT id, title, category, country, country_code as \"countryCode\", status, website, description FROM projects ORDER BY id DESC");
    return res.rows;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export async function createProject(data: Omit<Project, "id">, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  const { title, category, country, countryCode, status, website, description } = data;
  await query(
    "INSERT INTO projects (title, category, country, country_code, status, website, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [title, category, country, countryCode, status, website, description]
  );
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function updateProject(id: number, data: Partial<Omit<Project, "id">>, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  const { title, category, country, countryCode, status, website, description } = data;
  await query(
    `UPDATE projects 
     SET title = COALESCE($1, title), 
         category = COALESCE($2, category), 
         country = COALESCE($3, country), 
         country_code = COALESCE($4, country_code), 
         status = COALESCE($5, status), 
         website = COALESCE($6, website), 
         description = COALESCE($7, description) 
     WHERE id = $8`,
    [title, category, country, countryCode, status, website, description, id]
  );
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function deleteProject(id: number, adminPassword?: string) {
  await ensureDb();
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }

  await query("DELETE FROM projects WHERE id = $1", [id]);
  revalidatePath("/projects");
  revalidatePath("/admin");
}
