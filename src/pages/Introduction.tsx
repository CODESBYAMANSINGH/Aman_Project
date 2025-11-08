import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Introduction = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full h-full flex flex-col items-center justify-center p-8"
    >
      <div className="max-w-4xl text-white/90 space-y-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white text-center mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Introduction
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-lg text-center">
          Solar energy is becoming an essential part of modern urban living, especially as cities look for cleaner and more sustainable power solutions. However, the performance of a solar panel depends heavily on how it is installed—particularly its tilt angle and the available rooftop area.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-center">
          Our project focuses on HIG (High-Income Group) residential homes, where rooftop spaces are limited and need to be used efficiently.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-center">
          We use the ASHRAE Solar Radiation Model to determine the most suitable tilt angle for solar panel installation based on location and climate conditions.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-6">
          <h3 className="text-3xl font-bold text-white text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Project Goals
          </h3>
          <ul className="space-y-3 list-disc list-inside text-lg text-left max-w-2xl mx-auto">
            <li>Identify the optimal tilt angle for maximum solar energy capture.</li>
            <li>Assess and utilize rooftop area efficiently for panel placement.</li>
            <li>Help urban households increase solar power output and reduce electricity costs.</li>
            <li>Promote sustainable living by encouraging clean energy adoption.</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Introduction;