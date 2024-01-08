import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, { payload }) => {
      // Find exist product in cart
      const { data, productQuantity, productDetail } = payload;
      const { id, name, imageUrls, price } = data;
      const existProductIndex = state.find(
        (item) =>
          item.productId === id &&
          item.color === productDetail.color &&
          item.size === productDetail.size
      );
      if (existProductIndex) {
        // Product already add to cart
        existProductIndex.amount += productQuantity;
        existProductIndex.productPrice = existProductIndex.amount * price;
      } else {
        // Push product to cart
        state.push({
          productId: id,
          name,
          imageUrls,
          amount: productQuantity,
          productPrice: productQuantity * price,
          price,
          ...productDetail,
        });
      }
    },
    increaseOne: (state, { payload }) => {
      const { productId, size, color } = payload;

      const existProductIndex = state.find(
        (item) =>
          item.productId === productId && item.color === color && item.size === size
      );
      existProductIndex.amount += 1;
      existProductIndex.productPrice = existProductIndex.price * existProductIndex.amount;
    },
    decreaseOne: (state, { payload }) => {
      const { productId, size, color } = payload;
      const existProductIndex = state.find(
        (item) =>
          item.productId === productId && item.color === color && item.size === size
      );
      existProductIndex.amount -= 1;
      existProductIndex.productPrice = existProductIndex.price * existProductIndex.amount;

      if (existProductIndex.amount === 0) {
        state.splice(
          state.indexOf(
            (item) =>
              item.productId === productId && item.color === color && item.size === size
          ),
          1
        );
      }
    },
    removeFromCart: (state, { payload }) => {
      const { productId, size, color } = payload;
      state.splice(
        state.indexOf(
          (item) =>
            item.productId === productId && item.color === color && item.size === size
        ),
        1
      );
    },
  },
});

export const { addToCart, increaseOne, decreaseOne, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
