import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

type ContextType = { timeOfDay: "day" | "evening" | "night" };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const zones = [
  {
    title: "Hot and Dry",
    description: "High daytime temperatures, low humidity, and clear skies.",
  },
  {
    title: "Warm and Humid",
    description: "High humidity and temperatures, affecting panel efficiency.",
  },
  {
    title: "Composite",
    description: "A mix of hot/dry and warm/humid seasons.",
  },
  { title: "Temperate", description: "Moderate temperatures and humidity." },
  {
    title: "Cold",
    description: "Low temperatures and significant snowfall in winter.",
  },
  {
    title: "Mountainous",
    description: "High altitude and intense solar radiation.",
  },
];

const ClimaticZones = () => {
  const { timeOfDay } = useOutletContext<ContextType>();
  const isDay = timeOfDay === "day";

  const textColor = isDay ? "text-slate-800" : "text-white";
  const cardSubTextColor = isDay ? "text-slate-700" : "text-white/80";
  const textShadow = isDay
    ? "1px 1px 2px rgba(0,0,0,0.2)"
    : "2px 2px 4px rgba(0,0,0,0.5)";
  const cardBg = isDay ? "bg-white/40" : "bg-black/20";
  const cardBorder = isDay ? "border-slate-300/50" : "border-white/20";
  const titleColor = isDay ? "text-yellow-600" : "text-yellow-300";

  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center p-8 transition-colors duration-[5000ms] ease-in-out">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-4xl font-bold ${textColor} mb-12`}
        style={{ textShadow }}
      >
        Climatic Zones of India
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 max-w-6xl"
      >
        {zones.map((zone) => (
          <motion.div
            key={zone.title}
            variants={itemVariants}
            className={`p-6 ${cardBg} backdrop-blur-sm rounded-lg shadow-lg border ${cardBorder} text-center`}
          >
            <h4 className={`font-bold text-lg ${titleColor} mb-2`}>
              {zone.title}
            </h4>
            <p className={`text-sm ${cardSubTextColor}`}>{zone.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClimaticZones;