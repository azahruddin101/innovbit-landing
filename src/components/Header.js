"use client";

import { ArrowRight, ChevronDown, Menu, Mail, Search, Sun, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MENU, SITE } from "@/config/site";
import SearchDialog from "./SearchDialog";
import { btn } from "./ui";

const SECTION_IDS = ["top", "segments", "platform", "journey", "trust", "leads", "design", "billing", "operations", "installation", "paperwork", "portal", "control", "faq", "contact"];

/** Which menu item a section belongs to, so the menu shows where you are. The first match wins. */
const ownerOf = (id) => MENU.find((m) => m.href === `#${id}` || m.groups?.some((g) => g.items.some((i) => i.href === `#${id}`)))?.label;

function Logo({ onClick }) {
  return (
    <a href="#top" onClick={onClick} className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-[-0.03em] text-ink" aria-label={`${SITE.name} home`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-brand text-white">
        <span className="absolute top-1 left-1 h-2 w-2 rounded-[3px] bg-sun" aria-hidden="true" />
        <Sun className="mt-0.5 ml-0.5 h-5 w-5" strokeWidth={2.4} />
      </span>
      <span>Solar<span className="text-brand">Desy</span></span>
    </a>
  );
}

/** A dropdown panel: the item's groups side by side, like a catalogue. */
function Panel({ item, onNavigate }) {
  return (
    <div className="mx-auto grid w-full max-w-[1380px] gap-x-10 gap-y-8 px-8 py-9 lg:grid-cols-4">
      {item.groups.map((g) => (
        <div key={g.title}>
          <p className="border-b border-line pb-2 font-mono text-[11px] font-medium tracking-[0.16em] text-brand uppercase">{g.title}</p>
          <ul className="mt-3 space-y-0.5">
            {g.items.map((i) => (
              <li key={i.label}>
                <a href={i.href} onClick={onNavigate} className="group flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[14.5px] text-ink-soft transition hover:bg-mint hover:text-ink">
                  {i.label}<ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-brand opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {item.signIn ? (
        <div className="rounded-2xl bg-mint p-5 lg:col-start-4">
          <p className="text-[15px] font-semibold text-ink">Already have a workspace?</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">Sign in with the email and password your company was given.</p>
          <a href={SITE.appUrl} className={`${btn.brand} mt-4 !h-10 !px-5 !text-[14px]`}>Sign in <ArrowRight className="h-4 w-4" /></a>
        </div>
      ) : (
        <div className="rounded-2xl bg-mint p-5 lg:col-start-4">
          <p className="text-[15px] font-semibold text-ink">See it with your own numbers</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">We’ll set up a workspace and walk you through it with your leads and price list.</p>
          <a href="#contact" onClick={onNavigate} className={`${btn.primary} mt-4 !h-10 !px-5 !text-[14px]`}>Book a demo <ArrowRight className="h-4 w-4" /></a>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // label of the open desktop panel
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null); // label of the open mobile accordion
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState("Home");
  const wrap = useRef(null);
  const closeTimer = useRef(null);

  const closeAll = useCallback(() => { setOpenMenu(null); setMobile(false); }, []);
  const openSoon = (label) => { clearTimeout(closeTimer.current); setOpenMenu(label); };
  const closeSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpenMenu(null), 160); };

  // the utility row folds away once the page moves, leaving only the menu bar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // the menu shows which part of the page you are reading
  useEffect(() => {
    const seen = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit) setActive(ownerOf(hit.target.id) || "Home");
    }, { rootMargin: "-45% 0px -50% 0px" });
    seen.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape closes a panel or the mobile menu; a click outside closes the panel; Ctrl/Cmd + K opens search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeAll();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
    };
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpenMenu(null); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [closeAll]);

  useEffect(() => {
    if (!mobile) return undefined;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  const open = MENU.find((m) => m.label === openMenu && m.groups);

  return (
    <>
      <header ref={wrap} className="fixed inset-x-0 top-0 z-50" onMouseLeave={closeSoon}>
        {/* utility row: tagline on the left; search, sign in and contact on the right */}
        <div className={`hidden overflow-hidden border-b border-line bg-paper transition-[height,opacity] duration-300 lg:block ${scrolled ? "h-0 border-transparent opacity-0" : "h-9 opacity-100"}`}>
          <div className="mx-auto flex h-9 max-w-[1380px] items-center justify-between px-8 xl:px-12 text-[12.5px] text-ink-soft">
            <p>{SITE.tagline}</p>
            <ul className="flex items-center gap-6">
              <li><button type="button" onClick={() => setSearch(true)} className="flex items-center gap-1.5 transition hover:text-ink"><Search className="h-3.5 w-3.5" />Search <kbd className="rounded border border-line bg-white px-1.5 font-mono text-[10px] text-mute">⌘K</kbd></button></li>
              <li><a href={`mailto:${SITE.contactEmail}`} className="flex items-center gap-1.5 transition hover:text-ink"><Mail className="h-3.5 w-3.5" />Contact</a></li>
              <li><a href={SITE.appUrl} className="font-medium text-brand transition hover:text-brand-deep">Sign in</a></li>
            </ul>
          </div>
        </div>

        {/* main bar */}
        <div className={`border-b border-line bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-18px_rgb(12_24_48/0.4)]" : ""}`}>
          <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between px-5 sm:px-8 xl:px-12 lg:h-[72px]">
            <Logo onClick={closeAll} />
            <nav aria-label="Main" className="hidden h-full lg:block">
              <ul className="flex h-full items-stretch gap-1">
                {MENU.map((m) => {
                  const on = active === m.label;
                  const style = `relative flex h-full items-center gap-1.5 px-4 text-[15px] font-medium transition after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:rounded-t after:bg-brand after:transition-transform after:duration-200 ${on || openMenu === m.label ? "text-ink after:scale-x-100" : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100"}`;
                  return (
                    <li key={m.label} className="h-full" onMouseEnter={() => (m.groups ? openSoon(m.label) : setOpenMenu(null))}>
                      {m.groups ? (
                        <button type="button" className={style} aria-expanded={openMenu === m.label} aria-controls={`panel-${m.label}`} onClick={() => setOpenMenu(openMenu === m.label ? null : m.label)}>
                          {m.label}<ChevronDown className={`h-4 w-4 transition ${openMenu === m.label ? "rotate-180" : ""}`} />
                        </button>
                      ) : (
                        <a href={m.href} className={style} onClick={closeAll}>{m.label}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition hover:bg-paper hover:text-ink lg:hidden"><Search className="h-5 w-5" /></button>
              <a href="#contact" onClick={closeAll} className={`${btn.primary} !hidden !h-10 !px-5 !text-[14px] sm:!inline-flex`}>Book a demo</a>
              <button type="button" onClick={() => setMobile(true)} aria-expanded={mobile} aria-controls="mobile-menu" aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-ink lg:hidden"><Menu className="h-5 w-5" /></button>
            </div>
          </div>
          {open && (
            <div id={`panel-${open.label}`} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-float" onMouseEnter={() => openSoon(open.label)}>
              <Panel item={open} onNavigate={closeAll} />
            </div>
          )}
        </div>
      </header>

      {/* off-canvas menu for phones and tablets */}
      {mobile && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setMobile(false)} aria-hidden="true" />
          <nav id="mobile-menu" aria-label="Mobile" className="menu-in absolute top-0 right-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-float">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <Logo onClick={closeAll} />
              <button type="button" onClick={() => setMobile(false)} aria-label="Exit menu" className="flex h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-[13px] font-medium text-ink"><X className="h-4 w-4" />Exit menu</button>
            </div>
            <button type="button" onClick={() => { setMobile(false); setSearch(true); }} className="mx-5 mt-5 flex h-12 items-center gap-3 rounded-xl border border-line bg-paper px-4 text-[15px] text-mute"><Search className="h-4.5 w-4.5" />Search the platform</button>
            <ul className="mt-3 flex-1 divide-y divide-line px-5">
              {MENU.map((m) => (
                <li key={m.label}>
                  {m.groups ? (
                    <>
                      <button type="button" aria-expanded={mobileOpen === m.label} onClick={() => setMobileOpen(mobileOpen === m.label ? null : m.label)} className="flex h-14 w-full items-center justify-between text-[17px] font-medium text-ink">
                        {m.label}<ChevronDown className={`h-5 w-5 text-mute transition ${mobileOpen === m.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileOpen === m.label && (
                        <div className="space-y-5 pb-5">
                          {m.groups.map((g) => (
                            <div key={g.title}>
                              <p className="font-mono text-[10.5px] tracking-[0.16em] text-brand uppercase">{g.title}</p>
                              <ul className="mt-2 border-l border-line">
                                {g.items.map((i) => <li key={i.label}><a href={i.href} onClick={closeAll} className="block py-2 pl-4 text-[15px] text-ink-soft">{i.label}</a></li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={m.href} onClick={closeAll} className="flex h-14 items-center text-[17px] font-medium text-ink">{m.label}</a>
                  )}
                </li>
              ))}
            </ul>
            <div className="shrink-0 space-y-3 border-t border-line p-5">
              <a href="#contact" onClick={closeAll} className={`${btn.primary} w-full`}>Book a demo</a>
              <a href={SITE.appUrl} className={`${btn.secondary} w-full`}>Sign in</a>
            </div>
          </nav>
        </div>
      )}

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
