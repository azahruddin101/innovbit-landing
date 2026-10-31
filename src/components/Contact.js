"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/config/site";
import carrying from "../../public/images/carrying.jpg";
import { Container, Em, Eyebrow, H2 } from "./ui";

const field = "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-mute/60 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

const NEXT = [
  ["Tell us about your team", "How many people, how leads come in today, what you want to see."],
  ["We set up your workspace", "Your company gets its own workspace with a sign-in email and a temporary password."],
  ["We walk you through it", "With your own leads and price list, so the first job you run is a real one."],
];

/** The demo request: it opens the visitor's own mail app with the details filled in, so nothing is sent through this page. */
export default function Contact() {
  const [state, setState] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = [`Name: ${state.name}`, `Company: ${state.company}`, `Email: ${state.email}`, state.phone && `Phone: ${state.phone}`, "", state.message || `I’d like a demo of ${SITE.name}.`].filter((l) => l !== false).join("\n");
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`Demo request from ${state.company || state.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="rays relative isolate overflow-hidden border-t border-line py-20 sm:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Book a demo</Eyebrow>
            <H2 className="mt-5">Ready before the <Em>next client calls.</Em></H2>
            <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">Tell us about your team. We’ll set up a workspace for your company and walk you through it with your own leads and price list.</p>

            <div className="relative mt-9 overflow-hidden rounded-[1.75rem] shadow-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={carrying} alt="An installer carrying a solar panel towards a house under construction" fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="para-img object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <p className="absolute inset-x-6 bottom-5 font-mono text-[11px] tracking-[0.18em] text-white/80 uppercase">What happens next</p>
              </div>
              <ol className="divide-y divide-line bg-white">
                {NEXT.map(([t, d], i) => (
                  <li key={t} className="flex gap-4 px-6 py-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint font-mono text-[11px] font-semibold text-brand tabular">{i + 1}</span>
                    <div><p className="text-[14.5px] font-semibold text-ink">{t}</p><p className="mt-0.5 text-[13.5px] leading-snug text-ink-soft">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <a href={`mailto:${SITE.contactEmail}`} className="mt-7 inline-flex items-center gap-2.5 text-[15px] font-medium text-ink transition hover:text-brand"><Mail className="h-4.5 w-4.5 text-brand" />{SITE.contactEmail}</a>
          </div>

          <form onSubmit={submit} className="reveal-scale self-start rounded-[1.75rem] border border-line bg-card p-5 shadow-deep sm:p-8 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Your name</span><input id="c-name" required autoComplete="name" className={field} value={state.name} onChange={set("name")} placeholder="Rajesh Kulkarni" /></label>
              <label className="block"><span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Company</span><input id="c-company" required autoComplete="organization" className={field} value={state.company} onChange={set("company")} placeholder="Your solar company" /></label>
              <label className="block"><span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Email</span><input id="c-email" required type="email" autoComplete="email" className={field} value={state.email} onChange={set("email")} placeholder="you@company.com" /></label>
              <label className="block"><span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Phone <span className="font-normal text-mute">(optional)</span></span><input id="c-phone" type="tel" autoComplete="tel" className={field} value={state.phone} onChange={set("phone")} placeholder="98xxxxxxxx" /></label>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-[13px] font-medium text-ink-soft">What would you like to run on it? <span className="font-normal text-mute">(optional)</span></span><textarea id="c-message" rows={4} className={`${field} h-auto py-3`} value={state.message} onChange={set("message")} placeholder="Team size, how leads come in today, anything you want to see." /></label>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-medium text-white shadow-lift transition hover:bg-brand-deep hover:shadow-float sm:w-auto">Request a demo <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></button>
              <p className="text-[12.5px] leading-snug text-mute" aria-live="polite">{sent ? "Your email app should have opened. Press send there to finish." : "This opens your email app with the details filled in. No account needed."}</p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
