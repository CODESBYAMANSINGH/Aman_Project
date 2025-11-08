import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ArrowRight, Home } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const pages = [
  "/",
  "/introduction",
  "/objectives",
  "/methodology",
  "/climatic-zones",
];

const ProjectLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNext = () => {
    const currentIndex = pages.indexOf(location.pathname);
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1]);
    } else {
      navigate(pages[0]); // Loop back to start
    }
  };

  const currentPageIndex = pages.indexOf(location.pathname);
  const isLastPage = currentPageIndex === pages.length - 1;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={location.pathname} className="w-full h-full">
          <Outlet />
        </main>
      </AnimatePresence>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={handleNext}
          size="lg"
          className="rounded-full shadow-lg"
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