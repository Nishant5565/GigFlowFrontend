import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { getAllGigs } from "@/features/gigSlice";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const GigListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gigs, isLoading } = useSelector((state: RootState) => state.gigs);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(getAllGigs({ search: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);

  // handleSearch is no longer needed as the effect handles it
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional: immediate search on submit if desired, but effect covers it
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Find Gigs
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse open opportunities and start working.
          </p>
        </div>
        <div className="relative w-full md:w-auto flex items-center gap-2">
          <Input
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-120 pr-8"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-13 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full space-y-4"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg line-clamp-1 text-foreground">
                  {gig.title}
                </h3>
                <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border">
                  ${gig.budget}
                </span>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                {gig.description}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Posted by{" "}
                  <span className="font-medium text-foreground">
                    {gig.ownerId?.name || "Unknown"}
                  </span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/gigs/${gig._id}`}>Details</Link>
                </Button>
              </div>
            </div>
          ))}
          {gigs.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                No gigs found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GigListPage;
