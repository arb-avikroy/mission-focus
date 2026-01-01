import { motion } from 'framer-motion';
import type { Obstacle as ObstacleType } from '@/stores/gameStore';

interface ObstacleProps {
  obstacle: ObstacleType;
}

export const Obstacle = ({ obstacle }: ObstacleProps) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: obstacle.x,
        top: obstacle.y,
        width: obstacle.width,
        height: obstacle.height,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Obstacle body */}
      <div className="relative w-full h-full">
        {/* Glow */}
        <div className="absolute inset-0 bg-destructive/20 blur-md rounded" />
        
        {/* Main shape */}
        <div className="relative w-full h-full bg-gradient-to-b from-destructive to-destructive/80 rounded shadow-lg border border-destructive/50">
          {/* Inner details */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-destructive/50 rounded-sm" />
        </div>
      </div>
    </motion.div>
  );
};
