import { getCookie } from "../utils/cookies";

export default function ({ $axios, store }) {
  $axios.interceptors.request.use(
    (config) => {
      // add auth header with jwt if account is logged in and request is to th$axios url
      const token = getCookie("auth._token.local");
      const isLoggedIn = token || null;
      // const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);
      // config.headers.Authorization = `Bearer ${token}`;
      if (isLoggedIn) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch("regis/logout");
        // location.reload();
      } else {
        console.log(error);
        return Promise.reject(error.response);
      }
    }
  );
}
