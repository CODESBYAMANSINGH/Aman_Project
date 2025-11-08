import { CheckCircle, TrendingUp, Sun, Globe, DollarSign } from 'lucide-react';

const ObjectiveCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 p-8 rounded-2xl shadow-lg border border-white/20 transition-all duration-400 hover:-translate-y-2 hover:scale-105 hover:shadow-[#667eea]/50">
        <div className="flex items-center gap-4 mb-4 text-2xl font-bold text-white">
            {icon}
            <h4>{title}</h4>
        </div>
        <p className="text-[#b8c5ff]">{children}</p>
    </div>
);

const Objectives = () => {
  return (
    <section className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 animate-fade-in-up hover:shadow-[#667eea]/30 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-4xl font-bold mb-8 pb-4 border-b-2 border-[#764ba2]/50 text-gradient">
        Project Objectives
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ObjectiveCard icon={<CheckCircle className="text-[#667eea]" />} title="Determine Optimal Tilt Angles">
          Use code to determine the optimal tilt angles for solar panels in various Indian climatic zones to maximize solar energy absorption.
        </ObjectiveCard>
        <ObjectiveCard icon={<TrendingUp className="text-[#667eea]" />} title="Optimize Installation Area">
          Develop a code-based approach to calculate the optimal installation area for solar panels, ensuring maximum energy generation.
        </ObjectiveCard>
        <ObjectiveCard icon={<Sun className="text-[#667eea]" />} title="Apply ASHRAE Model">
          Leverage the ASHRAE model to accurately assess direct, diffuse, and reflected solar radiation for different regions.
        </ObjectiveCard>
        <ObjectiveCard icon={<Globe className="text-[#667eea]" />} title="Reduce Carbon Footprint">
          Contribute to sustainable energy solutions by optimizing solar power generation across diverse environmental conditions in India.
        </ObjectiveCard>
        <ObjectiveCard icon={<DollarSign className="text-[#667eea]" />} title="Maximize Cost Savings">
          Provide data-driven recommendations to improve the efficiency of solar energy systems based on location-specific parameters.
        </ObjectiveCard>
      </div>
    </section>
  );
};

export default Objectives;