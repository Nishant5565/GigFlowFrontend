import { Link } from "react-router";
import { Briefcase, Search } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const Hero = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <section className="pt-24 pb-20 bg-background text-center">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Badge - Simple, clean pill */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-8 border border-border">
          <span className="mr-2">✨</span> Introducing Team Accounts
        </div>

        {/* Title - Strong, dark, readable */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Hire Faster. Work Smarter.
          <br />
          <span className="text-primary">Grow Together.</span>
        </h1>

        {/* Description - legible Slate-500 */}
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto mb-10 leading-relaxed">
          GigFlow connects clients with verified freelancers through a seamless
          bidding and hiring experience. Manage projects from start to finish
          with confidence.
        </p>

        {/* Actions - Standard solid buttons */}
        <div className="flex gap-4 justify-center mb-16">
          <Link
            to={user ? "/dashboard/gigs/new" : "/signup"}
            className="inline-flex items-center justify-center h-12 px-6 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Briefcase className="mr-2 w-4 h-4" />
            Post a Gig
          </Link>
          <Link
            to="/gigs"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md text-sm font-medium border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
          >
            <Search className="mr-2 w-4 h-4" />
            Browse Gigs
          </Link>
        </div>

        {/* Image - Clean border, no glow */}
        <div className="rounded-xl overflow-hidden border border-border shadow-md mx-auto max-w-[1024px] bg-card">
          <img
            alt="GigFlow Dashboard"
            className="w-full h-auto block"
            src="https://cdn.brandure.online/gigflow.webp"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
