const Step = ({ number, children }: { number: number, children: React.ReactNode }) => (
    <div className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border-l-4 border-[#764ba2] border-white/20 transition-all duration-300 hover:bg-[#667eea]/10 hover:translate-x-4 hover:border-l-8">
        <div className="flex-shrink-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">
            {number}
        </div>
        <p className="text-[#b8c5ff] pt-2">{children}</p>
    </div>
);

const Methodology = () => {
  return (
    <section className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 animate-fade-in-up hover:shadow-[#667eea]/30 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-4xl font-bold mb-8 pb-4 border-b-2 border-[#764ba2]/50 text-gradient">
        Methodology
      </h2>
      <div className="flex flex-col gap-6">
        <Step number={1}>
          <strong>Literature Review:</strong> Conduct a comprehensive review of existing studies on solar radiation, tilt angles, and installation area optimization.
        </Step>
        <Step number={2}>
          <strong>Data Collection:</strong> Gather solar radiation data for different climatic zones in India from reliable meteorological sources.
        </Step>
        <Step number={3}>
          <strong>Model Implementation:</strong> Implement the ASHRAE model in code to calculate solar irradiance on tilted surfaces.
        </Step>
        <Step number={4}>
          <strong>Optimization Algorithm:</strong> Develop an algorithm to iterate through various tilt angles and determine the optimal angle for each location.
        </Step>
        <Step number={5}>
          <strong>Analysis and Validation:</strong> Analyze the results to provide recommendations and validate the findings against existing research.
        </Step>
      </div>
    </section>
  );
};

export default Methodology;