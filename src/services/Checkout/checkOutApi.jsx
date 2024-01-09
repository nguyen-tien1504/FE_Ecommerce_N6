import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkOutApi = createApi({
  reducerPath: "checkOutApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    paymentSelect: builder.mutation({
      query({ payment, token }) {
        return {
          url: "/order/checkout",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ payment }),
        };
      },
    }),
    createPaymentVnPay: builder.mutation({
      query(oId) {
        return {
          url: `/createPaymentVnpay?oId=${oId}`,
          method: "GET",
        };
      },
    }),
    postPaymentDetail: builder.mutation({
      query(query) {
        return {
          url: `/order/paying/${query}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  usePaymentSelectMutation,
  useCreatePaymentVnPayMutation,
  usePostPaymentDetailMutation,
} = checkOutApi;
