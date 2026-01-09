"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Select } from "@/components/Select";

import { createUser } from "@/lib/store";
import { CardTheme, Role, UniversityId } from "@/lib/types";
import { isUnder2MB, isValidEmail, isValidName } from "@/lib/validation";
import { themeClass, themeLabel } from "@/lib/theme";

export default function RegisterPage() {
  const [universityId, setUniversityId] = useState<UniversityId>("UCL");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("student");

  const [hostName, setHostName] = useState("");
  const [visitDate, setVisitDate] = useState("");

  const [cardTheme, setCardTheme] = useState<CardTheme>("midnight");
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");

  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const emailOk = useMemo(() => isValidEmail(email), [email]);
  const nameOk = useMemo(() => isValidName(name), [name]);

  const guestOk =
    role !== "guest" ||
    (hostName.trim().length >= 2 && visitDate.trim().length === 10);

  const photoOk = role === "guest" ? true : Boolean(photoDataUrl);
  const canSubmit = nameOk && emailOk && guestOk && photoOk && consent;

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------------- FORM ---------------- */}
        <div className="card">
          <h1 className="text-2xl font-semibold">Register (UNI App)</h1>
          <p className="mt-2 text-sm text-white/70">
            Submit details for compliance verification (≤ 48 hours).
          </p>

          {submitted ? (
            <div className="mt-6 panel">
              <div className="text-lg font-semibold">Submitted</div>
              <p className="mt-2 text-sm text-white/70">
                Your application is pending admin approval.
              </p>
              <div className="mt-4 flex gap-3">
                <Link href="/status" className="btn-primary">
                  View Status
                </Link>
                <Link href="/admin" className="btn">
                  Admin
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!canSubmit) return;

                createUser({
                  universityId,
                  name,
                  email,
                  role,
                  cardTheme,
                  photoDataUrl: photoDataUrl || undefined,
                  hostName: role === "guest" ? hostName : undefined,
                  visitDate: role === "guest" ? visitDate : undefined,
                  consent,
                });

                setSubmitted(true);
              }}
            >
              {/* University */}
              <div>
                <div className="label">University</div>
                <Select
                  value={universityId}
                  onChange={(v) => setUniversityId(v as UniversityId)}
                  options={[
                    { value: "UCL", label: "UCL" },
                    { value: "KCL", label: "KCL" },
                    { value: "ICL", label: "Imperial" },
                    { value: "UNI_DEMO", label: "UNI Demo" },
                  ]}
                />
              </div>

              {/* Name */}
              <div>
                <div className="label">Full name</div>
                <input
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                {!nameOk && name && (
                  <div className="mt-1 text-xs text-rose-300">
                    Enter a valid name (min 2 characters).
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="label">Email</div>
                <input
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.ac.uk"
                />
                {!emailOk && email && (
                  <div className="mt-1 text-xs text-rose-300">
                    Enter a valid email address.
                  </div>
                )}
              </div>

              {/* Role */}
              <div>
                <div className="label">Role</div>
                <Select
                  value={role}
                  onChange={(v) => setRole(v as Role)}
                  options={[
                    { value: "student", label: "Student" },
                    { value: "staff", label: "Staff" },
                    { value: "guest", label: "Guest (Day Pass)" },
                    { value: "contractor", label: "Contractor / Vendor" },
                    { value: "alumni", label: "Alumni" },
                  ]}
                />
              </div>

              {/* Guest fields */}
              {role === "guest" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="label">Host / Sponsor</div>
                    <input
                      className="field"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      placeholder="Host name"
                    />
                  </div>
                  <div>
                    <div className="label">Visit date</div>
                    <input
                      type="date"
                      className="field"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Card Theme */}
              <div>
                <div className="label">Card theme</div>
                <Select
                  value={cardTheme}
                  onChange={(v) => setCardTheme(v as CardTheme)}
                  options={[
                    { value: "midnight", label: "Midnight" },
                    { value: "ocean", label: "Ocean" },
                    { value: "forest", label: "Forest" },
                    { value: "sunset", label: "Sunset" },
                    { value: "violet", label: "Violet" },
                    { value: "slate", label: "Slate" },
                  ]}
                />
              </div>

              {/* Photo */}
              <div>
                <div className="label">Upload photo (JPG / PNG, max 2MB)</div>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="field"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!isUnder2MB(file)) {
                      alert("Max file size is 2MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () =>
                      setPhotoDataUrl(String(reader.result));
                    reader.readAsDataURL(file);
                  }}
                />
              </div>

              {/* Consent */}
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-black/30 p-4">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <p className="text-sm text-white/70">
                  I consent to verification and access logging for security.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={
                  canSubmit
                    ? "btn-primary w-full"
                    : "btn w-full opacity-50 cursor-not-allowed"
                }
              >
                Submit for verification
              </button>
            </form>
          )}
        </div>

        {/* ---------------- CARD PREVIEW ---------------- */}
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live D-Card Preview</h2>
            <span className="chip">{themeLabel(cardTheme)}</span>
          </div>

          <div
            className={`mt-6 rounded-3xl p-6 border border-white/15 shadow-2xl ${themeClass(
              cardTheme
            )}`}
          >
            <div className="text-xs text-white/70">
              D-Card • {universityId}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/15 bg-black/30">
                {photoDataUrl ? (
                  <img
                    src={photoDataUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
                    Photo
                  </div>
                )}
              </div>

              <div>
                <div className="text-xl font-semibold">
                  {name || "Your Name"}
                </div>
                <div className="text-sm text-white/70">
                  {role.toUpperCase()} • {email || "email@uni.ac.uk"}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/15 bg-black/30 p-4">
              <div className="text-xs text-white/60">Token</div>
              <div className="font-mono text-sm text-white/80">
                DCARD_XXXX_XXXX
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
