"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logFirebaseEvent } from "@/lib/firebase";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = window.location.search;
      logFirebaseEvent("page_view", {
        page_path: pathname,
        page_search: searchParams,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return <>{children}</>;
}
