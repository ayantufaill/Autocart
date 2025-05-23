import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFollowingStroiesApi, fetchViewedStoriesApi, fetchStoiresApi, fetchTrendingStoriesApi } from "../api/storiesApi";
import { ResolveError } from "../slices/adsSlice";

export const fetchStoriesThunk = createAsyncThunk(
  "fetch/stories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStoiresApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to fetch stories");
    }
  }
);

export const fetchTrendingStoriesThunk = createAsyncThunk(
  "fetch/trendingStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTrendingStoriesApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch trending stories"
      );
    }
  }
);

export const fetchViewedStoriesThunk = createAsyncThunk(
  "fetch/recentStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchViewedStoriesApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch recent stories"
      );
    }
  }
);

export const fetchFollowingStoriesThunk = createAsyncThunk(
  "fetch/followingStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFollowingStroiesApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch following stories"
      );
    }
  }
);