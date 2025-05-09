import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStoiresApi, fetchTrendingStoriesApi } from "../api/storiesApi";
import { ResolveError } from "./adsSlice";

interface StoryState {
  loading: boolean;
  error: string | null;
  stories: string[]; // change type according to payload
}

const initialState: StoryState = {
  loading: false,
  error: null,
  stories: [],
};

export const fetchStoriesThunk = createAsyncThunk(
  "fetch/stories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStoiresApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        ResolveError(error) || "Failed to fetch stories"
      );
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

const storySlice = createSlice({
  name: "storySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storySlice.reducer;
