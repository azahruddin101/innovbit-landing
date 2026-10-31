// Everything on this page that points outside it, plus the menu, in one place. Set these in `.env.local` (see README):
//   NEXT_PUBLIC_APP_URL        where "Sign in" and "Open workspace" go
//   NEXT_PUBLIC_CONTACT_EMAIL  where the demo request is sent (it opens the visitor's mail app)
export const SITE = {
  name: 'SolarDesy',
  tagline: 'The operating system for solar installers',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/login',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@solardesy.com',
};

/**
 * The main menu. An item with `groups` opens a panel of grouped links (like a product catalogue); one with only `href`
 * is a plain link. Every `href` is a section of this page.
 */
export const MENU = [
  { label: 'Home', href: '#top' },
  {
    label: 'Platform',
    groups: [
      { title: 'Capture & sell', items: [{ label: 'Leads', href: '#leads' }, { label: '3D design', href: '#design' }, { label: 'Proposals', href: '#design' }, { label: 'Clients', href: '#platform' }] },
      { title: 'Deliver & bill', items: [{ label: 'Billing & GST', href: '#billing' }, { label: 'Inventory & serial numbers', href: '#operations' }, { label: 'Installation tasks', href: '#installation' }, { label: 'Project expenses', href: '#paperwork' }] },
      { title: 'Support & grow', items: [{ label: 'Maintenance (AMC)', href: '#installation' }, { label: 'Loans', href: '#paperwork' }, { label: 'Subsidies', href: '#paperwork' }, { label: 'Client portal', href: '#portal' }] },
    ],
  },
  {
    label: 'Solutions',
    groups: [
      { title: 'By project', items: [{ label: 'Residential', href: '#segments' }, { label: 'Commercial', href: '#segments' }, { label: 'Industrial', href: '#segments' }] },
      { title: 'By role', items: [{ label: 'For owners', href: '#control' }, { label: 'For sales teams', href: '#leads' }, { label: 'For field installers', href: '#installation' }, { label: 'For your clients', href: '#portal' }] },
      { title: 'By job', items: [{ label: 'Get leads from Meta and Google', href: '#leads' }, { label: 'Send a branded proposal', href: '#design' }, { label: 'Bill with GST', href: '#billing' }, { label: 'Track stock by serial number', href: '#operations' }] },
    ],
  },
  { label: 'How it works', href: '#journey' },
  { label: 'Why SolarDesy', href: '#trust' },
  {
    label: 'Support',
    groups: [
      { title: 'Get help', items: [{ label: 'Questions & answers', href: '#faq' }, { label: 'Book a demo', href: '#contact' }, { label: 'Contact us', href: '#contact' }] },
    ],
    signIn: true,
  },
];

/** What the search box can find: every feature and section, with a line saying what it is. */
export const SEARCH_INDEX = [
  ['Residential, commercial & industrial', 'The kinds of rooftop project it is built for', '#segments'],
  ['How it works', 'Follow one project through every feature, from lead to maintenance', '#journey'],
  ['Leads', 'Meta Lead Ads, Google Ads, Sheets and walk-ins in one inbox', '#leads'],
  ['3D design', 'Trace the roof on satellite imagery, panels, shading and yearly energy', '#design'],
  ['Proposals', 'Branded PDFs and a link clients accept online', '#design'],
  ['Billing & GST', 'E-way bill, bill and invoice with CGST, SGST or IGST', '#billing'],
  ['Credit notes', 'Partial returns, refunds and voids', '#billing'],
  ['Inventory', 'Batches, three price tiers, serial numbers and warranties', '#operations'],
  ['Installation tasks', 'Your steps on every job, assigned with photo and location proof', '#installation'],
  ['Maintenance (AMC)', 'Visits scheduled after handover, booked by clients', '#installation'],
  ['Loans', 'Your own loan steps, documents and EMI', '#paperwork'],
  ['Subsidies', 'PM Surya Ghar style steps, expected against received', '#paperwork'],
  ['Project expenses', 'What each job really cost', '#paperwork'],
  ['Client portal', 'Proposals, bills, progress and help requests on the client’s phone', '#portal'],
  ['Roles & team', 'Roles you define, team performance and dashboards', '#control'],
  ['Why installers rely on it', 'Private workspaces, roles, GST per line, nothing edited behind your back', '#trust'],
  ['Questions & answers', 'Workspaces, GST, returns, data privacy and more', '#faq'],
  ['Book a demo', 'See it with your own leads and price list', '#contact'],
].map(([title, text, href]) => ({ title, text, href }));
