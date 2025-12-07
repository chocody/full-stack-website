import type { GameTile } from '../types/game';

// Generate 100 tiles for the board
export function generateBoard(): GameTile[] {
  const tiles: GameTile[] = [];
  
  for (let i = 0; i < 100; i++) {
    const rand = Math.random();
    let tile: GameTile;

    if (rand < 0.05) {
      // 5% chance: Special tile that moves you forward
      const bonusAmount = Math.floor(Math.random() * 20) + 5;
      tile = {
        id: i,
        type: 'special',
        bonus: bonusAmount,
        description: `🚀 Jump forward ${bonusAmount} tiles!`,
      };
    } else if (rand < 0.1) {
      // 5% chance: Food shop
      tile = {
        id: i,
        type: 'food',
        description: '🍔 Food Shop - 1000 baht',
      };
    } else if (rand < 0.15) {
      // 5% chance: Treasure chest
      tile = {
        id: i,
        type: 'chest',
        description: '💎 Treasure Chest!',
      };
    } else {
      // Normal tile
      tile = {
        id: i,
        type: 'normal',
        description: `Tile ${i}`,
      };
    }

    tiles.push(tile);
  }

  return tiles;
}

// Get tile at specific position
export function getTileAt(board: GameTile[], position: number): GameTile | null {
  if (position < 0 || position >= board.length) return null;
  return board[position];
}

// Roll dice (1-6)
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Process tile interaction
export function processTileInteraction(tile: GameTile): {
  message: string;
  reward?: number;
  moveBonus?: number;
} {
  switch (tile.type) {
    case 'special':
      return {
        message: `🚀 You landed on a special tile! Move forward ${tile.bonus} more spaces!`,
        moveBonus: tile.bonus,
      };
    case 'food':
      return {
        message: '🍔 You found a food shop! Buy food for 1000 baht to heal.',
        reward: 0,
      };
    case 'chest':
      const treasureAmount = Math.floor(Math.random() * 3000) + 1000;
      return {
        message: `💎 You found treasure! +${treasureAmount} baht!`,
        reward: treasureAmount,
      };
    default:
      return {
        message: '✨ You landed on a normal tile.',
        reward: 0,
      };
  }
}
