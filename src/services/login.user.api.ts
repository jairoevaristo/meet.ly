import Router from "next/router";
import { api } from "../config/api";
import { endpointLoginUser } from "../config/endpoints";
import { ILoginUserDTO } from "../dtos/LoginUserDTO";
import { IApiResponse } from "../types/IApiResponse";
import { ResponseLoginUser } from "../types/ReponseLogin";

export const loginUserAPI = async (values: ILoginUserDTO): Promise<ResponseLoginUser | undefined> => {
  const { data } = await api.post<IApiResponse<ResponseLoginUser>>(
    endpointLoginUser(),
    values
  );

  if (data?.success === false) throw new Error(data?.entity?.message);
  
  Router.push('/app');
  return data?.entity?.data;
}