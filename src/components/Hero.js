import Image from "next/image";
import { BadgeIndianRupee, CheckCircle2, FileText, Lock, Megaphone, ShieldCheck, Workflow } from "lucide-react";
import hero from "../../public/images/hero.jpg";
import { DashboardMock } from "./mocks";
import { Arrow, Chip, Container, btn } from "./ui";

const PROOF = [
  [BadgeIndianRupee, "GST invoices", "CGST, SGST or IGST per line"],
  [Workflow, "PM Surya Ghar steps", "Subsidy files that follow the process"],
  [Lock, "Private workspace", "One company, one workspace"],
  [ShieldCheck, "Roles you define", "Access granted action by action"],
];

/**
 * The opening: a rooftop at golden hour, the promise in large type, and the product rising into view below it.
 * Everything here enters in one timed sequence; after that, motion is left to scroll.
 */
export default function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="grain relative overflow-hidden bg-navy text-white">
        <Image src={hero} alt="Rows of solar panels on a rooftop at sunset, with mountains behind" fill priority sizes="100vw" placeholder="blur" className="kenburns object-cover object-[55%_45%]" />
        {/* the photo stays readable: navy from the left and the bottom, open sky to the right */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_31_68/0.8)_0%,rgb(11_31_68/0.5)_42%,rgb(11_31_68/0.06)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_31_68/0.3)_0%,transparent_30%,transparent_65%,rgb(11_31_68/0.55)_100%)]" aria-hidden="true" />

        <Container className="relative">
          <div className="max-w-[46rem] pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52 lg:pb-40">
            <p className="rise inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1 pr-4 pl-1.5 text-[12.5px] font-medium text-white/90 backdrop-blur" style={{ "--d": "0ms" }}>
              <span className="rounded-full bg-sun px-2.5 py-0.5 text-[11px] font-semibold text-white">For India</span>
              Built for rooftop solar installers
            </p>
            <h1 className="rise mt-7 font-display text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.04em] text-balance sm:text-[4.2rem] lg:text-[5.4rem]" style={{ "--d": "120ms" }}>
              Run your whole solar business <span className="text-[#9cc1ff]">in one place.</span>
            </h1>
            <p className="rise mt-7 max-w-[38rem] text-[1.0625rem] leading-relaxed text-pretty text-white/80 sm:text-xl" style={{ "--d": "240ms" }}>
              From the first Meta ad lead to the tenth-year maintenance visit: leads, 3D roof design, branded proposals, GST billing, stock, installation, loans and subsidies, with a portal where your clients follow it all.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "360ms" }}>
              <a href="#contact" className={`${btn.light} w-full sm:w-auto`}>Book a demo <Arrow /></a>
              <a href="#journey" className={`${btn.ghost} w-full sm:w-auto`}>See how it works</a>
            </div>
          </div>
        </Container>

      </div>

      {/* what you can count on, straddling the edge of the photo */}
      <Container className="relative -mt-12 sm:-mt-14">
        <ul className="rise grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-deep lg:grid-cols-4" style={{ "--d": "520ms" }}>
          {PROOF.map(([Icon, title, text], i) => (
            <li key={title} className={`flex items-start gap-3 p-4 sm:p-5 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0 lg:border-l" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-brand"><Icon className="h-4.5 w-4.5" /></span>
              <div className="min-w-0"><p className="text-[14px] font-semibold tracking-tight text-ink">{title}</p><p className="mt-0.5 text-[12.5px] leading-snug text-mute">{text}</p></div>
            </li>
          ))}
        </ul>
      </Container>

      {/* the product, rising into view under the photo */}
      <Container className="relative pt-16 sm:pt-20">
        <div className="relative mx-auto max-w-[1180px]">
          <div className="tilt-in" style={{ "--d": "650ms" }}>
            <DashboardMock />
          </div>
          <div className="float absolute -top-10 -left-4 hidden items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-4 shadow-float lg:flex xl:-left-12">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-brand"><Megaphone className="h-4.5 w-4.5" /></span>
            <div><p className="text-[12.5px] font-semibold text-ink">New lead · Meta Lead Ads</p><p className="text-[11px] text-mute">Given to Aarti K. automatically</p></div>
          </div>
          <div className="float absolute top-1/3 -right-4 hidden items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-4 shadow-float [animation-delay:-2s] lg:flex xl:-right-12">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-brand"><CheckCircle2 className="h-4.5 w-4.5" /></span>
            <div><p className="text-[12.5px] font-semibold text-ink">Proposal accepted</p><p className="text-[11px] text-mute">Joshi bungalow · 6 kW</p></div>
          </div>
          <div className="float absolute -bottom-6 left-10 hidden items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-4 shadow-float [animation-delay:-3.5s] lg:flex">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun-soft text-[#a32219]"><FileText className="h-4.5 w-4.5" /></span>
            <div><p className="text-[12.5px] font-semibold text-ink">Invoice INV-0003 issued</p><p className="text-[11px] text-mute">GST split shown <Chip tone="mint">Paid</Chip></p></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
