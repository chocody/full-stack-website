export interface GameTile {
  id: number;
  type: 'normal' | 'special' | 'food' | 'chest';
  bonus?: number; // bonus tiles that move you forward
  description: string;
}

export interface Player {
  position: number;
  money: number;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  cost: number;
  effect?: 'move_forward' | 'extra_roll' | 'heal';
  amount?: number;
}

export interface GameState {
  player: Player;
  currentTile: GameTile | null;
  diceResult: number | null;
  gameMessage: string;
  canRoll: boolean;
}
