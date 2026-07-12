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
    title: "A consistently clean car",
    description: "We focus on the details that make a wash feel worth the visit.",
  },
  {
    icon: Users,
    title: "Service that feels personal",
    description: "Customers stay at the center of every decision and every interaction.",
  },
  {
    icon: TrendingUp,
    title: "A team that keeps growing",
    description: "We develop skills, encourage new ideas, and help our people do their best work.",
  },
  {
    icon: UsersRound,
    title: "Connected to our communities",
    description: "We support local initiatives in the New Jersey communities we serve.",
  },
  {
    icon: Cpu,
    title: "Technology that saves time",
    description: "Modern systems help make each arrival, wash, and membership visit more efficient.",
  },
  {
    icon: Shield,
    title: "Equipment you can count on",
    description: "Routine checks help keep service reliable and the wash experience consistent.",
  },
  {
    icon: CheckCircle,
    title: "Products chosen with care",
    description: "We choose quality wash products for an effective clean and polished finish.",
  },
  {
    icon: Database,
    title: "Always improving",
    description: "We use operational insights and customer feedback to make each location better.",
  },
  {
    icon: ArrowUpRight,
    title: "A smoother visit",
    description: "Thoughtful processes keep the wash moving without compromising on quality.",
  },
] as const;

const AboutPage = () => (
  <div className="min-h-screen bg-white">
    <Seo
      title="About Wash King | Family-Owned New Jersey Car Wash"
      description="Learn about Wash King Car Wash, a family-owned business with four open New Jersey locations and Cherry Hill coming soon."
      path="/about"
    />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <section className="border-b-4 border-washking-yellow bg-washking-sky py-12 lg:py-14">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-body text-sm font-bold text-washking-yellow">
            Family-owned in New Jersey
          </p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            About Wash King
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
            A family-owned New Jersey car wash focused on dependable service, convenient locations, and a consistently clean car.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-display text-3xl text-washking-brown sm:text-4xl">
              Who we are
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
                <h3 className="mb-4 font-display text-lg text-washking-green lg:text-xl">
                  Our mission
                </h3>
                <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
                  Make car washing fast, easy, and enjoyable while raising the standard for quality and service.
                </p>
              </article>

              <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
                <h3 className="mb-4 font-display text-lg text-washking-green lg:text-xl">
                  Our promise
                </h3>
                <p className="font-body text-base leading-relaxed text-gray-700 lg:text-lg">
                  Car washing is our passion. Family is at our core, and we bring that same care to every customer and vehicle.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-3 text-center font-display text-3xl text-washking-brown sm:text-4xl">
            What guides us
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-center font-body text-base leading-relaxed text-gray-600 sm:text-lg">
            The standards behind each wash, each location, and each customer interaction.
          </p>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <article key={value.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-washking-sky-light text-washking-sky">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-lg text-washking-green">
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
              className="btn-secondary px-7 text-base"
            >
              Explore locations
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
