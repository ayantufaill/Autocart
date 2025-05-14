import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFollowersByIdApi,
  fetchFollowingsByIdApi,
  followByIdApi,
  unfollowByIdApi,
} from "../api/followerApi";
import { ResolveError } from "./adsSlice";
import { toast } from "react-toastify";

// interface Follower {}
// interface Following {
//   id: string;
// }

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

interface Follow {
  followerId: string;
  followingId: string;
}

export const followByIdThunk = createAsyncThunk(
  "followById",
  async ({ followerId, followingId }: Follow, { rejectWithValue }) => {
    try {
      const response = await followByIdApi(followerId, followingId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to follow");
    }
  }
);

export const unfollowByIdThunk = createAsyncThunk(
  "unfollowByIdThunk",
  async ({ followerId, followingId }: Follow, { rejectWithValue }) => {
    try {
      const response = await unfollowByIdApi(followerId, followingId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to unfollow");
    }
  }
);

const followerSlice = createSlice({
  name: "followerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Followers
    builder
      .addCase(fetchFollowersByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowersByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
        if (state.followers?.length === 0) state.error = "No followers. ";
      })
      .addCase(fetchFollowersByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Followings
      .addCase(fetchFollowingByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowingByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.followings = action.payload;
        if (state.followings?.length === 0) state.error = "No followings. ";
      })
      .addCase(fetchFollowingByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // followById
      .addCase(followByIdThunk.pending, () => {})
      .addCase(followByIdThunk.fulfilled, () => {
        // state.followings.push(action.payload);
      })
      .addCase(followByIdThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error(state.error);
      })
      // unfollow by id
      .addCase(unfollowByIdThunk.pending, (state, action) => {})
      .addCase(unfollowByIdThunk.fulfilled, (state, action) => {
        state.followers = state.followers.filter(
          (item) => item?.followerId != localStorage.getItem("id")
        );
        if (state.followings?.length === 0) state.error = "No Following found";
      })
      .addCase(unfollowByIdThunk.rejected, (state, action) => {
        toast.error(action.payload as string);
      });
  },
});

export default followerSlice.reducer;
