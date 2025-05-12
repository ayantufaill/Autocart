import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFollowersByIdApi,
  fetchFollowingsByIdApi,
} from "../api/followerApi";
import { ResolveError } from "./adsSlice";

interface FollowerState {
  loading: boolean;
  error: string | null;
  followers: any[];
  followings: any[];
}

const initialState: FollowerState = {
  loading: false,
  error: null,
  followers: [],
  followings: [],
};

export const fetchFollowersByIdThunk = createAsyncThunk(
  "fetch/followersById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchFollowersByIdApi(userId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch followers"
      );
    }
  }
);
export const fetchFollowingByIdThunk = createAsyncThunk(
  "fetch/followingById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchFollowingsByIdApi(userId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch following"
      );
    }
  }
);

const followerSlice = createSlice({
  name: "followerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Followers
    builder.addCase(fetchFollowersByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFollowersByIdThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followers = action.payload;
    });
    builder.addCase(fetchFollowersByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch Followings
    builder.addCase(fetchFollowingByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFollowingByIdThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followings = action.payload;
    });
    builder.addCase(fetchFollowingByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default followerSlice.reducer;
