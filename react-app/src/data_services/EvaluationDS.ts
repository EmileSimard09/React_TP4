import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IEvaluation from "../data_interfaces/IEvaluation";

const getAll = (): Promise<AxiosResponse<IEvaluation[]>> =>
  CustomAxios.get("evaluations/");

const add = (
  evaluation: Omit<IEvaluation, "id" | "user">
): Promise<AxiosResponse<IEvaluation>> =>
  CustomAxios.post("evaluations/", evaluation);

const deleteEvaluation = (id: number): Promise<AxiosResponse> =>
  CustomAxios.delete(`evaluations/${id}/`);

const EvaluationDS = {
  getAll,
  add,
  deleteEvaluation,
};

export default EvaluationDS;
