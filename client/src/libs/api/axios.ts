"use client";

import axios, { AxiosInstance } from "axios";

console.log("current env:::", process.env.NODE_ENV);

const API_ENDPOINTS = {
  main: process.env.NEXT_PUBLIC_API_URL || "",
} as const;

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  console.log("baseURL:::", baseURL);
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
  });

  // instance.interceptors.request.use(
  //   async (config) => {
  //     const cookieStore = await cookies();
  //     const token = cookieStore.get("accessToken");
  //     config.withCredentials = true;
  //     if (token) {
  //       config.headers["Authorization"] = `Bearer ${token?.value}`;
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );

  // instance.interceptors.response.use(
  //   async (response: any) => {
  //     if (response.headers["set-cookie"]) {
  //       const cookieStore = await cookies();
  //       const setCookieHeader = response.headers["set-cookie"];
  //       const tokenMatch = setCookieHeader.find((cookie: any) =>
  //         cookie.startsWith("accessToken=")
  //       );
  //       if (tokenMatch) {
  //         const token = tokenMatch.split(";")[0].split("=")[1];
  //         cookieStore.set("accessToken", token, {
  //           httpOnly: true,
  //           path: "/",
  //           sameSite: "lax",
  //           secure: process.env.NODE_ENV === "production",
  //         });
  //       }
  //     }
  //     const { data } = response;
  //     const { error } = data;
  //     if (error) {
  //       return handleApiError(data);
  //     }
  //     return response;
  //   },
  //   async (error) => {
  //     console.error(
  //       "error request path:::",
  //       `${error.request.method} ${error.config.baseURL}${error.request.path}`
  //     );

  //     return Promise.reject(handleApiError(error?.response));
  //   }
  // );

  return instance;
};

export const api = createAxiosInstance(API_ENDPOINTS.main);
export default api;
