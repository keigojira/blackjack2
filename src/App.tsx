import React, { useState } from 'react';
import { useBlackjack } from './hooks/useBlackjack';
import { PlayerInfo } from './components/PlayerInfo';
import { ControlPanel } from './components/ControlPanel';
import './styles.css';

const App: React.FC = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const { players, dealer, currentTurn, gameOver, hit, stand } = useBlackjack(playerCount || 1);

  if (playerCount === null) {
    return (
      <div className="setup">
        <h1>Blackjack Setup</h1>
        <p>How many players? (1 to 10)</p>
        {[...Array(10)].map((_, i) => (
          <button key={i} onClick={() => setPlayerCount(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="game">
      <h1>Blackjack</h1>
      <div className="dealer">
        <PlayerInfo player={dealer} isDealer />
      </div>
      <div className="players">
        {players.map((player, index) => (
          <PlayerInfo
            key={index}
            player={player}
            isActive={index === currentTurn && !gameOver}
          />
        ))}
      </div>
      {!gameOver && (
        <ControlPanel
          onHit={hit}
          onStand={stand}
          disabled={players[currentTurn]?.isStanding || players[currentTurn]?.isBusted}
        />
      )}
      {gameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default App;
