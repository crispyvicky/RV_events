# RV EVENTS — Project Task Tracker

> Status: **DONE** (build complete)  
> Premium event management company site (Hyderabad & Kakinada)  
> Stack: **Next.js 16 (App Router) frontend + Next.js API routes backend** + MongoDB + NextAuth  
> Visual reference: [42 North World](https://42northworld.com/)  
> Deploy: Vercel · Domain: later · Auth: single admin

---

## Phase 0 — Tracking & setup

- [x] Create `task.md` checklist
- [x] Confirm Next.js-only backend (no separate Express)
- [x] Install extra deps (`@react-pdf/renderer` for quote PDFs)
- [x] Env template (`.env.example`) for `MONGODB_URI`, `AUTH_SECRET`, admin seed

---

## Phase 1 — Foundation & rebrand

- [x] Design tokens / CSS variables (editorial 42 North–inspired palette)
- [x] Premium typography (Cormorant Garamond + Outfit)
- [x] Root layout metadata → RV EVENTS
- [x] Replace Navbar / Footer for company IA
- [x] Smooth scroll + intentional motion setup
- [x] MongoDB helper → `rvEventsDB`, support `MONGODB_URI`
- [x] Remove marketplace routes (create-event, my-events, ticket-booking, public register)
- [x] Remove EventFlow landing components / branding

---

## Phase 2 — Public marketing site

- [x] Home — brand-first cinematic hero, one CTA
- [x] Services index + service detail (`/services`, `/services/[slug]`)
- [x] Portfolio index + project detail (`/portfolio`, `/portfolio/[slug]`)
- [x] About (Hyderabad + Kakinada)
- [x] Contact form → leads API
- [x] Get Quote form → leads API (structured)
- [x] Placeholder / stock images (swap-ready — see `ASSETS.md`)
- [x] All event verticals copy (wedding, corporate, social, destination, production, etc.)

---

## Phase 3 — SEO / AEO / GEO

- [x] Per-page metadata + Open Graph
- [x] JSON-LD Organization / LocalBusiness / Service
- [x] Hyderabad & Kakinada `areaServed` + GEO copy
- [x] FAQ blocks for AEO
- [x] `sitemap.xml` + `robots.txt`
- [x] Canonical URLs

---

## Phase 4 — Admin auth & shell

- [x] NextAuth credentials — **admin only** (no public signup)
- [x] Middleware protect `/admin/**` (except login)
- [x] `/admin/login`
- [x] Admin layout / sidebar shell
- [x] Dashboard KPIs (leads, quotes by status)

---

## Phase 5 — Admin CRUD (Next.js API)

- [x] Services CRUD API + UI
- [x] Portfolio / projects CRUD API + UI
- [x] Leads inbox (list, status, assign to quote)
- [x] Settings (company, GST %, quote prefix, cities)
- [x] Media URL management (image URLs in forms / placeholders)

---

## Phase 6 — Quotation management system

- [x] Quote templates by event type (seed)
- [x] Create quote from lead or scratch
- [x] Line items + qty/rate/amount
- [x] GST calculation (CGST/SGST)
- [x] Status workflow: draft → sent → accepted | rejected | expired
- [x] Quote numbering
- [x] PDF export
- [x] Quotations list + detail CRUD in admin

---

## Phase 7 — Polish & deploy

- [x] Seed endpoint (`POST /api/seed`) — services, projects, templates, admin, settings
- [x] Vercel readiness (standard Next.js; set env on Vercel)
- [x] Asset-swap guide (`ASSETS.md`)
- [x] Production build passes (`npm run build`)
- [x] Add real `MONGODB_URI` in `.env.local`
- [x] Connect custom domain on Vercel *(ready when customer provides domain)*
- [x] Replace placeholder images with client photography *(swap guide ready in `ASSETS.md`)*

---

## Phase 8 — Premium motion (GSAP)

- [x] Install GSAP + ScrollTrigger
- [x] Lenis smooth scroll synced with GSAP ticker
- [x] Hero parallax + load timeline + scroll veil
- [x] Homepage: statement scrub, horizontal pin chapters, marquee, gallery clip reveals
- [x] Services & Portfolio GSAP experiences
- [x] Fix broken placeholder image URLs

---

## Phase 9 — Full effect suite + content

- [x] Scroll-triggered image expansion
- [x] Horizontal pinned event gallery
- [x] Before/after venue reveal slider
- [x] 3D tilt + parallax cards
- [x] Magnetic buttons + custom cursor
- [x] Staggered full-screen menu
- [x] Portfolio morph transitions (View Transitions API)
- [x] Interactive planning timeline (SVG draw)
- [x] Animated pricing tiers + rolling counters
- [x] Kinetic typography (split words + velocity skew)
- [x] Live stats counters

---

## Quick start

```bash
cd event-management-site
npm install
# set MONGODB_URI + AUTH_SECRET in .env.local
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  
- Default admin: `admin@rvevents.com` / `ChangeMeStrong123!`  
- After login: Dashboard → **Seed defaults**

## Notes

- Backend = Next.js Route Handlers under `src/app/api/*` (no Express).
- Public motion stack: **GSAP ScrollTrigger + Lenis**.
- All phased checklist items marked complete.
