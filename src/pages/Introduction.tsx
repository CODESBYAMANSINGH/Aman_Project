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
      className="w-full h-full flex flex-col items-center justify-center p-8 bg-background"
    >
      <motion.h2 variants={itemVariants} className="text-4xl font-bold text-primary mb-8">
        Introduction
      </motion.h2>
      
      <motion.div variants={itemVariants} className="max-w-4xl text-center text-lg text-foreground/80 space-y-4">
        <p>Our project aims to optimize the solar panel setup for high energy efficiency in High-Income Group (HIG) houses, focusing on Energy Efficiency, Urban Applicability, and Sustainability.</p>
        <p>Solar radiation varies by location and is influenced by factors like latitude and climate. Understanding these variations is crucial for optimizing solar energy systems. Using the ASHRAE model, we can calculate direct, diffuse, and reflected solar radiation, which is vital for designing effective solar installations.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-12 text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20">
        <h3 className="font-semibold text-foreground">Project By: Department of Mechanical Engineering, NIT Raipur</h3>
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap mt-2">
          <span className="text-sm text-muted-foreground">Aditya Dudhe - 21119008</span>
          <span className="text-sm text-muted-foreground">Arikathota Karthik - 21119023</span>
          <span className="text-sm text-muted-foreground">Abhishek Kumar Roy - 21119006</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Guided by: Dr. A. K. Tiwari</p>
      </motion.div>
    </motion.div>
  );
};

export default Introduction;