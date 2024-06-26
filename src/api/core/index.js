import axios from "axios";
import { refreshAccessToken } from "../services/authService";

export const instance = axios.create({
  baseURL: "/api/v1",
});

instance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
      // config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const api = {
  get: (url, params) =>
    instance({
      method: "get",
      url,
      params,
    }),
  post: (url, data) =>
    instance({
      method: "post",
      url,
      data,
    }),
  put: (url, data) =>
    instance({
      method: "put",
      url,
      data,
    }),
  delete: (url, data) =>
    instance({
      method: "delete",
      url,
      data,
    }),
  formPost: (url, form, option) =>
    instance.post(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...option,
    }),
  formPut: (url, form) =>
    instance.put(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  formGet: url =>
    instance.get(url, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }),
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
