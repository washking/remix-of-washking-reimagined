import { z } from "zod";
import {
  LOCATIONS,
  getLocationBySlug,
  getLocationFormValue,
} from "./locations";

export const GENERAL_LOCATION_VALUE = "No specific location";

export const CONTACT_TOPICS = [
  { value: "general_question", label: "General question" },
  { value: "new_membership", label: "Start a membership" },
  { value: "cancel_membership", label: "Cancel a membership" },
  { value: "billing_issue", label: "Billing issue" },
  { value: "change_membership", label: "Change membership plan" },
  { value: "add_vehicle", label: "Add a vehicle" },
  { value: "change_plate", label: "Change a license plate" },
  { value: "update_account", label: "Update account information" },
  { value: "lost_item", label: "Lost item" },
  { value: "wash_feedback", label: "Wash visit feedback" },
  { value: "opening_updates", label: "Cherry Hill updates" },
] as const;

const LEGACY_TOPIC_MAP: Record<string, string> = {
  general: "general_question",
  membership: "update_account",
  "billing-cancellation": "billing_issue",
  "wash-quality": "wash_feedback",
  "opening-updates": "opening_updates",
};

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
  [
    "new_membership",
    "cancel_membership",
    "billing_issue",
    "change_membership",
    "add_vehicle",
    "change_plate",
    "update_account",
  ].includes(topic);

export const getContactFormPrefill = (
  locationSlug: string | null,
  topicValue: string | null,
) => {
  const location = getLocationBySlug(locationSlug || undefined);

  return {
    location: location ? getLocationFormValue(location) : "",
    topic: topicValue
      ? contactTopicValues.has(topicValue)
        ? topicValue
        : LEGACY_TOPIC_MAP[topicValue] ?? ""
      : "",
  };
};
