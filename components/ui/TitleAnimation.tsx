import { motion } from 'framer-motion';

interface TitleAnimationProps {
  texte: string;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({ texte }) => (
  <motion.h1 className="text-5xl md:text-7xl font-bold relative">
    {texte.split('').map((char, index) => (
      <motion.span
        key={index}
        className="inline-block relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: index * 0.05,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        whileHover={{
          scale: 1.2,
          rotate: Math.random() * 30 - 15,
          transition: { duration: 0.2 },
        }}
      >
        {char}
        <motion.div
          className="absolute -z-10 w-full h-full bg-gradient-to-r from-gray-300 to-white opacity-0"
          whileHover={{
            opacity: 0.6,
            transition: { duration: 0.2 },
          }}
        />
      </motion.span>
    ))}
  </motion.h1>
);

export default TitleAnimation;
