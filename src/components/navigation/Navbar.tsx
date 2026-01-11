import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "@/features/authSlice";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import NotificationDropdown from "./NotificationDropdown"; // [NEW]

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-border bg-background sticky top-0 z-50 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-[1280px]">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-foreground flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
            G
          </div>
          GigFlow
        </Link>

        {/* Links */}
        <nav className="hidden md:flex gap-8">
          <Link
            to="/gigs"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Browse Gigs
          </Link>
          {["Solutions", "Pricing", "Enterprise"].map((item) => (
            <Link
              key={item}
              to="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <NotificationDropdown />
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="default" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
