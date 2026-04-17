import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { Nav, FloatingSupport } from './SharedComponents';
import { Package, Heart, CreditCard, Settings, MapPin, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  userId: string;
  products: string[];
  status: string;
  total: number;
  date: string;
}

export default function ClientDashboard() {
  const { user, token, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/user/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-sand/20 font-sans pb-20">
      <Nav />
      <FloatingSupport />

      <header className="pt-32 pb-16 px-4 md:px-12 bg-white border-b border-terracotta/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-4">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-6xl font-heading">
              Bonjour, <span className="text-terracotta">{user.name}</span>
            </motion.h1>
            <p className="text-base text-muted-foreground font-serif italic max-w-lg">Votre espace privé. Ici commence la gestion de vos trésors béninois.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleLogout} className="rounded-full h-11 px-6 flex items-center gap-2 text-[9px] uppercase font-black tracking-widest border-terracotta/20 hover:bg-terracotta hover:text-white transition-all">
              <LogOut size={14} /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar / Profile Summary */}
        <aside className="space-y-8">
          <div className="glass p-8 rounded-[2rem] border border-terracotta/10">
            <h3 className="text-[10px] uppercase font-black text-terracotta tracking-[0.3em] mb-8 opacity-60">Statut de Collectionneur</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-terracotta/10 rounded-2xl flex items-center justify-center text-terracotta font-black">
                  Lvl 1
                </div>
                <div>
                  <p className="font-bold">Initié Élite</p>
                  <p className="text-[10px] uppercase opacity-40">Membre depuis Avril 2024</p>
                </div>
              </div>
              <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-terracotta" />
              </div>
              <p className="text-[10px] text-muted-foreground italic font-serif text-center">Encore 2 acquisitions pour le statut "Ambassadeur"</p>
            </div>
          </div>

          <nav className="space-y-2">
             {[
               { icon: <Package size={20} />, label: "Mes Acquisitions", active: true },
               { icon: <Heart size={20} />, label: "Wishlist", active: false },
               { icon: <CreditCard size={20} />, label: "Paiements", active: false },
               { icon: <MapPin size={20} />, label: "Adresses", active: false },
               { icon: <Settings size={20} />, label: "Paramètres", active: false }
             ].map((item, idx) => (
               <button 
                key={idx}
                className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all ${item.active ? 'bg-terracotta text-white shadow-xl shadow-terracotta/10' : 'hover:bg-terracotta/5 opacity-60 hover:opacity-100'}`}
               >
                 <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-[10px] uppercase font-black tracking-widest">{item.label}</span>
                 </div>
                 <ChevronRight size={16} />
               </button>
             ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-8">
             <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-heading">Commandes Récentes</h2>
                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">{orders.length} TOTAL</p>
             </div>

             <div className="space-y-4">
                {orders.length > 0 ? orders.map(order => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 rounded-3xl border border-terracotta/5 hover:border-terracotta/20 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       <div className="flex items-center gap-6">
                          <div className="h-14 w-14 bg-sand rounded-2xl flex items-center justify-center text-terracotta">
                             <Package size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-lg">{order.id}</p>
                             <p className="text-xs text-muted-foreground font-serif italic">{order.date}</p>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-8 items-center w-full md:w-auto">
                          <div className="text-center">
                             <p className="text-[9px] uppercase font-black opacity-30 tracking-widest mb-1">Status</p>
                             <span className={`text-[10px] uppercase font-black tracking-[0.2em] px-4 py-1 rounded-full ${order.status === 'Livré' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                {order.status}
                             </span>
                          </div>
                          <div className="text-center">
                             <p className="text-[9px] uppercase font-black opacity-30 tracking-widest mb-1">Acquisition</p>
                             <p className="font-heading text-xl text-terracotta">{order.total}€</p>
                          </div>
                          <Button variant="ghost" className="rounded-full h-12 w-12 hover:bg-terracotta/10 text-terracotta">
                             <ChevronRight size={24} />
                          </Button>
                       </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-20 border-2 border-dashed border-terracotta/10 rounded-3xl">
                    <Package size={48} className="mx-auto text-terracotta/20 mb-4" />
                    <p className="font-serif italic text-muted-foreground">Aucun trésor acquis pour le moment.</p>
                  </div>
                )}
             </div>
          </section>

          <section className="p-10 bg-terracotta/5 rounded-[2.5rem] border border-terracotta/10 relative overflow-hidden">
             <div className="relative z-10 space-y-5">
                <h3 className="text-2xl font-heading">Besoin d'Aide ?</h3>
                <p className="text-sm text-muted-foreground font-serif italic leading-relaxed">Votre concierge personnel est disponible pour toute question sur vos livraisons ou pour une demande de personnalisation.</p>
                <Button className="bg-terracotta text-white rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest shadow-xl">Contacter le Maître Logistique</Button>
             </div>
             <Package size={160} className="absolute -bottom-8 -right-8 text-terracotta/5 -rotate-12" />
          </section>
        </div>
      </main>
    </div>
  );
}
