import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: {
    _id: string;
    name: string;
    email?: string;
  };
  status: string;
  createdAt: string;
}

interface GigState {
  gigs: Gig[];
  currentGig: Gig | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: GigState = {
  gigs: [],
  currentGig: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Fetch all gigs
export const getAllGigs = createAsyncThunk(
  "gigs/getAll",
  async (
    filters: { search?: string; minBudget?: string } | undefined,
    thunkAPI
  ) => {
    try {
      let query = "";
      if (filters) {
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.minBudget) params.append("minBudget", filters.minBudget);
        query = "?" + params.toString();
      }
      const response = await axiosInstance.get("gigs" + query);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single gig
export const getGigById = createAsyncThunk(
  "gigs/getOne",
  async (gigId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`gigs/${gigId}`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create gig
export const createGig = createAsyncThunk(
  "gigs/create",
  async (
    gigData: { title: string; description: string; budget: number },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("gigs", gigData);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get my gigs
export const getMyGigs = createAsyncThunk("gigs/getMy", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("gigs/my");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Gig Status
export const updateGigStatus = createAsyncThunk(
  "gigs/updateStatus",
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`gigs/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {
    resetGigs: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.currentGig = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGigs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset flags
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't set isSuccess = true for fetches
        state.gigs = action.payload;
      })
      .addCase(getAllGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getGigById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getGigById.fulfilled, (state, action) => {
        state.isLoading = false;
        // status.isSuccess = true; // Not needed for viewing
        state.currentGig = action.payload;
      })
      .addCase(getGigById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createGig.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true; // Keep for mutation
        state.gigs.unshift(action.payload);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getMyGigs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getMyGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true; // Not needed
        state.gigs = action.payload;
      })
      .addCase(getMyGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Update Status
      .addCase(updateGigStatus.fulfilled, (state, action) => {
        if (state.currentGig && state.currentGig._id === action.payload._id) {
          state.currentGig.status = action.payload.status;
        }
        state.gigs = state.gigs.map((gig) =>
          gig._id === action.payload._id ? action.payload : gig
        );
      });
  },
});

export const { resetGigs } = gigSlice.actions;
export default gigSlice.reducer;
