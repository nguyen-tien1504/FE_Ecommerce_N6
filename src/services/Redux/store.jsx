import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../Product/productApi";
import { userApi } from "../User/UserService/userApi";
import userSlice from "../User/UserSlice/userSlice";
import cartSlice from "../Cart/cartSlice";
import { cartApi } from "../Cart/cartApi";
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      cartApi.middleware,
    ]),
});
