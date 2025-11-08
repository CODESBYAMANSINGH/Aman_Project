import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProjectLayout from "./components/ProjectLayout";
import LandingPage from "./pages/LandingPage";
import Introduction from "./pages/Introduction";
import Objectives from "./pages/Objectives";
import Methodology from "./pages/Methodology";
import ClimaticZones from "./pages/ClimaticZones";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<ProjectLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/climatic-zones" element={<ClimaticZones />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;