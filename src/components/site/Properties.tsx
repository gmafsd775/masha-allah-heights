import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import shops from "@/assets/prop-shops.jpg";
import offices from "@/assets/prop-offices.jpg";
import food from "@/assets/prop-foodcourt.jpg";
import apts from "@/assets/prop-apartments.jpg";
import pent from "@/assets/prop-penthouses.jpg";

const fallback = [
  { id: "1", title: "Premium Shops", category: "Shops", description: "High-footfall retail spaces with elegant facades and prime visibility.", image_url: shops, price: "Starting Rs. 4.5M" },
  { id: "2", title: "Corporate Offices", category: "Offices", description: "Modern offices with panoramic views and smart infrastructure.", image_url: offices, price: "Starting Rs. 6M" },
  { id: "3", title: "Grand Food Court", category: "Food Court", description: "Vibrant dining destinations with premium ambience.", image_url: food, price: "On Request" },
  { id: "4", title: "Luxury Apartments", category: "Apartments", description: "Spacious 1, 2 & 3 bedroom apartments with city views.", image_url: apts, price: "Starting Rs. 9M" },
  { id: "5", title: "Sky Penthouses", category: "Penthouses", description: "Exclusive top-floor residences with private terraces.", image_url: pent, price: "On Request" },
];

export const Properties = () => {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    supabase.from("properties").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length) setItems(data as any);
    });
  }, []);

  return (
    <section id="properties" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase">Discover Spaces</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 text-ink">Our <span className="italic text-gradient-gold">Properties</span></h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="text-muted-foreground mt-6">From bustling retail to private penthouses, find the perfect space for living and investment.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden bg-ink shadow-soft hover:shadow-elegant transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.image_url || shops} alt={item.title} loading="lazy" width={1024} height={768}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-gold text-ink text-xs px-3 py-1 uppercase tracking-widest font-semibold">{item.category}</span>
              </div>
              <div className="p-6 text-white">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="text-sm text-white/65 mt-2 line-clamp-2">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  {item.price && <span className="text-gold text-sm font-semibold">{item.price}</span>}
                  <Button variant="ghost" size="sm" className="text-white hover:text-gold hover:bg-transparent p-0 group/btn"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                    View Details <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
