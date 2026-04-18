import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ArrowUpRight } from 'lucide-react';
import { Nav, ProductCard, CartSidebar, WishlistSidebar, FloatingSupport } from './SharedComponents';
import { PRODUCTS, CATEGORIES, ARTISANS } from '../lib/constants';
import { Button } from '@/components/ui/button';

export default function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedArtisan, setSelectedArtisan] = useState('Tous');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const artisanId = searchParams.get('artisan');
    if (artisanId) {
      setSelectedArtisan(artisanId);
    }
  }, [searchParams]);

  const popularSearches = ["Masques Guèlèdè", "Tissus Kanvô", "Abomey", "Bronzes", "Décoration"];

  const suggestions = searchQuery.length > 0 ? [
    ...CATEGORIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()) && c !== 'Tous'),
    ...PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => p.name),
    ...ARTISANS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(a => a.name)
  ].slice(0, 6) : popularSearches;

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    const matchesArtisan = selectedArtisan === 'Tous' || p.artisanId === selectedArtisan;
    return matchesSearch && matchesCategory && matchesArtisan;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-sand/30 font-sans pb-32">
      <Nav />
      <CartSidebar />
      <WishlistSidebar />
      <FloatingSupport />

      <header className="pt-32 pb-16 px-4 md:px-12 bg-white border-b border-terracotta/5">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading mb-6"
          >
            La Galerie <span className="text-terracotta">Complète</span>
          </motion.h1>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end justify-between">
              <div className="w-full md:w-1/2 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40 group-focus-within:text-terracotta transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="Chercher une pièce, un artisan, une ville..."
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-sand/50 border-none rounded-xl focus:ring-2 focus:ring-terracotta shadow-inner text-sm transition-all"
                />
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-terracotta/10 shadow-2xl z-50 overflow-hidden"
                    >
                      {searchQuery.length === 0 && (
                        <div className="px-6 py-3 bg-terracotta/5 border-b border-terracotta/10">
                          <p className="text-[10px] uppercase font-black tracking-widest text-terracotta opacity-60">Recherches Populaires</p>
                        </div>
                      )}
                      {suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => { setSearchQuery(s); setShowSuggestions(false); }}
                          className="w-full text-left px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-terracotta hover:text-white transition-all border-b border-terracotta/5 last:border-none flex justify-between items-center group"
                        >
                          {s}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 h-10 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      selectedCategory === cat 
                      ? 'bg-terracotta text-white shadow-lg' 
                      : 'bg-white text-muted-foreground hover:bg-terracotta/5 border border-terracotta/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-terracotta/5">
              <div className="flex items-center gap-3">
                <Filter size={16} className="text-terracotta" />
                <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Filtres Avancés</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <select 
                  value={selectedArtisan} 
                  onChange={(e) => setSelectedArtisan(e.target.value)}
                  className="bg-white border border-terracotta/10 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-terracotta"
                >
                  <option value="Tous">Tous les Artisans</option>
                  {ARTISANS.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>

                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-terracotta/10 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-terracotta"
                >
                  <option value="default">Tri par défaut</option>
                  <option value="price-asc">Prix: Croissant</option>
                  <option value="price-desc">Prix: Décroissant</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <Search className="mx-auto text-terracotta/10 mb-6" size={60} />
            <h2 className="text-2xl md:text-3xl font-heading mb-3">Aucune pièce trouvée</h2>
            <p className="text-muted-foreground font-serif italic mb-6">Votre quête n'a pas encore porté ses fruits. Essayez d'autres termes.</p>
            <Button onClick={() => {setSearchQuery(''); setSelectedCategory('Tous'); setSelectedArtisan('Tous'); setSortBy('default');}} className="bg-terracotta text-white rounded-full px-10 h-12 uppercase font-black text-[10px] tracking-widest active:scale-95 transition-all">Réinitialiser les filtres</Button>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-12 pt-24 pb-16 border-t border-terracotta/10 text-center">
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
