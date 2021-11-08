import cookie from 'js-cookie';
import axiosRequestApi from './axiosRequest';

export default {
  getLoggingInfo: async () => {
    try {
      const jwt = cookie.get('shoppingmall-cookie');
      if (jwt) {
        const response = await axiosRequestApi({
          url: '/user/auth/login',
          method: 'GET',
        })
        if (response.status === 200) {

        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}