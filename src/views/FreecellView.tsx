"use client";
import { GamesQueryQuery } from "@/__apolloGenerated__/graphql";
import { CARD_ICONS } from "@/app/code/free-cell/@types";
import Card from "@/app/code/free-cell/components/Card";
import { Button } from "@/components/ui/atoms/button";
import useFreeCellStore, { FreeCellStoreType } from "@/stores/useFreeCellStore";
import { gql, useMutation, useQuery } from "@apollo/client";

export default function FreecellView() {
  const {
    game: { foundationPiles, freeCells },
  } = useFreeCellStore((store: FreeCellStoreType) => ({
    game: store.game,
  }));
  const { data: gameData } = useQuery<GamesQueryQuery>(gql`
    query GamesQuery {
      games {
        status
        moveCount
        piles {
          type
          cards {
            suit
            rank
          }
        }
      }
    }
  `);

  const games = gameData?.games;
  const [createGame, { data, loading, error }] = useMutation(
    gql`
      mutation CreateGame($create: Boolean) {
        createGame(create: $create) {
          game {
            piles {
              type
              cards {
                suit
                rank
              }
            }
            status
            moveCount
          }
        }
      }
    `,
    {
      onCompleted: (data) => console.log("Complete!!", data),
    }
  );

  return games ? (
    <div className="flex flex-col p-lg w-full flex-nowrap">
      <div className="w-full">
        <div className="flex flex-nowrap justify-between w-full">
          {/* Foundation Piles */}
          <div className="w-1/3">
            <div className="grid grid-cols-4 gap-4">
              {foundationPiles.map((pile, idx) => {
                const visibleCard =
                  pile.cards.length == 0 ? null : pile.cards[-1];
                return (
                  <div key={pile.suit}>
                    {visibleCard ? (
                      <Card suit={visibleCard.suit} rank={visibleCard.rank} />
                    ) : (
                      <div className="aspect-[3/4] rounded-sm bg-card flex justify-center items-center">
                        {CARD_ICONS[pile.suit]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/3 ml-md">
            <div className="grid grid-cols-4 gap-4">
              {freeCells.map((cell, idx) => {
                const card = cell.card;
                return (
                  <div key={idx}>
                    {card ? (
                      <Card suit={card.suit} rank={card.rank} />
                    ) : (
                      <div className="aspect-[3/4] border rounded-sm" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-card rounded-md h-full p-xl items-center flex flex-col">
      <div className="flex items-center flex-nowrap mb-md">
        {Object.values(CARD_ICONS).map((icon, idx) => {
          return (
            <div
              key={idx}
              className={"text-primary " + (idx !== 0 ? "ml-md" : "")}
            >
              {icon}
            </div>
          );
        })}
      </div>
      <p className="subtitle1">Welcome to Free Cell!</p>
      <p>Create a new game to begin.</p>
      <div className="mt-lg">
        <Button
          variant={loading ? "outline" : "default"}
          onClick={() => createGame()}
        >
          New Game
        </Button>
      </div>
    </div>
  );
}
