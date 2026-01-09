"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/store";
import { themeClass } from "@/lib/theme";

export default function CardPage() {
  const user = getCurrentUser();
  const [flipped, setFlipped] = useState(false);

  return (
    <AppShell>
      <div className="card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My D-Card</h1>
            <p className="mt-2 text-sm text-white/70">
              Approved users receive an active credential (token). Tap the card to flip.
            </p>
          </div>
          <Link className="btn" href="/admin">Admin</Link>
        </div>

        {!user ? (
          <div className="mt-6 panel">
            <p className="text-white/70">No registration found.</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link className="btn-primary" href="/register">Register</Link>
              <Link className="btn" href="/">Home</Link>
            </div>
          </div>
        ) : user.status !== "approved" ? (
          <div className="mt-6 panel">
            <div className="text-lg font-semibold">Card not active</div>
            <p className="mt-2 text-sm text-white/70">
              Current status: <span className="font-medium text-white">{user.status}</span>.
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link className="btn" href="/status">Status</Link>
              <Link className="btn-primary" href="/admin">Go to Admin</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Wallet flip card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/35 via-emerald-400/35 to-fuchsia-500/35 blur-2xl opacity-40" />

              <div className="relative wallet-perspective">
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setFlipped((s) => !s)}
                  aria-label="Flip D-Card"
                >
                  <div
                    className={[
                      "wallet-card relative rounded-3xl border border-white/15 shadow-2xl shadow-black/50 transition-transform duration-700",
                      flipped ? "rotate-y-180" : "",
                    ].join(" ")}
                    style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                  >
                    {/* FRONT */}
                    <div className={`wallet-face ${themeClass(user.cardTheme)} rounded-3xl p-6`}>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/70">D-Card • {user.universityId}</div>
                        <div className="text-xs text-white/70">Tap to flip</div>
                      </div>

                      <div className="mt-5 flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/15 bg-black/30">
                          {user.photoDataUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={user.photoDataUrl} alt="User" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
                              Photo
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="text-xl font-semibold">{user.name}</div>
                          <div className="mt-1 text-sm text-white/70">
                            {user.role.toUpperCase()} • {user.email}
                          </div>
                          {user.role === "guest" && (
                            <div className="mt-2 text-xs text-white/70">
                              Host: {user.hostName || "—"} • Visit: {user.visitDate || "—"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4">
                        <div className="text-xs text-white/60">Token</div>
                        <div className="mt-1 break-all font-mono text-sm text-white/85">{user.token}</div>
                      </div>

                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
                          <div className="text-xs text-white/60">Issued</div>
                          <div className="mt-1 text-sm text-white/80">
                            {new Date(user.issuedAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
                          <div className="text-xs text-white/60">Expires</div>
                          <div className="mt-1 text-sm text-white/80">
                            {new Date(user.expiresAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="chip">Revocable</span>
                        <span className="chip">Audit Logs</span>
                        <span className="chip">Role-based Access</span>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className={`wallet-face wallet-back absolute inset-0 rounded-3xl p-6 ${themeClass(
                        user.cardTheme
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/70">Access Profile</div>
                        <div className="text-xs text-white/70">Tap to flip back</div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/15 bg-black/30 p-5">
                        <div className="text-sm font-semibold">Default access (demo)</div>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/75 space-y-1">
                          <li>Library: allowed (guest restricted hours)</li>
                          <li>Classrooms: 08:00–20:00 (no guests)</li>
                          <li>Canteen: allowed</li>
                          <li>Labs: policy-based</li>
                          <li>Dorms: student-only</li>
                        </ul>
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/15 bg-black/30 p-5">
                        <div className="text-xs text-white/60">Quick actions</div>
                        <div className="mt-3 grid gap-3">
                          <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=library`}>
                            Tap: Library
                          </Link>
                          <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=classrooms`}>
                            Tap: Classrooms
                          </Link>
                          <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=canteen`}>
                            Tap: Canteen
                          </Link>
                        </div>
                      </div>

                      <div className="mt-5 text-xs text-white/60">
                        Tip: For a real NFC demo later, write the tap URL to a tag using an NFC writer app.
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Tap links panel (kept) */}
            <div className="panel">
              <h2 className="text-lg font-semibold">Tap links (simulate NFC)</h2>
              <p className="mt-2 text-sm text-white/70">
                These links model an NFC deep link a wallet pass would open.
              </p>

              <div className="mt-5 grid gap-3">
                <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=library`}>Tap: Library</Link>
                <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=classrooms`}>Tap: Classrooms</Link>
                <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=canteen`}>Tap: Canteen</Link>
                <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=labs`}>Tap: Labs</Link>
                <Link className="btn" href={`/tap?token=${encodeURIComponent(user.token)}&location=events`}>Tap: Events</Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/terminal">Open Terminal</Link>
                <Link className="btn" href="/status">Status</Link>
                <Link className="btn" href="/">Home</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
