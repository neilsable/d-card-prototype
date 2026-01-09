import { Location, Role } from "./types";
import { listUsers } from "./store";

function hourLocal() {
  return new Date().getHours();
}
function isExpired(expiresAtIso: string) {
  return Date.now() > new Date(expiresAtIso).getTime();
}

function baseRoleAllows(role: Role, location: Location) {
  const matrix: Record<Role, Location[]> = {
    student: ["library", "classrooms", "canteen", "labs", "gym", "events", "health", "dorms"],
    staff: ["library", "classrooms", "canteen", "labs", "gym", "events", "health"],
    guest: ["events", "library"], // guest default: limited
    contractor: ["labs"], // demo: service access
    alumni: ["events", "library"],
  };
  return matrix[role].includes(location);
}

export function evaluateAccess(input: { token: string; location: Location }) {
  const token = (input.token || "").trim();
  const location = input.location;

  if (!token || token.length < 8) return { ok: false, reason: "Missing/invalid token." };

  const u = listUsers().find((x) => x.token === token);
  if (!u) return { ok: false, reason: "Token not recognised." };

  if (!u.consent) {
    return { ok: false, reason: "Consent missing. User must accept verification & access logging." };
  }

  if (u.status === "pending") return { ok: false, reason: "Card pending verification (48-hour compliance check)." };
  if (u.status === "rejected") return { ok: false, reason: "Access denied: verification rejected." };
  if (u.status === "revoked") return { ok: false, reason: "Access denied: credential revoked." };
  if (u.status !== "approved") return { ok: false, reason: "Access denied: credential inactive." };

  if (isExpired(u.expiresAt)) return { ok: false, reason: "Access denied: credential expired." };

  if (!baseRoleAllows(u.role, location)) {
    return { ok: false, reason: `Access denied: ${u.role} not authorised for ${location}.` };
  }

  const h = hourLocal();

  // time rules (simple but credible)
  if (location === "classrooms") {
    if (u.role === "guest") return { ok: false, reason: "Guests cannot access classrooms." };
    if (h < 8 || h > 20) return { ok: false, reason: "Classroom access only 08:00–20:00." };
  }

  if (location === "library") {
    if (u.role === "guest" && (h < 9 || h > 17)) {
      return { ok: false, reason: "Guest library entry only 09:00–17:00 (visitor policy)." };
    }
  }

  if (location === "labs") {
    if (u.role === "student" && (h < 9 || h > 18)) return { ok: false, reason: "Student lab access only 09:00–18:00." };
    if (u.role === "contractor" && (h < 8 || h > 18)) return { ok: false, reason: "Contractor access only 08:00–18:00." };
  }

  if (location === "dorms") {
    if (u.role !== "student") return { ok: false, reason: "Dorm access restricted to residents (student role only)." };
    if (h < 6 || h > 23) return { ok: false, reason: "Dorm entry window 06:00–23:00 (demo policy)." };
  }

  return { ok: true, reason: `Access granted for ${u.role} at ${location}.` };
}
