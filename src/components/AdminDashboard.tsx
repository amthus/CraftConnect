import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { Nav } from './SharedComponents';
import { TrendingUp, Users, Package, ShoppingBag, Plus, Search, ChevronRight, BarChart3, LogOut, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Stats {
  totalSales: number;
  activeArtisans: number;
  totalOrders: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      navigate('/login');
      return;
    }

    fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setStats(data))
      .catch(() => {
        toast.error("Accès refusé");
        navigate('/');
      });
  }, [token, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!stats) return null;

  const cards = [
    { label: "Ventes Totales", value: `${stats.totalSales}€`, icon: <TrendingUp />, trend: "+12%", color: "bg-emerald-500" },
    { label: "Artisans Actifs", value: stats.activeArtisans, icon: <Users />, trend: "Optimal", color: "bg-amber-500" },
    { label: "Commandes", value: stats.totalOrders, icon: <ShoppingBag />, trend: "+5%", color: "bg-terracotta" },
    { label: "Nouveaux Membres", value: "14", icon: <Package />, trend: "+24%", color: "bg-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-20">
      <Nav />
      <header className="pt-32 pb-12 px-4 md:px-12 bg-white border-b border-terracotta/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-heading">Panneau de <span className="text-terracotta">Contrôle</span></h1>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-40">Administration Artisanat Béninois v1.0</p>
          </div>
          <div className="flex gap-4">
             <Link to="/marketplace">
                <Button variant="outline" className="rounded-full px-6 border-terracotta/20 font-bold text-[9px] uppercase tracking-widest h-11">Voir Boutique</Button>
             </Link>
             <Button 
                onClick={() => toast.info("Ouverture du formulaire de création de pièce... (Fonctionnalité administrative)")}
                className="bg-terracotta rounded-full px-8 font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-terracotta/90 h-11 flex items-center gap-2"
             >
                <Plus size={16} /> Pièce Unique
             </Button>
             <Button variant="ghost" onClick={handleLogout} className="rounded-full h-11 w-11 hover:bg-red-50 text-red-500">
                <LogOut size={18} />
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-terracotta/5 hover:border-terracotta/20 transition-all shadow-xl shadow-terracotta/5 group"
            >
              <div className="flex justify-between items-start mb-6">
                 <div className={`h-12 w-12 ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {card.icon}
                 </div>
                 <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={10} /> {card.trend}
                 </div>
              </div>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 mb-1">{card.label}</p>
              <h2 className="text-4xl font-heading">{card.value}</h2>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Orders List */}
          <section className="lg:col-span-2 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading">Flux des Commandes</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => toast.info("Chargement de l'historique complet des transactions...")}
                  className="text-[10px] font-black uppercase tracking-widest text-terracotta"
                >
                  Voir Historique
                </Button>
             </div>
             <div className="glass rounded-[2rem] border border-terracotta/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-sand/30 border-b border-terracotta/5">
                    <tr>
                      <th className="px-8 py-5 text-[10px] uppercase font-black tracking-[0.2em] opacity-40">ID</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Artisans</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Status</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Total</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-terracotta/5">
                    {stats.recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-sand/10 transition-colors">
                        <td className="px-8 py-6 font-bold text-xs">{order.id}</td>
                        <td className="px-8 py-6">
                           <div className="flex -space-x-3">
                              <div className="h-8 w-8 rounded-full border-2 border-white bg-sand" />
                              <div className="h-8 w-8 rounded-full border-2 border-white bg-terracotta/20 flex items-center justify-center text-[10px] font-bold">+2</div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${order.status === 'Livré' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                             {order.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 font-heading text-lg">{order.total}€</td>
                        <td className="px-8 py-6 text-right">
                           <Button variant="ghost" size="icon" className="rounded-full hover:bg-terracotta hover:text-white transition-all"><ChevronRight size={16}/></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </section>

          {/* Activity / Quick Actions */}
          <section className="space-y-8">
             <h3 className="text-2xl font-heading">Activités Temps Réel</h3>
             <div className="glass p-8 rounded-[2rem] border border-terracotta/5 space-y-8">
                {[
                  { user: "Jean M.", action: "a ajouté un Vase à son panier", time: "2 min" },
                  { user: "Admin", action: "a ajouté une nouvelle pièce", time: "15 min" },
                  { user: "Inès K.", action: "vient de s'inscrire", time: "1h" },
                  { user: "Système", action: "Sauvegarde réussie", time: "2h" }
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="h-2 w-2 rounded-full bg-terracotta mt-1.5 shrink-0 shadow-[0_0_10px_rgba(183,110,74,0.5)]" />
                     <div>
                        <p className="text-sm font-medium"><span className="font-black text-terracotta">{act.user}</span> {act.action}</p>
                        <p className="text-[10px] uppercase font-black opacity-30 mt-1">{act.time} ago</p>
                     </div>
                  </div>
                ))}
                <Button 
                  onClick={() => toast.info("Accès aux journaux système de la plateforme...")}
                  className="w-full h-14 bg-sand text-terracotta hover:bg-terracotta hover:text-white transition-all rounded-2xl text-[10px] uppercase font-black tracking-widest"
                >
                  Voir tous les logs
                </Button>
             </div>

             <div className="glass p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                <BarChart3 className="absolute -bottom-6 -right-6 text-emerald-500/5 scale-150 rotate-12" />
                <div className="relative z-10 space-y-4">
                   <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 opacity-60">Insight Santé</p>
                   <h4 className="text-2xl font-heading text-emerald-700">Flux Optimal</h4>
                   <p className="text-xs text-emerald-600/80 font-serif italic">Le taux de conversion a augmenté de 4% ce matin. Aucune alerte logistique détectée.</p>
                </div>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
