import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Background from "./Background";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen overflow-x-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-5 py-10">
        <header className="text-center bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-3xl mb-8 shadow-2xl border border-white/10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-glow text-gradient">
            ☀️ Solar Optimization for Urban Residences
          </h1>
          <p className="text-lg md:text-xl text-[#a8b3ff] font-semibold mb-6 tracking-widest">
            BUILDING A SUSTAINABLE FUTURE
          </p>
          <div className="mt-8 pt-6 border-t-2 border-[#667eea]/30">
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-4">
              <span className="text-sm text-[#b8c5ff] px-4 py-2 bg-[#667eea]/10 rounded-full border border-[#667eea]/30">Aditya Dudhe - 21119008</span>
              <span className="text-sm text-[#b8c5ff] px-4 py-2 bg-[#667eea]/10 rounded-full border border-[#667eea]/30">Arikathota Karthik - 21119023</span>
              <span className="text-sm text-[#b8c5ff] px-4 py-2 bg-[#667eea]/10 rounded-full border border-[#667eea]/30">Abhishek Kumar Roy - 21119006</span>
            </div>
            <p className="text-sm text-[#a8b3ff]">Department of Mechanical Engineering, NIT Raipur</p>
            <p className="text-sm text-[#a8b3ff] mt-1">Guided by: Dr. A. K. Tiwari</p>
          </div>
        </header>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold py-6 px-10 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            {isLastPage ? "Back to Home" : "Next Page"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <footer className="text-center p-8 text-[#a8b3ff] mt-10 bg-white/5 rounded-2xl border border-white/10">
          <p>&copy; {new Date().getFullYear()} Solar Optimization Project. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ProjectLayout;