import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  PenTool,
  Truck,
  MapPin,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Nav, ProductCard, CartSidebar, FloatingWhatsApp, LogisticsWidget } from './SharedComponents';
import { ARTISANS, PRODUCTS } from '../lib/constants';

export default function ArtisanMarketplace() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.25]);
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className="min-h-screen relative font-sans selection:bg-terracotta selection:text-white pb-20">
      <Nav />
      <CartSidebar />
      <FloatingWhatsApp />

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-sand">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/market/1920/1080?blur=1" alt="Back" className="w-full h-full object-cover opacity-40 scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sand to-sand" />
        </motion.div>
        <div className="relative z-10 text-center max-w-4xl px-8">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-8xl lg:text-[10rem] font-heading leading-tight md:leading-none tracking-tight mb-12 text-shadow-gold">
            L'Authenticité <br /> <span className="text-terracotta">Expatriée</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-2xl text-muted-foreground font-serif leading-relaxed italic max-w-2xl mx-auto mb-12">
            "Redécouvrez le Bénin à travers le regard de ses maîtres artisans. Un voyage tactile et spirituel, livré à votre porte."
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-12 h-16 text-xs uppercase tracking-[0.2em] font-black group shadow-2xl">
                Explorer la Collection <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <a href="#artisans">
              <Button size="lg" variant="outline" className="glass border-terracotta/20 rounded-full px-12 h-16 text-xs uppercase tracking-[0.2em] font-black hover:bg-white/20">
                Découvrir l'histoire
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="marketplace" className="py-24 md:py-40 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <Badge className="bg-terracotta/10 text-terracotta mb-6 uppercase tracking-widest px-4 py-1">Éditions Limitées</Badge>
              <h2 className="text-5xl md:text-7xl font-heading leading-tight mb-6">Le Curatage <br /><span className="text-terracotta italic font-light">de Saison</span></h2>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed italic">Sélection exclusive de pièces uniques, chacune portant l'âme de son créateur et l'histoire de sa ville d'origine.</p>
            </div>
            <Link to="/marketplace">
              <Button variant="ghost" className="text-xs uppercase tracking-widest font-black hover:text-terracotta flex items-center gap-4 transition-all">
                Voir toute la galerie <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PRODUCTS.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section id="artisans" className="py-20 md:py-32 px-6 md:px-8 bg-sand relative">
        <div id="logistique" className="absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading mb-8">Maîtres de <br /><span className="text-terracotta italic font-light">la Matière</span></h2>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed italic">Chaque artisan de notre marketplace est sélectionné pour son excellence, respectant les matériaux locaux et l'environnement.</p>
            </div>
            <div className="grid gap-8">
              {ARTISANS.map(artisan => (
                <div key={artisan.id} className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/40 hover:border-terracotta/20 transition-all cursor-pointer group">
                  <Avatar className="h-20 w-20 ring-4 ring-white group-hover:ring-terracotta/20 transition-all">
                    <AvatarImage src={artisan.image} />
                    <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-2xl font-heading">{artisan.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase mb-2">{artisan.location}</p>
                    <div className="flex gap-2">
                      {artisan.techniques.slice(0, 2).map(t => <Badge key={t} variant="outline" className="text-[9px] uppercase">{t}</Badge>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <LogisticsWidget progress={65} />
            <div className="mt-12 space-y-8 glass p-10 rounded-3xl border border-white/50">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-terracotta text-white rounded-2xl flex items-center justify-center shadow-lg"><Truck size={28} /></div>
                <div>
                  <h4 className="font-bold text-lg">Exportation Responsable</h4>
                  <p className="text-sm text-muted-foreground">Logistique optimisée pour réduire l'empreinte carbone et les coûts.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-terracotta text-white rounded-2xl flex items-center justify-center shadow-lg"><ShieldCheck size={28} /></div>
                <div>
                  <h4 className="font-bold text-lg">Authenticité Certifiée</h4>
                  <p className="text-sm text-muted-foreground">Chaque transaction génère un certificat digital infalsifiable sur la blockchain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sur-mesure" className="py-32 px-6 md:px-16 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sand/20 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <Badge className="bg-gold/10 text-gold border-gold/20 px-6 py-2 uppercase tracking-[0.3em] font-black text-[10px]">Conciergerie Exclusive</Badge>
            <h2 className="text-6xl md:text-8xl font-heading leading-tight">Votre Vision, <br /><span className="text-terracotta font-light italic">notre Excellence</span></h2>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed italic font-light">Donnez vie à vos projets les plus audacieux. Collaborons ensemble pour créer des pièces sur mesure qui transcendent le temps et l'espace.</p>
            <div className="flex items-center gap-6 pt-6">
              <Avatar className="h-16 w-16 border-2 border-terracotta p-1"><AvatarImage src="https://i.pravatar.cc/150?u=director" /></Avatar>
              <div><p className="font-bold text-lg tracking-tight">Directeur Artistique</p><p className="text-xs text-muted-foreground uppercase font-black opacity-60">Accompagnement Personnalisé</p></div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-black text-white rounded-full px-12 h-16 text-xs uppercase font-black tracking-widest group shadow-2xl">
                  Initier un Projet <PenTool className="ml-3 group-hover:rotate-12 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass">
                <DialogHeader>
                  <DialogTitle className="font-heading text-3xl">Co-création Signature</DialogTitle>
                </DialogHeader>
                <div className="py-8 space-y-4">
                  <p className="font-serif italic text-lg">Votre demande de conciergerie a été transmise à notre directeur artistique.</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-black opacity-60">Nous vous contacterons sous 24h pour discuter de votre pièce exclusive.</p>
                  <Button className="w-full bg-terracotta rounded-full h-12 uppercase font-black text-xs tracking-widest">Fermer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-2 gap-6 scale-110">
            <img src="https://picsum.photos/seed/custom1/600/800" className="rounded-3xl shadow-2xl skew-y-3" alt="Custom" />
            <img src="https://picsum.photos/seed/custom2/600/800" className="rounded-3xl shadow-2xl -skew-y-3 mt-12" alt="Custom" />
          </div>
        </div>
      </section>

      <section id="avis" className="py-32 px-6 md:px-16 bg-sand/40">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-8 opacity-40 uppercase tracking-widest border-black">Le Cercle des Collectionneurs</Badge>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Julian M.", role: "Architecte d'Intérieur", text: "La qualité des textiles Kanvô est incomparable. Une touche d'histoire dans mes projets modernes.", stars: 5 },
              { name: "Elena R.", role: "Galeriste, Zurich", text: "Bénin Artisan Marketplace est devenu ma source numéro un pour l'artisanat ouest-africain authentique.", stars: 5 },
              { name: "Jean-Pierre D.", role: "Collectionneur Privé", text: "Le système de logistique groupée est révolutionnaire. Un luxe accessible et éthique.", stars: 5 }
            ].map((avis, i) => (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} className="glass p-12 rounded-[3rem] border border-white/60 space-y-6 relative flex flex-col items-center">
                <div className="flex gap-1 text-gold mb-4">{Array.from({length: avis.stars}).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <p className="text-lg font-serif italic leading-relaxed font-light">"{avis.text}"</p>
                <div><p className="font-bold text-lg">{avis.name}</p><p className="text-[10px] uppercase font-black opacity-40">{avis.role}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 md:px-16 bg-terracotta text-white relative overflow-hidden">
        <motion.div style={{ rotate: 15 }} className="absolute top-0 right-0 opacity-10 scale-150"><ShoppingBag size={800} /></motion.div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          {!isSubscribed ? (
            <>
              <h2 className="text-6xl md:text-8xl font-heading">Rejoignez <br /><span className="italic font-light">l'Avant-Garde</span></h2>
              <p className="text-xl opacity-80 font-serif italic max-w-2xl mx-auto">Soyez le premier informé des nouvelles collections privées et des récits de nos maîtres artisans.</p>
              <form onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-md">
                <input type="email" placeholder="Votre email secret..." className="flex-1 bg-transparent border-none focus:ring-0 px-8 text-white placeholder:text-white/40" required />
                <Button className="bg-white text-terracotta hover:bg-white/90 rounded-full px-10 h-14 text-xs font-black uppercase tracking-widest">S'inscrire</Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
              <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"><Zap size={40} className="text-white" /></div>
              <h2 className="text-5xl font-heading">Bienvenue dans le Cercle</h2>
              <p className="font-serif italic text-xl">Une invitation exclusive vous a été envoyée.</p>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="py-24 px-6 md:px-16 bg-white border-t border-terracotta/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-6">
            <div className="text-3xl font-heading tracking-tight text-terracotta">
              <span className="font-black">BÉNIN</span>
              <span className="font-light text-foreground">ARTISAN</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs font-serif italic">Promouvoir l'excellence artisanale du Bénin sur la scène internationale, une pièce unique à la fois.</p>
          </div>
          <div className="flex gap-12">
            {[
              { title: "Galerie", items: ["Nouveautés", "Sculptures", "Textiles", "Céramiques"] },
              { title: "Services", items: ["Sur Mesure", "Logistique", "Conciergerie", "Authentification"] },
              { title: "Maison", items: ["Notre Histoire", "Les Artisans", "Engagements", "Contact"] }
            ].map(col => (
              <div key={col.title} className="space-y-4">
                <h5 className="text-[10px] uppercase font-black opacity-30 tracking-widest">{col.title}</h5>
                <ul className="space-y-2">
                  {col.items.map(item => <li key={item} className="text-xs hover:text-terracotta transition-colors cursor-pointer font-bold">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-terracotta/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-black opacity-40 tracking-widest">
          <p>© 2024 BÉNIN ARTISAN MARKETPLACE. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-terracotta">LinkedIn</a>
            <a href="#" className="hover:text-terracotta">Instagram</a>
            <a href="#" className="hover:text-terracotta">Pinterest</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
