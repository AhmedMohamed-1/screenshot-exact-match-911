import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { GridField } from "@/components/GridField";
import { presentation } from "@/lib/presentation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyOS — Graduation Project Presentation" },
      {
        name: "description",
        content:
          "StudyOS graduation project: Backend, AI, Frontend, UI/UX and DevOps, under the supervision of Dr. Hossam Gomaa.",
      },
      { property: "og:title", content: "StudyOS Graduation Project Presentation" },
      {
        property: "og:description",
        content: "Explore the StudyOS architecture, document processing, Gemini integration, student experience, design process and deployment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

/* ---------- primitives ---------- */

function R({ d = 0, className = "", children }: { d?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`reveal ${className}`} style={{ ["--d" as string]: d }}>
      {children}
    </div>
  );
}

function Slide({
  id,
  n,
  eyebrow,
  title,
  sub,
  children,
  dark,
}: {
  id: string;
  n: number;
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      data-slide={n}
      className={`slide relative flex flex-col justify-center overflow-hidden px-[5vw] pb-20 pt-24 lg:px-[4vw] ${
        dark ? "bg-lp-foreground text-lp-background" : "bg-lp-background"
      }`}
    >
      <R>
        <div className={`font-mono text-xs font-medium uppercase leading-tight tracking-[0.1em] sm:text-sm ${dark ? "text-lp-background/60" : "text-lp-primary"}`}>
          {String(n).padStart(2, "0")} — {eyebrow}
        </div>
      </R>
      <R d={1}>
        <h2 className="mt-4 max-w-[25ch] font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
          {title}
        </h2>
      </R>
      {sub && (
        <R d={2}>
          <p className={`mt-5 max-w-[60ch] text-lg md:text-xl ${dark ? "text-lp-background/70" : "text-lp-foreground-muted"}`}>{sub}</p>
        </R>
      )}
      <div className="mt-10 w-full">{children}</div>
    </section>
  );
}

function Node({ t, s, d = 0, strong, tag }: { t: string | undefined; s?: string | undefined; d?: number; strong?: boolean; tag?: string }) {
  return (
    <R d={d} className="h-full">
      <div
        className={`h-full rounded-lp-card border p-5 shadow-lp-card ${
          strong ? "border-lp-primary bg-lp-primary text-lp-primary-foreground" : "border-lp-border bg-lp-surface"
        }`}
      >
        {tag && <div className={`mb-2 font-mono text-xs font-medium uppercase tracking-widest ${strong ? "text-lp-primary-foreground" : "text-lp-primary"}`}>{tag}</div>}
        <div className="font-display text-lg font-semibold leading-tight">{t}</div>
        {s && <div className={`mt-1.5 text-sm ${strong ? "text-lp-primary-foreground" : "text-lp-foreground-muted"}`}>{s}</div>}
      </div>
    </R>
  );
}

function Flow({ steps, start = 3, lastStrong = true }: { steps: { t: string; s?: string }[]; start?: number; lastStrong?: boolean }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {steps.map((st, i) => (
        <div key={st.t} className="flex flex-col items-center gap-3 lg:flex-1 lg:flex-row">
          <div className="w-full flex-1 self-stretch">
            <Node t={st.t} s={st.s} d={start + i} tag={String(i + 1).padStart(2, "0")} strong={lastStrong && i === steps.length - 1} />
          </div>
          {i < steps.length - 1 && (
            <R d={start + i}>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-lp-primary lg:block" />
              <ArrowDown className="h-5 w-5 text-lp-primary lg:hidden" />
            </R>
          )}
        </div>
      ))}
    </div>
  );
}

const nav = [
  ["cover", "StudyOS"],
  ["problem", "The Problem"],
  ["backend", "Backend"],
  ["ai", "AI"],
  ["frontend", "Frontend"],
  ["ui-ux", "UI / UX"],
  ["devops", "DevOps"],
  ["closing", "Thank You"],
] as const;
const TOTAL = presentation.length;

/* ---------- deck ---------- */

function Deck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = deckRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
          
        });
      },
      { root, threshold: [0, 0.25, 0.55] },
    );
    root.querySelectorAll("[data-slide]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = deckRef.current;
    if (!root) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rootTop = root.getBoundingClientRect().top;
      const slides = root.querySelectorAll<HTMLElement>("[data-slide]");
      let best = 1;
      let bestDist = Infinity;
      slides.forEach((s) => {
        const d = Math.abs(s.getBoundingClientRect().top - rootTop);
        if (d < bestDist) {
          bestDist = d;
          best = Number(s.dataset["slide"]);
        }
      });
      setCur(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (n: number) => {
    const t = Math.min(TOTAL, Math.max(1, n));
    deckRef.current?.querySelector(`[data-slide="${t}"]`)?.scrollIntoView({ behavior: "smooth" });
  };
  const goId = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(e.key)) { e.preventDefault(); go(cur + 1); }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(cur - 1); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const darkNow = cur === 1 || cur === TOTAL;

  return (
    <div className="relative">
      {/* header */}
      <header className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-[5vw] transition-colors motion-reduce:transition-none lg:px-[4vw] ${darkNow ? "text-lp-background" : "text-lp-foreground"}`}>
        <button
          onClick={() => go(1)}
          className={`flex items-center gap-2 font-display text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${darkNow ? "focus-visible:outline-lp-background" : "focus-visible:outline-lp-focus"}`}
        >
          <span aria-hidden="true" className="brand-mark h-7 w-7 flex-none" />
          Study<span className="text-lp-primary">OS</span>
        </button>
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 rounded-lp-control border border-lp-border-strong px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur hover:border-lp-primary focus-visible:outline-2 focus-visible:outline-offset-2 ${darkNow ? "focus-visible:outline-lp-background" : "focus-visible:outline-lp-focus"}`}
        >
          <Menu className="h-4 w-4" /> Sections
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-lp-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <nav className="h-full w-full max-w-sm bg-lp-surface p-8 shadow-lp-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-lp-foreground-subtle">Navigate</span>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <ul className="mt-8 space-y-1">
              {nav.map(([id, l]) => (
                <li key={id}>
                  <button onClick={() => goId(id)} className="w-full rounded-lp-control px-3 py-3 text-left font-display text-2xl font-medium hover:bg-lp-primary-surface hover:text-lp-primary-hover">{l}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* progress */}
      <div className={`fixed bottom-6 right-[5vw] z-40 flex items-center gap-3 lg:right-[4vw] ${darkNow ? "text-lp-background" : "text-lp-foreground"}`}>
        <span className="font-mono text-xs tracking-widest">
          {String(cur).padStart(2, "0")} <span className={darkNow ? "text-lp-background/60" : "text-lp-foreground-muted"}>/ {TOTAL}</span>
        </span>
        <button
          aria-label="Previous"
          onClick={() => go(cur - 1)}
          className={`grid h-8 w-8 place-items-center rounded-lp-control border border-lp-border-strong hover:border-lp-primary focus-visible:outline-2 focus-visible:outline-offset-2 ${darkNow ? "focus-visible:outline-lp-background" : "focus-visible:outline-lp-focus"}`}
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(cur + 1)}
          className={`grid h-8 w-8 place-items-center rounded-lp-control border border-lp-border-strong hover:border-lp-primary focus-visible:outline-2 focus-visible:outline-offset-2 ${darkNow ? "focus-visible:outline-lp-background" : "focus-visible:outline-lp-focus"}`}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-lp-primary transition-all duration-300 motion-reduce:transition-none" style={{ width: `${(cur / TOTAL) * 100}%` }} />

      <div ref={deckRef} className="deck">
        {presentation.map((slide, index) => {
          const n = index + 1;
          const dark = n === 1 || n === TOTAL;
          if (dark) return (
            <section key={slide.id} id={slide.id} data-slide={n} className="slide relative flex flex-col justify-center overflow-hidden bg-lp-foreground px-[5vw] pb-24 pt-24 text-lp-background lg:px-[4vw]">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
              <GridField />
              <div className="relative">
                <R><div className="font-mono text-xs font-medium uppercase text-lp-background/60">{slide.eyebrow}</div></R>
                <R d={1}><h1 className="mt-6 font-display text-6xl font-bold leading-none md:text-8xl xl:text-9xl">{n === 1 ? <>Study<span className="text-lp-coral">OS</span></> : slide.title}</h1></R>
                <R d={2}><p className="mt-6 font-display text-2xl md:text-3xl">{slide.subtitle}</p></R>
                {slide.items && <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {slide.items.map((item, i) => <R key={item.title} d={i + 3}><div className="border-t border-lp-background/20 pt-4"><div className="font-mono text-xs uppercase text-lp-coral">{item.title}</div><p className="mt-2 text-lg">{item.text}</p></div></R>)}
                </div>}
                {slide.note && <R d={3}><p className="mt-10 max-w-[60ch] text-lg text-lp-background/70">{slide.note}</p><p className="mt-8 text-sm text-lp-background/60">Under the supervision of Dr. Hossam Gomaa</p></R>}
              </div>
            </section>
          );
          return (
            <Slide key={slide.id} id={slide.id} n={n} eyebrow={slide.eyebrow} title={slide.title} sub={slide.subtitle}>
              {slide.items && <div className={`grid gap-4 ${slide.items.length === 2 || slide.items.length === 4 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
                {slide.items.map((item, i) => <R key={item.title} d={3 + i} className="h-full">
                  <div className="h-full rounded-lp-card border border-lp-border bg-lp-surface p-5 shadow-lp-card md:p-6">
                    <div className="mb-3 font-mono text-xs text-lp-primary">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="font-display text-xl font-semibold leading-tight">{item.title}</h3>
                    {item.text && <p className="mt-3 text-base text-lp-foreground-muted">{item.text}</p>}
                    {item.points && <ul className="mt-4 space-y-2 text-base text-lp-foreground-muted">{item.points.map(point => <li key={point} className="flex gap-3"><span aria-hidden="true" className="text-lp-primary">—</span><span>{point}</span></li>)}</ul>}
                  </div>
                </R>)}
              </div>}
              {slide.flow && <div className={slide.items ? "mt-8" : ""}>
                {slide.flow.length > 5 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{slide.flow.map((t, i) => <Node key={`${i}-${t}`} t={t} tag={String(i + 1).padStart(2, "0")} d={3 + i} strong={i === (slide.flow?.length ?? 0) - 1} />)}</div> : <Flow steps={slide.flow.map(t => ({ t }))} />}
              </div>}
              {slide.note && <R d={4}><p className="mt-8 max-w-[75ch] text-lg text-lp-foreground-muted">{slide.note}</p></R>}
            </Slide>
          );
        })}
      </div>
    </div>
  );
}
