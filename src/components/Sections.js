import Image from "next/image";
import { BadgeIndianRupee, Check, FileCheck2, History, KeyRound, Landmark, Mail, ShieldCheck, Sun, WalletCards } from "lucide-react";
import { SITE } from "@/config/site";
import farmSunset from "../../public/images/farm-sunset.jpg";
import panelTexture from "../../public/images/panel-texture.jpg";
import { Arrow, Container, Em, Eyebrow, H2, Lede, SectionHead, btn } from "./ui";

/* ───────────── what it connects to: a slow marquee ───────────── */

const WORKS_WITH = ["Meta Lead Ads", "Google Ads", "Google Sheets", "WhatsApp sharing", "Excel & CSV import", "PM Surya Ghar", "GST invoices", "Google Solar API", "E-way bills", "Serial numbers"];

const MarqueeRow = ({ hidden = false }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {WORKS_WITH.map((t) => (
      <li key={t} className="flex items-center gap-7 pr-7 text-[15px] font-medium whitespace-nowrap text-ink-soft sm:gap-10 sm:pr-10">
        {t}<span className="h-1.5 w-1.5 rounded-full bg-sun/70" aria-hidden="true" />
      </li>
    ))}
  </ul>
);

export function Marquee() {
  return (
    <section aria-label="Works with" className="border-y border-line bg-white py-6">
      <Container>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] whitespace-nowrap text-mute uppercase">Works with what you already use</p>
          <div className="marquee w-full min-w-0 flex-1 overflow-hidden lg:w-auto">
            <div className="marquee-track flex"><MarqueeRow /><MarqueeRow hidden /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── what you can rely on ───────────── */

const PILLARS = [
  [ShieldCheck, "One company, one workspace", "Every client, product, design and document belongs to one company and is only ever loaded for that company’s sign-in."],
  [KeyRound, "Access granted action by action", "Staff see their own leads, steps and visits. Anything more, like finances or stock, comes from roles you shape yourself."],
  [FileCheck2, "Nothing edited behind your back", "Bills and invoices are voided, never quietly changed. Returned goods become a credit note with the refund recorded."],
  [History, "Every hand-over is logged", "Reassignments, reschedules and status changes on leads and visits are kept, so you can see who did what and when."],
  [BadgeIndianRupee, "GST worked out per line", "CGST and SGST or IGST on every bill and invoice, in the number series you choose. Invoices come from paid bills, so totals match what was received."],
  [Sun, "Energy figures that say what they are", "Sunlight is modelled for the site and calibrated with Google’s Solar API where it has data. The proposal marks the figures as indicative."],
];

export function Trust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="reveal lg:sticky lg:top-32">
              <Eyebrow>Why installers rely on it</Eyebrow>
              <H2 className="mt-5">Built to be <Em>trusted with the books.</Em></H2>
              <Lede className="mt-5">Money, stock and client data pass through this system every day. These are the rules it keeps for you, whatever the size of your team.</Lede>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift">
                <Image src={panelTexture} alt="A white hard hat resting on a blue solar panel" fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="para-img object-cover" />
                <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3.5 pr-5 shadow-float backdrop-blur">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-brand"><ShieldCheck className="h-4.5 w-4.5" /></span>
                  <p className="text-[13px] leading-snug text-ink"><span className="font-semibold">Your data stays yours.</span> Nothing is shared between companies.</p>
                </div>
              </div>
            </div>
          </div>
          <ol className="stagger grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {PILLARS.map(([Icon, title, text]) => (
              <li key={title} className="group bg-card p-6 transition-colors duration-300 hover:bg-paper sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-display text-[1.2rem] leading-tight font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── the paperwork that usually lives in notebooks ───────────── */

const PAPERWORK = [
  [Landmark, "Loans", "Set your loan steps once. Mark a proposal as bought on a loan and it starts on them. The EMI works itself out from the amount, rate and period, and the client follows each step in their portal.", ["Documents on every step", "Remarks the client can read"]],
  [BadgeIndianRupee, "Subsidies", "Turn on the subsidy for a proposal and a subsidy file opens with the usual PM Surya Ghar steps. Track the application, approval and what has actually been credited.", ["Expected against received", "Papers kept with each step"]],
  [WalletCards, "Project expenses", "Record what each job really cost, with the reason and the bill. See it next to what the client has paid, so you know which jobs earn.", ["Reasons you define", "Bills stored with the entry"]],
];

export function Paperwork() {
  return (
    <section id="paperwork" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="Money & paperwork" title={<>The part that lives in WhatsApp groups <Em>and notebooks.</Em></>} lede="Loans, subsidies and job costs, tracked on the same record as the proposal and visible to the people who need to see them." />
        <div className="stagger mt-14 grid gap-5 lg:grid-cols-3">
          {PAPERWORK.map(([Icon, title, text, points]) => (
            <article key={title} className="group flex flex-col rounded-[1.75rem] border border-line bg-paper p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-sm transition-colors duration-300 group-hover:bg-brand group-hover:text-white"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-7 font-display text-[1.45rem] font-semibold tracking-tight text-ink">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{text}</p>
              <ul className="mt-7 space-y-2 border-t border-line pt-5">
                {points.map((p) => <li key={p} className="flex items-center gap-2.5 text-[14px] text-ink"><Check className="h-4 w-4 text-brand" strokeWidth={3} />{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────── the closing band ───────────── */

export function CtaBand() {
  return (
    <section aria-label="Get started" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <Image src={farmSunset} alt="" fill sizes="100vw" placeholder="blur" className="para-img object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_31_68/0.9),rgb(24_63_133/0.72)_55%,rgb(11_31_68/0.55))]" aria-hidden="true" />
      <Container className="relative">
        <div className="reveal grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="light">Get started</Eyebrow>
            <h2 className="mt-5 font-display text-[2.4rem] leading-[1] font-semibold tracking-[-0.035em] text-balance sm:text-[3.4rem] lg:text-[4.2rem]">Run the next job <span className="text-[#9cc1ff]">on SolarDesy.</span></h2>
            <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg">We set up your company’s workspace and walk you through it with your own leads and price list. Your team signs in the same day.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <a href="#contact" className={`${btn.light} w-full sm:w-auto`}>Book a demo <Arrow /></a>
            <a href="#faq" className={`${btn.ghost} w-full sm:w-auto`}>Common questions</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── questions ───────────── */

const FAQ = [
  ["How do I get a workspace?", "Your company workspace is set up for you with a sign-in email and a temporary password. You can change the password after your first sign-in."],
  ["Can my leads come in automatically?", "Yes. Connect Meta Lead Ads, Google Ads or a Google Sheet once and new leads arrive on their own. You can still add walk-ins by hand with your own lead form, or import a spreadsheet."],
  ["Does it handle GST?", "Bills and invoices are priced per line with GST, shown as CGST and SGST or IGST, and numbered in the series you choose. Invoices are made from paid bills, so the totals always match what was received."],
  ["What if the client returns some of the goods?", "Make a credit note against the bill. The returned items are priced from the bill with their share of GST and discount, go back into stock, and the refund comes off what was paid. Mistakes can be voided; nothing is quietly edited."],
  ["Do my clients get an account?", "Every client with an email address can get a portal sign-in to read their proposals, respond to them, see bills, follow their loan and subsidy, book maintenance visits and ask for help. Clients without one simply receive the PDF."],
  ["How accurate are the energy figures?", "Sunlight is modelled for the building’s location and calibrated with Google’s Solar API where it has data. Shading from parapets, tanks, trees and neighbouring rows is calculated hour by hour. Figures are indicative and should be confirmed with a site visit; the proposal says so too."],
  ["Can my staff only see their own work?", "Yes. Staff always see the leads, installation steps and AMC visits assigned to them. Anything more, such as finances, inventory, loans or every installation, is granted through roles you define."],
  ["Can other companies see my data?", "No. Every client, product, design and document belongs to one company and is only ever loaded for that company’s sign-in."],
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <H2 className="mt-5">Good to <Em>know.</Em></H2>
            <p className="mt-5 text-[15px] text-ink-soft">Something else? <a href="#contact" className="font-medium text-brand underline underline-offset-4">Ask us directly</a>.</p>
          </div>
          <div className="reveal border-t border-line lg:col-span-8">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[1.1rem] font-semibold tracking-tight text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink transition duration-300 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white" aria-hidden="true">
                    <span className="absolute h-[1.5px] w-3.5 rounded bg-current" /><span className="absolute h-3.5 w-[1.5px] rounded bg-current" />
                  </span>
                </summary>
                <p className="max-w-[66ch] pb-6 text-[15px] leading-relaxed text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── footer ───────────── */

const FOOT = [
  ["Platform", [["Leads", "#leads"], ["3D design & proposals", "#design"], ["Billing & GST", "#billing"], ["Inventory", "#operations"], ["Installation & AMC", "#installation"], ["Client portal", "#portal"]]],
  ["Solutions", [["Residential", "#segments"], ["Commercial", "#segments"], ["Industrial", "#segments"], ["For owners", "#control"], ["For field teams", "#installation"]]],
  ["Company", [["Why installers rely on it", "#trust"], ["Questions", "#faq"], ["Book a demo", "#contact"], ["Sign in", SITE.appUrl]]],
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper pt-16 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="max-w-sm lg:col-span-4">
            <p className="font-display text-[1.4rem] font-bold tracking-[-0.03em] text-ink">Solar<span className="text-brand">Desy</span></p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{SITE.tagline}. Leads, design, proposals, billing, stock, installation and maintenance in one workspace, with a portal for every client.</p>
            <p className="mt-5 flex items-start gap-2 text-[13px] leading-snug text-mute"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />Each company’s data stays private to that company.</p>
            <a href={`mailto:${SITE.contactEmail}`} className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink transition hover:text-brand"><Mail className="h-4 w-4 text-brand" />{SITE.contactEmail}</a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:justify-items-end">
            {FOOT.map(([title, links]) => (
              <div key={title} className="lg:min-w-[12rem]">
                <p className="font-mono text-[11px] tracking-[0.18em] text-brand uppercase">{title}</p>
                <ul className="mt-4 space-y-2.5 text-[14.5px]">
                  {links.map(([l, h]) => <li key={l}><a href={h} className="text-ink-soft transition hover:text-ink">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.name}. Figures and names in the product screens are sample data.</p>
          <div className="flex items-center gap-5">
            <p>Photography via Unsplash.</p>
            <a href={SITE.appUrl} className="inline-flex items-center gap-1 font-medium text-brand">Sign in <Arrow className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
