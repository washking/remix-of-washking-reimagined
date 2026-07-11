import { describe, expect, it } from "vitest";
import {
  ANY_OPEN_LOCATION_VALUE,
  employmentSchema,
} from "@/lib/employmentForm";

const validApplication = {
  preferredLocation: ANY_OPEN_LOCATION_VALUE,
  firstName: "Taylor",
  lastName: "Applicant",
  message: "I enjoy helping customers and working with a team.",
  city: "Vineland",
  state: "NJ",
  postal: "08360",
  email: "taylor@example.com",
  phone: "",
  appliedBefore: "no",
  canContactEmployer: "yes",
  hasTransportation: "yes",
};

describe("employment form", () => {
  it("accepts any open location as a work preference", () => {
    expect(employmentSchema.safeParse(validApplication).success).toBe(true);
  });

  it("requires a known location and every yes-or-no response", () => {
    expect(
      employmentSchema.safeParse({ ...validApplication, preferredLocation: "Cherry Hill" }).success,
    ).toBe(false);
    expect(
      employmentSchema.safeParse({ ...validApplication, hasTransportation: undefined }).success,
    ).toBe(false);
  });
});
