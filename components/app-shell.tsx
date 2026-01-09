import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl"
              style={{
                background: "#14F1D9",
                boxShadow: "0 14px 40px rgba(20,241,217,0.18)",
              }}
            />
            <div>
              <div className="text-sm font-semibold leading-none">D-Card</div>
              <div className="text-xs text-white/55">UNI App prototype</div>
            </div>
          </Link>

          <nav className="hidden gap-4 text-sm text-white/70 md:flex">
            <Link className="hover:text-white" href="/register">Register</Link>
            <Link className="hover:text-white" href="/status">Status</Link>
            <Link className="hover:text-white" href="/card">Card</Link>
            <Link className="hover:text-white" href="/terminal">Terminal</Link>
            <Link className="hover:text-white" href="/admin">Admin</Link>
            <Link className="hover:text-white" href="/about">About</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 pb-28 md:pb-14">
        {children}
      </main>

      {/* Persistent signature */}
      <div
        className="fixed right-4 z-40 text-xs select-none"
        style={{
          bottom: "5.5rem",
          color: "rgba(255,255,255,0.45)",
          textShadow: "0 10px 28px rgba(0,0,0,0.6)",
        }}
      >
        Created by <span style={{ color: "rgba(255,255,255,0.78)" }}>Neil Sable</span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          div[style*="bottom: 5.5rem"] { bottom: 1.25rem !important; }
        }
      `}</style>

      {/* Mobile nav */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/35 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-5 px-2 py-2 text-xs text-white/60">
          <Link className="px-2 py-2 text-center hover:text-white" href="/">Home</Link>
          <Link className="px-2 py-2 text-center hover:text-white" href="/register">Reg</Link>
          <Link className="px-2 py-2 text-center hover:text-white" href="/card">Card</Link>
          <Link className="px-2 py-2 text-center hover:text-white" href="/terminal">Tap</Link>
          <Link className="px-2 py-2 text-center hover:text-white" href="/admin">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
