import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Nav } from './SharedComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { KeyRound, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Si cet email existe, vous recevrez un lien de réinitialisation.");
      setIsSubmitting(false);
    }, 1500);
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
              <KeyRound className="text-terracotta" size={24} />
            </div>
            <h1 className="text-2xl font-heading mb-1">Oubli de Clé</h1>
            <p className="text-[10px] text-muted-foreground font-serif italic">Retrouvez l'accès à votre galerie</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-terracotta/40" size={14} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-12 pr-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-terracotta text-white rounded-xl text-[9px] uppercase font-black tracking-[0.2em] shadow-lg shadow-terracotta/10 hover:bg-terracotta transition-all active:scale-[0.98]"
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer le Lien'}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-terracotta/5 flex flex-col items-center gap-4">
            <Link to="/login" className="text-[10px] text-muted-foreground flex items-center gap-2 hover:text-terracotta transition-colors">
              <ArrowLeft size={12} /> Retour à la connexion
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        toast.success("Mot de passe mis à jour avec succès !");
        setIsSubmitting(false);
        navigate('/login');
      }, 1500);
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
              <ShieldCheck className="text-terracotta" size={24} />
            </div>
            <h1 className="text-2xl font-heading mb-1">Nouveau Souffle</h1>
            <p className="text-[10px] text-muted-foreground font-serif italic">Définissez votre nouveau secret</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Nouveau mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40 ml-4 font-mono">Confirmer le mot de passe</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 px-5 bg-white/50 border border-terracotta/5 rounded-xl focus:ring-1 focus:ring-terracotta outline-none transition-all text-[13px] font-sans"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-terracotta text-white rounded-xl text-[9px] uppercase font-black tracking-[0.2em] shadow-lg shadow-terracotta/10 hover:bg-terracotta transition-all active:scale-[0.98]"
            >
              {isSubmitting ? 'Mise à jour...' : 'Réinitialiser'}
            </Button>
          </form>
          </motion.div>
        </div>
      </div>
    );
  };
