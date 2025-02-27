import { useState, useEffect } from "react";
import {
  Container,
  Grid2,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import IPlayingCard from "../data_interfaces/IPlayingCard";
import PlayingCard from "./PlayingCard";
import { storageAccessTokenKey } from "../data_services/CustomAxios";
import add from "../data_services/PartieJoueeDS";
import IPartieJouee from "../data_interfaces/IPartieJouee";
import { storageUsernameRealKey } from "../data_services/CustomAxios";

const images = import.meta.glob("../../public/cards-images/*.jpg");

const selectRandomImages = (count: number) => {
  const shuffled = Object.keys(images).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const createShuffledCards = (imageCount: number) => {
  const selectedImages = selectRandomImages(imageCount);
  return [...selectedImages, ...selectedImages]
    .sort(() => Math.random() - 0.5)
    .map(
      (imagePath, index) =>
        ({
          id: index,
          imagePath,
          flipped: false,
          matched: false,
        } as IPlayingCard)
    );
};

const gameLevels = {
  "4x3": { rows: 4, cols: 3, cards: 6 },
  "4x4": { rows: 4, cols: 4, cards: 8 },
  "5x4": { rows: 5, cols: 4, cards: 10 },
  "6x4": { rows: 6, cols: 4, cards: 12 },
  "6x5": { rows: 6, cols: 5, cards: 15 },
  "6x6": { rows: 6, cols: 6, cards: 18 },
};

export default function MemoryGame() {
  const [gameLevel, setGameLevel] = useState<keyof typeof gameLevels>("4x4");
  const [cards, setCards] = useState<IPlayingCard[]>(
    createShuffledCards(gameLevels[gameLevel].cards)
  );
  const [selectedCards, setSelectedCards] = useState<IPlayingCard[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [cardBackColor, setCardBackColor] = useState<string>("ghostwhite");
  const [partieFin, setPartieFin] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const isUserConnected = Boolean(localStorage.getItem(storageUsernameRealKey));

  const handleGameSave = async (isTerminee: boolean) => {
    if (!isUserConnected) {
      console.log(
        "Utilisateur non connecté, session non ajoutée à l'historique"
      );
      return;
    }

    const partieJouee: Omit<IPartieJouee, "id" | "user"> = {
      date: new Date(),
      duree: timeSpent,
      niveau: gameLevel,
      tentatives: attempts,
      terminee: isTerminee,
    };

    try {
      await add.add(partieJouee);
      console.log(
        isTerminee
          ? "Session ajoutée à l'historique"
          : "Session sauvegardée avant fermeture"
      );
    } catch (error) {
      console.error("Erreur dans l'ajout de la session", error);
    }
  };

  useEffect(() => {
    const saveGameBeforeExit = () => {
      if (matches > 0) {
        handleGameSave(false);
      }
    };

    window.addEventListener("beforeunload", saveGameBeforeExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && matches > 0) {
        saveGameBeforeExit();
      }
    });

    return () => {
      window.removeEventListener("beforeunload", saveGameBeforeExit);
      document.removeEventListener("visibilitychange", saveGameBeforeExit);
    };
  }, [timeSpent, attempts, gameLevel, matches]);

  useEffect(() => {
    if (partieFin) {
      handleGameSave(true);
    }
  }, [partieFin]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!partieFin) {
        setTimeSpent((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [partieFin]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.imagePath === secondCard.imagePath) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, matched: true }
                : card
            )
          );
          setMatches((prev) => prev + 1);
        }, 600);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setAttempts((prev) => prev + 1);
      setSelectedCards([]);

      if (matches + 1 === gameLevels[gameLevel].cards) {
        setPartieFin(true);
      }
    }
  }, [cards, selectedCards]);

  const tryFlipCard = (cardToFlip: IPlayingCard) => {
    if (!cardToFlip.flipped && selectedCards.length < 2) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardToFlip.id ? { ...card, flipped: true } : card
        )
      );
      setSelectedCards((prev) => [...prev, cardToFlip]);
    }
  };

  const changeCardBackColor = (color: string) => {
    setCardBackColor(color);
  };

  const changeGameLevel = (level: keyof typeof gameLevels) => {
    setGameLevel(level);
    setCards(createShuffledCards(gameLevels[level].cards));
    setSelectedCards([]);
    setMatches(0);
    setAttempts(0);
  };

  const restartGame = () => {
    setCards(createShuffledCards(gameLevels[gameLevel].cards));
    setSelectedCards([]);
    setMatches(0);
    setAttempts(0);
    setPartieFin(false);
    setTimeSpent(0);
  };
  return (
    <Container maxWidth="md" sx={{ marginY: "1rem" }}>
      <Paper style={{ padding: "1rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Jeu de Mémoire
        </Typography>
        <Typography color="primary" variant="h6" sx={{ marginBottom: "1rem" }}>
          Tentatives : {attempts}
          <br />
          Paires trouvées : {matches}
          <br />
          Temps passé : {Math.floor(timeSpent / 60)}:
          {(timeSpent % 60).toString().padStart(2, "0")}
        </Typography>

        {partieFin ? (
          <div>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Félicitations ! Vous avez terminé le jeu en {attempts} tentatives.
            </Typography>
            <Button variant="contained" color="primary" onClick={restartGame}>
              Recommencer
            </Button>
          </div>
        ) : (
          <>
            {localStorage.getItem(storageAccessTokenKey) ? (
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="game-level-label">Niveau de jeu</InputLabel>
                <Select
                  labelId="game-level-label"
                  value={gameLevel}
                  label="Niveau de jeu"
                  onChange={(e) =>
                    changeGameLevel(e.target.value as keyof typeof gameLevels)
                  }
                >
                  {Object.keys(gameLevels).map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                Connectez-vous pour changer le niveau de jeu.
              </Typography>
            )}
            <div style={{ marginBottom: "1rem" }}>
              <Button
                onClick={() => changeCardBackColor("ghostwhite")}
                sx={{ backgroundColor: "ghostwhite", mr: 1 }}
              >
                Blanc
              </Button>
              <Button
                onClick={() => changeCardBackColor("#FDB7EA")}
                sx={{ backgroundColor: "#FDB7EA", mr: 1 }}
              >
                Rose
              </Button>
              <Button
                onClick={() => changeCardBackColor("#B7B1F2")}
                sx={{ backgroundColor: "#B7B1F2" }}
              >
                Mauve
              </Button>
            </div>
            <Grid2 container spacing={2} justifyContent="center">
              {cards.map((card) => (
                <Grid2
                  key={card.id}
                  size={{ xs: 12 / gameLevels[gameLevel].cols }}
                >
                  <PlayingCard
                    card={card}
                    onSelect={tryFlipCard}
                    cardBackColor={cardBackColor}
                  />
                </Grid2>
              ))}
            </Grid2>
          </>
        )}
      </Paper>
    </Container>
  );
}
