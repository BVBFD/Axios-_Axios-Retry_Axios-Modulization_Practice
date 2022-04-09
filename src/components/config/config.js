import axios from 'axios';
import axiosRetry from 'axios-retry';

class AxiosService {
  constructor(options) {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}`,
      mode: 'cors',
      withCredentials: true,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        origin: `${process.env.REACT_APP_ALLOW_ORIGIN}`,
        ...options?.headers,
      },
    });

    axiosRetry(this.axiosInstance, {
      retries: process.env.REACT_APP_AXIOS_RETRY_RETRIES,
      retryDelay: (retry) => {
        const delay =
          Math.pow(2, retry) * process.env.REACT_APP_AXIOS_RETRY_TIME;
        const jitter = delay * 0.1 * Math.random();
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) ||
        err.response.status === 429,
    });
  }
}

export default AxiosService;
