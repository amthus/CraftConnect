import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { Nav } from './SharedComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        toast.success(`Bienvenue, ${data.user.name}`);
        
        // Dynamic redirection based on role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (data.user.role === 'artisan') {
          navigate('/artisan');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(data.error || 'Erreur de connexion');
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
              <LogIn className="text-terracotta" size={32} />
            </div>
            <h1 className="text-3xl font-heading mb-2">Bon Retour</h1>
            <p className="text-xs text-muted-foreground font-serif italic">Accédez à votre galerie personnelle</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            
            <div className="flex justify-end pr-4">
              <Link to="/forgot-password" className="text-[9px] uppercase font-black tracking-widest text-terracotta/60 hover:text-terracotta transition-colors">
                Oubli ?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-terracotta text-white rounded-full text-[10px] uppercase font-black tracking-[0.2em] shadow-lg hover:bg-terracotta/90 transition-all active:scale-95"
            >
              {isSubmitting ? 'Accès...' : "S'identifier"}
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-terracotta/5 flex flex-col items-center gap-6">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              Envie d'une pièce unique ? <Link to="/register" className="text-terracotta font-black uppercase tracking-widest hover:underline">S'inscrire</Link>
            </p>
            <div className="flex items-center gap-2 text-[9px] uppercase font-black opacity-30 tracking-widest">
              <ShieldCheck size={14} /> Connexion Sécurisée AES-256
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
