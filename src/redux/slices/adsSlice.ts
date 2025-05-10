import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteAdByIdApi,
  fetchAdByIdApi,
  fetchAdsApi,
  fetchSearchAdsApi,
  postAdApi,
  postImagesApi,
} from "../api/adsApi";
import { Ad, PostAdPayload } from "@/types/type";
import { toast } from "react-toastify";

export const ResolveError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const data = error.response;
    if (data && typeof data === "object" && "data" in data) {
      if (
        data.data &&
        typeof data.data === "object" &&
        "message" in data.data
      ) {
        return data.data.message;
      }
    }
  }
  return "Something Went wrong.";
};

interface adsState {
  loading: boolean;
  error: string | null;
  ads: Ad[];
  uploadedAdImages: string[];
  adById: Ad | null;
}

const initialState: adsState = {
  loading: false,
  error: null,
  ads: [],
  uploadedAdImages: [],
  adById: null,
};

const transformedAds = (ads: Ad[]): Ad[] => {
  const newAds = ads?.map((ad) => ({
    id: ad?.id,
    categoryId: ad?.categoryId,
    uploadImagesForAd: ad?.uploadImagesForAd,
    uploadImagesForStory: ad?.uploadImagesForStory,
    vehicleLicenseNumber: ad?.vehicleLicenseNumber,
    itemName: ad?.itemName,
    status: ad?.status,
    condition: ad?.condition,
    adType: ad?.adType,
    phoneNumber: ad?.phoneNumber,
    location: ad?.location,
    price: ad?.price,
    priceCurrency: ad?.priceCurrency,
    descriptions: ad?.descriptions,
    commercialModel: ad?.commercialModel,
    commercialsMake: ad?.commercialsMake,
    mileageParameter: ad?.mileageParameter,
    mileage: ad?.mileage,
    loadCapacity: ad?.loadCapacity,
    yearOfProduction: ad?.yearOfProduction,
    engineSize: ad?.engineSize,
    likes: ad?.likes,
    shares: ad?.shares,
    views: ad?.views,
    user: {
      name: ad?.user?.name,
      role: ad?.user?.role,
      id: ad?.user?.id,
    },
    createDate: ad?.createDate,
  }));
  return newAds;
};

export const postAdThunk = createAsyncThunk(
  "post/ad",
  async (payload: PostAdPayload, { rejectWithValue }) => {
    try {
      const response = await postAdApi(payload);
      return response.data;
    } catch (error: unknown) {
      rejectWithValue(ResolveError(error) || "Failed to post ad.");
    }
  }
);

export const fetchAdsThunk = createAsyncThunk(
  "fetch/ads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAdsApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to get ads.");
    }
  }
);

export const postImagesThunk = createAsyncThunk(
  "post/images",
  async (images: File[], { rejectWithValue }) => {
    try {
      const response = await postImagesApi(images);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to upload images.");
    }
  }
);

export const fetchSearchAdsThunk = createAsyncThunk(
  "fetch/searchAds",
  async (
    { search, status }: { search: string; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchSearchAdsApi({ search, status });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to search ads. ");
    }
  }
);

export const fetchAdByIdThunk = createAsyncThunk(
  "fetch/adById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchAdByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to fetch Ad. ");
    }
  }
);

export const deleteAdByIdThunk = createAsyncThunk(
  "delete/adById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = deleteAdByIdApi(id);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(ResolveError(error) || "Failed to delete ad. ");
    }
  }
);

const adsSlice = createSlice({
  name: "adsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // post ad
      .addCase(postAdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAdThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(postAdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch all ads
      .addCase(fetchAdsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = transformedAds(action.payload);
        if (state.ads?.length === 0 || !state.ads)
          state.error = "No ads found. ";
      })
      .addCase(fetchAdsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // post ad images
      .addCase(postImagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postImagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedAdImages = action.payload;
      })
      .addCase(postImagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // toast.error(state.error);
      })
      // search ads
      .addCase(fetchSearchAdsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchAdsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
        if (state.ads?.length === 0 || !state.ads)
          state.error = `No results found for  "${action.meta.arg.search}"`;
      })
      .addCase(fetchSearchAdsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch ad by id
      .addCase(fetchAdByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        [state.adById] = transformedAds([action.payload]);
      })
      .addCase(fetchAdByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete ad by id
      .addCase(deleteAdByIdThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteAdByIdThunk.fulfilled, (state, action) => {
        state.ads = state.ads.filter((ad) => ad.id != action.meta.arg);
        toast.success(action.payload?.message || "Ad deleted successfully.");
      })
      .addCase(deleteAdByIdThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error(state.error || "Failed to delete Ad.");
      });
  },
});

export default adsSlice.reducer;
