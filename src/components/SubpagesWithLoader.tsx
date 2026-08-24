import { useState } from "react";
import Loader from "./Loader";
import { ThemeProvider } from "./theme-provider";

export default function SubpagesWithLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
