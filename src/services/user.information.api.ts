import { api } from "../config/api";
import { endpointUserInformation } from "../config/endpoints";
import { IApiResponse } from "../types/IApiResponse";
import { ResponseUserInformation } from "../types/ResponseUserInformation";

export const userInformationAPI = async (config: any): Promise<ResponseUserInformation | undefined> => {
  
  const { data } = await api.get<IApiResponse<ResponseUserInformation>>(
    endpointUserInformation(),
    {
      headers: config
    }
  );

  if (data?.success === false) throw new Error(data?.entity?.message);
  
  return data?.entity?.data;
}