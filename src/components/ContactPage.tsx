import React, { useState } from 'react';
import { Nav, FloatingSupport } from './SharedComponents';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Format de téléphone invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message envoyé ! Notre concierge reviendra vers vous sous 24h.");
      setIsSubmitting(false);
      setFormData({ nom: '', prenom: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <FloatingSupport />
      <header className="pt-36 pb-16 px-4 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-heading">Entrez en <span className="text-terracotta italic font-light">Résonance</span></h1>
          <p className="text-lg text-muted-foreground font-serif italic italic leading-relaxed">Questions sur une œuvre, demande sur-mesure ou simple partage de passion ? Nous sommes à votre écoute.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-terracotta/5 shadow-xl shadow-terracotta/5 space-y-4">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1">Téléphone</p>
                  <p className="font-bold text-lg">+229 01 00 00 00 00</p>
                </div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-terracotta/5 shadow-xl shadow-terracotta/5 space-y-4">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1">Email</p>
                  <p className="font-bold text-lg">concierge@thusartisan.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-heading">Nos Bureaux</h2>
              <div className="grid gap-6">
                <div className="flex gap-5 items-start">
                  <div className="h-10 w-10 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-base">Siège Social - Cotonou</p>
                    <p className="text-xs text-muted-foreground">Zone Artisanale, Haie Vive, Bénin</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 glass rounded-[3rem] border border-terracotta/10 space-y-6">
              <MessageSquare size={40} className="text-terracotta" />
              <h3 className="text-2xl font-heading">Chat Direct</h3>
              <p className="text-sm text-muted-foreground font-serif italic">Pour une réponse instantanée, privilégiez notre ligne WhatsApp ou le chat en direct en bas à droite.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-terracotta/5 border border-terracotta/5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Nom</label>
                  <input 
                    required 
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm" 
                    placeholder="Votre nom" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Prénom</label>
                  <input 
                    required 
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                    className="w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm" 
                    placeholder="Votre prénom" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Email</label>
                <input 
                  required 
                  type="text" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm ${errors.email ? 'ring-1 ring-red-500' : ''}`} 
                  placeholder="votre@email.com" 
                />
                {errors.email && <p className="text-[10px] text-red-500 ml-4 italic">{errors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Téléphone (Optionnel)</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm ${errors.phone ? 'ring-1 ring-red-500' : ''}`} 
                  placeholder="+229 00 00 00 00" 
                />
                {errors.phone && <p className="text-[10px] text-red-500 ml-4 italic">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Votre Message</label>
                <textarea 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full h-32 bg-sand/30 border-none rounded-xl p-5 text-sm resize-none" 
                  placeholder="Comment pouvons-nous vous accompagner ?" 
                />
              </div>
              <Button disabled={isSubmitting} className="w-full h-14 bg-terracotta text-white rounded-full text-[10px] uppercase font-black tracking-widest hover:bg-terracotta/90 transition-all shadow-xl shadow-terracotta/10 active:scale-95">
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
