import { api } from "../core";
import Cookies from "js-cookie";

export const login = async (socialType, socialId) => {
  const { data } = await api.post("/user/login", {
    social_type: socialType,
    social_id: socialId,
  });
  console.log(data);
  localStorage.setItem("access_token", data.response.access_token);
  Cookies.set("refresh_token", data.response.refresh_token, {
    secure: true,
    sameSite: "strict",
  });

  return data.response;
};

export const refreshAccessToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  const { data } = await api.post("/user/refresh", { refresh_token });
  localStorage.setItem("accessToken", data.response.access_token);
  return data.response.access_token;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
