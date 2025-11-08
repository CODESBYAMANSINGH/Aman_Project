import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Maximize, DollarSign, Leaf } from "lucide-react";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const goals = [
    { icon: <Target />, text: "Identify the optimal tilt angle for maximum solar energy capture." },
    { icon: <Maximize />, text: "Assess and utilize rooftop area efficiently for panel placement." },
    { icon: <DollarSign />, text: "Help urban households increase solar power output and reduce electricity costs." },
    { icon: <Leaf />, text: "Promote sustainable living by encouraging clean energy adoption." },
];

const Introduction = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full min-h-screen p-8 flex flex-col items-center"
    >
      <div className="max-w-5xl w-full space-y-12">
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Introduction
          </h2>
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white shadow-xl">
                <CardContent className="p-8 text-lg text-center space-y-4 text-white/90" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    <p>
                    Solar energy is becoming an essential part of modern urban living, especially as cities look for cleaner and more sustainable power solutions. However, the performance of a solar panel depends heavily on how it is installed—particularly its tilt angle and the available rooftop area.
                    </p>
                    <p>
                    Our project focuses on HIG (High-Income Group) residential homes, where rooftop spaces are limited and need to be used efficiently.
                    </p>
                    <p>
                    We use the ASHRAE Solar Radiation Model to determine the most suitable tilt angle for solar panel installation based on location and climate conditions.
                    </p>
                </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Project Goals
          </h3>
        </motion.div>

        <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
        >
            {goals.map((goal, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {React.cloneElement(goal.icon, { className: "w-8 h-8 text-yellow-300 flex-shrink-0" })}
                            <CardTitle className="text-xl text-white/90">{goal.text}</CardTitle>
                        </CardHeader>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Introduction;