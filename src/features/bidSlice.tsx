import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

interface Bid {
  _id: string;
  gigId: string | any; // Updated to handle populated gig
  freelancerId: string | any;
  message: string;
  price: number;
  status: "pending" | "hired" | "rejected";
  createdAt: string;
}

interface BidState {
  bids: Bid[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: BidState = {
  bids: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create bid
export const createBid = createAsyncThunk(
  "bids/create",
  async (
    bidData: { gigId: string; message: string; price: number },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("bids", bidData);
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

// Get gigs bids (for owner)
export const getGigBids = createAsyncThunk(
  "bids/getGigBids",
  async (gigId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`bids/${gigId}`);
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

// Get bids placed by current user
export const getMyBids = createAsyncThunk(
  "bids/getMyBids",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("bids/my-bids");
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

// Hire freelancer
export const hireFreelancer = createAsyncThunk(
  "bids/hire",
  async (bidId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`bids/${bidId}/hire`, {});
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

const bidSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    resetBids: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.bids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Bid
      .addCase(createBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // We might not need to add it to the list unless we are viewing the list,
        // but typically a freelancer places a bid and sees a success message.
        // state.bids.push(action.payload); // Optional: add to list if we were viewing it
      })
      .addCase(createBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Gig Bids
      .addCase(getGigBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGigBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids = action.payload;
      })
      .addCase(getGigBids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get My Bids
      .addCase(getMyBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids = action.payload;
      })
      .addCase(getMyBids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Hire Freelancer
      .addCase(hireFreelancer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hireFreelancer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update local state to reflect hired status
        const hiredBidId = action.payload.bid._id;
        state.bids = state.bids.map((bid) =>
          bid._id === hiredBidId ? { ...bid, status: "hired" } : bid
        );
      })
      .addCase(hireFreelancer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetBids } = bidSlice.actions;
export default bidSlice.reducer;
