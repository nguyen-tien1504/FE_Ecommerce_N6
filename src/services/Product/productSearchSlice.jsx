import { createSlice } from "@reduxjs/toolkit";

export const productSearchSlice = createSlice({
  name: "product search",
  initialState: null,
  reducers: {
    changeProductSearch: (state, { payload }) => payload,
  },
});

export const { changeProductSearch } = productSearchSlice.actions;
export default productSearchSlice.reducer;
