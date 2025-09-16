import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: any;
  }
}

export function useAnalytics(trackingId: string) {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("config", trackingId, {
      page_path: location.pathname + location.search,
    });
  }, [location, trackingId]);
}
