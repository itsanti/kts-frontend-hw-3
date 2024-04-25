import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_TOCKEN } from 'config/constants';

const axiosGet = <T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const opt: AxiosRequestConfig = {
    ...options,
    headers: { ...options?.headers },
  };
  if (API_TOCKEN) {
    opt.headers = { ...opt.headers, Authorization: `Bearer ${API_TOCKEN}` };
  }
  return axios.get<T>(url, opt);
};

export { axiosGet };
