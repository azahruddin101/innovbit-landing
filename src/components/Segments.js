import { Check } from "lucide-react";
import Image from "next/image";
import industrial from "../../public/images/industrial.jpg";
import metalRoof from "../../public/images/metal-roof.jpg";
import residential from "../../public/images/residential.jpg";
import { Arrow, Container, Em, SectionHead } from "./ui";

const SEGMENTS = [
  {
    name: "Residential",
    photo: residential,
    alt: "A row of homes with solar panels across their roofs",
    line: "Rooftop homes, from the first call to the yearly visit.",
    points: ["Quick proposals with no 3D, or a full roof design", "Subsidy and loan steps the homeowner can follow", "A portal for proposals, bills and maintenance bookings"],
  },
  {
    name: "Commercial",
    photo: industrial,
    alt: "Aerial view of large buildings with solar panels on their roofs",
    line: "Offices, shops, schools, institutions and warehouses.",
    points: ["3D layout with hour-by-hour shading on flat roofs", "GST bills and invoices with your own number series", "AMC visits scheduled after handover"],
  },
  {
    name: "Industrial",
    photo: metalRoof,
    alt: "Solar panels on a corrugated metal factory roof",
    line: "Factories, sheds and larger rooftops.",
    points: ["Stock by batch and serial number, with warranties", "Installation steps assigned to field teams with proof", "Project expenses against what the job brings in"],
  },
];

/** Three tall photo cards; hovering (or focusing) one reveals what the platform does for that kind of project. */
export default function Segments() {
  return (
    <section id="segments" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHead eyebrow="Who it’s for" title={<>Every kind of roof <Em>you install on.</Em></>} lede="One workspace, whether the job is a 3 kW home or a factory shed. The same leads, designs, bills and visits, sized to the project." />
        <ul className="stagger mt-14 grid gap-4 sm:gap-5 md:grid-cols-3">
          {SEGMENTS.map(({ name, photo, alt, line, points }) => (
            <li key={name}>
              <article tabIndex={0} className="group relative isolate aspect-[3/4.1] overflow-hidden rounded-[1.75rem] bg-mint shadow-lift outline-offset-4 md:aspect-[3/4.3]">
                <Image src={photo} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06] group-focus-within:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/5 transition duration-500 group-hover:via-navy/55 group-focus-within:via-navy/55" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <h3 className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em]">{name}</h3>
                  <span className="mt-4 block h-[3px] w-9 rounded-full bg-sun transition-all duration-500 group-hover:w-16 group-focus-within:w-16" aria-hidden="true" />
                  <p className="mt-4 text-[15px] leading-snug text-white/90">{line}</p>
                  <ul className="grid transition-all duration-500 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100">
                    <li className="min-h-0 overflow-hidden">
                      <ul className="mt-4 space-y-2 pb-1">
                        {points.map((p) => <li key={p} className="flex gap-2.5 text-[13.5px] leading-snug text-white/85"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9cc1ff]" strokeWidth={3} />{p}</li>)}
                      </ul>
                    </li>
                  </ul>
                  <a href="#platform" className="group/l mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/90 transition hover:text-white">See the platform <Arrow className="h-3.5 w-3.5" /></a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
