"use client";

import { useEffect, useState } from "react";
import { Codesandbox } from "lucide-react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade out after 700ms, then call onDone after fade completes
    const fadeTimer = setTimeout(() => setFading(true), 700);
    const doneTimer = setTimeout(() => onDone(), 1000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[hsl(var(--background))] transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <Codesandbox
          className="h-10 w-10 text-[hsl(var(--primary))] animate-pulse"
          strokeWidth={1.5}
        />
        <span className="text-lg font-bold tracking-widest text-[hsl(var(--primary))]">
          DPTF
        </span>
      </div>
    </div>
  );
}
