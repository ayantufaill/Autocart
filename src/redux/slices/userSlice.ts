import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserByIdApi } from "../api/userApi";
import { ResolveError } from "./adsSlice";

export interface User {
  name: string;
  email: string;
  address: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  userById: User | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  userById: null,
};

export const fetchUserByIdThunk = createAsyncThunk(
  "fetch/userById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to fetch user. ");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        const transformedUser = {
          name: action.payload?.name,
          email: action.payload?.email,
          address: action.payload?.address,
        };
        state.userById = transformedUser;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
