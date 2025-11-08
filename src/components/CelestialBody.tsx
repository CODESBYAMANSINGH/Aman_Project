import { motion } from "framer-motion";

// Variants for the main sun container (handles opacity and scale)
const sunContainerVariants = {
  day: { opacity: 1, scale: 1 },
  evening: { opacity: 1, scale: 1.05 },
  night: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 3, ease: "easeInOut" },
  },
};

// Variants for the sun's core style (gradient and glow)
const sunCoreVariants = {
  day: {
    background:
      "radial-gradient(circle, #FFFFFF 20%, #FFD700 60%, #FFA500 100%)",
    boxShadow:
      "0 0 40px 10px #fff, 0 0 70px 20px #ffc72c, 0 0 120px 30px #f09819",
  },
  evening: {
    background:
      "radial-gradient(circle, #FFEDA0 20%, #FF8C00 70%, #D2691E 100%)",
    boxShadow:
      "0 0 40px 10px #ffccbc, 0 0 70px 20px #ff9f80, 0 0 120px 30px #ef6c00",
  },
};

// Variants for the moon image
const moonVariants = {
  day: { opacity: 0, transition: { duration: 2 } },
  evening: { opacity: 0, transition: { duration: 2 } },
  night: {
    opacity: 1,
    filter:
      "brightness(1.1) drop-shadow(0 0 25px #e0e0e0) drop-shadow(0 0 40px #bdbdbd)",
    transition: { duration: 4, ease: "easeInOut", delay: 1 },
  },
};

// Variants for the atmospheric haze
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
    <div className="absolute top-16 right-16 w-32 h-32">
      {/* This container handles the slow rotation of the sun and moon */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Sun Container with all its effects */}
        <motion.div
          className="absolute inset-0"
          variants={sunContainerVariants}
          animate={timeOfDay}
          transition={{ duration: 5, ease: "easeInOut" }}
        >
          {/* Sun Core (Gradient + Glow + Spots) */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full"
            variants={sunCoreVariants}
            animate={timeOfDay}
            transition={{ duration: 5, ease: "easeInOut" }}
          >
            {/* Sun Spots */}
            <div
              className="absolute rounded-full"
              style={{
                top: "25%", left: "40%", width: "15px", height: "15px",
                backgroundColor: "rgba(0, 0, 0, 0.15)", filter: "blur(2px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: "60%", left: "65%", width: "10px", height: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.1)", filter: "blur(1.5px)",
              }}
            />
          </motion.div>

          {/* Sun Flares */}
          <motion.div
            className="absolute"
            style={{
              top: "50%", left: "-25%", width: "150%", height: "2px",
              backgroundColor: "rgba(255, 223, 186, 0.5)", borderRadius: "1px",
              transformOrigin: "center",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <motion.div
            className="absolute"
            style={{
              top: "50%", left: "-15%", width: "130%", height: "4px",
              backgroundColor: "rgba(255, 223, 186, 0.3)", borderRadius: "2px",
              transformOrigin: "center", rotate: "60deg",
            }}
            animate={{ rotate: 360 + 60 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Moon Image */}
        <motion.img
          src="/moon.png"
          alt="Moon"
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          variants={moonVariants}
          animate={timeOfDay}
        />
      </motion.div>

      {/* Atmospheric haze (does not rotate) */}
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
    </div>
  );
};

export default CelestialBody;