import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TOPICS } from "~/lib/bhp-data";
import { useCompleted } from "~/hooks/use-completed";
import { FireExtinguishersInteractive } from "~/components/interactives/FireExtinguishers";
import { FirstAidSteps } from "~/components/interactives/FirstAidSteps";
import { ErgonomicsCheck } from "~/components/interactives/ErgonomicsCheck";
import { RescuePlanInteractive } from "~/components/interactives/RescuePlan";
import { HazardsCheck } from "~/components/interactives/HazardsCheck";
import { AssemblyPoint } from "~/components/interactives/AssemblyPoint";

export const Route = createFileRoute("/kurs/$id")({  
  head: ({ params }: { params: { id: string } }) => {
    const t = TOPICS.find((x) => x.id === params.id);
    const title = t ? `${t.title} — SafeWork` : "Kurs — SafeWork";
    const description = t?.short ?? "Materiał szkoleniowy BHP";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const topic = TOPICS.find((t) => t.id === params.id);
    if (!topic) throw notFound();
    return { topicId: topic.id };
  },
  component: CoursePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Nie znaleziono kursu</h1>
        <Link to="/" className="text-primary underline">Wróć do strony głównej</Link>
      </div>
    </div>
  ),
});

function CoursePage() {
  const { id } = Route.useParams();
  const topic = TOPICS.find((t) => t.id === id)!;
  const Icon = topic.icon;
  const { completed, complete } = useCompleted();
  const router = useRouter();
  const done = completed.has(topic.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
            </div>
            <span>SafeWork</span>
          </Link>
          <Link
            to="/"
            hash="moduly"
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Wszystkie moduły
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14 space-y-8">
        <div>
          <Link
            to="/"
            hash="moduly"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Powrót do modułów
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
              style={{
                background: `color-mix(in oklab, ${topic.color} 14%, transparent)`,
                color: topic.color,
              }}
            >
              <Icon className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{topic.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {topic.duration} · {topic.form.join(" + ")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-foreground/85">{topic.intro}</p>

        {topic.id === "ppoz" && <AssemblyPoint accent={topic.color} />}

        <div className="space-y-3">
          {topic.points.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-4 rounded-xl border bg-surface p-4"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
                style={{
                  background: `color-mix(in oklab, ${topic.color} 12%, transparent)`,
                  color: topic.color,
                }}
              >
                {idx + 1}
              </div>
              <div>
                <h2 className="font-semibold text-sm">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {topic.interactives?.includes("fire-extinguishers") && (
          <FireExtinguishersInteractive accent={topic.color} />
        )}
        {topic.interactives?.includes("rescue-plan") && (
          <RescuePlanInteractive accent={topic.color} />
        )}
        {topic.interactives?.includes("first-aid-steps") && (
          <FirstAidSteps accent={topic.color} />
        )}
        {topic.interactives?.includes("ergonomics-check") && (
          <ErgonomicsCheck accent={topic.color} />
        )}
        {topic.interactives?.includes("hazards-check") && (
          <HazardsCheck accent={topic.color} />
        )}

        <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <Lightbulb className="h-5 w-5 shrink-0 text-warning-foreground/80 mt-0.5" />
          <p className="text-sm text-warning-foreground/90">
            <strong>Wskazówka:</strong> jeśli masz wątpliwości — zapytaj koordynatora BHP. Lepsze 5
            minut rozmowy niż jedna zła decyzja.
          </p>
        </div>

        <button
          onClick={() => {
            complete(topic.id);
            router.navigate({ to: "/", hash: "moduly" });
          }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-md)] hover:shadow-glow transition-shadow"
        >
          {done ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Moduł ukończony — wróć do listy
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Oznacz jako ukończone
            </>
          )}
        </button>
      </article>
    </div>
  );
}
