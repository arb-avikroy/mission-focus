import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { StartScreen } from '@/components/game/StartScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { ResultScreen } from '@/components/game/ResultScreen';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

const pageTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

const Index = () => {
  const { screen } = useGameStore();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <motion.div key="start" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <StartScreen />
          </motion.div>
        )}
        {screen === 'game' && (
          <motion.div key="game" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <GameScreen />
          </motion.div>
        )}
        {screen === 'result' && (
          <motion.div key="result" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ResultScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
