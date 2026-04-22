import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-ink text-white border-t border-gold/20">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="font-display text-3xl text-gold">MASHA ALLAH HEIGHT'S</div>
        <div className="gold-divider mt-3" />
        <p className="mt-4 text-white/65 max-w-md">A premium real estate destination in Islamabad offering shops, offices, food court, apartments and penthouses with flexible installment plans.</p>
        <div className="flex gap-3 mt-6">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-ink transition-colors">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-xl text-gold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-white/70">
          {["home","about","properties","payment","gallery","contact"].map((id) => (
            <li key={id}><a href={`#${id}`} className="hover:text-gold capitalize">{id}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display text-xl text-gold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li className="flex gap-2"><Phone className="w-4 h-4 text-gold mt-0.5" /> 03045252090</li>
          <li className="flex gap-2"><MapPin className="w-4 h-4 text-gold mt-0.5" /> Islamabad, Pakistan</li>
          <li className="flex gap-2"><Mail className="w-4 h-4 text-gold mt-0.5" /> info@mashaallahheights.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
        <div>© {new Date().getFullYear()} MASHA ALLAH HEIGHT'S. All rights reserved.</div>
        <Link to="/admin" className="hover:text-gold">Admin Login</Link>
      </div>
    </div>
  </footer>
);
