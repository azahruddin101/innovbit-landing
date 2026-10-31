import { ArrowRight, Sun } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/config/site";
import { btn } from "@/components/ui";

export const metadata = { title: `Page not found — ${SITE.name}` };

export default function NotFound() {
  return (
    <main className="rays grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><Sun className="h-6 w-6" /></span>
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-brand uppercase">Error 404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-ink">This page isn’t here.</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">The link may be old or mistyped. Everything about {SITE.name} is on the home page.</p>
        <Link href="/" className={`${btn.primary} mt-8`}>Back to the home page <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </main>
  );
}
