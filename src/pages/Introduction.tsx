const InfoBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-[#667eea]/10 border-l-4 border-[#667eea] p-6 rounded-lg my-4 border-white/30 transition-all duration-300 hover:bg-[#667eea]/20 hover:translate-x-2">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#b8c5ff]">{children}</p>
    </div>
);

const Introduction = () => {
  return (
    <section className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 animate-fade-in-up hover:shadow-[#667eea]/30 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-4xl font-bold mb-6 pb-4 border-b-2 border-[#764ba2]/50 text-gradient">
        Introduction
      </h2>
      <p className="text-[#b8c5ff] text-lg">Our project aims to optimize the solar panel setup for high energy efficiency in High-Income Group (HIG) houses, focusing on three key aspects:</p>
      
      <div className="mt-8">
        <InfoBox title="🎯 Energy Efficiency">
          Enhancing solar panel output by optimizing tilt angle based on geographical location and climatic conditions.
        </InfoBox>
        <InfoBox title="🏙️ Urban Applicability">
          Tailoring solutions to meet the specific needs of urban residences and high-income group housing.
        </InfoBox>
        <InfoBox title="🌱 Sustainability">
          Reducing the carbon footprint of residential buildings in high-income urban areas through optimized solar energy utilization.
        </InfoBox>
      </div>
    </section>
  );
};

export default Introduction;