"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { addLog } from "@/lib/store";
import { evaluateAccess } from "@/lib/rules";
import { Location } from "@/lib/types";

export default function TapPage() {
  const sp = useSearchParams();
  const token = (sp.get("token") || "").trim();
  const location = (sp.get("location") || "library") as Location;

  const decision = evaluateAccess({ token, location });

  // log once per session visit
  if (typeof window !== "undefined") {
    const key = `dcard_tap_logged_${token}_${location}_${sp.toString()}`;
    if (!sessionStorage.getItem(key)) {
      addLog({
        ts: new Date().toISOString(),
        token,
        location,
        ok: decision.ok,
        reason: decision.reason,
      });
      sessionStorage.setItem(key, "1");
    }
  }

  return (
    <AppShell>
      <div className="card max-w-3xl">
        <h1 className="text-2xl font-semibold">Tap Result</h1>
        <p className="mt-2 text-sm text-white/70">Simulates an NFC deep link opened after a tap.</p>

        <div className="mt-6 panel">
          <div className={`text-lg font-semibold ${decision.ok ? "text-emerald-200" : "text-rose-200"}`}>
            {decision.ok ? "Access Granted" : "Access Denied"}
          </div>
          <div className="mt-3 text-sm text-white/70">
            Location: <span className="text-white">{location}</span>
          </div>
          <div className="mt-2 text-sm text-white/70">{decision.reason}</div>

          <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4">
            <div className="text-xs text-white/60">Token</div>
            <div className="mt-1 break-all font-mono text-xs text-white/85">{token || "(empty)"}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/terminal">Go to Terminal</Link>
          <Link className="btn" href="/card">My D-Card</Link>
          <Link className="btn" href="/">Home</Link>
        </div>
      </div>
    </AppShell>
  );
}
