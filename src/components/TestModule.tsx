import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Clock,
  Trophy,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  PartyPopper,
  AlertCircle,
} from "lucide-react";
import { QUESTIONS, QUIZ_LENGTH, QUIZ_TIME_SECONDS, PASS_THRESHOLD, type Question } from "~/lib/bhp-data";

type Phase = "intro" | "running" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TestModule({ allCompleted }: { allCompleted: boolean }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [set, setSet] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [name, setName] = useState("");

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setPhase("result");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const start = () => {
    setSet(shuffle(QUESTIONS).slice(0, QUIZ_LENGTH));
    setIdx(0);
    setAnswers({});
    setTimeLeft(QUIZ_TIME_SECONDS);
    setPhase("running");
  };

  const score = useMemo(
    () => set.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0),
    [answers, set],
  );
  const passed = set.length > 0 && score / set.length >= PASS_THRESHOLD;

  return (
    <section id="test" className="relative py-24 px-6 bg-gradient-soft">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground mb-4">
            <ClipboardCheck className="h-3.5 w-3.5" />
            Moduł 2 · Test zaliczeniowy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Sprawdź swoją <span className="text-gradient">wiedzę</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {QUIZ_LENGTH} pytań losowanych z bazy. Próg zaliczenia: {Math.round(PASS_THRESHOLD * 100)}%. Czas: {QUIZ_TIME_SECONDS / 60} min.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <IntroCard key="intro" allCompleted={allCompleted} name={name} setName={setName} onStart={start} />
          )}
          {phase === "running" && (
            <RunningCard
              key="running"
              question={set[idx]}
              idx={idx}
              total={set.length}
              answer={answers[set[idx]?.id]}
              onAnswer={(opt) => setAnswers((a) => ({ ...a, [set[idx].id]: opt }))}
              onNext={() => (idx + 1 < set.length ? setIdx(idx + 1) : setPhase("result"))}
              timeLeft={timeLeft}
            />
          )}
          {phase === "result" && (
            <ResultCard
              key="result"
              score={score}
              total={set.length}
              passed={passed}
              name={name}
              set={set}
              answers={answers}
              onRetry={start}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function IntroCard({
  allCompleted,
  name,
  setName,
  onStart,
}: {
  allCompleted: boolean;
  name: string;
  setName: (s: string) => void;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="rounded-3xl border bg-card p-8 md:p-10 shadow-(--shadow-md)"
    >
      {!allCompleted && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-warning-foreground/80 mt-0.5" />
          <p className="text-sm">
            Nie ukończyłeś jeszcze wszystkich modułów. Możesz przystąpić do testu, ale wskazane jest najpierw zapoznać się z materiałem.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat icon={ClipboardCheck} label="Pytania" value={String(QUIZ_LENGTH)} />
        <Stat icon={Clock} label="Czas" value={`${QUIZ_TIME_SECONDS / 60} min`} />
        <Stat icon={Trophy} label="Próg" value={`${Math.round(PASS_THRESHOLD * 100)}%`} />
        <Stat icon={RotateCcw} label="Powtórki" value="Bez limitu" />
      </div>

      <label className="block text-sm font-medium mb-2">Imię i nazwisko</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="np. Anna Kowalska"
        className="w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition"
      />
      <p className="mt-2 text-xs text-muted-foreground">Dane potrzebne tylko do wystawienia zaświadczenia.</p>

      <button
        onClick={onStart}
        disabled={!name.trim()}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-(--shadow-md) hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Sparkles className="h-4 w-4" /> Rozpocznij test
      </button>
    </motion.div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-surface p-3 text-center">
      <Icon className="h-4 w-4 mx-auto text-muted-foreground mb-1.5" />
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function RunningCard({
  question,
  idx,
  total,
  answer,
  onAnswer,
  onNext,
  timeLeft,
}: {
  question: Question;
  idx: number;
  total: number;
  answer: number | undefined;
  onAnswer: (i: number) => void;
  onNext: () => void;
  timeLeft: number;
}) {
  const min = Math.floor(timeLeft / 60);
  const sec = String(timeLeft % 60).padStart(2, "0");
  const low = timeLeft < 60;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="rounded-3xl border bg-card p-7 md:p-10 shadow-(--shadow-md)"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          Pytanie <span className="font-semibold text-foreground">{idx + 1}</span> z {total}
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tabular-nums ${
            low ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {min}:{sec}
        </div>
      </div>

      <div className="h-1 rounded-full bg-muted overflow-hidden mb-7">
        <motion.div
          className="h-full bg-gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((idx + 1) / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold leading-snug mb-6">{question.question}</h3>
          <div className="space-y-2.5">
            {question.options.map((opt, i) => {
              const sel = answer === i;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onAnswer(i)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 flex items-center gap-3 transition-all ${
                    sel
                      ? "border-primary bg-primary/8 shadow-[0_0_0_4px_oklch(0.52_0.22_285/0.1)]"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      sel ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onNext}
        disabled={answer === undefined}
        className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-foreground/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {idx + 1 === total ? "Zakończ test" : "Następne pytanie"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function ResultCard({
  score,
  total,
  passed,
  name,
  set,
  answers,
  onRetry,
}: {
  score: number;
  total: number;
  passed: boolean;
  name: string;
  set: Question[];
  answers: Record<number, number>;
  onRetry: () => void;
}) {
  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="space-y-6"
    >
      <div
        className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 text-center shadow-(--shadow-md) ${
          passed ? "bg-card" : "bg-card"
        }`}
      >
        {passed && (
          <div className="absolute inset-x-0 -top-16 h-64 bg-gradient-hero pointer-events-none" />
        )}
        <div className="relative">
          <div
            className={`mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl mb-4 ${
              passed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}
          >
            {passed ? <PartyPopper className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
          </div>
          <h3 className="text-3xl md:text-4xl font-bold">
            {passed ? "Gratulacje, zaliczone!" : "Test niezaliczony"}
          </h3>
          <p className="mt-2 text-muted-foreground">
            Twój wynik: <strong className="text-foreground">{score}</strong> / {total} ({pct}%)
          </p>

          {passed ? (
            <Certificate name={name} pct={pct} />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              Wymagany próg to {Math.round(PASS_THRESHOLD * 100)}%. Wróć do materiałów i spróbuj ponownie — wiedza ratuje życie.
            </p>
          )}

          <button
            onClick={onRetry}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> {passed ? "Podejdź jeszcze raz" : "Spróbuj ponownie"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h4 className="font-semibold mb-4">Przegląd odpowiedzi</h4>
        <div className="space-y-2">
          {set.map((q, i) => {
            const ok = answers[q.id] === q.correct;
            return (
              <div key={q.id} className="flex items-start gap-3 rounded-xl bg-surface border p-3">
                {ok ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {i + 1}. {q.question}
                  </p>
                  {!ok && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Poprawna odpowiedź: <strong className="text-foreground">{q.options[q.correct]}</strong>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function Certificate({ name, pct }: { name: string; pct: number }) {
  const today = new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative mt-8 mx-auto max-w-xl rounded-2xl border-2 border-dashed border-primary/30 bg-surface p-6 md:p-8 text-left"
    >
      <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
        <Award className="h-3.5 w-3.5" /> Zaświadczenie
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">SafeWork · Szkolenie BHP</p>
      <h4 className="mt-2 text-2xl font-bold">{name}</h4>
      <p className="mt-3 text-sm text-foreground/80">
        Pomyślnie ukończył(a) szkolenie wstępne BHP, uzyskując wynik{" "}
        <strong>{pct}%</strong> w teście zaliczeniowym.
      </p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 text-xs text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">{today}</p>
          <p>Data ukończenia</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">SAFEWORK-{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p>Nr zaświadczenia</p>
        </div>
      </div>
    </motion.div>
  );
}
