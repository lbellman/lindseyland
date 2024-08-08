/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CardType = {
  __typename?: 'CardType';
  pile?: Maybe<PileType>;
  rank: FreecellCardRankChoices;
  sortOrder?: Maybe<Scalars['Int']['output']>;
  suit: FreecellCardSuitChoices;
};

export type CreateFreeCellGame = {
  __typename?: 'CreateFreeCellGame';
  game?: Maybe<GameType>;
};

/** An enumeration. */
export enum FreecellCardRankChoices {
  /** Ace */
  Ace = 'ACE',
  /** Eight */
  Eight = 'EIGHT',
  /** Five */
  Five = 'FIVE',
  /** Four */
  Four = 'FOUR',
  /** Jack */
  Jack = 'JACK',
  /** King */
  King = 'KING',
  /** Nine */
  Nine = 'NINE',
  /** Queen */
  Queen = 'QUEEN',
  /** Seven */
  Seven = 'SEVEN',
  /** Six */
  Six = 'SIX',
  /** Ten */
  Ten = 'TEN',
  /** Three */
  Three = 'THREE',
  /** Two */
  Two = 'TWO'
}

/** An enumeration. */
export enum FreecellCardSuitChoices {
  /** Clubs */
  Clubs = 'CLUBS',
  /** Diamonds */
  Diamonds = 'DIAMONDS',
  /** Hearts */
  Hearts = 'HEARTS',
  /** Spades */
  Spades = 'SPADES'
}

/** An enumeration. */
export enum FreecellGameStatusChoices {
  /** In Progress */
  InProgress = 'IN_PROGRESS',
  /** Lost */
  Lost = 'LOST',
  /** Won */
  Won = 'WON'
}

/** An enumeration. */
export enum FreecellPileTypeChoices {
  /** Column */
  Column = 'COLUMN',
  /** Foundation */
  Foundation = 'FOUNDATION',
  /** Free Cell */
  FreeCell = 'FREE_CELL'
}

export type GameType = {
  __typename?: 'GameType';
  moveCount: Scalars['Int']['output'];
  piles?: Maybe<Array<Maybe<PileType>>>;
  status: FreecellGameStatusChoices;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<CreateFreeCellGame>;
};


export type MutationCreateGameArgs = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PileType = {
  __typename?: 'PileType';
  cards?: Maybe<Array<Maybe<CardType>>>;
  game: GameType;
  type: FreecellPileTypeChoices;
};

export type Query = {
  __typename?: 'Query';
  cards?: Maybe<Array<Maybe<CardType>>>;
  games?: Maybe<Array<Maybe<GameType>>>;
  piles?: Maybe<Array<Maybe<PileType>>>;
};

export type GamesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQueryQuery = { __typename?: 'Query', games?: Array<{ __typename?: 'GameType', status: FreecellGameStatusChoices, moveCount: number, piles?: Array<{ __typename?: 'PileType', type: FreecellPileTypeChoices, cards?: Array<{ __typename?: 'CardType', suit: FreecellCardSuitChoices, rank: FreecellCardRankChoices } | null> | null } | null> | null } | null> | null };


export const GamesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GamesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"moveCount"}},{"kind":"Field","name":{"kind":"Name","value":"piles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GamesQueryQuery, GamesQueryQueryVariables>;