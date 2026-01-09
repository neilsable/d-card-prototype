import "./globals.css";

export const metadata = {
  title: "D-Card Prototype",
  description: "NFC-enabled Digital University ID (prototype)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-zinc-50 antialiased bg-[#0B0F14] overflow-x-hidden">
        {/* AI-era Aurora Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-[0.18]" />
          <div className="absolute inset-0 aurora" />
          <div className="absolute inset-0 vignette" />
        </div>

        {children}
      </body>
    </html>
  );
}
