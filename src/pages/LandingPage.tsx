import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

type ContextType = { timeOfDay: "day" | "evening" | "night" };

const LandingPage = () => {
  const { timeOfDay } = useOutletContext<ContextType>();
  const isDay = timeOfDay === "day";
  const textColor = isDay ? "text-slate-800" : "text-white";
  const textShadow = isDay
    ? "1px 1px 3px rgba(0,0,0,0.2)"
    : "2px 2px 4px rgba(0,0,0,0.5)";

  return (
    <motion.div
      className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-center p-8 transition-colors duration-[5000ms] ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`text-5xl md:text-7xl font-bold ${textColor}`}
          style={{ textShadow }}
        >
          Solar Energy Optimization for Urban Utilization
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`mt-4 text-xl md:text-2xl ${
            isDay ? "text-slate-800/90" : "text-white/90"
          }`}
          style={{ textShadow }}
        >
          Maximizing Photovoltaic Efficiency in Indian Climatic Zones
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LandingPage;