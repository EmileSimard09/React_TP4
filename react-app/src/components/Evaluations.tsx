import { useEffect, useState } from "react";
import IEvaluation from "../data_interfaces/IEvaluation";
import EvaluationDS from "../data_services/EvaluationDS";
import Rating from "@mui/material/Rating";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { storageUsernameRealKey } from "../data_services/CustomAxios";
import DeleteIcon from "@mui/icons-material/Delete";

function Evaluations() {
  const [Evaluations, setEvaluations] = useState<IEvaluation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [evaluationADelete, setEvaluationADelete] =
    useState<IEvaluation | null>(null);
  const currentUsername = localStorage.getItem(storageUsernameRealKey);

  const handleDeleteClick = (evaluation: IEvaluation) => {
    setEvaluationADelete(evaluation);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (evaluationADelete) {
      EvaluationDS.deleteEvaluation(evaluationADelete.id)
        .then(() => {
          setEvaluations(
            Evaluations.filter(
              (evaluation) => evaluation.id !== evaluationADelete.id
            )
          );
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Échec de la suppression de l'évaluation", error);
          setOpenDialog(false);
        });
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false); // Close the dialog if user cancels
  };

  useEffect(() => {
    EvaluationDS.getAll().then((response) => {
      setEvaluations(response.data);
    });
  }, []);

  const EvaluationsTable = ({ Evaluations }) => {
    if (Evaluations.length === 0) {
      return (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Il n'y a pas d'évaluations pour le moment.
        </Typography>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table aria-label="evaluations table">
          <TableHead>
            <TableRow>
              <TableCell>Nom d'utilisateur</TableCell>
              <TableCell>Evaluation</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Evaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell>{evaluation.user.username}</TableCell>
                <TableCell>{evaluation.evaluation}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("fr-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(evaluation.date))}
                </TableCell>
                <TableCell>
                  <Rating value={evaluation.note} precision={0.5} readOnly />
                </TableCell>
                <TableCell>
                  {currentUsername === evaluation.user.username && (
                    <IconButton
                      onClick={() => handleDeleteClick(evaluation)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Évaluations
      </Typography>
      <EvaluationsTable Evaluations={Evaluations} />
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cette évaluation ? Cette action
            est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Evaluations;
