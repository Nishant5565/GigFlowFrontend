import React from "react";
import { Link } from "react-router";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-border bg-background">
      <div className="container mx-auto px-10 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://cdn.brandure.online/gigflow-logo.webp"
                alt="GigFlow"
                className="h-8 w-auto"
              />
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              The modern marketplace for the future of work. Connecting talent
              with opportunity, securely and efficiently.
            </p>
          </div>

          {/* Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-foreground">
              Product
            </h4>
            <nav className="flex flex-col gap-4">
              <Link
                to="/gigs"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Browse Gigs
              </Link>
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>
          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Contact"],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Security",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-foreground">
                {col.title}
              </h4>
              <nav className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <Link
                    key={link}
                    to="#"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-sm text-muted-foreground">
          <div>© 2025 GigFlow Inc. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
