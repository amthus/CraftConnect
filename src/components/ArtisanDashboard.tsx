import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import DashboardLayout from './DashboardLayout';
import { MCard, MStatCard, MBadge } from './ui/millimeter';
import { 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Star, 
  DollarSign, 
  Clock, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  Eye,
  Hammer,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PRODUCTS } from '../lib/constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 600 },
  { name: 'Apr', sales: 800 },
  { name: 'May', sales: 700 },
  { name: 'Jun', sales: 900 },
];

export default function ArtisanDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'requests'>('sales');
  
  const artisanProducts = PRODUCTS.filter(p => p.artisanId === '1');
  const [localProducts, setLocalProducts] = useState(artisanProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleDeleteProduct = (id: string) => {
    setLocalProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Pièce retirée de la galerie");
  };

  const mockRequests = [
    { id: 'REQ-01', client: 'Alice B.', subject: 'Vase en bronze personnalisé', date: 'il y a 2 jours', status: 'En attente' },
    { id: 'REQ-02', client: 'Jean K.', subject: 'Statue de jardin sur mesure', date: 'Hier', status: 'En attente' },
  ];

  useEffect(() => {
    if (!token || user?.role !== 'artisan') {
      // For demo purposes, we might allow viewing if someone forces the route, but in production we redirect.
      // navigate('/login');
    }
  }, [token, user, navigate]);

  const stats = [
    { label: "Ventes Totales", value: "2,450€", icon: <DollarSign />, color: "bg-emerald-500", trend: "+12%" },
    { label: "Articles en Ligne", value: localProducts.length.toString(), icon: <Package />, color: "bg-terracotta", trend: "Stable" },
    { label: "Note Moyenne", value: "4.9/5", icon: <Star />, color: "bg-amber-500", trend: "+0.1" },
    { label: "Demandes Sur-Mesure", value: "3", icon: <Hammer />, color: "bg-blue-500", trend: "Nouveau" }
  ];

  const renderSales = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <MStatCard 
            key={i}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={React.cloneElement(stat.icon as React.ReactElement<any>, { size: 18 })}
            color={stat.color}
            delay={i * 0.05}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MCard className="lg:col-span-2 p-8 group overflow-hidden">
          <div className="mb-8">
            <h3 className="text-xl font-heading tracking-tight text-foreground/90 font-medium">Revenus Hebdomadaires</h3>
            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/30 mt-1">Données de ventes artisanales (6 derniers mois)</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} />
                <Tooltip cursor={{ fill: 'rgba(183,110,74,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }} />
                <Bar dataKey="sales" fill="#B76E4A" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </MCard>

        <MCard className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-heading tracking-tight text-foreground/90 font-medium">Flux Récent</h3>
            <MBadge variant="default">LIVE</MBadge>
          </div>
          <div className="space-y-4">
            {[
              { id: '#892', date: 'il y a 2h', amount: '290€', status: 'Payé' },
              { id: '#885', date: 'il y a 5h', amount: '450€', status: 'Payé' },
              { id: '#872', date: 'Hier', amount: '180€', status: 'Payé' }
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-sand/[0.03] rounded-xl border border-terracotta/5 hover:border-terracotta/10 transition-all group">
                <div>
                  <p className="font-bold text-xs font-mono tracking-tight">{order.id}</p>
                  <p className="text-[9px] font-mono font-bold text-foreground/20 uppercase tracking-widest">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-lg text-terracotta font-medium">{order.amount}</p>
                  <span className="text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/30 hover:text-terracotta hover:bg-terracotta/5">Exporter Historique (CSV)</Button>
        </MCard>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-heading tracking-tight font-medium">Ma Galerie de <span className="text-terracotta">Créations</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Catalogue numérique authentifié</p>
        </div>
        <Button 
          onClick={() => setIsAddProductOpen(true)}
          className="bg-terracotta text-white rounded-xl px-6 h-11 uppercase font-black text-[10px] tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={16} className="mr-2" /> Publier une Oeuvre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {localProducts.map(product => (
          <MCard 
            key={product.id}
            className="group overflow-hidden flex flex-col hover:border-terracotta/30"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-sand/20">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute top-4 right-4">
                  <MBadge variant="default">{product.category}</MBadge>
               </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
               <div>
                  <h4 className="text-xl font-heading tracking-tight font-medium leading-tight">{product.name}</h4>
                  <p className="text-[10px] font-serif italic text-muted-foreground mt-1">{product.origin}</p>
               </div>
               <div className="flex justify-between items-end pt-4 border-t border-terracotta/5">
                  <div>
                    <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest mb-1">Valeur Actuelle</p>
                    <p className="text-2xl font-heading text-terracotta font-medium">{product.price}€</p>
                  </div>
                  <div className="flex gap-1.5 font-sans">
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-9 w-9 rounded-lg hover:bg-terracotta/5 text-foreground/40"
                       onClick={() => setEditingProduct(product)}
                     >
                       <Edit size={16} />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500"
                       onClick={() => handleDeleteProduct(product.id)}
                     >
                       <Trash2 size={16} />
                     </Button>
                  </div>
               </div>
            </div>
          </MCard>
        ))}
      </div>

      <AnimatePresence>
        {isAddProductOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddProductOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl font-heading mb-8">Nouvelle <span className="text-terracotta">Création</span></h2>
              <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); toast.success("Produit ajouté !"); setIsAddProductOpen(false); }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom de la pièce</label>
                    <input type="text" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none focus:ring-1 focus:ring-terracotta" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Catégorie</label>
                    <select className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                      <option value="">Sélectionner</option>
                      <option>Sculpture</option>
                      <option>Textile</option>
                      <option>Céramique</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Prix de vente (€)</label>
                   <input type="number" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Description de l'Artiste</label>
                  <textarea rows={3} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setIsAddProductOpen(false)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Publier l'Oeuvre</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProduct(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl font-heading mb-8">Éditer <span className="text-terracotta">L'Oeuvre</span></h2>
              <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); toast.success("Mise à jour réussie !"); setEditingProduct(null); }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom de la pièce</label>
                    <input type="text" defaultValue={editingProduct.name} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none focus:ring-1 focus:ring-terracotta" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Catégorie</label>
                    <select className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" defaultValue={editingProduct.category} required>
                      <option>Sculpture</option>
                      <option>Textile</option>
                      <option>Céramique</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Prix de vente (€)</label>
                   <input type="number" defaultValue={editingProduct.price} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Description de l'Artiste</label>
                  <textarea rows={3} defaultValue={editingProduct.description} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setEditingProduct(null)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Mettre à jour</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-heading tracking-tight font-medium">Demandes <span className="text-terracotta">Sur-Mesure</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Dialogue direct pour des créations uniques</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockRequests.map(req => (
          <MCard key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-bold text-base tracking-tight">{req.subject}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest">{req.client}</p>
                  <span className="text-[9px] text-foreground/10">•</span>
                  <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest italic">{req.date}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all" onClick={() => toast.success("Demande acceptée !")}>Accepter</Button>
              <Button variant="ghost" className="h-10 px-6 rounded-xl text-[10px] uppercase font-black tracking-widest text-red-500 hover:bg-red-50" onClick={() => toast.error("Demande refusée")}>Décliner</Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-sand/50"><Eye size={18} /></Button>
            </div>
          </MCard>
        ))}
      </div>

      <MCard className="p-12 border-dashed border-2 flex flex-col items-center text-center space-y-8 bg-sand/5 mt-8">
        <div className="h-16 w-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Hammer size={28} />
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-heading italic font-light tracking-tight">Le <span className="text-terracotta">Futur</span> des Créations</h3>
          <p className="text-base text-muted-foreground font-serif italic max-w-sm mx-auto leading-relaxed">
            "Restez à l'écoute de ces visions précieuses. Chaque demande est une opportunité d'étendre votre art vers de nouveaux horizons."
          </p>
        </div>
      </MCard>
    </div>
  );

  return (
    <DashboardLayout title="Atelier de Maître">
      <div className="mb-10 flex gap-8 border-b border-terracotta/5">
        {[
          { id: 'sales', label: 'Ventes & Stats', icon: <TrendingUp size={16}/> },
          { id: 'inventory', label: 'Mon Stock', icon: <Package size={16}/> },
          { id: 'requests', label: 'Demandes Sur-Mesure', icon: <Hammer size={16}/> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-[10px] uppercase font-black tracking-widest relative transition-all ${
              activeTab === tab.id ? 'text-terracotta' : 'text-muted-foreground opacity-50 hover:opacity-100'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeArtisanTab" className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-full" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, x: 10 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -10 }}
           transition={{ duration: 0.3 }}
        >
          {activeTab === 'sales' && renderSales()}
          {activeTab === 'inventory' && renderInventory()}
          {activeTab === 'requests' && renderRequests()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
