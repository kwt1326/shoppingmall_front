import axios, { Method } from 'axios';
import cookie from 'js-cookie';
import { serverHostUrl } from '../config';

type axiosRequestApiProps = {
  method: Method,
  url: string,
  data?: any,
  params?: any,
  headers?: any,
}

const axiosRequestApi = async (options: axiosRequestApiProps) => {
  const { method, data, params, url, headers } = options;
  const defaultHeaders = { Authorization: `Bearer ${cookie.get('shoppingmall-cookie')}` };
  headers && Object.assign(defaultHeaders, headers);

  return await axios({
    url: `${serverHostUrl}${url}`,
    method,
    data,
    params,
    headers: defaultHeaders,
  })
}

export default axiosRequestApi;