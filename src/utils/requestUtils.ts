import cookie from 'js-cookie';
import axiosRequestApi from './axiosRequest';

export default {
  getUserInfo: async () => {
    try {
      const jwt = cookie.get('shoppingmall-cookie');
      if (jwt) {
        const response = await axiosRequestApi({
          url: '/user/auth/info',
          method: 'GET',
        })
        if (response.status === 200) {
          return response.data;
        }
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}