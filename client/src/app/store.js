import { configureStore } from "@reduxjs/toolkit";
import saveInfoReducer from "../features/loginInfoSlice";

export default configureStore({
  reducer: {
    authInfo: saveInfoReducer,
  },
});
