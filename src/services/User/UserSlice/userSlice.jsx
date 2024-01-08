import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, { payload }) => payload,
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
