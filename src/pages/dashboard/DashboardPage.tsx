import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { getMyGigs } from "@/features/gigSlice";
import { getMyBids } from "@/features/bidSlice";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, Briefcase } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { gigs, isLoading: isGigsLoading } = useSelector(
    (state: RootState) => state.gigs
  );
  const { bids, isLoading: isBidsLoading } = useSelector(
    (state: RootState) => state.bids
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getMyGigs());
      dispatch(getMyBids());
    }
  }, [user, navigate, dispatch]);

  const getStatusColor = (
    status: "open" | "active" | "completed" | "assigned"
  ) => {
    switch (status) {
      case "open":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "assigned":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getBidStatusColor = (status: "pending" | "hired" | "rejected") => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your gigs and applications.
          </p>
        </div>
        <Button
          onClick={() => navigate("/dashboard/gigs/new")}
          className="shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Post New Gig
        </Button>
      </div>

      <Tabs defaultValue="posted-gigs" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="posted-gigs">My Posted Gigs</TabsTrigger>
          <TabsTrigger value="my-applications">My Applications</TabsTrigger>
        </TabsList>

        {/* My Posted Gigs Content */}
        <TabsContent value="posted-gigs">
          {isGigsLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading your gigs...
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
              <LayoutDashboard className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No gigs posted yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Create your first gig to start hiring freelancers.
              </p>
              <Button onClick={() => navigate("/dashboard/gigs/new")}>
                Post a Gig
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigs.map((gig) => (
                    <TableRow key={gig._id}>
                      <TableCell className="font-medium text-foreground">
                        {gig.title}
                      </TableCell>
                      <TableCell>${gig.budget}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            gig.status as any
                          )}`}
                        >
                          {gig.status.charAt(0).toUpperCase() +
                            gig.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/dashboard/gigs/${gig._id}/bids`}>
                            View Bids
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* My Applications Content */}
        <TabsContent value="my-applications">
          {isBidsLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading your applications...
            </div>
          ) : bids.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No applications yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Browse available gigs and start applying.
              </p>
              <Button onClick={() => navigate("/gigs")}>Browse Gigs</Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[40%]">Gig Title</TableHead>
                    <TableHead>My Bid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Date Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid._id}>
                      <TableCell className="font-medium text-foreground">
                        {(bid.gigId as any)?.title || "Unknown Gig"}
                      </TableCell>
                      <TableCell>${bid.price}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getBidStatusColor(
                            bid.status
                          )}`}
                        >
                          {bid.status.charAt(0).toUpperCase() +
                            bid.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
