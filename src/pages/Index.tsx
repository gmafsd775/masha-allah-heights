import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Properties } from "@/components/site/Properties";
import { PaymentPlan } from "@/components/site/PaymentPlan";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Chatbot } from "@/components/site/Chatbot";

const Index = () => {
  useEffect(() => {
    document.title = "MASHA ALLAH HEIGHT'S — Luxury Real Estate in Islamabad";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); return m;
    })();
    meta.setAttribute("content", "Premium shops, offices, apartments & penthouses in Islamabad. 2.5 year easy installment plan with 30% down payment. Book Now.");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Properties />
      <PaymentPlan />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </main>
  );
};

export default Index;
