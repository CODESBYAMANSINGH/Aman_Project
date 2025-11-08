import React, { useEffect, useState } from 'react';

const Star = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute bg-white rounded-full animate-twinkle" style={style} />
);

const Background = () => {
  const [stars, setStars] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }).map(() => {
        const size = Math.random() * 2 + 1;
        return {
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
        };
      });
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {stars.map((style, i) => (
          <Star key={i} style={style} />
        ))}
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[1] opacity-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[radial-gradient(circle,#ffd700,#ff8c00)] rounded-full shadow-[0_0_60px_#ffd700,0_0_100px_#ff8c00] animate-pulse" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] border border-white/10 rounded-full">
          <div className="absolute top-0 left-1/2 -ml-2.5 -mt-2.5 w-5 h-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff6b6b,#c92a2a)] animate-orbit-1" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-white/10 rounded-full">
          <div className="absolute top-0 left-1/2 -ml-4 -mt-4 w-8 h-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,#4dabf7,#1971c2)] animate-orbit-2" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/10 rounded-full">
          <div className="absolute top-0 left-1/2 -ml-2.5 -mt-2.5 w-5 h-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#51cf66,#2f9e44)] animate-orbit-3" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/10 rounded-full">
          <div className="absolute top-0 left-1/2 -ml-3 -mt-3 w-6 h-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffd43b,#f59f00)] animate-orbit-4" />
        </div>
      </div>
    </>
  );
};

export default Background;