import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://103.90.228.14:8080/api/auth/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: "login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: "register",
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),

    getUserByEmail: builder.query({
      query(userEmail) {
        return {
          url: `getUserByEmail/${userEmail}`,
          method: "GET",
        };
      },
    }),

    updateUser: builder.mutation({
      query(body) {
        return {
          url: "update",
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify(body),
        };
      },
    }),

    getOrder:builder.query({
      query(userEmail){
        return{
          
        }
      }
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} = userApi;
