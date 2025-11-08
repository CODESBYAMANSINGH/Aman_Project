import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full flex flex-col items-center justify-center text-center p-8"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Solar Optimization for Urban Residences
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 text-xl md:text-2xl text-gray-500"
      >
        Building a Sustainable Future
      </motion.p>
    </motion.div>
  );
};

export default LandingPage;