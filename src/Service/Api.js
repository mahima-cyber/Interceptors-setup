import axios from "axios";

const apiService = axios.create({
  baseURL: 'https://62458ed12cfed1881722c047.mockapi.io',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

class Api {
  get = async (url, params) => {
    // const createQueryParams = params =>
    //   Object.keys(params)
    //     .map(item => `${item}=${encodeURI(params[item])}`)
    //     .join('&');
    // const queryParams = createQueryParams(params)
    return await apiService.get(url);
  }
  post = async (url, body) => {
    return await apiService.post(url, body);
  }
  put = async (url, body) => {
    return await apiService.put(url, body);
  }
  delete = async (url, id) => {
    return await apiService.delete(url, id);
  }
}
export { apiService, Api };