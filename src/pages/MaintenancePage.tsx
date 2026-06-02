import { motion } from "framer-motion";
import { Cloud, Mail, Sparkles } from "lucide-react";
import lionMascot from "@/assets/lion-mascot.png";
import FoamBubbles from "@/components/FoamBubbles";

const MaintenancePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[hsl(200_85%_65%)] to-[hsl(200_85%_50%)]">
      <FoamBubbles variant="hero" density="medium" />

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur-sm border border-white/30"
        >
          <Cloud className="h-5 w-5 text-white" />
          <span className="font-display text-sm sm:text-base text-white tracking-wide">
            TEMPORARILY UNAVAILABLE
          </span>
        </motion.div>

        <motion.img
          src={lionMascot}
          alt="WashKing Lion Mascot"
          className="w-40 sm:w-56 lg:w-64 h-auto drop-shadow-2xl rounded-2xl mb-6"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl text-white text-shadow mb-3"
        >
          WE'LL BE <span className="text-washking-yellow">RIGHT BACK!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-base sm:text-lg lg:text-xl text-white/95 max-w-2xl mb-2 text-shadow-white tracking-wide"
        >
          Our hosting service is currently paused.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm sm:text-base text-white/90 max-w-2xl mb-10"
        >
          Our website is temporarily suspended while we renew our cloud hosting.
          Thank you for your patience — we appreciate your support!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <a
            href="https://customerportal.nxtwash.com/washkingcarwash"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero-primary text-sm sm:text-base px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            MEMBER PORTAL
          </a>
          <a
            href="mailto:contact@washking.net"
            className="btn-hero-secondary text-sm sm:text-base px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4" />
            CONTACT US
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-xs sm:text-sm text-white/80"
        >
          © 2026 WashKing Car Wash. All rights reserved. ·{" "}
          <a
            href="https://www.webchily.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-washking-yellow hover:underline"
          >
            Web design & developed by Webchily
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default MaintenancePage;
