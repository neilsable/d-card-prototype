import Link from "next/link";
import { AppShell } from "@/components/app-shell";

const actions = [
  { href: "/register", label: "Register", primary: true, desc: "Create your UNI identity request" },
  { href: "/status", label: "My Status", desc: "Track verification & issuance" },
  { href: "/card", label: "My D-Card", desc: "View token + tap links" },
  { href: "/terminal", label: "Terminal (Tap)", desc: "Simulate campus access checks" },
  { href: "/admin", label: "Admin Portal", desc: "Approve / reject / revoke" },
  { href: "/wallet", label: "Wallet Preview", desc: "Apple + Google UI replicas" },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="card relative overflow-hidden">
        {/* Product Summary as a distinct tile */}
        <div className="absolute right-6 top-6 hidden md:block">
          <Link
            href="/about"
            className="group rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80 transition"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl"
                style={{
                  background: "#14F1D9",
                  boxShadow: "0 14px 35px rgba(20,241,217,0.18)",
                }}
              />
              <div className="leading-tight">
                <div className="font-semibold">Product Summary</div>
                <div className="text-xs text-white/55 group-hover:text-white/70">
                  Architecture · Security · Roles
                </div>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-sm text-white/60">
          UNI App Prototype • Wallet-ready credential (simulated via token + deep link)
        </p>

        {/* Hero */}
        <div className="mt-5">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            <span style={{ color: "#14F1D9" }}>D-Card</span>{" "}
            <span className="text-white/85">— Digital University ID</span>
          </h1>

          <p className="mt-4 max-w-3xl text-white/70 leading-relaxed">
            A secure, mobile-first credential for students, staff, guests and contractors — with compliance
            verification, revocation, role-based access decisions, and audit logging.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/register">Start registration</Link>
            <Link className="btn" href="/wallet">See wallet preview</Link>
            <Link className="btn" href="/terminal">Open terminal</Link>
          </div>
        </div>

        {/* Action grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={a.primary ? "btn-primary" : "btn"}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div className="text-left">
                <div className="font-semibold">{a.label}</div>
                <div className="text-xs opacity-70">{a.desc}</div>
              </div>
              <div className="text-white/60">↗</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-white/60">
          Note: Browser NFC is limited. This prototype demonstrates the production pattern:
          a terminal validates a token and returns an access decision.
        </div>
      </div>
    </AppShell>
  );
}
