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
import { useEffect } from "react";
import { Toaster } from "sonner";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <SocketProvider>
        <Toaster position="bottom-center" richColors />
        <Routes>
          {/* Main App Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gigs" element={<GigListPage />} />
            <Route path="/gigs/:id" element={<GigDetailPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/gigs/new" element={<PostGigPage />} />
            <Route
              path="/dashboard/gigs/:gigId/bids"
              element={<GigBidsPage />}
            />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
