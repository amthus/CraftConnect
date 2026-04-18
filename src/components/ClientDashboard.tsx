import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import DashboardLayout from './DashboardLayout';
import { MCard, MBadge } from './ui/millimeter';
import { 
  Package, 
  Heart, 
  ChevronRight, 
  ChevronDown, 
  History, 
  Sparkles,
  MessageCircle,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/constants';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Order {
  id: string;
  userId: string;
  products: string[];
  status: string;
  total: number;
  date: string;
}

export default function ClientDashboard() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'acquisitions' | 'wishlist' | 'preferences' | 'support'>('acquisitions');
  const [wishlistProducts, setWishlistProducts] = useState(PRODUCTS.slice(0, 2));

  useEffect(() => {
    // Mock data for demo
    const mockOrders = [
      { id: 'ORD-2024-001', userId: '1', products: ['1', '3'], status: 'Livré', total: 1650, date: '12 Avril 2024' },
      { id: 'ORD-2024-002', userId: '1', products: ['4'], status: 'En préparation', total: 2400, date: '15 Avril 2024' }
    ];
    setOrders(mockOrders);
  }, []);

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const renderAcquisitions = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading tracking-tight">Mon <span className="text-terracotta">Héritage</span></h2>
          <p className="text-[9px] text-muted-foreground uppercase font-mono font-bold tracking-widest mt-1 opacity-40">Historique des pièces acquises</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => {
          const isExpanded = expandedOrders.includes(order.id);
          return (
            <MCard 
              key={order.id}
              className="overflow-hidden group"
            >
              <button 
                onClick={() => toggleOrder(order.id)}
                className="w-full text-left p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 bg-sand/30 rounded-lg flex items-center justify-center text-terracotta transition-all group-hover:bg-terracotta group-hover:text-white">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-base tracking-tight font-mono">{order.id}</p>
                    <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 italic">{order.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-8 items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="text-left md:text-center">
                    <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest mb-1">Expédition</p>
                    <MBadge variant={order.status === 'Livré' ? 'success' : 'warning'}>
                      {order.status}
                    </MBadge>
                  </div>
                  <div className="text-left md:text-center">
                    <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest mb-1">Investissement</p>
                    <p className="font-heading text-2xl text-terracotta font-medium">{order.total}€</p>
                  </div>
                  <ChevronDown size={18} className={`text-terracotta transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-sand/20 border-t border-terracotta/5"
                  >
                    <div className="p-10 space-y-8">
                      <div className="flex items-center gap-2">
                        <History size={14} className="text-terracotta opacity-40" />
                        <p className="text-[9px] uppercase font-black text-terracotta tracking-[0.3em]">Composition du Trésor</p>
                      </div>
                      
                      <div className="grid gap-6">
                        {order.products.map((productId) => {
                          const product = PRODUCTS.find(p => p.id === productId);
                          if (!product) return null;
                          return (
                            <div key={productId} className="flex items-center gap-8 p-5 bg-white rounded-3xl border border-terracotta/5 hover:shadow-xl transition-all group/item">
                              <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover/item:scale-105 transition-transform">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <p className="text-[9px] uppercase font-black text-terracotta/30 tracking-widest mb-1">{product.category}</p>
                                <p className="font-bold text-xl tracking-tight leading-none mb-1">{product.name}</p>
                                <p className="text-xs text-muted-foreground font-serif italic">{product.origin}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-heading text-2xl text-terracotta">{product.price}€</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-6 border-t border-terracotta/5 flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 flex gap-2">
                             <ShieldCheck size={12} /> Authenticité Certifiée
                          </Badge>
                        </div>
                        <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest text-terracotta gap-3 hover:bg-terracotta/5">
                          Télécharger Certificats Digitalisés <ChevronRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MCard>
          );
        })}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading tracking-tight">Ma <span className="text-terracotta">Promesse</span> Artisanal</h2>
          <p className="text-[9px] text-muted-foreground uppercase font-mono font-bold tracking-widest mt-1 opacity-40">Les pièces qui ont captivé votre regard</p>
        </div>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(product => (
            <MCard key={product.id} className="group overflow-hidden flex flex-col hover:border-terracotta/30">
              <div className="aspect-square relative overflow-hidden">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/80 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                   onClick={() => setWishlistProducts(prev => prev.filter(p => p.id !== product.id))}
                 >
                    <Heart size={16} fill="currentColor" />
                 </Button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <p className="text-[9px] uppercase font-mono font-bold text-foreground/20 tracking-widest">{product.category}</p>
                    <h4 className="text-xl font-heading tracking-tight font-medium leading-tight">{product.name}</h4>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-terracotta/5">
                    <p className="text-2xl font-heading text-terracotta">{product.price}€</p>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest gap-2">Découvrir <ChevronRight size={14} /></Button>
                    </Link>
                 </div>
              </div>
            </MCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-6 flex flex-col items-center max-w-md mx-auto">
          <Heart size={64} className="text-terracotta/10" strokeWidth={1} />
          <h3 className="text-2xl font-heading">Votre vitrine est <span className="text-terracotta">vide</span></h3>
          <p className="text-sm text-muted-foreground font-serif italic">Les pièces que vous convoitez s'afficheront ici. Continuez à explorer les trésors du Dahomey.</p>
          <Link to="/marketplace">
            <Button className="bg-terracotta rounded-full px-10 h-14 uppercase font-black text-[10px] tracking-widest shadow-xl">Explorer la Galerie</Button>
          </Link>
        </div>
      )}
    </div>
  );

  const renderPreferences = () => (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-heading tracking-tight">Paramètres du <span className="text-terracotta">Profil</span></h3>
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/20">Identité et Logistique de collectionneur</p>
      </div>

      <form className="glass p-12 rounded-[3.5rem] border border-terracotta/5 space-y-10" onSubmit={(e) => { e.preventDefault(); toast.success("Profil mis à jour !"); }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom Complet</label>
              <input type="text" defaultValue={user?.name} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none focus:ring-1 focus:ring-terracotta" required />
            </div>
            <div className="space-y-2">
               <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Email Principal</label>
               <input type="email" defaultValue={user?.email} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none opacity-50 cursor-not-allowed" disabled required />
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Adresse de Livraison Par Défaut</label>
             <textarea className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none resize-none focus:ring-1 focus:ring-terracotta" rows={3} placeholder="Saisir votre adresse complète..." required />
          </div>
        </div>
        <Button type="submit" className="w-full h-14 bg-terracotta text-white rounded-full uppercase font-black text-[10px] tracking-widest shadow-xl shadow-terracotta/20 hover:scale-[1.02] transition-all">Sauvegarder les modifications</Button>
      </form>
    </div>
  );

  const renderSupport = () => (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="p-12 bg-terracotta/5 rounded-[3rem] border border-terracotta/10 relative overflow-hidden text-center">
        <div className="relative z-10 space-y-8">
           <div className="h-20 w-20 bg-terracotta text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
              <Sparkles size={32} />
           </div>
           <h3 className="text-4xl font-heading">Privilège <br/><span className="text-terracotta italic font-light">Conciergerie</span></h3>
           <p className="text-lg text-muted-foreground font-serif italic leading-relaxed max-w-lg mx-auto">
             "En tant que collectionneur initié, vous bénéficiez d'un accès direct à notre service de conciergerie pour toute demande de logistique internationale ou de personnalisation."
           </p>
        </div>
      </section>

      <MCard className="p-12">
        <h4 className="text-xl font-heading mb-8">Envoyer un <span className="text-terracotta">Message Direct</span></h4>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Message envoyé à la conciergerie !"); }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Sujet de la demande</label>
              <select className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                <option value="">Sélectionner un sujet</option>
                <option>Logistique & Expédition</option>
                <option>Authentification & Certificats</option>
                <option>Commande Sur-Mesure</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Urgence</label>
              <div className="flex gap-4">
                 <label className="flex-1 h-12 flex items-center justify-center rounded-xl border border-terracotta/10 bg-sand/[0.05] text-[10px] uppercase font-black cursor-pointer peer-checked:bg-terracotta peer-checked:text-white transition-all">
                    <input type="radio" name="priority" value="standard" className="hidden peer" defaultChecked required />
                    <span className="p-2">Standard</span>
                 </label>
                 <label className="flex-1 h-12 flex items-center justify-center rounded-xl border border-terracotta/10 bg-sand/[0.05] text-[10px] uppercase font-black cursor-pointer peer-checked:bg-terracotta peer-checked:text-white transition-all">
                    <input type="radio" name="priority" value="priority" className="hidden peer" required />
                    <span className="p-2">Prioritaire</span>
                 </label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Votre Message</label>
            <textarea className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" rows={4} placeholder="Comment pouvons-nous vous accompagner ?" required />
          </div>
          <Button type="submit" className="w-full h-12 bg-foreground text-white rounded-xl uppercase font-black text-[10px] tracking-widest">Initier le Dialogue</Button>
        </form>
      </MCard>
    </div>
  );

  return (
    <DashboardLayout title="Espace de Collectionneur">
      {/* Tab Navigation */}
      <div className="mb-10 flex gap-10 overflow-x-auto pb-4 scrollbar-hide border-b border-terracotta/5">
        {[
          { id: 'acquisitions', label: 'Acquisitions', icon: <Package size={16}/> },
          { id: 'wishlist', label: 'Wishlist', icon: <Heart size={16}/> },
          { id: 'preferences', label: 'Profil & Coordonnées', icon: <MapPin size={16}/> },
          { id: 'support', label: 'Support & Conciergerie', icon: <MessageCircle size={16}/> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-[10px] uppercase font-black tracking-widest relative transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'text-terracotta' : 'text-muted-foreground opacity-50 hover:opacity-100'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeClientTab" className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-full" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'acquisitions' && renderAcquisitions()}
          {activeTab === 'wishlist' && renderWishlist()}
          {activeTab === 'preferences' && renderPreferences()}
          {activeTab === 'support' && renderSupport()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
