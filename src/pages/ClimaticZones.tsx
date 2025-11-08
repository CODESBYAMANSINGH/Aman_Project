import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const zones = [
    { title: "Hot and Dry", description: "High daytime temperatures, low humidity, and clear skies." },
    { title: "Warm and Humid", description: "High humidity and temperatures, affecting panel efficiency." },
    { title: "Composite", description: "A mix of hot/dry and warm/humid seasons." },
    { title: "Temperate", description: "Moderate temperatures and humidity." },
    { title: "Cold", description: "Low temperatures and significant snowfall in winter." },
    { title: "Mountainous", description: "High altitude and intense solar radiation." },
];

const ClimaticZones = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.h2 initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} className="text-4xl font-bold text-primary mb-12">
        Climatic Zones of India
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 max-w-6xl"
      >
        {zones.map(zone => (
            <motion.div key={zone.title} variants={itemVariants} className="p-6 bg-white rounded-lg shadow-md border text-center">
                <h4 className="font-bold text-lg text-primary mb-2">{zone.title}</h4>
                <p className="text-sm text-gray-600">{zone.description}</p>
            </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClimaticZones;