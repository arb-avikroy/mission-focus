import { motion } from 'framer-motion';

interface PlayerProps {
  x: number;
  gameAreaWidth: number;
}

export const Player = ({ x, gameAreaWidth }: PlayerProps) => {
  const playerWidth = 60;
  const pixelX = (x / 100) * gameAreaWidth - playerWidth / 2;

  return (
    <motion.div
      className="absolute bottom-20 z-10"
      style={{ 
        left: pixelX,
        width: playerWidth,
      }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Player ship/avatar */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent/30 blur-lg rounded-full" />
        
        {/* Main body */}
        <div className="relative w-full h-10 bg-gradient-to-t from-accent to-accent/80 rounded-t-full rounded-b-lg shadow-glow">
          {/* Cockpit */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-foreground/20 rounded-full" />
          
          {/* Wings */}
          <div className="absolute -left-2 bottom-0 w-3 h-6 bg-accent/80 rounded-l-full" />
          <div className="absolute -right-2 bottom-0 w-3 h-6 bg-accent/80 rounded-r-full" />
          
          {/* Engine glow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent blur-md animate-pulse-slow" />
        </div>
      </div>
    </motion.div>
  );
};
