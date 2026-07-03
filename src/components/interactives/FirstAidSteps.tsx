import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, Phone, HeartPulse, Activity } from "lucide-react";

const STEPS = [
  { icon: ShieldCheck, title: "Zabezpiecz miejsce", body: "Upewnij się, że Tobie nic nie grozi. Nigdy nie zostań drugą ofiarą zdarzenia." },
  { icon: Activity, title: "Oceń przytomność", body: "Potrząśnij delikatnie i głośno zapytaj: „Czy mnie słyszysz?”. Brak reakcji = osoba nieprzytomna." },
  { icon: HeartPulse, title: "Sprawdź oddech", body: "Udrożnij drogi oddechowe. Patrz, słuchaj, czuj przez 10 sekund — czy klatka piersiowa się unosi?" },
  { icon: Phone, title: "Wezwij pomoc — 112", body: "Podaj lokalizację, liczbę poszkodowanych, co się stało. Nie rozłączaj się pierwszy." },
];

export function FirstAidSteps({ accent }: { accent: string }) {
  const [step, setStep] = useState(0);
  const S = STEPS[step].icon;
  return (
    <div className="rounded-2xl border bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">Łańcuch przeżycia — krok po kroku</h4>
        <span className="text-xs text-muted-foreground">
          {step + 1} / {STEPS.length}
        </span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-xl bg-card border">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-3"
              style={{ background: `color-mix(in oklab, ${accent} 14%, transparent)`, color: accent }}
            >
              <S className="h-6 w-6" />
            </div>
            <p className="font-semibold">{STEPS[step].title}</p>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">{STEPS[step].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" /> Wstecz
        </button>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === step ? 20 : 6,
                background: i === step ? accent : "var(--border)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
        >
          Dalej <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
