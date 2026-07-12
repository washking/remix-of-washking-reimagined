import { Link } from "react-router-dom";
import { Home, MapPinned } from "lucide-react";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import lionCar from "@/assets/lion-car-mark.png";
import lionCarAvif from "@/assets/lion-car-mark.avif";
import OptimizedImage from "@/components/OptimizedImage";

const NotFound = () => (
  <div className="flex min-h-screen flex-col bg-washking-sky-light">
    <Seo
      title="Page Not Found | Wash King Car Wash"
      description="The page you're looking for doesn't exist. Return to Wash King Car Wash."
      path="/404"
      noIndex
    />
    <Header />
    <main id="main-content" tabIndex={-1} className="flex flex-1 items-center justify-center py-12">
      <div className="mx-4 max-w-2xl rounded-lg border border-washking-brown/15 border-t-[6px] border-t-washking-yellow bg-white px-6 py-10 text-center shadow-md sm:px-10">
        <OptimizedImage
          avifSrc={lionCarAvif}
          src={lionCar}
          alt="Wash King lion mascot sitting on a red car"
          width={500}
          height={380}
          decoding="async"
          className="mx-auto mb-6 h-auto w-44"
        />
        <p className="font-body text-sm font-bold text-washking-sky">Error 404</p>
        <h1 className="mt-2 font-display text-3xl text-washking-brown sm:text-4xl">
          That page took a wrong turn
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-base leading-relaxed text-gray-600">
          The page may have moved, but your nearest Wash King is still easy to find.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link to="/#locations" className="btn-outline gap-2">
            <MapPinned className="h-4 w-4" aria-hidden="true" />
            View locations
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
