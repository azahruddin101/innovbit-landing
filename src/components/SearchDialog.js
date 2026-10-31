"use client";

import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX } from "@/config/site";

/** The header's search: type a feature and jump to its section. Arrow keys move, Enter goes, Escape closes. */
export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 8);
    return SEARCH_INDEX.filter((r) => `${r.title} ${r.text}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    input.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const go = (r) => {
    onClose();
    setQuery("");
    setIndex(0);
    window.location.assign(r.href);
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[index]) { e.preventDefault(); go(results[index]); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Search the platform" className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-float" onKeyDown={onKey}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-5 w-5 shrink-0 text-mute" />
          <input
            ref={input}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
            placeholder="Search features: leads, GST billing, serial numbers…"
            aria-label="Search"
            className="h-14 w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-mute"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mute hover:bg-paper hover:text-ink"><X className="h-4 w-4" /></button>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-[14px] text-mute">Nothing matches “{query}”. Try “billing”, “leads” or “portal”.</li>}
          {results.map((r, i) => (
            <li key={r.title}>
              <a href={r.href} onClick={(e) => { e.preventDefault(); go(r); }} onMouseEnter={() => setIndex(i)} className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 ${i === index ? "bg-mint" : ""}`}>
                <span className="min-w-0"><span className="block text-[14.5px] font-medium text-ink">{r.title}</span><span className="block truncate text-[12.5px] text-mute">{r.text}</span></span>
                {i === index ? <CornerDownLeft className="h-4 w-4 shrink-0 text-brand" /> : <ArrowRight className="h-4 w-4 shrink-0 text-line" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line bg-paper px-4 py-2 font-mono text-[10.5px] text-mute"><span>↑ ↓ to move · Enter to go</span><span>Esc to close</span></div>
      </div>
    </div>
  );
}
