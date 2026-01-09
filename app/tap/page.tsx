import { Suspense } from "react";
import TapClient from "./TapClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function TapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white/70">
          Loading tap result…
        </div>
      }
    >
      <TapClient />
    </Suspense>
  );
}
