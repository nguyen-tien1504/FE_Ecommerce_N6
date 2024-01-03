import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/product",
  }),
  endpoints: (builder) => ({
    getProductByPage: builder.query({
      query: (query) => `${query && "?" + query}`,
      transformResponse: (response) => response.data,
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
    }),
    addNewProduct: builder.mutation({
      query({ dataSend, token }) {
        console.log(token);

        return {
          url: "",
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataSend),
        };
      },
    }),
  }),
});

export const {
  useGetProductByPageQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
} = productApi;
