import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
  }),
  tagTypes: ["PostCart", "DeleteCart"],
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
      providesTags: ["PostCart", "DeleteCart"],
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

    deleteCart: builder.mutation({
      query({ productId, amount, productDetail, token }) {
        const { size, color } = productDetail;
        return {
          url: "",
          method: "DELETE",
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
      invalidatesTags: ["DeleteCart"],
    }),
  }),
});

export const { usePostCartMutation, useGetCartQuery, useDeleteCartMutation } = cartApi;
