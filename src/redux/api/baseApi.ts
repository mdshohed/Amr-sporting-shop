import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ['products'],
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    baseUrl: "https://amr-sporting-shop-server.vercel.app/api",
  }),
  endpoints: () => ({}),
});
