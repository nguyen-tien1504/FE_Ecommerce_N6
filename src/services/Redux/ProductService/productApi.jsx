import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/product" }),
  endpoints: (builder) => ({
    getProductByPage: builder.query({
      query: (query) => `${query && "?" + query}`,
      transformResponse: (response) => response.data,
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (body) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    }),
  }),
});

export const {
  useGetProductByPageQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
} = productApi;
