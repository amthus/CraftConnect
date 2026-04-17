import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Search,
  Maximize2,
  Package,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Share2,
  AlertCircle,
  Users,
  PenTool,
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  origin: string;
  artisan: string;
  image: string;
  category: string;
  soulOfObject: string;
  textureLabel: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Poterie de Sè Ancestrale',
    price: 450,
    origin: 'Sè, Mono',
    artisan: 'Maman Sènan',
    image: 'https://picsum.photos/seed/pottery/800/1000',
    category: 'Céramique',
    soulOfObject: "Modelée avec la terre rouge du Mono, cette pièce porte les empreintes de générations de potières.",
    textureLabel: "Grain de terre cuite"
  },
  {
    id: '2',
    name: 'Pagne Tissé Kanvô Royal',
    price: 850,
    origin: 'Abomey',
    artisan: 'Atelier de la Cour Royale',
    image: 'https://picsum.photos/seed/fabric/800/1000',
    category: 'Textile',
    soulOfObject: "Un tissage complexe aux motifs symbolisant la force et la sagesse des rois du Danhomè.",
    textureLabel: "Fibres de coton naturel"
  },
  {
    id: '3',
    name: 'Statue Bronze d\'Ouidah',
    price: 1200,
    origin: 'Ouidah',
    artisan: 'Koffi l\'Ancien',
    image: 'https://picsum.photos/seed/bronze/800/1000',
    category: 'Sculpture',
    soulOfObject: "La cire perdue capturant l'esprit des ancêtres sur la côte des esclaves.",
    textureLabel: "Patine de bronze"
  }
];

const FloatingWhatsApp = () => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50"
  >
    <a href="https://wa.me/22900000000" target="_blank" rel="noopener noreferrer">
      <Button 
        className="h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl animate-pulse-gold p-0 flex items-center justify-center hover:bg-[#128C7E]"
      >
        <MessageCircle size={32} />
      </Button>
    </a>
  </motion.div>
);

const LogisticsWidget = ({ progress }: { progress: number }) => (
  <div className="glass p-6 rounded-2xl w-full max-w-md">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Package className="text-terracotta" />
        <span className="font-semibold text-xs tracking-widest uppercase text-terracotta">Conteneur Export France</span>
      </div>
      <Badge variant="outline" className="text-[10px] border-terracotta/30">GROUPÉ</Badge>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-sans">
        <span className="text-muted-foreground">Remplissage du conteneur</span>
        <span className="font-bold">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 bg-white/20">
        <div className="h-full bg-terracotta transition-all" style={{ width: `${progress}%` }} />
      </Progress>
      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
        * Les frais de livraison sont réduits de 15% supplémentaires à 80% de remplissage.
      </p>
    </div>
  </div>
);

const TextureVisualizer = ({ image, label }: { image: string, label: string }) => {
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPos({ x, y });
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-terracotta/10 cursor-crosshair" 
         ref={containerRef}
         onMouseEnter={() => setZoom(true)}
         onMouseLeave={() => setZoom(false)}
         onMouseMove={handleMouseMove}>
      <img src={image} alt="Texture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
        Texture: {label}
      </div>
      <AnimatePresence>
        {zoom && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none border-2 border-white/50 rounded-full w-48 h-48 overflow-hidden z-20 shadow-2xl"
            style={{
              top: `${pos.y}%`,
              left: `${pos.x}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-[400%] h-[400%] absolute"
                 style={{
                   backgroundImage: `url(${image})`,
                   backgroundSize: 'cover',
                   backgroundPosition: `${pos.x}% ${pos.y}%`
                 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard = ({ product, onAddToBag }: { product: Product, onAddToBag: (p: Product) => void }) => {
  const [videoError, setVideoError] = useState<{message: string, type: 'network' | 'playback' | null} | null>(null);

  const handleVideoError = (e: any) => {
    const code = e.target.error?.code;
    if (code === 2) {
      setVideoError({ message: "Problème de connexion au flux de l'atelier.", type: 'network' });
    } else {
      setVideoError({ message: "Erreur de lecture de l'aperçu digital.", type: 'playback' });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-xl border border-terracotta/5">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="w-full glass text-white border-white/20 hover:bg-white/20" />
              }
            >
              L'Âme de l'Objet
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] glass border-terracotta/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading text-terracotta">{product.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8 py-4">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
                  {/* Video Player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    {!videoError ? (
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover"
                        src="https://assets.mixkit.co/videos/preview/mixkit-working-with-clay-on-a-pottery-wheel-20023-large.mp4"
                        onError={handleVideoError}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <AlertCircle className="text-terracotta/40 w-12 h-12" />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-terracotta">
                            {videoError.type === 'network' ? 'Connexion Interrompue' : 'Erreur de Lecture'}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">{videoError.message}</p>
                          <p className="text-[9px] text-terracotta/60 mt-2 italic">L'artisan de {product.origin} reste disponible pour vos questions.</p>
                        </div>
                        <img 
                          src={product.image} 
                          alt="Fallback" 
                          className="w-full h-full absolute inset-0 object-cover opacity-20 -z-10" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-[10px] tracking-widest text-white uppercase font-bold">
                    Atelier en direct
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs uppercase tracking-tighter text-muted-foreground mb-1 font-bold">L'Âme de l'Objet</h4>
                      <p className="font-serif leading-relaxed text-lg">{product.soulOfObject}</p>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#1877F2]">
                         <Facebook size={14} />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#1DA1F2]">
                         <Twitter size={14} />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#E60023]">
                         <Share2 size={14} />
                       </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-tighter text-muted-foreground mb-1 font-bold">Artisan</h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-terracotta/20">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${product.artisan}`} />
                        <AvatarFallback>{product.artisan[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm tracking-tight">{product.artisan}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <MapPin size={10} /> {product.origin}
                        </p>
                      </div>
                    </div>
                  </div>
                  <TextureVisualizer image={product.image} label={product.textureLabel} />
                  <div className="flex items-center justify-between pt-4 border-t border-terracotta/10">
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-black text-terracotta/60 hover:text-terracotta hover:bg-transparent p-0" />
                        }
                      >
                        <ShieldCheck size={14} className="mr-2" /> Certificat Digital
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px] glass">
                        <DialogHeader>
                          <DialogTitle className="font-heading text-center text-2xl">Certificat d'Authenticité</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center py-8 text-center">
                          <div className="w-48 h-48 bg-white p-4 rounded-xl mb-6 shadow-inner border border-terracotta/10">
                            {/* QR Code Placeholder */}
                            <div className="w-full h-full border-2 border-dashed border-terracotta/20 flex items-center justify-center relative">
                                <Search size={48} className="text-terracotta/20" />
                                <div className="absolute inset-0 flex flex-wrap opacity-10">
                                    {Array.from({length: 100}).map((_, i) => <div key={i} className="w-2 h-2 bg-terracotta" />)}
                                </div>
                            </div>
                          </div>
                          <Badge className="bg-terracotta mb-4">NFT #BN-{Math.floor(Math.random() * 99999)}</Badge>
                          <h5 className="font-bold text-sm mb-1 uppercase tracking-tighter">{product.name}</h5>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4">Artisan: {product.artisan}</p>
                          <div className="h-px w-24 bg-terracotta/20 mb-4" />
                          <p className="text-xs font-serif leading-relaxed italic opacity-80">
                            "Ce certificat garantit l'origine Made in Benin et l'utilisation de matériaux sourcés localement."
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-heading text-terracotta">{product.price}€</span>
                      <Button 
                        onClick={() => onAddToBag(product)}
                        className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-8 h-10 text-[10px] uppercase font-bold"
                      >
                        Acquérir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-[10px] tracking-widest text-terracotta border-terracotta/30">{product.category}</Badge>
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg">{product.price}€</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onAddToBag(product)}
              className="h-8 w-8 rounded-full p-0 border-terracotta/20 hover:bg-terracotta hover:text-white transition-all"
            >
              <ShoppingBag size={14} />
            </Button>
          </div>
        </div>
        <h3 className="font-heading text-2xl group-hover:text-terracotta transition-colors">{product.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-sans">
          <MapPin size={12} /> {product.origin}
        </p>
      </div>
    </motion.div>
  );
};

export default function ArtisanMarketplace() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.25]);
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tous', 'Céramique', 'Textile', 'Sculpture'];

  const addToBag = (product: Product) => {
    setBagItems([...bagItems, product]);
  };

  const removeFromBag = (id: string) => {
    setBagItems(bagItems.filter(item => item.id !== id));
  };

  const totalBagPrice = bagItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen relative font-sans selection:bg-terracotta selection:text-white pb-20">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-16 py-4 flex justify-between items-center transition-all duration-700 ${
        isScrolled ? 'glass shadow-2xl bg-white/70 py-3' : 'sm:bg-transparent sm:backdrop-blur-none py-6'
      }`}>
        <div className="text-xl md:text-2xl font-heading tracking-tight text-terracotta flex items-center gap-2 cursor-pointer">
          <span className="font-black">BÉNIN</span>
          <span className="font-light text-foreground">ARTISAN</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.2em] font-bold">
          <div className="flex items-center relative">
            <motion.div 
              initial={false}
              animate={{ width: isSearchExpanded ? (window.innerWidth > 1024 ? 300 : 200) : 40 }}
              className="flex items-center h-10 glass rounded-full px-3 border border-terracotta/10 overflow-hidden"
            >
              <Search size={18} className="text-terracotta shrink-0" />
              <input 
                type="text" 
                placeholder="Chercher..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => { if (!searchQuery) setIsSearchExpanded(false); }}
                className="bg-transparent border-none focus:ring-0 text-[10px] w-full ml-2 placeholder:text-muted-foreground/50 transition-all font-sans"
              />
            </motion.div>
          </div>

          <a href="#marketplace" className="hover:text-terracotta transition-colors flex items-center gap-2">
            <Maximize2 size={14} /> La Galerie
          </a>
          <a href="#artisans" className="hover:text-terracotta transition-colors flex items-center gap-2">
            <Users size={14} /> Nos Artisans
          </a>
          <a href="#sur-mesure" className="hover:text-terracotta transition-colors flex items-center gap-2">
            <Zap size={14} /> Sur Mesure
          </a>
          <a href="#avis" className="hover:text-terracotta transition-colors flex items-center gap-2">
            <MessageCircle size={14} /> Avis
          </a>
          
          <Dialog open={isBagOpen} onOpenChange={setIsBagOpen}>
            <DialogTrigger
              render={
                <Button variant="ghost" size="icon" className="relative group/bag" />
              }
            >
              <ShoppingBag size={20} className="group-hover/bag:text-terracotta transition-colors" />
              <AnimatePresence>
                {bagItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-terracotta text-white rounded-full text-[10px] flex items-center justify-center font-bold"
                  >
                    {bagItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass border-terracotta/20 p-8 font-sans">
              <DialogHeader>
                <DialogTitle className="text-3xl font-heading text-terracotta">Mon Panier</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4 max-h-[60vh] overflow-y-auto">
                {bagItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto text-terracotta/20 mb-4" size={48} />
                    <p className="text-sm font-serif italic text-muted-foreground">Votre panier est vide.</p>
                  </div>
                ) : (
                  bagItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="h-16 w-16 aspect-square rounded-lg overflow-hidden border border-terracotta/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{item.artisan}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-terracotta text-sm">{item.price}€</p>
                        <button onClick={() => removeFromBag(item.id)} className="text-[10px] text-destructive hover:underline">Retirer</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {bagItems.length > 0 && (
                <div className="pt-6 border-t border-terracotta/10 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs uppercase font-black opacity-50">Total</span>
                    <span className="text-3xl font-heading text-terracotta">{totalBagPrice}€</span>
                  </div>
                  <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full h-12 text-xs uppercase tracking-widest font-bold">
                    Passer à l'achat sécurisé
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-foreground hover:text-terracotta transition-colors"
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-[200] w-[80%] max-w-sm bg-sand flex flex-col p-8 md:p-12 overflow-y-auto bg-white shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="text-xl font-heading tracking-tight text-terracotta">
                  <span className="font-black">BÉNIN</span>
                  <span className="font-light text-foreground">ARTISAN</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  { name: 'La Galerie', href: '#marketplace', icon: <Maximize2 size={24} /> },
                  { name: 'Nos Artisans', href: '#artisans', icon: <Users size={24} /> },
                  { name: 'Sur Mesure', href: '#sur-mesure', icon: <Zap size={24} /> },
                  { name: 'Avis Clients', href: '#avis', icon: <MessageCircle size={24} /> },
                  { name: 'Logistique', href: '#logistique', icon: <Truck size={24} /> }
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-heading flex items-center gap-4 hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4"
                  >
                    {item.icon}
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-sand">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/market/1920/1080?blur=1" 
            alt="Artisan background" 
            className="w-full h-full object-cover opacity-40 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sand to-sand" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-heading leading-tight md:leading-none tracking-tight mb-8 md:mb-12 text-shadow-gold px-4"
          >
            L'Authenticité <br /> <span className="text-terracotta">Expatriée</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-muted-foreground font-serif leading-relaxed italic max-w-2xl mx-auto mb-10 md:mb-12"
          >
            "Redécouvrez le Bénin à travers le regard de ses maîtres artisans. Un voyage tactile et spirituel, livré à votre porte."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Button size="lg" className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-12 h-14 text-sm tracking-widest uppercase font-bold group">
              Explorer la Collection
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Découvrir l'histoire</span>
              <div className="h-px w-8 md:w-12 bg-terracotta/30" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
          <div className="w-px h-12 bg-foreground" />
        </motion.div>
      </section>

      {/* Overview & Logistics Section */}
      <section id="artisans" className="py-20 md:py-32 px-6 md:px-8 bg-sand relative">
        <div id="logistique" className="absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading mb-6 md:mb-8 leading-tight">
              Une Logistique <br /> <span className="text-terracotta italic">Réinventée</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-12 font-serif">
              Notre module d'exportation groupée permet de réduire l'empreinte carbone et les coûts de livraison. Suivez en direct le remplissage de la prochaine livraison vers votre région.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
              <div className="space-y-2">
                <ShieldCheck className="text-terracotta mb-2" size={32} />
                <h4 className="font-bold text-sm tracking-tighter uppercase">Authenticité Certifiée</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">NFT et QR code unique pour chaque pièce.</p>
              </div>
              <div className="space-y-2">
                <Zap className="text-terracotta mb-2" size={32} />
                <h4 className="font-bold text-sm tracking-tighter uppercase">Paiement Escrow</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Fonds sécurisés jusqu'à la confirmation de réception.</p>
              </div>
            </div>
            <LogisticsWidget progress={65} />
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square relative z-10 overflow-hidden rounded-3xl group">
              <img 
                src="https://picsum.photos/seed/portrait/1000/1000" 
                alt="Artisan at work" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 md:border-8 border-white/50 transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-12 -right-6 md:-right-12 w-3/4 aspect-square bg-terracotta/10 rounded-3xl -z-0 translate-x-4 -translate-y-4 border border-terracotta/20" />
            <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 glass p-4 md:p-6 rounded-2xl z-20 max-w-[160px] md:max-w-[200px] shadow-xl">
              <p className="text-[10px] md:text-xs font-serif italic mb-3 opacity-90 leading-relaxed">"Porter l'artisanat du Bénin au-delà des frontières, c'est partager une partie de notre ADN."</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-6 w-6 md:h-8 md:w-8">
                  <AvatarImage src="https://i.pravatar.cc/100?u=minister" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">A. Dossou</p>
                  <p className="text-[6px] md:text-[8px] text-muted-foreground uppercase tracking-widest">Maître Tisserand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Marketplace Section */}
      <section id="marketplace" className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl px-2">
              <Badge className="bg-terracotta/10 text-terracotta border-terracotta/20 mb-6 uppercase tracking-[0.2em] font-black">Marché de Créateurs</Badge>
              <h2 className="text-4xl md:text-6xl font-heading mb-6 tracking-tight">Le Catalogue <br /> <span className="text-terracotta">Héritage</span></h2>
              <p className="text-muted-foreground font-serif text-base md:text-lg leading-relaxed">
                Collection exclusive sélectionnée pour sa rareté et son excellence artisanale.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 px-2">
              {categories.map(cat => (
                <Button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"} 
                  className={`rounded-full px-6 md:px-8 h-10 md:h-12 transition-all font-bold text-[10px] md:text-xs uppercase tracking-widest ${
                    selectedCategory === cat ? "bg-terracotta text-white" : "border-terracotta/20 hover:bg-terracotta/5"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 px-2">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-16 md:py-24 text-center glass rounded-3xl"
                >
                  <p className="text-xl font-serif italic text-muted-foreground">Aucun trésor trouvé pour cette recherche.</p>
                </motion.div>
              ) : (
                filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product.id}
                  >
                    <ProductCard product={product} onAddToBag={addToBag} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="mt-16 md:mt-32 p-8 md:p-12 glass rounded-3xl text-center border-terracotta/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-heading mb-4 md:mb-6">Authenticité & Traçabilité</h3>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground mb-8 font-serif italic">
                Chaque œuvre est accompagnée d'un certificat digital attestant du maître artisan créateur et de son origine géographique précise.
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-lg md:text-xl font-heading text-terracotta">Origine</span>
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-50">Sourcing Local</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg md:text-xl font-heading text-terracotta">Garantie</span>
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-50">Savoir-faire Ancestral</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg md:text-xl font-heading text-terracotta">Impact</span>
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-50">Commerce Équitable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sur Mesure & Dedicated Section */}
      <section id="sur-mesure" className="py-24 md:py-40 px-6 md:px-8 bg-sand relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-terracotta/20 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <Badge className="bg-terracotta text-white px-4 py-1 uppercase tracking-widest font-bold">Service Conciergerie</Badge>
            <h2 className="text-4xl md:text-6xl font-heading leading-tight">
              Votre Vision, <br /> Notre <span className="text-terracotta italic text-5xl md:text-7xl">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif leading-relaxed italic max-w-xl">
              "Le luxe réside dans l'unique. Commandez une pièce conçue exclusivement pour vous, façonnée par les mains des plus grands maîtres du Bénin."
            </p>
            <div className="space-y-4">
               {[
                 { title: "Co-Design", desc: "Échanges directs avec l'artisan pour affiner chaque détail." },
                 { title: "Matériaux Nobles", desc: "Accès à des essences de bois et des pigments rares." },
                 { title: "Suivi Privé", desc: "Recevez des photos et vidéos de la création de votre objet." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="h-6 w-6 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                     <PenTool size={12} className="text-terracotta" />
                   </div>
                   <div>
                     <h4 className="text-sm font-bold uppercase tracking-tight">{item.title}</h4>
                     <p className="text-xs text-muted-foreground">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="flex-1 w-full bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-terracotta/5 relative">
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-terracotta rounded-full flex items-center justify-center text-white rotate-12 shadow-xl z-10">
               <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Unique<br/>Bespoke</span>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black opacity-40">Nom</label>
                  <input type="text" className="w-full bg-sand border-none rounded-xl p-4 text-xs font-sans outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black opacity-40">Email</label>
                  <input type="email" className="w-full bg-sand border-none rounded-xl p-4 text-xs font-sans outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black opacity-40">Description du Rêve</label>
                <textarea 
                  className="w-full bg-sand border-none rounded-xl p-4 text-xs font-sans outline-none focus:ring-1 focus:ring-terracotta h-32" 
                  placeholder="Décrivez l'objet, les dimensions, les matériaux souhaités..."
                />
              </div>
              <Button type="button" className="w-full bg-terracotta hover:bg-terracotta/90 text-white h-14 rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-terracotta/20">
                Lancer la Co-Création
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Avis Clients Section */}
      <section id="avis" className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-heading mb-6 tracking-tight">Le Cercle des <span className="text-terracotta">Collectionneurs</span></h2>
            <p className="text-sm text-muted-foreground font-serif italic">"Leurs témoignages sont le reflet de notre engagement pour l'excellence."</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: "Sébastien L.", city: "Genève", text: "Le Pagne Kanvô reçu est d'une finesse incroyable. On sent le poids de l'histoire et le talent de l'artisan dans chaque fibre.", rating: 5 },
              { name: "Elena R.", city: "Milan", text: "La pièce sur mesure dépasse mes attentes. Le suivi vidéo pendant la sculpture a rendu l'expérience magique.", rating: 5 },
              { name: "Jean-Pierre T.", city: "Ouidah", text: "Un service impeccable. La livraison groupée a été rapide et sécurisée. Une fierté pour le Bénin.", rating: 5 }
            ].map((avis, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="p-8 md:p-10 glass rounded-3xl border border-terracotta/10 relative"
              >
                <div className="flex gap-1 text-terracotta mb-6">
                  {Array.from({length: avis.rating}).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm md:text-base font-serif italic leading-relaxed mb-8 opacity-80">"{avis.text}"</p>
                <div className="flex gap-4 items-center">
                  <div className="h-10 w-10 bg-terracotta/10 rounded-full flex items-center justify-center font-heading text-terracotta font-bold">{avis.name[0]}</div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-tight">{avis.name}</h5>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{avis.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sand border-t border-terracotta/10 py-16 md:py-24 px-6 md:px-8 overflow-hidden relative">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 relative z-10">
          <div className="md:col-span-2">
            <div className="text-2xl md:text-3xl font-heading tracking-tight text-terracotta mb-6 md:mb-8">
              <span className="font-black">BÉNIN</span>
              <span className="font-light text-foreground">ARTISAN</span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed font-serif italic">
              "Préserver le geste, connecter les mondes. La première plateforme d'exportation d'artisanat d'excellence en direct du Bénin."
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h5 className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-terracotta">Explorer</h5>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold opacity-70">
              <li><a href="#" className="hover:text-terracotta transition-colors">La Galerie</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Les Régions</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Certificats NFT</a></li>
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h5 className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-terracotta">Newsletter Élite</h5>
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] md:text-xs text-muted-foreground">Accès prioritaire aux pièces uniques.</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Votre email" 
                      className="bg-white/50 border border-terracotta/20 rounded-full px-4 text-[10px] md:text-xs w-full focus:outline-none focus:border-terracotta font-sans h-10"
                    />
                    <Button 
                      onClick={() => setIsSubscribed(true)}
                      size="sm" 
                      className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full h-10 px-4"
                    >
                      OK
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl text-center"
                >
                  <p className="text-[10px] font-bold text-terracotta uppercase tracking-[0.2em]">Bienvenue dans le cercle</p>
                  <p className="text-[9px] text-muted-foreground mt-1 font-serif italic">Vous recevrez bientôt nos invitations exclusives.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-terracotta/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">
          <p>© 2026 BÉNIN ARTISAN MARKETPLACE. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-4 md:gap-8">
            <a href="#" className="hover:text-terracotta transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-terracotta transition-colors">CGV Luxe</a>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <FloatingWhatsApp />
    </div>
  );
}
