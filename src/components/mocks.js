import { Bell, CalendarClock, Camera, CheckCircle2, ChevronRight, CircleDot, FileText, HardHat, LayoutDashboard, MapPin, Megaphone, Package, Receipt, Search, ShieldCheck, Sun, Users } from "lucide-react";
import { Chip, Frame } from "./ui";

const Avatar = ({ name, tone = "bg-brand text-white" }) => (
  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9.5px] font-semibold ${tone}`}>{name}</span>
);

/* ───────────── hero: the dashboard ───────────── */

const SIDE = [
  [LayoutDashboard, "Overview"],
  [Megaphone, "Leads"],
  [Users, "Clients"],
  [FileText, "Proposals"],
  [Receipt, "Billing"],
  [Package, "Inventory"],
  [HardHat, "Tasks"],
  [CalendarClock, "AMC"],
];
const BARS = [32, 41, 38, 52, 47, 60, 58, 71, 66, 79, 74, 92];

export function DashboardMock() {
  return (
    <Frame title="workspace / overview">
      <div className="flex min-h-[320px] sm:min-h-[400px]">
        <aside className="hidden w-40 shrink-0 border-r border-line bg-paper/60 p-3 md:block">
          <div className="mb-4 flex items-center gap-2 px-2 pt-1 text-[12px] font-semibold text-ink"><span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-white"><Sun className="h-3.5 w-3.5" /></span>Your company</div>
          <ul className="space-y-0.5">
            {SIDE.map(([Icon, label], i) => (
              <li key={label} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12px] ${i === 0 ? "bg-white font-medium text-ink shadow-sm" : "text-mute"}`}><Icon className="h-3.5 w-3.5" />{label}</li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-ink">Overview</p>
              <p className="text-[11px] text-mute">This month so far</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-[11px] text-mute sm:flex"><Search className="h-3 w-3" />Search clients, proposals…</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[["Received", "₹8.4L", "+12%", "mint"], ["Open pipeline", "₹42L", "9 quotes", "slate"], ["Win rate", "38%", "of decided", "slate"], ["Yet to bill", "₹3.1L", "2 jobs", "sun"]].map(([k, v, s, tone]) => (
              <div key={k} className="rounded-xl border border-line bg-white p-3">
                <p className="text-[10.5px] text-mute">{k}</p>
                <p className="mt-1 text-lg leading-none font-semibold tracking-tight text-ink">{v}</p>
                <div className="mt-2"><Chip tone={tone}>{s}</Chip></div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2.5 lg:grid-cols-5">
            <div className="rounded-xl border border-line bg-white p-3 lg:col-span-3">
              <div className="flex items-center justify-between"><p className="text-[11.5px] font-semibold text-ink">Money in, last 12 months</p><span className="font-mono text-[10px] text-mute">₹</span></div>
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {BARS.map((h, i) => (
                  <span key={i} className={`flex-1 rounded-t-[4px] ${i === BARS.length - 1 ? "bg-brand-deep" : "bg-brand/70"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-3 lg:col-span-2">
              <p className="text-[11.5px] font-semibold text-ink">Needs attention</p>
              <ul className="mt-2 space-y-2 text-[11px]">
                {[["Quote waiting 8 days", "sun"], ["Install step stuck", "red"], ["AMC visit due today", "blue"]].map(([t, tone]) => (
                  <li key={t} className="flex items-center justify-between gap-2 text-ink-soft"><span className="truncate">{t}</span><Chip tone={tone}>Open</Chip></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────── leads: the board ───────────── */

const COLUMNS = [
  { name: "New", tone: "slate", cards: [["Rahul D.", "Meta", "mint", "AK"], ["Sunita P.", "Google Ads", "blue", "AK"], ["Walk-in", "Added by hand", "slate", "—"]] },
  { name: "Called", tone: "sun", cards: [["Imran S.", "Meta", "mint", "FS"], ["Neha K.", "Sheet", "slate", "FS"]] },
  { name: "Site visit", tone: "blue", cards: [["Ketan Agro", "Google Ads", "blue", "RP"]] },
  { name: "Converted", tone: "mint", cards: [["Joshi Bungalow", "Meta", "mint", "RP"], ["Patil Industries", "Meta", "mint", "AK"]] },
];

export function KanbanMock() {
  return (
    <Frame title="workspace / leads / board">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto p-4 sm:p-5">
        {COLUMNS.map((c) => (
          <div key={c.name} className="w-[44%] shrink-0 snap-start rounded-xl bg-paper p-2.5 sm:w-[185px]">
            <div className="mb-2 flex items-center justify-between px-1"><Chip tone={c.tone}>{c.name}</Chip><span className="font-mono text-[10px] text-mute">{c.cards.length}</span></div>
            <div className="space-y-2">
              {c.cards.map(([n, src, tone, who]) => (
                <div key={n} className="rounded-lg border border-line bg-white p-2.5 shadow-sm">
                  <p className="text-[12px] font-medium text-ink">{n}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5"><Chip tone={tone}>{src}</Chip>{who !== "—" ? <Avatar name={who} tone="bg-ink text-white" /> : <span className="text-[10px] text-mute">unassigned</span>}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ───────────── design: roof, panels and sun ───────────── */

// the roof is a parallelogram A-B-C-D; P(s, t) walks across it, so the panels sit in a true grid on its plane
const A = [70, 250];
const B = [250, 300];
const D = [290, 185];
const P = (s, t) => [A[0] + s * (B[0] - A[0]) + t * (D[0] - A[0]), A[1] + s * (B[1] - A[1]) + t * (D[1] - A[1])];
const PANELS = Array.from({ length: 12 }, (_, i) => {
  const r = Math.floor(i / 4);
  const c = i % 4;
  const [s0, t0] = [0.1 + r * 0.29, 0.07 + c * 0.225];
  return [P(s0, t0), P(s0, t0 + 0.2), P(s0 + 0.25, t0 + 0.2), P(s0 + 0.25, t0)].map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
});

export function DesignerMock() {
  return (
    <Frame title="designer / roof 1 — 6.48 kWp">
      <div className="grid gap-0 md:grid-cols-5">
        <div className="relative bg-[#dfe9e4] md:col-span-3">
          <svg viewBox="30 14 470 316" className="block h-auto w-full" role="img" aria-label="A rooftop with twelve solar panels laid out and the sun's path above it">
            <defs>
              <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d3dcd7" /><stop offset="1" stopColor="#b9c6be" /></linearGradient>
              <linearGradient id="cell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#24487a" /><stop offset="1" stopColor="#0e2442" /></linearGradient>
            </defs>
            <path className="sweep" d="M30 140 Q260 -50 490 140" fill="none" stroke="#e0372c" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 7" />
            <circle cx="345" cy="38" r="26" fill="#e0372c" opacity=".22" /><circle cx="345" cy="38" r="15" fill="#e0372c" />
            <polygon points="70,250 250,300 250,318 70,268" fill="#9fb0a6" />
            <polygon points="250,300 470,235 470,253 250,318" fill="#86998e" />
            <polygon points="70,250 250,300 470,235 290,185" fill="url(#roof)" stroke="#97a69d" strokeWidth="1.5" />
            {PANELS.map((pts, i) => <polygon key={i} points={pts} fill="url(#cell)" stroke="#a9bddb" strokeWidth=".9" />)}
          </svg>
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-ink shadow-sm"><MapPin className="h-3 w-3 text-brand" />Satellite roof outline</span>
          <span className="absolute right-3 bottom-3 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[10px] text-white">Shading checked hour by hour</span>
        </div>
        <div className="space-y-2.5 p-4 sm:p-5 md:col-span-2">
          {[["System size", "6.48 kWp"], ["Panels", "12 × 540 Wp"], ["Yearly energy", "9,300 kWh"], ["Shading loss", "2.1 %"], ["Payback", "4.2 years"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2"><span className="text-[11.5px] text-mute">{k}</span><span className="text-[13px] font-semibold text-ink">{v}</span></div>
          ))}
          <div className="flex flex-wrap gap-1.5 pt-1"><Chip tone="mint">Subsidy applied</Chip><Chip tone="blue">Loan option</Chip><Chip tone="sun">AMC package</Chip></div>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────── billing: e-way bill → bill → invoice ───────────── */

export function ChainMock() {
  const steps = [
    { icon: Package, name: "E-way bill", no: "EWB-0007", note: "Goods leave stock", line: "3 items · ₹54,941", chip: ["Open", "sun"] },
    { icon: Receipt, name: "Bill", no: "BILL-0004", note: "Paid when made", line: "UPI · ₹64,830 with GST", chip: ["Paid", "mint"] },
    { icon: FileText, name: "Invoice", no: "INV-0003", note: "Settles the bills", line: "CGST + SGST shown", chip: ["Issued", "blue"] },
  ];
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.no} className="relative rounded-2xl border border-line bg-card p-4 shadow-lift">
            <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-brand"><s.icon className="h-4.5 w-4.5" /></span><Chip tone={s.chip[1]}>{s.chip[0]}</Chip></div>
            <p className="mt-4 text-[15px] font-semibold text-ink">{s.name}</p>
            <p className="font-mono text-[11px] text-mute">{s.no}</p>
            <p className="mt-3 text-[12.5px] text-ink-soft">{s.note}</p>
            <p className="mt-1 text-[12.5px] font-medium text-ink">{s.line}</p>
            {i < 2 && <ChevronRight className="absolute top-1/2 -right-[14px] z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full border border-line bg-white p-1 text-brand sm:block" />}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-brand/40 bg-mint/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand"><ShieldCheck className="h-4.5 w-4.5" /></span>
          <div><p className="text-[14px] font-semibold text-ink">2 panels came back? Make a credit note.</p><p className="text-[12.5px] text-ink-soft">CN-0001 · priced from the bill with its GST share · refund recorded · goods back in stock</p></div>
        </div>
        <Chip tone="mint">Partial returns</Chip>
      </div>
    </div>
  );
}

/* ───────────── stock: batches and serial numbers ───────────── */

export function StockMock() {
  const rows = [
    ["Mono PERC 540 Wp", "B-2410", "120", "Serial · 5 yr", "₹ 9,800 / 10,200 / 10,900", "ok"],
    ["Hybrid inverter 5 kW", "B-2409", "14", "Serial · 5 yr", "₹ 41,000 / 43,500 / 46,000", "ok"],
    ["DC cable 4 sq.mm", "B-2408", "180 m", "Batch", "₹ 38 / 41 / 45", "ok"],
    ["Net meter, bi-directional", "B-2407", "3", "Serial", "₹ 3,900 / 4,100 / 4,400", "low"],
  ];
  return (
    <Frame title="workspace / inventory / stock">
      <div className="no-scrollbar overflow-x-auto">
        <table className="w-full text-left text-[12px] sm:min-w-[560px]">
          <thead><tr className="border-b border-line bg-paper/60 text-[10.5px] tracking-wide text-mute uppercase"><th className="px-4 py-2.5 font-medium">Product</th><th className="hidden px-3 py-2.5 font-medium sm:table-cell">Batch</th><th className="px-3 py-2.5 font-medium">In stock</th><th className="px-3 py-2.5 font-medium">Tracking</th><th className="hidden px-3 py-2.5 font-medium sm:table-cell">Base / wholesale / retail</th></tr></thead>
          <tbody>
            {rows.map(([p, b, q, t, pr, st]) => (
              <tr key={p} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{p}</td><td className="hidden px-3 font-mono text-mute sm:table-cell">{b}</td>
                <td className="px-3"><span className="inline-flex items-center gap-1.5 font-medium text-ink">{q}{st === "low" && <Chip tone="red">Low</Chip>}</span></td>
                <td className="px-3 text-ink-soft">{t}</td><td className="hidden px-3 whitespace-nowrap text-ink-soft sm:table-cell">{pr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ───────────── operations: installation steps and maintenance ───────────── */

export function TasksMock() {
  const steps = [
    ["Site survey", "done", "AK", "12 Oct"],
    ["Structure & mounting", "done", "RP", "16 Oct"],
    ["Panel installation", "doing", "RP", "Started 2 days ago"],
    ["DC / AC wiring", "todo", "FS", ""],
    ["Net meter & commissioning", "todo", "", "Nobody assigned"],
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 [&>*]:min-w-0">
      <div className="rounded-2xl border border-line bg-card p-4 shadow-lift md:col-span-3 sm:p-5">
        <div className="flex items-center justify-between"><div><p className="text-[14px] font-semibold text-ink">Patil bungalow · 8 kW</p><p className="text-[12px] text-mute">Installation · 2 of 5 steps done</p></div><Chip tone="sun">In progress</Chip></div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper"><div className="h-full w-[40%] rounded-full bg-brand" /></div>
        <ol className="mt-4 space-y-2.5">
          {steps.map(([n, s, who, meta]) => (
            <li key={n} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
              {s === "done" ? <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" /> : s === "doing" ? <CircleDot className="h-5 w-5 shrink-0 text-[#c98a00]" /> : <span className="h-5 w-5 shrink-0 rounded-full border-2 border-line" />}
              <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium text-ink">{n}</p>{meta && <p className="truncate text-[11px] text-mute">{meta}</p>}</div>
              {who ? <Avatar name={who} tone="bg-ink text-white" /> : <Chip tone="red">Assign</Chip>}
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-4 md:col-span-2">
        <div className="rounded-2xl border border-line bg-card p-4 shadow-lift">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><Camera className="h-4 w-4 text-brand" />Progress with proof</p>
          <div className="mt-3 flex h-24 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#cfe0d8,#e9efe9)]"><span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm"><MapPin className="h-3 w-3 text-brand" />Photo + location saved</span></div>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4 shadow-lift">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><CalendarClock className="h-4 w-4 text-brand" />Maintenance (AMC)</p>
          <ul className="mt-3 space-y-2 text-[12px]">
            {[["AMC 1 · Joshi bungalow", "due in 6 days", "sun"], ["AMC 2 · Kale Agro", "booked by client", "mint"]].map(([a, b, tone]) => (
              <li key={a} className="flex items-center justify-between gap-2 text-ink-soft"><span className="truncate">{a}</span><Chip tone={tone}>{b}</Chip></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────────── portal: what the client sees on a phone ───────────── */

export function PortalPhone() {
  const loan = [["Documents", true], ["Application", true], ["Verification", true], ["Sanctioned", false], ["Disbursed", false]];
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="float rounded-[2.4rem] border-[9px] border-ink bg-ink shadow-float">
        <div className="overflow-hidden rounded-[1.8rem] bg-paper">
          <div className="flex items-center justify-between bg-brand px-4 pt-5 pb-4 text-white"><div><p className="text-[10px] opacity-80">Welcome back</p><p className="text-[15px] font-semibold">Sunil Patil</p></div><Bell className="h-4 w-4 opacity-90" /></div>
          <div className="space-y-3 p-3.5">
            <div className="rounded-xl border border-line bg-white p-3">
              <div className="flex items-center justify-between"><p className="text-[12px] font-semibold text-ink">8 kW rooftop</p><Chip tone="mint">Accepted</Chip></div>
              <p className="mt-1 text-[11px] text-mute">Paid ₹3,20,000 of ₹4,10,000 billed so far</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-3">
              <p className="text-[12px] font-semibold text-ink">Your loan</p>
              <ul className="mt-2 space-y-1.5">
                {loan.map(([n, d]) => (
                  <li key={n} className="flex items-center gap-2 text-[11px] text-ink-soft">{d ? <CheckCircle2 className="h-3.5 w-3.5 text-brand" /> : <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-line" />}<span className={d ? "" : "text-mute"}>{n}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-white p-3">
              <p className="text-[12px] font-semibold text-ink">Subsidy</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper"><div className="h-full w-[57%] rounded-full bg-sun" /></div>
              <p className="mt-1.5 text-[11px] text-mute">4 of 7 steps done</p>
            </div>
            <div className="grid grid-cols-2 gap-2"><span className="rounded-lg bg-ink py-2 text-center text-[11px] font-medium text-white">Book a visit</span><span className="rounded-lg border border-line bg-white py-2 text-center text-[11px] font-medium text-ink">Ask for help</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── control: roles and the team ───────────── */

export function RolesMock() {
  const groups = [["Leads", ["View assigned", "Change status"]], ["Proposals", ["View", "Create", "Share link"]], ["Finances", ["View", "Create bill"]], ["Inventory", ["View"]]];
  return (
    <Frame title="staff / access roles / Sales executive">
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-medium tracking-wide text-mute uppercase">Role</p>
          <p className="mt-1 text-[15px] font-semibold text-ink">Sales executive</p>
          <p className="text-[12px] text-mute">Works with clients and prepares proposals.</p>
          <div className="mt-4 space-y-2.5">
            {groups.map(([area, acts]) => (
              <div key={area} className="rounded-xl border border-line bg-white p-3">
                <p className="text-[12px] font-semibold text-ink">{area}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{acts.map((a) => <Chip key={a} tone="mint">{a}</Chip>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-wide text-mute uppercase">Your team this month</p>
          <ul className="mt-3 space-y-3">
            {[["Aarti K.", "Telecaller", 82], ["Farah S.", "Sales executive", 64], ["Ravi P.", "Installer", 91]].map(([n, r, p]) => (
              <li key={n} className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center gap-2.5"><Avatar name={n.split(" ").map((x) => x[0]).join("")} tone="bg-ink text-white" /><div className="min-w-0 flex-1"><p className="truncate text-[12.5px] font-medium text-ink">{n}</p><p className="text-[11px] text-mute">{r}</p></div><span className="text-[12px] font-semibold text-ink">{p}%</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-brand" style={{ width: `${p}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
