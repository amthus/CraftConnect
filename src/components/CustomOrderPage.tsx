import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Nav, CartSidebar, WishlistSidebar, FloatingSupport } from './SharedComponents';
import { PenTool, Send, CheckCircle2, Sparkles, MessageSquare, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CustomOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Votre demande a été transmise à nos maîtres artisans.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-sand/20 font-sans pb-32">
      <Nav />
      <CartSidebar />
      <WishlistSidebar />
      <FloatingSupport />

      <header className="pt-36 pb-20 px-4 md:px-12 bg-white border-b border-terracotta/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-terracotta/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge variant="outline" className="text-terracotta border-terracotta/30 px-4 py-1.5 uppercase tracking-widest text-[10px] font-black">Service de Conciergerie</Badge>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-heading leading-tight"
            >
              Votre Vision, <br />
              <span className="text-terracotta italic font-light">Notre Excellence</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed"
            >
              "Co-créez une pièce unique chargée d'histoire. Un dialogue entre vos désirs et les mainsExpertes de nos maîtres artisans."
            </motion.p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left: Process/Info */}
          <div className="space-y-16">
            <div className="grid gap-12">
              <section className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-lg mb-6">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-heading">1. Consultation Artistique</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dès réception de votre demande, notre directeur artistique vous contacte pour affiner votre vision : dimensions, symboles, matériaux et usage.
                </p>
              </section>

              <section className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-lg mb-6">
                  <PenTool size={24} />
                </div>
                <h3 className="text-2xl font-heading">2. Sélection de l'Artisan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous sélectionnons le maître artisan dont le savoir-faire correspond le mieux à votre projet. Un croquis ou une proposition de design vous est soumise.
                </p>
              </section>

              <section className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-lg mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-heading">3. Création & Suivi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le processus de fabrication commence. Vous recevez des nouvelles de l'atelier au fil des étapes clés de la création.
                </p>
              </section>

              <section className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-lg mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-2xl font-heading">4. Livraison Mondiale</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Votre pièce unique est emballée avec un soin extrême et expédiée avec son certificat d'authenticité et l'histoire de sa création.
                </p>
              </section>
            </div>

            <div className="p-10 bg-white rounded-[2.5rem] border border-terracotta/10 space-y-6 relative overflow-hidden">
              <Sparkles className="absolute top-6 right-6 text-terracotta/20" size={40} />
              <p className="text-[10px] uppercase font-black tracking-widest text-terracotta opacity-60">Le Saviez-vous ?</p>
              <h4 className="text-xl font-heading">Une création éthique</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic font-serif">
                Le service sur-mesure garantit une rémunération supérieure à l'artisan pour le temps passé sur la conception. C'est aussi un moyen de préserver des techniques rares en commandant des pièces d'exception.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-terracotta/5 border border-terracotta/10"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-heading">Initer votre Projet</h2>
                      <p className="text-sm text-muted-foreground">Décrivez votre rêve, nous lui donnerons une forme.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest ml-1">Nom Complet</Label>
                          <Input id="name" placeholder="Femi Adébayo" className="h-12 rounded-xl bg-sand/10 border-none focus:ring-2 focus:ring-terracotta" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest ml-1">Email</Label>
                          <Input id="email" type="email" placeholder="votre@email.com" className="h-12 rounded-xl bg-sand/10 border-none focus:ring-2 focus:ring-terracotta" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-[10px] uppercase font-black tracking-widest ml-1">Type de Création</Label>
                        <select id="category" className="w-full h-12 rounded-xl bg-sand/10 border-none focus:ring-2 focus:ring-terracotta px-4 text-sm" required>
                          <option value="">Sélectionnez une catégorie</option>
                          <option value="ceramique">Céramique Traditionnelle</option>
                          <option value="textile">Tissage Royal Kanvô</option>
                          <option value="sculpture">Sculpture sur Bois / Bronze</option>
                          <option value="mobilier">Mobilier Artisanal</option>
                          <option value="autre">Autre Projet Unique</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vision" className="text-[10px] uppercase font-black tracking-widest ml-1">Votre Vision</Label>
                        <Textarea 
                          id="vision" 
                          placeholder="Décrivez les dimensions souhaitées, les couleurs, les motifs ou l'histoire que vous souhaitez raconter..." 
                          className="min-h-[200px] rounded-2xl bg-sand/10 border-none focus:ring-2 focus:ring-terracotta p-6 text-sm leading-relaxed"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-[10px] uppercase font-black tracking-widest ml-1">Budget Approximatif (Optionnel)</Label>
                        <Input id="budget" placeholder="ex: 800€ - 1200€" className="h-12 rounded-xl bg-sand/10 border-none focus:ring-2 focus:ring-terracotta" />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 bg-terracotta hover:bg-terracotta/90 text-white rounded-full uppercase font-black tracking-[0.2em] text-[11px] transition-all shadow-xl shadow-terracotta/20 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Transmission en cours..."
                      ) : (
                        <>Envoyer ma Demande <Send className="ml-2" size={16} /></>
                      )}
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground italic font-serif">Aucun engagement financier à cette étape.</p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-16 rounded-[3rem] shadow-2xl text-center space-y-8 border border-green-100"
                >
                   <div className="h-24 w-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={48} />
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-4xl font-heading">Demande Reçue</h2>
                      <p className="text-muted-foreground font-serif italic text-lg leading-relaxed">
                        Merci de nous avoir confié votre vision. Notre équipe va analyser votre demande et vous contactera par email dans les prochaines 24 à 48 heures.
                      </p>
                   </div>
                   <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="rounded-full border-terracotta/20 text-terracotta px-8"
                   >
                     Nouvelle Demande
                   </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <section className="bg-foreground text-sand py-24 px-4 md:px-12 mt-32 overflow-hidden relative">
        <motion.div 
           animate={{ rotate: 360 }} 
           transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
           className="absolute -top-32 -right-32 opacity-5"
        >
          <Sparkles size={400} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading leading-tight">L'Exposition <br /><span className="text-terracotta italic font-light">du Savoir-Faire</span></h2>
            <p className="text-lg opacity-70 font-serif italic max-w-xl">Chaque pièce sur-mesure contribue à faire vivre les traditions du Bénin. C'est un acte de collection autant qu'un acte de soutien.</p>
            <div className="flex flex-wrap gap-4">
               {['Matières Nobles', 'Patience', 'Authenticité', 'Héritage'].map(tag => (
                 <span key={tag} className="px-6 py-2 rounded-full border border-sand/30 text-[10px] uppercase font-black tracking-widest">{tag}</span>
               ))}
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[3rem] aspect-[16/9]">
             <img 
               src="https://picsum.photos/seed/craftsman-hands/1200/800" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               alt="Craftsmanship" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <p className="text-sm font-serif italic text-white/80">Atelier de sculpture, Porto-Novo</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
