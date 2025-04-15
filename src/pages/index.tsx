import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = ({ section }: { section?: string }) => {
  const location = useLocation();

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        console.log("element: ", element);
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to top when it's just "/"
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, section]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
