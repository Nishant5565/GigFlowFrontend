const TrustSection = () => {
  return (
    <section className="py-20 border-b border-border/50 bg-background">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center text-sm font-semibold text-muted-foreground mb-12 uppercase tracking-widest">
          Trusted by 10,000+ Freelancers & Teams Worldwide
        </div>
        <div className="flex justify-center flex-wrap gap-20">
          {[
            { value: "$50M+", label: "Paid to Freelancers" },
            { value: "10k+", label: "Verified Experts" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "24h", label: "Average Hire Time" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
