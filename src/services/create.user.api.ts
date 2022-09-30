import { api } from "../config/api";
import { endpointCreateUser } from "../config/endpoints";
import { ICreateUserDTO } from "../dtos/CreateUserDTO";
import { IApiResponse } from "../types/IApiResponse";
import { ResponseCreateUser } from "../types/ReponseCreateUser";

export const createUserAPI = async (values: ICreateUserDTO): Promise<ResponseCreateUser | undefined> => {
  
  const { data } = await api.post<IApiResponse<ResponseCreateUser>>(
    endpointCreateUser(),
    values
  );

  if (data?.success === false) throw new Error(data?.entity?.message);
  
  return data?.entity?.data;
}