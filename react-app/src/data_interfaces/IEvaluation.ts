import IUser from "./IUser";

export default interface IEvaluation {
  id: number;
  evaluation: string;
  note: number;
  user: IUser;
  date: Date;
}
