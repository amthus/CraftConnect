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
  Instagram,
  Scroll,
  LogIn,
  Loader2,
  Send,
  Sparkles
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
import { chatWithConcierge } from '../services/geminiService';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 flex justify-between items-center transition-all duration-500 ${
        isScrolled 
          ? 'glass shadow-xl bg-white/80 py-3' 
          : 'bg-white/10 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none py-5 md:py-8'
      }`}>
        <Link to="/" className="text-lg md:text-xl font-heading tracking-tight text-terracotta flex items-center gap-2 cursor-pointer">
          <span className="font-black">BÉNIN</span>
          <span className="font-light text-foreground">ARTISAN</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-5 lg:gap-7 text-[10px] uppercase tracking-[0.2em] font-bold">
          <Link to="/marketplace" className="hover:text-terracotta transition-colors flex items-center gap-1.5">
            <Maximize2 size={12} /> La Galerie
          </Link>
          <Link to="/#artisans" className="hover:text-terracotta transition-colors flex items-center gap-1.5">
            <Users size={12} /> Nos Artisans
          </Link>
          <Link to="/#sur-mesure" className="hover:text-terracotta transition-colors flex items-center gap-1.5">
            <Zap size={12} /> Sur Mesure
          </Link>
          
          {user && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsWishlistOpen(true)}
                className="relative group/wish h-9 w-9"
              >
                <Heart size={18} className={wishlistItems.length > 0 ? 'text-terracotta fill-terracotta' : 'group-hover/wish:text-terracotta transition-colors'} />
                <AnimatePresence>
                  {wishlistItems.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-terracotta text-white rounded-full text-[9px] flex items-center justify-center font-bold"
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
                className="relative group/bag h-9 w-9"
              >
                <ShoppingBag size={18} className="group-hover/bag:text-terracotta transition-colors" />
                <AnimatePresence>
                  {bagItems.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-terracotta text-white rounded-full text-[9px] flex items-center justify-center font-bold"
                    >
                      {bagItems.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          )}
   
          <Link 
            to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} 
            className="flex items-center gap-2 pl-4 border-l border-terracotta/10 group cursor-pointer"
          >
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold leading-none group-hover:text-terracotta transition-colors">{user.name}</p>
              </div>
            )}
            <Avatar className="h-8 w-8 border-2 border-terracotta/20 shadow-inner hover:border-terracotta transition-colors">
              {user?.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback className="bg-sand text-terracotta text-[9px] font-black group-hover:bg-terracotta group-hover:text-white transition-colors">
                {user ? getInitials(user.name) : <Users size={12} />}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 -mr-2 text-foreground hover:text-terracotta transition-colors flex items-center justify-center"
          aria-label="Menu"
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
              className="fixed top-0 left-0 bottom-0 z-[200] w-[85%] max-w-sm bg-white flex flex-col p-8 md:p-12 overflow-y-auto shadow-2xl"
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
                <Link to="/history" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading flex items-center gap-4 hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4">
                  <Scroll size={24} /> Notre Histoire
                </Link>
                {user && (
                  <>
                    <button onClick={() => { setIsMenuOpen(false); setIsWishlistOpen(true); }} className="text-2xl font-heading flex items-center justify-between hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4 text-left w-full">
                      <div className="flex items-center gap-4"><Heart size={24} /> Ma Wishlist</div>
                      {wishlistItems.length > 0 && <Badge className="bg-terracotta text-white">{wishlistItems.length}</Badge>}
                    </button>
                    <button onClick={() => { setIsMenuOpen(false); setIsBagOpen(true); }} className="text-2xl font-heading flex items-center justify-between hover:text-terracotta transition-colors border-b border-terracotta/10 pb-4 text-left w-full">
                      <div className="flex items-center gap-4"><ShoppingBag size={24} /> Mon Panier</div>
                      {bagItems.length > 0 && <Badge className="bg-terracotta text-white">{bagItems.length}</Badge>}
                    </button>
                  </>
                )}
              </div>

              <div className="mt-auto pt-10">
                <Link 
                  to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-between p-6 bg-sand/50 rounded-3xl border border-terracotta/10 group active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-terracotta/20">
                      {user?.avatar && <AvatarImage src={user.avatar} />}
                      <AvatarFallback className="bg-terracotta text-white font-black">
                        {user ? getInitials(user.name) : <LogIn size={20} />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">
                        {user ? 'Mon Espace' : 'Bienvenue'}
                      </p>
                      <p className={`${user ? 'text-lg' : 'text-sm'} font-heading tracking-tight text-foreground`}>
                        {user ? user.name : "S'identifier"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-terracotta group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
      className="group relative flex flex-col p-3 md:p-4 bg-white/40 glass rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-terracotta/5 border border-transparent hover:border-terracotta/10"
    >
      <div className="relative w-full aspect-[3/4] mb-4 md:mb-6">
        <Dialog>
          <DialogTrigger 
            nativeButton={true}
            render={<button className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl border border-terracotta/5 cursor-pointer group/card focus:outline-none" />}
          >
            <div 
              className="w-full h-full relative"
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
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-terracotta text-[8px] md:text-[9px] px-2 py-0.5 uppercase tracking-widest border border-terracotta/10">{product.category}</Badge>
              </div>
              {product.stock === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-xl px-6 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[11px] uppercase font-black tracking-[0.25em] text-white border border-terracotta/30 shadow-lg">
                    <span className="flex items-center gap-2">
                      <X size={12} className="text-terracotta" />
                      Indisponible
                    </span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                  <div className="glass px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-[0.2em] text-white">Consulter</div>
                </div>
              )}
            </div>
          </DialogTrigger>

          <DialogContent className="w-[95vw] sm:max-w-[900px] glass p-0 overflow-hidden border-terracotta/20 font-sans max-h-[95vh] sm:max-h-[90vh]">
            <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                <div className="md:w-1/2 aspect-[4/3] md:aspect-auto relative bg-sand/20 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <Badge className="bg-white/80 backdrop-blur-md text-terracotta px-3 py-0.5 md:px-4 md:py-1 uppercase text-[10px] md:text-xs tracking-widest">{product.category}</Badge>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-12 space-y-6 md:space-y-8 overflow-y-auto">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl md:text-5xl font-heading leading-tight">{product.name}</h2>
                      <p className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-2 uppercase tracking-[0.2em] font-bold">
                        <MapPin size={12} className="text-terracotta" /> {product.origin}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => addToWishlist(product)}
                      className={`h-10 w-10 md:h-12 md:w-12 rounded-full shrink-0 ${itemInWishlist ? 'text-terracotta bg-terracotta/10' : 'hover:bg-terracotta/5'}`}
                    >
                      <Heart size={20} className="md:w-7 md:h-7" fill={itemInWishlist ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-[9px] md:text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">L'Âme de l'Objet</p>
                    <p className="font-serif italic text-base md:text-xl leading-relaxed text-muted-foreground border-l-2 border-terracotta/20 pl-4 md:pl-6">"{product.soulOfObject}"</p>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <p className="text-[9px] md:text-[10px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Détails de Texture</p>
                    <TextureVisualizer image={product.image} label={product.textureLabel} />
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 glass border border-terracotta/10 rounded-2xl">
                    <Avatar className="h-10 w-10 md:h-14 md:w-14 border border-terracotta/20 shadow-inner">
                      <AvatarImage src={artisan.image} />
                      <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-[8px] md:text-[9px] uppercase font-black opacity-40 tracking-wider">Maître Artisan</p>
                      <p className="font-bold text-sm md:text-lg">{artisan.name}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground font-serif italic">{artisan.location}</p>
                    </div>
                    <Link to={`/#artisans`}>
                       <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full"><ChevronRight size={16}/></Button>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 md:gap-6 pt-4 border-t border-terracotta/10">
                    <div className="text-center sm:text-left space-y-0.5">
                      <p className="text-[8px] md:text-[10px] uppercase font-black opacity-40">Prix d'acquisition</p>
                      <span className="text-2xl md:text-4xl font-heading text-terracotta">{product.price}€</span>
                    </div>
                    <Button 
                      onClick={() => addToBag(product)} 
                      disabled={product.stock === 0}
                      className={`w-full sm:flex-1 rounded-full h-12 md:h-16 text-xs uppercase font-black tracking-widest shadow-xl transition-all active:scale-95 ${
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
                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {PRODUCTS.filter(item => item.id !== product.id && (item.category === product.category || item.artisanId === product.artisanId)).slice(0, 3).map((item, idx) => (
                          <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            className="group/rel relative flex flex-col gap-2 cursor-pointer bg-sand/20 rounded-2xl p-2 border border-transparent hover:border-terracotta/10 hover:bg-white transition-all shadow-sm hover:shadow-md"
                          >
                             <div className="relative aspect-square rounded-xl overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/rel:scale-110" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/rel:opacity-100 transition-opacity" />
                                <div className="absolute top-2 right-2 flex gap-1 translate-x-4 opacity-0 group-hover/rel:translate-x-0 group-hover/rel:opacity-100 transition-all">
                                   <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                      <Eye size={12} className="text-terracotta" />
                                   </div>
                                </div>
                             </div>
                             <div className="px-1 py-1">
                                <p className="text-[9px] font-bold text-foreground mb-0.5 line-clamp-1">{item.name}</p>
                                <div className="flex justify-between items-center">
                                   <p className="text-[9px] text-terracotta font-black tracking-tight">{item.price}€</p>
                                   <Badge variant="ghost" className="h-3 text-[7px] px-1 uppercase opacity-40">{item.origin.split(',')[0]}</Badge>
                                </div>
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

        {/* Action Overlay Buttons */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-10 md:translate-x-12 opacity-100 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-500">
           <Button 
            onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
            size="icon" 
            className={`rounded-full h-8 w-8 md:h-10 md:w-10 shadow-xl transition-all ${itemInWishlist ? 'bg-terracotta text-white' : 'bg-white/90 backdrop-blur-md text-terracotta hover:bg-terracotta hover:text-white'}`}
          >
            <Heart size={16} className="md:w-[18px] md:h-[18px]" fill={itemInWishlist ? "currentColor" : "none"} />
          </Button>

          <Button 
            onClick={(e) => { e.stopPropagation(); if (product.stock > 0) addToBag(product); }}
            size="icon" 
            disabled={product.stock === 0}
            className={`rounded-full h-8 w-8 md:h-10 md:w-10 shadow-xl ${product.stock === 0 ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' : 'bg-white/90 backdrop-blur-md text-terracotta hover:bg-terracotta hover:text-white'}`}
          >
            <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
          </Button>

          <Dialog>
            <DialogTrigger 
              nativeButton={true}
              render={
                <button className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 backdrop-blur-md text-terracotta hover:bg-terracotta hover:text-white shadow-xl flex items-center justify-center transition-all focus:outline-none">
                  <Share2 size={18} />
                </button>
              }
            />
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
      </div>
      
      <div className="mt-2 text-left">
        <div className="flex justify-between items-center mb-1">
          <Badge variant="outline" className="text-[7px] md:text-[9px] tracking-widest text-terracotta border-terracotta/30 uppercase px-2 py-0.5">{product.category}</Badge>
          <span className="font-heading text-lg md:text-xl text-terracotta/80">{product.price}€</span>
        </div>
        <h3 className="font-heading text-lg md:text-xl group-hover:text-terracotta transition-colors mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-[10px] md:text-[11px] text-muted-foreground flex items-center gap-1.5 font-sans font-medium tracking-tight">
          <MapPin size={10} className="text-terracotta/60" /> {product.origin}
        </p>
      </div>
    </motion.div>
  );
};

export const FloatingSupport = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Bienvenue dans notre galerie d'exception. Je suis votre concierge dédiée. Comment puis-je vous accompagner aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithConcierge(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger 
          nativeButton={true}
          render={
            <button className="h-14 w-14 rounded-full bg-terracotta text-white shadow-xl flex items-center justify-center hover:bg-terracotta/90 focus:outline-none transition-all active:scale-90 group relative">
              <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
        } />
        <DialogContent className="sm:max-w-[420px] glass p-0 border-terracotta/20 font-sans h-[600px] flex flex-col overflow-hidden">
          <DialogHeader className="p-6 border-b border-terracotta/10 bg-terracotta/5">
            <DialogTitle className="text-xl font-heading text-terracotta flex items-center gap-3">
              <Sparkles className="text-terracotta animate-pulse" size={20} />
              Conciergerie en Direct
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-terracotta text-white rounded-tr-none' 
                  : 'bg-white text-foreground border border-terracotta/10 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-terracotta/10 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="animate-spin text-terracotta" size={12} />
                  <span className="text-[10px] text-muted-foreground">La Concierge prépare sa réponse...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-terracotta/10 bg-sand/20 space-y-4">
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2">
                {['Authentification', 'Sur Mesure', 'Logistique'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => handleQuickAction(tag)}
                    className="text-[9px] px-3 py-1 bg-white hover:bg-terracotta hover:text-white border border-terracotta/10 rounded-full transition-all text-muted-foreground"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question à notre expert..."
                className="flex-1 bg-white border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-terracotta outline-none shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="h-10 w-10 rounded-xl bg-terracotta text-white flex items-center justify-center hover:bg-terracotta/90 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] bg-terracotta/10 flex-1" />
              <p className="text-[8px] uppercase tracking-widest text-muted-foreground opacity-60">ou</p>
              <div className="h-[1px] bg-terracotta/10 flex-1" />
            </div>

            <a href="https://wa.me/22900000000" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl h-10 uppercase font-black text-[9px] tracking-widest active:scale-95 transition-all shadow-md flex items-center justify-center gap-2">
                <MessageCircle size={16} />
                WhatsApp Direct
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
