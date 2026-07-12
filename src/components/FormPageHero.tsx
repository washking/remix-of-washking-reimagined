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
  <section className="border-b-4 border-washking-yellow bg-washking-sky py-10 sm:py-12">
    <div className="container mx-auto px-4">
      <div className="mx-auto flex max-w-6xl items-start gap-4 sm:items-center sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-washking-yellow text-washking-brown sm:h-14 sm:w-14">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="mb-1 font-body text-sm font-extrabold uppercase text-washking-yellow">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FormPageHero;
