import { motion } from "framer-motion";
import { Target, Maximize, Sun, Leaf, DollarSign } from 'lucide-react';
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const objectives = [
    { icon: <Target />, title: "Determine Optimal Tilt Angles", description: "Use code to determine the optimal tilt angles for solar panels in various Indian climatic zones to maximize solar energy absorption." },
    { icon: <Maximize />, title: "Optimize Installation Area", description: "Develop a code-based approach to calculate the optimal installation area for solar panels, ensuring maximum energy generation." },
    { icon: <Sun />, title: "Apply ASHRAE Model", description: "Leverage the ASHRAE model to accurately assess direct, diffuse, and reflected solar radiation for different regions." },
    { icon: <Leaf />, title: "Reduce Carbon Footprint", description: "Provide data-driven recommendations to improve the efficiency of solar energy systems based on location-specific parameters." },
    { icon: <DollarSign />, title: "Maximize Cost Savings", description: "Contribute to sustainable energy solutions by optimizing solar power generation across diverse environmental conditions in India." },
];

const Objectives = () => {
  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center p-8">
      <motion.h2 initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} className="text-4xl font-bold text-white mb-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Project Objectives
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 max-w-6xl"
      >
        {objectives.map(obj => (
            <motion.div key={obj.title} variants={itemVariants} className="p-6 bg-black/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 text-center flex flex-col items-center">
                {React.cloneElement(obj.icon, { className: "text-yellow-300 h-10 w-10 mb-4" })}
                <h4 className="font-bold text-lg text-white mb-2">{obj.title}</h4>
                <p className="text-sm text-white/80">{obj.description}</p>
            </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Objectives;