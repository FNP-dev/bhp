import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, Footprints, Zap, Package, FlaskConical } from "lucide-react";
import { cn } from "~/lib/utils";

const HAZARDS = [
  {
    id: "slip",
    title: "Poślizgnięcia i upadki",
    icon: Footprints,
    color: "oklch(0.60 0.18 245)",
    causes: ["Mokra podłoga", "Rozsypane materiały", "Niewłaściwe obuwie"],
    prevention: ["Natychmiast wycieraj rozlane płyny", "Sprzątaj kable i dokumenty z podłogi", "Nosz antypoślizgowe obuwie"],
  },
  {
    id: "strike",
    title: "Uderzenia i przygniecenia",
    icon: Package,
    color: "oklch(0.55 0.16 75)",
    causes: ["Niezabezpieczone przedmioty", "Otwarte szuflady", "Materiały na wysokości"],
    prevention: ["Zamykaj szuflady po użyciu", "Składuj ciężkie rzeczy blisko podłogi", "Nie otwieraj górnych drzwi szafek na siłę"],
  },
  {
    id: "electric",
    title: "Zagrożenia elektryczne",
    icon: Zap,
    color: "oklch(0.70 0.20 95)",
    causes: ["Uszkodzone przewody", "Przeciążone gniazdka", "Praca bez uprawnień"],
    prevention: ["Zgłaszaj uszkodzone kable i gniazdka", "Nie używaj wielu rozgałęźników", "Do prac pod napięciem zatrudnij elektryka"],
  },
  {
    id: "chemical",
    title: "Czynniki chemiczne i pyły",
    icon: FlaskConical,
    color: "oklch(0.65 0.16 155)",
    causes: ["Substancje drażniące", "Alergeny", "Pyły organiczne"],
    prevention: ["Czytaj etykiety i stosuj SDS", "Wietrz pomieszczenia", "Używaj środków ochrony indywidualnej"],
  },
];

const CHECKLIST = [
  "Podłoga w moim otoczeniu jest sucha i czysta",
  "Szuflady i drzwi szafek są zamknięte",
  "Kable i przewody nie są uszkodzone ani widocznie przeciążone",
  "Przedmioty na półkach są ustawione stabilnie",
  "Widzę oznaczenia i instrukcje BHP dla substancji chemicznych",
  "Znam numer alarmowy i lokalizację apteczki",
];

const FLOOR_SVG = (
  <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
    <defs>
      <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.60 0.18 245)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="oklch(0.60 0.18 245)" stopOpacity="0.18" />
      </linearGradient>
    </defs>
    <path
      d="M10 90 L190 90 L190 110 L10 110 Z"
      fill="url(#floorGrad)"
      stroke="oklch(0.60 0.18 245)"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    <ellipse cx="60" cy="95" rx="18" ry="4" fill="oklch(0.60 0.18 245)" fillOpacity="0.35" />
    <path d="M55 92 Q58 88 62 92" fill="none" stroke="oklch(0.60 0.18 245)" strokeOpacity="0.7" strokeWidth="1.5" />
    <path d="M60 92 L60 99" stroke="oklch(0.60 0.18 245)" strokeOpacity="0.7" strokeWidth="1.5" />
    <circle cx="60" cy="102" r="2.5" fill="oklch(0.60 0.18 245)" fillOpacity="0.8" />
    <text x="85" y="100" fontSize="9" fill="var(--foreground)" fillOpacity="0.85">mokra podłoga</text>
  </svg>
);

const DRAWER_SVG = (
  <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
    <rect x="70" y="40" width="80" height="60" rx="3" fill="oklch(0.55 0.16 75 / 0.08)" stroke="oklch(0.55 0.16 75)" strokeOpacity="0.35" strokeWidth="1.5" />
    <rect x="75" y="70" width="70" height="25" rx="2" fill="oklch(0.55 0.16 75 / 0.15)" stroke="oklch(0.55 0.16 75)" strokeOpacity="0.5" strokeWidth="1.5" />
    <circle cx="140" cy="82.5" r="2.5" fill="oklch(0.55 0.16 75)" fillOpacity="0.7" />
    <path d="M75 70 L145 70" stroke="oklch(0.55 0.16 75)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="78" y="62" fontSize="9" fill="var(--foreground)" fillOpacity="0.85">otwarta szuflada</text>
  </svg>
);

const SOCKET_SVG = (
  <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
    <rect x="80" y="45" width="40" height="30" rx="3" fill="oklch(0.70 0.20 95 / 0.08)" stroke="oklch(0.70 0.20 95)" strokeOpacity="0.35" strokeWidth="1.5" />
    <circle cx="95" cy="60" r="3" fill="oklch(0.70 0.20 95)" fillOpacity="0.35" />
    <circle cx="105" cy="60" r="3" fill="oklch(0.70 0.20 95)" fillOpacity="0.35" />
    <path
      d="M110 60 C118 55 122 65 128 58"
      fill="none"
      stroke="oklch(0.70 0.20 95)"
      strokeOpacity="0.75"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M128 58 L130 56 M128 58 L130 60" stroke="oklch(0.70 0.20 95)" strokeOpacity="0.75" strokeWidth="2" />
    <text x="70" y="92" fontSize="9" fill="var(--foreground)" fillOpacity="0.85">przeciążone gniazdko</text>
  </svg>
);

const SHELF_SVG = (
  <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
    <rect x="40" y="30" width="120" height="6" rx="1" fill="oklch(0.65 0.16 155 / 0.2)" />
    <rect x="45" y="15" width="25" height="20" rx="2" fill="oklch(0.65 0.16 155 / 0.12)" stroke="oklch(0.65 0.16 155)" strokeOpacity="0.4" strokeWidth="1.5" />
    <rect x="75" y="10" width="30" height="25" rx="2" fill="oklch(0.65 0.16 155 / 0.12)" stroke="oklch(0.65 0.16 155)" strokeOpacity="0.4" strokeWidth="1.5" />
    <rect x="110" y="12" width="22" height="23" rx="2" fill="oklch(0.65 0.16 155 / 0.12)" stroke="oklch(0.65 0.16 155)" strokeOpacity="0.4" strokeWidth="1.5" />
    <path d="M85 10 L90 0 L95 10" fill="oklch(0.65 0.16 155)" fillOpacity="0.7" />
    <text x="70" y="50" fontSize="9" fill="var(--foreground)" fillOpacity="0.85">niebezpieczne składowanie</text>
  </svg>
);

const OFFICE_SVG = (
  <svg viewBox="0 0 400 260" className="w-full h-auto" aria-label="Schemat biura z zaznaczonymi zagrożeniami">
    <defs>
      <linearGradient id="officeBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.03" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.09" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="260" rx="16" fill="url(#officeBg)" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />

    {/* desk */}
    <rect x="60" y="130" width="200" height="80" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    <rect x="70" y="140" width="60" height="40" rx="3" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    <rect x="78" y="150" width="44" height="24" rx="1" fill="currentColor" fillOpacity="0.12" />
    <rect x="150" y="150" width="40" height="30" rx="3" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    <path d="M170 150 L170 180" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
    <path d="M150 165 L190 165" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />

    {/* chair */}
    <path d="M280 170 Q280 140 310 140 Q340 140 340 170 L340 200 L280 200 Z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    <rect x="295" y="200" width="30" height="25" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

    {/* shelf */}
    <rect x="290" y="40" width="80" height="90" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    <rect x="298" y="50" width="30" height="22" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
    <rect x="332" y="48" width="24" height="26" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

    {/* cable on floor */}
    <path d="M90 210 C120 210 130 230 160 230 S220 210 260 230" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 3" />

    {/* hotspot markers */}
    <g transform="translate(85, 230)">
      <circle r="10" fill="oklch(0.60 0.18 245)" fillOpacity="0.15" />
      <circle r="4" fill="oklch(0.60 0.18 245)" />
    </g>
    <g transform="translate(170, 180)">
      <circle r="10" fill="oklch(0.55 0.16 75)" fillOpacity="0.15" />
      <circle r="4" fill="oklch(0.55 0.16 75)" />
    </g>
    <g transform="translate(150, 165)">
      <circle r="10" fill="oklch(0.70 0.20 95)" fillOpacity="0.15" />
      <circle r="4" fill="oklch(0.70 0.20 95)" />
    </g>
    <g transform="translate(320, 60)">
      <circle r="10" fill="oklch(0.65 0.16 155)" fillOpacity="0.15" />
      <circle r="4" fill="oklch(0.65 0.16 155)" />
    </g>
  </svg>
);

export function HazardsCheck({ accent }: { accent?: string }) {
  const [activeTab, setActiveTab] = useState<string>("slip");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scanner, setScanner] = useState<number | null>(null);

  const active = HAZARDS.find((h) => h.id === activeTab) ?? HAZARDS[0];
  const checkProgress = (checked.size / CHECKLIST.length) * 100;

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  };

  const scannerHotspots = [
    { x: 85, y: 230, label: "Kabel na podłodze — ryzyko poślizgnięcia", hazard: "slip", color: HAZARDS[0].color },
    { x: 170, y: 180, label: "Otwarta szuflada — można uderzyć kolanem", hazard: "strike", color: HAZARDS[1].color },
    { x: 150, y: 165, label: "Gniazdko + sprzęt — zagrożenie elektryczne", hazard: "electric", color: HAZARDS[2].color },
    { x: 320, y: 60, label: "Półki wysoko — ryzyko przygniecenia", hazard: "chemical", color: HAZARDS[3].color },
  ];

  const sceneSvgs: Record<string, ReactNode> = {
    slip: FLOOR_SVG,
    strike: DRAWER_SVG,
    electric: SOCKET_SVG,
    chemical: SHELF_SVG,
  };

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-md)]">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
            style={{
              background: `color-mix(in oklab, ${accent ?? "var(--primary)"} 14%, transparent)`,
              color: accent ?? "var(--primary)",
            }}
          >
            <AlertTriangle className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Zagrożenia wokół Ciebie</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Większość wypadków w biurze nie wynika z brawury, lecz z niezauważonego, codziennego ryzyka. Kliknij
              każdą kartę, aby nauczyć się rozpoznawać je na własnym stanowisku.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {HAZARDS.map((h) => {
            const Icon = h.icon;
            const selected = activeTab === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setActiveTab(h.id)}
                className={cn(
                  "text-left rounded-xl border p-4 transition-all hover:shadow-[var(--shadow-md)]",
                  selected ? "bg-surface-elevated border-primary/40 ring-1 ring-primary/20" : "bg-card border-border hover:bg-muted/40",
                )}
              >
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg mb-3"
                  style={{ background: `color-mix(in oklab, ${h.color} 14%, transparent)`, color: h.color }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h4 className="text-sm font-semibold leading-tight">{h.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{h.causes.join(" · ")}</p>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in oklab, ${active.color} 14%, transparent)`, color: active.color }}
              >
                <active.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="font-semibold">{active.title}</h4>
                <p className="text-xs text-muted-foreground">Przyczyny najczęstszych zdarzeń</p>
              </div>
            </div>
            <div className="space-y-2 mb-5">
              {active.causes.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-foreground/85">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: active.color }} />
                  {c}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-success/20 bg-success/10 p-4">
              <h5 className="text-xs font-semibold text-foreground mb-2">Jak zapobiegać?</h5>
              <ul className="space-y-2">
                {active.prevention.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 shrink-0 text-success mt-0.5" strokeWidth={2} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-sm)] flex flex-col">
            <h4 className="font-semibold mb-1">Wizualizacja zagrożenia</h4>
            <p className="text-xs text-muted-foreground mb-4">Kliknij kartę, by zobaczyć typowy przykład w biurze.</p>
            <div className="flex-1 min-h-[200px] text-foreground/80 flex items-center justify-center">{sceneSvgs[active.id]}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-md)]">
        <h3 className="text-lg font-semibold mb-2">Interaktywny skaner biura</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Kliknij kolorowe punkty na schemacie, aby sprawdzić, które zagrożenie kryje się w danym miejscu.
        </p>
        <div className="relative">
          <div className="text-foreground/80">{OFFICE_SVG}</div>
          {scannerHotspots.map((spot, i) => (
            <button
              key={i}
              onClick={() => setScanner(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${(spot.x / 400) * 100}%`, top: `${(spot.y / 260) * 100}%` }}
              aria-label={spot.label}
            >
              <span
                className="block h-8 w-8 rounded-full animate-pulse-ring"
                style={{ background: `color-mix(in oklab, ${spot.color} 20%, transparent)` }}
              />
              <span className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full" style={{ background: spot.color }} />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {scanner !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: `color-mix(in oklab, ${scannerHotspots[scanner].color} 40%, transparent)`, background: `color-mix(in oklab, ${scannerHotspots[scanner].color} 8%, transparent)` }}
              >
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: scannerHotspots[scanner].color }}>
                  <AlertTriangle className="h-4 w-4" />
                  {scannerHotspots[scanner].label}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-md)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Samokontrola stanowiska</h3>
            <p className="text-sm text-muted-foreground">Zaznacz punkty, które już sprawdziłeś przed rozpoczęciem pracy.</p>
          </div>
          <div className="text-right min-w-[120px]">
            <div className="text-2xl font-bold tracking-tight">{Math.round(checkProgress)}%</div>
            <div className="text-xs text-muted-foreground">{checked.size} / {CHECKLIST.length}</div>
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-5">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${checkProgress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHECKLIST.map((item, i) => {
            const done = checked.has(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                  done ? "border-success/30 bg-success/8" : "border-border bg-surface hover:bg-muted/40",
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors mt-0.5",
                    done ? "bg-success border-success" : "border-border bg-card",
                  )}
                >
                  {done && <Check className="h-3.5 w-3.5 text-success-foreground" strokeWidth={2.5} />}
                </div>
                <span className={cn("text-sm", done ? "text-success-foreground/90" : "text-foreground/85")}>{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
