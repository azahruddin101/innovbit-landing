import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import Hero from "@/components/Hero";
import Platform from "@/components/Platform";
import Segments from "@/components/Segments";
import { CtaBand, Faq, Footer, Marquee, Paperwork, Trust } from "@/components/Sections";
import { ChainMock, DesignerMock, KanbanMock, PortalPhone, RolesMock, StockMock, TasksMock } from "@/components/mocks";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Image from "next/image";
import fieldWork from "../../public/images/field-work.jpg";
import residential from "../../public/images/residential.jpg";
import { Em, FeatureRow } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="h-16 sm:h-24" aria-hidden="true" />
        <Marquee />
        <Segments />
        <Platform />
        <Journey />
        <Trust />

        <FeatureRow
          id="leads"
          eyebrow="Capture"
          title={<>Every lead in one inbox, <Em>with a name on it.</Em></>}
          body="Connect Meta Lead Ads, Google Ads or a Google Sheet once and new enquiries arrive on their own. Add walk-ins on your own lead form or import a spreadsheet, then give each lead to a telecaller and watch it move across the board."
          bullets={[
            "Meta and Google Ads leads arrive automatically",
            "Import from Excel or CSV, or add walk-ins by hand",
            "Assign to telecallers; every hand-over and reschedule is logged",
            "Board and list views, your own statuses and follow-up dates",
            "Turn a converted lead into a client in one step",
          ]}
          visual={<KanbanMock />}
        />

        <FeatureRow
          id="design"
          eyebrow="Design & proposals"
          title={<>Designed on the real roof, <Em>not a sketch.</Em></>}
          body="The designer works from satellite imagery and the sun’s actual path over the site. Shading from parapets, tanks, trees and neighbouring rows is calculated hour by hour. Need a quote in minutes instead? Use a quick proposal with no 3D."
          bullets={[
            "Trace the roof on satellite imagery and lay out panels in 3D",
            "Yearly energy calibrated with Google’s Solar API where it has data",
            "Ready-made packages and your own price list",
            "Subsidy, loan and AMC options built into the proposal",
            "Share a link: clients accept, decline or ask for changes online",
          ]}
          visual={<DesignerMock />}
          flip
          tone="white"
        />

        <FeatureRow
          id="billing"
          eyebrow="Billing"
          title={<>From goods out to invoice paid, <Em>in three clean steps.</Em></>}
          body="Stock leaves on an e-way bill, a bill records the payment, and an invoice settles the bills, with GST worked out per line and your own numbering. Got goods back or made a mistake? Issue a credit note or void it. Nothing is edited behind your back."
          bullets={[
            "GST invoices with CGST and SGST or IGST, in your own number series",
            "Stock comes off when goods leave and returns if an e-way bill is cancelled",
            "Partial returns become credit notes with the refund recorded",
            "Branded PDFs, shared straight to the client on WhatsApp",
            "Payments flow into the proposal’s ledger and your dashboard on their own",
          ]}
          visual={<ChainMock />}
        />

        <FeatureRow
          id="operations"
          eyebrow="Inventory"
          title={<>Know what’s on the shelf, <Em>down to the serial number.</Em></>}
          body="Receive stock in batches with base, wholesale and retail prices. Panels, inverters and batteries are tracked one by one, and the warranty starts running the day each one is installed."
          bullets={[
            "Batches with three price tiers; the oldest stock sells first",
            "Serial numbers move from in stock, to sold, to installed",
            "Low-stock alerts and supplier records with their bills",
            "Bundle products into packages for quick quotes",
            "Look up any serial to see where it went and when its warranty ends",
          ]}
          visual={<StockMock />}
          flip
          tone="white"
        />

        <FeatureRow
          id="installation"
          eyebrow="Installation & maintenance"
          title={<>After the sale, <Em>the work.</Em></>}
          body="Define your installation steps once and every job gets them. Assign each step to field staff, who update progress from their phone with a photo and their location. Maintenance visits schedule themselves after handover."
          bullets={[
            "Steps, priorities and an owner for every job",
            "Stuck-step alerts when a task sits too long",
            "AMC visits scheduled after installation; clients can book too",
            "Bill replaced parts straight from stock",
          ]}
          bare
          visual={
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-lift">
                <Image src={fieldWork} alt="A technician in a hard hat fastening a solar panel on a large rooftop array" fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="para-img object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
              <div className="relative -mt-16 px-3 sm:-mt-24 sm:px-8"><TasksMock /></div>
            </div>
          }
        />

        <Paperwork />

        <FeatureRow
          id="portal"
          eyebrow="Client portal"
          title={<>Your clients see where things stand, <Em>and stop phoning.</Em></>}
          body="Every client with an email address gets a sign-in. They follow their own system from proposal to loan to maintenance, on their phone, with nothing to install."
          bullets={[
            "Proposals to read, accept, or send back with notes",
            "Bills and invoices as PDFs",
            "Loan and subsidy progress, step by step",
            "Book maintenance visits and raise help requests",
            "Each client sees only their own records",
          ]}
          bare
          visual={
            <div className="relative overflow-hidden rounded-[1.75rem] bg-mint shadow-lift">
              <Image src={residential} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="para-img object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/15 to-navy/15" />
              <div className="relative px-6 py-12 sm:py-16 lg:py-20">
                <PortalPhone />
                <div className="float absolute top-1/4 left-6 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/92 p-3 pr-4 shadow-float backdrop-blur md:flex lg:left-10">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-brand"><CheckCircle2 className="h-4.5 w-4.5" /></span>
                  <div><p className="text-[12.5px] font-semibold text-ink">Proposal accepted</p><p className="text-[11px] text-mute">8 kW rooftop · just now</p></div>
                </div>
                <div className="float absolute right-6 bottom-1/4 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/92 p-3 pr-4 shadow-float backdrop-blur [animation-delay:-2.5s] md:flex lg:right-10">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-brand"><MessageCircle className="h-4.5 w-4.5" /></span>
                  <div><p className="text-[12.5px] font-semibold text-ink">Invoice shared</p><p className="text-[11px] text-mute">Sent on WhatsApp</p></div>
                </div>
              </div>
            </div>
          }
        />

        <FeatureRow
          id="control"
          eyebrow="Team & control"
          title={<>The right view <Em>for each person.</Em></>}
          body="Staff always see their own leads, installation steps and AMC visits. Everything beyond that, like finances, inventory, loans or every installation, comes from roles you define, action by action."
          bullets={[
            "Name and shape roles yourself; changes apply on the next request",
            "A staff workspace that works in a phone browser",
            "Dashboards for pipeline, money in, stock, maintenance due and team performance",
            "Every company’s data is private to that company",
          ]}
          visual={<RolesMock />}
          flip
          tone="white"
        />

        <CtaBand />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
