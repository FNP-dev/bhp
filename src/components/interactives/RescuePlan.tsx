import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Users,
  DoorOpen,
  ArrowRight,
  Flame,
  Phone,
  Ban,
  Car,
  Footprints,
  ShieldAlert,
  Siren,
  AlertOctagon,
  HeartPulse,
  Wind,
  PowerOff,
  Droplet,
} from "lucide-react";

type Floor = {
  level: number;
  name: string;
  occupants: string;
  stairs: { x: number; y: number; label: string }[];
  rop: { x: number; y: number }[];
  ext: { x: number; y: number }[];
  hyd: { x: number; y: number }[];
  exit: { x: number; y: number; label: string };
};

const FLOORS: Floor[] = [
  {
    level: 3,
    name: "Piętro 2 — Zarząd, sale konferencyjne",
    occupants: "~24 os.",
    stairs: [
      { x: 12, y: 50, label: "KL-A" },
      { x: 88, y: 50, label: "KL-B" },
    ],
    rop: [{ x: 18, y: 22 }, { x: 82, y: 78 }],
    ext: [{ x: 30, y: 30 }, { x: 70, y: 70 }, { x: 50, y: 50 }],
    hyd: [{ x: 50, y: 18 }],
    exit: { x: 12, y: 50, label: "Schody A — kierunek główny" },
  },
  {
    level: 2,
    name: "Piętro 1 — Open space, dział IT",
    occupants: "~48 os.",
    stairs: [
      { x: 12, y: 50, label: "KL-A" },
      { x: 88, y: 50, label: "KL-B" },
    ],
    rop: [{ x: 20, y: 78 }, { x: 80, y: 22 }],
    ext: [{ x: 28, y: 28 }, { x: 72, y: 28 }, { x: 28, y: 72 }, { x: 72, y: 72 }],
    hyd: [{ x: 50, y: 50 }],
    exit: { x: 88, y: 50, label: "Schody B — kierunek alternatywny" },
  },
  {
    level: 1,
    name: "Parter — Recepcja, kawiarnia",
    occupants: "~32 os.",
    stairs: [
      { x: 12, y: 50, label: "KL-A" },
      { x: 88, y: 50, label: "KL-B" },
    ],
    rop: [{ x: 50, y: 22 }],
    ext: [{ x: 25, y: 50 }, { x: 75, y: 50 }],
    hyd: [{ x: 50, y: 78 }],
    exit: { x: 50, y: 92, label: "Wyjście główne na parking" },
  },
  {
    level: 0,
    name: "Poziom −1 — Parking, archiwum",
    occupants: "~10 os.",
    stairs: [
      { x: 12, y: 50, label: "KL-A" },
      { x: 88, y: 50, label: "KL-B" },
    ],
    rop: [{ x: 50, y: 50 }],
    ext: [{ x: 30, y: 40 }, { x: 70, y: 60 }],
    hyd: [{ x: 20, y: 20 }],
    exit: { x: 50, y: 92, label: "Brama wjazdowa / rampa" },
  },
];

const SIGNS = [
  { Icon: DoorOpen, name: "Wyjście ewakuacyjne", color: "oklch(0.62 0.16 145)", kind: "Ewakuacyjny" },
  { Icon: ArrowRight, name: "Kierunek drogi ewakuacyjnej", color: "oklch(0.62 0.16 145)", kind: "Ewakuacyjny" },
  { Icon: Users, name: "Miejsce zbiórki", color: "oklch(0.62 0.16 145)", kind: "Ewakuacyjny" },
  { Icon: Flame, name: "Gaśnica", color: "oklch(0.60 0.22 27)", kind: "Pożarowy" },
  { Icon: Droplet, name: "Hydrant wewnętrzny", color: "oklch(0.60 0.22 27)", kind: "Pożarowy" },
  { Icon: Siren, name: "Ręczny ostrzegacz pożarowy", color: "oklch(0.60 0.22 27)", kind: "Pożarowy" },
  { Icon: Phone, name: "Telefon alarmowy", color: "oklch(0.60 0.22 27)", kind: "Pożarowy" },
  { Icon: PowerOff, name: "Wyłącznik prądu PPOŻ", color: "oklch(0.60 0.22 27)", kind: "Pożarowy" },
  { Icon: HeartPulse, name: "Apteczka pierwszej pomocy", color: "oklch(0.62 0.16 145)", kind: "Ewakuacyjny" },
  { Icon: Ban, name: "Zakaz używania wind", color: "oklch(0.60 0.22 27)", kind: "Zakaz" },
  { Icon: AlertOctagon, name: "Ostrzeżenie — materiał palny", color: "oklch(0.78 0.15 75)", kind: "Ostrzegawczy" },
  { Icon: Wind, name: "Klapa oddymiająca", color: "oklch(0.55 0.05 250)", kind: "Techniczny" },
];

const RULES = [
  {
    Icon: Footprints,
    title: "Trzymaj drogi ewakuacyjne drożne",
    body: "Korytarze, klatki schodowe i drzwi przeciwpożarowe muszą być wolne — nie zastawiaj ich szafkami, krzesłami, kartonami ani rowerami.",
  },
  {
    Icon: Ban,
    title: "Nigdy windą podczas pożaru",
    body: "W razie alarmu używaj wyłącznie schodów ewakuacyjnych. Windy mogą zostać zablokowane lub stać się komorą dymową.",
  },
  {
    Icon: DoorOpen,
    title: "Zamykaj drzwi przeciwpożarowe",
    body: "Po przejściu przez drzwi PPOŻ zawsze je zamknij — ograniczają rozprzestrzenianie się ognia i dymu o nawet 60 minut.",
  },
  {
    Icon: Car,
    title: "Dojazd pożarowy = strefa zakazu",
    body: "Oznakowane dojazdy pożarowe oraz miejsca dla wozów strażackich muszą być wolne 24/7. Zaparkowany samochód = zablokowana akcja ratunkowa.",
  },
  {
    Icon: MapPin,
    title: "Idź do wyznaczonego punktu zbiórki",
    body: "Po opuszczeniu budynku stawiamy się w punkcie zbiórki (parking od strony zachodniej). Nie wracaj do biura po rzeczy — koordynator BHP musi policzyć obecnych.",
  },
  {
    Icon: ShieldAlert,
    title: "Alternatywna droga ewakuacji",
    body: "Jeśli główna klatka jest zadymiona — natychmiast skieruj się na drugą klatkę. Każde piętro ma minimum dwa niezależne wyjścia.",
  },
];

export function RescuePlanInteractive({ accent }: { accent: string }) {
  const [active, setActive] = useState<Floor>(FLOORS[2]);

  return (
    <div className="space-y-6">
      {/* === RESCUE PLAN === */}
      <div className="rounded-2xl border bg-surface p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4" style={{ color: accent }} />
              Zakładowy plan ratowniczy — biurowiec 4-poziomowy
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Wybierz poziom, aby zobaczyć rozmieszczenie wyjść, gaśnic, hydrantów i ROP.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-[140px_1fr] gap-4">
          {/* floor selector */}
          <div className="flex md:flex-col gap-2 overflow-x-auto">
            {FLOORS.map((f) => {
              const sel = active.level === f.level;
              return (
                <button
                  key={f.level}
                  onClick={() => setActive(f)}
                  className="text-left rounded-xl border px-3 py-2 transition-colors shrink-0 md:shrink"
                  style={{
                    background: sel ? `color-mix(in oklab, ${accent} 12%, transparent)` : "var(--card)",
                    borderColor: sel ? accent : "var(--border)",
                  }}
                >
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Poziom
                  </div>
                  <div className="text-sm font-semibold">
                    {f.level === 0 ? "−1" : f.level === 1 ? "0" : f.level - 1}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 hidden md:block">
                    {f.occupants}
                  </div>
                </button>
              );
            })}
          </div>

          {/* floor map */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.level}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border bg-card p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{active.name}</p>
                <span className="text-[11px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {active.occupants}
                </span>
              </div>

              <div
                className="relative w-full aspect-[16/9] rounded-lg overflow-hidden"
                style={{ background: "color-mix(in oklab, var(--muted) 70%, transparent)" }}
              >
                {/* grid */}
                <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id="grid" width="5%" height="8%" patternUnits="userSpaceOnUse">
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* corridors */}
                <div className="absolute top-1/2 left-[12%] right-[12%] h-[14%] -translate-y-1/2 rounded bg-card/80 border border-dashed" />
                <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[10%] -translate-x-1/2 rounded bg-card/80 border border-dashed" />

                {/* stairs */}
                {active.stairs.map((s, i) => (
                  <Marker key={`s${i}`} x={s.x} y={s.y} color="oklch(0.55 0.05 250)" label={s.label}>
                    <Building2 className="h-3.5 w-3.5" />
                  </Marker>
                ))}
                {/* ROP */}
                {active.rop.map((p, i) => (
                  <Marker key={`r${i}`} x={p.x} y={p.y} color="oklch(0.60 0.22 27)" label="ROP">
                    <Siren className="h-3.5 w-3.5" />
                  </Marker>
                ))}
                {/* extinguishers */}
                {active.ext.map((p, i) => (
                  <Marker key={`e${i}`} x={p.x} y={p.y} color="oklch(0.65 0.20 30)" label="Gaśnica">
                    <Flame className="h-3.5 w-3.5" />
                  </Marker>
                ))}
                {/* hydrants */}
                {active.hyd.map((p, i) => (
                  <Marker key={`h${i}`} x={p.x} y={p.y} color="oklch(0.55 0.15 230)" label="Hydrant">
                    <Droplet className="h-3.5 w-3.5" />
                  </Marker>
                ))}

                {/* main exit arrow */}
                <motion.div
                  className="absolute"
                  style={{ left: `${active.exit.x}%`, top: `${active.exit.y}%`, transform: "translate(-50%,-50%)" }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.08, 1], opacity: 1 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-1 rounded-full bg-[oklch(0.62_0.16_145)] text-white px-2.5 py-1 shadow-[var(--shadow-md)]">
                    <DoorOpen className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold whitespace-nowrap">{active.exit.label}</span>
                  </div>
                </motion.div>
              </div>

              {/* legend */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                <LegendDot color="oklch(0.55 0.05 250)" Icon={Building2} label="Klatka schodowa" />
                <LegendDot color="oklch(0.60 0.22 27)" Icon={Siren} label="ROP" />
                <LegendDot color="oklch(0.65 0.20 30)" Icon={Flame} label="Gaśnica" />
                <LegendDot color="oklch(0.55 0.15 230)" Icon={Droplet} label="Hydrant" />
                <LegendDot color="oklch(0.62 0.16 145)" Icon={DoorOpen} label="Wyjście" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* assembly point */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[oklch(0.62_0.16_145)]/30 bg-[oklch(0.62_0.16_145)]/8 p-4">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.62_0.16_145)] text-white">
            <Users className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Punkt zbiórki — parking zachodni, ~40 m od wyjścia głównego</p>
            <p className="text-muted-foreground mt-0.5 leading-relaxed">
              Tu kierują się <strong>wszyscy pracownicy oraz osoby trzecie</strong> (goście, kurierzy, ekipy
              serwisowe) po ogłoszeniu ewakuacji. Koordynator BHP weryfikuje obecność z listy gości z
              recepcji i raportuje brakujących dowódcy akcji JRG.
            </p>
          </div>
        </div>
      </div>

      {/* === RULES === */}
      <div className="rounded-2xl border bg-surface p-5">
        <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Footprints className="h-4 w-4" style={{ color: accent }} />
          Zasady użytkowania dróg ewakuacji i dojazdów pożarowych
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {RULES.map((r, i) => {
            const RI = r.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-3 rounded-xl border bg-card p-3"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${accent} 12%, transparent)`, color: accent }}
                >
                  <RI className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === SAFETY SIGNS === */}
      <div className="rounded-2xl border bg-surface p-5">
        <div className="mb-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" style={{ color: accent }} />
            Oznakowanie bezpieczeństwa
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Znaki BHP i PPOŻ to uniwersalny język bezpieczeństwa zgodny z normą <strong>PN-EN ISO 7010</strong>.
            Zielone — ewakuacyjne i pierwszej pomocy. Czerwone — sprzęt PPOŻ i zakazy. Żółte — ostrzegawcze.
            Niebieskie — nakazy. Naucz się rozpoznawać je na pierwszy rzut oka.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {SIGNS.map((s, i) => {
            const SI = s.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
                className="rounded-xl border bg-card p-3 flex flex-col items-center text-center"
              >
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: s.color, color: "white" }}
                >
                  <SI className="h-6 w-6" strokeWidth={2} />
                </div>
                <p className="text-[11px] font-semibold leading-tight">{s.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.kind}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Marker({
  x,
  y,
  color,
  label,
  children,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
    >
      <div
        className="h-7 w-7 rounded-md flex items-center justify-center text-white shadow-[var(--shadow-sm)] ring-2 ring-card"
        style={{ background: color }}
        title={label}
      >
        {children}
      </div>
    </div>
  );
}

function LegendDot({
  color,
  Icon,
  label,
}: {
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-4 w-4 rounded inline-flex items-center justify-center text-white"
        style={{ background: color }}
      >
        <Icon className="h-2.5 w-2.5" />
      </span>
      {label}
    </span>
  );
}
