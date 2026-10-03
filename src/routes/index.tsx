import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  FileStack,
  ShieldAlert,
  MessageSquareDashed,
  CalendarDays,
  Trophy,
  Users,
  Check,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study OS — Understand what you know" },
      {
        name: "description",
        content:
          "Interactive presentation of Study OS: concept-level weakness detection, root-cause analysis and personalized recommendations grounded in course material.",
      },
      { property: "og:title", content: "Study OS — Graduation Project Presentation" },
      {
        property: "og:description",
        content: "How Study OS turns course material and quiz attempts into learning insights with .NET, SQL Server, Gemini and RAG.",
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
        <div className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-lp-background/60" : "text-lp-primary"}`}>
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
        {tag && <div className={`mb-2 font-mono text-[11px] uppercase tracking-widest ${strong ? "text-lp-primary-foreground" : "text-lp-primary"}`}>{tag}</div>}
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

function VFlow({ steps, start = 3 }: { steps: { t: string; s?: string; strong?: boolean }[]; start?: number }) {
  return (
    <div className="relative flex flex-col gap-2">
      {steps.map((st, i) => (
        <div key={st.t}>
          <R d={start + i}>
            <div
              className={`flex items-center gap-4 rounded-lp-card border px-5 py-3.5 shadow-lp-card ${
                st.strong ? "border-lp-primary bg-lp-primary text-lp-primary-foreground" : "border-lp-border bg-lp-surface"
              }`}
            >
              <span className={`font-mono text-xs ${st.strong ? "text-lp-primary-foreground" : "text-lp-primary"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-base font-semibold md:text-lg">{st.t}</span>
              {st.s && <span className={`ml-auto hidden text-sm md:block ${st.strong ? "text-lp-primary-foreground" : "text-lp-foreground-muted"}`}>{st.s}</span>}
            </div>
          </R>
          {i < steps.length - 1 && <div className="ml-8 h-2 w-px bg-lp-border" />}
        </div>
      ))}
    </div>
  );
}

function Split({ left, right, ratio = "lg:grid-cols-[5fr_7fr]" }: { left: ReactNode; right: ReactNode; ratio?: string }) {
  return <div className={`grid items-center gap-10 lg:gap-16 ${ratio}`}>{left}<div>{right}</div></div>;
}

function Bullets({ items, start = 3 }: { items: string[]; start?: number }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <R key={it} d={start + i}>
          <li className="flex items-start gap-3 text-lg">
            <span className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full bg-lp-primary" />
            {it}
          </li>
        </R>
      ))}
    </ul>
  );
}

/* ---------- data ---------- */

const team = [
  { n: "Ahmed Mohamed", r: "Team Leader — Backend", lead: true },
  { n: "Mohamed Essam", r: "Frontend Developer" },
  { n: "Mohamed Bayommi", r: "Frontend Developer" },
  { n: "Mohamed Ali", r: "DevOps Engineer" },
  { n: "Mohamed Samir", r: "DevOps Engineer" },
  { n: "Fatma Mahmoud", r: "AI Engineer" },
  { n: "Hamdy Mohamed", r: "UI/UX Designer" },
];

const nav = [
  ["problem", "Problem"],
  ["idea", "Idea"],
  ["architecture", "Architecture"],
  ["gemini-rag", "AI"],
  ["team", "Team"],
  ["status", "Current Status"],
  ["future", "Future Vision"],
  ["limitations", "Limitations"],
] as const;

const TOTAL = 20;

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
          if (e.isIntersecting) {
            e.target.classList.add("in");
            if (e.intersectionRatio > 0.5) setCur(Number((e.target as HTMLElement).dataset["slide"]));
          }
        });
      },
      { root, threshold: [0.25, 0.55] },
    );
    root.querySelectorAll("[data-slide]").forEach((s) => io.observe(s));
    return () => io.disconnect();
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

  const darkNow = cur === 1 || cur === 20;

  return (
    <div className="relative">
      {/* header */}
      <header className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-[5vw] transition-colors motion-reduce:transition-none lg:px-[4vw] ${darkNow ? "text-lp-background" : "text-lp-foreground"}`}>
        <button
          onClick={() => go(1)}
          className={`flex items-center gap-2 font-display text-lg font-semibold ${darkNow ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-background" : ""}`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-lp-primary text-xs text-lp-primary-foreground">
            S
          </span>
          Study<span className="text-lp-primary">OS</span>
        </button>
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 rounded-lp-control border border-lp-border-strong px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur hover:border-lp-primary ${darkNow ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-background" : ""}`}
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
          {String(cur).padStart(2, "0")} <span className="opacity-40">/ {TOTAL}</span>
        </span>
        <button
          aria-label="Previous"
          onClick={() => go(cur - 1)}
          className={`grid h-8 w-8 place-items-center rounded-lp-control border border-lp-border-strong hover:border-lp-primary ${darkNow ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-background" : ""}`}
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(cur + 1)}
          className={`grid h-8 w-8 place-items-center rounded-lp-control border border-lp-border-strong hover:border-lp-primary ${darkNow ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-background" : ""}`}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-lp-primary transition-all duration-300 motion-reduce:transition-none" style={{ width: `${(cur / TOTAL) * 100}%` }} />

      <div ref={deckRef} className="deck">
        {/* 01 COVER */}
        <section data-slide={1} className="slide relative flex flex-col justify-end overflow-hidden bg-lp-foreground px-[5vw] pb-24 pt-24 text-lp-background lg:px-[4vw]">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative grid items-end gap-12 lg:grid-cols-[7fr_5fr]">
            <div>
              <R><div className="font-mono text-xs uppercase tracking-[0.2em] text-lp-background/60">Graduation Project · 2026</div></R>
              <R d={1}><h1 className="mt-6 font-display text-6xl font-bold leading-[0.9] tracking-tight md:text-8xl xl:text-[10rem]">Study<span className="text-lp-coral">OS</span></h1></R>
              <R d={2}><p className="mt-8 max-w-[24ch] font-display text-2xl font-medium md:text-4xl">Understand what you know. Discover what you don't.</p></R>
            </div>
            <R d={3}>
              <p className="max-w-[44ch] text-lg text-lp-background/70">
                An AI-powered learning platform that connects course material, quiz performance and AI analysis to reveal weak concepts, their likely causes, and what to study next.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-lp-background/50">
                <ArrowDown className="h-4 w-4" /> Scroll to begin
              </div>
            </R>
          </div>
        </section>

        {/* 02 PROBLEM */}
        <Slide id="problem" n={2} eyebrow="The Problem" title="More content than ever. Less clarity than ever." sub="Students rarely know what they actually understand until the exam tells them.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { i: FileStack, t: "Fragmented Material", s: "Slides, PDFs and notes scattered across sources with no connection between them." },
              { i: ShieldAlert, t: "False Confidence", s: "Finishing a chapter feels like understanding it. Often, it isn't." },
              { i: MessageSquareDashed, t: "Generic Help", s: "AI chat answers are disconnected from the actual course and never explain why a student is weak." },
            ].map((c, k) => (
              <R key={c.t} d={3 + k} className="h-full">
                <div className="flex h-full flex-col rounded-lp-card border border-lp-border bg-lp-surface p-8 shadow-lp-card">
                  <c.i className="h-8 w-8 text-lp-primary" />
                  <div className="mt-auto pt-16 font-display text-2xl font-semibold">{c.t}</div>
                  <p className="mt-3 text-lp-foreground-muted">{c.s}</p>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 03 IDEA */}
        <Slide id="idea" n={3} eyebrow="The Idea" title="One system that connects learning to understanding." sub="Study OS links the student's material, assessment results and AI analysis into a single loop.">
          <Flow
            steps={[
              { t: "Course Material", s: "Documents uploaded per course" },
              { t: "Learning Data", s: "Concepts, questions, attempts" },
              { t: "AI Analysis", s: "Grounded in the material" },
              { t: "Weakness Detection", s: "At the concept level" },
              { t: "Recommendations", s: "What to study next" },
            ]}
          />
        </Slide>

        {/* 04 WHY AI */}
        <Slide id="why-ai" n={4} eyebrow="Why AI?" title="Rules can count wrong answers. They can't explain them.">
          <Split
            ratio="lg:grid-cols-[4fr_8fr]"
            left={
              <R d={2}>
                <p className="text-xl text-lp-foreground-muted">
                  Traditional platforms report scores. Understanding <span className="font-medium text-lp-foreground">which concept</span> failed and <span className="font-medium text-lp-foreground">why</span> requires reading unstructured material and reasoning across questions — the work AI is actually good at.
                </p>
              </R>
            }
            right={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Understand", "course material"],
                  ["Connect", "questions with course concepts"],
                  ["Analyze", "quiz attempts"],
                  ["Detect", "weak concepts"],
                  ["Identify", "possible root causes"],
                  ["Recommend", "what to study next"],
                ].map(([a, b], k) => (
                  <Node key={a} t={a} s={b} d={3 + k} />
                ))}
              </div>
            }
          />
        </Slide>

        {/* 05 HOW IT WORKS */}
        <Slide id="how" n={5} eyebrow="How the System Works" title="From a student's click to a learning insight.">
          <Flow
            steps={[
              { t: "Student", s: "Studies, uploads, takes quizzes" },
              { t: "Frontend", s: "Web interface" },
              { t: ".NET Backend", s: "REST API · control" },
              { t: "AI Processing", s: "Gemini + RAG" },
              { t: "SQL Server", s: "Persisted by backend" },
              { t: "Learning Insights", s: "Back to the student" },
            ]}
          />
        </Slide>

        {/* 06 ARCHITECTURE */}
        <Slide id="architecture" n={6} eyebrow="System Architecture" title="The backend is in control.">
          <Split
            left={
              <div className="space-y-6">
                <R d={2}><p className="text-xl text-lp-foreground-muted">Every request passes through the .NET backend. It owns business rules, data flow and persistence.</p></R>
                <R d={3}>
                  <div className="rounded-lp-card border border-lp-border bg-lp-primary-surface p-5 text-lp-primary-hover">
                    <div className="font-display font-semibold">The AI never touches the database directly.</div>
                    <div className="mt-1 text-sm opacity-80">It receives context from the backend and returns results through defined contracts. The backend stores them.</div>
                  </div>
                </R>
              </div>
            }
            right={
              <div className="grid grid-cols-[1fr_auto] gap-x-6">
                <div className="space-y-2">
                  {[
                    ["Frontend", "Web client consuming the APIs"],
                    [".NET Backend", "REST API entry point"],
                    ["Application / Business Logic", "Rules, validation, orchestration"],
                    ["AI Integration Layer", "Gemini · RAG · analysis"],
                    ["SQL Server", "Single source of truth"],
                  ].map(([t, s], k) => (
                    <div key={t}>
                      <Node t={t} s={s} d={3 + k} strong={k === 1} />
                      {k < 4 && <div className="ml-8 h-2 w-px bg-lp-border" />}
                    </div>
                  ))}
                </div>
                <R d={6} className="flex">
                  <div className="flex w-10 flex-col items-center">
                    <div className="mt-[22%] w-px flex-1 bg-lp-primary" />
                    <span className="my-3 font-mono text-[10px] uppercase tracking-widest text-lp-primary [writing-mode:vertical-rl]">backend controlled</span>
                    <div className="mb-6 w-px flex-1 bg-lp-primary" />
                  </div>
                </R>
              </div>
            }
          />
        </Slide>

        {/* 07 LAYERS */}
        <Slide id="layers" n={7} eyebrow="Frontend → Backend → AI → Database" title="Four layers. Clear responsibilities.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Frontend", ["User interaction", "Course interface", "Documents", "Quizzes", "Results", "Learning insights"]],
              ["Backend", ["Authentication", "Authorization", "API endpoints", "Business logic", "Data validation", "Persistence", "AI orchestration"]],
              ["AI", ["Document understanding", "Retrieval", "Quiz analysis", "Weakness detection", "Root-cause analysis", "Recommendations"]],
              ["Database", ["Users", "Courses", "Documents", "Concepts", "Quiz attempts", "Results", "Learning data", "AI-generated insights"]],
            ].map(([t, items], k) => (
              <R key={t as string} d={3 + k} className="h-full">
                <div className={`h-full rounded-lp-card border p-6 shadow-lp-card ${k === 1 ? "border-lp-primary bg-lp-primary text-lp-primary-foreground" : "border-lp-border bg-lp-surface"}`}>
                  <div className={`font-mono text-xs ${k === 1 ? "text-lp-primary-foreground" : "text-lp-primary"}`}>L{k + 1}</div>
                  <div className="mt-1 font-display text-2xl font-semibold">{t as string}</div>
                  <ul className="mt-5 space-y-2 text-sm">
                    {(items as string[]).map((i) => (
                      <li key={i} className={`border-t pt-2 ${k === 1 ? "border-lp-primary-foreground/20" : "border-lp-border"}`}>{i}</li>
                    ))}
                  </ul>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 08 API */}
        <Slide id="api" n={8} eyebrow="API Contracts" title="A controlled boundary between every layer.">
          <Split
            left={<R d={2}><p className="text-xl text-lp-foreground-muted">The frontend talks to the backend only through defined REST contracts. The backend decides what reaches the AI — and what gets stored.</p></R>}
            right={
              <R d={3}>
                <div className="overflow-hidden rounded-lp-card border border-lp-border bg-lp-foreground font-mono text-sm text-lp-background shadow-lp-card">
                  <div className="border-b border-lp-background/10 px-5 py-3 text-xs text-lp-background/50">frontend → .NET REST API (examples)</div>
                  {[
                    ["POST", "/api/quiz-attempts", "Submit a quiz attempt"],
                    ["GET", "/api/courses/{courseId}", "Load a course"],
                    ["GET", "/api/learning-insights/{userId}", "Fetch insights"],
                  ].map(([m, p, d], k) => (
                    <R key={p} d={4 + k}>
                      <div className="flex flex-wrap items-center gap-4 border-b border-lp-background/10 px-5 py-5 last:border-0">
                        <span className="w-14 rounded bg-lp-primary px-2 py-1 text-center text-xs text-lp-primary-foreground">{m}</span>
                        <span className="text-base">{p}</span>
                        <span className="ml-auto text-xs text-lp-background/50">{d}</span>
                      </div>
                    </R>
                  ))}
                </div>
              </R>
            }
          />
        </Slide>

        {/* 09 IDS */}
        <Slide id="ids" n={9} eyebrow="user_id and course_id" title="Whose data is this? The backend decides.">
          <div className="grid items-center gap-6 lg:grid-cols-[3fr_auto_4fr_auto_3fr]">
            <div className="space-y-3">
              {["user_id", "course_id", "quiz_attempt_id"].map((x, k) => (
                <R key={x} d={3 + k}><div className="rounded-lp-card border border-lp-border bg-lp-surface px-5 py-4 font-mono text-lg shadow-lp-card">{x}</div></R>
              ))}
            </div>
            <R d={6}><ArrowRight className="mx-auto hidden h-6 w-6 text-lp-primary lg:block" /><ArrowDown className="mx-auto h-6 w-6 text-lp-primary lg:hidden" /></R>
            <R d={7}>
              <div className="rounded-lp-card border border-lp-primary bg-lp-primary p-6 text-lp-primary-foreground shadow-lp-card">
                <div className="font-mono text-xs text-lp-primary-foreground">.NET BACKEND IDENTIFIES</div>
                <ul className="mt-4 grid grid-cols-2 gap-3 font-display text-lg">
                  {["Which student", "Which course", "Which assessment", "Which concepts"].map((x) => <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4" />{x}</li>)}
                </ul>
              </div>
            </R>
            <R d={8}><ArrowRight className="mx-auto hidden h-6 w-6 text-lp-primary lg:block" /><ArrowDown className="mx-auto h-6 w-6 text-lp-primary lg:hidden" /></R>
            <Node d={9} t="AI receives structured context" s="Only the relevant, scoped data — never free access to the database." />
          </div>
        </Slide>

        {/* 10 QUIZ */}
        <Slide id="quiz" n={10} eyebrow="Quiz Attempt Analysis" title="One attempt. Eight steps to an insight.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Student answers quiz", "Frontend"],
              ["Backend records attempt", "Backend"],
              ["Answers mapped to concepts", "Backend"],
              ["AI analyzes performance", "AI"],
              ["Weak concepts detected", "AI"],
              ["Possible root causes identified", "AI"],
              ["Recommendations generated", "AI"],
              ["Backend stores the insights", "Backend"],
            ].map(([t, l], k) => (
              <Node key={t} t={t} tag={`${String(k + 1).padStart(2, "0")} · ${l}`} d={3 + k} strong={k === 7} />
            ))}
          </div>
        </Slide>

        {/* 11 DOCS */}
        <Slide id="documents" n={11} eyebrow="Document Processing" title="Uploaded material becomes searchable knowledge.">
          <Split
            ratio="lg:grid-cols-[4fr_8fr]"
            left={<R d={2}><p className="text-xl text-lp-foreground-muted">A PDF is not knowledge yet. Study OS extracts its structure, breaks it into chapters and concepts, and indexes it so the AI can retrieve exactly what's relevant.</p></R>}
            right={
              <div className="grid gap-x-6 sm:grid-cols-2">
                <VFlow steps={[{ t: "Document" }, { t: "Extraction" }, { t: "Text / Structure" }, { t: "Chapters" }]} />
                <VFlow start={7} steps={[{ t: "Concepts" }, { t: "Relationships / Keywords" }, { t: "Searchable Knowledge" }, { t: "AI / RAG", strong: true }]} />
              </div>
            }
          />
        </Slide>

        {/* 12 RAG */}
        <Slide id="gemini-rag" n={12} eyebrow="Gemini + RAG" title="Answers grounded in the student's own course.">
          <Split
            left={
              <div className="space-y-5">
                <R d={2}><p className="text-xl text-lp-foreground-muted">Retrieval-Augmented Generation fetches relevant passages from the course material <em>before</em> Gemini responds.</p></R>
                <R d={3}>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lp-card border border-lp-border bg-lp-surface-sunken p-4"><div className="font-display font-semibold text-lp-foreground-subtle">Without RAG</div><div className="mt-1 text-lp-foreground-subtle">Generic model knowledge</div></div>
                    <div className="rounded-lp-card border border-lp-primary bg-lp-primary-surface p-4 text-lp-primary-hover"><div className="font-display font-semibold">With RAG</div><div className="mt-1">Grounded in actual material</div></div>
                  </div>
                </R>
              </div>
            }
            right={
              <VFlow
                start={4}
                steps={[
                  { t: "Student question / quiz result", s: "Input" },
                  { t: "Retrieve relevant course content", s: "RAG" },
                  { t: "Provide context to Gemini", s: "Prompt" },
                  { t: "Generate grounded analysis", s: "Gemini" },
                  { t: "Return result through backend", s: ".NET", strong: true },
                ]}
              />
            }
          />
        </Slide>

        {/* 13 WEAKNESS */}
        <Slide id="weakness" n={13} eyebrow="Weakness Detection" title={<>Not "weak at Chapter 3."<br /><span className="text-lp-primary">Weak at this concept.</span></>}>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end">
            {["Course", "Chapter", "Concept", "Questions", "Student Answers", "Performance Pattern", "Weak Concept"].map((t, k) => (
              <R key={t} d={3 + k} className="lg:flex-1">
                <div
                  className={`flex items-end rounded-lp-card border p-4 font-display text-lg font-semibold shadow-lp-card ${k === 6 ? "border-lp-primary bg-lp-primary text-lp-primary-foreground" : "border-lp-border bg-lp-surface"}`}
                  style={{ minHeight: `${4 + k * 2.2}rem` }}
                >
                  <div><div className={`font-mono text-[11px] ${k === 6 ? "text-lp-primary-foreground" : "text-lp-primary"}`}>{k < 6 ? `LEVEL ${k + 1}` : "DETECTED"}</div>{t}</div>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 14 ROOT CAUSE */}
        <Slide id="root-cause" n={14} eyebrow="Root Cause Analysis" title="Detecting a weakness isn't the same as understanding it.">
          <Split
            ratio="lg:grid-cols-[6fr_6fr]"
            left={
              <VFlow
                steps={[
                  { t: "Low score" },
                  { t: "Weak concept detected" },
                  { t: "Analyze related questions" },
                  { t: "Compare with prerequisite concepts" },
                  { t: "Identify possible root cause", strong: true },
                ]}
              />
            }
            right={
              <div>
                <R d={8}><div className="font-mono text-xs uppercase tracking-widest text-lp-foreground-subtle">Likely causes the system distinguishes</div></R>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["Lack of understanding", "Missing prerequisite knowledge", "Repeated misconception", "Insufficient practice"].map((t, k) => (
                    <Node key={t} t={t} d={9 + k} />
                  ))}
                </div>
                <R d={13}><p className="mt-5 text-sm text-lp-foreground-muted">An inference — a <span className="font-medium text-lp-foreground">likely cause</span>, not a guaranteed diagnosis.</p></R>
              </div>
            }
          />
        </Slide>

        {/* 15 RECS */}
        <Slide id="recommendations" n={15} eyebrow="Personalized Recommendations" title="From analysis to a concrete next step.">
          <Flow steps={[{ t: "Weak Concept" }, { t: "Root Cause" }, { t: "Relevant Course Material" }, { t: "Recommended Study Action" }]} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Review a specific concept", "Revisit a prerequisite", "Read a relevant section", "Practice related questions"].map((t, k) => (
              <R key={t} d={8 + k}><div className="rounded-lp-card border border-dashed border-lp-border px-5 py-4 text-lg">→ {t}</div></R>
            ))}
          </div>
        </Slide>

        {/* 16 TEAM */}
        <Slide id="team" n={16} eyebrow="The Team" title="Seven people. One system.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, k) => (
              <R key={m.n} d={3 + k} className={m.lead ? "sm:col-span-2 lg:row-span-2 lg:col-span-1" : ""}>
                <div className={`flex h-full flex-col rounded-lp-card border p-6 shadow-lp-card ${m.lead ? "border-lp-primary bg-lp-primary text-lp-primary-foreground" : "border-lp-border bg-lp-surface"}`}>
                  <div className={`grid h-12 w-12 place-items-center rounded-full font-display text-lg font-semibold ${m.lead ? "bg-lp-primary-foreground text-lp-primary" : "bg-lp-primary-surface text-lp-primary-hover"}`}>
                    {m.n.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className={`mt-auto pt-8 font-display font-semibold ${m.lead ? "text-3xl" : "text-xl"}`}>{m.n}</div>
                  <div className={`mt-1 text-sm ${m.lead ? "text-lp-primary-foreground" : "text-lp-foreground-muted"}`}>{m.r}</div>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 17 STATUS */}
        <Slide id="status" n={17} eyebrow="Current Status · Core System" title="What the core system covers today.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Course material processing", "Documents", "Concepts", "Quiz / assessment analysis", "AI integration", "RAG", "Weakness detection", "Root-cause analysis", "Recommendations", "Backend API", "SQL Server persistence"].map((t, k) => (
              <R key={t} d={3 + k}>
                <div className="flex items-center gap-3 rounded-lp-card border border-lp-border bg-lp-surface px-5 py-4 shadow-lp-card">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lp-primary text-lp-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                  <span className="font-medium">{t}</span>
                </div>
              </R>
            ))}
            <R d={14}><div className="flex h-full items-center rounded-lp-card bg-lp-primary-surface px-5 py-4 font-mono text-xs uppercase tracking-widest text-lp-primary-hover">Core · current scope</div></R>
          </div>
        </Slide>

        {/* 18 FUTURE */}
        <Slide id="future" n={18} eyebrow="Future Vision · Planned" title="Where Study OS could go next." sub="Planned developments — not part of the current implementation.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { i: CalendarDays, t: "Study Planner", s: "Turn recommendations into a scheduled study path." },
              { i: Trophy, t: "Gamification", s: "Motivation through progress and achievements." },
              { i: Users, t: "Study Communities", s: "Learn together around shared courses." },
            ].map((c, k) => (
              <R key={c.t} d={3 + k} className="h-full">
                <div className="flex h-full flex-col rounded-lp-card border-2 border-dashed border-lp-warning bg-lp-warn-surface p-8">
                  <div className="flex items-center justify-between">
                    <c.i className="h-8 w-8 text-lp-warning" />
                    <span className="rounded-full border border-lp-warning px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-lp-warning">Planned</span>
                  </div>
                  <div className="mt-auto pt-16 font-display text-2xl font-semibold">{c.t}</div>
                  <p className="mt-2 text-lp-foreground-muted">{c.s}</p>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 19 LIMITATIONS */}
        <Slide id="limitations" n={19} eyebrow="Limitations" title="Honest about what AI can — and can't — do.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "AI output is probabilistic.",
              "Root-cause detection is an inference, not a guaranteed diagnosis.",
              "Large documents require careful processing and retrieval.",
              "AI quality depends on the quality and structure of the learning material.",
              "RAG improves grounding but does not guarantee perfect answers.",
              "Processing large documents can require extra time and compute.",
            ].map((t, k) => (
              <R key={t} d={3 + k}>
                <div className="flex h-full items-start gap-4 rounded-lp-card border border-lp-border bg-lp-surface p-6 shadow-lp-card">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-lp-warning" />
                  <span className="text-lg">{t}</span>
                </div>
              </R>
            ))}
          </div>
        </Slide>

        {/* 20 FINAL */}
        <section data-slide={20} className="slide relative flex flex-col justify-center overflow-hidden bg-lp-foreground px-[5vw] text-lp-background lg:px-[4vw]">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
          <R><div className="relative font-mono text-xs uppercase tracking-[0.2em] text-lp-background/60">20 — Closing</div></R>
          <R d={1}>
            <h2 className="relative mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl xl:text-9xl">
              Study OS turns learning data into <span className="text-lp-coral">understanding.</span>
            </h2>
          </R>
          <R d={3}><p className="relative mt-10 font-mono text-sm text-lp-background/60">Thank you · Questions welcome</p></R>
        </section>
      </div>
    </div>
  );
}
