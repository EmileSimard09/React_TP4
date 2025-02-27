import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { storageAccessTokenKey } from "../data_services/CustomAxios";
import {
  AppBar,
  Badge,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import BannerUserMenu from "./BannerUserMenu";

function Banner() {
  const navigate: NavigateFunction = useNavigate();
  const [regleOuvert, setRegleOuvert] = useState(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login/");
  };

  const handleRegleOuvert = (): void => {
    //setUserAnchorEl(null);
    setRegleOuvert(true);
  };

  const handleRegleFerme = (): void => {
    setRegleOuvert(false);
  };

  const handleEvaluationsClick = (): void => {
    navigate("/evals/");
  };

  return (
    <>
      <AppBar position="fixed">
        <Container component="nav" disableGutters={true}>
          <Toolbar>
            <Link
              color="inherit"
              onClick={handleHomeClick}
              sx={{ cursor: "pointer", flexGrow: 1, textDecoration: "none" }}
            >
              <Typography variant="h6">Le jeux de mémoire trop cool</Typography>
            </Link>
            <Link
              color="inherit"
              onClick={handleEvaluationsClick}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Évaluations
            </Link>
            <Link
              color="inherit"
              onClick={handleRegleOuvert}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Réglements
            </Link>
            {localStorage.getItem(storageAccessTokenKey) ? (
              <>
                <BannerUserMenu />
              </>
            ) : (
              <Link
                color="inherit"
                onClick={handleLoginClick}
                sx={{ cursor: "pointer", textDecoration: "none" }}
              >
                Se connecter
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        aria-describedby="about-dialog-description"
        aria-labelledby="about-dialog-title"
        onClose={handleRegleFerme}
        open={regleOuvert}
      >
        <DialogTitle id="about-dialog-title">Règle du jeux</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="about-dialog-description"
            variant="body2"
            textAlign="justify"
          >
            Le Jeu de Mémoire Trop Cool se joue en solo et consiste à retrouver
            toutes les paires d'images cachées sur une grille. Au début de la
            partie, toutes les cartes sont disposées face cachée. Le joueur
            retourne deux cartes à chaque tour : si elles forment une paire
            identique, elles restent visibles ; sinon, elles sont remises face
            cachée. Le but est de mémoriser l’emplacement des cartes pour
            retrouver toutes les paires le plus rapidement possible. La partie
            se termine lorsque toutes les paires ont été trouvées. Ce jeu
            ludique et stimulant aide à améliorer la mémoire et la concentration
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button
            autoFocus
            color="primary"
            onClick={handleRegleFerme}
            size="small"
            variant="outlined"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Banner;
