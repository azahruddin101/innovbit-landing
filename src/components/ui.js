import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-[1380px] px-5 sm:px-8 xl:px-12 ${className}`}>{children}</div>
);

/** The small mono label that opens a section, with the red mark from the logo in front of it. */
export const Eyebrow = ({ children, className = "", tone = "brand" }) => (
  <p className={`flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase ${tone === "light" ? "text-white/80" : "text-brand"} ${className}`}>
    <span className={`h-[2px] w-6 rounded-full ${tone === "light" ? "bg-sun" : "bg-sun"}`} aria-hidden="true" />
    {children}
  </p>
);

/** The emphasised words of a headline, in the brand blue. */
export const Em = ({ children, className = "text-brand" }) => <span className={className}>{children}</span>;

export const H2 = ({ children, className = "", as: Tag = "h2" }) => (
  <Tag className={`font-display text-[2.1rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[2.75rem] lg:text-[3.25rem] ${className}`}>{children}</Tag>
);

export const Lede = ({ children, className = "" }) => (
  <p className={`max-w-[62ch] text-[1.0625rem] leading-relaxed text-pretty text-ink-soft sm:text-lg ${className}`}>{children}</p>
);

/** Section opener: eyebrow and headline on the left, the lede on the right, aligned on a shared baseline. */
export function SectionHead({ eyebrow, title, lede, className = "", center = false }) {
  if (center) {
    return (
      <div className={`reveal mx-auto max-w-3xl text-center ${className}`}>
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <H2 className="mt-5">{title}</H2>
        {lede && <Lede className="mx-auto mt-5">{lede}</Lede>}
      </div>
    );
  }
  return (
    <div className={`reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div className="lg:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <H2 className="mt-5">{title}</H2>
      </div>
      {lede && <div className="lg:col-span-5 lg:pb-1.5"><Lede>{lede}</Lede></div>}
    </div>
  );
}

const base = "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-300 active:translate-y-px";
export const btn = {
  primary: `${base} bg-ink text-white shadow-lift hover:bg-brand-deep hover:shadow-float`,
  brand: `${base} bg-brand text-white shadow-lift hover:bg-brand-deep hover:shadow-float`,
  secondary: `${base} border border-line bg-card text-ink hover:border-ink/30 hover:bg-white`,
  light: `${base} bg-white text-ink shadow-float hover:bg-paper`,
  ghost: `${base} border border-white/35 bg-white/10 text-white backdrop-blur hover:border-white/70 hover:bg-white/15`,
  sun: `${base} bg-sun text-white hover:brightness-95`,
};
/** The arrow that slides on hover inside any `btn`. */
export const Arrow = ({ className = "" }) => <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`} />;

export function CheckList({ items, className = "", light = false }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className={`flex gap-3 text-[15px] leading-snug ${light ? "text-white/85" : "text-ink-soft"}`}>
          <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${light ? "bg-white/15 text-white" : "bg-mint text-brand"}`}><Check className="h-3 w-3" strokeWidth={3} /></span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** A tinted stage behind a product screen, so every mock sits on the same kind of surface. */
export const Stage = ({ children, className = "", inner = "p-4 sm:p-8" }) => (
  <div className={`stage relative overflow-hidden rounded-[1.75rem] border border-line/70 ${inner} ${className}`}>{children}</div>
);

/** A photo in a rounded, clipped box that drifts slowly as you scroll past it. */
export function Photo({ src, alt, className = "", sizes = "(min-width: 1024px) 58vw, 100vw", priority = false, children, imgClassName = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} placeholder="blur" className={`para-img object-cover ${imgClassName}`} />
      {children}
    </div>
  );
}

/** A feature row: words on one side, a product screen on a stage on the other; `flip` swaps them on wide screens. */
export function FeatureRow({ id, eyebrow, title, body, bullets, visual, flip = false, tone = "paper", bare = false }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${tone === "white" ? "bg-white" : ""}`}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={`reveal lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <H2 className="mt-5">{title}</H2>
            <Lede className="mt-5">{body}</Lede>
            <CheckList items={bullets} className="mt-8" />
          </div>
          <div className={`reveal-scale min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>{bare ? visual : <Stage>{visual}</Stage>}</div>
        </div>
      </Container>
    </section>
  );
}

/** A browser-style frame around a mock, so each one reads as a real screen. */
export function Frame({ title, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-card shadow-float ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-mute">{title}</span>
      </div>
      {children}
      <div className="border-t border-line bg-paper px-4 py-2 text-right font-mono text-[10px] tracking-wide text-mute uppercase">Sample data</div>
    </div>
  );
}

export const Chip = ({ children, tone = "mint" }) => {
  const tones = {
    mint: "bg-mint text-brand-deep",
    sun: "bg-sun-soft text-[#a32219]",
    slate: "bg-[#eef1f6] text-ink-soft",
    blue: "bg-[#e6eefb] text-[#1f4f9c]",
    red: "bg-[#fbe8e6] text-[#9b2c20]",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap ${tones[tone]}`}>{children}</span>;
};
