import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IEvaluation from "../data_interfaces/IEvaluation";

const getAll = (): Promise<AxiosResponse<IEvaluation[]>> =>
  CustomAxios.get("evaluations/");

const EvaluationDS = {
  getAll,
};

export default EvaluationDS;
