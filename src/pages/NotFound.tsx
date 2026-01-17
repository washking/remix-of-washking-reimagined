import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import lionMascot from "@/assets/lion-mascot.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_55%)] relative overflow-hidden">
      {/* Cloud decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10">
          <div className="w-32 h-16 bg-white/80 rounded-full" />
          <div className="w-24 h-14 bg-white/80 rounded-full -mt-8 ml-8" />
        </div>
        <div className="absolute bottom-40 right-20">
          <div className="w-40 h-20 bg-white/70 rounded-full" />
          <div className="w-28 h-16 bg-white/70 rounded-full -mt-10 ml-12" />
        </div>
      </div>
      
      <div className="text-center relative z-10 px-4">
        <img 
          src={lionMascot} 
          alt="WashKing Lion" 
          className="w-32 h-auto mx-auto mb-6"
          style={{ mixBlendMode: 'multiply' }}
        />
        <h1 className="font-display text-6xl lg:text-8xl text-washking-yellow text-shadow mb-4">
          404
        </h1>
        <p className="text-white text-xl font-body mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="btn-hero-primary inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
