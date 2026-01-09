import type { User } from "@/lib/types";

export function AppleWalletPreview({ user }: { user: User }) {
  return (
    <div className="w-[360px]">
      <div className="rounded-[28px] border border-white/15 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 shadow-2xl shadow-black/60 overflow-hidden">
        {/* top strip */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/70">APPLE WALLET (Replica)</div>
            <div className="text-xs text-white/70">ⓘ</div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-400 to-emerald-300" />
              <div>
                <div className="text-sm font-semibold">{user.universityId}</div>
                <div className="text-xs text-white/60">D-Card</div>
              </div>
            </div>

            <div className="text-xs text-white/60">
              Expires {new Date(user.expiresAt).toLocaleDateString()}
            </div>
          </div>

          {/* primary field */}
          <div className="mt-5">
            <div className="text-[10px] tracking-widest text-white/50">NAME</div>
            <div className="mt-1 text-lg font-semibold">{user.name}</div>
          </div>

          {/* secondary fields */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] tracking-widest text-white/50">ROLE</div>
              <div className="mt-1 text-sm text-white/85">{user.role.toUpperCase()}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-white/50">STATUS</div>
              <div className="mt-1 text-sm text-white/85">{user.status.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* barcode area */}
        <div className="border-t border-white/10 bg-black/35 px-5 py-5">
          <div className="text-[10px] tracking-widest text-white/50">BARCODE</div>

          {/* barcode visual */}
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <div className="h-14 w-full rounded-lg bg-[linear-gradient(to_right,rgba(255,255,255,0.85)_2px,transparent_2px)] bg-[length:6px_100%] opacity-70" />
            <div className="mt-2 break-all font-mono text-[10px] text-white/70">
              {user.token}
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Tap at a reader to validate access (simulated).
          </div>
        </div>
      </div>

      {/* Apple-style info panel */}
      <div className="mt-4 rounded-2xl border border-white/15 bg-black/30 p-4">
        <div className="text-xs text-white/60">Pass Details (Replica)</div>
        <div className="mt-2 text-sm text-white/75">
          Email: {user.email}
        </div>
        <div className="mt-1 text-sm text-white/75">
          Issued: {new Date(user.issuedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
