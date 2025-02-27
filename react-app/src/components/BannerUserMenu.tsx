import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  storageUsernameKey,
  unsetLocalToken,
} from "../data_services/CustomAxios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  InfoOutlined as InfoOutlinedIcon,
  Logout as LogoutIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UserDS from "../data_services/UserDS";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function BannerUserMenu(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(e.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  };

  const handleOpenAbout = (): void => {
    setUserAnchorEl(null);
    setAboutOpen(true);
  };

  const handleCloseAbout = (): void => {
    setAboutOpen(false);
  };

  const handleUserEditClick = (): void => {
    setUserAnchorEl(null);
    navigate("/user-edit/me/");
  };

  const handleLogoutClick = (): void => {
    setUserAnchorEl(null);
    navigate("/logout/");
  };

  const handleAddEval = (): void => {
    setUserAnchorEl(null);
    navigate("/AddEvals/");
  };

  const handleDeleteUser = (): void => {
    setUserAnchorEl(null);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = (): void => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = (): void => {
    UserDS.deleteUser()
      .then(() => {
        unsetLocalToken();
        localStorage.removeItem(storageUsernameKey);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting user account:", error);
      })
      .finally(() => {
        setDeleteDialogOpen(false);
      });
  };

  return (
    <>
      <Box>
        <Tooltip title={"Ouvrir le menu utilisateur"}>
          <IconButton
            aria-controls="user-menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenUserMenu}
            sx={{ px: 0 }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={userAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="user-menu-appbar"
          keepMounted
          onClose={handleCloseUserMenu}
          open={Boolean(userAnchorEl)}
          sx={{ mt: "30px" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {localStorage.getItem(storageUsernameKey) && (
            <MenuItem onClick={handleUserEditClick} sx={{ py: "4px" }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontSize: "0.95rem" }}>
                  {localStorage.getItem(storageUsernameKey)}
                </Typography>
              </ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleAddEval} sx={{ py: "4px" }}>
            <ListItemIcon>
              <StarHalfIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "0.95rem" }}>
                Ajouter une évaluation
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteUser} sx={{ py: "4px" }}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "0.95rem" }}>
                {"Supprimer le compte"}
              </Typography>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogoutClick} sx={{ py: "4px" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "0.95rem" }}>
                {"Se déconnecter"}
              </Typography>
            </ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        aria-describedby="about-dialog-description"
        aria-labelledby="about-dialog-title"
        onClose={handleCloseAbout}
        open={aboutOpen}
      >
        <DialogTitle id="about-dialog-title">À propos</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="about-dialog-description"
            variant="body2"
            textAlign="justify"
          >
            Rogatus ad ultimum admissusque in consistorium ambage nulla
            praegressa inconsiderate et leviter proficiscere inquit ut
            praeceptum est, Caesar sciens quod si cessaveris, et tuas et palatii
            tui auferri iubebo prope diem annonas. hocque solo contumaciter
            dicto subiratus abscessit nec in conspectum eius postea venit
            saepius arcessitus.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button
            autoFocus
            color="primary"
            onClick={handleCloseAbout}
            size="small"
            variant="outlined"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmer la suppression du compte"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BannerUserMenu;
