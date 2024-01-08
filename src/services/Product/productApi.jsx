import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/product",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getProductByPage: builder.query({
      query: (query) => `${query && "?" + query}`,
      transformResponse: (response) => response.data,
      providesTags: ["Post"],
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Post"],
    }),

    addNewProduct: builder.mutation({
      query({ dataSend, token }) {
        console.log(token);
        return {
          url: "",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataSend),
        };
      },
      invalidatesTags: ["Post"],
    }),

    editProduct: builder.mutation({
      query({ productId, dataSend, token }) {
        return {
          url: `/edit/${productId}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataSend),
        };
      },
      invalidatesTags: ["Post"],
    }),
    deleteProduct: builder.mutation({
      query(productId) {
        return {
          url: `/delete/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Delete"],
    }),
    searchProduct: builder.query({
      query(query) {
        return {
          url: `/search?value=${query}`,
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProductByPageQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useSearchProductQuery,
} = productApi;
