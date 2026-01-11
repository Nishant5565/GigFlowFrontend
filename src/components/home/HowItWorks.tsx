import { FilePlus, Users, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-30">
      <div className="container mx-auto px-10 max-w-[1280px]">
        <h2 className="text-4xl font-semibold leading-tight mb-4 text-center">
          How It Works
        </h2>
        <p className="text-lg text-center max-w-[600px] mx-auto mb-16 text-muted-foreground">
          Get your project done in three simple steps. We handle the complexity
          so you can focus on the work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "Step 01",
              title: "Post a Gig",
              desc: "Describe your project requirements, budget, and timeline. It takes less than 2 minutes to get started.",
              icon: FilePlus,
            },
            {
              step: "Step 02",
              title: "Receive Bids",
              desc: "Qualified freelancers will submit proposals. Review portfolios, ratings, and quotes to find the perfect match.",
              icon: Users,
            },
            {
              step: "Step 03",
              title: "Hire with Confidence",
              desc: "Start the project securely. Payments are held in escrow and released only when you're satisfied with the work.",
              icon: CheckCircle,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-start gap-6 p-6 rounded-2xl border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-primary border border-border/50">
                <item.icon size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
