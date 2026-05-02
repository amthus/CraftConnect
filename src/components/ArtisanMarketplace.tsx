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
  ShoppingBag,
  X
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
import { Nav, ProductCard, CartSidebar, WishlistSidebar, FloatingSupport, LogisticsWidget } from './SharedComponents';
import { ARTISANS, PRODUCTS } from '../lib/constants';

import { 
  collection, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ArtisanMarketplace() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { scrollY } = useScroll();
  
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [liveArtisans, setLiveArtisans] = useState<any[]>([]);

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setLiveProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubArtisans = onSnapshot(collection(db, 'artisans'), (snapshot) => {
      setLiveArtisans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubProducts();
      unsubArtisans();
    };
  }, []);

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -120]);
  const heroBgY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroRotate = useTransform(scrollY, [0, 1000], [0, 5]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1590422119330-8488e0787e9c?q=80&w=800", title: "Sculpture Yoruba", type: "Bronze" },
    { url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800", title: "Tissage Kanvô", type: "Textile" },
    { url: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800", title: "Céramique de Sè", type: "Argile" },
    { url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800", title: "Masque Gèlèdé", type: "Bois" },
    { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800", title: "Trône Royal", type: "Sculpture" },
    { url: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800", title: "Fonderie Traditionnelle", type: "Métal" }
  ];

  return (
    <div className="min-h-screen relative font-sans selection:bg-terracotta selection:text-white pb-20">
      <Nav />
      <CartSidebar />
      <WishlistSidebar />
      <FloatingSupport />

      <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroBgY, rotate: heroRotate }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1920" alt="Back" className="w-full h-full object-cover opacity-60 grayscale-[0.2]" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-4">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="bg-terracotta text-white mb-6 uppercase tracking-[0.4em] px-4 py-1.5 text-[10px] font-black mix-blend-difference">Excellence Béninoise</Badge>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-heading leading-[0.85] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              L'ÂME <br /> <span className="text-terracotta">DU GESTE</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-serif leading-relaxed italic max-w-2xl mx-auto mb-12 font-light">
              "Redécouvrez le Bénin à travers le regard de ses maîtres artisans. Un voyage tactile et spirituel, livré à votre porte."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-white text-black hover:bg-terracotta hover:text-white rounded-full px-12 h-16 text-[11px] uppercase tracking-[0.2em] font-black group transition-all duration-500 shadow-2xl">
                  Explorer la Collection <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-4">
                {liveArtisans.map(a => (
                  <Avatar key={a.id} className="border-2 border-white/20 h-10 w-10">
                    <AvatarImage src={a.image} />
                  </Avatar>
                ))}
                {liveArtisans.length === 0 && (
                  <div className="h-10 w-10 rounded-full bg-terracotta flex items-center justify-center text-[10px] font-black border-2 border-white/20">
                    +0
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-terracotta to-transparent rounded-full" />
        </motion.div>
      </section>

      <section id="marketplace" className="py-20 md:py-32 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <Badge className="bg-terracotta/10 text-terracotta mb-4 uppercase tracking-widest px-3 py-0.5 text-[9px]">Éditions Limitées</Badge>
              <h2 className="text-4xl md:text-6xl font-heading leading-tight mb-4">Le Curatage <br /><span className="text-terracotta italic font-light">de Saison</span></h2>
              <p className="text-base text-muted-foreground font-serif leading-relaxed italic">Sélection exclusive de pièces uniques, chacune portant l'âme de son créateur et l'histoire de sa ville d'origine.</p>
            </div>
            <Link to="/marketplace">
              <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-black hover:text-terracotta flex items-center gap-3 transition-all">
                Voir toute la galerie <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {liveProducts.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-heading leading-[0.9] mb-6">Fragments de <br /><span className="text-terracotta italic font-light">Patrimoine</span></h2>
              <p className="text-lg text-white/40 font-serif italic max-w-lg">Une immersion visuelle dans les ateliers. Chaque image raconte un instant de création pure.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] uppercase font-black tracking-widest text-terracotta mb-2">Techniques</p>
                <p className="text-xl font-heading">100% Manuel</p>
              </div>
            </div>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group cursor-zoom-in rounded-3xl overflow-hidden break-inside-avoid shadow-2xl"
                onClick={() => setSelectedImage(img.url)}
              >
                <img src={img.url} alt={img.title} className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <p className="text-[10px] uppercase font-black tracking-[0.3em] text-terracotta mb-2">{img.type}</p>
                  <h4 className="text-2xl font-heading">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="artisans" className="py-16 md:py-24 px-4 md:px-12 bg-sand relative">
        <div id="logistique" className="absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading mb-6">Maîtres de <br /><span className="text-terracotta italic font-light">la Matière</span></h2>
              <p className="text-base text-muted-foreground font-serif leading-relaxed italic mb-8">Chaque artisan de notre marketplace est sélectionné pour son excellence, respectant les matériaux locaux et l'environnement.</p>
              <Link to="/artisans">
                <Button variant="outline" className="rounded-full border-terracotta/20 text-terracotta uppercase font-black text-[10px] tracking-widest hover:bg-terracotta hover:text-white transition-all">
                  Découvrir tous les artisans
                </Button>
              </Link>
            </div>
            <div className="grid gap-6">
              {liveArtisans.map(artisan => (
                <Link key={artisan.id} to="/artisans">
                  <div className="flex items-center gap-5 p-5 glass rounded-2xl border border-white/40 hover:border-terracotta/20 transition-all cursor-pointer group">
                    <Avatar className="h-16 w-16 ring-4 ring-white group-hover:ring-terracotta/20 transition-all">
                      <AvatarImage src={artisan.image} />
                      <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-2xl font-heading">{artisan.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase mb-2">{artisan.location}</p>
                      <div className="flex gap-2">
                        {artisan.techniques?.slice(0, 2).map(t => <Badge key={t} variant="outline" className="text-[9px] uppercase">{t}</Badge>)}
                      </div>
                    </div>
                  </div>
                </Link>
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

      <section id="sur-mesure" className="py-24 px-4 md:px-12 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sand/20 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <Badge className="bg-gold/10 text-gold border-gold/20 px-4 py-1 uppercase tracking-[0.3em] font-black text-[9px]">Conciergerie Exclusive</Badge>
            <h2 className="text-5xl md:text-7xl font-heading leading-tight">Votre Vision, <br /><span className="text-terracotta font-light italic">notre Excellence</span></h2>
            <p className="text-lg text-muted-foreground font-serif leading-relaxed italic font-light">Donnez vie à vos projets les plus audacieux. Collaborons ensemble pour créer des pièces sur mesure qui transcendent le temps et l'espace.</p>
            <div className="flex items-center gap-5 pt-4">
              <Avatar className="h-14 w-14 border-2 border-terracotta p-1"><AvatarImage src="https://i.pravatar.cc/150?u=director" /></Avatar>
              <div><p className="font-bold text-base tracking-tight">Directeur Artistique</p><p className="text-[9px] text-muted-foreground uppercase font-black opacity-60">Accompagnement Personnalisé</p></div>
            </div>
            <Link to="/custom-order">
              <Button className="bg-black text-white rounded-full px-10 h-14 text-[10px] uppercase font-black tracking-widest group shadow-xl hover:bg-black/90 transition-all active:scale-95">
                Initier un Projet <PenTool className="ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 md:scale-110">
            <img src="https://picsum.photos/seed/custom1/600/800" className="rounded-3xl shadow-2xl skew-y-1 md:skew-y-3" alt="Custom" />
            <img src="https://picsum.photos/seed/custom2/600/800" className="rounded-3xl shadow-2xl -skew-y-1 md:-skew-y-3 mt-8 md:mt-12" alt="Custom" />
          </div>
        </div>
      </section>

      <section id="avis" className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(183,110,74,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 opacity-40 uppercase tracking-[0.5em] border-black text-[9px] font-black">Voix Initiées</Badge>
            <h2 className="text-5xl md:text-8xl font-heading leading-[0.8] mb-4">Le Témoignage <br /><span className="text-terracotta italic font-light italic">du Cercle</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Julian M.", 
                role: "Architecte d'Intérieur, Berlin", 
                text: "La qualité des textiles Kanvô est incomparable. Une touche d'histoire dans mes projets modernes qui captive immédiatement le regard.", 
                avatar: "https://i.pravatar.cc/150?u=julian"
              },
              { 
                name: "Elena R.", 
                role: "Directrice de Galerie, Zurich", 
                text: "THUS ARTISAN Marketplace est devenu ma source numéro un pour l'artisanat ouest-africain authentique. Le niveau de détail est exceptionnel.", 
                avatar: "https://i.pravatar.cc/150?u=elena"
              },
              { 
                name: "Jean-Pierre D.", 
                role: "Collectionneur, Monaco", 
                text: "Le système de logistique groupée est révolutionnaire. Pouvoir acquérir des pièces lourdes sans compromis éthique est un luxe précieux.", 
                avatar: "https://i.pravatar.cc/150?u=jean"
              }
            ].map((avis, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} 
                key={i} 
                className="p-12 rounded-[3.5rem] border border-terracotta/5 bg-sand/10 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-terracotta/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex gap-1 text-terracotta mb-8 group-hover:scale-110 transition-transform origin-left">
                    {Array.from({length: 5}).map((_, j) => <Star key={j} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xl font-serif italic leading-[1.6] mb-12 text-foreground/80">"{avis.text}"</p>
                </div>
                <div className="flex items-center gap-5">
                  <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                    <AvatarImage src={avis.avatar} />
                  </Avatar>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest">{avis.name}</p>
                    <p className="text-[10px] font-mono font-bold opacity-30 mt-1">{avis.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImage && (
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage} 
                className="max-w-full max-h-full object-contain rounded-3xl" 
                alt="Zoom" 
              />
            )}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <section id="faq" className="py-24 px-4 md:px-12 bg-sand/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-terracotta/10 text-terracotta mb-4 uppercase tracking-widest px-3 py-0.5 text-[9px]">Aide & Informations</Badge>
            <h2 className="text-4xl md:text-6xl font-heading mb-4">Questions <span className="text-terracotta italic font-light">Fréquentes</span></h2>
            <p className="text-base text-muted-foreground font-serif italic">Tout ce que vous devez savoir sur l'expérience THUS ARTISAN.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Comment garantissez-vous l'authenticité des produits ?",
                a: "Chaque pièce est accompagnée d'un certificat d'authenticité digital lié à un identifiant unique. Nos experts sur place valident personnellement chaque créateur et chaque technique utilisée pour s'assurer qu'elle respecte l'héritage béninois."
              },
              {
                q: "Quels sont les délais et modes de livraison ?",
                a: "Nous utilisons un système de logistique groupée pour réduire l'empreinte carbone. Les délais varient entre 10 et 21 jours selon votre localisation. Chaque colis est assuré et suivi en temps réel via notre widget logistique."
              },
              {
                q: "Comment fonctionne le processus de commande sur mesure ?",
                a: "Après avoir initié votre projet, notre directeur artistique vous recontacte pour affiner vos besoins. Une fois le cahier des charges validé, l'artisan commence la création. Vous recevez des mises à jour photos à chaque étape clé."
              },
              {
                q: "Quels sont les frais de douane pour l'international ?",
                a: "Les frais dépendent de votre pays de résidence. Notre simulateur dans le panier d'achat estime les droits de douane pour vous offrir une transparence totale avant la validation de votre commande."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/50 hover:border-terracotta/20 transition-all"
              >
                <h4 className="text-lg font-bold mb-3 flex items-center gap-3">
                  <span className="h-6 w-6 bg-terracotta text-white rounded-full flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                  {item.q}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-12 bg-terracotta text-white relative overflow-hidden">
        <motion.div style={{ rotate: 15 }} className="absolute top-0 right-0 opacity-10 scale-150"><ShoppingBag size={600} /></motion.div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          {!isSubscribed ? (
            <>
              <h2 className="text-4xl md:text-6xl font-heading">Rejoignez <br /><span className="italic font-light">l'Avant-Garde</span></h2>
              <p className="text-lg opacity-80 font-serif italic max-w-2xl mx-auto">Soyez le premier informé des nouvelles collections privées et des récits de nos maîtres artisans.</p>
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    setEmailError('Veuillez entrer une adresse email valide.');
                    return;
                  }
                  setEmailError('');
                  setIsSubscribed(true); 
                }} 
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-md relative"
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email secret..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 px-6 text-sm text-white placeholder:text-white/40" 
                  required 
                />
                <Button className="bg-white text-terracotta hover:bg-white/90 rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">S'inscrire</Button>
                {emailError && <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-white bg-red-500/80 px-4 py-1 rounded-full font-black tracking-widest uppercase shadow-lg">{emailError}</p>}
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

      <footer className="py-16 md:py-24 px-4 md:px-12 bg-white border-t border-terracotta/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="space-y-4">
            <div className="text-2xl font-heading tracking-tight text-terracotta">
              <span className="font-black">THUS</span>
              <span className="font-light text-foreground">ARTISAN</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs font-serif italic">Promouvoir l'excellence artisanale du Bénin sur la scène internationale, une pièce unique à la fois.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-10">
            {[
              { title: "Galerie", items: [
                { name: "Nouveautés", link: "/marketplace" },
                { name: "Sculptures", link: "/marketplace" },
                { name: "Textiles", link: "/marketplace" },
                { name: "Céramiques", link: "/marketplace" }
              ] },
              { title: "Services", items: [
                { name: "Sur Mesure", link: "/custom-order" },
                { name: "Logistique", link: "/marketplace" },
                { name: "Conciergerie", link: "/contact" },
                { name: "Authentification", link: "/history" }
              ] },
              { title: "Maison", items: [
                { name: "Notre Histoire", link: "/history" },
                { name: "Les Artisans", link: "/artisans" },
                { name: "Engagements", link: "/privacy" },
                { name: "Nous joindre", link: "/contact" }
              ] }
            ].map(col => (
              <div key={col.title} className="space-y-3">
                <h5 className="text-[9px] uppercase font-black opacity-30 tracking-widest">{col.title}</h5>
                <ul className="space-y-1.5">
                  {col.items.map(item => (
                    <li key={item.name}>
                      <Link to={item.link} className="text-[11px] hover:text-terracotta transition-colors cursor-pointer font-bold">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-terracotta/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase font-black opacity-40 tracking-widest">
          <p>© 2024 THUS ARTISAN MARKETPLACE. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-terracotta">LinkedIn</a>
            <a href="#" className="hover:text-terracotta">Instagram</a>
            <a href="#" className="hover:text-terracotta">Pinterest</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
