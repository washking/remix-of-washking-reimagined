import { z } from "zod";
import {
  LOCATIONS,
  getLocationBySlug,
  getLocationFormValue,
} from "./locations";

export const GENERAL_LOCATION_VALUE = "No specific location";

export const CONTACT_TOPICS = [
  { value: "general", label: "General question" },
  { value: "membership", label: "Membership help" },
  { value: "billing-cancellation", label: "Billing / cancellation" },
  { value: "wash-quality", label: "Wash visit feedback" },
  { value: "opening-updates", label: "Cherry Hill updates" },
] as const;

const contactTopicValues = new Set<string>(
  CONTACT_TOPICS.map((topic) => topic.value),
);
const contactLocationValues = new Set([
  GENERAL_LOCATION_VALUE,
  ...LOCATIONS.map(getLocationFormValue),
]);

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  topic: z.string().refine((value) => contactTopicValues.has(value), "Please select a topic"),
  location: z.string().refine((value) => contactLocationValues.has(value), "Please select a location"),
  plateNumber: z.string().trim().max(20, "Plate number must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const isMembershipContactTopic = (topic: string) =>
  topic === "membership" || topic === "billing-cancellation";

export const getContactFormPrefill = (
  locationSlug: string | null,
  topicValue: string | null,
) => {
  const location = getLocationBySlug(locationSlug || undefined);

  return {
    location: location ? getLocationFormValue(location) : "",
    topic: topicValue && contactTopicValues.has(topicValue) ? topicValue : "",
  };
};
