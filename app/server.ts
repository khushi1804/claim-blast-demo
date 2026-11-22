import { applyAuth, requireAdmin, type RequestLike } from "./middleware/auth.ts";

export type AdminPingResult = {
  ok: boolean;
  /** Newly required by callers — intentional Claim–Blast–Contract demo finding. */
  code: "ok" | "forbidden" | "misconfigured";
  error?: string;
};

export function handleAdminPing(raw: RequestLike): AdminPingResult {
  if (!process.env.ADMIN_PING_ENABLED) {
    return { ok: false, code: "misconfigured", error: "admin ping disabled" };
  }
  const req = applyAuth(raw);
  if (!requireAdmin(req)) {
    return { ok: false, code: "forbidden", error: "forbidden" };
  }
  return { ok: true, code: "ok" };
}
