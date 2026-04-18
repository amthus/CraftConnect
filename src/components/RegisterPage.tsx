import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { Nav } from './SharedComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        toast.success(`Bienvenue au Bénin, ${data.user.name}`);
        navigate('/dashboard');
      } else {
        toast.error(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand/30 font-sans pb-20">
      <Nav />
      <div className="pt-32 pb-16 px-4 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-terracotta/10 shadow-2xl shadow-terracotta/5"
        >
          <div className="text-center mb-10">
            <div className="h-16 w-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserPlus className="text-terracotta" size={32} />
            </div>
            <h1 className="text-3xl font-heading mb-2">L'Initiation</h1>
            <p className="text-xs text-muted-foreground font-serif italic">Rejoignez l'élite des collectionneurs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Nom de Collectionneur</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-6 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-2 focus:ring-terracotta outline-none transition-all text-sm"
                placeholder="Ex: Aurelien Z."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-2 focus:ring-terracotta outline-none transition-all text-sm"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Téléphone</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-6 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-2 focus:ring-terracotta outline-none transition-all text-sm"
                placeholder="+229 01 00 00 00 00"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-6 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-2 focus:ring-terracotta outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-terracotta text-white rounded-full text-[10px] uppercase font-black tracking-[0.2em] shadow-lg hover:bg-terracotta/90 transition-all active:scale-95"
            >
              {isSubmitting ? 'Finalisation...' : "Commencer l'Aventure"}
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-terracotta/5 flex flex-col items-center gap-6">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              Déjà membre ? <Link to="/login" className="text-terracotta font-black uppercase tracking-widest hover:underline">Se Connecter</Link>
            </p>
            <div className="flex items-center gap-2 text-[9px] uppercase font-black opacity-30 tracking-widest">
              <ShieldCheck size={14} /> Inscription Protégée
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
