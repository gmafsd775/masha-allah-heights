import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Trash2, Upload, Save } from "lucide-react";

type Property = { id: string; title: string; category: string; description: string; price: string | null; image_url: string | null; sort_order: number };
type GalleryImg = { id: string; image_url: string; caption: string | null; sort_order: number };

const AdminDashboard = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [gallery, setGallery] = useState<GalleryImg[]>([]);
  const [contact, setContact] = useState({ phone: "", location: "", email: "", whatsapp: "" });
  const [plan, setPlan] = useState({ down_payment: "", duration: "", installments: "", note: "" });
  const [newProp, setNewProp] = useState({ title: "", category: "Apartments", description: "", price: "", image_url: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | MASHA ALLAH HEIGHT'S";
    if (!loading && (!user || !isAdmin)) nav("/admin/login");
  }, [user, isAdmin, loading, nav]);

  useEffect(() => { if (user && isAdmin) loadAll(); }, [user, isAdmin]);

  const loadAll = async () => {
    const [p, g, c, pl] = await Promise.all([
      supabase.from("properties").select("*").order("sort_order"),
      supabase.from("gallery_images").select("*").order("sort_order"),
      supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle(),
      supabase.from("site_settings").select("value").eq("key", "payment_plan").maybeSingle(),
    ]);
    setProperties((p.data as any) || []);
    setGallery((g.data as any) || []);
    if (c.data?.value) setContact(c.data.value as any);
    if (pl.data?.value) setPlan(pl.data.value as any);
  };

  const upload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      return data.publicUrl;
    } catch (e: any) { toast.error(e.message); return null; }
    finally { setUploading(false); }
  };

  const addProperty = async () => {
    if (!newProp.title) return toast.error("Title required");
    const { error } = await supabase.from("properties").insert({ ...newProp, sort_order: properties.length });
    if (error) return toast.error(error.message);
    toast.success("Property added");
    setNewProp({ title: "", category: "Apartments", description: "", price: "", image_url: "" });
    loadAll();
  };

  const updateProperty = async (id: string, patch: Partial<Property>) => {
    const { error } = await supabase.from("properties").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    loadAll();
  };

  const deleteProperty = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await supabase.from("properties").delete().eq("id", id);
    toast.success("Deleted");
    loadAll();
  };

  const addGalleryImage = async (file: File) => {
    const url = await upload(file);
    if (!url) return;
    await supabase.from("gallery_images").insert({ image_url: url, sort_order: gallery.length });
    toast.success("Image added");
    loadAll();
  };

  const deleteGallery = async (id: string) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    loadAll();
  };

  const saveContact = async () => {
    const { error } = await supabase.from("site_settings").upsert({ key: "contact", value: contact });
    if (error) return toast.error(error.message);
    toast.success("Contact info saved");
  };
  const savePlan = async () => {
    const { error } = await supabase.from("site_settings").upsert({ key: "payment_plan", value: plan });
    if (error) return toast.error(error.message);
    toast.success("Payment plan saved");
  };

  const logout = async () => { await supabase.auth.signOut(); nav("/admin/login"); };

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen bg-ink flex items-center justify-center text-white"><Loader2 className="animate-spin text-gold" /></div>;
  }

  return (
    <main className="min-h-screen bg-ink text-white">
      <header className="border-b border-gold/20 bg-ink-soft">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <div className="font-display text-2xl text-gold">Admin Dashboard</div>
            <div className="text-xs text-white/50">{user.email}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-ink bg-transparent" onClick={() => nav("/")}>View Site</Button>
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-ink bg-transparent" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Tabs defaultValue="properties">
          <TabsList className="bg-ink-soft border border-gold/20">
            <TabsTrigger value="properties" className="data-[state=active]:bg-gold data-[state=active]:text-ink">Properties</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gold data-[state=active]:text-ink">Gallery</TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-gold data-[state=active]:text-ink">Payment Plan</TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-gold data-[state=active]:text-ink">Contact Info</TabsTrigger>
          </TabsList>

          {/* PROPERTIES */}
          <TabsContent value="properties" className="mt-6 space-y-6">
            <div className="p-6 border border-gold/20 bg-ink-soft">
              <h3 className="font-display text-xl text-gold mb-4">Add New Property</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Title" value={newProp.title} onChange={(e) => setNewProp({ ...newProp, title: e.target.value })} className="bg-ink border-gold/20" />
                <select value={newProp.category} onChange={(e) => setNewProp({ ...newProp, category: e.target.value })}
                  className="bg-ink border border-gold/20 text-white px-3 py-2 rounded">
                  {["Shops","Offices","Food Court","Apartments","Penthouses"].map(c => <option key={c}>{c}</option>)}
                </select>
                <Input placeholder="Price" value={newProp.price} onChange={(e) => setNewProp({ ...newProp, price: e.target.value })} className="bg-ink border-gold/20 md:col-span-2" />
                <Textarea placeholder="Description" value={newProp.description} onChange={(e) => setNewProp({ ...newProp, description: e.target.value })} className="bg-ink border-gold/20 md:col-span-2" rows={3} />
                <label className="md:col-span-2 cursor-pointer">
                  <div className="border border-dashed border-gold/40 p-4 text-center text-sm text-white/70 hover:border-gold transition-colors">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-gold" />
                    {newProp.image_url ? "Image uploaded — click to change" : "Click to upload image"}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    const url = await upload(f); if (url) setNewProp({ ...newProp, image_url: url });
                  }} />
                </label>
                {newProp.image_url && <img src={newProp.image_url} alt="preview" className="md:col-span-2 h-32 w-32 object-cover" />}
              </div>
              <Button className="mt-4 bg-gold text-ink hover:bg-gold-light" onClick={addProperty} disabled={uploading}>
                <Plus className="w-4 h-4 mr-2" /> Add Property
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {properties.map((p) => (
                <div key={p.id} className="border border-gold/20 bg-ink-soft p-4 flex gap-4">
                  {p.image_url && <img src={p.image_url} alt="" className="w-24 h-24 object-cover shrink-0" />}
                  <div className="flex-1 space-y-2">
                    <Input value={p.title} onChange={(e) => setProperties(properties.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))} className="bg-ink border-gold/20" />
                    <Input value={p.price || ""} placeholder="Price" onChange={(e) => setProperties(properties.map(x => x.id === p.id ? { ...x, price: e.target.value } : x))} className="bg-ink border-gold/20" />
                    <Textarea value={p.description} onChange={(e) => setProperties(properties.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} className="bg-ink border-gold/20" rows={2} />
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gold text-ink hover:bg-gold-light" onClick={() => updateProperty(p.id, { title: p.title, price: p.price, description: p.description })}>
                        <Save className="w-3 h-3 mr-1" /> Save
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProperty(p.id)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* GALLERY */}
          <TabsContent value="gallery" className="mt-6 space-y-6">
            <label className="cursor-pointer block">
              <div className="border border-dashed border-gold/40 p-8 text-center hover:border-gold transition-colors">
                <Upload className="w-8 h-8 mx-auto text-gold mb-2" />
                <div className="text-white/70">Click to upload gallery image</div>
                {uploading && <Loader2 className="animate-spin mx-auto mt-2 text-gold" />}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addGalleryImage(f); }} />
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map(img => (
                <div key={img.id} className="relative group">
                  <img src={img.image_url} alt="" className="aspect-square w-full object-cover" />
                  <button onClick={() => deleteGallery(img.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* PAYMENT */}
          <TabsContent value="payment" className="mt-6">
            <div className="max-w-xl space-y-4 p-6 border border-gold/20 bg-ink-soft">
              {(["down_payment","duration","installments","note"] as const).map(k => (
                <div key={k}>
                  <label className="text-xs uppercase tracking-widest text-white/60">{k.replace("_"," ")}</label>
                  <Input value={(plan as any)[k]} onChange={(e) => setPlan({ ...plan, [k]: e.target.value })} className="bg-ink border-gold/20 mt-2" />
                </div>
              ))}
              <Button className="bg-gold text-ink hover:bg-gold-light" onClick={savePlan}><Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </TabsContent>

          {/* CONTACT */}
          <TabsContent value="contact" className="mt-6">
            <div className="max-w-xl space-y-4 p-6 border border-gold/20 bg-ink-soft">
              {(["phone","whatsapp","email","location"] as const).map(k => (
                <div key={k}>
                  <label className="text-xs uppercase tracking-widest text-white/60">{k}</label>
                  <Input value={(contact as any)[k]} onChange={(e) => setContact({ ...contact, [k]: e.target.value })} className="bg-ink border-gold/20 mt-2" />
                </div>
              ))}
              <Button className="bg-gold text-ink hover:bg-gold-light" onClick={saveContact}><Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminDashboard;
