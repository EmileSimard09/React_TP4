import ReactCardFlip from "react-card-flip";
import IPlayingCard from "../data_interfaces/IPlayingCard";
import PlayingCardSide from "./PlayingCardSide";

type PlayingCardProps = {
  card: IPlayingCard;
  onSelect?: (card: IPlayingCard) => void;
  cardBackColor?: string;
};

export default function PlayingCard({
  card,
  onSelect,
  cardBackColor,
}: PlayingCardProps) {
  const handleBackClick = () => {
    if (onSelect) {
      onSelect(card);
    }
  };

  return (
    <>
      {card.matched ? (
        <PlayingCardSide imagePath={card.imagePath} isImage={true} />
      ) : (
        <ReactCardFlip isFlipped={card.flipped}>
          <PlayingCardSide
            bgColor={cardBackColor}
            emoji="❓"
            onClick={handleBackClick}
          />
          <PlayingCardSide imagePath={card.imagePath} isImage={true} />
        </ReactCardFlip>
      )}
    </>
  );
}
