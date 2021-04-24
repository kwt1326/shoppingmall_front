import axios, { Method } from 'axios';
import { serverHostUrl } from '../config';

type axiosRequestApiProps = {
  method: Method,
  url: string,
  data?: any,
  params?: any,
  headers?: any,
}

const axiosRequestApi = async (options: axiosRequestApiProps) => {
  const { method, data, params, url } = options;
  return await axios({
    url: `${serverHostUrl}${url}`,
    method,
    data,
    params,
  })
}

export default axiosRequestApi;