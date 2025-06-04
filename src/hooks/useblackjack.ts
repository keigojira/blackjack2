import { useState, useEffect } from 'react';
import { Card, Player, GameState } from '../types/game';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

const calculateScore = (cards: Card[]): number => {
  let score = 0;
  let aceCount = 0;

  for (const card of cards) {
    if (card.value === 'A') {
      aceCount++;
      score += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
};

export const useBlackjack = (playerCount: number) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [dealer, setDealer] = useState<Player>({
    name: 'Dealer',
    cards: [],
    bet: 0,
    score: 0,
    isStanding: false,
    isBusted: false,
    chips: 0,
  });
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const newDeck = createDeck();
    const initialPlayers = Array.from({ length: playerCount }, (_, i) => ({
      name: `Player ${i + 1}`,
      cards: [newDeck.pop()!, newDeck.pop()!],
      bet: 100,
      score: 0,
      isStanding: false,
      isBusted: false,
      chips: 1000,
    })).map(p => ({ ...p, score: calculateScore(p.cards) }));

    const initialDealer = {
      ...dealer,
      cards: [newDeck.pop()!, { ...newDeck.pop()!, isFaceDown: true }],
    };

    setDeck(newDeck);
    setPlayers(initialPlayers);
    setDealer(initialDealer);
    setCurrentTurn(0);
    setGameOver(false);
  }, [playerCount]);

  const hit = () => {
    const newDeck = [...deck];
    const newPlayers = [...players];
    const player = newPlayers[currentTurn];
    player.cards.push(newDeck.pop()!);
    player.score = calculateScore(player.cards);

    if (player.score > 21) {
      player.isBusted = true;
      player.isStanding = true;
      nextTurn(newPlayers);
    }

    setDeck(newDeck);
    setPlayers(newPlayers);
  };

  const stand = () => {
    const newPlayers = [...players];
    newPlayers[currentTurn].isStanding = true;
    nextTurn(newPlayers);
  };

  const nextTurn = (newPlayers: Player[]) => {
    let next = currentTurn + 1;
    while (next < newPlayers.length && newPlayers[next].isStanding) {
      next++;
    }

    if (next >= newPlayers.length) {
      dealerPlay(newPlayers);
    } else {
      setCurrentTurn(next);
      setPlayers(newPlayers);
    }
  };

  const dealerPlay = (finalPlayers: Player[]) => {
    const newDeck = [...deck];
    const dealerCards = [dealer.cards[0], newDeck.pop()!];
    let dealerScore = calculateScore(dealerCards);

    while (dealerScore < 17) {
      dealerCards.push(newDeck.pop()!);
      dealerScore = calculateScore(dealerCards);
    }

    const updatedDealer = {
      ...dealer,
      cards: dealerCards,
      score: dealerScore,
      isStanding: true,
      isBusted: dealerScore > 21,
    };

    setDealer(updatedDealer);
    setGameOver(true);
    setDeck(newDeck);
    setPlayers(finalPlayers);
  };

  return { players, dealer, currentTurn, gameOver, hit, stand };
};
