import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
  }),
  tagTypes: ["PostCart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query(token) {
        return {
          url: "",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["PostCart"],
    }),
    postCart: builder.mutation({
      query({ productId, amount, productDetail, token }) {
        const { size, color } = productDetail;
        return {
          url: "",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            amount,
            size,
            color,
          }),
        };
      },
      invalidatesTags: ["PostCart"],
    }),
  }),
});

export const { usePostCartMutation, useGetCartQuery } = cartApi;
