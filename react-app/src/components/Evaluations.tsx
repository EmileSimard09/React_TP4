import { useEffect, useState } from "react";
import IEvaluation from "../data_interfaces/IEvaluation";
import EvaluationDS from "../data_services/EvaluationDS";

function Evaluations() {
  const [Evaluations, setEvaluations] = useState<IEvaluation[]>([]);

  useEffect(() => {
    EvaluationDS.getAll().then((response) => {
      setEvaluations(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Evaluations</h1>
      <ul>
        {Evaluations.map((evaluation) => (
          <li key={evaluation.id}>
            {evaluation.user.username}
            {evaluation.evaluation} {evaluation.note}
            {evaluation.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Evaluations;
