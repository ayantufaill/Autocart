import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchNotificationsApi,
  postNotificationsApi,
} from "../api/notificationApi";
import { ResolveError } from "./adsSlice";
import { Notification, NotificationPayload } from "@/types/type";

interface NotificationState {
  loading: boolean;
  error: string | null;
  notifications: Notification[];
}

const initialState: NotificationState = {
  loading: false,
  error: null,
  notifications: [],
};

export const FetchNotificationsThunk = createAsyncThunk(
  "fetch/notifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNotificationsApi();
      return response.data;
    } catch (error: unknown) {
      rejectWithValue(ResolveError(error) || "Failed to fetch notifications. ");
    }
  }
);

export const postNotificationThunk = createAsyncThunk(
  "post/notification",
  async (notificationPayload: NotificationPayload, { rejectWithValue }) => {
    try {
      const response = await postNotificationsApi(notificationPayload);
      return response.data;
    } catch (error: unknown) {
      rejectWithValue(ResolveError(error) || "Failed to post notifications. ");
    }
  }
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchNotificationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(FetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //   post notification
      .addCase(postNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("🚀 ~ .addCase ~ action.payload:", action.payload);
      })
      .addCase(postNotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationSlice.reducer;
