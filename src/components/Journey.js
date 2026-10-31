"use client";

import { BadgeIndianRupee, CalendarClock, ChevronDown, FileText, HardHat, Landmark, LayoutDashboard, LifeBuoy, Megaphone, Package, PenTool, Receipt, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Scene3D from "./Scene3D";
import { Container, Em, SectionHead } from "./ui";

/** Every feature, in the order a project meets it. */
const CHAPTERS = [
  { icon: Megaphone, kicker: "Capture", title: "A lead arrives", chips: ["Meta Lead Ads", "Google Ads", "Google Sheets"], text: "Enquiries land in one inbox on their own, from Meta Lead Ads, Google Ads or a Google Sheet. Walk-ins go in on your own lead form, and spreadsheets import in one go.", bullets: ["Handed to a telecaller automatically or by you", "Excel and CSV import", "Your own lead form fields"] },
  { icon: Megaphone, kicker: "Follow up", title: "It moves across the board", chips: ["Called", "Site visit", "Converted"], text: "Board and list views, statuses you define and follow-up dates. Every hand-over and reschedule is logged, so nothing is lost when a lead changes hands.", bullets: ["Kanban board and list", "Reassignment history and priorities", "Convert a lead to a client in one step"] },
  { icon: Users, kicker: "Know the client", title: "One record per client", chips: ["Documents", "Referral", "Portal login"], text: "Contact details, documents, where they came from and who referred them. Everything that happens to this client, from proposal to maintenance, lands on the same record.", bullets: ["ID, bills and site papers kept together", "Source and referral tracking", "A portal sign-in with one click"] },
  { icon: PenTool, kicker: "Design", title: "Designed on the real roof", chips: ["Satellite roof", "3D layout", "Shading"], text: "Trace the roof on satellite imagery and lay panels out in 3D. Shading from parapets, tanks, trees and neighbouring rows is worked out hour by hour, with energy calibrated against Google’s Solar API where it has data.", bullets: ["Quick proposals with no 3D when you need speed", "Ready-made packages and your price list", "Yearly energy and payback"] },
  { icon: FileText, kicker: "Propose", title: "A proposal the client can sign", chips: ["9-page PDF", "Share link", "Accepted online"], text: "A branded PDF with your logo, signature, terms and options, plus a link. Clients accept, decline or ask for changes online, and you see their answer straight away.", bullets: ["Your colours and terms on every page", "Subsidy, loan and AMC options built in", "Versions and a validity date"] },
  { icon: Landmark, kicker: "Finance the job", title: "Loan and subsidy, step by step", chips: ["Loan steps", "PM Surya Ghar", "EMI worked out"], text: "Set your own loan and subsidy steps once. Switch either on for a proposal and a file opens on those steps, with papers on every step and a remark the client can read.", bullets: ["EMI calculated from amount, rate and period", "Expected against received subsidy", "Progress shown in the client’s portal"] },
  { icon: Package, kicker: "Stock", title: "Goods leave the shelf", chips: ["E-way bill", "Batches", "Serial numbers"], text: "Receive stock in batches with three price tiers. Panels, inverters and batteries are tracked one by one. An e-way bill takes the goods out and prices them from their batches.", bullets: ["Oldest stock sells first", "Low-stock alerts and supplier bills", "Warranty from the install date"] },
  { icon: Receipt, kicker: "Bill", title: "Paid, billed, invoiced", chips: ["Bill", "GST invoice", "Credit note"], text: "A bill records the payment, an invoice settles the bills with GST per line and CGST, SGST or IGST shown. Goods back? A credit note refunds them and returns the stock. Mistakes are voided, never silently edited.", bullets: ["Your own number series", "Branded PDFs, shared on WhatsApp", "Payments flow into the proposal’s ledger"] },
  { icon: HardHat, kicker: "Install", title: "The crew gets to work", chips: ["Steps", "Photo + location", "Stuck alert"], text: "Your installation steps are copied onto every job and assigned to field staff, who update progress from their phone with a photo and their location. Steps that stall raise an alert.", bullets: ["Priorities and an owner on every step", "Project expenses against what the job earns", "A staff workspace in the phone browser"] },
  { icon: CalendarClock, kicker: "Maintain", title: "Maintenance runs itself", chips: ["AMC visits", "Client booking", "Parts billed"], text: "Maintenance visits schedule themselves after handover. Clients can book them, you assign them, and any parts replaced are billed straight from stock.", bullets: ["Due-today and overdue lists", "Email reminders", "Reassignment history"] },
  { icon: LifeBuoy, kicker: "Keep them informed", title: "The client sees it all", chips: ["Proposals", "Bills", "Help requests"], text: "Every client with an email address gets a sign-in on their phone: proposals to accept, bills and invoices, loan and subsidy progress, maintenance bookings and a place to ask for help.", bullets: ["Each client sees only their own records", "Help requests land with your team", "Nothing to install"] },
  { icon: LayoutDashboard, kicker: "Run the business", title: "Roles, dashboards, privacy", chips: ["Your roles", "Dashboards", "Private workspace"], text: "Staff always see their own work; anything more comes from roles you define, action by action. Dashboards show pipeline, money in, stock, maintenance due and team performance.", bullets: ["Roles you name and shape", "Every company’s data stays its own", "Plans sized to your team"] },
];

const N = CHAPTERS.length;
const par = (px, extra = "") => ({ transform: `translate3d(${extra || "0"}, calc(var(--p) * ${px}px), 0)` });

/* The scene: dawn to golden hour, with the sun crossing the sky and the roof filling with panels as the project moves on. */
function Scene() {
  const panel = (x, y, key) => <polygon key={key} points={`${x},${y} ${x + 44},${y} ${x + 49},${y + 24} ${x + 5},${y + 24}`} fill="#1f3f6e" stroke="#a9bddb" strokeWidth="1" />;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(#bfe3f3,#eaf6fb_70%)]" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(#f9c9a0,#fde9cc_70%)]" style={{ opacity: "max(0, calc(1 - var(--p) * 3.2))" }} />
      <div className="absolute inset-0 bg-[linear-gradient(#f4b266,#fde5b4_70%)]" style={{ opacity: "max(0, calc(var(--p) * 3.2 - 2.2))" }} />

      {/* sun: left to right across an arc as the story moves */}
      <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,#fff6d6_0%,#e0372c_45%,rgb(245_184_46/0)_72%)] sm:h-32 sm:w-32" style={{ left: "calc(6% + var(--p) * 78%)", top: "calc(44% - sin(calc(var(--p) * 3.14159rad)) * 34%)" }} />

      {/* clouds drift sideways at their own speeds */}
      <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-1/2 w-[130%]" style={{ transform: "translate3d(calc(var(--p) * -140px), calc(var(--p) * 20px), 0)" }}>
        <g fill="#fff" opacity=".85"><ellipse cx="220" cy="90" rx="90" ry="26" /><ellipse cx="270" cy="72" rx="56" ry="24" /><ellipse cx="820" cy="140" rx="110" ry="30" /><ellipse cx="880" cy="120" rx="64" ry="26" /></g>
      </svg>
      <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-6 h-1/2 w-[130%]" style={{ transform: "translate3d(calc(var(--p) * -70px), 0, 0)" }}>
        <g fill="#fff" opacity=".6"><ellipse cx="520" cy="60" rx="70" ry="18" /><ellipse cx="1010" cy="70" rx="80" ry="20" /></g>
      </svg>

      <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMax slice" overflow="visible" className="absolute inset-0 h-full w-full">
        <g style={par(-26)}><path d="M0 470 Q160 380 330 440 T640 420 T950 430 T1200 400 V1300 H0Z" fill="#cde3d6" /></g>
        <g style={par(-56)}>
          <path d="M0 520 Q200 450 420 505 T820 490 T1200 470 V1300 H0Z" fill="#a8cfb7" />
          <g fill="#6aa683"><circle cx="150" cy="480" r="34" /><circle cx="196" cy="494" r="26" /><circle cx="1030" cy="470" r="38" /><circle cx="1082" cy="488" r="26" /></g>
        </g>
        <g style={par(-84)}>
          <path d="M0 590 Q300 540 600 580 T1200 560 V1300 H0Z" fill="#7fb08f" />
          <g className="house-shift">
          {/* the house */}
          <rect x="470" y="470" width="430" height="150" fill="#f3e9d6" />
          <polygon points="440,474 930,474 870,392 500,392" fill="#4d5a66" />
          <rect x="440" y="474" width="490" height="8" fill="#3a4550" />
          <rect x="515" y="508" width="48" height="58" fill="#a9d0e6" stroke="#d9cdb4" strokeWidth="4" /><rect x="765" y="508" width="48" height="58" fill="#a9d0e6" stroke="#d9cdb4" strokeWidth="4" />
          <rect x="640" y="528" width="54" height="92" fill="#8a5a3c" />
          {/* panels fill the roof as the project moves on */}
          <g style={{ opacity: "clamp(0, calc(var(--i) - 3), 1)", transition: "opacity .5s" }}>{[0, 1, 2, 3, 4, 5].map((c) => panel(520 + c * 54 - 0, 408, `a${c}`))}</g>
          <g style={{ opacity: "clamp(0, calc(var(--i) - 4), 1)", transition: "opacity .5s" }}>{[0, 1, 2, 3, 4, 5].map((c) => panel(508 + c * 56, 440, `b${c}`))}</g>
          {/* inverter and meter on the wall */}
          <g style={{ opacity: "clamp(0, calc(var(--i) - 5), 1)", transition: "opacity .5s" }}><rect x="840" y="500" width="40" height="56" rx="5" fill="#e5ece8" stroke="#8fa39a" strokeWidth="2" /><circle cx="860" cy="520" r="5" fill="#2358b3" /><rect x="848" y="534" width="24" height="4" fill="#8fa39a" /></g>
          {/* a crew member on the roof while it is being installed */}
          <g style={{ opacity: "clamp(0, calc(1.6 - abs(var(--i) - 8.5)), 1)", transition: "opacity .5s" }}>
            <circle cx="470" cy="376" r="9" fill="#e9b88f" /><path d="M458 372 q12 -16 24 0z" fill="#e0372c" />
            <rect x="460" y="385" width="20" height="30" rx="4" fill="#e0372c" /><rect x="462" y="414" width="7" height="22" fill="#3a4550" /><rect x="472" y="414" width="7" height="22" fill="#3a4550" />
          </g>
          </g>
        </g>
        {/* the client's phone, once the portal is in play */}
        <g className="phone-shift" style={{ ...par(-120), opacity: "clamp(0, calc(var(--i) - 9), 1)", transition: "opacity .5s" }}>
          <rect x="190" y="560" width="62" height="112" rx="12" fill="#0b1612" /><rect x="196" y="572" width="50" height="88" rx="6" fill="#f7f6f1" />
          <rect x="202" y="582" width="38" height="6" rx="3" fill="#2358b3" /><rect x="202" y="596" width="38" height="4" rx="2" fill="#cfd8d3" /><rect x="202" y="606" width="28" height="4" rx="2" fill="#cfd8d3" /><rect x="202" y="622" width="38" height="14" rx="4" fill="#e0372c" />
        </g>
        <g style={par(-170)}>
          <path d="M0 690 Q300 650 620 684 T1200 668 V1300 H0Z" fill="#5f9a74" />
          <g stroke="#4a7f5c" strokeWidth="3" strokeLinecap="round"><path d="M80 730 v-26 M96 734 v-34 M112 730 v-22 M1010 726 v-30 M1030 732 v-38 M1050 728 v-24" /></g>
        </g>
      </svg>
    </div>
  );
}

export default function Journey() {
  const [glReady, setGlReady] = useState(false);
  const track = useRef(null);
  const stage = useRef(null);
  const [active, setActive] = useState(0);
  const last = useRef(0);

  // scroll progress through the track drives the scene (continuous) and the chapter (stepped)
  useEffect(() => {
    const el = track.current;
    const st = stage.current;
    if (!el || !st) return undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const run = Math.max(1, rect.height - st.offsetHeight - 80);
      const p = Math.min(1, Math.max(0, -(rect.top - 80) / run));
      const i = Math.min(N - 1, Math.floor(p * N));
      st.style.setProperty("--p", still ? "0.5" : p.toFixed(4)); // reduced motion: the scene holds still, the chapters still change
      st.style.setProperty("--i", String(i));
      if (i !== last.current) { last.current = i; setActive(i); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const jump = useCallback((i) => {
    const el = track.current;
    const st = stage.current;
    if (!el || !st) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - st.offsetHeight - 80;
    window.scrollTo({ top: top - 80 + ((i + 0.5) / N) * run, behavior: "smooth" });
  }, []);

  const c = CHAPTERS[active];
  const Icon = c.icon;

  return (
    <section id="journey" className="bg-paper pt-20 sm:pt-28">
      <Container>
        <SectionHead center eyebrow="How it works" title={<>From the first lead to <Em>the tenth-year visit.</Em></>} lede="Scroll to follow one project through every part of the platform. The day moves on, the roof fills with panels, and each step shows what you get." />
      </Container>

      <div ref={track} className="relative mt-12" style={{ height: `${N * 62 + 100}vh` }}>
        <div ref={stage} className="sticky top-20 mx-auto h-[calc(100svh-6rem)] max-h-[820px] min-h-[540px] w-full max-w-[1480px] overflow-hidden sm:rounded-[2rem]" style={{ "--p": 0, "--i": 0 }}>
          {!glReady && <Scene />}
          <Scene3D stageRef={stage} onReady={() => setGlReady(true)} onFail={() => setGlReady(false)} />

          {/* progress rail (wide screens): jump to any chapter */}
          <ol className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 flex-col gap-1.5 rounded-full border border-white/60 bg-white/70 p-1.5 shadow-lift backdrop-blur-md lg:flex" aria-label="Chapters">
            {CHAPTERS.map((ch, i) => (
              <li key={ch.title}>
                <button type="button" onClick={() => jump(i)} aria-label={`Go to: ${ch.title}`} aria-current={i === active ? "step" : undefined} className={`grid h-8 w-8 place-items-center rounded-full font-mono text-[10.5px] transition ${i === active ? "bg-ink text-white" : i < active ? "bg-brand/15 text-brand" : "text-mute hover:bg-white"}`}>{String(i + 1).padStart(2, "0")}</button>
              </li>
            ))}
          </ol>

          {/* the chips of the current chapter float over the scene; on phones the progress bar sits under them */}
          <div className="absolute top-4 right-4 left-4 z-10 flex flex-col gap-3 lg:top-5 lg:left-20">
            <ul key={`chips-${active}`} className="flex flex-wrap gap-1.5 sm:gap-2">
              {c.chips.map((t, k) => <li key={t} className="pop rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[12px] font-medium text-ink shadow-lift backdrop-blur sm:px-3.5 sm:py-1.5 sm:text-[12.5px]" style={{ animationDelay: `${k * 90}ms` }}>{t}</li>)}
            </ul>
            <div className="flex items-center gap-3 lg:hidden"><span className="font-mono text-[11px] text-ink-soft">{String(active + 1).padStart(2, "0")} / {N}</span><span className="h-1 flex-1 overflow-hidden rounded-full bg-white/70"><span className="block h-full rounded-full bg-brand" style={{ width: `${((active + 1) / N) * 100}%` }} /></span></div>
          </div>

          {/* the chapter card */}
          <article key={`card-${active}`} className="chapter-in absolute right-3 bottom-3 left-3 z-10 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-float backdrop-blur-xl sm:right-6 sm:bottom-6 sm:left-auto sm:w-[26rem] sm:p-6 lg:right-10 lg:bottom-auto lg:top-1/2 lg:w-[27rem] lg:-translate-y-1/2" aria-live="polite">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mint text-brand"><Icon className="h-5 w-5" /></span>
              <div><p className="font-mono text-[10.5px] tracking-[0.16em] text-brand uppercase">{String(active + 1).padStart(2, "0")} · {c.kicker}</p><h3 className="text-[1.25rem] leading-tight font-semibold tracking-tight text-ink sm:text-[1.4rem]">{c.title}</h3></div>
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{c.text}</p>
            <ul className="mt-4 hidden space-y-1.5 border-t border-line pt-4 sm:block">
              {c.bullets.map((b) => <li key={b} className="flex gap-2.5 text-[13.5px] text-ink"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />{b}</li>)}
            </ul>
          </article>

          <p className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] text-ink-soft backdrop-blur lg:flex">Keep scrolling <ChevronDown className="h-3.5 w-3.5" /></p>
        </div>
      </div>

      {/* the same story as plain text for screen readers, search engines and anyone who cannot scroll-drive the scene */}
      <ol className="sr-only">
        {CHAPTERS.map((ch) => <li key={ch.title}><h3>{ch.title}</h3><p>{ch.text}</p><ul>{ch.bullets.map((b) => <li key={b}>{b}</li>)}</ul></li>)}
      </ol>
    </section>
  );
}
