import { describe, expect, it } from "vitest";
import {
  GENERAL_LOCATION_VALUE,
  contactSchema,
  getContactFormPrefill,
  isMembershipContactTopic,
} from "@/lib/contactForm";

const validContact = {
  name: "Taylor Customer",
  phone: "856-555-0123",
  email: "taylor@example.com",
  topic: "general_question",
  location: GENERAL_LOCATION_VALUE,
  plateNumber: "",
  message: "I have a question.",
};

describe("contact form", () => {
  it("accepts a required phone and a general location", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("requires the phone used for customer and membership lookup", () => {
    expect(contactSchema.safeParse({ ...validContact, phone: "" }).success).toBe(false);
  });

  it("requires a known topic and location", () => {
    expect(contactSchema.safeParse({ ...validContact, topic: "unknown" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, location: "unknown" }).success).toBe(false);
  });

  it("prefills only known query values", () => {
    expect(getContactFormPrefill("cherry-hill", "opening-updates")).toEqual({
      location: "Wash King Cherry Hill",
      topic: "opening_updates",
    });
    expect(getContactFormPrefill("not-a-location", "not-a-topic")).toEqual({
      location: "",
      topic: "",
    });
  });

  it("shows plate help only for membership-related topics", () => {
    expect(isMembershipContactTopic("cancel_membership")).toBe(true);
    expect(isMembershipContactTopic("billing_issue")).toBe(true);
    expect(isMembershipContactTopic("general_question")).toBe(false);
  });
});
