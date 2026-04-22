import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "properties", label: "Properties" },
  { id: "payment", label: "Payment Plan" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/95 backdrop-blur-md shadow-elegant" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#home" className="flex flex-col leading-none">
          <span className="font-display text-xl md:text-2xl text-gold tracking-wide">MASHA ALLAH</span>
          <span className="text-[10px] md:text-xs text-white tracking-[0.3em] uppercase">Heights</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm text-white/85 hover:text-gold transition-colors uppercase tracking-wider"
            >
              {l.label}
            </button>
          ))}
          <Button variant="default" className="bg-gold text-ink hover:bg-gold-light font-semibold" onClick={() => scrollTo("contact")}>
            Book Now
          </Button>
        </nav>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink border-t border-gold/20">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 text-white/85 hover:text-gold uppercase tracking-wider text-sm">
                {l.label}
              </button>
            ))}
            <Button className="bg-gold text-ink hover:bg-gold-light font-semibold" onClick={() => scrollTo("contact")}>
              Book Now
            </Button>
            <Link to="/admin" className="text-xs text-white/40 hover:text-gold mt-2">Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
};
