import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFollowingStoriesThunk,
  fetchViewedStoriesThunk,
  fetchStoriesThunk,
  fetchTrendingStoriesThunk,
} from "../thunk/story.thunk";

export interface Story {
  id: string;
  title: string | null;
  uploadImagesForStory: string[];
  createdAt: string;
  // deletedAt: null;
  adId: string | null;
  userId: string;
}

interface StoryState {
  loading: boolean;
  error: string | null;
  stories: Story[];
  trendingStories: Story[];
  followingStories: Story[];
  viewedStories: Story[];
}

const initialState: StoryState = {
  loading: false,
  error: null,
  stories: [],
  trendingStories: [],
  viewedStories: [],
  followingStories: [],
};

const storySlice = createSlice({
  name: "storySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // stories
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

    // trending stories
    builder
      .addCase(fetchTrendingStoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingStoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingStories = action.payload;
      })
      .addCase(fetchTrendingStoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // recent stories
    builder
      .addCase(fetchViewedStoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewedStoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedStories = action.payload;
      })
      .addCase(fetchViewedStoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // following stories
    builder
      .addCase(fetchFollowingStoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowingStoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.followingStories = action.payload;
      })
      .addCase(fetchFollowingStoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storySlice.reducer;
