import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href: string, tab?: "login" | "signup") => {
    setMobileMenuOpen(false);
    navigate(href, { state: tab ? { tab } : {} });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center text-primary font-bold text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="3" x2="21" y1="9" y2="9" />
              <path d="m9 16 2 2 4-4" />
            </svg>
            TextPeek
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium hover:text-primary transition-colors hover:cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" onClick={() => handleNavClick("/auth")}>
            Log in
          </Button>
          <Button
            className="btn-shine"
            onClick={() => handleNavClick("/auth", "signup")}
          >
            Get Started
          </Button>
          <ThemeToggle />
        </div>

        <button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-left font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" onClick={() => handleNavClick("/auth")}>
                Log in
              </Button>
              <Button
                className="btn-shine"
                onClick={() => handleNavClick("/auth", "signup")}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
