import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="pb-32 pt-10">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="bg-primary rounded-3xl p-16 md:p-24 text-center text-primary-foreground flex flex-col items-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Start hiring smarter today
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-[600px] leading-relaxed">
            Join thousands of forward-thinking companies building the future
            with flexible talent.
          </p>
          <Link
            to="#"
            className="inline-flex items-center justify-center h-14 px-10 rounded-md text-lg font-semibold bg-white text-primary hover:bg-slate-100 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
