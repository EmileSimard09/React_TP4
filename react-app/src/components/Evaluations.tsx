import { useEffect, useState } from "react";
import IEvaluation from "../data_interfaces/IEvaluation";
import EvaluationDS from "../data_services/EvaluationDS";
import Rating from "@mui/material/Rating";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IEvaluation from "./../data_interfaces/IEvaluation";

function Evaluations() {
  const [Evaluations, setEvaluations] = useState<IEvaluation[]>([]);

  useEffect(() => {
    EvaluationDS.getAll().then((response) => {
      setEvaluations(response.data);
    });
  }, []);
  const EvaluationsTable = ({ evaluations }) => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="evaluations table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Evaluation</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Evaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell>{evaluation.user.username}</TableCell>
                <TableCell>{evaluation.evaluation}</TableCell>
                <TableCell>{evaluation.note}</TableCell>
                <TableCell>{evaluation.date}</TableCell>
                <TableCell>
                  <Rating value={evaluation.note} precision={0.5} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div>
      <h1>Evaluations</h1>
      <ul>
        {Evaluations.map((evaluation) => (
          <li key={evaluation.id}>
            {evaluation.user.username}
            {evaluation.evaluation} {evaluation.note}
            {evaluation.date}
            <Rating defaultValue={evaluation.note} precision={0.5} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Evaluations;
