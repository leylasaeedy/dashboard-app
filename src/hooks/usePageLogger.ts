import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLogsStore } from "@/store/logs.store";

export function usePageLogger(page: string) {
  const addLog = useLogsStore((s) => s.addLog);
  const router = useRouter();
  const lastLoggedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!router.asPath) return;
    if (lastLoggedRef.current === router.asPath) return;

    addLog({ action: "visit", meta: { page, path: router.asPath } });
    lastLoggedRef.current = router.asPath;
  }, [router.asPath, addLog, page]);
}
