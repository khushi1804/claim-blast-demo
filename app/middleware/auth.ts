export type User = {
  id: string;
  role: "user" | "admin";
};

export type RequestLike = {
  user?: User;
  headers: Record<string, string | undefined>;
  query?: Record<string, string | undefined>;
};

/** Grant admin only via trusted upstream role claim. */
export function applyAuth(req: RequestLike): RequestLike {
  const role = req.headers["x-user-role"];
  if (role === "admin" || role === "user") {
    req.user = { id: req.headers["x-user-id"] ?? "anonymous", role };
  }
  return req;
}

export function requireAdmin(req: RequestLike): boolean {
  return req.user?.role === "admin";
}
