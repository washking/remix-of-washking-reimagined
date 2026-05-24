## Plan: Temporary "Cloud Migration in Progress" Suspension Page

Add a friendly maintenance/suspension screen as the home route while keeping the existing site fully intact so it can be restored with a single flag flip.

### Approach

1. **Create `src/pages/MaintenancePage.tsx`**
   - Full-screen branded page using existing WashKing design system (sky-blue gradient, foam bubbles, lion mascot, yellow accents, rounded display fonts).
   - Headline: "We'll be right back!"
   - Subtext: "WashKing is upgrading to a new cloud platform. Our website is temporarily suspended while migration is in progress. Thank you for your patience."
   - Secondary info: link to email `contact@washking.net` and external portal button `https://customerportal.nxtwash.com/washkingcarwash` so members can still access wash services.
   - Reuse `FoamBubbles` and `lion-mascot` asset for on-brand feel.
   - Animated mascot + sparkles via framer-motion (consistent with ThankYouPage).

2. **Add a single toggle in `src/App.tsx`**
   ```ts
   const MAINTENANCE_MODE = true; // set to false to restore the live site
   ```
   - When `true`: every route renders `<MaintenancePage />` (catch-all `*`), so `/`, `/contact`, `/about`, etc. all show the suspension screen.
   - When `false`: the existing `<Routes>` block is used exactly as today — no other files touched, fully reversible.

3. **Reversibility**
   - No existing pages, components, or content are modified or removed.
   - All current routes (`/`, `/location/:slug`, `/about`, `/employment`, `/contact`, `/customer-survey`, `/thank-you`) remain in code.
   - Restoring the site = change `MAINTENANCE_MODE` to `false` (one-line edit).

### Files

- **Create:** `src/pages/MaintenancePage.tsx`
- **Edit:** `src/App.tsx` (add flag + conditional Routes block)

### Out of scope

- No SEO/robots changes (page is still indexable; can add later if migration runs long).
- No backend or CRM changes — forms remain wired but inaccessible while the flag is on.
