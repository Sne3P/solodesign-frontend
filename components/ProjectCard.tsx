import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={800}
          height={600}
          className="rounded-lg shadow-2xl object-cover"
        />
      </motion.div>
      <div className="w-full md:w-1/2 space-y-6">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {project.title}
        </motion.h2>
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {project.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            className="inline-block bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-colors duration-300 hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/project/${project.id}`)}
          >
            Voir le Projet
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
