import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

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
  {
    title: "Model Validation",
    description:
      "Validate the calculated tilt angles using simulations and compare them with existing models for accuracy.",
  },
];

const Methodology = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-white mb-12"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
      >
        Methodology
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl w-full"
      >
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white shadow-xl">
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
                  <div className="flex-shrink-0 bg-yellow-500/80 border border-yellow-300/50 text-black w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white">
                      {step.title}
                    </h4>
                    <p className="text-white/80">{step.description}</p>
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