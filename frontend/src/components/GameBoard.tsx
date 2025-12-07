import React from 'react';
import type { GameTile } from '../types/game';

interface GameBoardProps {
  board: GameTile[];
  playerPosition: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, playerPosition }) => {
  const gridRows = 10;
  const gridCols = 10;

  const getTileDisplay = (tileId: number): React.ReactNode => {
    if (playerPosition === tileId) {
      return <span className="player-token">🧑</span>;
    }

    const tile = board[tileId];
    if (!tile) return null;

    switch (tile.type) {
      case 'special':
        return '🚀';
      case 'food':
        return '🍔';
      case 'chest':
        return '💎';
      default:
        return (tileId + 1).toString();
    }
  };

  return (
    <div className="game-board">
      <h3>Game Board (100 Tiles)</h3>
      <div className="board-grid">
        {Array.from({ length: gridRows }).map((_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: gridCols }).map((_, col) => {
              const tileId = row * gridCols + col;
              const isPlayerHere = playerPosition === tileId;
              return (
                <div
                  key={tileId}
                  className={`board-tile ${isPlayerHere ? 'player-tile' : ''}`}
                  title={board[tileId]?.description}
                >
                  {getTileDisplay(tileId)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="board-legend">
        <p>🧑 = Your position | 🚀 = Bonus tiles | 🍔 = Food shop | 💎 = Treasure</p>
      </div>
    </div>
  );
};

export default GameBoard;
