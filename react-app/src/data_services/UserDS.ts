import { AxiosResponse } from "axios";
import CustomAxios, { setLocalToken, unsetLocalToken } from "./CustomAxios";
import IUser from "../data_interfaces/IUser";

const deleteUser = (): Promise<AxiosResponse<void>> =>
  CustomAxios.delete("auth/current-user/");

const changePassword = (password: string): Promise<AxiosResponse<IUser>> =>
  CustomAxios.put("auth/current-user-password/me/", { password });

const get = (): Promise<AxiosResponse<IUser>> =>
  CustomAxios.get("auth/current-user/");

const login = (username: string, password: string): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve, reject) => {
    CustomAxios.post("auth/token/", { username, password })
      .then((response) => {
        setLocalToken(response.data);
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

const logout = (): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve) => {
    unsetLocalToken();
    resolve(true);
  });
  return promise;
};

const register = (
  user: IUser,
  password: string
): Promise<AxiosResponse<IUser>> =>
  CustomAxios.post("auth/register/", {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    password,
  });

const save = (user: IUser): Promise<AxiosResponse<IUser>> =>
  CustomAxios.put("auth/current-user/me/", user);

const UserDS = {
  changePassword,
  get,
  login,
  logout,
  register,
  save,
  deleteUser,
};

export default UserDS;
