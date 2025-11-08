import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const steps = [
    "Literature Review: Conduct a comprehensive review of existing studies.",
    "Data Collection: Gather solar radiation data for different climatic zones in India.",
    "Model Implementation: Implement the ASHRAE model to calculate solar irradiance.",
    "Optimization Algorithm: Develop an algorithm to determine the optimal tilt angle.",
    "Analysis and Validation: Analyze results and validate findings against existing research.",
];

const Methodology = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.h2 initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} className="text-4xl font-bold text-primary mb-12">
        Methodology
      </motion.h2>
      <motion.ol 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-2xl"
      >
        {steps.map((step, index) => (
            <motion.li key={index} variants={itemVariants} className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-md">
                    {index + 1}
                </div>
                <p className="text-gray-600 pt-1">{step}</p>
            </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

export default Methodology;