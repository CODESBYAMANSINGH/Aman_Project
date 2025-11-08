import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div
      className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-center p-8"
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
          className="text-5xl md:text-7xl font-bold text-white"
          style={{ filter: "drop-shadow(3px 3px 5px rgba(0,0,0,0.5))" }}
        >
          Solar Energy Optimization for Urban Utilization
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-white/90"
          style={{ filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.5))" }}
        >
          Maximizing Photovoltaic Efficiency in Indian Climatic Zones
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LandingPage;