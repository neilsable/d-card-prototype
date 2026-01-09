"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Select } from "@/components/Select";
import { addLog, listLogs } from "@/lib/store";
import { evaluateAccess } from "@/lib/rules";
import { Location } from "@/lib/types";

export default function TerminalPage() {
  const [location, setLocation] = useState<Location>("library");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<{ ok: boolean; reason: string } | null>(null);

  const logs = useMemo(() => listLogs().slice().reverse(), [result]);

  return (
    <AppShell>
      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Campus Terminal (Tap Simulator)</h1>
            <p className="mt-2 text-sm text-white/70">
              Validates a token and logs every attempt (audit trail).
            </p>
          </div>
          <Link className="btn" href="/card">My D-Card</Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="panel">
            <div className="label">Terminal location</div>
            <Select<Location>
              value={location}
              onChange={setLocation}
              ariaLabel="Terminal location"
              options={[
                { value: "library", label: "Library" },
                { value: "classrooms", label: "Classrooms", hint: "08:00–20:00" },
                { value: "canteen", label: "Canteen" },
                { value: "labs", label: "Labs", hint: "Policy-based" },
                { value: "gym", label: "Gym" },
                { value: "dorms", label: "Dorms", hint: "Students only" },
                { value: "health", label: "Health Centre" },
                { value: "events", label: "Events" },
              ]}
            />

            <div className="mt-4 label">Card token</div>
            <input
              className="field font-mono"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste token from My D-Card"
            />

            <button
              className="btn-primary mt-5 w-full"
              onClick={() => {
                const decision = evaluateAccess({ token, location });
                setResult(decision);
                addLog({
                  ts: new Date().toISOString(),
                  token: token.trim(),
                  location,
                  ok: decision.ok,
                  reason: decision.reason,
                });
              }}
            >
              Tap / Verify
            </button>

            {result && (
              <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className={`text-lg font-semibold ${result.ok ? "text-emerald-200" : "text-rose-200"}`}>
                  {result.ok ? "Access Granted" : "Access Denied"}
                </div>
                <div className="mt-2 text-sm text-white/70">{result.reason}</div>
              </div>
            )}
          </div>

          <div className="panel">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Audit Log</h2>
              <span className="chip">Last 25</span>
            </div>

            <div className="mt-4 space-y-3">
              {logs.length === 0 ? (
                <div className="text-sm text-white/70">No logs yet.</div>
              ) : (
                logs.slice(0, 25).map((l, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`text-sm font-semibold ${l.ok ? "text-emerald-200" : "text-rose-200"}`}>
                        {l.ok ? "GRANTED" : "DENIED"}
                      </div>
                      <div className="text-xs text-white/60">{new Date(l.ts).toLocaleString()}</div>
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      Location: <span className="text-white">{l.location}</span>
                    </div>
                    <div className="mt-1 text-xs text-white/60 break-all font-mono">
                      Token: {l.token || "(empty)"}
                    </div>
                    <div className="mt-2 text-sm text-white/70">{l.reason}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn" href="/admin">Admin</Link>
              <Link className="btn" href="/status">Status</Link>
              <Link className="btn" href="/">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
