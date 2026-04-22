import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import bg from "@/assets/bg-contact.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  phone: z.string().trim().min(7, "Invalid phone").max(20),
  message: z.string().trim().min(5, "Message too short").max(800),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [contact, setContact] = useState({ phone: "03045252090", location: "Islamabad, Pakistan", email: "info@mashaallahheights.com", whatsapp: "03045252090" });

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle().then(({ data }) => {
      if (data?.value) setContact({ ...contact, ...(data.value as any) });
    });
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.errors[0].message); return; }
    const text = `Name: ${form.name}%0APhone: ${form.phone}%0AMessage: ${form.message}`;
    const wa = contact.whatsapp.replace(/\D/g, "");
    const num = wa.startsWith("0") ? "92" + wa.slice(1) : wa;
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your inquiry");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-ink text-white overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3">Contact <span className="italic text-gradient-gold">Us</span></h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
            {[
              { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
              { icon: MapPin, label: "Location", value: contact.location },
              { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
            ].map((c) => (
              <a key={c.label} href={c.href || "#"} className="flex items-start gap-4 p-6 border border-gold/20 hover:border-gold transition-colors">
                <div className="w-12 h-12 bg-gold text-ink flex items-center justify-center shrink-0"><c.icon /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold">{c.label}</div>
                  <div className="text-lg mt-1">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="aspect-video w-full overflow-hidden border border-gold/20">
              <iframe
                title="Islamabad Map"
                src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
                className="w-full h-full" loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="p-8 md:p-10 bg-ink-soft/80 backdrop-blur border border-gold/30 space-y-5">
            <h3 className="font-display text-3xl text-gold">Send Inquiry</h3>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/60">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={80}
                className="bg-ink border-gold/20 text-white mt-2 focus-visible:ring-gold" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/60">Phone</label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required maxLength={20}
                className="bg-ink border-gold/20 text-white mt-2 focus-visible:ring-gold" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/60">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} maxLength={800}
                className="bg-ink border-gold/20 text-white mt-2 focus-visible:ring-gold resize-none" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gold text-ink hover:bg-gold-light font-semibold">
              <Send className="mr-2 w-4 h-4" /> Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
