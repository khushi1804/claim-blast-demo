import { applyAuth, requireAdmin, type RequestLike } from "./middleware/auth.ts";

export function handleAdminPing(raw: RequestLike): { ok: boolean; error?: string } {
  const req = applyAuth(raw);
  if (!requireAdmin(req)) {
    return { ok: false, error: "forbidden" };
  }
  return { ok: true };
}
