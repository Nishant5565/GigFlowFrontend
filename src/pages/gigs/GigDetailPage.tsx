import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getGigById } from "@/features/gigSlice";
import { createBid, getGigBids, resetBids } from "@/features/bidSlice";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthInput from "@/components/auth/AuthInput";
import { ArrowLeft, DollarSign, CheckCircle } from "lucide-react";

const GigDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    currentGig,
    isLoading: gigLoading,
    isError: gigError,
    message: gigMessage,
  } = useSelector((state: RootState) => state.gigs);

  const { user } = useSelector((state: RootState) => state.auth);
  const {
    isLoading: bidLoading,
    isSuccess: bidSuccess,
    isError: bidError,
    message: bidMessage,
  } = useSelector((state: RootState) => state.bids);

  const { bids } = useSelector((state: RootState) => state.bids);

  useEffect(() => {
    if (id) {
      dispatch(getGigById(id));
      dispatch(getGigBids(id));
    }
    return () => {
      dispatch(resetBids());
    };
  }, [dispatch, id]);

  // ... (keep second useEffect)

  // ... (keep formik)

  // ... (keep loading/error checks)

  const isOwner = user?._id === currentGig.ownerId._id;
  const hasAlreadyBid = bids.some(
    (bid: any) =>
      bid.freelancerId?._id === user?._id || bid.freelancerId === user?._id
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-200px)]">
      <div className="mb-8 ">
        <Button
          variant="ghost"
          className="mb-6 pl-0 hover:pl-2 transition-all"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
        </Button>
      </div>

      <div className="glass-card rounded-2xl p-8 md:p-10 shadow-xl relative z-10 overflow-hidden">
        {/* Decorative flourish */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
              {currentGig.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Posted by{" "}
                <span className="font-semibold text-foreground">
                  {currentGig.ownerId.name || "Unknown"}
                </span>
              </div>
              <span>•</span>
              <div>{new Date(currentGig.createdAt).toLocaleDateString()}</div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ml-2 ${
                  currentGig.status === "open"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : currentGig.status === "active"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {currentGig.status.charAt(0).toUpperCase() +
                  currentGig.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="text-right bg-muted/20 p-4 rounded-xl border border-border/50">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Budget
            </div>
            <div className="text-3xl font-bold text-primary">
              ${currentGig.budget}
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            Project Description
          </h3>
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-base">
            {currentGig.description}
          </p>
        </div>

        <div className="border-t border-border/50 pt-8">
          {user ? (
            isOwner ? (
              <div className="bg-primary/5 p-8 rounded-xl text-center border border-primary/10">
                <h3 className="font-bold text-lg mb-2">Manage Your Gig</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  You are the owner of this gig. You can view proposals and hire
                  freelancers from your dashboard.
                </p>
                <Button
                  asChild
                  className="rounded-full shadow-lg shadow-primary/20"
                >
                  <Link to={`/dashboard`}>Go to Dashboard</Link>
                </Button>
              </div>
            ) : hasAlreadyBid ? (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <CheckCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-900 mb-1">
                  Proposal Submitted
                </h3>
                <p className="text-blue-700 font-medium mb-2">
                  You have already placed a bid on this gig.
                </p>
                <p className="text-sm text-blue-600 mb-4 max-w-md mx-auto">
                  You can track the status of your application in your
                  dashboard. Good luck!
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Submit a Proposal</h3>
                  <p className="text-muted-foreground">
                    Explain why you're the best person for this job.
                  </p>
                </div>

                {bidSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-medium flex items-center justify-center gap-2">
                    <span className="text-lg">✓</span> Bid placed successfully!
                    The client will review your proposal.
                  </div>
                )}
                {bidError && (
                  <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                    {bidMessage}
                  </div>
                )}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <AuthInput
                    id="price"
                    name="price"
                    type="number"
                    label="Bid Amount ($)"
                    placeholder="Enter your bid amount"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.price}
                    touched={formik.touched.price}
                  />

                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold leading-none text-foreground/80"
                    >
                      Cover Letter
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="flex w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
                      placeholder="Why are you the best fit for this gig?"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div className="text-xs text-destructive animate-pulse">
                        {formik.errors.message}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!formik.isValid || bidLoading}
                    className="w-full h-12 rounded-full text-base font-semibold shadow-lg shadow-primary/20"
                  >
                    {bidLoading ? "Submitting Bid..." : "Submit Proposal"}
                  </Button>
                </form>
              </div>
            )
          ) : (
            <div className="bg-muted/30 p-10 rounded-2xl text-center backdrop-blur-sm border border-border/50">
              <h3 className="font-bold text-xl mb-3">Join to Place a Bid</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                Unlock the ability to bid on gigs and start earning. It takes
                less than a minute.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-11"
                  asChild
                >
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild className="rounded-full px-8 h-11 shadow-md">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;
