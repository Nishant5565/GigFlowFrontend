import { Briefcase, User, Check } from "lucide-react";

const AudienceSection = () => {
  return (
    <section className="py-30">
      <div className="container mx-auto px-10 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* For Clients */}
          <div className="bg-background border border-border rounded-xl p-16 flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-bold">For Clients</h3>
            </div>
            <p className="text-muted-foreground text-lg">
              Scale your team without the overhead. Find top-tier talent ready
              to work on your schedule.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Post jobs easily in minutes",
                "Compare bids and portfolios",
                "Hire safely with escrow protection",
                "Manage contracts seamlessly",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-base text-foreground"
                >
                  <Check className="text-primary" size={20} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* For Freelancers */}
          <div className="bg-muted border border-border rounded-xl p-16 flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary">
                <User size={24} />
              </div>
              <h3 className="text-3xl font-bold">For Freelancers</h3>
            </div>
            <p className="text-muted-foreground text-lg">
              Access a global marketplace of opportunities. Build your
              reputation and earn what you deserve.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Find real work with quality clients",
                "Fair competition based on skill",
                "Instant updates on new jobs",
                "Guaranteed payments on time",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-base text-foreground"
                >
                  <Check className="text-primary" size={20} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
