import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
import FoamBubbles from "@/components/FoamBubbles";
import { Badge } from "@/components/ui/badge";
import { autoWashSchema } from "@/lib/structuredData";
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

const BubbleCluster = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
    <motion.div
      animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm absolute -top-4 -left-4" />
      <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm absolute top-6 left-8" />
      <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm absolute -top-2 left-12" />
      <div className="w-6 h-6 rounded-full bg-white/35 backdrop-blur-sm absolute top-10 -left-2" />
    </motion.div>
  </div>
);

const WaveTransition = () => (
  <div className="bg-washking-yellow h-8 lg:h-12 relative" aria-hidden="true">
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 200" className="w-full h-auto" preserveAspectRatio="none">
        <path
          fill="hsl(200 85% 60%)"
          d="M0,200 L0,100 Q360,180 720,100 T1440,120 L1440,200 Z"
        />
      </svg>
    </div>
  </div>
);

const CloudTransition = () => (
  <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
    <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
      <ellipse cx="200" cy="100" rx="250" ry="80" fill="hsl(200 80% 85%)" />
      <ellipse cx="500" cy="110" rx="300" ry="70" fill="hsl(200 80% 90%)" />
      <ellipse cx="900" cy="95" rx="350" ry="90" fill="hsl(200 80% 85%)" />
      <ellipse cx="1300" cy="105" rx="280" ry="75" fill="hsl(200 80% 90%)" />
    </svg>
  </div>
);

const ComingSoonLocation = ({ location }: { location: WashKingLocation }) => (
  <div className="min-h-screen overflow-x-hidden">
    <Seo
      title={`${location.name} Car Wash - Coming Soon | WashKing`}
      description={`WashKing Car Wash is coming soon to ${location.city}. Follow the new location and contact our team for updates.`}
      path={`/location/${location.slug}`}
    />
    <Header />

    <main>
      <section className="relative">
        <WaveTransition />
        <div className="bg-gradient-to-b from-[hsl(200_85%_60%)] to-washking-sky relative pt-5 lg:pt-10 pb-28 lg:pb-40">
          <FoamBubbles variant="section" density="low" />
          <BubbleCluster className="top-16 left-[6%]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <p className="font-display text-washking-brown text-sm sm:text-base tracking-widest mb-2">
                  {location.state.toUpperCase()}
                </p>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white text-shadow mb-4">
                  {location.name}
                </h1>
                <p className="font-body font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-white max-w-xl mx-auto lg:mx-0">
                  A new WashKing is on the way to {location.city}.
                </p>
              </motion.div>

              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 w-full max-w-md mx-auto lg:ml-auto">
                <Badge className="bg-washking-yellow text-washking-brown font-display text-lg px-5 py-2 rounded-full mb-6">
                  Coming Soon
                </Badge>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-washking-cream flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-washking-brown" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-display text-washking-brown/70 text-xs tracking-widest">LOCATION</p>
                      <p className="font-body text-washking-brown font-bold">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-washking-cream flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-washking-brown" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-washking-brown/70 text-xs tracking-widest">UPDATES</p>
                      <a
                        href={`mailto:${location.email}?subject=${encodeURIComponent(`${location.name} opening updates`)}`}
                        className="font-body text-washking-brown font-bold hover:underline break-all"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  <Link
                    to="/contact"
                    className="btn-cloud text-center bg-washking-brown text-white border-2 border-washking-brown px-4 py-3 font-display text-base"
                  >
                    Contact WashKing
                  </Link>
                  <Link
                    to="/#locations"
                    className="btn-cloud text-center bg-washking-cream text-washking-brown border-2 border-washking-brown px-4 py-3 font-display text-base"
                  >
                    View Open Locations
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <CloudTransition />
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
        <p className="font-display text-2xl mb-2">We never close</p>
        <p className="font-display text-3xl">Open 24/7</p>
      </>
    );
  }

  if (location.hours.allDays) {
    return (
      <>
        <p className="font-display text-xl mb-2">Monday - Sunday</p>
        <p className="font-display text-2xl">{location.hours.allDays}</p>
      </>
    );
  }

  return (
    <>
      <p className="font-display text-lg mb-1">Monday - Saturday</p>
      <p className="font-display text-2xl mb-4">{location.hours.weekdays}</p>
      <p className="font-display text-lg mb-1">Sunday</p>
      <p className="font-display text-2xl">{location.hours.sunday}</p>
    </>
  );
};

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return (
      <div className="min-h-screen bg-washking-sky">
        <Seo
          title="Location Not Found | WashKing Car Wash"
          description="This WashKing Car Wash location could not be found. Explore our New Jersey locations."
          path="/location"
          noIndex
        />
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-4xl text-white text-shadow mb-4">Location Not Found</h1>
          <Link to="/#locations" className="btn-hero-primary inline-block">
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
  const portalLocationName = location.portalLocationName || `WashKing ${location.name}`;

  const scrollToPlans = () => {
    document.getElementById("wash-plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden pb-24 md:pb-0">
      <Seo
        title={`${location.name} Car Wash | WashKing ${location.city.replace(/\s*\d{5}$/, "")}`}
        description={`Visit WashKing ${location.name} at ${location.address}, ${location.city}. View hours, wash packages and unlimited monthly plans.`}
        path={`/location/${location.slug}`}
        jsonLd={autoWashSchema(location.slug, location)}
      />
      <Header />

      <main>
        <section className="relative">
          <WaveTransition />
          <div className="bg-gradient-to-b from-[hsl(200_85%_60%)] to-washking-sky relative pt-5 lg:pt-10 pb-28 lg:pb-40">
            <FoamBubbles variant="section" density="low" />
            <BubbleCluster className="top-14 right-[8%]" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left"
                >
                  <p className="font-display text-washking-brown text-sm sm:text-base tracking-widest mb-2">
                    {location.state.toUpperCase()}
                  </p>
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white text-shadow mb-4">
                    {location.name}
                  </h1>
                  {Number.isFinite(startingPrice) && (
                    <p className="font-body font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-white">
                      Unlimited plans from{" "}
                      <span className="font-display text-washking-yellow whitespace-nowrap text-3xl sm:text-4xl lg:text-5xl">
                        ${startingPrice.toFixed(2)}/mo
                      </span>
                    </p>
                  )}
                </motion.div>

                <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 w-full max-w-md mx-auto lg:ml-auto">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-washking-cream flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-washking-brown" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display text-washking-brown/70 text-xs tracking-widest">ADDRESS</p>
                        <p className="font-body text-washking-brown font-bold">{location.address}</p>
                        <p className="font-body text-washking-brown/80">{location.city}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-washking-cream flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-washking-brown" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display text-washking-brown/70 text-xs tracking-widest">HOURS</p>
                        <p className="font-body text-washking-brown font-bold">{hoursSummary}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-washking-cream flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-washking-brown" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-washking-brown/70 text-xs tracking-widest">CONTACT</p>
                        <a href={`mailto:${location.email}`} className="font-body text-washking-brown font-bold hover:underline break-all">
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
                        className="btn-cloud bg-washking-brown text-white border-2 border-washking-brown px-3 py-3 font-display text-sm flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        Directions
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={scrollToPlans}
                      className="btn-cloud bg-washking-cream text-washking-brown border-2 border-washking-brown px-3 py-3 font-display text-sm flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
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
                      Go Unlimited
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <CloudTransition />
          </div>
        </section>

        <section id="wash-plans" className="bg-gradient-to-b from-[hsl(200_80%_92%)] to-white py-12 lg:py-16 scroll-mt-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-9 lg:mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-washking-brown mb-3">
                Wash Packages
              </h2>
              <p className="font-body text-base sm:text-lg text-washking-brown max-w-2xl mx-auto">
                Choose a single wash or save with an unlimited monthly plan at {location.name}.
              </p>
            </div>

            <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-washking-brown/15 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">
              <p className="font-body text-sm text-washking-brown sm:text-base">
                Membership checkout opens our NXTWash plan portal. Confirm{" "}
                <strong>{portalLocationName}</strong> when prompted.
              </p>
              <a
                href={MEMBERSHIP_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="membership_cta"
                data-analytics-source="location_plan_intro"
                data-location-slug={location.slug}
                className="inline-flex shrink-0 items-center gap-2 font-body text-sm font-extrabold text-washking-brown underline underline-offset-4"
              >
                Member login
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className={`grid md:grid-cols-2 ${orderedPackages.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 max-w-7xl mx-auto`}>
              {orderedPackages.map((washPackage, index) => {
                const breakEvenVisits = getBreakEvenVisits(washPackage);
                const includedFeatures = getIncludedFeatures(location, washPackage.name);
                const visibleFeatures = washPackage.features.slice(0, 4);
                const additionalFeatureCount = washPackage.features.length - visibleFeatures.length;

                return (
                  <motion.article
                    key={washPackage.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`${washPackage.color} rounded-3xl overflow-hidden shadow-xl flex flex-col`}
                  >
                  <div className="p-6 text-center">
                    {index === 0 && (
                      <p className={`mb-2 font-body text-xs font-extrabold uppercase ${washPackage.textColor}`}>
                        Lowest monthly price
                      </p>
                    )}
                    <h3 className={`font-display text-3xl ${washPackage.textColor} mb-2`}>
                      {washPackage.name}
                    </h3>
                    <p className={`font-display text-2xl ${washPackage.textColor}`}>
                      {washPackage.singlePrice}
                      <span className="font-body text-sm"> / single wash</span>
                    </p>
                  </div>

                  <div className="border-y-2 border-washking-brown/20 bg-washking-brown px-4 py-4 text-center">
                    <p className="text-white font-display text-sm">UNLIMITED WASH CLUB</p>
                    <p className="text-white font-display text-3xl">
                      {washPackage.monthlyPrice}
                      <span className="font-body text-xs"> + tax</span>
                    </p>
                    <p className="text-white font-body text-sm">per month</p>
                    {breakEvenVisits && (
                      <p className="mt-2 font-body text-xs font-extrabold text-white">
                        Pays for itself by visit {breakEvenVisits}
                      </p>
                    )}
                  </div>

                  <div className="px-6 pb-6 pt-5 flex flex-col flex-1">
                    {washPackage.includes && (
                      <p className={`font-display text-sm ${washPackage.textColor} mb-3 text-center`}>
                        {washPackage.includes}
                      </p>
                    )}
                    <ul className="space-y-2 mb-5 flex-1">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2 ${washPackage.textColor}`}>
                          <Check className="w-5 h-5 shrink-0" aria-hidden="true" />
                          <span className="font-body font-semibold text-sm">{feature}</span>
                        </li>
                      ))}
                      {additionalFeatureCount > 0 && (
                        <li className={`font-body text-sm font-extrabold ${washPackage.textColor}`}>
                          + {additionalFeatureCount} more upgrades
                        </li>
                      )}
                    </ul>
                    {washPackage.note && (
                      <p className={`text-xs ${washPackage.textColor} opacity-80 mb-4`}>
                        {washPackage.note}
                      </p>
                    )}

                    <details className={`mb-5 border-t border-current/20 pt-3 ${washPackage.textColor}`}>
                      <summary className="cursor-pointer font-body text-sm font-extrabold">
                        See all {includedFeatures.length} included{" "}
                        {includedFeatures.length === 1 ? "feature" : "features"}
                      </summary>
                      <ul className="mt-3 space-y-2">
                        {includedFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="font-body text-xs font-semibold">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </details>

                    <a
                      href={MEMBERSHIP_PORTAL}
                      data-analytics="plan_select"
                      data-analytics-source="location_plan_card"
                      data-location-slug={location.slug}
                      data-plan-name={washPackage.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cloud flex items-center justify-center gap-2 bg-washking-cream text-washking-brown border-2 border-washking-brown px-5 py-2.5 font-display text-base text-center"
                      aria-label={`Join the ${washPackage.name} unlimited wash plan`}
                    >
                      Choose {washPackage.name}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <p className={`mt-2 text-center font-body text-xs ${washPackage.textColor}`}>
                      Confirm {portalLocationName} in NXTWash
                    </p>
                  </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-washking-yellow py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] items-center gap-8">
              <div>
                <p className="font-display text-washking-brown/70 text-sm tracking-widest mb-2">MEMBERSHIP</p>
                <h2 className="font-display text-3xl lg:text-5xl text-washking-brown">
                  Why Become a Member?
                </h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {memberBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-washking-brown">
                    <span className="w-7 h-7 bg-washking-brown rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" aria-hidden="true" />
                    </span>
                    <span className="font-body font-semibold">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-washking-sky py-14 lg:py-20 relative overflow-hidden">
          <FoamBubbles variant="section" density="low" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-center">
              <div>
                <p className="font-display text-washking-yellow text-sm tracking-widest mb-2">PLAN YOUR VISIT</p>
                <h2 className="font-display text-4xl lg:text-5xl text-white text-shadow mb-6">
                  Hours and Directions
                </h2>
                <div className="bg-washking-green rounded-3xl p-7 text-white">
                  <HoursDetails location={location} />
                </div>
                <p className="font-body text-white mt-5">
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
                    className="btn-cloud mt-5 inline-flex bg-washking-yellow text-washking-brown border-2 border-washking-brown px-5 py-3 font-display text-base items-center gap-2"
                  >
                    <Navigation className="w-5 h-5" aria-hidden="true" />
                    Get Directions
                  </a>
                )}
              </div>

              {location.mapEmbed && (
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for WashKing ${location.name}`}
                    className="w-full h-[320px] lg:h-[420px]"
                  />
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
              className="flex min-h-12 items-center justify-center gap-1 rounded-lg bg-washking-brown px-2 font-body text-xs font-extrabold text-white"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Directions
            </a>
          )}
          <button
            type="button"
            onClick={scrollToPlans}
            className="flex min-h-12 items-center justify-center gap-1 rounded-lg border-2 border-washking-brown bg-white px-2 font-body text-xs font-extrabold text-washking-brown"
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
            className="flex min-h-12 items-center justify-center gap-1 rounded-lg bg-washking-yellow px-2 font-body text-xs font-extrabold text-washking-brown"
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
