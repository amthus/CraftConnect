import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Menu, 
  X, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Search,
  Maximize2,
  Package,
  Facebook,
  Twitter,
  Share2,
  AlertCircle,
  Users,
  Zap,
  Eye
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from '../lib/CartContext';
import { ARTISANS, Product, COUNTRIES } from '../lib/constants';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { bagItems, isBagOpen, setIsBagOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-16 py-4 flex justify-between items-center transition-all duration-700 ${
      isScrolled ? 'glass shadow-2xl bg-white/70 py-3' : 'sm:bg-transparent sm:backdrop-blur-none py-6'
    }`}>
      <Link to="/" className="text-xl md:text-2xl font-heading tracking-tight text-terracotta flex items-center gap-2 cursor-pointer">
        <span className="font-black">BÉNIN</span>
        <span className="font-light text-foreground">ARTISAN</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.2em] font-bold">
        <Link to="/marketplace" className="hover:text-terracotta transition-colors flex items-center gap-2">
          <Maximize2 size={14} /> La Galerie
        </Link>
        <Link to="/#artisans" className="hover:text-terracotta transition-colors flex items-center gap-2">
          <Users size={14} /> Nos Artisans
        </Link>
        <Link to="/#sur-mesure" className="hover:text-terracotta transition-colors flex items-center gap-2">
          <Zap size={14} /> Sur Mesure
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsBagOpen(true)}
          className="relative group/bag"
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
        </Button>
      </div>

      <button 
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden text-foreground hover:text-terracotta transition-colors"
      >
        <Menu size={24} />
      </button>

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
              className="fixed top-0 left-0 bottom-0 z-[200] w-[80%] max-w-sm bg-white flex flex-col p-8 md:p-12 overflow-y-auto shadow-2xl"
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
                <Link to="/marketplace" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading flex items-center gap-4 hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4">
                  <Maximize2 size={24} /> La Galerie
                </Link>
                <Link to="/#artisans" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading flex items-center gap-4 hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4">
                  <Users size={24} /> Nos Artisans
                </Link>
                <Link to="/#sur-mesure" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading flex items-center gap-4 hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4">
                  <Zap size={24} /> Sur Mesure
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const CartSidebar = () => {
  const { bagItems, isBagOpen, setIsBagOpen, removeFromBag, shippingCountry, setShippingCountry, totalBagPrice } = useCart();
  const currentCountry = COUNTRIES.find(c => c.name === shippingCountry) || COUNTRIES[0];
  const shippingCost = currentCountry.shipping;
  const customsDuties = totalBagPrice * currentCountry.duties;
  const finalTotal = totalBagPrice + shippingCost + customsDuties;

  return (
    <Dialog open={isBagOpen} onOpenChange={setIsBagOpen}>
      <DialogContent className="sm:max-w-md glass border-terracotta/20 p-8 font-sans">
        <DialogHeader>
          <DialogTitle className="text-3xl font-heading text-terracotta">Mon Panier</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4 max-h-[40vh] overflow-y-auto pr-2">
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
                  <p className="text-[10px] text-muted-foreground uppercase">{ARTISANS.find(a => a.id === item.artisanId)?.name}</p>
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
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black opacity-50">Pays de Livraison</label>
              <select 
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
                className="w-full bg-white/50 border border-terracotta/20 rounded-xl px-4 h-10 text-xs focus:ring-1 focus:ring-terracotta outline-none"
              >
                {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
              <div className="flex justify-between">
                <span>Sous-total pièces</span>
                <span>{totalBagPrice}€</span>
              </div>
              <div className="flex justify-between">
                <span>Frais d'expédition</span>
                <span>{shippingCost}€</span>
              </div>
              <div className="flex justify-between">
                <span>Estimations Douanes</span>
                <span>{customsDuties.toFixed(2)}€</span>
              </div>
            </div>
            <div className="flex justify-between items-end pt-2 border-t border-terracotta/5">
              <span className="text-xs uppercase font-black opacity-80">Total Final</span>
              <span className="text-3xl font-heading text-terracotta">{finalTotal.toFixed(2)}€</span>
            </div>
            <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full h-12 text-xs uppercase tracking-widest font-bold shadow-lg shadow-terracotta/20">
              Accéder au Paiement Sécurisé
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const LogisticsWidget = ({ progress }: { progress: number }) => (
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
      <Progress value={progress} className="h-2 bg-white/20" />
      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
        * Les frais de livraison sont réduits de 15% supplémentaires à 80% de remplissage.
      </p>
    </div>
  </div>
);

export const TextureVisualizer = ({ image, label }: { image: string, label: string }) => {
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
    <div className="relative group overflow-hidden rounded-xl border border-terracotta/10 cursor-crosshair h-40" 
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

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToBag } = useCart();
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const artisan = ARTISANS.find(a => a.id === product.artisanId) || ARTISANS[0];

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col p-4 bg-white/40 glass rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-terracotta/5 border border-transparent hover:border-terracotta/10"
    >
      <div 
        className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-xl border border-terracotta/5 cursor-crosshair"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={(e) => {
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          setMousePos({ 
            x: ((e.clientX - left) / width) * 100, 
            y: ((e.clientY - top) / height) * 100 
          });
        }}
      >
        <motion.img 
          src={product.image} 
          alt={product.name} 
          animate={{
            scale: isZooming ? 1.5 : 1,
            x: isZooming ? `${(50 - mousePos.x) * 0.5}%` : 0,
            y: isZooming ? `${(50 - mousePos.y) * 0.5}%` : 0,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="h-full w-full object-cover origin-center"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" className="rounded-full bg-white text-terracotta hover:bg-terracotta hover:text-white shadow-xl">
                <Eye size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] glass p-0 overflow-hidden border-terracotta/20">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-square md:aspect-auto">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8 space-y-6">
                  <div>
                    <Badge className="bg-terracotta/10 text-terracotta mb-2">{product.category}</Badge>
                    <h2 className="text-4xl font-heading mb-1">{product.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 uppercase tracking-widest"><MapPin size={12}/> {product.origin}</p>
                  </div>
                  <p className="font-serif italic text-lg leading-relaxed text-muted-foreground">"{product.soulOfObject}"</p>
                  <div className="flex items-center gap-4 py-4 border-y border-terracotta/10">
                    <Avatar className="h-12 w-12 border border-terracotta/20">
                      <AvatarImage src={artisan.image} />
                      <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs uppercase font-black opacity-40">Artisan</p>
                      <p className="font-bold">{artisan.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-heading text-terracotta">{product.price}€</span>
                    <Button onClick={() => addToBag(product)} className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-10 h-12 text-xs uppercase font-black">
                      Ajouter au Panier
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => addToBag(product)}
            size="icon" 
            className="rounded-full bg-white text-terracotta hover:bg-terracotta hover:text-white shadow-xl"
          >
            <ShoppingBag size={18} />
          </Button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <Dialog>
             <DialogTrigger asChild>
               <Button variant="outline" className="w-full glass text-white border-white/20 hover:bg-white/20 text-[10px] uppercase font-black tracking-widest">
                 L'Âme de l'Objet
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[700px] glass border-terracotta/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading text-terracotta">{product.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8 py-4">
                  <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="https://assets.mixkit.co/videos/preview/mixkit-working-with-clay-on-a-pottery-wheel-20023-large.mp4" />
                    <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-[10px] tracking-widest text-white uppercase font-bold">Atelier en direct</div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs uppercase tracking-tighter text-muted-foreground mb-1 font-bold">Description Spirituelle</h4>
                        <p className="font-serif leading-relaxed text-lg">{product.soulOfObject}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#1877F2]"><Facebook size={14} /></Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#1DA1F2]"><Twitter size={14} /></Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-[#E60023]"><Share2 size={14} /></Button>
                      </div>
                    </div>
                    <TextureVisualizer image={product.image} label={product.textureLabel} />
                    <div className="pt-4 border-t border-terracotta/10 flex items-center justify-between">
                       <span className="text-2xl font-heading text-terracotta">{product.price}€</span>
                       <Button onClick={() => addToBag(product)} className="bg-terracotta text-white rounded-full px-8">Acquérir</Button>
                    </div>
                  </div>
                </div>
             </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-[10px] tracking-widest text-terracotta border-terracotta/30 uppercase">{product.category}</Badge>
          <span className="font-heading text-xl">{product.price}€</span>
        </div>
        <h3 className="font-heading text-2xl group-hover:text-terracotta transition-colors">{product.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-sans">
          <MapPin size={12} /> {product.origin}
        </p>
      </div>
    </motion.div>
  );
};

export const FloatingWhatsApp = () => (
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-8 right-8 z-50">
    <a href="https://wa.me/22900000000" target="_blank" rel="noopener noreferrer">
      <Button className="h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl p-0 flex items-center justify-center hover:bg-[#128C7E]">
        <MessageCircle size={32} />
      </Button>
    </a>
  </motion.div>
);
