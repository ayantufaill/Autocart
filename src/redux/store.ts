import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import adsSlice from "./slices/adsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ads: adsSlice,
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
