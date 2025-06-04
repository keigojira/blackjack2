import React from 'react';
import { Card as CardType } from '../types/game';

interface Props {
  card: CardType;
}

export const Card: React.FC<Props> = ({ card }) => {
  const display = card.isFaceDown ? '🂠' : `${card.value}${card.suit}`;
  return <div className="card">{display}</div>;
};
