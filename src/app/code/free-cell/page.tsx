"use client";
import { CARD_ICONS } from "@/app/code/free-cell/@types";
import Card from "@/app/code/free-cell/components/Card";
import Layout from "@/layouts/Layout";
import useFreeCellStore, { FreeCellStoreType } from "@/stores/useFreeCellStore";
import useThemeStore from "@/stores/useThemeStore";

export default function FreeCell() {
  const {
    game: { foundationPiles, freeCells },
  } = useFreeCellStore((store: FreeCellStoreType) => ({
    game: store.game,
  }));

  return (
    <Layout blankBackground>
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
    </Layout>
  );
}
