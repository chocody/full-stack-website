import React, { useState, useEffect } from 'react';
import type { GameTile, GameState } from '../types/game';
import { generateBoard, rollDice, processTileInteraction, getTileAt } from '../utils/gameLogic';
import GameBoard from './GameBoard';
import PlayerStats from './PlayerStats';
import GameControls from './GameControls';
import '../styles/Game.css';

const Game: React.FC = () => {
  const [board, setBoard] = useState<GameTile[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    player: {
      position: 0,
      money: 5000,
      inventory: [],
    },
    currentTile: null,
    diceResult: null,
    gameMessage: 'Welcome! Click "Roll Dice" to start your adventure.',
    canRoll: true,
  });

  // Initialize board on mount
  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
  }, []);

  const handleRollDice = () => {
    if (!gameState.canRoll || board.length === 0) return;

    const diceRoll = rollDice();
    let newPosition = gameState.player.position + diceRoll;
    let moveBonus = 0;
    let reward = 0;
    let message = `🎲 Rolled: ${diceRoll}`;

    // Check if we go past the finish line
    if (newPosition >= 100) {
      newPosition = 100;
      message = `🎉 You reached the finish line! GAME WON!`;
      setGameState((prev) => ({
        ...prev,
        player: { ...prev.player, position: newPosition },
        diceResult: diceRoll,
        gameMessage: message,
        canRoll: false,
      }));
      return;
    }

    // Process tile interaction
    const tile = getTileAt(board, newPosition);
    if (tile) {
      const interaction = processTileInteraction(tile);
      message += `\n${interaction.message}`;
      moveBonus = interaction.moveBonus || 0;
      reward = interaction.reward || 0;
    }

    newPosition += moveBonus;
    if (newPosition >= 100) newPosition = 100;

    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        position: newPosition,
        money: prev.player.money + reward,
      },
      currentTile: tile || null,
      diceResult: diceRoll,
      gameMessage: message,
      canRoll: false,
    }));

    // Allow next roll after a delay
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, canRoll: true }));
    }, 1500);
  };

  const handleBuyFood = () => {
    if (gameState.player.money >= 1000) {
      setGameState((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          money: prev.player.money - 1000,
          inventory: [
            ...prev.player.inventory,
            { id: Date.now().toString(), name: 'Food', cost: 1000 },
          ],
        },
        gameMessage: '🍔 You bought food! +1000 baht spent. Feel energized!',
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        gameMessage: '❌ Not enough money! Need 1000 baht.',
      }));
    }
  };

  const handleReset = () => {
    setGameState({
      player: {
        position: 0,
        money: 5000,
        inventory: [],
      },
      currentTile: null,
      diceResult: null,
      gameMessage: 'Game reset! Click "Roll Dice" to start again.',
      canRoll: true,
    });
  };

  return (
    <div className="game-container">
      <h1>🎲 Board Game Quest</h1>
      <div className="game-content">
        <div className="game-left">
          <PlayerStats player={gameState.player} position={gameState.player.position} totalTiles={100} />
          <GameControls
            canRoll={gameState.canRoll}
            diceResult={gameState.diceResult}
            onRoll={handleRollDice}
            onBuyFood={handleBuyFood}
            onReset={handleReset}
            currentTile={gameState.currentTile}
          />
          <div className="game-message">
            <p>{gameState.gameMessage}</p>
          </div>
        </div>
        <div className="game-right">
          <GameBoard board={board} playerPosition={gameState.player.position} />
        </div>
      </div>
    </div>
  );
};

export default Game;
