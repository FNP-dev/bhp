import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { TOPICS } from "~/lib/bhp-data";

type Props = {
  completed: Set<string>;
};

export function LearningModule({ completed }: Props) {
  const progress = (completed.size / TOPICS.length) * 100;

  return (
    <section id="moduly" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Moduł 1 · Materiały szkoleniowe
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Sześć tematów. <span className="text-gradient">Jedna platforma.</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Treści w formie wideo, infografik i krótkich interakcji. Możesz wrócić w dowolnym momencie — postęp jest zapisywany.
            </p>
          </div>

          <div className="min-w-60 rounded-2xl border bg-surface-elevated p-4 shadow-(--shadow-md)">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Twój postęp</span>
              <span className="text-muted-foreground">
                {completed.size} / {TOPICS.length}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOPICS.map((t, i) => {
            const Icon = t.icon;
            const done = completed.has(t.id);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to="/kurs/$id"
                  params={{ id: t.id }}
                  className="group block text-left relative overflow-hidden rounded-2xl border bg-card p-6 shadow-(--shadow-sm) hover:shadow-(--shadow-lg) transition-shadow"
                >
                  <div
                    className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                    style={{ background: t.color }}
                  />
                  <div className="relative flex items-start justify-between mb-4">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: `color-mix(in oklab, ${t.color} 14%, transparent)`,
                        color: t.color,
                      }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.short}</p>
                  <div className="mt-5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {t.duration}
                      </span>
                      <span>·</span>
                      <span>{t.form.join(" + ")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
