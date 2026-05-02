import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Nav } from './SharedComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogIn, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand/30 font-sans pb-20">
      <Nav />
      <div className="pt-24 pb-16 px-4 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm glass p-8 rounded-[2rem] border border-terracotta/10 shadow-2xl shadow-terracotta/5"
        >
          <div className="text-center mb-8">
            <div className="h-12 w-12 bg-terracotta/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-terracotta" size={24} />
            </div>
            <h1 className="text-2xl font-heading mb-1">Bon Retour</h1>
            <p className="text-[10px] text-muted-foreground font-serif italic">Accédez à votre galerie personnelle</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex justify-end pr-2">
              <Link to="/forgot-password" cold-track="true" className="text-[8px] uppercase font-bold tracking-[0.1em] text-terracotta/60 hover:text-terracotta transition-colors">
                Oubli ?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-terracotta text-white rounded-xl text-[9px] uppercase font-black tracking-[0.2em] shadow-lg shadow-terracotta/10 hover:bg-terracotta hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isSubmitting ? 'Accès...' : "S'identifier"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-terracotta/5 flex flex-col items-center gap-4">
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              Envie d'une pièce unique ? <Link to="/register" className="text-terracotta font-bold uppercase tracking-widest hover:underline">S'inscrire</Link>
            </p>
            <div className="flex items-center gap-1.5 text-[8px] uppercase font-bold opacity-30 tracking-[0.15em] font-mono">
              <ShieldCheck size={12} /> Connexion Sécurisée AES-256
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
