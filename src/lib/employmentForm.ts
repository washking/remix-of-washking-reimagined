import { z } from "zod";
import { OPEN_LOCATIONS, getLocationFormValue } from "./locations";

export const ANY_OPEN_LOCATION_VALUE = "Any open location";

const employmentLocationValues = new Set([
  ANY_OPEN_LOCATION_VALUE,
  ...OPEN_LOCATIONS.map(getLocationFormValue),
]);

export const employmentSchema = z.object({
  preferredLocation: z.string().refine(
    (value) => employmentLocationValues.has(value),
    "Select a preferred location",
  ),
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  message: z.string().trim().min(1, "Tell us about yourself").max(1000, "Message must be less than 1000 characters"),
  city: z.string().trim().min(1, "City is required").max(100, "City must be less than 100 characters"),
  state: z.string().trim().min(1, "State is required").max(50, "State must be less than 50 characters"),
  postal: z.string().trim().max(20, "Postal code must be less than 20 characters").optional(),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  appliedBefore: z.enum(["yes", "no"], { required_error: "Select yes or no" }),
  canContactEmployer: z.enum(["yes", "no"], { required_error: "Select yes or no" }),
  hasTransportation: z.enum(["yes", "no"], { required_error: "Select yes or no" }),
});

export type EmploymentFormData = z.infer<typeof employmentSchema>;
