"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  approveUser,
  rejectUser,
  revokeUser,
  listUsers,
  issueGuestPass,
  clearAllDemoData,
  setCurrentUser,
} from "@/lib/store";

export default function AdminPage() {
  const [refresh, setRefresh] = useState(0);
  const users = useMemo(() => listUsers(), [refresh]);

  return (
    <AppShell>
      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Portal</h1>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Approve to activate token, reject to deny issuance, revoke to disable access instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn" onClick={() => { issueGuestPass(); setRefresh((x) => x + 1); }}>
              Issue Guest Day Pass
            </button>
            <button className="btn" onClick={() => setRefresh((x) => x + 1)}>Refresh</button>
            <button
              className="btn"
              onClick={() => {
                if (confirm("Clear all demo data?")) {
                  clearAllDemoData();
                  setRefresh((x) => x + 1);
                }
              }}
            >
              Clear demo data
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {users.length === 0 ? (
            <div className="panel">
              <p className="text-white/70">No users yet. Register first.</p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <Link className="btn-primary" href="/register">Register</Link>
                <Link className="btn" href="/">Home</Link>
              </div>
            </div>
          ) : (
            users.slice().reverse().map((u) => (
              <div key={u.id} className="panel">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">
                      {u.name} <span className="text-white/60 font-normal">({u.role})</span>
                    </div>
                    <div className="text-sm text-white/70">{u.email} • {u.universityId}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="chip">Status: {u.status}</span>
                    <span className="chip">Expires: {new Date(u.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {u.role === "guest" && (
                  <div className="mt-3 text-sm text-white/70">
                    Host: <span className="text-white">{u.hostName || "—"}</span> • Visit:{" "}
                    <span className="text-white">{u.visitDate || "—"}</span>
                  </div>
                )}

                <div className="mt-3 rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Token</div>
                  <div className="mt-1 break-all font-mono text-sm text-white/85">{u.token}</div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="btn-primary" onClick={() => { approveUser(u.id); setRefresh((x) => x + 1); }}>
                    Approve
                  </button>
                  <button className="btn" onClick={() => { rejectUser(u.id); setRefresh((x) => x + 1); }}>
                    Reject
                  </button>
                  <button className="btn" onClick={() => { revokeUser(u.id); setRefresh((x) => x + 1); }}>
                    Revoke
                  </button>
                  <button className="btn" onClick={() => { setCurrentUser(u.id); alert("Set as current user on this browser."); }}>
                    Set as “My User”
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn" href="/">Home</Link>
          <Link className="btn" href="/status">Status</Link>
          <Link className="btn" href="/card">My D-Card</Link>
          <Link className="btn" href="/terminal">Terminal</Link>
        </div>
      </div>
    </AppShell>
  );
}
