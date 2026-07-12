import { useCallback, useEffect, useRef, useState } from "react";
import {
  BadgeDollarSign,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  MapPinned,
  Pause,
  Play,
} from "lucide-react";
import tunnelHero from "@/assets/washking-wash-tunnel-hero.jpg";
import tunnelHeroAvif from "@/assets/washking-wash-tunnel-hero.avif";
import experienceCollage from "@/assets/washking-customer-experience-collage.jpg";
import experienceCollageAvif from "@/assets/washking-customer-experience-collage.avif";
import OptimizedImage from "@/components/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import { OPEN_LOCATIONS, getStartingMonthlyPrice } from "@/lib/locations";

const HERO_ROTATION_DELAY = 7_000;

const heroSlides = [
  {
    src: tunnelHero,
    avifSrc: tunnelHeroAvif,
    alt: "A car moving through the Wash King wash tunnel, shown half dirty and half clean",
    label: "Wash tunnel",
    width: 1247,
    height: 831,
  },
  {
    src: experienceCollage,
    avifSrc: experienceCollageAvif,
    alt: "Wash King pricing, wash tunnel, payment station, facility entrance, and team member detailing a wheel",
    label: "Wash King services and locations",
    width: 1536,
    height: 1024,
  },
] as const;

const lowestMonthlyPrice = Math.min(
  ...OPEN_LOCATIONS.map(getStartingMonthlyPrice).filter(Number.isFinite),
);

const quickFacts = [
  {
    icon: MapPinned,
    label: `${OPEN_LOCATIONS.length} locations open`,
  },
  {
    icon: BadgeDollarSign,
    label: `Unlimited from $${lowestMonthlyPrice.toFixed(2)}/month`,
  },
  {
    icon: CalendarCheck2,
    label: "No long-term contract",
  },
] as const;

const HeroSection = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const autoplayTimeoutRef = useRef<number | null>(null);

  const clearAutoplayTimeout = useCallback(() => {
    if (autoplayTimeoutRef.current !== null) {
      window.clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      if (mediaQuery.matches) clearAutoplayTimeout();
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, [clearAutoplayTimeout]);

  useEffect(() => {
    const updateVisibility = () => {
      const isVisible = document.visibilityState === "visible";
      if (!isVisible) clearAutoplayTimeout();
      setPageVisible(isVisible);
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, [clearAutoplayTimeout]);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelectedSlide = () => setSelectedSlide(carouselApi.selectedScrollSnap());

    updateSelectedSlide();
    carouselApi.on("select", updateSelectedSlide);
    carouselApi.on("reInit", updateSelectedSlide);

    return () => {
      carouselApi.off("select", updateSelectedSlide);
      carouselApi.off("reInit", updateSelectedSlide);
    };
  }, [carouselApi]);

  useEffect(() => {
    clearAutoplayTimeout();

    if (
      !carouselApi ||
      userPaused ||
      interactionPaused ||
      prefersReducedMotion ||
      !pageVisible
    ) {
      return;
    }

    autoplayTimeoutRef.current = window.setTimeout(() => {
      autoplayTimeoutRef.current = null;
      carouselApi.scrollNext();
    }, HERO_ROTATION_DELAY);

    return clearAutoplayTimeout;
  }, [carouselApi, clearAutoplayTimeout, interactionPaused, pageVisible, prefersReducedMotion, selectedSlide, userPaused]);

  const selectSlide = useCallback((index: number) => {
    clearAutoplayTimeout();
    setUserPaused(true);
    carouselApi?.scrollTo(index, true);
  }, [carouselApi, clearAutoplayTimeout]);

  const showPreviousSlide = () => {
    clearAutoplayTimeout();
    setUserPaused(true);
    const previousIndex = (selectedSlide - 1 + heroSlides.length) % heroSlides.length;
    carouselApi?.scrollTo(previousIndex, true);
  };

  const showNextSlide = () => {
    clearAutoplayTimeout();
    setUserPaused(true);
    const nextIndex = (selectedSlide + 1) % heroSlides.length;
    carouselApi?.scrollTo(nextIndex, true);
  };

  const scrollToLocations = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="overflow-hidden border-b-4 border-washking-yellow bg-white">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true, align: "start" }}
        className="hero-media-enter relative h-[280px] overflow-hidden bg-black sm:h-[380px] lg:h-[440px]"
        aria-label="Wash King highlights"
        onMouseEnter={() => {
          clearAutoplayTimeout();
          setInteractionPaused(true);
        }}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={() => {
          clearAutoplayTimeout();
          setInteractionPaused(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setInteractionPaused(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            clearAutoplayTimeout();
            setUserPaused(true);
          }
        }}
      >
        <CarouselContent
          className="ml-0 h-full"
          onPointerDown={() => {
            clearAutoplayTimeout();
            setUserPaused(true);
          }}
        >
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={slide.label}
              className="relative h-[280px] pl-0 sm:h-[380px] lg:h-[440px]"
              aria-label={`${index + 1} of ${heroSlides.length}: ${slide.label}`}
            >
              <OptimizedImage
                avifSrc={slide.avifSrc}
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <p className="sr-only" aria-live={userPaused ? "polite" : "off"}>
          Showing image {selectedSlide + 1} of {heroSlides.length}: {heroSlides[selectedSlide].label}
        </p>
      </Carousel>

      <div className="bg-washking-sky">
        <div id="hero-controls" className="flex h-10 items-center justify-center gap-1 border-t border-white/15" role="group" aria-label="Hero image controls">
          <button
            type="button"
            onClick={showPreviousSlide}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Show previous hero image"
            title="Previous image"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex items-center" role="group" aria-label="Choose hero image">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => selectSlide(index)}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                aria-label={`Show ${slide.label.toLowerCase()} image`}
                aria-current={selectedSlide === index ? "true" : undefined}
                title={slide.label}
              >
                <span
                  className={`h-2 w-2 rounded-full border border-white transition-colors ${
                    selectedSlide === index ? "bg-washking-yellow" : "bg-white/30"
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (userPaused) {
                setUserPaused(false);
                setInteractionPaused(false);
              } else {
                clearAutoplayTimeout();
                setUserPaused(true);
              }
            }}
            disabled={prefersReducedMotion}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={
              prefersReducedMotion
                ? "Automatic hero images are off because reduced motion is enabled"
                : userPaused
                  ? "Resume automatic hero images"
                  : "Pause automatic hero images"
            }
            title={prefersReducedMotion ? "Automatic rotation is off" : userPaused ? "Resume rotation" : "Pause rotation"}
          >
            {userPaused || prefersReducedMotion ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={showNextSlide}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Show next hero image"
            title="Next image"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="font-body text-xs font-extrabold text-washking-yellow sm:text-sm">
              Family-owned across New Jersey
            </p>

            <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
              Wash King Car Wash
            </h1>

            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
              Find the right wash, see today's hours, and compare single-wash and unlimited plans before you arrive.
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Wash King highlights">
              {quickFacts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-2 font-body text-sm font-bold text-white">
                  <fact.icon className="h-4 w-4 text-washking-yellow" aria-hidden="true" />
                  {fact.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#locations"
                onClick={scrollToLocations}
                className="btn-secondary min-h-12 px-6 text-center sm:px-8 sm:text-base"
              >
                Find a location
              </a>
              <a
                href={MEMBERSHIP_PORTAL}
                data-analytics="membership_cta"
                data-analytics-source="homepage_hero"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cloud min-h-12 border border-white bg-white px-6 text-center text-washking-brown hover:bg-washking-cream sm:px-8 sm:text-base"
              >
                Join Unlimited
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
