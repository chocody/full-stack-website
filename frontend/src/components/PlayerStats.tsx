import React from 'react';
import type { Player } from '../types/game';

interface PlayerStatsProps {
  player: Player;
  position: number;
  totalTiles: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, position, totalTiles }) => {
  const progressPercent = (position / totalTiles) * 100;

  return (
    <div className="player-stats">
      <h2>Player Stats</h2>
      <div className="stat-item">
        <label>💰 Money:</label>
        <span className="stat-value">{player.money} baht</span>
      </div>
      <div className="stat-item">
        <label>📍 Position:</label>
        <span className="stat-value">{position} / {totalTiles}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>
      <div className="inventory">
        <h3>Inventory ({player.inventory.length})</h3>
        {player.inventory.length === 0 ? (
          <p className="empty-inventory">No items yet</p>
        ) : (
          <ul>
            {player.inventory.map((item) => (
              <li key={item.id}>
                🍔 {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;
