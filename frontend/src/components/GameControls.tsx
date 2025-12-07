import React from 'react';
import type { GameTile } from '../types/game';

interface GameControlsProps {
  canRoll: boolean;
  diceResult: number | null;
  onRoll: () => void;
  onBuyFood: () => void;
  onReset: () => void;
  currentTile: GameTile | null;
}

const GameControls: React.FC<GameControlsProps> = ({
  canRoll,
  diceResult,
  onRoll,
  onBuyFood,
  onReset,
  currentTile,
}) => {
  const isFoodTile = currentTile?.type === 'food';

  return (
    <div className="game-controls">
      <h2>Controls</h2>
      <div className="controls-grid">
        <button
          className="btn btn-primary"
          onClick={onRoll}
          disabled={!canRoll}
        >
          {canRoll ? '🎲 Roll Dice' : 'Rolling...'}
        </button>
        {diceResult && (
          <div className="dice-result">
            Last Roll: <strong>{diceResult}</strong>
          </div>
        )}
      </div>
      {isFoodTile && (
        <button
          className="btn btn-success"
          onClick={onBuyFood}
        >
          🍔 Buy Food (1000 baht)
        </button>
      )}
      <button
        className="btn btn-secondary"
        onClick={onReset}
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default GameControls;
