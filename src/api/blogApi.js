import axios from 'axios';
import jwtDecode from 'jwt-decode'; // ✅ Correct for jwt-decode@3.1.2
import dayjs from 'dayjs';

let baseURL = 'http://localhost:8000';

const blogApi = axios.create({
  baseURL,
});

// Global loading setter to be initialized from React context
let setLoadingGlobal = null;
export const setGlobalLoadingSetter = (setter) => {
  setLoadingGlobal = setter;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

blogApi.interceptors.request.use(
  async (req) => {
    // Turn ON global loader before request
    if (setLoadingGlobal) setLoadingGlobal(true);

    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (!access || !refresh) {
      // No tokens - turn OFF loader and continue
      if (setLoadingGlobal) setLoadingGlobal(false);
      return req;
    }

    try {
      const user = jwtDecode(access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${access}`;
        return req;
      }

      if (isRefreshing) {
        // Wait for refreshing to complete
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            req.headers.Authorization = 'Bearer ' + token;
            return req;
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      const res = await axios.post(`${baseURL}/api/token/refresh/`, { refresh });
      const newAccess = res.data.access;
      localStorage.setItem('access', newAccess);
      processQueue(null, newAccess);
      req.headers.Authorization = `Bearer ${newAccess}`;
      return req;
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
  error => {
    if (setLoadingGlobal) setLoadingGlobal(false);
    return Promise.reject(error);
  }
);

blogApi.interceptors.response.use(
  (response) => {
    // Turn OFF loader on response success
    if (setLoadingGlobal) setLoadingGlobal(false);
    return response;
  },
  (error) => {
    // Turn OFF loader on response error
    if (setLoadingGlobal) setLoadingGlobal(false);
    return Promise.reject(error);
  }
);

export default blogApi;
