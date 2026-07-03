import { useCallback, useEffect, useState } from "react";

const KEY = "safework.completed.v1";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function useCompleted() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setCompleted(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setCompleted(read());
    };
    window.addEventListener("storage", onStorage);
    const onCustom = () => setCompleted(read());
    window.addEventListener("safework:completed-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("safework:completed-change", onCustom);
    };
  }, []);

  const complete = useCallback((id: string) => {
    setCompleted((c) => {
      const next = new Set(c);
      next.add(id);
      write(next);
      window.dispatchEvent(new Event("safework:completed-change"));
      return next;
    });
  }, []);

  return { completed, complete };
}
