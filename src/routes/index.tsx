import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { LearningModule } from "~/components/LearningModule";
import { TestModule } from "~/components/TestModule";
import { TOPICS } from "~/lib/bhp-data";
import { useCompleted } from "~/hooks/use-completed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeWork — Szkolenie BHP online" },
      {
        name: "description",
        content:
          "Nowoczesna platforma szkoleń BHP: 6 modułów, interaktywny test i automatyczne zaświadczenie.",
      },
      { property: "og:title", content: "SafeWork — Szkolenie BHP online" },
      {
        property: "og:description",
        content: "6 modułów BHP, test z bazy pytań i zaświadczenie po zaliczeniu.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { completed } = useCompleted();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <LearningModule completed={completed} />
      <TestModule allCompleted={completed.size === TOPICS.length} />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <span>SafeWork</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#moduly" className="hover:text-foreground transition-colors">
            Moduły
          </a>
          <a href="#test" className="hover:text-foreground transition-colors">
            Test
          </a>
        </nav>
        <a
          href="#moduly"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/85 transition-colors"
        >
          Rozpocznij <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Zgodne z Kodeksem pracy · aktualizowane na 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Szkolenie BHP, <br />
          które <span className="text-gradient">naprawdę</span> się przyswaja.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground"
        >
          Sześć krótkich modułów, interaktywny test zaliczeniowy i zaświadczenie wystawiane od razu. Bez prezentacji PDF, bez nudy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#moduly"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-(--shadow-md) hover:shadow-glow transition-shadow"
          >
            <Sparkles className="h-4 w-4" /> Zacznij moduł 1
          </a>
          <a
            href="#test"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
          >
            Przejdź do testu <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-3 md:gap-6"
        >
          {[
            { v: "6", l: "modułów" },
            { v: "15+", l: "pytań w bazie" },
            { v: "80%", l: "próg zaliczenia" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card/80 backdrop-blur p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-primary-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <span className="font-medium text-foreground">SafeWork</span>
          <span>· © {new Date().getFullYear()}</span>
        </div>
        <p>Aplikacja edukacyjna · nie zastępuje instruktażu stanowiskowego.</p>
      </div>
    </footer>
  );
}
