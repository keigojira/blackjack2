import React from 'react';
import { Player } from '../types/game';
import { Card } from './Card';

interface Props {
  player: Player;
  isDealer?: boolean;
  isActive?: boolean;
}

export const PlayerInfo: React.FC<Props> = ({ player, isDealer, isActive }) => {
  return (
    <div className={`player ${isActive ? 'active' : ''}`}>
      <h3>{player.name}</h3>
      <div className="hand">
        {player.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      <p>Score: {player.score}</p>
      <p>Chips: {player.chips}</p>
      {player.isBusted && <p className="busted">BUSTED!</p>}
    </div>
  );
};
