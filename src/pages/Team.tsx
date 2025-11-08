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
  title: "Project Guide",
};

const teamMembers = [
  { name: "Aditya Dudhe", roll: "21119008" },
  { name: "Arikathota Karthik", roll: "21119023" },
  { name: "Abhishek Kumar Roy", roll: "21119006" },
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
        className="text-4xl font-bold text-white mb-8"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
      >
        Meet the Team
      </motion.h2>
      <motion.div variants={itemVariants} className="w-full max-w-4xl">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white shadow-2xl">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-40 h-40 border-4 border-yellow-300 flex-shrink-0">
              <AvatarImage src={mentor.image} alt={mentor.name} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold">{mentor.name}</h3>
              <p className="text-lg text-yellow-300">{mentor.title}</p>
              <p className="text-white/80 mt-2">
                Guiding our project with expertise and vision.
              </p>
            </div>
          </CardContent>
          <Separator className="bg-white/20" />
          <CardContent className="p-8">
            <h4 className="text-2xl font-semibold text-center mb-6">
              Project Members
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {teamMembers.map((member) => (
                <div key={member.name}>
                  <p className="font-bold text-lg">{member.name}</p>
                  <p className="text-white/70">{member.roll}</p>
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