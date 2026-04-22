import { motion } from "framer-motion";
import { Calendar, Coins, Wallet, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "@/assets/bg-payment.jpg";

const items = [
  { icon: Wallet, title: "30% Down Payment", desc: "Reserve your unit with a comfortable booking amount." },
  { icon: Calendar, title: "2.5 Year Plan", desc: "Spread the balance over 30 easy monthly installments." },
  { icon: Coins, title: "Flexible Schedule", desc: "Custom installment plans tailored to your budget." },
  { icon: BadgeCheck, title: "Zero Hidden Fees", desc: "Transparent pricing with no surprise charges." },
];

export const PaymentPlan = () => (
  <section id="payment" className="relative py-24 md:py-32 overflow-hidden bg-ink text-white">
    <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" loading="lazy" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold tracking-[0.3em] text-xs uppercase">Investment Made Easy</span>
        <h2 className="font-display text-4xl md:text-6xl mt-3">
          Easy & Flexible <span className="italic text-gradient-gold">Payments</span>
        </h2>
        <div className="gold-divider mx-auto mt-6" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group p-8 border border-gold/20 bg-ink-soft/60 backdrop-blur hover:border-gold transition-all duration-500"
          >
            <it.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl">{it.title}</h3>
            <p className="text-white/65 mt-2 text-sm leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto p-8 md:p-12 border border-gold bg-gradient-to-br from-ink-soft to-ink text-center">
        <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Featured Plan Snapshot</div>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div><div className="font-display text-3xl md:text-5xl text-gold">30%</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Down</div></div>
          <div className="border-x border-gold/20"><div className="font-display text-3xl md:text-5xl text-gold">30</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Months</div></div>
          <div><div className="font-display text-3xl md:text-5xl text-gold">2.5</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Years</div></div>
        </div>
        <Button size="lg" className="bg-gold text-ink hover:bg-gold-light font-semibold mt-4"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Get Full Plan Details
        </Button>
      </div>
    </div>
  </section>
);
