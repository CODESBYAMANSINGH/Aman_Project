const ZoneCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-[#667eea]/30 transition-all duration-400 hover:bg-[#667eea]/15 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-[#764ba2]/40">
        <h4 className="text-xl font-bold text-[#667eea] mb-3">{title}</h4>
        <p className="text-[#b8c5ff]">{children}</p>
    </div>
);

const ClimaticZones = () => {
  return (
    <section className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 animate-fade-in-up hover:shadow-[#667eea]/30 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-4xl font-bold mb-8 pb-4 border-b-2 border-[#764ba2]/50 text-gradient">
        Climatic Zones of India
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ZoneCard title="Hot and Dry">
          Characterized by high daytime temperatures, low humidity, and clear skies. Solar optimization is crucial for cooling needs.
        </ZoneCard>
        <ZoneCard title="Warm and Humid">
          Features high humidity and temperatures. Panel efficiency can be affected by heat, requiring specific tilt strategies.
        </ZoneCard>
        <ZoneCard title="Composite">
          A mix of hot/dry and warm/humid seasons. Requires adaptable solar solutions for year-round efficiency.
        </ZoneCard>
        <ZoneCard title="Temperate">
          Moderate temperatures and humidity. Solar generation is generally stable but requires seasonal tilt adjustments.
        </ZoneCard>
        <ZoneCard title="Cold">
          Low temperatures and significant snowfall in winter. Panels need steep angles to shed snow and capture low-angle sun.
        </ZoneCard>
        <ZoneCard title="Mountainous">
          High altitude, intense solar radiation, but complex terrain. Site-specific analysis is key.
        </ZoneCard>
      </div>
    </section>
  );
};

export default ClimaticZones;