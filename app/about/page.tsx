import { AppShell } from "@/components/app-shell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="card">
        <h1 className="text-2xl font-semibold">D-Card — Portfolio Summary</h1>

        <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
          <p>
            <span className="font-medium text-white">Problem:</span> Physical university IDs are easy to forget,
            lose and re-issue. Access and verification systems are fragmented.
          </p>
          <p>
            <span className="font-medium text-white">Solution:</span> D-Card is a wallet-ready digital credential
            supporting campus access (library/classrooms/canteen), identity verification, guest passes and audit trails.
          </p>
          <p>
            <span className="font-medium text-white">Security posture:</span> Terminals validate using a token (no PII at the door).
            Credentials are expirable and revocable. Access is role- and policy-based.
          </p>
          <p>
            <span className="font-medium text-white">Key roles:</span> Student, Staff, Guest (Day Pass), Contractor/Vendor, Alumni.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="panel">
            <h2 className="font-medium text-white">Guest policy (recommended)</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
              <li>Requested ≥ 24 hours prior (host + visit date)</li>
              <li>Valid for a date + time window</li>
              <li>Visitor zones only; no restricted areas</li>
            </ul>
          </div>

          <div className="panel">
            <h2 className="font-medium text-white">MVP services</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
              <li>Compliance approval workflow</li>
              <li>Access control decisions with reasons</li>
              <li>Guest pass issuance</li>
              <li>Audit logs</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
