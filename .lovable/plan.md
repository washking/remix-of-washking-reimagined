

# WashKing Website Comprehensive Update Plan

This is a large update touching nearly every page and component. Here is the full breakdown organized by task area.

---

## 1. Replace All Emails with contact@washking.net & Remove Phone Numbers

**Files affected:** `Footer.tsx`, `LocationPage.tsx`, `ContactPage.tsx`

- **Footer.tsx** (lines 81-85): Change `washkingvineland@gmail.com` / `WASHKINGVINELAND@GMAIL.COM` to `contact@washking.net`
- **LocationPage.tsx** (line 39): Change `washkingvineland@gmail.com` to `contact@washking.net`
- **LocationPage.tsx** (line 92): Change `washkingsomerset@gmail.com` to `contact@washking.net`
- **ContactPage.tsx** (lines 311-313): Remove the phone number line (`Call or Text Us: (856) 880-7679`), keep only the email line

---

## 2. Update Contact Form — Add Required Phone, Optional Plate Number, Required Location Dropdown

**File:** `ContactPage.tsx`

- Update `contactSchema`: make `phone` required, add `plateNumber` (optional string), add `location` (required enum)
- Location dropdown options: WashKing Vineland Main Rd, WashKing Somerset, WashKing Vineland Dante, WashKing Landisville, WashKing Cherry Hill
- Add a `<select>` styled dropdown for location (required)
- Add plate number input field (optional)
- Reorder form fields logically: Name, Phone*, Email*, Location*, Plate Number, Message*

---

## 3. Expand Header Locations Dropdown to 5 Locations

**File:** `Header.tsx`

Update the `menuItems` Locations dropdown from 2 to 5 entries:
- Vineland Main Rd → `/location/vineland`
- Vineland Dante → `/location/vineland-dante`
- Somerset → `/location/somerset`
- Landisville → `/location/landisville`
- Cherry Hill → `/location/cherry-hill`

---

## 4. Add 3 New Location Pages (Vineland Dante, Landisville, Cherry Hill)

**Files:** `LocationPage.tsx` (add location data), `App.tsx` (routes already dynamic via `:locationSlug`)

Add new entries to `locationData` in `LocationPage.tsx`:

- **vineland** (update existing): Address: 2611 S Main Rd, Vineland NJ. Hours: Mon-Sat 9am-6pm, Sunday 9am-5pm. Email: contact@washking.net
- **vineland-dante**: Address: 2375 Dante Ave, Vineland NJ. Hours: Open 24/7. Email: contact@washking.net. (Will need wash packages — use same as Vineland or simplified)
- **somerset** (update existing): Address: 1463 NJ-27, Somerset NJ. Hours: Mon-Sun 8am-7pm. Email: contact@washking.net
- **landisville**: Address: 305 S Harding Hwy, Landisville NJ. Hours: Open 24/7. Email: contact@washking.net
- **cherry-hill**: "Coming Soon" page — show location name, a "Coming Soon" badge, and contact@washking.net. No wash packages.

Each location page already includes a Google Maps embed area — add appropriate Google Maps embeds per location.

Update existing Vineland hours from `9:00 AM to 5:30 PM` → `9:00 AM to 6:00 PM` (Mon-Sat) and keep Sunday `9:00 AM to 5:00 PM`.

---

## 5. Update LocationsSection on Homepage to Show All 5 Locations

**File:** `LocationsSection.tsx`

Expand the `locations` array to include all 5 locations with addresses. Adjust grid layout from `sm:grid-cols-2` to accommodate 5 cards (e.g., grid with 3+2 or a responsive layout). Cherry Hill card gets a "Coming Soon" badge instead of "See Wash Menu" button.

---

## 6. Remove mywashmembership.com References

**Search result:** No references found in the codebase (already using `customerportal.nxtwash.com/washkingcarwash`). No action needed.

---

## 7. Customer Survey Page

No survey page currently exists in the codebase. Will create a new `/customer-survey` page with:
- A form with required location dropdown (same 5 locations)
- Add route in `App.tsx`
- Basic survey fields (name, email, location dropdown, feedback/message)

---

## 8. Email Forwarding Setup

Email forwarding for `contact@washking.net` → `washking.nj@gmail.com` is an external DNS/email provider configuration that cannot be done within this codebase. This is outside the scope of a frontend project. The user will need to configure this through their email hosting provider (e.g., Google Workspace, cPanel, or domain registrar).

---

## Technical Details

- **New routes needed:** `/location/vineland-dante`, `/location/landisville`, `/location/cherry-hill`, `/customer-survey` — the first three are already handled by the dynamic `:locationSlug` route; only `/customer-survey` needs a new route in `App.tsx`
- **Select component:** Will use the existing shadcn `Select` component from `src/components/ui/select.tsx`
- **All location emails** become `contact@washking.net` (single source of truth)
- **Phone numbers** removed from all display sections (form phone field stays as user input)

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `Header.tsx` | Expand locations dropdown to 5 |
| `Footer.tsx` | Replace email with contact@washking.net |
| `ContactPage.tsx` | Update form (required phone, plate number, location dropdown), remove phone display |
| `LocationPage.tsx` | Add 3 new locations, update emails/hours for existing, add "Coming Soon" handling |
| `LocationsSection.tsx` | Expand to 5 location cards |
| `App.tsx` | Add `/customer-survey` route |
| New: `CustomerSurveyPage.tsx` | Survey form with location dropdown |

