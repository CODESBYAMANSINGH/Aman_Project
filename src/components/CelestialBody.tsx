import { motion } from "framer-motion";

const celestialVariants = {
  day: {
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,229,153,1) 50%, rgba(255,199,44,1) 100%)",
    boxShadow:
      "0 0 80px 20px #fff, 0 0 120px 40px #ffc72c, 0 0 200px 60px #f09819",
  },
  evening: {
    background:
      "radial-gradient(circle, rgba(255,204,188,1) 0%, rgba(255,159,128,1) 50%, rgba(239,108,0,1) 100%)",
    boxShadow:
      "0 0 80px 20px #ffccbc, 0 0 120px 40px #ff9f80, 0 0 200px 60px #ef6c00",
  },
  night: {
    background:
      "radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(224,224,224,1) 60%, rgba(189,189,189,1) 100%)",
    boxShadow: "0 0 40px 10px #e0e0e0, 0 0 60px 20px #bdbdbd",
  },
};

const reflectionVariants = {
  day: { opacity: 0.6 },
  evening: { opacity: 0.3 },
  night: { opacity: 0.1 },
};

const CelestialBody = ({
  timeOfDay,
}: {
  timeOfDay: "day" | "evening" | "night";
}) => {
  return (
    <motion.div
      className="absolute top-16 right-16 w-32 h-32 rounded-full"
      variants={celestialVariants}
      animate={timeOfDay}
      transition={{ duration: 5, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-1/2 w-[200%] h-[200%]"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 40%, ${
            timeOfDay === "night"
              ? "rgba(200,200,255,0.1)"
              : "rgba(255,255,200,0.2)"
          } 45%, transparent 55%)`,
        }}
        variants={reflectionVariants}
        animate={timeOfDay}
        transition={{ duration: 5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default CelestialBody;