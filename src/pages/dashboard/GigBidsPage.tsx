import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getGigBids, hireFreelancer, resetBids } from "@/features/bidSlice";
import { getGigById, updateGigStatus } from "@/features/gigSlice";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Check, Newspaper } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GigBidsPage = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);

  const {
    bids,
    isLoading: bidsLoading,
    message: bidsMessage,
  } = useSelector((state: RootState) => state.bids);
  const { currentGig } = useSelector((state: RootState) => state.gigs);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (gigId) {
      dispatch(getGigById(gigId));
      dispatch(getGigBids(gigId));
    }
    return () => {
      dispatch(resetBids());
    };
  }, [dispatch, gigId]);

  const handleHireClick = (bidId: string) => {
    setSelectedBidId(bidId);
  };

  const confirmHire = () => {
    if (selectedBidId) {
      dispatch(hireFreelancer(selectedBidId))
        .unwrap()
        .then(() => {
          alert("Freelancer hired successfully!");
          if (gigId) {
            dispatch(getGigById(gigId));
            dispatch(getGigBids(gigId));
          }
        })
        .catch((err) => {
          alert(`Error: ${err}`);
        });
      setSelectedBidId(null);
    }
  };

  const toggleGigStatus = () => {
    if (currentGig) {
      const newStatus = currentGig.status === "open" ? "closed" : "open";
      dispatch(updateGigStatus({ id: currentGig._id, status: newStatus }));
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (bidsLoading)
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[calc(100vh-200px)]">
        <div className="mb-6 flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-12 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-[calc(100vh-200px)]">
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="ghost"
          className="pl-0 hover:pl-2 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        {currentGig && (
          <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg border border-border/50">
            <Button variant="outline" size="sm" asChild className="mr-2">
              <Link to={`/gigs/${gigId}`}>View Gig</Link>
            </Button>
            <span className="text-sm font-medium text-muted-foreground pl-2">
              Accepting Bids:
            </span>
            <Button
              size="sm"
              variant={currentGig.status === "open" ? "default" : "secondary"}
              className={
                currentGig.status === "open"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              onClick={toggleGigStatus}
              disabled={currentGig.status === "assigned"} // Cannot reopen if already assigned/hired
            >
              {currentGig.status === "open" ? "Open" : "Closed"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Bids for "{currentGig?.title || "Gig"}"
          </h1>
          {currentGig && (
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  currentGig.status === "open"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : currentGig.status === "assigned" ||
                      currentGig.status === "active"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {currentGig.status.toUpperCase()}
              </span>
              <span className="text-muted-foreground text-sm">
                Budget:{" "}
                <span className="font-semibold text-foreground">
                  ${currentGig.budget}
                </span>
              </span>
              <span className="text-muted-foreground text-sm">
                • {bids.length} {bids.length === 1 ? "Proposal" : "Proposals"}
              </span>
            </div>
          )}
        </div>
      </div>

      {bids.length === 0 ? (
        <div className="bg-muted/30 border border-border border-dashed rounded-xl p-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper />
          </div>
          <h3 className="text-lg font-semibold mb-2">No bids received yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Wait for freelancers to submit their proposals. You will be notified
            when a new bid arrives.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bids.map((bid) => {
            const isHired = bid.status === "hired";
            const isRejected = bid.status === "rejected";

            return (
              <div
                key={bid._id}
                className={`group relative bg-card border rounded-xl p-6 shadow-sm transition-all ${
                  isHired
                    ? "border-green-500 ring-1 ring-green-500 bg-green-50/50"
                    : isRejected
                    ? "opacity-75 bg-muted/30"
                    : "hover:shadow-md hover:border-primary/50"
                }`}
              >
                {isHired && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl flex items-center shadow-sm">
                    <Check className="w-3 h-3 mr-1" /> HIRED
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {bid.freelancerId?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {bid.freelancerId?.name || "Unknown Freelancer"}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {bid.freelancerId?.email || "No email"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Applied {new Date(bid.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right bg-background/50 p-3 rounded-lg border border-border/50 min-w-[120px]">
                    <div className="text-2xl font-bold text-primary">
                      ${bid.price}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Bid Amount
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-6 text-sm leading-relaxed whitespace-pre-wrap border border-border/50">
                  {bid.message}
                </div>

                <div className="flex justify-end items-center border-t pt-4">
                  {isHired ? (
                    <div className="flex items-center text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-full text-sm">
                      <Check className="mr-2 h-4 w-4" /> Application Accepted
                    </div>
                  ) : isRejected ? (
                    <span className="text-muted-foreground font-medium flex items-center px-4 py-2 bg-muted rounded-full text-sm">
                      Build Rejected
                    </span>
                  ) : (
                    currentGig?.status === "open" && (
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => alert("Message feature coming soon!")}
                        >
                          Message
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => handleHireClick(bid._id)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                            >
                              Hire Freelancer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hire{" "}
                                {bid.freelancerId?.name || "this freelancer"}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will mark this freelancer as hired
                                and reject all other bids. This cannot be
                                undone. Are you sure you want to proceed?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setSelectedBidId(null)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={confirmHire}>
                                Confirm Hire
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GigBidsPage;
