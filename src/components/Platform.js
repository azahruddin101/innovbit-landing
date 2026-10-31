import { BadgeIndianRupee, CalendarClock, Check, FileText, HardHat, Landmark, LifeBuoy, Megaphone, Package, PenTool, Receipt, Users, WalletCards } from "lucide-react";
import Image from "next/image";
import homePhoto from "../../public/images/hero-home.jpg";
import installerPhoto from "../../public/images/installer.jpg";
import residentialPhoto from "../../public/images/residential.jpg";
import { Container, Em, SectionHead } from "./ui";

/* Small product snippets (sample data) shown inside each tile. */
const Pill = ({ children, tone = "mint" }) => <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone === "sun" ? "bg-sun-soft text-[#a32219]" : tone === "blue" ? "bg-[#e6eefb] text-[#1f4f9c]" : "bg-mint text-brand"}`}>{children}</span>;
const Row = ({ children, className = "" }) => <div className={`flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] ${className}`}>{children}</div>;
const Bar = ({ pct, className = "bg-brand" }) => <span className="block h-2 overflow-hidden rounded-full bg-line"><span className={`block h-full rounded-full ${className}`} style={{ width: `${pct}%` }} /></span>;

function Leads() {
  const cols = [["New", "blue", ["Aarti K.", "Meta · 5 kW"], ["R. Mehta", "Sheet · 3 kW"]], ["Called", "sun", ["S. Iyer", "Site visit Fri"]], ["Converted", "mint", ["Joshi", "6 kW · signed"]]];
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {cols.map(([t, tone, ...cards]) => (
        <div key={t} className={`rounded-xl bg-paper p-2.5 ${t === "Converted" ? "hidden sm:block" : ""}`}>
          <p className="mb-2 flex items-center justify-between text-[11px] font-semibold text-ink-soft">{t}<Pill tone={tone}>{cards.length}</Pill></p>
          <div className="space-y-2">{cards.map(([n, s]) => <div key={n} className="rounded-lg border border-line bg-white p-2.5 shadow-sm"><p className="text-[12.5px] font-semibold text-ink">{n}</p><p className="text-[11px] text-mute">{s}</p></div>)}</div>
        </div>
      ))}
    </div>
  );
}

function Clients() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-[13px] font-semibold text-white">PJ</span><div><p className="text-[14px] font-semibold text-ink">Patil bungalow</p><p className="text-[11.5px] text-mute">Referred by Joshi · Pune</p></div></div>
      {["ID proof.pdf", "Electricity bill.pdf", "Site photos (6)"].map((d) => <Row key={d}><Check className="h-4 w-4 text-brand" strokeWidth={3} />{d}</Row>)}
    </div>
  );
}

function Proposals({ compact = false }) {
  return (
    <div className={compact ? "" : "grid items-center gap-3 sm:grid-cols-[1fr_auto]"}>
      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center justify-between"><p className="text-[13px] font-semibold text-ink">Proposal · 8 kW rooftop</p><Pill>Accepted online</Pill></div>
        <div className="mt-3 space-y-1.5"><span className="block h-2 w-full rounded bg-line" /><span className="block h-2 w-11/12 rounded bg-line" /><span className="block h-2 w-8/12 rounded bg-line" /></div>
        <div className="mt-4 flex items-end justify-between border-t border-line pt-3 text-[12px] text-mute"><span>Valid till 30 Nov</span><span className="text-[17px] font-semibold text-ink">₹4,86,000</span></div>
      </div>
      <div className={compact ? "hidden" : "hidden gap-2 sm:grid"}><Pill tone="blue">PDF</Pill><Pill tone="sun">Subsidy</Pill><Pill>Loan</Pill></div>
    </div>
  );
}

function Inventory() {
  const rows = [["Panel 540 W", "124 in stock", 82], ["Inverter 5 kW", "12 in stock", 40], ["Battery 5 kWh", "3 left · low", 12]];
  return <div className="space-y-3">{rows.map(([n, s, p]) => <div key={n}><div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-semibold text-ink">{n}</span><span className={p < 20 ? "font-semibold text-[#b4541a]" : "text-mute"}>{s}</span></div><Bar pct={p} className={p < 20 ? "bg-[#e08a3c]" : "bg-brand"} /></div>)}</div>;
}

function Billing() {
  const steps = [["E-way bill", "Goods out", "sun"], ["Bill", "Paid", "mint"], ["Invoice", "GST", "blue"]];
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {steps.map(([t, s, tone], i) => (
        <div key={t} className="flex flex-1 items-center gap-2"><div className="flex-1 rounded-xl border border-line bg-white p-3"><Pill tone={tone}>{s}</Pill><p className="mt-2 text-[13px] font-semibold text-ink">{t}</p></div>{i < 2 && <span className="hidden text-mute sm:inline">→</span>}</div>
      ))}
    </div>
  );
}

function Expenses() {
  return <div className="space-y-3"><div><div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-semibold text-ink">Earned</span><span className="text-ink">₹6.4L</span></div><Bar pct={90} /></div><div><div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-semibold text-ink">Spent</span><span className="text-ink">₹4.9L</span></div><Bar pct={68} className="bg-sun" /></div></div>;
}

function Amc() {
  return <div className="space-y-2">{[["Today", "Sharma · cleaning", "sun"], ["Mon", "Patil · inverter check", "blue"], ["Thu", "Kulkarni · yearly visit", "mint"]].map(([d, t, tone]) => <Row key={t}><Pill tone={tone}>{d}</Pill>{t}</Row>)}</div>;
}

function Loans() {
  const steps = ["Documents", "Bank review", "Sanctioned", "Disbursed"];
  return (
    <div>
      <div className="flex items-center">{steps.map((s, i) => <div key={s} className="flex flex-1 items-center last:flex-none"><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${i < 3 ? "bg-brand text-white" : "bg-line text-mute"}`}>{i < 3 ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}</span>{i < 3 && <span className={`h-0.5 flex-1 ${i < 2 ? "bg-brand" : "bg-line"}`} />}</div>)}</div>
      <div className="mt-3 flex justify-between gap-1 text-[10.5px] text-mute sm:text-[11.5px]">{steps.map((s) => <span key={s}>{s}</span>)}</div>
      <p className="mt-4 text-[13px] text-ink-soft">EMI <span className="text-[17px] font-semibold text-ink">₹7,420</span> / month · 60 months</p>
    </div>
  );
}

function Subsidy() {
  return <div className="space-y-3"><div><div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-semibold text-ink">Expected</span><span>₹78,000</span></div><Bar pct={100} className="bg-brand/30" /></div><div><div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-semibold text-ink">Received</span><span>₹39,000</span></div><Bar pct={50} /></div></div>;
}

const FloatCard = ({ Icon, title, className = "", children }) => (
  <div className={`min-w-0 rounded-2xl border border-line bg-white p-4 shadow-lift lg:shadow-float ${className}`}>
    <p className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold text-ink"><span className="grid h-7 w-7 place-items-center rounded-lg bg-mint text-brand"><Icon className="h-4 w-4" /></span>{title}</p>
    {children}
  </div>
);

const STAGES = [
  {
    id: "sell", n: "01", title: "Capture & sell", blurb: "Turn enquiries into signed proposals, from the first ad lead to an online yes.",
    photo: homePhoto, alt: "A home with solar panels on its roof",
    features: [
      [Megaphone, "Leads", "Meta Lead Ads, Google Ads, Google Sheets, Excel imports and your own lead form, all in one inbox."],
      [Users, "Clients", "One record per client with documents, contact details and everything that happens to them."],
      [PenTool, "3D design", "Trace the roof on satellite imagery, lay out panels and see shading and yearly energy."],
      [FileText, "Proposals", "Branded PDFs with your logo, terms and options. Share a link; clients accept online."],
    ],
    cards: [
      { Icon: Megaphone, title: "Lead inbox", body: <Leads />, cls: "lg:w-[22rem]", pos: "bottom" },
      { Icon: FileText, title: "Proposal", body: <Proposals compact />, cls: "lg:w-[17.5rem]", pos: "top" },
    ],
  },
  {
    id: "deliver", n: "02", title: "Deliver & bill", blurb: "Get the system installed and paid for, with stock and GST taken care of.",
    photo: installerPhoto, alt: "An installer lifting a solar panel onto a roof",
    features: [
      [Package, "Inventory", "Batches, three price tiers, serial numbers, warranties, suppliers and low-stock alerts."],
      [Receipt, "Billing", "E-way bill, then bill, then GST invoice. Credit notes for returns, void for mistakes."],
      [HardHat, "Installation tasks", "Your steps on every job, assigned to field staff with photo and location proof."],
      [WalletCards, "Expenses", "What each project actually cost, against what it brought in."],
    ],
    cards: [
      { Icon: Receipt, title: "Sale chain", body: <Billing />, cls: "lg:w-[24rem]", pos: "bottom", side: "l" },
      { Icon: Package, title: "Stock", body: <Inventory />, cls: "lg:w-[17.5rem]", pos: "top", side: "r" },
    ],
  },
  {
    id: "grow", n: "03", title: "Support & grow", blurb: "Keep clients happy for years, and keep the referrals coming.",
    photo: residentialPhoto, alt: "Homes with solar panels on their roofs",
    features: [
      [CalendarClock, "Maintenance (AMC)", "Visits scheduled after handover, booked by clients, assigned to your team."],
      [Landmark, "Loans", "Your own loan steps, documents and EMI, visible to the client step by step."],
      [BadgeIndianRupee, "Subsidies", "PM Surya Ghar style steps and papers, with expected against received."],
      [LifeBuoy, "Client portal & help", "Proposals, bills, progress and help requests, on the client’s phone."],
    ],
    cards: [
      { Icon: CalendarClock, title: "Upcoming visits", body: <Amc />, cls: "lg:w-[20rem]", pos: "bottom" },
      { Icon: Landmark, title: "Loan progress", body: <Loans />, cls: "lg:w-[22rem]", pos: "top" },
    ],
  },
];

export default function Platform() {
  return (
    <section id="platform" className="py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="The platform" title={<>One project, through <Em>the whole company.</Em></>} lede="Nothing is retyped between stages. The address from the lead becomes the site of the design, the price on the proposal becomes the bills, and the installation date schedules the maintenance." />

        <div className="mt-14 space-y-8 sm:space-y-10">
          {STAGES.map((st, si) => {
            const flip = si % 2 === 1;
            return (
              <article key={st.id} className="reveal sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-line sm:bg-card sm:p-10 sm:shadow-lift lg:p-14">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <p className="flex items-center gap-3 font-mono text-[12px] tracking-[0.16em] text-brand uppercase"><span className="h-[3px] w-8 rounded-full bg-sun" />Stage {st.n}</p>
                    <h3 className="mt-4 font-display text-[2rem] leading-[1.02] font-semibold tracking-[-0.03em] text-ink sm:text-[2.6rem]">{st.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{st.blurb}</p>
                    <ul className="mt-8 divide-y divide-line border-y border-line">
                      {st.features.map(([Icon, name, text]) => (
                        <li key={name} className="flex gap-4 py-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-brand"><Icon className="h-[18px] w-[18px]" /></span>
                          <div><h4 className="text-[16px] font-semibold tracking-tight text-ink">{name}</h4><p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{text}</p></div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                    <div className="relative min-w-0 lg:pb-12">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:h-[540px]">
                        <Image src={st.photo} alt={st.alt} fill sizes="(min-width: 1024px) 52vw, 100vw" placeholder="blur" className="para-img object-cover" />
                        <span className="absolute top-5 left-5 rounded-full bg-white/92 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-brand uppercase shadow-lift backdrop-blur">{st.n} · {st.title}</span>
                      </div>
                      <div className="mt-4 grid gap-4 lg:mt-0 lg:block">
                        {st.cards.map(({ Icon, title, body, cls, pos, side }) => {
                          const left = side ? side === "l" : pos === "bottom" ? !flip : flip;
                          return (
                          <FloatCard
                            key={title}
                            Icon={Icon}
                            title={title}
                            className={`lg:absolute ${cls} ${pos === "bottom" ? "lg:bottom-0" : "lg:top-12"} ${left ? "lg:-left-6" : "lg:-right-6"}`}
                          >
                            {body}
                          </FloatCard>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-mute">Names and figures shown are sample data.</p>
      </Container>
    </section>
  );
}
