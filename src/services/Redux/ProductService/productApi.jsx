import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/product" }),
  endpoints: (builder) => ({
    getProductByPage: builder.query({
      query: (page) => `/${page - 1}`,
    }),
    getProductById: builder.query({
      query: (id) => `/details/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (body) => ({
        url: `/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      }),
    }),
  }),
});

export const {
  useGetProductByPageQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
} = productApi;
