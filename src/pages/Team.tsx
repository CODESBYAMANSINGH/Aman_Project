import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
  name: "Dr. A. K. Tiwari",
  image: "/AK-TIWARI.jpg",
  title: "Professor (HAG)",
};

const teamMembers = [
  { name: "Aman Singh Thakur", roll: "22119009" },
  { name: "Anmol kumar Jaiswal", roll: "22119906" },
  { name: "Sonali Singh", roll: "22119096" },
];

const TeamPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-white mb-10"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
      >
        Meet the Team
      </motion.h2>
      <motion.div variants={itemVariants} className="w-full max-w-5xl">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white shadow-2xl">
          <CardContent className="p-12 flex flex-col md:flex-row items-center gap-10">
            <Avatar className="w-56 h-56 border-4 border-yellow-300 flex-shrink-0">
              <AvatarImage src={mentor.image} alt={mentor.name} className="object-cover" />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-bold">{mentor.name}</h3>
              <p className="text-xl text-yellow-300 mt-1">{mentor.title}</p>
              <p className="text-white/80 mt-4 text-lg">
                Guiding our project with expertise and vision.
              </p>
            </div>
          </CardContent>
          <Separator className="bg-white/20" />
          <CardContent className="p-12">
            <h4 className="text-3xl font-semibold text-center mb-8">
              Project Members
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {teamMembers.map((member) => (
                <div key={member.name} className="p-4 bg-black/20 rounded-lg">
                  <p className="font-bold text-xl">{member.name}</p>
                  <p className="text-white/70 mt-1">{member.roll}</p>
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