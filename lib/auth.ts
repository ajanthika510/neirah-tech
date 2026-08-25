/**
 * Admin authorization utility for server actions
 */
export function verifyAdminAuth(adminPassword?: string): void {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword || adminPassword !== expectedPassword) {
    throw new Error("Unauthorized");
  }
}
