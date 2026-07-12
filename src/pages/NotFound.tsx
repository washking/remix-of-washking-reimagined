import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";
import lionMascot from "@/assets/lion-mascot.png";
import lionMascotAvif from "@/assets/lion-mascot.avif";
import OptimizedImage from "@/components/OptimizedImage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-gray-50">
      <Seo
        title="Page Not Found | Wash King Car Wash"
        description="The page you're looking for doesn't exist. Return to Wash King Car Wash."
        path="/404"
        noIndex
      />
      <div className="px-4 text-center">
        <OptimizedImage
          avifSrc={lionMascotAvif}
          src={lionMascot} 
          alt="Wash King Lion"
          width={1132}
          height={1920}
          decoding="async"
          className="mx-auto mb-6 h-auto w-24"
        />
        <h1 className="mb-4 font-display text-5xl text-washking-sky lg:text-6xl">
          404
        </h1>
        <p className="mb-8 font-body text-xl text-washking-brown">Oops! Page not found</p>
        <Link 
          to="/" 
          className="btn-hero-secondary inline-block"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
