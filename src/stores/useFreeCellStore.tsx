"use client";
import { create } from "zustand";
import {
  CardType,
  GameType,
  SUITS,
  SuitType,
} from "@/app/code/free-cell/@types";

export type FreeCellStoreType = {
  game: GameType;
  setGame: (game: GameType) => void;
};

// Create Deck
const deck: CardType[] = [];
Object.values(SUITS).forEach((suit) => {
  for (let i = 0; i < 13; i++) {
    deck.push({
      suit: suit as SuitType,
      rank: i + 1,
      sortOrder: null,
      columnIndex: null,
      freeCellIndex: null,
      foundationSuit: null,
    });
  }
});

// Shuffle Deck
for (let i = 0; i < deck.length; i++) {
  // Generate a random number between 1 and 52
  const random = Math.floor(Math.random() * 52);

  // Swap this card with the random generate index
  const temp = deck[random];
  deck[random] = deck[i];
  deck[i] = temp;
}

const getColumns = () => {
  const columns = [];
  for (let columnIdx = 0; columnIdx < 8; columnIdx++) {
    const numCards = columnIdx < 4 ? 7 : 6;

    const startIdx = columnIdx * numCards;
    const endIdx = (columnIdx + 1) * numCards;

    columns.push({
      index: columnIdx,
      cards: deck
        .slice(startIdx, endIdx)
        .map((card, sortOrder) => {
          return {
            sortOrder,
            suit: card.suit,
            rank: card.rank,
            columnIndex: columnIdx,
            freeCellIndex: null,
            foundationSuit: null,
          };
        }),
    });
  }
  console.log("Columns", columns);
  return columns;
};

const useFreeCellStore = create<FreeCellStoreType>((set) => ({
  game: {
    foundationPiles: [
      {
        suit: "hearts",
        cards: [],
      },
      {
        suit: "spades",
        cards: [],
      },
      {
        suit: "clubs",
        cards: [],
      },
      {
        suit: "diamonds",
        cards: [],
      },
    ],
    freeCells: [
      {
        index: 1,
        card: null,
      },
      {
        index: 2,
        card: null,
      },
      {
        index: 3,
        card: null,
      },
      {
        index: 4,
        card: null,
      },
    ],
    columns: getColumns(),
  },
  setGame: (game: GameType) => set({ game }),
}));

export default useFreeCellStore;
