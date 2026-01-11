import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createGig } from "@/features/gigSlice";
import type { AppDispatch, RootState } from "@/store";
import AuthInput from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const PostGigPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess } = useSelector(
    (state: RootState) => state.gigs
  );

  useEffect(() => {
    if (isSuccess) {
      // Navigate back to dashboard on success, wait a tick or just reset state if needed
      // Actually we should toggle success off, but for now simple redirect
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      budget: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(5, "Title too short"),
      description: Yup.string()
        .required("Description is required")
        .min(20, "Description too short"),
      budget: Yup.number()
        .required("Budget is required")
        .positive("Must be positive"),
    }),
    onSubmit: (values) => {
      dispatch(
        createGig({
          title: values.title,
          description: values.description,
          budget: Number(values.budget),
        })
      );
    },
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl min-h-[calc(100vh-200px)]">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Post a New Gig
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Describe your project clearly to attract the best freelancers.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-8 md:p-10 shadow-xl">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <AuthInput
            id="title"
            name="title"
            type="text"
            label="Gig Title"
            placeholder="e.g. Build a React Landing Page"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title}
            touched={formik.touched.title}
          />

          <div className="space-y-3">
            <label
              htmlFor="description"
              className="text-sm font-semibold leading-none text-foreground/80"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={8}
              className="flex w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
              placeholder="Describe the requirements..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-xs text-destructive font-medium animate-pulse">
                {formik.errors.description}
              </div>
            )}
          </div>

          <AuthInput
            id="budget"
            name="budget"
            type="number"
            label="Budget ($)"
            placeholder="e.g. 500"
            value={formik.values.budget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.budget}
            touched={formik.touched.budget}
          />

          <div className="pt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-6"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className="rounded-full px-8 shadow-lg shadow-primary/25"
            >
              {isLoading ? "Posting..." : "Post Gig"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostGigPage;
