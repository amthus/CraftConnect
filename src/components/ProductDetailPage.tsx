import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Share2, 
  ShieldCheck, 
  Eye, 
  ArrowLeft 
} from 'lucide-react';
import { Nav, CartSidebar, WishlistSidebar, FloatingSupport, TextureVisualizer } from './SharedComponents';
import { PRODUCTS, ARTISANS } from '../lib/constants';
import { useCart } from '../lib/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToBag, addToWishlist, isInWishlist } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-sand/10">
        <div className="text-center space-y-4">
          <p className="text-2xl font-heading">Produit non trouvé</p>
          <Button onClick={() => navigate('/marketplace')} className="bg-terracotta text-white rounded-full">
            Retour à la galerie
          </Button>
        </div>
      </div>
    );
  }

  const artisan = ARTISANS.find(a => a.id === product.artisanId) || ARTISANS[0];
  const itemInWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <CartSidebar />
      <WishlistSidebar />
      <FloatingSupport />

      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 md:px-12 pt-32 pb-6">
        <ol className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest opacity-40">
          <li>
            <Link to="/" className="hover:text-terracotta transition-colors">Accueil</Link>
          </li>
          <li><ChevronRight size={10} /></li>
          <li>
            <Link to="/marketplace" className="hover:text-terracotta transition-colors">Galerie</Link>
          </li>
          <li><ChevronRight size={10} /></li>
          <li className="text-terracotta truncate max-w-[150px]">{product.name}</li>
        </ol>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-terracotta/10 bg-white"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-8 left-8">
            <Badge className="bg-white/90 backdrop-blur-md text-terracotta px-4 py-1.5 uppercase text-xs tracking-widest border border-terracotta/10 shadow-lg">{product.category}</Badge>
          </div>
        </motion.div>

        {/* Right Column: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col space-y-12"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-heading leading-tight">{product.name}</h1>
                <p className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold">
                  <MapPin size={16} className="text-terracotta" /> {product.origin}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => addToWishlist(product)}
                className={`h-14 w-14 rounded-full shrink-0 border border-terracotta/10 ${itemInWishlist ? 'text-terracotta bg-terracotta/10' : 'hover:bg-terracotta/5'}`}
              >
                <Heart size={28} fill={itemInWishlist ? "currentColor" : "none"} />
              </Button>
            </div>

            <div className="pt-6 border-t border-terracotta/10">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-heading text-terracotta">{product.price}€</span>
                <span className="text-xs uppercase font-black opacity-40 tracking-widest">TVA et frais douaniers estimés suivant destination</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">L'Âme de l'Objet</p>
            <div className="relative">
              <p className="font-serif italic text-2xl leading-relaxed text-foreground border-l-4 border-terracotta/20 pl-8">
                "{product.soulOfObject}"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Détails de Texture</p>
            <TextureVisualizer image={product.image} label={product.textureLabel} />
          </div>

          <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-terracotta/10 shadow-xl shadow-terracotta/5">
            <Avatar className="h-16 w-16 border-2 border-terracotta/20 shadow-inner">
              <AvatarImage src={artisan.image} />
              <AvatarFallback>{artisan.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-black opacity-40 tracking-wider mb-1">Maître Artisan</p>
              <p className="font-bold text-xl">{artisan.name}</p>
              <p className="text-sm text-muted-foreground font-serif italic">{artisan.location}</p>
            </div>
            <Link to={`/artisans`}>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-terracotta/5"><ChevronRight size={20}/></Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button 
              onClick={() => addToBag(product)} 
              disabled={product.stock === 0}
              className={`flex-1 rounded-full h-16 text-sm uppercase font-black tracking-[0.15em] shadow-2xl transition-all active:scale-95 ${
                product.stock === 0 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-terracotta hover:bg-terracotta/90 text-white shadow-terracotta/30'
              }`}
            >
              {product.stock === 0 ? 'Hélas, Vendu' : 'Ajouter au Panier'}
            </Button>
            <div className="flex gap-2">
               <Button variant="outline" size="icon" className="h-16 w-16 rounded-full border-terracotta/20 hover:bg-terracotta/5">
                  <Share2 size={20} />
               </Button>
               <Button variant="outline" size="icon" className="h-16 w-16 rounded-full border-terracotta/20 hover:bg-terracotta/5">
                  <ShieldCheck size={20} />
               </Button>
            </div>
          </div>

          <div className="pt-12">
            <div className="flex items-center justify-between mb-8">
                <p className="text-sm uppercase font-black text-terracotta tracking-[0.3em] opacity-60">Inspirations liées</p>
                <Link to="/marketplace" className="text-xs uppercase font-bold text-muted-foreground hover:text-terracotta transition-colors">Tout voir</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {PRODUCTS.filter(item => item.id !== product.id && (item.category === product.category || item.artisanId === product.artisanId)).slice(0, 3).map((item, idx) => (
                  <Link 
                    to={`/product/${item.id}`}
                    key={item.id} 
                    className="group/rel relative flex flex-col gap-3 p-3 bg-white rounded-2xl border border-transparent hover:border-terracotta/10 transition-all shadow-sm hover:shadow-lg"
                  >
                     <div className="relative aspect-square rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/rel:scale-110" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/rel:opacity-100 transition-opacity" />
                     </div>
                     <div className="px-1 py-1">
                        <p className="text-xs font-bold text-foreground mb-1 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-terracotta font-black tracking-tight">{item.price}€</p>
                     </div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
