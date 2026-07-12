import { Link, useParams } from "react-router-dom";
import {
  Check,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { autoWashSchema, breadcrumbSchema } from "@/lib/structuredData";
import { MEMBERSHIP_PORTAL } from "@/lib/site";
import {
  getDirectionsUrl,
  getBreakEvenVisits,
  getHoursSummary,
  getIncludedFeatures,
  getLocationBySlug,
  getPackagesByMonthlyPrice,
  getStartingMonthlyPrice,
  UNLIMITED_MEMBER_BENEFITS,
  type WashKingLocation,
} from "@/lib/locations";

const PLAN_ACCENT_CLASSES: Record<string, string> = {
  BRONZE: "border-t-washking-green",
  PLATINUM: "border-t-washking-sky",
  DIAMOND: "border-t-washking-yellow",
  ROYALTY: "border-t-washking-brown",
};

const sentenceCase = (value: string) => {
  const normalized = value.replace(/^\*/, "").trim().toLowerCase();
  return normalized ? `${normalized[0].toUpperCase()}${normalized.slice(1)}` : "";
};

const ComingSoonLocation = ({ location }: { location: WashKingLocation }) => (
  <div className="min-h-screen bg-gray-50">
    <Seo
      title={`${location.name} Car Wash - Coming Soon | Wash King`}
      description={`Wash King Car Wash is coming soon to ${location.city}. Follow the new location and contact our team for updates.`}
      path={`/location/${location.slug}`}
    />
    <Header />

    <main id="main-content" tabIndex={-1}>
      <section className="border-b-4 border-washking-yellow bg-washking-sky py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <p className="mb-2 font-body text-sm font-bold text-washking-yellow">
                {location.state}
              </p>
              <h1 className="mb-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                {location.name}
              </h1>
              <p className="mx-auto max-w-xl font-body text-xl font-bold text-white sm:text-2xl lg:mx-0">
                A new Wash King is on the way to {location.city}.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg lg:ml-auto lg:p-8">
              <Badge className="mb-6 rounded-lg bg-washking-yellow px-4 py-2 font-body text-sm font-bold text-washking-brown">
                Coming soon
              </Badge>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
                    <MapPin className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold text-washking-brown/70">Location</p>
                    <p className="font-body font-bold text-washking-brown">{location.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
                    <Mail className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-bold text-washking-brown/70">Opening updates</p>
                    <a
                      href={`mailto:${location.email}?subject=${encodeURIComponent(`${location.name} opening updates`)}`}
                      className="break-all font-body font-bold text-washking-brown hover:underline"
                    >
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                <Link
                  to={`/contact?location=${location.slug}&topic=opening-updates`}
                  className="btn-primary px-4 text-center text-base"
                >
                  Ask about opening updates
                </Link>
                <Link
                  to="/#locations"
                  className="btn-outline px-4 text-center text-base"
                >
                  View open locations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

const HoursDetails = ({ location }: { location: WashKingLocation }) => {
  if (location.hours.is24Hours) {
    return (
      <>
        <p className="mb-2 font-body text-sm font-bold text-white/75">Daily hours</p>
        <p className="font-display text-3xl">Open 24 hours</p>
      </>
    );
  }

  if (location.hours.allDays) {
    return (
      <>
        <p className="mb-2 font-body text-sm font-bold text-white/75">Monday - Sunday</p>
        <p className="font-display text-2xl">{location.hours.allDays}</p>
      </>
    );
  }

  return (
    <>
      <p className="mb-1 font-body text-sm font-bold text-white/75">Monday - Saturday</p>
      <p className="mb-4 font-display text-2xl">{location.hours.weekdays}</p>
      <p className="mb-1 font-body text-sm font-bold text-white/75">Sunday</p>
      <p className="font-display text-2xl">{location.hours.sunday}</p>
    </>
  );
};

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Seo
          title="Location Not Found | Wash King Car Wash"
          description="This Wash King Car Wash location could not be found. Explore our New Jersey locations."
          path="/location"
          noIndex
        />
        <Header />
        <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-24 text-center">
          <h1 className="mb-4 font-display text-4xl text-washking-brown">Location Not Found</h1>
          <Link to="/#locations" className="btn-secondary inline-flex">
            View Locations
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (location.status === "coming-soon") {
    return <ComingSoonLocation location={location} />;
  }

  const hoursSummary = getHoursSummary(location);
  const directionsUrl = getDirectionsUrl(location);
  const startingPrice = getStartingMonthlyPrice(location);
  const memberBenefits = [...UNLIMITED_MEMBER_BENEFITS, ...location.memberPerks];
  const orderedPackages = getPackagesByMonthlyPrice(location);
  const portalLocationName = location.portalLocationName || `Wash King ${location.name}`;

  const scrollToPlans = () => {
    document.getElementById("wash-plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Seo
        title={`${location.name} Car Wash | Wash King ${location.city.replace(/\s*\d{5}$/, "")}`}
        description={`Visit Wash King ${location.name} at ${location.address}, ${location.city}. View hours, wash packages and unlimited monthly plans.`}
        path={`/location/${location.slug}`}
        jsonLd={[
          autoWashSchema(location.slug, location),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: location.name, path: `/location/${location.slug}` },
          ]),
        ]}
      />
      <Header />

      <main id="main-content" tabIndex={-1}>
        <section className="border-b-4 border-washking-yellow bg-washking-sky py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="text-center lg:text-left">
                <p className="mb-2 font-body text-sm font-bold text-washking-yellow">
                  {location.state}
                </p>
                <h1 className="mb-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                  {location.name}
                </h1>
                {Number.isFinite(startingPrice) && (
                  <p className="font-body text-xl font-bold text-white sm:text-2xl">
                    Unlimited plans from{" "}
                    <span className="whitespace-nowrap font-display text-3xl text-washking-yellow sm:text-4xl">
                      ${startingPrice.toFixed(2)}/mo
                    </span>
                  </p>
                )}
              </div>

              <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg lg:ml-auto lg:p-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
                      <MapPin className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold text-washking-brown/70">Address</p>
                      <p className="font-body font-bold text-washking-brown">{location.address}</p>
                      <p className="font-body text-washking-brown/80">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
                      <Clock className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold text-washking-brown/70">Hours</p>
                      <p className="font-body font-bold text-washking-brown">{hoursSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-washking-sky-light">
                      <Mail className="h-5 w-5 text-washking-brown" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-xs font-bold text-washking-brown/70">Contact</p>
                      <a href={`mailto:${location.email}`} className="break-all font-body font-bold text-washking-brown hover:underline">
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      data-analytics="directions_click"
                      data-analytics-source="location_hero"
                      data-location-slug={location.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary gap-2 px-3"
                    >
                      <Navigation className="h-4 w-4" aria-hidden="true" />
                      Directions
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={scrollToPlans}
                    className="btn-outline gap-2 px-3"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    View Plans
                  </button>
                  <a
                    href={MEMBERSHIP_PORTAL}
                    data-analytics="membership_cta"
                    data-analytics-source="location_hero"
                    data-location-slug={location.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-unlimited col-span-2 text-center"
                  >
                    Join Unlimited
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wash-plans" className="scroll-mt-24 bg-gray-50 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-9 text-center lg:mb-12">
              <p className="section-eyebrow mb-2">Compare your options</p>
              <h2 className="section-title mb-3">
                Wash plans and pricing
              </h2>
              <p className="section-copy mx-auto max-w-2xl">
                Choose a single wash or save with an unlimited monthly plan at {location.name}.
              </p>
            </div>

            <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">
              <p className="font-body text-sm text-washking-brown sm:text-base">
                Online checkout opens our secure NXTWash membership portal. Choose{" "}
                <strong>{portalLocationName}</strong> when prompted.
              </p>
              <a
                href={MEMBERSHIP_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="membership_cta"
                data-analytics-source="location_plan_intro"
                data-location-slug={location.slug}
                className="inline-flex shrink-0 items-center gap-2 font-body text-sm font-bold text-washking-brown underline underline-offset-4"
              >
                Manage an existing plan
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className={`mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-7 ${orderedPackages.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} lg:gap-6`}>
              {orderedPackages.map((washPackage, index) => {
                const breakEvenVisits = getBreakEvenVisits(washPackage);
                const includedFeatures = getIncludedFeatures(location, washPackage.name);
                const visibleFeatures = washPackage.features.slice(0, 4);
                const additionalFeatureCount = washPackage.features.length - visibleFeatures.length;

                return (
                  <article
                    key={washPackage.name}
                    className={`flex flex-col overflow-hidden rounded-lg border-2 border-t-[8px] border-gray-300 bg-white shadow-md md:border md:border-x-gray-200 md:border-b-gray-200 md:border-t-[6px] md:shadow-sm ${PLAN_ACCENT_CLASSES[washPackage.name] || "border-t-gray-300"}`}
                  >
                    <div className="p-6 pb-5 text-center">
                      {index === 0 && (
                        <p className="mb-2 font-body text-xs font-bold text-washking-sky">
                          Lowest monthly price
                        </p>
                      )}
                      <h3 className="font-display text-2xl text-washking-brown">
                        {sentenceCase(washPackage.name)}
                      </h3>
                      <p className="mt-2 font-body text-sm text-gray-600">
                        Single wash{" "}
                        <span className="font-bold text-washking-brown">{washPackage.singlePrice}</span>
                      </p>
                    </div>

                    <div className="border-y border-washking-sky/15 bg-washking-sky-light px-4 py-4 text-center">
                      <p className="font-body text-xs font-bold text-washking-sky">Unlimited membership</p>
                      <p className="mt-1 font-display text-3xl text-washking-brown">
                        {washPackage.monthlyPrice}
                        <span className="font-body text-xs font-bold">/month + tax</span>
                      </p>
                      {breakEvenVisits && (
                        <p className="mt-2 font-body text-xs font-bold text-washking-brown/75">
                          Covers its cost by visit {breakEvenVisits}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                      {washPackage.includes && (
                        <p className="mb-3 text-center font-body text-sm font-bold text-washking-brown">
                          Includes the previous plan, plus:
                        </p>
                      )}
                      <ul className="mb-5 flex-1 space-y-2">
                        {visibleFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-washking-brown">
                            <Check className="h-5 w-5 shrink-0 text-washking-green" aria-hidden="true" />
                            <span className="font-body text-sm font-semibold">{sentenceCase(feature)}</span>
                          </li>
                        ))}
                        {additionalFeatureCount > 0 && (
                          <li className="font-body text-sm font-bold text-washking-sky">
                            + {additionalFeatureCount} more upgrades
                          </li>
                        )}
                      </ul>
                      {washPackage.note && (
                        <p className="mb-4 font-body text-xs font-bold text-gray-500">
                          {sentenceCase(washPackage.note)}
                        </p>
                      )}

                      {includedFeatures.length > visibleFeatures.length && (
                        <details className="mb-5 border-t border-gray-200 pt-3 text-washking-brown">
                          <summary className="cursor-pointer font-body text-sm font-bold">
                            See all {includedFeatures.length} included features
                          </summary>
                          <ul className="mt-3 space-y-2">
                            {includedFeatures.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="h-4 w-4 shrink-0 text-washking-green" aria-hidden="true" />
                                <span className="font-body text-xs font-semibold">{sentenceCase(feature)}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}

                      <a
                        href={MEMBERSHIP_PORTAL}
                        data-analytics="plan_select"
                        data-analytics-source="location_plan_card"
                        data-location-slug={location.slug}
                        data-plan-name={washPackage.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary gap-2 px-4 text-center text-sm"
                        aria-label={`Join the ${sentenceCase(washPackage.name)} unlimited wash plan`}
                      >
                        Join {sentenceCase(washPackage.name)} Unlimited
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <p className="mt-2 text-center font-body text-xs text-gray-500">
                        Choose {portalLocationName} and {sentenceCase(washPackage.name)} in the portal
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-washking-yellow py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-2 font-body text-sm font-bold text-washking-brown/70">Membership benefits</p>
                <h2 className="font-display text-3xl text-washking-brown lg:text-4xl">
                  More value in every month
                </h2>
                <p className="mt-3 font-body text-base leading-relaxed text-washking-brown/80">
                  Built for drivers who like keeping a clean car without buying each wash separately.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {memberBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-washking-brown">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-washking-brown">
                      <Check className="w-4 h-4 text-white" aria-hidden="true" />
                    </span>
                    <span className="font-body font-semibold">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <p className="section-eyebrow mb-2">Plan your visit</p>
                <h2 className="mb-6 font-display text-3xl text-washking-brown lg:text-4xl">
                  Hours and directions
                </h2>
                <div className="rounded-lg bg-washking-green p-7 text-white">
                  <HoursDetails location={location} />
                </div>
                <p className="mt-5 font-body text-washking-brown">
                  {location.address}, {location.city}
                </p>
                {directionsUrl && (
                  <a
                    href={directionsUrl}
                    data-analytics="directions_click"
                    data-analytics-source="location_visit_section"
                    data-location-slug={location.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-5 gap-2 text-base"
                  >
                    <Navigation className="w-5 h-5" aria-hidden="true" />
                    Get Directions
                  </a>
                )}
              </div>

              {location.mapEmbed && (
                <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    tabIndex={-1}
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for Wash King ${location.name}`}
                    className="pointer-events-none w-full h-[320px] lg:h-[420px]"
                  />
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics="directions_click"
                      data-analytics-source="location_map"
                      data-location-slug={location.slug}
                      className="absolute left-3 top-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2 font-body text-sm font-bold text-washking-brown shadow-lg"
                    >
                      Open in Maps
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-washking-brown/20 bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="directions_click"
              data-analytics-source="mobile_location_bar"
              data-location-slug={location.slug}
              className="flex min-h-12 items-center justify-center gap-1 rounded-lg bg-washking-brown px-2 font-body text-xs font-bold text-white"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Directions
            </a>
          )}
          <button
            type="button"
            onClick={scrollToPlans}
            className="flex min-h-12 items-center justify-center gap-1 rounded-lg border border-washking-brown bg-white px-2 font-body text-xs font-bold text-washking-brown"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Plans
          </button>
          <a
            href={MEMBERSHIP_PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="membership_cta"
            data-analytics-source="mobile_location_bar"
            data-location-slug={location.slug}
            className="flex min-h-12 items-center justify-center gap-1 rounded-lg bg-washking-yellow px-2 font-body text-xs font-bold text-washking-brown"
          >
            Join
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationPage;
