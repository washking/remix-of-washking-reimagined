import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Car,
  CheckCircle,
  Cpu,
  Database,
  Shield,
  TrendingUp,
  Users,
  UsersRound,
} from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const coreValues = [
  {
    icon: Car,
    title: "Relentless Pursuit of Cleanliness",
    description: "Every vehicle receives meticulous attention, leaving it spotless and shining like new.",
  },
  {
    icon: Users,
    title: "Exceptional Customer Service",
    description: "We place our customers at the heart of everything we do. Your satisfaction drives us to be the best.",
  },
  {
    icon: TrendingUp,
    title: "Cultivating Growth",
    description: "A place where skills are honed, talents are nurtured, and innovation is encouraged.",
  },
  {
    icon: UsersRound,
    title: "Community Engagement",
    description: "Deeply invested in local initiatives and charitable causes in every community we serve.",
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Technology",
    description: "Advanced systems ensure your car receives the most thorough and efficient wash available.",
  },
  {
    icon: Shield,
    title: "Proactive Maintenance",
    description: "Regular checks ensure everything is in top working order, keeping services reliable and consistent.",
  },
  {
    icon: CheckCircle,
    title: "Premium Products",
    description: "High-quality, environmentally friendly products safe for your vehicle and effective at achieving a pristine finish.",
  },
  {
    icon: Database,
    title: "Data-Driven Performance",
    description: "We track every aspect of our operation to continuously improve the experience for our customers.",
  },
  {
    icon: ArrowUpRight,
    title: "Streamlined Operations",
    description: "Optimized processes provide quick, effective washes without compromising on quality.",
  },
] as const;

const AboutPage = () => (
  <div className="min-h-screen bg-white">
    <Seo
      title="About WashKing | Family-Owned New Jersey Car Wash"
      description="Learn about WashKing Car Wash, a family-owned business with four open New Jersey locations and Cherry Hill coming soon."
      path="/about"
    />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <section className="border-b-4 border-washking-yellow bg-washking-sky py-12 lg:py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl text-white sm:text-5xl">
            ABOUT WASHKING
          </h1>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-display text-3xl text-washking-brown sm:text-4xl">
              <span className="text-washking-sky">WHO</span>{" "}
              <span>WE ARE</span>
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
                <h3 className="mb-4 font-body text-lg font-extrabold text-washking-green lg:text-xl">
                  MISSION STATEMENT
                </h3>
                <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
                  To challenge, disrupt and redefine all industry norms — making car washing fast, easy, and enjoyable for everyone.
                </p>
              </article>

              <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
                <h3 className="mb-4 font-body text-lg font-extrabold text-washking-green lg:text-xl">
                  BRAND PROMISE
                </h3>
                <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
                  Car washing is our Passion. Family is at our Core. Only the Best for Family.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-9 text-center font-display text-3xl text-washking-brown sm:text-4xl">
            CORE VALUES
          </h2>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <article key={value.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-washking-sky-light text-washking-sky">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-body text-lg font-extrabold text-washking-green">
                  {value.title}
                </h3>
                <p className="font-body text-base leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/#locations"
              className="btn-cloud inline-block border border-washking-brown bg-washking-yellow px-7 py-3 text-base text-washking-brown"
            >
              View Our Location
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
