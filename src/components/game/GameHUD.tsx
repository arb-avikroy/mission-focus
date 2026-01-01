import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface GameHUDProps {
  lives: number;
  score: number;
}

export const GameHUD = ({ lives, score }: GameHUDProps) => {
  return (
    <motion.div 
      className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-card/95 to-transparent"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Lives */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ 
              scale: i < lives ? 1 : 0.8,
              opacity: i < lives ? 1 : 0.3,
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 500, 
              delay: i * 0.1,
            }}
          >
            <Heart 
              className={`w-6 h-6 ${i < lives ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Score */}
      <motion.div 
        className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-soft border border-border"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</span>
        <span className="font-mono text-lg font-bold text-primary tabular-nums">{score}</span>
      </motion.div>
    </motion.div>
  );
};
