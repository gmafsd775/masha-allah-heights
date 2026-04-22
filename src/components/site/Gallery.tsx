import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const fallback = [g1, g2, g3, g4, g5, g6].map((src, i) => ({ id: String(i), image_url: src, caption: null }));

export const Gallery = () => {
  const [images, setImages] = useState(fallback);
  useEffect(() => {
    supabase.from("gallery_images").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length) setImages(data as any);
    });
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase">Our Showcase</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 text-ink">Project <span className="italic text-gradient-gold">Gallery</span></h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className={`relative overflow-hidden group cursor-pointer ${i % 5 === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}
            >
              <img src={img.image_url} alt={img.caption || "Project image"} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-500 flex items-end p-4">
                <span className="text-white text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {img.caption || "MASHA ALLAH HEIGHT'S"}
                </span>
              </div>
              <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-gold transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
