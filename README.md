# SolarDesy landing page

A single-page, light-theme marketing site for SolarDesy: Next.js (App Router), Tailwind CSS 4, no images to host (every product screen is drawn in HTML, CSS and SVG, and labelled "Sample data").

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Set before you publish

Create `.env.local`:

```
NEXT_PUBLIC_APP_URL=https://your-workspace-url/login   # where "Sign in" goes
NEXT_PUBLIC_CONTACT_EMAIL=you@yourcompany.com          # where demo requests are sent
```

The menu (and what the search box can find) is also in `src/config/site.js`: edit `MENU` and `SEARCH_INDEX` to change links; every link points at a section of the page.

The demo form opens the visitor's own email app with the details filled in; nothing is stored or sent by this site. Both values live in `src/config/site.js`, together with the navigation links.

## Where things are

| What | File |
| --- | --- |
| Section order and all feature copy | `src/app/page.js` |
| Header (utility row, dropdown panels, off-canvas menu), search, hero, platform tabs, contact form | `src/components/Header.js`, `SearchDialog.js`, `Hero.js`, `Platform.js`, `Contact.js` |
| Marquee, trust pillars, paperwork cards, closing band, FAQ, footer | `src/components/Sections.js` |
| The scroll-driven journey (scene, sun, panels, the twelve chapters) | `src/components/Journey.js` |
| "Find your fit" cards | `src/components/Segments.js` |
| The product screens | `src/components/mocks.js` |
| Colours, fonts and motion | `src/app/globals.css`, `src/app/layout.js` |

Every claim on the page describes something the product does. There is no pricing section: plans and prices are discussed on the demo call.

## Design

- **Type**: headlines in Bricolage Grotesque (optical sizes on), body and data in Geist, labels in Geist Mono. All three load through `next/font/google`.
- **Colour**: tokens in `src/app/globals.css` (`@theme inline`): navy ink, cool paper, SolarDesy blue (`--color-brand`) and the red accent from the logo (`--color-sun`). Light theme only.
- **Motion**: the hero plays one timed sequence on load (`.rise`, `.tilt-in`, `.kenburns`). Everything else is driven by scroll position with CSS scroll timelines (`.reveal`, `.reveal-scale`, `.stagger`, `.para-img`), so there is no scroll JavaScript outside the 3D journey. Browsers without scroll timelines show everything at rest; `prefers-reduced-motion` turns all of it off.
- **Sections**: `Hero` → `Marquee` (works with) → `Segments` → `Platform` → `Journey` (3D) → `Trust` (#trust, "Why SolarDesy") → feature rows → `Paperwork` → portal → team → `CtaBand` → `Faq` → `Contact` → `Footer`.

## Photos

Photos in `public/images` come from Unsplash (free under the Unsplash License, no attribution required; credited here anyway). Swap any file for your own project photo with the same name.

| File | Used in | Photographer |
| --- | --- | --- |
| hero.jpg | Hero | Michael Pointner |
| hero-home.jpg | Platform, stage 1 | Watt A Lot |
| residential.jpg | Residential card, Platform stage 3, client portal | Uitbundig |
| industrial.jpg | Commercial card | Bernd Dittrich |
| metal-roof.jpg | Industrial card | Sergio Martins |
| installer.jpg | Platform, stage 2 | Bill Mead |
| field-work.jpg | Installation & maintenance | Siwawut Phoophinyo |
| panel-texture.jpg | Why SolarDesy | Evgeniy Alyoshin |
| farm-sunset.jpg | Closing band | Dad hotel |
| carrying.jpg | Book a demo | Siwawut Phoophinyo |
| engineer.jpg | spare, not used on the page | Sikwe Scarter |

The scroll-driven "How it works" scene is real-time 3D (three.js, `src/components/Scene3D.js`), not a photo. If WebGL is unavailable it falls back to the illustrated scene.
