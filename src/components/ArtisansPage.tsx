import React from 'react';
import { motion } from 'motion/react';
import { Nav, CartSidebar, WishlistSidebar, FloatingSupport } from './SharedComponents';
import { ARTISANS, PRODUCTS } from '../lib/constants';
import { MapPin, ChevronRight, PenTool, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <CartSidebar />
      <WishlistSidebar />
      <FloatingSupport />

      <header className="pt-36 pb-20 px-4 md:px-12 text-center bg-white border-b border-terracotta/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
             <div className="h-16 w-16 rounded-2xl bg-terracotta/5 flex items-center justify-center text-terracotta mb-4">
                <PenTool size={32} />
             </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-heading"
          >
            Les Maîtres de la <span className="text-terracotta italic font-light">Transmission</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            Rencontrez les gardiens des savoir-faire ancestraux du Bénin. Chaque artisan est un pont entre l'histoire de nos ancêtres et la modernité de nos intérieurs.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-24 space-y-32">
        {ARTISANS.map((artisan, index) => (
          <motion.section 
            key={artisan.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
          >
            {/* Left/Right: Profile Image and Works */}
            <div className="w-full lg:w-5/12 space-y-8">
              <div className="relative aspect-[3/4] rounded-full overflow-hidden shadow-2xl border-8 border-white group max-w-sm mx-auto">
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex justify-center gap-4 h-24 max-w-sm mx-auto">
                {artisan.works.map((work, i) => (
                  <div key={i} className="flex-1 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:-translate-y-2 transition-transform cursor-pointer">
                    <img src={work} alt={`Œuvre de ${artisan.name}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right/Left: Bio and Details */}
            <div className="w-full lg:w-7/12 space-y-10">
              <div className="space-y-4">
                <Badge variant="outline" className="text-terracotta border-terracotta/30 px-4 py-1.5 uppercase tracking-widest text-[10px] font-black">Profil de l'Artisan</Badge>
                <h2 className="text-3xl md:text-5xl font-heading leading-tight">{artisan.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-2 font-bold uppercase tracking-widest opacity-60">
                   <MapPin size={16} className="text-terracotta" /> {artisan.location}
                </p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Sparkles className="absolute -top-6 -left-6 text-terracotta/20 animate-pulse" size={40} />
                  <p className="text-lg md:text-xl font-serif italic leading-relaxed text-foreground border-l-4 border-terracotta/20 pl-8">
                    "{artisan.bio}"
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {artisan.journey}
                </p>
              </div>

              <div className="space-y-6 pt-6">
                <p className="text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Techniques Maîtresses</p>
                <div className="flex flex-wrap gap-3">
                   {artisan.techniques.map(tech => (
                     <span key={tech} className="px-5 py-2.5 glass border border-terracotta/10 rounded-full text-xs font-bold text-foreground/80 hover:bg-terracotta/5 transition-colors cursor-default">
                        {tech}
                     </span>
                   ))}
                </div>
              </div>

              <div className="pt-10 flex flex-col sm:flex-row items-center gap-6">
                 <Link to={`/marketplace?artisan=${artisan.id}`} className="w-full sm:w-auto">
                    <Button className="w-full bg-terracotta text-white rounded-full px-10 h-14 uppercase font-black text-[10px] tracking-widest shadow-xl shadow-terracotta/20 hover:scale-[1.02] active:scale-95 transition-all">
                       Voir ses Créations
                    </Button>
                 </Link>
                 <Link to="/custom-order">
                    <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest flex items-center gap-2 opacity-60 hover:opacity-100 h-14">
                       Demande de Commande Spéciale <ChevronRight size={14} />
                    </Button>
                 </Link>
              </div>

              <div className="pt-16 border-t border-terracotta/10">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-6">Exposition Actuelle</p>
                  <div className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide">
                     {PRODUCTS.filter(p => p.artisanId === artisan.id).map(prod => (
                       <Link key={prod.id} to={`/product/${prod.id}`} className="shrink-0 group/prod">
                          <div className="relative w-24 h-32 rounded-xl overflow-hidden mb-3 border border-terracotta/5">
                             <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform group-hover/prod:scale-110" />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-tight truncate w-24">{prod.name}</p>
                          <p className="text-[9px] text-terracotta font-bold">{prod.price}€</p>
                       </Link>
                     ))}
                  </div>
              </div>
            </div>
          </motion.section>
        ))}
      </main>

      <section className="bg-white py-24 px-4 md:px-12 border-t border-terracotta/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-xl space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-heading leading-tight">Vous êtes un <span className="text-terracotta italic font-light">Artisan</span> ?</h2>
              <p className="text-muted-foreground font-serif italic text-lg leading-relaxed">Rejoignez notre galerie et portez votre voix au-delà des frontières. Nous valorisons l'excellence et l'authenticité.</p>
           </div>
           <Link to="/register">
             <Button className="bg-foreground text-sand rounded-full px-12 h-16 uppercase font-black text-[11px] tracking-[0.2em] shadow-2xl hover:bg-terracotta transition-all active:scale-95">
                Rejoindre la Communauté
             </Button>
           </Link>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-4 md:px-12 pt-24 pb-16 text-center">
        <div className="mb-8">
          <div className="text-2xl font-heading tracking-tight text-terracotta mb-3">
            <span className="font-black">BÉNIN</span>
            <span className="font-light text-foreground">ARTISAN</span>
          </div>
          <p className="text-xs text-muted-foreground font-serif italic max-w-md mx-auto">Emportez une part de l'âme du Bénin avec vous. Chaque achat soutient directement l'économie locale et la préservation culturelle.</p>
        </div>
        <div className="flex justify-center gap-6 text-[9px] uppercase font-black tracking-widest opacity-40">
          <Link to="/privacy" className="hover:text-terracotta transition-colors">Politique de Confidentialité</Link>
          <Link to="/terms" className="hover:text-terracotta transition-colors">Conditions Générales</Link>
          <Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
