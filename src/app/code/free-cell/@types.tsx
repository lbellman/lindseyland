import { Club, Diamond, Heart, Spade } from "lucide-react";

export type SuitType = "hearts" | "diamonds" | "spades" | "clubs";

export const SUITS = {
  hearts: "hearts",
  diamonds: "diamonds",
  spades: "spades",
  clubs: "clubs",
};

export type CardType = {
  sortOrder: number | null;
  suit: SuitType;
  rank: number;
  // columnIndex: number | null;
  // freeCellIndex: number | null;
  // foundationSuit: SuitType | null;
};

export type FoundationPileType = {
  suit: SuitType;
  cards: CardType[];
};

export type ColumnType = {
  index: number;
  cards: CardType[];
};

export type FreeCellType = {
  index: number;
  card: CardType | null;
};

export type GameType = {
  foundationPiles: FoundationPileType[];
  columns: ColumnType[];
  freeCells: FreeCellType[];
};

const iconClass = "text-primary-foreground";

export const CARD_ICONS = {
  hearts: <Heart className={iconClass} />,
  spades: <Spade className={iconClass} />,
  clubs: <Club className={iconClass} />,
  diamonds: <Diamond className={iconClass} />,
};
