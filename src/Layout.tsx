import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/navigation/Navbar"; // Add this import
import Footer from "@/components/navigation/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 flex flex-col w-full max-w-[1280px] mx-auto px-6 py-6 fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
