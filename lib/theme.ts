import { CardTheme } from "./types";

export function themeClass(t: CardTheme) {
  switch (t) {
    case "midnight":
      return "bg-gradient-to-br from-zinc-900 via-indigo-950 to-emerald-950";
    case "ocean":
      return "bg-gradient-to-br from-sky-900 via-indigo-900 to-cyan-700";
    case "forest":
      return "bg-gradient-to-br from-emerald-950 via-green-950 to-lime-800";
    case "sunset":
      return "bg-gradient-to-br from-fuchsia-900 via-rose-900 to-amber-700";
    case "violet":
      return "bg-gradient-to-br from-violet-950 via-indigo-900 to-fuchsia-800";
    case "slate":
    default:
      return "bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-700";
  }
}

export function themeLabel(t: CardTheme) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
