import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./components/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import GigListPage from "./pages/gigs/GigListPage";
import GigDetailPage from "./pages/gigs/GigDetailPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PostGigPage from "./pages/dashboard/PostGigPage";
import GigBidsPage from "./pages/dashboard/GigBidsPage";

import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import io from "socket.io-client";
import { addNotification } from "./features/notificationSlice";

const SOCKET_URL = "http://localhost:5000"; // Backend URL

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Socket.io Connection Logic
  useEffect(() => {
    if (user) {
      console.log("Initializing Socket.io connection to", SOCKET_URL);
      const socket = io(SOCKET_URL, {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        socket.emit("join", user._id); // Join personal room
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      socket.on("notification", (notification) => {
        console.log("Received notification:", notification);
        // 1. Play sound (optional)
        // const audio = new Audio('/notification.mp3');
        // audio.play();

        // 2. Show Toast
        toast(notification.message, {
          description: "Just now",
          action: {
            label: "View",
            onClick: () => console.log("Undo"),
          },
        });

        // 3. Update Redux State instantly
        dispatch(addNotification(notification));
      });

      return () => {
        console.log("Disconnecting socket...");
        socket.disconnect();
      };
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="bottom-center" richColors /> {/* [NEW] */}
      <Routes>
        {/* Main App Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gigs" element={<GigListPage />} />
          <Route path="/gigs/:id" element={<GigDetailPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/gigs/new" element={<PostGigPage />} />
          <Route path="/dashboard/gigs/:gigId/bids" element={<GigBidsPage />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
