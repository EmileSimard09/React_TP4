import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IPartieJouee from "../data_interfaces/IPartieJouee";

const getAll = (): Promise<AxiosResponse<IPartieJouee[]>> =>
  CustomAxios.get("parties-jouees/");

const add = (
  partieJouee: Omit<IPartieJouee, "id" | "user">
): Promise<AxiosResponse<IPartieJouee>> =>
  CustomAxios.post("parties-jouees/", partieJouee);

const PartiesJoueesDS = {
  getAll,
  add,
};

export default PartiesJoueesDS;
