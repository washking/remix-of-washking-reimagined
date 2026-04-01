import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Mail, Facebook, Instagram } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoamBubbles from "@/components/FoamBubbles";
import lionMascot from "@/assets/lion-mascot.png";
import { Badge } from "@/components/ui/badge";

interface WashPackage {
  name: string;
  color: string;
  textColor: string;
  singlePrice: string;
  monthlyPrice: string;
  includes: string | null;
  features: string[];
  note: string | null;
}

interface LocationInfo {
  name: string;
  state: string;
  address: string;
  city: string;
  email: string;
  hours: {
    allDays?: string;
    weekdays?: string;
    sunday?: string;
    is24Hours?: boolean;
  };
  mapEmbed: string;
  packages: WashPackage[];
  comingSoon?: boolean;
}

const locationData: Record<string, LocationInfo> = {
  vineland: {
    name: "Vineland Main Rd",
    state: "New Jersey",
    address: "2611 S Main Rd",
    city: "Vineland, NJ 08361",
    email: "contact@washking.net",
    hours: {
      weekdays: "9:00 AM to 6:00 PM",
      sunday: "9:00 AM to 5:00 PM",
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12323.823908697876!2d-75.0201754!3d39.4478589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d7dcb67cdec3%3A0x8b9c7b687e7a8f95!2sWash%20King!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: [
      {
        name: "ROYALTY",
        color: "bg-amber-800",
        textColor: "text-white",
        singlePrice: "$30",
        monthlyPrice: "$59.99",
        includes: "INCLUDES DIAMOND WASH PLUS:",
        features: ["INTERIOR VACUUM", "DASH WIPE DOWN", "WINDOW WIPE DOWN", "DOOR JAMS CLEANED", "MATS CLEANED"],
        note: null,
      },
      {
        name: "DIAMOND",
        color: "bg-yellow-400",
        textColor: "text-washking-brown",
        singlePrice: "$16",
        monthlyPrice: "$34.99",
        includes: "INCLUDES PLATINUM WASH PLUS:",
        features: ["LAVA SOAP", "CARNAUBA WAX", "POLYSEALANT", "TIRE SHINE"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "PLATINUM",
        color: "bg-sky-300",
        textColor: "text-washking-brown",
        singlePrice: "$14",
        monthlyPrice: "$29.99",
        includes: "INCLUDES BRONZE WASH PLUS:",
        features: ["TRIPLE FOAM", "WHEEL CLEANER 2X", "UNDERCARRIAGE WASH"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "BRONZE",
        color: "bg-green-600",
        textColor: "text-white",
        singlePrice: "$10",
        monthlyPrice: "$24.99",
        includes: null,
        features: ["WHITE FOAM", "DRYING AGENT"],
        note: "*EXTERIOR ONLY",
      },
    ],
  },
  "vineland-dante": {
    name: "Vineland Dante",
    state: "New Jersey",
    address: "2375 Dante Ave",
    city: "Vineland, NJ",
    email: "contact@washking.net",
    hours: {
      is24Hours: true,
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.03!3d39.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI4JzEyLjAiTiA3NcKwMDEnNDguMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: [
      {
        name: "DIAMOND",
        color: "bg-yellow-400",
        textColor: "text-washking-brown",
        singlePrice: "$16",
        monthlyPrice: "$34.99",
        includes: "INCLUDES PLATINUM WASH PLUS:",
        features: ["LAVA SOAP", "CARNAUBA WAX", "POLYSEALANT", "TIRE SHINE"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "PLATINUM",
        color: "bg-sky-300",
        textColor: "text-washking-brown",
        singlePrice: "$14",
        monthlyPrice: "$29.99",
        includes: "INCLUDES BRONZE WASH PLUS:",
        features: ["TRIPLE FOAM", "WHEEL CLEANER 2X", "UNDERCARRIAGE WASH"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "BRONZE",
        color: "bg-green-600",
        textColor: "text-white",
        singlePrice: "$10",
        monthlyPrice: "$24.99",
        includes: null,
        features: ["WHITE FOAM", "DRYING AGENT"],
        note: "*EXTERIOR ONLY",
      },
    ],
  },
  somerset: {
    name: "Somerset",
    state: "New Jersey",
    address: "1463 NJ-27",
    city: "Somerset, NJ 08873",
    email: "contact@washking.net",
    hours: {
      allDays: "8:00 AM to 7:00 PM",
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.5!2d-74.49!3d40.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMwJzAwLjAiTiA3NMKwMjknMjQuMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: [
      {
        name: "DIAMOND",
        color: "bg-yellow-400",
        textColor: "text-washking-brown",
        singlePrice: "$20",
        monthlyPrice: "$34.99",
        includes: "INCLUDES PLATINUM WASH PLUS:",
        features: ["LAVA SOAP", "CARNAUBA WAX", "POLYSEALANT", "TIRE SHINE"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "PLATINUM",
        color: "bg-sky-300",
        textColor: "text-washking-brown",
        singlePrice: "$17",
        monthlyPrice: "$31.99",
        includes: "INCLUDES BRONZE WASH PLUS:",
        features: ["TRIPLE FOAM", "WHEEL CLEANER 2X", "UNDERCARRIAGE WASH"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "BRONZE",
        color: "bg-green-600",
        textColor: "text-white",
        singlePrice: "$10",
        monthlyPrice: "$19.99",
        includes: null,
        features: ["WHITE FOAM", "DRYING AGENT"],
        note: "*EXTERIOR ONLY",
      },
    ],
  },
  landisville: {
    name: "Landisville",
    state: "New Jersey",
    address: "305 S Harding Hwy",
    city: "Landisville, NJ",
    email: "contact@washking.net",
    hours: {
      is24Hours: true,
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.5!2d-75.07!3d39.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDMxJzEyLjAiTiA3NcKwMDQnMTIuMCJX!5e0!3m2!1sen!2sus!4v1706540000000!5m2!1sen!2sus",
    packages: [
      {
        name: "DIAMOND",
        color: "bg-yellow-400",
        textColor: "text-washking-brown",
        singlePrice: "$16",
        monthlyPrice: "$34.99",
        includes: "INCLUDES PLATINUM WASH PLUS:",
        features: ["LAVA SOAP", "CARNAUBA WAX", "POLYSEALANT", "TIRE SHINE"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "PLATINUM",
        color: "bg-sky-300",
        textColor: "text-washking-brown",
        singlePrice: "$14",
        monthlyPrice: "$29.99",
        includes: "INCLUDES BRONZE WASH PLUS:",
        features: ["TRIPLE FOAM", "WHEEL CLEANER 2X", "UNDERCARRIAGE WASH"],
        note: "*EXTERIOR ONLY",
      },
      {
        name: "BRONZE",
        color: "bg-green-600",
        textColor: "text-white",
        singlePrice: "$10",
        monthlyPrice: "$24.99",
        includes: null,
        features: ["WHITE FOAM", "DRYING AGENT"],
        note: "*EXTERIOR ONLY",
      },
    ],
  },
  "cherry-hill": {
    name: "Cherry Hill",
    state: "New Jersey",
    address: "",
    city: "Cherry Hill, NJ",
    email: "contact@washking.net",
    hours: {},
    mapEmbed: "",
    packages: [],
    comingSoon: true,
  },
};

const memberBenefits = [
  "10% Discount on Detailing Services",
  "10% Discount on Royalty Wash Packages",
  "Discounted Family Plan Rates (Up to 5 Cars)",
  "Seasonal Promotions and Discounts",
];

const BubbleCluster = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
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

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = locationData[locationSlug as keyof typeof locationData];

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-washking-brown mb-4">Location Not Found</h1>
          <Link to="/" className="btn-hero-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  // Coming Soon page
  if (location.comingSoon) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] py-20 lg:py-32">
          <FoamBubbles variant="hero" density="medium" />
          <BubbleCluster className="top-10 left-[5%]" />
          <BubbleCluster className="top-16 right-[8%]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl text-white text-shadow mb-4">
                {location.name}
              </h1>
              <Badge className="bg-washking-yellow text-washking-brown font-display text-2xl px-8 py-4 rounded-full mb-8">
                Coming Soon
              </Badge>
              <p className="font-body text-xl lg:text-2xl text-white/90 mt-6 max-w-2xl mx-auto">
                We're excited to bring WashKing to {location.city}! Stay tuned for updates.
              </p>
              <p className="font-body text-lg text-white/80 mt-4">
                Contact us: <a href="mailto:contact@washking.net" className="underline font-bold">contact@washking.net</a>
              </p>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-washking-yellow pt-8 lg:pt-12 pb-24 lg:pb-32 relative">
          <div className="container mx-auto px-4" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto" preserveAspectRatio="none">
            <path fill="hsl(200 85% 55%)" d="M0,200 L0,100 Q360,180 720,100 T1440,120 L1440,200 Z" />
          </svg>
        </div>
      </section>

      {/* Blue Sky Section */}
      <section className="bg-washking-sky relative pt-6 lg:pt-8 pb-28 lg:pb-40">
        <FoamBubbles variant="section" density="low" />
        <BubbleCluster className="top-10 right-[10%]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white text-shadow mb-1 lg:mb-2">
              {location.name}
            </h1>
            <p className="font-display text-lg sm:text-xl lg:text-2xl text-washking-brown tracking-widest">
              {location.state.toUpperCase()}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <ellipse cx="200" cy="100" rx="250" ry="80" fill="hsl(200 80% 85%)" />
            <ellipse cx="500" cy="110" rx="300" ry="70" fill="hsl(200 80% 90%)" />
            <ellipse cx="900" cy="95" rx="350" ry="90" fill="hsl(200 80% 85%)" />
            <ellipse cx="1300" cy="105" rx="280" ry="75" fill="hsl(200 80% 90%)" />
          </svg>
        </div>
      </section>

      {/* Wash Packages */}
      <section className="bg-gradient-to-b from-[hsl(200_80%_92%)] to-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-washking-brown mb-3 lg:mb-4">
              Our wash packages
            </h2>
            <p className="font-display text-base sm:text-lg lg:text-xl text-washking-brown tracking-wide">
              Discover the Royal Treatment for Your Vehicle
            </p>
          </motion.div>

          <div className={`grid md:grid-cols-2 ${location.packages.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 max-w-7xl mx-auto`}>
            {location.packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${pkg.color} rounded-3xl overflow-hidden shadow-xl`}
              >
                <div className="p-6 text-center">
                  <h3 className={`font-display text-3xl ${pkg.textColor} mb-2`}>{pkg.name}</h3>
                  <p className={`font-display text-2xl ${pkg.textColor}`}>
                    {pkg.singlePrice}<span className="text-base">/ Single Wash</span>
                  </p>
                </div>
                <div className="mx-4 mb-4 bg-washking-brown rounded-2xl p-4 text-center">
                  <p className="text-white font-display text-sm tracking-wide">UNLIMITED WASH CLUB</p>
                  <p className="text-white font-display text-3xl">
                    {pkg.monthlyPrice}<span className="text-sm">+TAX</span>
                  </p>
                  <p className="text-white font-display text-sm">/ MONTH</p>
                </div>
                <div className="px-6 pb-6">
                  {pkg.includes && (
                    <p className={`font-display text-sm ${pkg.textColor} mb-3 text-center`}>{pkg.includes}</p>
                  )}
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 ${pkg.textColor}`}>
                        <Check className="w-5 h-5 flex-shrink-0" />
                        <span className="font-body font-semibold text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.note && (
                    <p className={`text-xs ${pkg.textColor} opacity-80 mb-4`}>{pkg.note}</p>
                  )}
                  <a
                    href="https://customerportal.nxtwash.com/washkingcarwash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-fit mx-auto bg-washking-cream text-washking-brown border-2 border-washking-brown rounded-full px-6 py-2 font-display text-lg hover:scale-105 transition-transform"
                  >
                    Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Become a Member */}
      <section className="bg-washking-yellow py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-washking-yellow border-4 border-washking-brown rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8"
          >
            <h3 className="font-display text-2xl lg:text-3xl text-washking-brown whitespace-nowrap">
              Why become a member?
            </h3>
            <ul className="space-y-2">
              {memberBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-washking-brown">
                  <div className="w-6 h-6 bg-washking-brown rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-body font-semibold">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Hours of Operation */}
      <section className="bg-washking-yellow py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
            <path fill="hsl(45 100% 60%)" d="M0,60 Q360,20 720,40 T1440,30 L1440,0 L0,0 Z" opacity="0.5" />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <img src={lionMascot} alt="WashKing Mascot" className="w-64 lg:w-80 h-auto drop-shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <h2 className="font-display text-4xl lg:text-5xl text-washking-brown mb-8">
                Hours of Operation
              </h2>
              
              <div className="bg-washking-green rounded-3xl p-8 text-white max-w-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 bg-gradient-to-l from-green-800 to-transparent" />
                <div className="relative z-10">
                  {location.hours.is24Hours ? (
                    <>
                      <p className="font-display text-2xl mb-4">We never close!</p>
                      <p className="font-display text-3xl">Open 24/7</p>
                    </>
                  ) : location.hours.allDays ? (
                    <>
                      <p className="font-display text-2xl mb-4">
                        Open <span className="text-4xl">7</span> days a week!
                      </p>
                      <p className="font-display text-xl mb-2">Monday – Sunday:</p>
                      <p className="font-display text-2xl">{location.hours.allDays}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-2xl mb-4">
                        Open <span className="text-4xl">7</span> days a week!
                      </p>
                      <p className="font-display text-xl mb-2">Monday – Saturday:</p>
                      <p className="font-display text-2xl mb-4">{location.hours.weekdays}</p>
                      <p className="font-display text-xl">Sunday: {location.hours.sunday}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative">
        <div className="bg-washking-sky py-20 relative">
          <FoamBubbles variant="section" density="low" />
          <BubbleCluster className="top-10 left-[10%]" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl lg:text-5xl text-white text-shadow mb-4">
                Contact us
              </h2>
              <p className="font-display text-white text-lg tracking-widest mb-8">
                CUSTOMERS SUPPORT OPTIONS
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
                <h3 className="font-display text-xl text-washking-brown mb-2">E-MAIL US</h3>
                <a
                  href="mailto:contact@washking.net"
                  className="font-body text-lg text-washking-brown hover:underline"
                >
                  contact@washking.net
                </a>
              </div>

              <div className="flex justify-center gap-3 lg:gap-4">
                <a
                  href="https://www.facebook.com/WashKingVineland/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-washking-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/washkingvineland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 lg:w-14 lg:h-14 bg-washking-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </a>
              </div>

              {/* Map embed */}
              {location.mapEmbed && (
                <div className="mt-10 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location.name} Location Map`}
                    className="w-full h-[250px] sm:h-[300px] lg:h-[350px]"
                  />
                </div>
              )}

              <div className="mt-6 font-body text-white/90 text-lg">
                <p>{location.address}, {location.city}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <svg viewBox="0 0 1440 100" className="w-full h-auto -mb-1" preserveAspectRatio="none">
          <path fill="hsl(25 50% 45%)" d="M0,100 Q360,20 720,60 T1440,40 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 38%)" d="M0,100 Q300,50 600,70 T1200,50 T1440,80 L1440,100 L0,100 Z" />
          <path fill="hsl(25 55% 35%)" d="M0,100 Q240,60 480,80 T960,60 T1440,90 L1440,100 L0,100 Z" />
        </svg>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
