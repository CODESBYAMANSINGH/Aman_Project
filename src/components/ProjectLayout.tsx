import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ArrowRight, Home } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import CelestialBody from "./CelestialBody";

const pages = [
  "/",
  "/team",
  "/introduction",
  "/objectives",
  "/methodology",
  "/climatic-zones",
  "/calculator",
];

const backgroundVariants = {
  day: {
    background: "linear-gradient(to bottom right, #87CEEB, #FFFFFF, #FFD700)",
  },
  evening: {
    background: "linear-gradient(to bottom right, #4682B4, #FF7F50, #B22222)",
  },
  night: {
    background: "linear-gradient(to bottom right, #000080, #191970, #483D8B)",
  },
};

const ProjectLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState<"day" | "evening" | "night">("day");

  useEffect(() => {
    const cycle = () => {
      setTimeOfDay((current) => {
        if (current === "day") return "evening";
        if (current === "evening") return "night";
        return "day";
      });
    };
    const intervalId = setInterval(cycle, 8000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    const currentIndex = pages.indexOf(location.pathname);
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1]);
    } else {
      navigate(pages[0]);
    }
  };

  const currentPageIndex = pages.indexOf(location.pathname);
  const isLastPage = currentPageIndex === pages.length - 1;

  return (
    <div className="relative w-full min-h-screen">
      <motion.div
        className="fixed inset-0 -z-10"
        variants={backgroundVariants}
        animate={timeOfDay}
        transition={{ duration: 5, ease: "easeInOut" }}
      />
      <CelestialBody timeOfDay={timeOfDay} />
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={location.pathname} className="w-full relative z-10 pt-32 pb-24">
          <Outlet />
        </main>
      </AnimatePresence>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={handleNext}
          size="lg"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLastPage ? "Back to Home" : "Next Page"}
          {isLastPage ? (
            <Home className="ml-2 h-5 w-5" />
          ) : (
            <ArrowRight className="ml-2 h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProjectLayout;