import IUser from "./IUser";

export default interface IPartieJouee {
  id: number;
  user: IUser;
  date: Date;
  duree: number;
  niveau: string;
  tentatives: number;
  terminee: boolean;
}
