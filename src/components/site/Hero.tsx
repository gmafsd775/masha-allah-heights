import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import hero from "@/assets/hero-building.jpg";

export const Hero = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img src={hero} alt="Masha Allah Heights luxury tower in Islamabad" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/95" />
      <div className="container relative z-10 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <span className="inline-block px-4 py-1.5 border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase mb-6">
            Islamabad • Pakistan
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] max-w-5xl">
            Own Your Dream Property With <span className="text-gradient-gold italic">Easy Installments</span>
          </h1>
          <div className="gold-divider mt-8" />
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Experience luxury living at <span className="text-gold font-semibold">MASHA ALLAH HEIGHT'S</span> — premium shops, offices, apartments and penthouses in the heart of Islamabad.
          </p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 inline-flex items-center gap-4 bg-ink/60 backdrop-blur border border-gold/30 px-6 py-4">
            <div>
              <div className="text-gold text-3xl md:text-4xl font-display font-semibold">2.5 Years</div>
              <div className="text-white/70 text-xs uppercase tracking-widest">Easy Installment Plan</div>
            </div>
            <div className="h-12 w-px bg-gold/40" />
            <div>
              <div className="text-gold text-3xl md:text-4xl font-display font-semibold">30%</div>
              <div className="text-white/70 text-xs uppercase tracking-widest">Down Payment</div>
            </div>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="bg-gold text-ink hover:bg-gold-light font-semibold tracking-wide shadow-gold" onClick={() => scrollTo("contact")}>
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-ink bg-transparent" onClick={() => scrollTo("contact")}>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest animate-float">SCROLL</div>
    </section>
  );
};
