import { motion } from "framer-motion";
import {
  Bell,
  DoorOpen,
  MapPin,
  ClipboardCheck,
  Ban,
  Phone,
  Footprints,
  Users,
  AlertCircle,
  Check,
  ArrowRight,
  PersonStanding,
  Building2,
  Flame,
} from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    Icon: Bell,
    title: "Usłysz alarm",
    body: "Zachowaj spokój. Postępuj zgodnie z komunikatami służb i osób odpowiedzialnych.",
    tone: "alert",
  },
  {
    Icon: DoorOpen,
    title: "Opuść budynek",
    body: "Najbliższym wyjściem ewakuacyjnym. Nie korzystaj z wind. Pomagaj osobom, które potrzebują wsparcia.",
    tone: "action",
  },
  {
    Icon: MapPin,
    title: "Kieruj się do miejsca zbiórki",
    body: "Udaj się wyznaczoną drogą ewakuacyjną do miejsca zbiórki oznaczonego na mapie.",
    tone: "action",
  },
  {
    Icon: ClipboardCheck,
    title: "Zamelduj się",
    body: "Po przybyciu zgłoś swoją obecność osobie odpowiedzialnej za ewakuację.",
    tone: "action",
  },
  {
    Icon: Ban,
    title: "Nie wracaj",
    body: "Nie wracaj do budynku, dopóki nie otrzymasz informacji od służb ratowniczych.",
    tone: "danger",
  },
];

const SAFETY_RULES = [
  "Nie zatrzymuj się, nie rób zdjęć.",
  "Nie blokuj dróg ewakuacyjnych.",
  "Słuchaj poleceń osób odpowiedzialnych.",
  "Pozostań na miejscu zbiórki do odwołania.",
];

const REMINDERS = [
  {
    Icon: Users,
    title: "Twoje bezpieczeństwo i innych jest najważniejsze.",
  },
  {
    Icon: AlertCircle,
    title: "Zwracaj uwagę na oznakowanie ewakuacyjne.",
  },
  {
    Icon: Flame,
    title: "W razie pożaru nie używaj wind – korzystaj ze schodów.",
  },
];

export function AssemblyPoint({ accent }: { accent: string }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  };

  const progress = Math.round((checked.size / SAFETY_RULES.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="overflow-hidden rounded-2xl border border-[oklch(0.62_0.16_145)]/40 bg-gradient-to-r from-[oklch(0.35_0.10_145)] to-[oklch(0.45_0.14_145)] text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">Miejsce zbiórki w razie ewakuacji</h3>
              <p className="text-xs md:text-sm text-white/85 mt-0.5">
                W razie ogłoszenia ewakuacji opuść budynek zgodnie z instrukcjami i udaj się do miejsca zbiórki.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
              <Phone className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="text-[10px] uppercase tracking-wide text-white/70">Telefony alarmowe</p>
              <p className="font-bold text-lg leading-none">112</p>
              <p className="text-xs text-white/85">Straż Pożarna</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 steps + map */}
      <div className="grid lg:grid-cols-[360px_1fr] gap-5">
        {/* Steps column */}
        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const SIcon = step.Icon;
            const tone = step.tone;
            const toneClasses =
              tone === "alert"
                ? "bg-red-600 text-white"
                : tone === "danger"
                ? "bg-red-600/90 text-white"
                : "bg-[oklch(0.62_0.16_145)] text-white";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 rounded-xl border bg-card p-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toneClasses}`}>
                    <SIcon className="h-4 w-4" />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border min-h-[16px]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    <span className="text-[oklch(0.62_0.16_145)] mr-1">{i + 1}.</span>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map / diagram */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border bg-card p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
                Plan dojścia do miejsca zbiórki
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Budynek biurowy — trasa ewakuacyjna z głównego wyjścia na punkt zbiórki.
              </p>
            </div>
            <span className="text-[10px] rounded-full bg-[oklch(0.62_0.16_145)]/10 text-[oklch(0.35_0.12_145)] px-2 py-1 font-semibold">
              parking zachodni
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border bg-[oklch(0.55_0.06_145)]/10">
            {/* Ground / trees */}
            <svg className="absolute inset-0 w-full h-full" aria-hidden>
              <defs>
                <pattern id="trees" width="24%" height="24%" patternUnits="userSpaceOnUse">
                  <circle cx="18" cy="18" r="8" fill="currentColor" className="text-[oklch(0.55_0.12_145)]/20" />
                  <circle cx="10" cy="32" r="6" fill="currentColor" className="text-[oklch(0.55_0.12_145)]/16" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#trees)" />
            </svg>

            {/* Road on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-[18%] bg-[oklch(0.55_0.05_60)]/20 border-r border-[oklch(0.55_0.05_60)]/30">
              <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 border-r-2 border-dashed border-[oklch(0.55_0.05_60)]/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[9px] font-semibold tracking-widest text-[oklch(0.45_0.08_60)]/60 uppercase whitespace-nowrap">
                ul. Przykładowa
              </div>
            </div>

            {/* Building */}
            <div className="absolute left-[28%] top-[12%] right-[18%] bottom-[18%] rounded-lg bg-[oklch(0.55_0.05_250)]/30 border-2 border-[oklch(0.55_0.05_250)]/40 shadow-sm flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2 opacity-60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded-sm bg-[oklch(0.55_0.05_250)]/30" />
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.62_0.16_145)] text-white px-2 py-1 text-[10px] font-semibold shadow-md flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Biurowiec
              </div>
            </div>

            {/* Main exit */}
            <div className="absolute left-[28%] top-[62%] h-8 w-8 -translate-x-1/2 rounded-full bg-[oklch(0.62_0.16_145)] text-white flex items-center justify-center shadow-md z-10">
              <DoorOpen className="h-4 w-4" />
            </div>

            {/* Animated evacuation route */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 L0,0" fill="oklch(0.62 0.16 145)" />
                </marker>
              </defs>
              <motion.path
                d="M 28% 62% L 18% 62% L 18% 82% L 30% 82%"
                fill="none"
                stroke="oklch(0.62 0.16 145)"
                strokeWidth="4"
                strokeDasharray="8 6"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Assembly point */}
            <motion.div
              className="absolute left-[30%] top-[82%] -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white/50">
                  <Users className="h-6 w-6" />
                </div>
                <div className="mt-1.5 rounded-md bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold shadow-md">
                  Miejsce zbiórki
                </div>
              </div>
            </motion.div>

            {/* Walking people along the route */}
            <motion.div
              className="absolute left-[22%] top-[62%]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 shadow-sm border">
                <PersonStanding className="h-4 w-4 text-[oklch(0.62_0.16_145)]" />
                <PersonStanding className="h-4 w-4 text-[oklch(0.62_0.16_145)]" />
                <ArrowRight className="h-3 w-3 text-[oklch(0.62_0.16_145)]" />
              </div>
            </motion.div>
          </div>

          {/* Legend */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-[oklch(0.62_0.16_145)] text-white flex items-center justify-center">
                <DoorOpen className="h-3 w-3" />
              </div>
              <span className="text-muted-foreground">Wyjście ewakuacyjne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-[oklch(0.62_0.16_145)]/20 border border-[oklch(0.62_0.16_145)] flex items-center justify-center">
                <div className="w-3 border-b-2 border-dashed border-[oklch(0.62_0.16_145)]" />
              </div>
              <span className="text-muted-foreground">Droga ewakuacyjna</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-red-600 text-white flex items-center justify-center">
                <Users className="h-3 w-3" />
              </div>
              <span className="text-muted-foreground">Miejsce zbiórki</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Safety rules + reminders + responsible person */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Safety rules checklist */}
        <div className="rounded-2xl border bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Footprints className="h-4 w-4" style={{ color: accent }} />
              Zasady bezpieczeństwa
            </h4>
            <span className="text-[10px] font-semibold rounded-full bg-[oklch(0.62_0.16_145)]/10 text-[oklch(0.35_0.12_145)] px-2 py-0.5">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-muted mb-4 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[oklch(0.62_0.16_145)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-2">
            {SAFETY_RULES.map((rule, i) => {
              const isChecked = checked.has(i);
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`w-full flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    isChecked ? "bg-[oklch(0.62_0.16_145)]/8 border-[oklch(0.62_0.16_145)]/40" : "bg-card hover:bg-muted"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked ? "bg-[oklch(0.62_0.16_145)] border-[oklch(0.62_0.16_145)]" : "border-border"
                    }`}
                  >
                    {isChecked && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <span className={`text-sm ${isChecked ? "text-foreground" : "text-muted-foreground"}`}>{rule}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {/* Reminders */}
          <div className="rounded-2xl border bg-surface p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" style={{ color: accent }} />
              Pamiętaj!
            </h4>
            <div className="grid sm:grid-cols-3 gap-3">
              {REMINDERS.map((r, i) => {
                const RIcon = r.Icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-2 rounded-xl border bg-card p-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.62_0.16_145)] text-white">
                      <RIcon className="h-5 w-5" />
                    </div>
                    <p className="text-xs leading-snug">{r.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Responsible person */}
          <div className="rounded-2xl border bg-surface p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: accent }} />
              Osoba odpowiedzialna
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.62_0.16_145)] text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Koordynator BHP / osoba wyznaczona</p>
                  <p className="text-xs text-muted-foreground">Sprawdza obecność i raportuje do JRG.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border bg-card p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Imię i nazwisko</p>
                  <p className="text-sm font-semibold mt-1">_________________</p>
                </div>
                <div className="rounded-xl border bg-card p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Telefon</p>
                  <p className="text-sm font-semibold mt-1">_________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assembly point details */}
      <div className="rounded-2xl border bg-surface p-5">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" style={{ color: accent }} />
          Miejsce zbiórki
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Parking od strony zachodniej</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Czerwony kwadrat na mapie. Pozostań na miejscu zbiórki do czasu zakończenia akcji lub otrzymania
                wyraźnego komunikatu od służb ratowniczych.
              </p>
            </div>
          </div>
          <div className="space-y-2 rounded-xl border bg-card p-4 text-sm">
            <p className="font-semibold">Kto ma się stawić?</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[oklch(0.62_0.16_145)]" /> Wszyscy pracownicy
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[oklch(0.62_0.16_145)]" /> Goście i kontrahenci
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[oklch(0.62_0.16_145)]" /> Kurierzy i ekipy serwisowe
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[oklch(0.62_0.16_145)]" /> Osoby przebywające w budynku w momencie alarmu
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
