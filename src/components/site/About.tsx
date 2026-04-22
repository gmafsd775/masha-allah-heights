import { motion } from "framer-motion";
import { Award, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import bg from "@/assets/bg-about.jpg";

const stats = [
  { icon: Award, label: "Trusted Brand", value: "100%" },
  { icon: MapPin, label: "Prime Location", value: "Islamabad" },
  { icon: TrendingUp, label: "Investment ROI", value: "High" },
  { icon: ShieldCheck, label: "Secure Project", value: "Approved" },
];

export const About = () => (
  <section id="about" className="relative py-24 md:py-32 bg-ink text-white overflow-hidden">
    <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
    <div className="container relative">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-gold tracking-[0.3em] text-xs uppercase">About The Project</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight">
            A New Standard of <span className="text-gradient-gold italic">Luxury Living</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="mt-6 text-white/75 text-lg leading-relaxed">
            <span className="text-gold font-semibold">MASHA ALLAH HEIGHT'S</span> is a premium real estate development located in Islamabad, Pakistan — designed for discerning buyers and investors who demand modern lifestyle, world-class amenities, and an iconic address.
          </p>
          <p className="mt-4 text-white/65 leading-relaxed">
            Built on trust, crafted with excellence, and engineered for long-term value. Our flexible payment plans make owning a piece of luxury easier than ever.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="border border-gold/20 bg-ink-soft/40 backdrop-blur p-6 hover:border-gold/60 transition-colors">
              <s.icon className="w-8 h-8 text-gold mb-3" />
              <div className="font-display text-3xl text-white">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
