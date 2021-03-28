import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoList: [],
};

const authInfo = createSlice({
  name: "info",
  initialState,
  reducers: {
    saveInfo: (state, action) => {
      state.infoList.push(action.payload);
    },
  },
});

export const { saveInfo } = authInfo.actions;
export default authInfo.reducer;
