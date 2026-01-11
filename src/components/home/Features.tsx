import {
  ShieldCheck,
  Zap,
  MousePointerClick,
  Bell,
  CreditCard,
  BarChart3,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-30 bg-muted/50">
      <div className="container mx-auto px-10 max-w-[1280px]">
        <h2 className="text-4xl font-semibold leading-tight mb-4 text-center">
          Everything you need to scale
        </h2>
        <p className="text-lg text-center max-w-[600px] mx-auto mb-16 text-muted-foreground">
          Powerful features built for modern teams and ambitious freelancers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Secure Authentication",
              desc: "Enterprise-grade security with verified identities and multi-factor authentication for all accounts.",
              icon: ShieldCheck,
            },
            {
              title: "Smart Bidding System",
              desc: "Our AI matches projects with the most relevant talent, saving you time sifting through proposals.",
              icon: Zap,
            },
            {
              title: "One-click Hiring",
              desc: "Found the right person? Send a contract and start the project instantly with standardized terms.",
              icon: MousePointerClick,
            },
            {
              title: "Real-time Notifications",
              desc: "Stay updated on project milestones, messages, and payments without refreshing the page.",
              icon: Bell,
            },
            {
              title: "Transparent Pricing",
              desc: "No hidden fees. See exactly what you're paying or earning before the project begins.",
              icon: CreditCard,
            },
            {
              title: "Project Insights",
              desc: "Track time, budget burn rate, and project velocity with built-in analytics tools.",
              icon: BarChart3,
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card p-8 rounded-xl border border-border/50 hover:border-border hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
