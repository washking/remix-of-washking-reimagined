import type { LucideIcon } from "lucide-react";
import KingdomPageHero from "@/components/KingdomPageHero";

type FormPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const FormPageHero = (props: FormPageHeroProps) => <KingdomPageHero {...props} />;

export default FormPageHero;
