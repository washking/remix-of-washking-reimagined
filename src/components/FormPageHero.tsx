import type { LucideIcon } from "lucide-react";

type FormPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const FormPageHero = ({
  eyebrow,
  title,
  description,
  icon: Icon,
}: FormPageHeroProps) => (
  <section className="border-b-4 border-washking-yellow bg-washking-sky py-9 sm:py-11">
    <div className="container mx-auto px-4">
      <div className="mx-auto flex max-w-6xl items-start gap-4 sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-washking-yellow text-washking-brown sm:h-12 sm:w-12">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="mb-1 font-body text-sm font-bold text-washking-yellow">
            {eyebrow}
          </p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-white/90 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FormPageHero;
