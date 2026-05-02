import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { Nav } from './SharedComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, ShieldCheck, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'artisan'>('client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(user, { displayName: name });

      // Create Firestore profile
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        phone,
        role,
        createdAt: new Date().toISOString()
      });

      toast.success(`Bienvenue au Bénin, ${name}`);
      
      // Navigation is handled by AuthProvider's context update but we can force it here
      if (role === 'artisan') {
        navigate('/artisan');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Erreur lors de l'inscription");
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
              <UserPlus className="text-terracotta" size={24} />
            </div>
            <h1 className="text-2xl font-heading mb-1">L'Initiation</h1>
            <p className="text-[10px] text-muted-foreground font-serif italic leading-relaxed">Collectionneur d'élite ou Maître Artisan</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4 gap-y-3">
            {/* Role Selection - Full Width */}
            <div className="col-span-2 bg-sand/20 p-1.5 rounded-xl border border-terracotta/5 grid grid-cols-2 gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-2 rounded-lg text-[8px] uppercase font-bold tracking-[0.15em] transition-all ${
                  role === 'client' ? 'bg-terracotta text-white shadow-md' : 'text-foreground/40 hover:bg-white/50'
                }`}
              >
                Collectionneur
              </button>
              <button
                type="button"
                onClick={() => setRole('artisan')}
                className={`py-2 rounded-lg text-[8px] uppercase font-bold tracking-[0.15em] transition-all ${
                  role === 'artisan' ? 'bg-terracotta text-white shadow-md' : 'text-foreground/40 hover:bg-white/50'
                }`}
              >
                Artisan
              </button>
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Nom complet</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                placeholder={role === 'artisan' ? "Ex: Maître Kodjo" : "Ex: Aurelien Z."}
                required
              />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px]"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="col-span-1 space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Téléphone</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px]"
                placeholder="+229 01..."
                required
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px]"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="col-span-2 mt-2 h-11 bg-terracotta text-white rounded-xl text-[9px] uppercase font-black tracking-[0.2em] shadow-lg shadow-terracotta/10 hover:bg-terracotta hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              {isSubmitting ? 'Finalisation...' : "Commencer l'Aventure"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-terracotta/5 flex flex-col items-center gap-4">
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              Déjà membre ? <Link to="/login" className="text-terracotta font-bold uppercase tracking-widest hover:underline">Se Connecter</Link>
            </p>
            <div className="flex items-center gap-1.5 text-[8px] uppercase font-bold opacity-30 tracking-[0.15em] font-mono">
              <ShieldCheck size={12} /> Inscription Sécurisée
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
