import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WEBHOOK = "https://vmi2915475.contaboserver.net/webhook/Mashallah-heights";

type Msg = { role: "user" | "bot"; text: string };

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Assalam-o-Alaikum! 👋 Welcome to MASHA ALLAH HEIGHT'S. How can I help you today?" },
  ]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId, chatInput: text }),
      });
      let reply = "Thanks! Our team will get back to you shortly.";
      if (res.ok) {
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          const data = await res.json();
          reply = data.output || data.reply || data.message || data.text || data.answer || JSON.stringify(data);
        } else {
          const t = await res.text();
          if (t) reply = t;
        }
      }
      setMessages((m) => [...m, { role: "bot", text: String(reply) }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Sorry, I couldn't reach the server. Please try again or contact us via WhatsApp." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-gold text-ink flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-96 h-[480px] max-h-[calc(100vh-8rem)] bg-ink border border-gold/30 shadow-elegant flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-gold text-ink px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ink text-gold flex items-center justify-center font-display font-bold">M</div>
              <div className="flex-1">
                <div className="font-semibold">MASHA ALLAH Assistant</div>
                <div className="text-xs opacity-80">Online • Ready to help</div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-ink-soft">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gold text-ink rounded-l-2xl rounded-tr-2xl"
                      : "bg-ink text-white border border-gold/20 rounded-r-2xl rounded-tl-2xl"
                  }`}>{m.text}</div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-ink text-white border border-gold/20 px-4 py-2 rounded-r-2xl rounded-tl-2xl text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gold" /> Typing...
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 bg-ink border-t border-gold/20 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                maxLength={500}
                className="bg-ink-soft border-gold/20 text-white focus-visible:ring-gold"
              />
              <Button type="submit" size="icon" disabled={busy || !input.trim()} className="bg-gold text-ink hover:bg-gold-light shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
