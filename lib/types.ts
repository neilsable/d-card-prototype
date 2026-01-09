export type UniversityId = "UCL" | "KCL" | "ICL" | "UNI_DEMO";

export type Role = "student" | "staff" | "guest" | "contractor" | "alumni";
export type Status = "pending" | "approved" | "rejected" | "revoked";

export type Location =
  | "library"
  | "classrooms"
  | "canteen"
  | "labs"
  | "gym"
  | "dorms"
  | "health"
  | "events";

export type CardTheme = "midnight" | "ocean" | "forest" | "sunset" | "violet" | "slate";

export type User = {
  id: string;
  universityId: UniversityId;

  name: string;
  email: string;
  role: Role;
  status: Status;

  photoDataUrl?: string;
  cardTheme: CardTheme;

  // Guest fields
  hostName?: string;
  visitDate?: string; // YYYY-MM-DD

  token: string;
  issuedAt: string; // ISO
  expiresAt: string; // ISO
  consent: boolean;
};

export type AccessLog = {
  ts: string; // ISO
  token: string;
  location: Location;
  ok: boolean;
  reason: string;
};
