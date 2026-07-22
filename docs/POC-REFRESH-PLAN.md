# WashKing POC Refresh v2 — Implementation & Testing Plan

> **This file is the single source of truth for the `poc/refresh-v2` branch.**
> If you are an agent (Claude Opus or otherwise) picking this up: read this whole file,
> then jump to **§8 Resume / Handoff** for the exact next action. Update checkboxes in
> §6 and the Handoff section after every step, and commit the plan with each step.

---

## 1. Goals, scope & PROD-safety constraints

### Goal
A polish-and-elevate visual + UX refresh of washking.net for car-wash-membership
customers: smoother, faster-feeling, more accessible, more conversion-focused — while
staying unmistakably WashKing (fun, happy, cartoony lion/kingdom/bubbles theme).
This is NOT a reinvention. No new information, no new claims, no invented content.

### PROD-safety rules (non-negotiable, restated from the owner's brief)
- All work happens on branch **`poc/refresh-v2`**, branched off `main`
  (base commit `3565e4c`). **Never commit to `main` or `dev`. Never merge this branch.
  Never promote/deploy to the production domain.** The branch's own Vercel preview URL
  is the only place this POC appears.
- Keep the branch buildable at every commit (`npm run build` must pass).
- Do not touch DNS, prod `vercel.json` behavior, or `src/lib/site.ts` constants in a
  way that would affect production if merged.
- **Forms must not send real data.** The 3 forms (Contact / Customer Survey /
  Employment) go through `src/lib/formSubmission.ts` → Webchily Supabase edge function
  + Formspree fallback. On this branch, `submitWebsiteForm` is stubbed behind
  `POC_MODE` (see §4): full success UX, zero network calls.
- **First-party analytics must not pollute the production DB.** `src/lib/analytics.ts`
  `track()` posts to the `ingest-web-event` Supabase function. On this branch,
  `track()` no-ops (console.debug only) behind `POC_MODE`.
- ⚠️ Consequence of the `POC_MODE = true` constant: if this branch were ever merged,
  prod forms/analytics would silently stub. That is one more reason this branch is
  preview-only, forever. The constant lives in one file (`src/lib/pocMode.ts`) so the
  kill-switch is obvious and greppable.

### Brand lock
- Keep: lion mascot, crown/kingdom playfulness, soap bubbles, rounded bouncy shapes,
  wood-sign motifs. Assets in `src/assets/` (lion-mascot, lion-car-mark,
  washking-hero-logo, *-collage, wood-texture, wooden-sign).
- Palette via existing tokens only (no raw hex): `--washking-yellow` (45 100% 50%),
  `--washking-sky` (202 72% 38%), `--washking-brown` (25 60% 28%), `--washking-green`,
  `--washking-cream`. Tokens in `src/index.css :root`, exposed as `washking.*` in
  `tailwind.config.ts`.
- Type: Fredoka (display) + Plus Jakarta Sans (body). Already wired in `index.css`.
- Contrast: white text only on sky-blue/brown/green; **brown text on yellow, never
  white on yellow**. WCAG AA everywhere.
- Content truth: locations, tiers, prices, hours come from `src/lib/locations.ts`
  verbatim (catalog verified 2026-07-12). Invent nothing. **No fake reviews. No phone
  number anywhere** — contact is the form + contact@washking.net only.

### Stack facts (so you don't break the build)
- Vite 5 + React 18 + TS + shadcn/ui + Tailwind, prerendered with **vite-react-ssg**.
  Routes = `RouteRecord[]` in `src/App.tsx`. `npm run build` = `vite-react-ssg build`.
- Dev server `npm run dev` → port 8080. Tests: `npm run test` (vitest, jsdom).
  Typecheck: `npm run typecheck`. Lint: `npm run lint`.
- CI builds with bun; **add no new dependencies** (nothing in this plan needs one).
- Known traps:
  - No react-leaflet (breaks SSG). Maps already use plain leaflet imperatively in
    `LocationsMapInner.tsx`, lazy client-only — don't disturb that pattern.
  - No `opacity:0` entry animations on above-the-fold/LCP content (prerendered HTML
    must be visible pre-hydration). Animate below-the-fold only.
  - Every looping/floating animation needs a `prefers-reduced-motion` guard (the
    global reduce block in `index.css` already kills animations; keep new keyframes
    compatible with it and don't use `animation-iteration-count` tricks that survive).
  - `cleanUrls` stays enabled. Trust `npm run build` + `npm run preview` over the dev
    server when diagnosing hydration.

---

## 2. Information architecture (all routes, what changes)

| Route | Page file | Refresh scope |
|---|---|---|
| `/` | `src/pages/Index.tsx` | Highest-value page. Hero polish, wave dividers, locations w/ open-now chips, packages clarity, trust/FAQ polish. |
| `/location/vineland` | `src/pages/LocationPage.tsx` | Shared template — one refresh covers all 5. Plan cards w/ "pays for itself in N washes", open-now chip, sticky CTA. |
| `/location/vineland-dante` | (same template) | 24-hr exterior-only variant renders correctly. |
| `/location/somerset` | (same template) | Has gallery collages (`locationMedia.ts`). |
| `/location/landisville` | (same template) | 24-hr exterior-only variant. |
| `/location/cherry-hill` | (same template) | Coming-soon variant: keep expectations honest, CTA = "Cherry Hill updates" contact topic. |
| `/about` | `src/pages/AboutPage.tsx` | Story polish, collage imagery, wave dividers, CTA to locations. |
| `/contact` | `src/pages/ContactPage.tsx` | Friendlier hero, form UX polish, stubbed submit w/ real success UX. |
| `/customer-survey` | `src/pages/CustomerSurveyPage.tsx` | Same form-UX treatment. |
| `/employment` | `src/pages/EmploymentPage.tsx` | Same form-UX treatment. |
| `/privacy` | `src/pages/PrivacyPage.tsx` | Typography/readability pass only. |
| `/thank-you` | `src/pages/ThankYouPage.tsx` | Celebratory on-brand moment (bubbles, mascot). |
| `*` (404) | `src/pages/NotFound.tsx` | Playful lost-lion moment, clear route home. |

Shared chrome refreshed once: `Header.tsx`, `Footer.tsx`, plus new shared decorative
components (§4). No routes added or removed. No nav items added or removed.

---

## 3. Per-page design spec (top to bottom)

Conversion action legend: **[CTA]** = primary conversion element of the section.

### 3.1 Shared chrome

**Header** (`src/components/Header.tsx`)
- Keep structure/links exactly. Polish: slightly translucent cream/white sticky bar
  with soft shadow on scroll; active-route pill (yellow bg, brown text); logo
  micro-interaction on hover (gentle tilt, reduced-motion guarded); mobile sheet menu
  gets bubble-accent background and bigger touch targets (min 44px). [CTA] "Join
  Unlimited" button stays the loudest element (btn-secondary yellow).

**Footer** (`src/components/Footer.tsx`)
- Sky-blue footer with a soap-wave top divider (WaveDivider). Columns: brand +
  mascot mark, locations list (all 5, coming-soon tagged), quick links, contact
  (email only, socials from `SOCIAL_LINKS`). Membership portal link kept.
  [CTA] small "Start Unlimited" strip above the wave.

### 3.2 Home `/`

1. **HeroSection** — keep prerendered LCP visible (no entry opacity on the headline/
   logo/CTA). Polish copy hierarchy: eyebrow ("NEW JERSEY'S CAR WASH KINGDOM" style
   truthful line already in use), display headline, sub, two CTAs
   ([CTA] "See Unlimited Plans" → #wash-plans/locations; secondary "Find a Location").
   Decorative bubbles rise behind (aria-hidden, CSS-only, reduced-motion guarded,
   below the headline in paint order). Wood-sign/crown accents kept.
2. **LocationsSection** — cards for 4 open + 1 coming soon. Add live "Open now /
   Closed now / Open 24 hours" chip via `getLocationOpenStatus` (client-only after
   hydrate; SSR renders hours summary so no layout shift). Card hover lift.
   [CTA] per-card "See plans & hours".
3. **PackagesSection** — clarify tier ladder (Bronze → Platinum → Diamond → Royalty
   where offered): monthly price big, single price small, "everything in X plus"
   framing already in data (`includes`). Highlight the member value with
   `getBreakEvenVisits` ("pays for itself in N washes/mo"). Brown-on-yellow for the
   Diamond card text. [CTA] "Start Unlimited" → membership portal or location.
4. **ProofSection** — real collage imagery only; no testimonials unless owner
   supplies real ones (currently: none — keep it imagery + truthful copy).
5. **TrustStatsSection** — keep existing truthful stats; add gentle count-up on
   scroll-into-view (below fold, reduced-motion → static numbers).
6. **FAQSection** — shadcn Accordion polish, crown bullet icons, generous tap areas.
   [CTA] closing "Still have questions? → /contact".

### 3.3 Location pages `/location/:slug`

1. **Hero band** (sky bg, yellow border-bottom kept) — location name, serviceLabel,
   hours summary + open-now chip, address with directions link
   (`getDirectionsUrl`). [CTA] "See wash plans" anchor → #wash-plans.
2. **#wash-plans** (sky-light bg) — plan cards sorted by monthly price
   (`getPackagesByMonthlyPrice`), package colors from data (`color`/`textColor`),
   break-even line per card, UNLIMITED_MEMBER_BENEFITS block, member perks where
   present (Vineland Main Rd). [CTA] "Start Unlimited" per card.
3. **Yellow membership CTA band** — brown text on yellow, bubbles accent.
   [CTA] portal link / contact prefilled with location.
4. **Visit section** (white) — address, hours table, gallery
   (`LocationGallery` where media exists), leaflet map (existing pattern untouched).
   [CTA] "Get directions".
5. **Coming-soon variant (cherry-hill)** — honest "opening details to come" hero,
   no plans/hours invented; [CTA] contact form prefilled topic `opening_updates`.

### 3.4 Form pages `/contact`, `/customer-survey`, `/employment`

- **FormPageHero** — friendlier: mascot mark, bubble accents, one-line promise
  ("We reply by email — usually within a business day" ONLY if that claim already
  exists on the site; otherwise no response-time claim).
- **Form card** — white card on cream, clear field grouping, inline zod errors kept,
  larger inputs (min-h 44px), visible focus rings (already global).
- **Submit** — pending state on button; on success show the existing success UX
  (toast/redirect to /thank-you as each page already does) with **zero network
  calls** (POC stub). [CTA] the submit button.

### 3.5 `/thank-you`
- Celebration: mascot + rising bubbles (reduced-motion → static), "You're royalty
  now" tone without new claims. Links back to home + locations. [CTA] "Back to home".

### 3.6 `/about`
- Story sections with collage imagery, wave dividers between bands, values as crown
  bullets. Truthful copy unchanged in meaning. [CTA] "Find your location".

### 3.7 `/privacy`
- Prose typography pass (readable measure ~65ch, heading rhythm). No content change.

### 3.8 404
- Lion mascot, "Looks like you've wandered out of the kingdom", search-free, big
  [CTA] "Back to the castle" → `/` + links to locations.

---

## 4. Design-system deltas (all reuse existing tokens; no new deps)

New files:
- **`src/lib/pocMode.ts`** — `export const POC_MODE = true;` single greppable
  kill-switch consumed by `formSubmission.ts` and `analytics.ts`. (Why: prod-safety.)
- **`src/components/decor/WaveDivider.tsx`** — inline-SVG soap-wave section divider,
  `fill` driven by token classes, `aria-hidden`, flippable. (Why: on-brand section
  rhythm without images.)
- **`src/components/decor/BubbleField.tsx`** — absolutely-positioned decorative
  bubbles (pure CSS circles, `animation: bubble-float`), `aria-hidden`,
  `pointer-events-none`, hidden entirely under reduced motion. Never wraps LCP
  content. (Why: brand motif, cheap, no assets.)

New CSS (in `src/index.css`, existing layers):
- `@keyframes bubble-float` (translateY drift + fade) and
  `@keyframes gentle-bounce` (≤4px) — both neutralized by the existing
  reduced-motion block; additionally `.bubble-field` gets `display:none` under
  reduced motion (belt and suspenders).
- `.card-lift` — `transition-transform` hover raise + shadow (matches `.btn-cloud`
  feel); no-op under reduced motion.
- `.prose-washking` — readable measure + heading rhythm for Privacy/About prose.

No new color tokens, fonts, or Tailwind plugin changes. `tailwind.config.ts`
untouched unless a keyframe alias is cleaner there (prefer index.css).

---

## 5. File-by-file change list

| File | Action | Reason |
|---|---|---|
| `docs/POC-REFRESH-PLAN.md` | add | this plan (memory / handoff) |
| `src/lib/pocMode.ts` | add | POC kill-switch constant |
| `src/lib/formSubmission.ts` | modify | stub Webchily+Formspree behind POC_MODE (simulated latency, success result) |
| `src/lib/analytics.ts` | modify | `track()` no-ops (console.debug) behind POC_MODE |
| `src/test/formSubmission.test.ts` | modify | cover POC stub (no fetch called) |
| `src/test/analytics.test.ts` | modify | cover no-op behavior |
| `src/index.css` | modify | new keyframes + `.card-lift`, `.prose-washking`, bubble reduced-motion guard |
| `src/components/decor/WaveDivider.tsx` | add | wave section divider |
| `src/components/decor/BubbleField.tsx` | add | decorative bubbles |
| `src/components/Header.tsx` | modify | sticky polish, active pill, mobile menu touch targets |
| `src/components/Footer.tsx` | modify | wave top, columns, CTA strip |
| `src/components/HeroSection.tsx` | modify | hierarchy + bubbles (LCP stays visible) |
| `src/components/LocationsSection.tsx` | modify | open-now chips, card lift |
| `src/components/PackagesSection.tsx` | modify | tier ladder clarity, break-even line |
| `src/components/ProofSection.tsx` | modify | imagery polish, no fake proof |
| `src/components/TrustStatsSection.tsx` | modify | count-up on view (guarded) |
| `src/components/FAQSection.tsx` | modify | accordion polish + contact CTA |
| `src/pages/LocationPage.tsx` | modify | hero chip, plan cards, CTA band, visit section |
| `src/pages/ContactPage.tsx` | modify | form UX polish (submit already via lib stub) |
| `src/pages/CustomerSurveyPage.tsx` | modify | form UX polish |
| `src/pages/EmploymentPage.tsx` | modify | form UX polish |
| `src/pages/ThankYouPage.tsx` | modify | celebration moment |
| `src/pages/NotFound.tsx` | modify | lost-lion 404 |
| `src/pages/AboutPage.tsx` | modify | story polish |
| `src/pages/PrivacyPage.tsx` | modify | prose typography |

Explicitly untouched: `src/lib/site.ts`, `vercel.json`, `src/App.tsx` routes,
`src/lib/locations.ts` (data is truth), `LocationsMap*.tsx` leaflet pattern,
`package.json` deps, DNS/Vercel settings.

---

## 6. Build sequence (small resumable steps; update statuses in place)

Legend: `[ ]` TODO · `[~]` DOING · `[x]` DONE
After EVERY step: `npm run typecheck && npm run lint && npm run test`, eyeball the
affected route(s) on the dev server, tick the box, update §8 Handoff, commit.

- [x] **S0** Create branch `poc/refresh-v2` off up-to-date `main`; commit this plan.
- [ ] **S1** POC guardrails: add `pocMode.ts`; stub `submitWebsiteForm`; no-op
      `track()`; update the two test files; verify with devtools that a contact
      submit + page nav produce zero requests to formspree/supabase domains.
- [ ] **S2** Design-system foundations: index.css keyframes/utilities +
      `WaveDivider` + `BubbleField` (with reduced-motion guards). Not yet used
      anywhere — pure additive, zero visual change, all checks green.
- [ ] **S3** Header polish.
- [ ] **S4** Footer polish (first consumer of WaveDivider).
- [ ] **S5** Home hero (LCP rule: no entry-opacity above fold).
- [ ] **S6** Home LocationsSection (open-now chips, hydration-safe).
- [ ] **S7** Home PackagesSection (break-even line, tier clarity).
- [ ] **S8** Home Proof + TrustStats + FAQ.
- [ ] **S9** LocationPage hero + #wash-plans cards (verify all 5 slugs incl.
      cherry-hill coming-soon variant).
- [ ] **S10** LocationPage CTA band + visit section + gallery.
- [ ] **S11** ContactPage form UX (verify stubbed success → thank-you).
- [ ] **S12** CustomerSurveyPage form UX.
- [ ] **S13** EmploymentPage form UX.
- [ ] **S14** ThankYouPage + NotFound.
- [ ] **S15** AboutPage + PrivacyPage.
- [ ] **S16** Full test matrix (§7) end-to-end: build + preview, prerender audit of
      every route, responsive/keyboard/contrast/reduced-motion passes, content
      parity vs `locations.ts`. Fix fallout. Final Handoff update.

---

## 7. Testing plan

### Automated (must be green at every commit, run per step)
- `npm run typecheck` — clean.
- `npm run lint` — clean.
- `npm run test` — vitest green (including new POC-stub tests from S1).
- `npm run build` — succeeds and prerenders every route (check `dist/` has
  `index.html` for `/`, all 5 `location/*`, about, contact, customer-survey,
  employment, privacy, thank-you).

### Manual / preview (S16, plus spot-checks per step)
| Check | How |
|---|---|
| Prerendered HTML not empty | `grep -L` real content in each `dist/**/index.html`; view-source spot check |
| LCP visible pre-hydration | `npm run preview`, throttle/disable JS, hero text+CTA visible |
| Forms send nothing | DevTools network filter `formspree\|supabase` while submitting each of the 3 forms → 0 requests; success UX still shown |
| Analytics silent | Same filter during nav/scroll/heartbeat (30s) → 0 requests to `ingest-web-event` |
| Responsive 375px + desktop | No horizontal scroll; menus/cards usable at 375px |
| Keyboard nav | Tab through header→page→footer; visible focus rings; skip-link jumps to `#main-content` |
| Contrast AA | Every text/bg pair; especially brown-on-yellow (pass), never white-on-yellow |
| Reduced motion | OS setting or emulation: no looping bubbles/bounce/count-up |
| Console clean | Zero errors/warnings on `/` and `/location/vineland` |
| Content parity | Diff rendered packages/prices/hours/perks against `src/lib/locations.ts`; all 5 locations present; no phone number anywhere; no invented reviews/claims |

---

## 8. Resume / Handoff (keep this accurate at ALL times)

- **Branch:** `poc/refresh-v2` (off `main` @ `3565e4c`)
- **Last commit:** (this plan commit — see `git log -1`)
- **Step in progress:** S1 (POC guardrails) — next up.
- **Exact next action:** Create `src/lib/pocMode.ts` with `export const POC_MODE =
  true;` + loud never-merge comment. In `src/lib/formSubmission.ts`, early-return in
  `submitWebsiteForm` when `POC_MODE`: `await` a ~600ms delay, return
  `{ deliveredBy: "poc-stub" as const }` (keep the return type compatible — widen the
  union). In `src/lib/analytics.ts`, at top of `track()`: if `POC_MODE`,
  `console.debug("[poc] track", event_name)` and return. Update
  `src/test/formSubmission.test.ts` + `src/test/analytics.test.ts` (mock/spy fetch +
  sendBeacon, assert not called; assert success result). Run typecheck/lint/test,
  manual network check, commit `POC guardrails: stub forms + analytics`.
- **Environment notes:**
  - Working dir: `/Users/raj/dev/Washking.net domain/live-site` (not a repo root
    typo — the dir name contains a space and ".net").
  - A pre-existing uncommitted favicon tweak to `index.html` (found on `dev`) is
    stashed as `pre-POC: uncommitted favicon tweak found on dev (index.html)` —
    leave it for the owner; do not pop it onto this branch.
  - Dev server: `npm run dev` → http://localhost:8080.
- **Decisions still needing the owner:**
  - Real 5-star reviews: none supplied → ProofSection ships with imagery only.
  - Response-time promise on form heroes: only if it already exists on the live
    site; otherwise omitted (verify during S11).
  - Vercel preview URL for the branch: created automatically when the branch is
    pushed to origin (`git push -u origin poc/refresh-v2`). Pushing is allowed;
    merging/promoting is not.
