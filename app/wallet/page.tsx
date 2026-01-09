"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/store";
import { AppleWalletPreview } from "@/components/wallet/AppleWalletPreview";
import { GoogleWalletPreview } from "@/components/wallet/GoogleWalletPreview";

export default function WalletPage() {
  const user = getCurrentUser();
  const [mode, setMode] = useState<"apple" | "google">("apple");

  return (
    <AppShell>
      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Wallet Preview</h1>
            <p className="mt-2 text-sm text-white/70">
              High-fidelity UI replica for portfolio demonstration (not real provisioning).
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              className={mode === "apple" ? "btn-primary" : "btn"}
              onClick={() => setMode("apple")}
            >
              Apple Wallet
            </button>
            <button
              className={mode === "google" ? "btn-primary" : "btn"}
              onClick={() => setMode("google")}
            >
              Google Wallet
            </button>
            <Link className="btn" href="/card">
              Back to D-Card
            </Link>
          </div>
        </div>

        {!user ? (
          <div className="mt-6 panel">
            <p className="text-white/70">No user found. Register and approve first.</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link className="btn-primary" href="/register">Register</Link>
              <Link className="btn" href="/admin">Admin</Link>
            </div>
          </div>
        ) : user.status !== "approved" ? (
          <div className="mt-6 panel">
            <p className="text-white/70">
              Your card is not active. Status:{" "}
              <span className="text-white font-medium">{user.status}</span>.
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link className="btn-primary" href="/admin">Approve in Admin</Link>
              <Link className="btn" href="/status">Status</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="panel">
              <div className="text-sm font-semibold text-white">Preview</div>
              <div className="mt-4 flex justify-center">
                {mode === "apple" ? (
                  <AppleWalletPreview user={user} />
                ) : (
                  <GoogleWalletPreview user={user} />
                )}
              </div>
            </div>

            <div className="panel">
              <div className="text-sm font-semibold text-white">Notes (for your portfolio)</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-2">
                <li>
                  This is a UI replica to communicate user experience and information architecture.
                </li>
                <li>
                  Real Apple/Google Wallet provisioning requires issuer onboarding, certificates/keys,
                  pass signing, and platform-specific APIs.
                </li>
                <li>
                  In production, the “token” would be encoded into the barcode/QR payload and validated
                  server-side by campus terminals.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/terminal">Test at Terminal</Link>
                <Link className="btn" href="/tap?location=library&token=">Tap Link Template</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
