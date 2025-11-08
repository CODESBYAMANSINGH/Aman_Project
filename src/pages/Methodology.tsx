import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useOutletContext } from "react-router-dom";

type ContextType = { timeOfDay: "day" | "evening" | "night" };

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const steps = [
  {
    title: "Literature Review",
    description:
      "Conduct a comprehensive review of existing studies on solar radiation, tilt angles, and installation area optimization.",
  },
  {
    title: "Data Collection",
    description:
      "Gather climatic data, solar radiation levels, and geographical information for different zones in India.",
  },
  {
    title: "Tilt Angle Calculation",
    description:
      "Use coding and the ASHRAE model to compute optimal tilt angles for solar panels based on solar radiation data.",
  },
  {
    title: "Installation Area Calculation",
    description:
      "Develop and apply a code-based approach to determine the optimal installation area for maximizing solar energy generation.",
  },
];

const Methodology = () => {
  const { timeOfDay } = useOutletContext<ContextType>();
  const isDay = timeOfDay === "day";

  const textColor = isDay ? "text-slate-800" : "text-white";
  const cardTextColor = isDay ? "text-slate-800" : "text-white";
  const cardSubTextColor = isDay ? "text-slate-700" : "text-white/80";
  const textShadow = isDay
    ? "1px 1px 2px rgba(0,0,0,0.2)"
    : "2px 2px 4px rgba(0,0,0,0.7)";
  const cardBg = isDay ? "bg-white/40" : "bg-black/20";
  const cardBorder = isDay ? "border-slate-300/50" : "border-white/20";
  const numberBg = isDay
    ? "bg-yellow-400/80 border-yellow-500/50 text-slate-800"
    : "bg-yellow-500/80 border-yellow-300/50 text-black";

  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center p-8 transition-colors duration-[5000ms] ease-in-out">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-4xl font-bold ${textColor} mb-12`}
        style={{ textShadow }}
      >
        Methodology
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl w-full"
      >
        <Card
          className={`${cardBg} backdrop-blur-sm ${cardBorder} ${cardTextColor} shadow-xl`}
        >
          <CardContent className="p-8">
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 list-none"
                >
                  <div
                    className={`flex-shrink-0 ${numberBg} w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${cardTextColor}`}>
                      {step.title}
                    </h4>
                    <p className={cardSubTextColor}>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Methodology;