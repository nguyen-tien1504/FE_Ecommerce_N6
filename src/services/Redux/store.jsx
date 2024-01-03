import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./ProductService/productApi";
import { userApi } from "./UserService/userApi";
import userSlice from "./UserSlice/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, userApi.middleware]),
});
