import { MessageCircle } from "lucide-react";

export const WhatsAppButton = ({ number = "923045252090" }: { number?: string }) => (
  <a
    href={`https://wa.me/${number}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-transform animate-float"
  >
    <MessageCircle className="w-7 h-7" />
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
  </a>
);
