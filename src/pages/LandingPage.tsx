import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CelestialBody from "@/components/CelestialBody";

const backgroundVariants = {
  day: {
    background: "linear-gradient(to bottom right, #87CEEB, #FFFFFF, #FFD700)",
  },
  evening: {
    background: "linear-gradient(to bottom right, #4682B4, #FF7F50, #B22222)",
  },
  night: {
    background: "linear-gradient(to bottom right, #000080, #191970, #483D8B)",
  },
};

const textShadowVariants = {
  day: { textShadow: "2px 2px 4px rgba(0,0,0,0.3)" },
  evening: { textShadow: "2px 2px 4px rgba(0,0,0,0.5)" },
  night: { textShadow: "2px 2px 4px rgba(0,0,0,0.7)" },
};

const LandingPage = () => {
  const [timeOfDay, setTimeOfDay] = useState<"day" | "evening" | "night">(
    "day",
  );

  useEffect(() => {
    const cycle = () => {
      setTimeOfDay((current) => {
        if (current === "day") return "evening";
        if (current === "evening") return "night";
        return "day";
      });
    };

    const intervalId = setInterval(cycle, 8000); // Change every 8 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={backgroundVariants}
        animate={timeOfDay}
        transition={{ duration: 5, ease: "easeInOut" }}
      />

      <CelestialBody timeOfDay={timeOfDay} />

      <div className="relative z-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 dark:from-yellow-400 dark:to-orange-300 text-transparent bg-clip-text"
          style={{ filter: "drop-shadow(3px 3px 5px rgba(0,0,0,0.3))" }}
        >
          Solar Energy Optimization for Urban Utilization
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-white/90"
          variants={textShadowVariants}
        >
          Maximizing Photovoltaic Efficiency in Indian Climatic Zones
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LandingPage;