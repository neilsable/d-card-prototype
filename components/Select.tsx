"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option<T extends string> = { value: T; label: string; hint?: string };

export function Select<T extends string>(props: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  placeholder?: string;
  ariaLabel?: string;
}) {
  const { value, onChange, options, placeholder, ariaLabel } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selectedIdx = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options.find((o) => o.value === value);

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(selectedIdx);

  // Type-to-search buffer
  const typeBufRef = useRef<string>("");
  const typeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveIdx(selectedIdx);
  }, [selectedIdx]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function commit(idx: number) {
    const opt = options[idx];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
  }

  function clampIdx(i: number) {
    return Math.max(0, Math.min(options.length - 1, i));
  }

  function scrollActiveIntoView(idx: number) {
    const container = listRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLButtonElement>(`button[data-idx="${idx}"]`);
    if (!el) return;
    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;
    if (elTop < viewTop) container.scrollTop = elTop;
    else if (elBottom > viewBottom) container.scrollTop = elBottom - container.clientHeight;
  }

  function openAndFocus() {
    setOpen(true);
    // ensure active is visible after open
    setTimeout(() => scrollActiveIntoView(activeIdx), 0);
  }

  function handleTypeSearch(char: string) {
    const c = char.toLowerCase();
    typeBufRef.current += c;

    if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current);
    typeTimerRef.current = window.setTimeout(() => {
      typeBufRef.current = "";
      typeTimerRef.current = null;
    }, 650);

    const q = typeBufRef.current;
    if (!q) return;

    const start = activeIdx + 1;
    const loop = [...options.slice(start), ...options.slice(0, start)];
    const hit = loop.findIndex((o) => o.label.toLowerCase().startsWith(q));
    if (hit >= 0) {
      const realIdx = (start + hit) % options.length;
      setActiveIdx(realIdx);
      setTimeout(() => scrollActiveIntoView(realIdx), 0);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="field flex items-center justify-between gap-3"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openAndFocus())}
        onKeyDown={(e) => {
          // Closed state key handling
          if (!open) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openAndFocus();
              return;
            }
            if (e.key.length === 1 && /[a-z0-9 ]/i.test(e.key)) {
              e.preventDefault();
              openAndFocus();
              handleTypeSearch(e.key);
              return;
            }
            return;
          }

          // Open state key handling
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            commit(activeIdx);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = clampIdx(activeIdx + 1);
            setActiveIdx(next);
            setTimeout(() => scrollActiveIntoView(next), 0);
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = clampIdx(activeIdx - 1);
            setActiveIdx(prev);
            setTimeout(() => scrollActiveIntoView(prev), 0);
            return;
          }
          if (e.key === "Home") {
            e.preventDefault();
            setActiveIdx(0);
            setTimeout(() => scrollActiveIntoView(0), 0);
            return;
          }
          if (e.key === "End") {
            e.preventDefault();
            const last = options.length - 1;
            setActiveIdx(last);
            setTimeout(() => scrollActiveIntoView(last), 0);
            return;
          }
          if (e.key.length === 1 && /[a-z0-9 ]/i.test(e.key)) {
            e.preventDefault();
            handleTypeSearch(e.key);
            return;
          }
        }}
      >
        <span className={selected ? "text-white" : "text-white/50"}>
          {selected ? selected.label : placeholder ?? "Select..."}
        </span>
        <span className="text-white/60">▾</span>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-72 overflow-auto rounded-2xl border border-white/15 bg-black/80 backdrop-blur shadow-2xl shadow-black/60"
        >
          {options.map((o, idx) => {
            const isActive = idx === activeIdx;
            const isSelected = o.value === value;

            return (
              <button
                key={o.value}
                type="button"
                role="option"
                data-idx={idx}
                aria-selected={isSelected}
                className={[
                  "w-full text-left px-4 py-3 text-sm transition",
                  "border-b border-white/10 last:border-b-0",
                  // Selected state is always highlighted
                  isSelected
                    ? "bg-gradient-to-r from-indigo-500/25 via-sky-400/10 to-emerald-400/25 text-white"
                    : "text-white/80",
                  // Active (hover/keyboard) highlight
                  !isSelected && (isActive ? "bg-white/10 text-white" : "hover:bg-white/10 hover:text-white"),
                ].join(" ")}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => commit(idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{o.label}</span>
                  {o.hint && <span className="text-xs text-white/50">{o.hint}</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
