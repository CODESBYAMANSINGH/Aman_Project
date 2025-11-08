const LandingPage = () => {
  return (
    <section className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 animate-fade-in-up hover:shadow-[#667eea]/30 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-4xl font-bold mb-6 pb-4 border-b-2 border-[#764ba2]/50 text-gradient">
        Welcome
      </h2>
      <p className="text-[#b8c5ff] text-lg leading-relaxed">
        This project showcases our work on optimizing solar panel setups for high energy efficiency in urban residences. We focus on enhancing energy output, tailoring solutions for city homes, and promoting sustainability.
      </p>
      <p className="text-[#b8c5ff] text-lg leading-relaxed mt-4">
        Use the navigation above or the "Next Page" button below to explore the different aspects of our project, from the introduction and objectives to the methodology and climatic zone analysis.
      </p>
    </section>
  );
};

export default LandingPage;