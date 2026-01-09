"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/store";

function statusPill(status: string) {
  const base = "inline-flex items-center rounded-full border px-3 py-1 text-xs";
  switch (status) {
    case "approved":
      return `${base} border-emerald-300/30 bg-emerald-400/10 text-emerald-200`;
    case "pending":
      return `${base} border-amber-300/30 bg-amber-400/10 text-amber-200`;
    case "rejected":
      return `${base} border-rose-300/30 bg-rose-400/10 text-rose-200`;
    case "revoked":
      return `${base} border-white/15 bg-white/5 text-white/70`;
    default:
      return `${base} border-white/15 bg-white/5 text-white/70`;
  }
}

export default function StatusPage() {
  const user = getCurrentUser();

  return (
    <AppShell>
      <div className="card">
        <h1 className="text-2xl font-semibold">Verification Status</h1>
        <p className="mt-2 text-sm text-white/70">Use Admin Portal to approve/reject.</p>

        {!user ? (
          <div className="mt-6 panel">
            <p className="text-white/70">No registration found in this browser.</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link className="btn-primary" href="/register">Register</Link>
              <Link className="btn" href="/">Home</Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-white/70">
                  {user.email} • {user.universityId} • {user.role.toUpperCase()}
                </div>
              </div>
              <span className={statusPill(user.status)}>{user.status.toUpperCase()}</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs text-white/60">Step 1</div>
                <div className="mt-1 font-medium">Submitted</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs text-white/60">Step 2</div>
                <div className="mt-1 font-medium">Under Review (≤ 48h)</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs text-white/60">Step 3</div>
                <div className="mt-1 font-medium">{user.status === "approved" ? "Provisioned" : "Decision"}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="btn" href="/admin">Admin</Link>
              <Link className="btn" href="/card">My D-Card</Link>
              <Link className="btn" href="/terminal">Terminal</Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
