import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Zap, FlaskConical, Droplet, CheckCircle2, XCircle } from "lucide-react";

const PAIRS = [
  { id: "A", label: "Pożar ciał stałych (papier, drewno)", correct: "water", icon: Flame },
  { id: "B", label: "Urządzenia pod napięciem", correct: "co2", icon: Zap },
  { id: "C", label: "Ciecze łatwopalne (benzyna, olej)", correct: "foam", icon: FlaskConical },
];
const EXTINGUISHERS = [
  { id: "water", name: "Wodna", color: "oklch(0.65 0.15 230)", Icon: Droplet },
  { id: "co2", name: "Śniegowa CO₂", color: "oklch(0.55 0.05 250)", Icon: Zap },
  { id: "foam", name: "Pianowa", color: "oklch(0.75 0.12 90)", Icon: FlaskConical },
];

export function FireExtinguishersInteractive({ accent }: { accent: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="rounded-2xl border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-sm">Dopasuj gaśnicę do pożaru</h4>
        <span className="text-xs text-muted-foreground">
          {Object.keys(answers).length} / {PAIRS.length}
        </span>
      </div>
      <div className="space-y-3">
        {PAIRS.map((p) => {
          const PI = p.icon;
          const chosen = answers[p.id];
          const correct = chosen === p.correct;
          return (
            <div key={p.id} className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-xl border bg-card p-3">
                <PI className="h-5 w-5 shrink-0" style={{ color: accent }} />
                <span className="text-sm flex-1">{p.label}</span>
                {chosen &&
                  (correct ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ))}
              </div>
              <div className="flex gap-1.5">
                {EXTINGUISHERS.map((e) => {
                  const EI = e.Icon;
                  const sel = chosen === e.id;
                  return (
                    <motion.button
                      key={e.id}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAnswers((a) => ({ ...a, [p.id]: e.id }))}
                      title={e.name}
                      className="h-10 w-10 rounded-lg border flex items-center justify-center transition-colors"
                      style={{
                        background: sel ? `color-mix(in oklab, ${e.color} 18%, transparent)` : "var(--card)",
                        borderColor: sel ? e.color : "var(--border)",
                        color: e.color,
                      }}
                    >
                      <EI className="h-4 w-4" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
