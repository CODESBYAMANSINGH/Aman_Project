import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useOutletContext } from "react-router-dom";

type ContextType = { timeOfDay: "day" | "evening" | "night" };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const mentor = {
  name: "Dr. Anil Kr. Tiwari Sir",
  image: "/AK-TIWARI.jpg",
  title: "Professor (HAG)",
};

const teamMembers = [
  { name: "Aman Singh Thakur", roll: "22119009" },
  { name: "Anmol kumar Jaiswal", roll: "22119906" },
  { name: "Sonali Singh", roll: "22119096" },
];

const TeamPage = () => {
  const { timeOfDay } = useOutletContext<ContextType>();
  const isDay = timeOfDay === "day";

  const textColor = isDay ? "text-slate-800" : "text-white";
  const cardTextColor = isDay ? "text-slate-800" : "text-white";
  const cardSubTextColor = isDay ? "text-slate-700" : "text-white/80";
  const textShadow = isDay
    ? "1px 1px 2px rgba(0,0,0,0.2)"
    : "2px 2px 4px rgba(0,0,0,0.5)";
  const cardBg = isDay ? "bg-white/40" : "bg-black/20";
  const cardBorder = isDay ? "border-slate-300/50" : "border-white/20";
  const titleColor = isDay ? "text-yellow-600" : "text-yellow-300";
  const separatorBg = isDay ? "bg-slate-300/50" : "bg-white/20";
  const memberCardBg = isDay ? "bg-white/20" : "bg-black/20";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full h-full flex flex-col items-center justify-center transition-colors duration-[5000ms] ease-in-out"
    >
      <motion.h2
        variants={itemVariants}
        className={`text-4xl md:text-5xl font-bold ${textColor} mb-10`}
        style={{ textShadow }}
      >
        Meet the Team
      </motion.h2>
      <motion.div variants={itemVariants} className="w-full max-w-5xl">
        <Card
          className={`${cardBg} backdrop-blur-sm ${cardBorder} ${cardTextColor} shadow-2xl`}
        >
          <CardContent className="p-12 flex flex-col md:flex-row items-center gap-10">
            <Avatar className="w-56 h-56 border-4 border-yellow-400 flex-shrink-0">
              <AvatarImage
                src={mentor.image}
                alt={mentor.name}
                className="object-cover"
              />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h3 className={`text-4xl font-bold ${cardTextColor}`}>
                {mentor.name}
              </h3>
              <p className={`text-xl ${titleColor} mt-1`}>{mentor.title}</p>
              <p className={`${cardSubTextColor} mt-4 text-lg`}>
                Guiding our project with expertise and vision.
              </p>
            </div>
          </CardContent>
          <Separator className={separatorBg} />
          <CardContent className="p-12">
            <h4
              className={`text-3xl font-semibold text-center mb-8 ${cardTextColor}`}
            >
              Project Members
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className={`p-4 ${memberCardBg} rounded-lg`}
                >
                  <p className={`font-bold text-xl ${cardTextColor}`}>
                    {member.name}
                  </p>
                  <p
                    className={`${
                      isDay ? "text-slate-600" : "text-white/70"
                    } mt-1`}
                  >
                    {member.roll}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TeamPage;
