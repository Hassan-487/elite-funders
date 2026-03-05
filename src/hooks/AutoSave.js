import { useEffect, useRef } from "react";
import { useFormStore } from "@/store";
import { saveApplication } from "@/services/saveApplication";

export function useAutoSave({
  enabled,
  step,
  delay = 5000,
}) {
  const timerRef = useRef(null);
  const lastSavedRef = useRef(null);

  const store = useFormStore();

  // 🔁 Debounced save
  useEffect(() => {
    if (!enabled) return;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const payload = {
        email: store.aboutYourself?.email,
        lastStep: step,
        data: store,
      };

      // Prevent duplicate saves
      const hash = JSON.stringify(payload);
      if (hash === lastSavedRef.current) return;

      lastSavedRef.current = hash;
      saveApplication(payload);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [store, step, enabled, delay]);


  useEffect(() => {
    if (!enabled) return;

    const handleUnload = () => {
      saveApplication({
        email: store.aboutYourself?.email,
        lastStep: step,
        data: store,
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [store, step, enabled]);
}