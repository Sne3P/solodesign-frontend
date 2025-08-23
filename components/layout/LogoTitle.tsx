import { motion } from 'framer-motion';

const LogoTitle = () => {
  return (
    <motion.div
      className='fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference'
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
    >
      <div className='flex justify-between items-center max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-2xl font-bold flex items-center space-x-2 text-white'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: 'spring',
            stiffness: 100,
            damping: 10,
          }}
        >
          {/* Petite animation sur le point du logo */}
          <motion.div
            className='w-3 h-3 bg-white rounded-full'
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span>Solo Design</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LogoTitle;
