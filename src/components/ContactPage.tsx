import React, { useState } from 'react';
import { Nav, FloatingSupport } from './SharedComponents';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message envoyé ! Notre concierge reviendra vers vous sous 24h.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
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

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid md:grid-cols-2 gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
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
              <div className="flex gap-5 items-start">
                <div className="h-10 w-10 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">Conciergerie</p>
                  <p className="text-xs text-muted-foreground">+229 00 00 00 00</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="h-10 w-10 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold text-base">Email</p>
                  <p className="text-xs text-muted-foreground">contact@beninartisan.com</p>
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
                <input required className="w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm" placeholder="Votre nom" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Prénom</label>
                <input required className="w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm" placeholder="Votre prénom" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Email</label>
              <input required type="email" className="w-full h-12 bg-sand/30 border-none rounded-xl px-5 text-sm" placeholder="votre@email.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-black tracking-widest opacity-40 ml-4">Votre Message</label>
              <textarea required className="w-full h-32 bg-sand/30 border-none rounded-xl p-5 text-sm resize-none" placeholder="Comment pouvons-nous vous accompagner ?" />
            </div>
            <Button disabled={isSubmitting} className="w-full h-14 bg-terracotta text-white rounded-full text-[10px] uppercase font-black tracking-widest hover:bg-terracotta/90 transition-all shadow-xl shadow-terracotta/10 active:scale-95">
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon Message'}
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
