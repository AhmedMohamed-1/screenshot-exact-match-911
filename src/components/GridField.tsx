import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SPACING = 56;
const TILE = 44;
const INFLUENCE = 240;
const INFLUENCE2 = INFLUENCE * INFLUENCE;
const MAX_PUSH = 10;
const MAX_SCALE = 0.07;
const MAX_OPACITY = 0.5;
const MAX_ROTATION = 3;
const MOUSE_LERP = 0.25;
const PRESENCE_LERP = 0.08;
const CELL_LERP = 0.16;

type Cell = { el: HTMLDivElement; x: number; y: number; cur: number; on: boolean };

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

/**
 * A mouse-proximity "field" that overlays an existing CSS grid background.
 * Tiles align to the same 56px rhythm as `.grid-bg` and stay invisible at rest,
 * so the static background is preserved verbatim. Only pointer devices with
 * hover capability enable the interaction; touch and reduced-motion get the
 * untouched static grid.
 */
export function GridField({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const section = host.parentElement;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cells: Cell[] = [];
    let raf = 0;
    let running = false;
    let inited = false;
    let hasPointer = false;
    let rawX = 0;
    let rawY = 0;
    let px = 0;
    let py = 0;
    let presence = 0;
    let presenceTarget = 0;

    const build = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      const cols = Math.max(1, Math.ceil(w / SPACING));
      const rows = Math.max(1, Math.ceil(h / SPACING));
      const frag = document.createDocumentFragment();
      const next: Cell[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const el = document.createElement("div");
          el.className = "grid-cell";
          el.style.left = `${c * SPACING + (SPACING - TILE) / 2}px`;
          el.style.top = `${r * SPACING + (SPACING - TILE) / 2}px`;
          frag.appendChild(el);
          next.push({
            el,
            x: c * SPACING + SPACING / 2,
            y: r * SPACING + SPACING / 2,
            cur: 0,
            on: false,
          });
        }
      }
      host.replaceChildren(frag);
      cells = next;
    };

    const frame = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      let moving = false;
      if (hasPointer) {
        const tx = rawX - rect.left;
        const ty = rawY - rect.top;
        if (!inited) {
          px = tx;
          py = ty;
          inited = true;
          moving = true;
        } else {
          moving = Math.abs(tx - px) > 0.5 || Math.abs(ty - py) > 0.5;
          px += (tx - px) * MOUSE_LERP;
          py += (ty - py) * MOUSE_LERP;
        }
      }
      const prevPresence = presence;
      presence += (presenceTarget - presence) * PRESENCE_LERP;
      if (presenceTarget === 0 && presence < 0.0005) presence = 0;
      const presenceMoving = Math.abs(presence - prevPresence) > 0.0004;
      let settling = false;

      for (const cell of cells) {
        let target = 0;
        if (presence > 0) {
          const dx = cell.x - px;
          const dy = cell.y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < INFLUENCE2) {
            const d = Math.sqrt(d2);
            let u = 1 - d / INFLUENCE;
            u = u * u * (3 - 2 * u);
            target = u * presence;
          }
        }
        const cur = cell.cur + (target - cell.cur) * CELL_LERP;

        if (target < 0.0006 && cur < 0.0006) {
          if (cell.on) {
            cell.on = false;
            cell.cur = 0;
            cell.el.style.transform = "";
            cell.el.style.opacity = "0";
            cell.el.style.willChange = "";
          }
          continue;
        }

        if (!cell.on) {
          cell.on = true;
          cell.el.style.willChange = "transform, opacity";
        }
        if (Math.abs(target - cur) > 0.001) settling = true;
        cell.cur = cur;

        const dx = cell.x - px;
        const dy = cell.y - py;
        const d = Math.hypot(dx, dy) || 1;
        const push = MAX_PUSH * cur;
        const offX = (-dx / d) * push;
        const offY = (-dy / d) * push;
        const scale = 1 + MAX_SCALE * cur;
        const rot = clamp((dx / INFLUENCE) * MAX_ROTATION * cur, -MAX_ROTATION, MAX_ROTATION);
        cell.el.style.transform = `translate3d(${offX.toFixed(2)}px, ${offY.toFixed(2)}px, 0) scale(${scale.toFixed(3)}) rotate(${rot.toFixed(2)}deg)`;
        cell.el.style.opacity = (MAX_OPACITY * cur).toFixed(3);
      }

      if (!moving && !presenceMoving && !settling) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      rawX = e.clientX;
      rawY = e.clientY;
      hasPointer = true;
      presenceTarget = 1;
      start();
    };

    const onPointerLeave = () => {
      presenceTarget = 0;
      hasPointer = false;
      inited = false;
      start();
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(host);
    build();

    section.addEventListener("pointerenter", onPointerMove, { passive: true });
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      section.removeEventListener("pointerenter", onPointerMove);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("grid-field pointer-events-none absolute inset-0", className)}
    />
  );
}
