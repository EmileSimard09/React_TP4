import React, { useState } from "react";
import { AxiosResponse } from "axios";
import CustomAxios from "../data_services/CustomAxios";
import IEvaluation from "../data_interfaces/IEvaluation";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Rating,
} from "@mui/material";
import { useSnackbar } from "notistack";
import add from "../data_services/EvaluationDS";

const EvaluationForm: React.FC<{
  onSuccess?: (evaluation: IEvaluation) => void;
}> = ({ onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [evaluation, setEvaluation] = useState("");
  const [note, setNote] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newEvaluation = {
      evaluation,
      note,
      date: new Date(),
    };

    try {
      const response = await add.add(newEvaluation);
      onSuccess?.(response.data);
      setEvaluation("");
      setNote(5);
      enqueueSnackbar("Evaluation envoyée!", {
        variant: "success",
      });
    } catch (err) {
      setError("Erreur lors de l'envoi de l'évaluation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        border: 1,
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Envoyer un évaluation
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        multiline
        rows={4}
        margin="normal"
        label="Évaluation"
        variant="outlined"
        value={evaluation}
        onChange={(e) => setEvaluation(e.target.value)}
        required
      />
      <Rating
        name="rating"
        value={note}
        precision={0.5}
        onChange={(event: any, newValue: any) => setNote(newValue ?? 5)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default EvaluationForm;
