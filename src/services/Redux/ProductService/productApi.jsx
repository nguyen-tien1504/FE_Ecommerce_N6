import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getProductByPage: builder.query({
      query: (query) => `user/product${query && "?" + query}`,
      transformResponse: (response) => response.data,
    }),
    getProductById: builder.query({
      query: (id) => `user/product/details/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (body) => ({
        url: `admin/product/add`,
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
