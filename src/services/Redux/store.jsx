import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../Product/productApi";
import { userApi } from "../User/UserService/userApi";
import userSlice from "../User/UserSlice/userSlice";
import cartSlice from "../Cart/cartSlice";
import { cartApi } from "../Cart/cartApi";
import productSearchSlice from "../Product/productSearchSlice";
import { checkOutApi } from "../Checkout/checkOutApi";
import { orderApi } from "../Orders/orderApi";
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    productSearch: productSearchSlice,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkOutApi.reducerPath]: checkOutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      cartApi.middleware,
      checkOutApi.middleware,
      orderApi.middleware,
    ]),
});
