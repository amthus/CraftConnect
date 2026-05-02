import React from 'react';
import { motion } from 'motion/react';
import { Nav, FloatingSupport } from './SharedComponents';
import { MapPin, Calendar, Scroll, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <FloatingSupport />

      <header className="pt-40 pb-20 px-6 md:px-12 text-center bg-white border-b border-terracotta/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-[9px] uppercase font-black tracking-[0.3em]">
            <Scroll size={12} /> Notre Héritage
          </div>
          <h1 className="text-5xl md:text-8xl font-heading leading-none">
            La Saga du <span className="text-terracotta">Bénin</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto leading-relaxed translate-y-2">
            "Une traversée des siècles, où chaque main raconte une légende et chaque œuvre emprisonne un souffle du Dahomey."
          </p>
        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-32">
        {/* L'Origine */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading">L'Aube du Dahomey</h2>
            <div className="space-y-5 text-base text-muted-foreground font-serif leading-relaxed">
              <p>
                L'histoire de notre artisanat n'est pas celle d'une simple production, mais celle d'une cour royale. Au cœur du royaume d'Abomey, les artisans étaient les gardiens de la mémoire.
              </p>
              <p>
                Chaque bas-relief, chaque trône et chaque tenture était un message diplomatique, une chronique de guerre ou une célébration de la vie. Les artisans d'Abomey, connus sous le nom de "Hountondji", possédaient un statut privilégié, vivant souvent dans l'enceinte même du palais royal pour servir le souverain.
              </p>
            </div>
            <div className="flex items-center gap-3 text-terracotta">
              <Calendar size={20} />
              <span className="text-[10px] uppercase font-black tracking-widest">Depuis le XVIIème Siècle</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl"
          >
            <img 
              src="https://picsum.photos/seed/history1/800/1000" 
              alt="Ancient Artisanship" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-6 left-6 text-white/80 text-[9px] uppercase font-black tracking-widest">Reconstitution d'Abomey</p>
          </motion.div>
        </section>

        {/* Le Kanvô - NEW SECTION */}
        <section className="bg-terracotta/5 p-10 md:p-16 rounded-[3rem] border border-terracotta/10 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading">L'Art du Tissage Kanvô</h2>
              <div className="space-y-5 text-base text-muted-foreground font-serif leading-relaxed">
                <p>
                  Le Kanvô, ou "Tissu de Roi", est bien plus qu'une étoffe. C'est un vêtement chargé de symbolisme, tissé sur des métiers horizontaux par des maîtres artisans dont le savoir-faire se transmet de père en fils depuis des générations.
                </p>
                <p>
                  Chaque motif géométrique, chaque agencement de couleurs raconte une vertu : le rouge pour la bravoure, le vert pour l'espérance du futur, et l'or pour la dignité éternelle. Porter le Kanvô, c'est s'envelopper dans l'histoire vivante d'un peuple.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="https://picsum.photos/seed/weaver1/400/600" alt="Weaving" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform translate-y-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="https://picsum.photos/seed/pattern1/400/600" alt="Pattern" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        {/* La Transmission */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 relative aspect-square rounded-[2rem] overflow-hidden shadow-xl"
          >
            <img 
              src="https://picsum.photos/seed/hands/800/1000" 
              alt="Artisan Hands" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
             <p className="absolute top-6 left-6 text-white/80 text-[9px] uppercase font-black tracking-widest">La main, premier outil</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading">Le Souffle de la Main</h2>
            <div className="space-y-5 text-base text-muted-foreground font-serif leading-relaxed">
              <p>
                THUS ARTISAN Marketplace n'est pas qu'un portail commercial ; c'est un sanctuaire pour la transmission. Des rives de Ouidah jusqu'aux collines boisées du Nord, notre mission est de préserver des métiers menacés par la standarisation du monde moderne.
              </p>
              <p>
                Chaque acquisition sur notre plateforme finance directement des programmes d'apprentissage pour la nouvelle génération, assurant que l'étincelle de la création béninoise ne s'éteigne jamais.
              </p>
            </div>
            <div className="flex items-center gap-3 text-terracotta">
              <Award size={20} />
              <span className="text-[10px] uppercase font-black tracking-widest">Excellence & Équité</span>
            </div>
          </motion.div>
        </section>

        {/* Vision Future */}
        <section className="text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-heading mb-4">Un Futur <br/><span className="text-terracotta italic font-light">Millénaire</span></h2>
            <p className="text-base text-muted-foreground font-serif">Nous transformons l'héritage en luxe contemporain, connectant les cœurs à travers le monde par le langage universel de la beauté faite main.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "24+", label: "Ateliers Partenaires" },
              { val: "1200", label: "Acquisitions" },
              { val: "100%", label: "Authentique" },
              { val: "300yr", label: "D'Héritage" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-terracotta/10 rounded-2xl glass shadow-sm"
              >
                <p className="text-3xl font-heading text-terracotta mb-1">{stat.val}</p>
                <p className="text-[9px] uppercase font-black tracking-widest opacity-40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 text-center">
        <div className="space-y-6">
           <p className="text-[10px] uppercase font-black tracking-[0.4em] text-terracotta opacity-40">L'histoire s'écrit avec vous.</p>
           <Link to="/marketplace" className="inline-block px-10 py-4 bg-terracotta text-white rounded-full text-[11px] uppercase font-black tracking-widest shadow-xl hover:bg-terracotta/90 transition-all hover:-translate-y-1 active:scale-95">
              Explorer la Galerie
           </Link>
        </div>
      </footer>
    </div>
  );
}
