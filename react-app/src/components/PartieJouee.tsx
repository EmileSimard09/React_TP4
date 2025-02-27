import { useEffect, useState } from "react";
import IPartieJouee from "../data_interfaces/IPartieJouee";
import PartiesJoueesDS from "../data_services/PartieJoueeDS";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function PartiesJouees() {
  const [partiesJouees, setPartiesJouees] = useState<IPartieJouee[]>([]);
  const [nombreAfficher, setNombreAfficher] = useState<number>(20);

  const handleNombreAfficher = (event: SelectChangeEvent<number>) => {
    setNombreAfficher(event.target.value as number);
  };

  useEffect(() => {
    PartiesJoueesDS.getAll().then((response) => {
      setPartiesJouees(response.data);
    });
  }, []);

  const PartiesJoueesTable = ({
    partiesJouees,
  }: {
    partiesJouees: IPartieJouee[];
  }) => {
    if (partiesJouees.length === 0) {
      return (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Il n'y a pas de parties jouées pour le moment.
        </Typography>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table aria-label="parties jouées table">
          <TableHead>
            <TableRow>
              <TableCell>Niveau</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Durée (Secondes)</TableCell>
              <TableCell>Nombre de tentatives</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partiesJouees.slice(0, nombreAfficher).map((partie) => (
              <TableRow key={partie.id}>
                <TableCell>{partie.niveau}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("fr-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(partie.date))}
                </TableCell>
                <TableCell>{partie.duree}</TableCell>
                <TableCell>{partie.tentatives}</TableCell>
                <TableCell>
                  {partie.terminee ? "Partie finie" : "Partie incomplète"}
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
        Parties Jouées
      </Typography>
      <FormControl sx={{ mb: 2, width: "200px" }}>
        <InputLabel id="games-to-show-label">Afficher</InputLabel>
        <Select
          labelId="games-to-show-label"
          value={nombreAfficher}
          onChange={handleNombreAfficher}
          label="Afficher"
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <PartiesJoueesTable partiesJouees={partiesJouees} />
    </Box>
  );
}

export default PartiesJouees;
