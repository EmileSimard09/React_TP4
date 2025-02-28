import { Property } from "csstype";
import { Card, CardActionArea } from "@mui/material";

type PlayingCardSideProps = {
  bgColor?: Property.BackgroundColor;
  imagePath?: string;
  onClick?: () => void;
  isImage?: boolean;
  emoji?: string;
};

export default function PlayingCardSide({
  bgColor,
  imagePath,
  onClick,
  isImage = false,
  emoji,
}: PlayingCardSideProps) {
  return (
    <Card onClick={onClick}>
      <CardActionArea
        sx={{
          alignItems: "center",
          backgroundColor: bgColor,
          display: "flex",
          fontSize: 24,
          height: 100,
          justifyContent: "center",
        }}
      >
        {isImage && imagePath ? (
          <img
            src={imagePath.replace("../../public", "")} 
            alt="Playing Card"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          emoji
        )}
      </CardActionArea>
    </Card>
  );
}
