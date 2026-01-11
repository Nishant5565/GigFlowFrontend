import { Link, Outlet } from "react-router";
import { Lock } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      {/* Brand */}
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-foreground"
        >
          <div className="w-8 h-8 bg-primary rounded-lg shadow-sm"></div>
          GigFlow
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-card border border-border/50 rounded-xl shadow-sm p-6 md:p-8">
        <Outlet />
      </div>

      {/* Security Check */}
      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/70">
        <Lock size={12} />
        <span>Your data is encrypted and secure</span>
      </div>
    </div>
  );
};

export default AuthLayout;
