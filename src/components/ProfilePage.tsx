import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import DashboardLayout from './DashboardLayout';
import { Button } from '@/components/ui/button';
import { MCard, MBadge } from './ui/millimeter';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Shield, 
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Profil mis à jour avec succès");
      setIsSubmitting(false);
    }, 1000);
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <DashboardLayout title="Mon Profil">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <MCard className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-terracotta/20 to-sand/40 relative">
             <div className="absolute top-4 right-4 flex gap-2">
                <MBadge variant="default" className="bg-white/80 backdrop-blur-sm shadow-sm">{user?.role.toUpperCase()}</MBadge>
                <MBadge variant="success" className="bg-emerald-500/10 text-emerald-700 border-emerald-200">ACTIF</MBadge>
             </div>
          </div>
          <div className="px-10 pb-10">
            <div className="flex flex-col sm:flex-row items-end gap-6 -mt-12 relative z-10">
               <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-3xl overflow-hidden relative">
                    {user?.avatar && <AvatarImage src={user.avatar} className="object-cover" />}
                    <AvatarFallback className="bg-sand text-terracotta font-black text-4xl">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-2 right-2 h-10 w-10 bg-white border border-terracotta/10 rounded-xl flex items-center justify-center text-terracotta shadow-lg hover:scale-105 transition-all opacity-0 group-hover:opacity-100">
                    <Camera size={18} />
                  </button>
               </div>
               <div className="flex-1 pb-2">
                  <h1 className="text-3xl font-heading tracking-tight">{user?.name}</h1>
                  <p className="text-xs font-serif italic text-muted-foreground mt-1">Membre depuis Avril 2024 • Collectionneur d'Art du Dahomey</p>
               </div>
               <Button 
                variant="outline" 
                onClick={logout}
                className="h-11 rounded-xl border-red-100 text-red-500 hover:bg-red-50 px-6 text-[10px] uppercase font-black tracking-widest gap-2"
               >
                 <LogOut size={16} /> Déconnexion
               </Button>
            </div>
          </div>
        </MCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu de navigation latérale du profil */}
          <div className="lg:col-span-1 space-y-4">
            <MCard className="p-2 space-y-1">
              {[
                { label: 'Informations Personnelles', icon: <User size={18} />, active: true },
                { label: 'Sécurité & Accès', icon: <Shield size={18} /> },
                { label: 'Notifications', icon: <Bell size={18} /> },
                { label: 'Paiement & Facturation', icon: <CreditCard size={18} /> },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center gap-4 px-5 h-14 rounded-2xl transition-all ${
                    item.active 
                      ? 'bg-terracotta text-white shadow-lg shadow-terracotta/10' 
                      : 'text-foreground/50 hover:bg-sand/30'
                  }`}
                >
                  <span className={item.active ? 'text-white' : 'text-terracotta/60'}>{item.icon}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest">{item.label}</span>
                  {item.active && <ChevronRight size={14} className="ml-auto opacity-50" />}
                </button>
              ))}
            </MCard>

            <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex flex-col items-center text-center gap-2">
               <ShieldCheck className="text-emerald-500 mb-2" size={32} />
               <p className="text-[10px] uppercase font-black tracking-widest text-emerald-700/60">Compte Vérifié</p>
               <p className="text-[11px] font-serif italic text-emerald-800/40">Votre identité a été authentifiée pour les transactions de haute valeur.</p>
            </div>
          </div>

          {/* Formulaire Principal */}
          <div className="lg:col-span-2">
            <MCard className="p-10">
              <div className="mb-10">
                <h3 className="text-2xl font-heading">Informations <span className="text-terracotta">Personnelles</span></h3>
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Gérer vos données d'identité et de contact</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono flex items-center gap-2">
                      <User size={10} /> Nom Complet
                    </label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none focus:ring-1 focus:ring-terracotta" 
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono flex items-center gap-2">
                      <Mail size={10} /> Email
                    </label>
                    <input 
                      type="email" 
                      defaultValue={user?.email}
                      className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none opacity-50 cursor-not-allowed" 
                      disabled
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono flex items-center gap-2">
                      <Phone size={10} /> Téléphone
                    </label>
                    <input 
                      type="tel" 
                      defaultValue="+229 01 02 03 04"
                      className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none focus:ring-1 focus:ring-terracotta" 
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono flex items-center gap-2">
                      <MapPin size={10} /> Pays de Résidence
                    </label>
                    <select className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none" required>
                      <option>France</option>
                      <option>Bénin</option>
                      <option>Suisse</option>
                      <option>USA</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono flex items-center gap-2">
                    <MapPin size={10} /> Adresse Principale
                  </label>
                  <textarea 
                    rows={3}
                    defaultValue="12 Avenue des Artisans, Paris, France"
                    className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-2xl outline-none resize-none focus:ring-1 focus:ring-terracotta" 
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-terracotta text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] shadow-xl shadow-terracotta/20 hover:scale-[1.01] transition-all"
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Sauvegarder les modifications'}
                  </Button>
                </div>
              </form>
            </MCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
