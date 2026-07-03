import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertOctagon,
  Armchair,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Clock,
  Coffee,
  Eye,
  Footprints,
  HandMetal,
  HelpCircle,
  Lightbulb,
  Monitor,
  MoveVertical,
  PackageOpen,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Trophy,
  User,
  Waves,
  Zap,
} from "lucide-react";

/* ============================================================ */
/*  1. DLACZEGO ERGONOMIA JEST WAŻNA                            */
/* ============================================================ */
function WhyErgonomics({ accent }: { accent: string }) {
  const benefits = [
    { icon: Activity, title: "Mniej bólu", desc: "i dolegliwości mięśniowych", tone: "oklch(0.60 0.22 27)" },
    { icon: TrendingUp, title: "Większy komfort", desc: "codziennej pracy", tone: "oklch(0.62 0.16 155)" },
    { icon: Zap, title: "Wyższa wydajność", desc: "i lepsza koncentracja", tone: "oklch(0.55 0.20 250)" },
    { icon: ShieldCheck, title: "Mniejsze ryzyko", desc: "absencji i kontuzji", tone: "oklch(0.72 0.16 65)" },
  ];
  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={1} title="Dlaczego ergonomia jest ważna?" accent={accent} />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => {
            const I = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border bg-card p-3"
              >
                <div
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `color-mix(in oklab, ${b.tone} 15%, transparent)`, color: b.tone }}
                >
                  <I className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="md:col-span-2 rounded-2xl p-5 text-white flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 60%, black))` }}>
          <div className="flex items-center gap-2 text-xs font-semibold opacity-90">
            <User className="h-4 w-4" /> Ważna statystyka
          </div>
          <div className="mt-2">
            <div className="text-5xl font-bold tracking-tight">80%</div>
            <p className="mt-1 text-sm opacity-90 leading-snug">
              osób doświadcza bólu pleców, szyi lub nadgarstków z powodu pracy.
            </p>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs">
            <HelpCircle className="h-3.5 w-3.5" /> A Ty — kiedy ostatnio?
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  2. NAJCZĘSTSZE BŁĘDY (SVG icons)                            */
/* ============================================================ */
function BadPostureIcon({ variant }: { variant: "low" | "hunched" | "twisted" | "chair" | "wrists" | "lift" }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (variant) {
    case "low":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <circle cx="30" cy="22" r="6" {...common} />
          <path d="M30 28 L30 48 M22 36 L38 36 M26 48 L26 62 M34 48 L34 62" {...common} />
          <rect x="55" y="45" width="30" height="18" rx="1.5" {...common} />
          <path d="M70 63 L70 68 M62 68 L78 68" {...common} />
          <path d="M32 20 L58 50" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
        </svg>
      );
    case "hunched":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <circle cx="42" cy="24" r="6" {...common} />
          <path d="M42 30 Q46 42 52 46 L60 50" {...common} />
          <path d="M52 46 L52 62 M46 62 L58 62" {...common} />
          <rect x="65" y="30" width="24" height="16" rx="1.5" {...common} />
          <path d="M77 46 L77 50 M70 50 L84 50" {...common} />
        </svg>
      );
    case "twisted":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <circle cx="48" cy="20" r="6" {...common} />
          <path d="M48 26 L48 46 M40 32 L60 34 M42 46 L42 62 M54 46 L54 62" {...common} />
          <path d="M40 28 Q30 22 24 30" stroke="oklch(0.60 0.22 27)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M22 28 L24 30 L26 27" stroke="oklch(0.60 0.22 27)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "chair":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <circle cx="40" cy="18" r="5" {...common} />
          <path d="M40 23 L40 40 M34 30 L46 30 M36 40 L36 56 M44 40 L44 56" {...common} />
          <path d="M55 44 L70 44 L70 60 M55 44 L55 60 M55 60 L70 60" {...common} />
          <path d="M78 30 L78 60" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" markerEnd="url(#arrDown)" />
          <path d="M78 30 L74 34 M78 30 L82 34 M78 60 L74 56 M78 60 L82 56" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "wrists":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <rect x="12" y="46" width="72" height="8" rx="2" {...common} />
          <path d="M28 46 Q34 30 44 36" {...common} />
          <path d="M60 46 Q66 30 74 36" {...common} />
          <path d="M40 24 L46 30 M42 22 L48 28" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" fill="none" />
          <path d="M70 22 L76 28 M72 20 L78 26" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "lift":
      return (
        <svg viewBox="0 0 96 72" className="h-16 w-full text-foreground/70">
          <circle cx="30" cy="16" r="5" {...common} />
          <path d="M30 21 Q34 34 44 40 L52 44" {...common} />
          <path d="M44 40 L44 56 M38 56 L50 56" {...common} />
          <rect x="52" y="40" width="20" height="16" rx="1.5" {...common} />
          <path d="M20 8 L20 22 M16 12 L20 8 L24 12 M20 60 L20 46 M16 56 L20 60 L24 56" stroke="oklch(0.60 0.22 27)" strokeWidth="1.4" fill="none" />
        </svg>
      );
  }
}

function CommonMistakes({ accent }: { accent: string }) {
  const items = [
    { v: "low" as const, label: "Monitor ustawiony za nisko" },
    { v: "hunched" as const, label: "Garbienie się" },
    { v: "twisted" as const, label: "Skręcanie tułowia" },
    { v: "chair" as const, label: "Źle ustawione krzesło" },
    { v: "wrists" as const, label: "Niewłaściwa pozycja nadgarstków" },
    { v: "lift" as const, label: "Nieprawidłowe podnoszenie" },
  ];
  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={2} title="Najczęstsze błędy" accent={accent} />
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="relative rounded-xl border bg-card p-3"
          >
            <div className="absolute top-2 right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
              ✕
            </div>
            <BadPostureIcon variant={it.v} />
            <p className="mt-2 text-xs font-medium text-center leading-tight">{it.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  3. ZASADY ERGONOMII — hotspot diagram                       */
/* ============================================================ */
function ErgoDiagram({ accent }: { accent: string }) {
  const [active, setActive] = useState<number | null>(1);
  const rules = [
    { n: 1, x: 62, y: 20, title: "Monitor na wysokości oczu", desc: "Odległość 50–70 cm, górna krawędź na linii wzroku." },
    { n: 2, x: 40, y: 42, title: "Proste plecy", desc: "Oparcie podtrzymuje odcinek lędźwiowy." },
    { n: 3, x: 55, y: 52, title: "Przedramiona oparte", desc: "Kąt w łokciach ok. 90°." },
    { n: 4, x: 70, y: 55, title: "Nadgarstki neutralne", desc: "Bez zginania w górę ani w dół." },
    { n: 5, x: 44, y: 72, title: "Kolana ok. 90°", desc: "Uda równolegle do podłogi." },
    { n: 6, x: 52, y: 88, title: "Stopy oparte", desc: "Na podłodze lub podnóżku." },
  ];

  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={3} title="Zasady ergonomii" accent={accent} />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="md:col-span-3 relative rounded-2xl border bg-card overflow-hidden">
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success-foreground px-2.5 py-1 text-[10px] font-semibold">
            <Monitor className="h-3 w-3" /> PRACA PRZY KOMPUTERZE
          </div>
          <svg viewBox="0 0 100 110" className="w-full aspect-[10/11]">
            {/* floor */}
            <line x1="0" y1="100" x2="100" y2="100" stroke="oklch(0.85 0.01 280)" strokeWidth="0.6" />
            {/* desk */}
            <rect x="55" y="55" width="42" height="2.5" fill="oklch(0.70 0.03 280)" />
            <rect x="56" y="57" width="1.5" height="30" fill="oklch(0.70 0.03 280)" />
            <rect x="94.5" y="57" width="1.5" height="30" fill="oklch(0.70 0.03 280)" />
            {/* monitor */}
            <rect x="66" y="22" width="26" height="18" rx="1.2" fill="oklch(0.30 0.03 280)" />
            <rect x="68" y="24" width="22" height="14" rx="0.5" fill="oklch(0.55 0.14 220)" />
            <rect x="77" y="40" width="4" height="6" fill="oklch(0.30 0.03 280)" />
            <rect x="72" y="46" width="14" height="1.5" fill="oklch(0.30 0.03 280)" />
            {/* chair back */}
            <path d="M28 42 Q26 60 30 82 L38 82 Q40 60 38 42 Z" fill="oklch(0.30 0.03 280)" />
            {/* seat */}
            <rect x="30" y="78" width="22" height="4" rx="1" fill="oklch(0.30 0.03 280)" />
            {/* chair stem */}
            <rect x="40" y="82" width="2" height="12" fill="oklch(0.30 0.03 280)" />
            <path d="M30 96 L52 96" stroke="oklch(0.30 0.03 280)" strokeWidth="1.5" />
            {/* person */}
            {/* head */}
            <circle cx="40" cy="30" r="5.5" fill="oklch(0.85 0.05 60)" />
            <path d="M35 26 Q40 22 45 26 L45 30 Q40 22 35 30 Z" fill="oklch(0.30 0.06 40)" />
            {/* torso */}
            <path d="M34 36 Q34 55 36 74 L46 74 Q48 55 46 36 Z" fill={accent} opacity="0.85" />
            {/* arm to desk */}
            <path d="M46 42 Q56 46 62 54" stroke="oklch(0.85 0.05 60)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* leg */}
            <path d="M40 74 L40 94" stroke="oklch(0.30 0.06 260)" strokeWidth="4" strokeLinecap="round" />
            <path d="M46 74 L48 94" stroke="oklch(0.30 0.06 260)" strokeWidth="4" strokeLinecap="round" />
            {/* foot */}
            <path d="M36 96 L44 96" stroke="oklch(0.20 0.03 40)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46 96 L54 96" stroke="oklch(0.20 0.03 40)" strokeWidth="2.5" strokeLinecap="round" />

            {/* hotspots */}
            {rules.map((r) => (
              <g key={r.n} onMouseEnter={() => setActive(r.n)} onClick={() => setActive(r.n)} className="cursor-pointer">
                <circle cx={r.x} cy={r.y} r={active === r.n ? 4 : 3} fill={accent} opacity={active === r.n ? 1 : 0.85}>
                  {active === r.n && (
                    <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
                  )}
                </circle>
                <text x={r.x} y={r.y + 1.4} textAnchor="middle" fontSize="3.2" fill="white" fontWeight="700">{r.n}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className="md:col-span-2 space-y-2">
          {rules.map((r) => {
            const on = active === r.n;
            return (
              <button
                key={r.n}
                onMouseEnter={() => setActive(r.n)}
                onClick={() => setActive(r.n)}
                className="w-full flex items-start gap-3 rounded-xl border bg-card p-3 text-left transition-all"
                style={on ? { borderColor: accent, boxShadow: `0 0 0 3px color-mix(in oklab, ${accent} 15%, transparent)` } : undefined}
              >
                <div
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: on ? accent : `color-mix(in oklab, ${accent} 15%, transparent)`, color: on ? "white" : accent }}
                >
                  {r.n}
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">{r.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Praca fizyczna */}
      <div className="mt-5 rounded-2xl border bg-card p-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success-foreground px-2.5 py-1 text-[10px] font-semibold mb-3">
          <PackageOpen className="h-3 w-3" /> PRACA FIZYCZNA
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: MoveVertical, t: "Podnoś z nóg", d: "nie z pleców — uginaj kolana" },
            { icon: Waves, t: "Unikaj skrętów", d: "z obciążeniem — ustaw się bokiem" },
            { icon: HandMetal, t: "Organizuj stanowisko", d: "trzymaj rzeczy w zasięgu rąk" },
          ].map((p, i) => {
            const I = p.icon;
            return (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <I className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{p.t}</div>
                  <div className="text-xs text-muted-foreground">{p.d}</div>
                </div>
                <BadgeCheck className="h-4 w-4 text-success ml-auto shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  4. ĆWICZENIE PRAKTYCZNE — checklist                         */
/* ============================================================ */
const CHECKS = [
  { icon: Monitor, label: "Czy monitor jest na wysokości oczu?" },
  { icon: Armchair, label: "Czy plecy opierają się o oparcie krzesła?" },
  { icon: Footprints, label: "Czy stopy są oparte o podłogę?" },
  { icon: HandMetal, label: "Czy przedramiona są oparte?" },
  { icon: Waves, label: "Czy nadgarstki są w pozycji neutralnej?" },
  { icon: Clock, label: "Czy często zmieniam pozycję?" },
  { icon: Coffee, label: "Czy robię krótkie przerwy?" },
];

function PracticalCheck({ accent }: { accent: string }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((d) => {
      const n = new Set(d);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  const pct = Math.round((done.size / CHECKS.length) * 100);

  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={4} title="Ćwiczenie praktyczne" accent={accent} sub="Oceń swoje stanowisko" />
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full" style={{ background: accent }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
        <span className="text-xs font-semibold tabular-nums" style={{ color: accent }}>{pct}%</span>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {CHECKS.map((c, i) => {
          const ok = done.has(i);
          const I = c.icon;
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left text-sm hover:bg-muted/40 transition-colors"
              style={ok ? { borderColor: accent } : undefined}
            >
              <I className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className={`flex-1 ${ok ? "line-through text-muted-foreground" : ""}`}>{c.label}</span>
              {ok ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: accent }} />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent/50 px-3 py-2 text-xs text-accent-foreground">
        <Lightbulb className="h-4 w-4" /> Zaznacz, co możesz poprawić już dziś!
      </div>
    </div>
  );
}

/* ============================================================ */
/*  5. MIKROPAUZY I ĆWICZENIA — animowane                       */
/* ============================================================ */
function ExerciseIcon({ variant }: { variant: "neck" | "shoulders" | "wrists" | "twist" }) {
  const stroke = "currentColor";
  const c = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const arrow = "oklch(0.62 0.16 155)";
  switch (variant) {
    case "neck":
      return (
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-foreground/70">
          <circle cx="30" cy="22" r="7" {...c} />
          <path d="M30 29 L30 44 M22 34 L38 34" {...c} />
          <path d="M22 18 Q14 22 16 30" stroke={arrow} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M14 28 L16 30 L18 27" stroke={arrow} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case "shoulders":
      return (
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-foreground/70">
          <circle cx="30" cy="20" r="6" {...c} />
          <path d="M30 26 L30 46 M22 32 L38 32" {...c} />
          <path d="M22 32 L18 20 M38 32 L42 20" {...c} />
          <path d="M18 16 L18 10 M14 14 L18 10 L22 14" stroke={arrow} strokeWidth="1.6" fill="none" />
          <path d="M42 16 L42 10 M38 14 L42 10 L46 14" stroke={arrow} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case "wrists":
      return (
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-foreground/70">
          <path d="M12 40 L30 40 L36 32" {...c} />
          <path d="M36 32 L44 24" {...c} />
          <path d="M40 18 L44 24 L38 26" stroke={arrow} strokeWidth="1.6" fill="none" />
          <path d="M14 46 L30 46 L36 52" {...c} />
          <path d="M40 54 L36 52 L42 48" stroke={arrow} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case "twist":
      return (
        <svg viewBox="0 0 60 60" className="h-14 w-14 text-foreground/70">
          <circle cx="30" cy="18" r="6" {...c} />
          <path d="M30 24 L30 44 M22 30 L38 30 M26 44 L26 54 M34 44 L34 54" {...c} />
          <path d="M40 28 Q48 24 46 34" stroke={arrow} strokeWidth="1.6" fill="none" />
          <path d="M48 32 L46 34 L44 31" stroke={arrow} strokeWidth="1.6" fill="none" />
        </svg>
      );
  }
}

function Microbreaks({ accent }: { accent: string }) {
  const exercises = [
    { v: "neck" as const, t: "Delikatnie przechyl głowę w bok", d: "Przytrzymaj 15–20 s na każdą stronę." },
    { v: "shoulders" as const, t: "Unieś ramiona do góry", d: "Przytrzymaj 2 s i opuść. Powtórz 5 razy." },
    { v: "wrists" as const, t: "Wyprostuj ręce, odchyl dłoń", d: "W górę i w dół. Powtórz 5–10 razy." },
    { v: "twist" as const, t: "Usiądź prosto, skręć tułów", d: "Przytrzymaj 15–20 s na każdą stronę." },
  ];
  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={5} title="Mikropauzy i ćwiczenia" accent={accent} sub="3–5 minut co 1–2 godziny pracy" />
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {exercises.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border bg-card p-3 text-center"
          >
            <div className="relative inline-flex items-center justify-center">
              <ExerciseIcon variant={e.v} />
              <span
                className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: accent }}
              >
                {i + 1}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold leading-tight">{e.t}</p>
            <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{e.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs" style={{ background: `color-mix(in oklab, ${accent} 10%, transparent)`, color: accent }}>
        <Timer className="h-4 w-4" /> Ruch to najlepsza przerwa dla Twojego ciała i umysłu.
      </div>
    </div>
  );
}

/* ============================================================ */
/*  6. PODSUMOWANIE                                             */
/* ============================================================ */
function Summary({ accent }: { accent: string }) {
  const items = [
    { icon: Armchair, t: "Ustaw stanowisko", d: "Dostosuj miejsce pracy do siebie.", tone: "oklch(0.62 0.16 155)" },
    { icon: Footprints, t: "Zmieniaj pozycję", d: "Nie siedź w jednej pozycji zbyt długo.", tone: "oklch(0.55 0.20 250)" },
    { icon: Clock, t: "Rób krótkie przerwy", d: "Ruch i oddech to Twoja energia i zdrowie.", tone: "oklch(0.72 0.16 65)" },
  ];
  return (
    <div className="rounded-2xl border bg-surface p-6">
      <SectionHeader n={6} title="Podsumowanie" accent={accent} sub="3 rzeczy do zapamiętania" />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it, i) => {
          const I = it.icon;
          return (
            <div key={i} className="rounded-2xl border bg-card p-5 text-center">
              <div
                className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full text-white"
                style={{ background: it.tone }}
              >
                <I className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <div className="mt-3 text-xs font-bold tracking-wider text-muted-foreground">{i + 1}.</div>
              <div className="text-sm font-semibold uppercase tracking-wide">{it.t}</div>
              <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl px-4 py-3 text-sm font-medium text-center text-white" style={{ background: `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 55%, black))` }}>
        Zadbaj o siebie dziś, aby cieszyć się zdrowiem jutro.
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Section header helper                                       */
/* ============================================================ */
function SectionHeader({ n, title, sub, accent }: { n: number; title: string; sub?: string; accent: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
        style={{ background: accent }}
      >
        {n}
      </div>
      <div>
        <h4 className="text-base font-bold tracking-tight uppercase">{title}</h4>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  MAIN                                                         */
/* ============================================================ */
export function ErgonomicsCheck({ accent }: { accent: string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <Sparkles className="h-4 w-4" style={{ color: accent }} />
        Ergonomia w pracy — infografika
      </div>

      <WhyErgonomics accent={accent} />
      <CommonMistakes accent={accent} />
      <ErgoDiagram accent={accent} />
      <PracticalCheck accent={accent} />
      <Microbreaks accent={accent} />
      <Summary accent={accent} />

      {/* Quiz teaser */}
      <div className="rounded-2xl border bg-gradient-to-br from-accent to-surface p-5 flex items-center gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: accent }}>
          <Trophy className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quiz — sprawdź się</div>
          <p className="text-sm mt-0.5">Sprawdź wiedzę z ergonomii w teście zaliczeniowym.</p>
        </div>
        <div className="flex items-center gap-1">
          {[HelpCircle, CheckCircle2, HelpCircle, CheckCircle2, HelpCircle].map((I, i) => (
            <I key={i} className={`h-4 w-4 ${i % 2 === 0 ? "text-muted-foreground/50" : "text-success"}`} />
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Eye className="h-3.5 w-3.5" /> Materiał na podstawie zasad ergonomii pracy biurowej.
        <AlertOctagon className="h-3.5 w-3.5 hidden" />
      </div>
    </div>
  );
}
