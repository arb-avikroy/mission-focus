import { create } from 'zustand';

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hit?: boolean;
}

interface GameState {
  screen: 'start' | 'game' | 'result';
  lives: number;
  score: number;
  gameSpeed: number;
  playerX: number;
  obstacles: Obstacle[];
  isHit: boolean;
  gameAreaWidth: number;
  gameAreaHeight: number;
  
  // Actions
  setScreen: (screen: 'start' | 'game' | 'result') => void;
  startGame: () => void;
  loseLife: () => void;
  incrementScore: () => void;
  setPlayerX: (x: number) => void;
  movePlayer: (direction: 'left' | 'right') => void;
  addObstacle: (obstacle: Obstacle) => void;
  updateObstacles: (deltaTime: number) => void;
  removeObstacle: (id: number) => void;
  setGameArea: (width: number, height: number) => void;
  increaseSpeed: () => void;
  setIsHit: (isHit: boolean) => void;
  resetGame: () => void;
}

const PLAYER_WIDTH = 60;
const PLAYER_SPEED = 12;
const INITIAL_GAME_SPEED = 1;
const SPEED_INCREMENT = 0.05;

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  lives: 3,
  score: 0,
  gameSpeed: INITIAL_GAME_SPEED,
  playerX: 50,
  obstacles: [],
  isHit: false,
  gameAreaWidth: 400,
  gameAreaHeight: 600,

  setScreen: (screen) => set({ screen }),
  
  startGame: () => set({
    screen: 'game',
    lives: 3,
    score: 0,
    gameSpeed: INITIAL_GAME_SPEED,
    playerX: 50,
    obstacles: [],
    isHit: false,
  }),

  loseLife: () => {
    const { lives } = get();
    const newLives = lives - 1;
    set({ lives: newLives, isHit: true });
    
    setTimeout(() => set({ isHit: false }), 300);
    
    if (newLives <= 0) {
      setTimeout(() => set({ screen: 'result' }), 500);
    }
  },

  incrementScore: () => set((state) => ({ score: state.score + 1 })),

  setPlayerX: (x) => set({ playerX: Math.max(0, Math.min(100, x)) }),

  movePlayer: (direction) => {
    const { playerX, gameAreaWidth } = get();
    const movePercent = (PLAYER_SPEED / gameAreaWidth) * 100;
    const newX = direction === 'left' 
      ? Math.max(0, playerX - movePercent * 2)
      : Math.min(100, playerX + movePercent * 2);
    set({ playerX: newX });
  },

  addObstacle: (obstacle) => set((state) => ({
    obstacles: [...state.obstacles, obstacle],
  })),

  updateObstacles: (deltaTime) => {
    const { obstacles, gameSpeed, gameAreaHeight, playerX, lives } = get();
    const playerY = gameAreaHeight - 80;
    
    const updatedObstacles = obstacles
      .map((obs) => ({
        ...obs,
        y: obs.y + obs.speed * gameSpeed * deltaTime,
      }))
      .filter((obs) => obs.y < gameAreaHeight + 50);

    // Collision detection
    const playerLeft = (playerX / 100) * get().gameAreaWidth - PLAYER_WIDTH / 2;
    const playerRight = playerLeft + PLAYER_WIDTH;
    const playerTop = playerY;
    const playerBottom = playerY + 40;

    let collision = false;
    updatedObstacles.forEach((obs) => {
      const obsLeft = obs.x;
      const obsRight = obs.x + obs.width;
      const obsTop = obs.y;
      const obsBottom = obs.y + obs.height;

      if (
        playerLeft < obsRight &&
        playerRight > obsLeft &&
        playerTop < obsBottom &&
        playerBottom > obsTop &&
        !obs.hit
      ) {
        collision = true;
        obs.hit = true;
      }
    });

    if (collision && lives > 0) {
      get().loseLife();
    }

    set({ obstacles: updatedObstacles });
  },

  removeObstacle: (id) => set((state) => ({
    obstacles: state.obstacles.filter((obs) => obs.id !== id),
  })),

  setGameArea: (width, height) => set({ gameAreaWidth: width, gameAreaHeight: height }),

  increaseSpeed: () => set((state) => ({
    gameSpeed: state.gameSpeed + SPEED_INCREMENT,
  })),

  setIsHit: (isHit) => set({ isHit }),

  resetGame: () => set({
    screen: 'start',
    lives: 3,
    score: 0,
    gameSpeed: INITIAL_GAME_SPEED,
    playerX: 50,
    obstacles: [],
    isHit: false,
  }),
}));
