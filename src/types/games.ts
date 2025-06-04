export interface Card {
  suit: string;
  value: string;
  isFaceDown?: boolean;
}

export interface Player {
  name: string;
  cards: Card[];
  bet: number;
  score: number;
  isStanding: boolean;
  isBusted: boolean;
  chips: number;
}

export interface GameState {
  players: Player[];
  dealer: Player;
  deck: Card[];
  currentTurn: number;
  gameOver: boolean;
}
