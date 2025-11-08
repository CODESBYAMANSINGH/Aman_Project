import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Sun, Globe, DollarSign } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const objectives = [
    { icon: <CheckCircle className="text-blue-500" />, title: "Determine Optimal Tilt Angles" },
    { icon: <TrendingUp className="text-blue-500" />, title: "Optimize Installation Area" },
    { icon: <Sun className="text-blue-500" />, title: "Apply ASHRAE Model" },
    { icon: <Globe className="text-blue-500" />, title: "Reduce Carbon Footprint" },
    { icon: <DollarSign className="text-blue-500" />, title: "Maximize Cost Savings" },
];

const Objectives = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.h2 initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} className="text-4xl font-bold text-primary mb-12">
        Project Objectives
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-8 max-w-5xl"
      >
        {objectives.map(obj => (
            <motion.div key={obj.title} variants={itemVariants} className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md border">
                {obj.icon}
                <h4 className="font-semibold text-gray-700">{obj.title}</h4>
            </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Objectives;