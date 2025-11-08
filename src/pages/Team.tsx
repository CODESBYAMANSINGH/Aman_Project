import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      className="w-full h-full flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-white mb-12"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
      >
        Our Team
      </motion.h2>

      <motion.div variants={itemVariants} className="mb-12">
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white text-center w-72">
          <CardHeader>
            <div className="flex justify-center">
              <Avatar className="w-32 h-32 border-4 border-yellow-300">
                <AvatarImage src={mentor.image} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl">{mentor.name}</CardTitle>
            <p className="text-white/80">{mentor.title}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-8 max-w-4xl"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.name} variants={itemVariants}>
            <Card className="bg-black/20 backdrop-blur-sm border-white/20 text-white text-center p-6">
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <p className="text-white/80 mt-1">{member.roll}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TeamPage;