import type { User } from "@/lib/types";

export function GoogleWalletPreview({ user }: { user: User }) {
  return (
    <div className="w-[360px]">
      <div className="rounded-[24px] border border-white/15 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 shadow-2xl shadow-black/60 overflow-hidden">
        {/* header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/70">GOOGLE WALLET (Replica)</div>
            <div className="text-xs text-white/70">⋮</div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-fuchsia-400" />
            <div>
              <div className="text-sm font-semibold">{user.universityId}</div>
              <div className="text-xs text-white/60">Digital ID • D-Card</div>
            </div>
          </div>
        </div>

        {/* main body */}
        <div className="px-5 pb-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] tracking-widest text-white/50">NAME</div>
            <div className="mt-1 text-lg font-semibold">{user.name}</div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] tracking-widest text-white/50">ROLE</div>
                <div className="mt-1 text-sm text-white/85">{user.role.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest text-white/50">EXPIRES</div>
                <div className="mt-1 text-sm text-white/85">
                  {new Date(user.expiresAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] tracking-widest text-white/50">TOKEN</div>
              <div className="mt-1 break-all font-mono text-[11px] text-white/75">
                {user.token}
              </div>
            </div>
          </div>

          {/* QR area */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] tracking-widest text-white/50">QR</div>
              <div className="text-xs text-white/60">Show code</div>
            </div>

            <div className="mt-3 grid place-items-center rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="h-28 w-28 rounded-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_2px,transparent_2px),linear-gradient(rgba(255,255,255,0.85)_2px,transparent_2px)] bg-[size:10px_10px] opacity-60" />
              <div className="mt-2 text-[10px] text-white/60">
                (QR visual replica)
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-center text-xs text-white/70">
              Add to Home
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-center text-xs text-white/70">
              Share pass
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/15 bg-black/30 p-4">
        <div className="text-xs text-white/60">Details (Replica)</div>
        <div className="mt-2 text-sm text-white/75">Email: {user.email}</div>
        <div className="mt-1 text-sm text-white/75">
          Issued: {new Date(user.issuedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
