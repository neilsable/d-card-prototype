import { AccessLog, CardTheme, Role, UniversityId, User } from "./types";

const LS_USERS = "dcard_users_v3";
const LS_CURRENT = "dcard_current_user_id_v3";
const LS_LOGS = "dcard_logs_v3";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function genToken() {
  return `DCARD_${Math.random().toString(36).slice(2, 10).toUpperCase()}_${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

function loadUsers(): User[] {
  if (typeof window === "undefined") return [];
  return safeParse<User[]>(localStorage.getItem(LS_USERS), []);
}
function saveUsers(users: User[]) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function loadLogs(): AccessLog[] {
  if (typeof window === "undefined") return [];
  return safeParse<AccessLog[]>(localStorage.getItem(LS_LOGS), []);
}
function saveLogs(logs: AccessLog[]) {
  localStorage.setItem(LS_LOGS, JSON.stringify(logs));
}

export function listUsers() {
  return loadUsers();
}

export function setCurrentUser(userId: string) {
  localStorage.setItem(LS_CURRENT, userId);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem(LS_CURRENT);
  if (!id) return null;
  return loadUsers().find((u) => u.id === id) || null;
}

function computeExpiry(role: Role, guestVisitDate?: string) {
  const now = new Date();

  if (role === "guest") {
    if (guestVisitDate) {
      // treat as local end-of-day for demo
      const end = new Date(`${guestVisitDate}T23:59:59`);
      return end.toISOString();
    }
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return d.toISOString();
  }

  if (role === "contractor") {
    const d = new Date(now);
    d.setDate(d.getDate() + 30);
    return d.toISOString();
  }

  if (role === "alumni") {
    const d = new Date(now);
    d.setDate(d.getDate() + 180);
    return d.toISOString();
  }

  const d = new Date(now);
  d.setDate(d.getDate() + 365);
  return d.toISOString();
}

export function createUser(input: {
  universityId: UniversityId;
  name: string;
  email: string;
  role: Role;
  cardTheme: CardTheme;
  photoDataUrl?: string;
  hostName?: string;
  visitDate?: string;
  consent: boolean;
}) {
  const users = loadUsers();
  const now = new Date().toISOString();

  const u: User = {
    id: uid("user"),
    universityId: input.universityId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    role: input.role,
    status: "pending",
    photoDataUrl: input.photoDataUrl,
    cardTheme: input.cardTheme,
    hostName: input.hostName?.trim(),
    visitDate: input.visitDate,
    token: genToken(),
    issuedAt: now,
    expiresAt: computeExpiry(input.role, input.visitDate),
    consent: input.consent,
  };

  users.push(u);
  saveUsers(users);
  setCurrentUser(u.id);
  return u;
}

function updateUser(id: string, patch: Partial<User>) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return;
  users[idx] = { ...users[idx], ...patch };
  saveUsers(users);
}

export function approveUser(id: string) {
  updateUser(id, { status: "approved" });
}
export function rejectUser(id: string) {
  updateUser(id, { status: "rejected" });
}
export function revokeUser(id: string) {
  updateUser(id, { status: "revoked" });
}

export function issueGuestPass(input?: { universityId?: UniversityId; hostName?: string; visitDate?: string }) {
  const u = createUser({
    universityId: input?.universityId ?? "UNI_DEMO",
    name: "Guest Visitor",
    email: `guest.${Math.random().toString(16).slice(2, 6)}@demo.uni`,
    role: "guest",
    cardTheme: "slate",
    hostName: input?.hostName ?? "Campus Reception",
    visitDate: input?.visitDate,
    consent: true,
  });
  approveUser(u.id);
  return u;
}

export function addLog(l: AccessLog) {
  if (typeof window === "undefined") return;
  const logs = loadLogs();
  logs.push(l);
  saveLogs(logs);
}
export function listLogs() {
  return loadLogs();
}

export function clearAllDemoData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_USERS);
  localStorage.removeItem(LS_CURRENT);
  localStorage.removeItem(LS_LOGS);
}
