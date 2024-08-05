import { CARD_ICONS,  SuitType } from "@/app/code/free-cell/@types";

export default function Card({
  suit,
  rank,
}: {
  suit?: SuitType;
  rank?: number;
  
}) {
  return (
    <div className="aspect-[3/4]">
      {suit && CARD_ICONS[suit]}
    </div>
  );
}
