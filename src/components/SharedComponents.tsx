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
  Eye,
  Heart,
  ChevronRight,
  Instagram
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
import { useAuth } from '../lib/AuthContext';
import { ARTISANS, Product, COUNTRIES, PRODUCTS } from '../lib/constants';

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { bagItems, isBagOpen, setIsBagOpen, wishlistItems, setIsWishlistOpen } = useCart();
  const { user } = useAuth();
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
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsWishlistOpen(true)}
            className="relative group/wish"
          >
            <Heart size={20} className={wishlistItems.length > 0 ? 'text-terracotta fill-terracotta' : 'group-hover/wish:text-terracotta transition-colors'} />
            <AnimatePresence>
              {wishlistItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 h-4 w-4 bg-terracotta text-white rounded-full text-[10px] flex items-center justify-center font-bold"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

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

        <div className="flex items-center gap-3 pl-4 border-l border-terracotta/10">
          {user && (
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold leading-none">{user.name}</p>
            </div>
          )}
          <Avatar className="h-9 w-9 border-2 border-terracotta/20 shadow-inner group cursor-pointer hover:border-terracotta transition-colors">
            {user?.avatar && <AvatarImage src={user.avatar} />}
            <AvatarFallback className="bg-sand text-terracotta text-[10px] font-black group-hover:bg-terracotta group-hover:text-white transition-colors">
              {user ? getInitials(user.name) : <Users size={14} />}
            </AvatarFallback>
          </Avatar>
        </div>
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

export const WishlistSidebar = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, addToBag } = useCart();

  return (
    <Dialog open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
      <DialogContent className="sm:max-w-md glass border-terracotta/20 p-8 font-sans">
        <DialogHeader>
          <DialogTitle className="text-3xl font-heading text-terracotta">Ma Liste d'Envies</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4 max-h-[60vh] overflow-y-auto pr-2">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto text-terracotta/20 mb-4" size={48} />
              <p className="text-sm font-serif italic text-muted-foreground">Votre liste d'envies est vide.</p>
            </div>
          ) : (
            wishlistItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center group">
                <div className="h-16 w-16 aspect-square rounded-lg overflow-hidden border border-terracotta/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm tracking-tight">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{item.price}€</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => { addToBag(item); removeFromWishlist(item.id); }}
                    className="h-8 w-8 text-terracotta hover:bg-terracotta hover:text-white rounded-full"
                  >
                    <ShoppingBag size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFromWishlist(item.id)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {wishlistItems.length > 0 && (
          <div className="pt-6 border-t border-terracotta/10">
            <Button 
              onClick={() => setIsWishlistOpen(false)}
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full h-12 text-xs uppercase tracking-widest font-bold"
            >
              Continuer mes découvertes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
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
  const { addToBag, addToWishlist, isInWishlist } = useCart();
  const [isZooming, setIsZooming] = useState(false);
  const [imageError, setImageError] = useState(false);
  const artisan = ARTISANS.find(a => a.id === product.artisanId) || ARTISANS[0];
  const itemInWishlist = isInWishlist(product.id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col p-4 bg-white/40 glass rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-terracotta/5 border border-transparent hover:border-terracotta/10"
    >
      <Dialog>
        <DialogTrigger 
          nativeButton={false}
          render={<div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-xl border border-terracotta/5 cursor-pointer group/card" />}
        >
          <div 
            className="w-full h-full relative overflow-hidden"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            {!imageError ? (
              <motion.img 
                src={product.image} 
                alt={product.name} 
                onError={() => setImageError(true)}
                animate={{ scale: isZooming ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full w-full object-cover origin-center ${product.stock === 0 ? 'grayscale opacity-60' : ''}`}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sand/30 font-heading text-4xl text-terracotta/20 select-none">
                {getInitials(product.name)}
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-500" />
            {product.stock === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-xl px-8 py-3 rounded-full text-[11px] uppercase font-black tracking-[0.25em] text-white border border-terracotta/30 shadow-[0_20px_50px_rgba(183,110,74,0.3)] ring-1 ring-white/10">
                  <span className="flex items-center gap-2">
                    <X size={14} className="text-terracotta" />
                    Hélas, Vendu
                  </span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                <div className="glass px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-[0.2em] text-white">Découvrir l'âme</div>
              </div>
            )}
          </div>
        </DialogTrigger>

        <div className="absolute top-8 right-8 flex flex-col gap-2 z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
           <Button 
            onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
            size="icon" 
            className={`rounded-full shadow-xl transition-all ${itemInWishlist ? 'bg-terracotta text-white' : 'bg-white text-terracotta hover:bg-terracotta hover:text-white'}`}
          >
            <Heart size={18} fill={itemInWishlist ? "currentColor" : "none"} />
          </Button>

          <Button 
            onClick={(e) => { e.stopPropagation(); if (product.stock > 0) addToBag(product); }}
            size="icon" 
            disabled={product.stock === 0}
            className={`rounded-full shadow-xl ${product.stock === 0 ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' : 'bg-white text-terracotta hover:bg-terracotta hover:text-white'}`}
          >
            <ShoppingBag size={18} />
          </Button>

          <Dialog>
            <DialogTrigger 
              render={<Button size="icon" className="rounded-full bg-white text-terracotta hover:bg-terracotta hover:text-white shadow-xl" />}
            >
              <Share2 size={18} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px] glass p-6 border-terracotta/20">
              <DialogHeader>
                <DialogTitle className="text-xs font-black uppercase tracking-widest text-center text-terracotta">Partager cette œuvre</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center gap-4 py-6">
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:text-[#1877F2] hover:bg-[#1877F2]/10"><Facebook size={24} /></Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10"><Twitter size={24} /></Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:text-[#E60023] hover:bg-[#E60023]/10"><Instagram size={24} /></Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DialogContent className="sm:max-w-[900px] glass p-0 overflow-hidden border-terracotta/20 font-sans">
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-sand/20">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/80 backdrop-blur-md text-terracotta px-4 py-1 uppercase tracking-widest">{product.category}</Badge>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 space-y-8 overflow-y-auto">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-4xl md:text-5xl font-heading leading-tight">{product.name}</h2>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 uppercase tracking-[0.2em] font-bold"><MapPin size={14} className="text-terracotta" /> {product.origin}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => addToWishlist(product)}
                      className={`h-12 w-12 rounded-full ${itemInWishlist ? 'text-terracotta bg-terracotta/10' : 'hover:bg-terracotta/5'}`}
                    >
                      <Heart size={28} fill={itemInWishlist ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">L'Âme de l'Objet</p>
                    <p className="font-serif italic text-xl leading-relaxed text-muted-foreground border-l-2 border-terracotta/20 pl-6">"{product.soulOfObject}"</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Détails de Texture</p>
                    <TextureVisualizer image={product.image} label={product.textureLabel} />
                  </div>

                  <div className="flex items-center gap-4 p-5 glass border border-terracotta/10 rounded-2xl">
                    <Avatar className="h-14 w-14 border border-terracotta/20 shadow-inner">
                      <AvatarImage src={artisan.image} />
                      <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-[9px] uppercase font-black opacity-40 tracking-wider">Maître Artisan</p>
                      <p className="font-bold text-lg">{artisan.name}</p>
                      <p className="text-xs text-muted-foreground font-serif italic">{artisan.location}</p>
                    </div>
                    <Link to={`/#artisans`} onClick={(e) => { /* Close dialog maybe? */ }}>
                       <Button variant="ghost" size="icon" className="rounded-full"><ChevronRight size={20}/></Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-6 pt-4 border-t border-terracotta/10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-black opacity-40">Prix d'acquisition</p>
                      <span className="text-4xl font-heading text-terracotta">{product.price}€</span>
                    </div>
                    <Button 
                      onClick={() => addToBag(product)} 
                      disabled={product.stock === 0}
                      className={`flex-1 rounded-full h-16 text-xs uppercase font-black tracking-widest shadow-xl transition-all ${
                        product.stock === 0 
                        ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' 
                        : 'bg-terracotta hover:bg-terracotta/90 text-white shadow-terracotta/20'
                      }`}
                    >
                      {product.stock === 0 ? 'Hélas, Vendu' : 'Ajouter au Panier'}
                    </Button>
                  </div>

                  <div className="pt-8 border-t border-terracotta/10">
                     <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Inspirations liées</p>
                        <Link to="/marketplace" className="text-[9px] uppercase font-bold text-muted-foreground hover:text-terracotta transition-colors">Tout voir</Link>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        {PRODUCTS.filter(item => item.id !== product.id && (item.category === product.category || item.artisanId === product.artisanId)).slice(0, 2).map((item, idx) => (
                          <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="group/rel relative flex flex-col gap-3 cursor-pointer"
                          >
                             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-terracotta/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover/rel:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/rel:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover/rel:translate-y-0 group-hover/rel:opacity-100 transition-all duration-500">
                                   <Button variant="secondary" className="w-full bg-white/90 backdrop-blur-md text-[9px] h-8 rounded-full font-black uppercase tracking-wider text-terracotta hover:bg-white">Aperçu</Button>
                                </div>
                             </div>
                             <div className="px-1">
                                <p className="text-[10px] font-bold text-foreground mb-0.5 truncate">{item.name}</p>
                                <p className="text-[9px] text-terracotta font-medium tracking-tight">{item.price}€</p>
                             </div>
                          </motion.div>
                        ))}
                     </div>
                  </div>

                  <div className="flex justify-center gap-8 pt-4 opacity-60 decoration-terracotta decoration-2 underline-offset-4">
                    <button className="text-[10px] uppercase font-black tracking-widest hover:text-terracotta transition-colors flex items-center gap-2"><Share2 size={12}/> Partager</button>
                    <button className="text-[10px] uppercase font-black tracking-widest hover:text-terracotta transition-colors flex items-center gap-2"><ShieldCheck size={12}/> Authenticité</button>
                  </div>
                </div>
              </div>
        </DialogContent>
      </Dialog>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-[10px] tracking-widest text-terracotta border-terracotta/30 uppercase px-3">{product.category}</Badge>
          <span className="font-heading text-2xl text-terracotta/80">{product.price}€</span>
        </div>
        <h3 className="font-heading text-2xl group-hover:text-terracotta transition-colors mb-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-2 font-sans font-medium tracking-tight">
          <MapPin size={14} className="text-terracotta/60" /> {product.origin}
        </p>
      </div>
    </motion.div>
  );
};

export const FloatingSupport = () => (
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-28 right-8 z-50">
    <Dialog>
      <DialogTrigger render={
        <Button className="h-16 w-16 rounded-full bg-terracotta text-white shadow-2xl p-0 flex items-center justify-center hover:bg-terracotta/90">
          <AlertCircle size={32} />
        </Button>
      } />
      <DialogContent className="sm:max-w-[400px] glass p-8 border-terracotta/20 font-sans">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-terracotta">Conciergerie en Direct</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-terracotta/5 rounded-2xl border border-terracotta/10">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm font-medium">Un expert est disponible pour vous conseiller.</p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-black text-terracotta tracking-widest opacity-60">Sujets fréquents</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-[10px] rounded-xl h-10">Authentification</Button>
              <Button variant="outline" className="text-[10px] rounded-xl h-10">Logistique France</Button>
              <Button variant="outline" className="text-[10px] rounded-xl h-10">Sur Mesure</Button>
              <Button variant="outline" className="text-[10px] rounded-xl h-10">Paiement</Button>
            </div>
          </div>
          <Button className="w-full bg-terracotta rounded-xl h-14 uppercase font-black text-xs tracking-widest">Lancer le chat</Button>
        </div>
      </DialogContent>
    </Dialog>
  </motion.div>
);

export const FloatingWhatsApp = () => (
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-8 right-8 z-50">
    <a href="https://wa.me/22900000000" target="_blank" rel="noopener noreferrer">
      <Button className="h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl p-0 flex items-center justify-center hover:bg-[#128C7E]">
        <MessageCircle size={32} />
      </Button>
    </a>
  </motion.div>
);
