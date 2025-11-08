import { motion } from "framer-motion";

// Variants for the sun image, using drop-shadow for a masked glow
const sunVariants = {
  day: {
    opacity: 1,
    filter:
      "brightness(1.1) saturate(1.2) drop-shadow(0 0 30px #fff) drop-shadow(0 0 50px #ffc72c)",
    scale: 1,
  },
  evening: {
    opacity: 1,
    filter:
      "sepia(0.5) hue-rotate(-30deg) saturate(1.5) brightness(0.9) drop-shadow(0 0 30px #ffccbc) drop-shadow(0 0 50px #ff9f80)",
    scale: 1.05,
  },
  night: { opacity: 0, scale: 1.05 },
};

// Variants for the moon image, also with a drop-shadow glow
const moonVariants = {
  day: { opacity: 0 },
  evening: { opacity: 0 },
  night: {
    opacity: 1,
    filter:
      "brightness(1.1) drop-shadow(0 0 25px #e0e0e0) drop-shadow(0 0 40px #bdbdbd)",
  },
};

// Variants for the atmospheric haze/reflection
const reflectionVariants = {
  day: { opacity: 0.2 },
  evening: { opacity: 0.1 },
  night: { opacity: 0.1 },
};

const CelestialBody = ({
  timeOfDay,
}: {
  timeOfDay: "day" | "evening" | "night";
}) => {
  return (
    <motion.div
      className="absolute top-16 right-16 w-32 h-32"
      transition={{ duration: 5, ease: "easeInOut" }}
    >
      {/* Sun Image */}
      <motion.img
        src="/sun.png"
        alt="Sun"
        className="absolute inset-0 w-full h-full object-cover rounded-full"
        variants={sunVariants}
        animate={timeOfDay}
        transition={{ duration: 5, ease: "easeInOut" }}
        style={{ willChange: "filter, opacity" }}
      />

      {/* Moon Image */}
      <motion.img
        src="/moon.webp"
        alt="Moon"
        className="absolute inset-0 w-full h-full object-cover rounded-full"
        variants={moonVariants}
        animate={timeOfDay}
        transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
        style={{ willChange: "filter, opacity" }}
      />

      {/* Slow rotation animation */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Atmospheric haze/reflection effect */}
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