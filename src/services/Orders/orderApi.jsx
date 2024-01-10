import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://103.90.228.14:8080/api/order/" }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query(token) {
        return {
          url: "myorder",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetOrderQuery } = orderApi;
