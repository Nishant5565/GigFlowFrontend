import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import gigReducer from "./features/gigSlice";
import bidReducer from "./features/bidSlice";
import notificationReducer from "./features/notificationSlice"; // [NEW]

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigReducer,
    bids: bidReducer,
    notifications: notificationReducer, // [NEW]
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
