import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import adsSlice from "./slices/adsSlice";
import userSlice from "./slices/userSlice";
import followerSlice from "./slices/followerSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ads: adsSlice,
    user: userSlice,
    follower: followerSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
