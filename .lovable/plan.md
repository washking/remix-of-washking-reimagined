

# Update Wash Package Pricing

**File to modify:** `src/pages/LocationPage.tsx`

All pricing changes are concentrated in the `locationData` object (lines 38–232).

---

## Pricing Updates

### Single Wash Prices (all locations except Somerset — no Royalty there)
| Package | Price |
|---------|-------|
| Royalty | $29 + tax |
| Diamond | $16 + tax |
| Platinum | $14 + tax |
| Bronze | $10 + tax |

### Monthly Memberships by Location

**Vineland Main Rd:**
- Royalty: $59.99 — Diamond: $34.99 — Platinum: $31.99 — Bronze: $19.99

**Somerset (no Royalty):**
- Diamond: $34.99 — Platinum: $31.99 — Bronze: $19.99

**Vineland Dante & Landisville:**
- Diamond: $39.99 — Platinum: $34.99 — Bronze: $24.99

---

## Changes per location in `locationData`

1. **vineland** (line 50–91): Update Royalty single from `$30` → `$29`. Update Platinum monthly from `$29.99` → `$31.99`. Update Bronze monthly from `$24.99` → `$19.99`.

2. **vineland-dante** (line 103–134): Update Diamond monthly from `$34.99` → `$39.99`. Update Platinum monthly from `$29.99` → `$34.99`. Update Bronze monthly from `$24.99` → `$24.99` (already correct).

3. **somerset** (line 146–177): Update Diamond single from `$20` → `$16`. Update Platinum single from `$17` → `$14`. Keep Bronze single at `$10`. Keep all monthly prices as-is (already correct).

4. **landisville** (line 189–220): Update Diamond monthly from `$34.99` → `$39.99`. Update Platinum monthly from `$29.99` → `$34.99`. Keep Bronze monthly at `$24.99` (already correct).

No other files need changes — pricing is only defined in `LocationPage.tsx`.

