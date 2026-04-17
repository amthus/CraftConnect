import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X } from 'lucide-react';
import { Nav, ProductCard, CartSidebar, FloatingWhatsApp } from './SharedComponents';
import { PRODUCTS, CATEGORIES } from '../lib/constants';
import { Button } from '@/components/ui/button';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-sand/30 font-sans pb-32">
      <Nav />
      <CartSidebar />
      <FloatingWhatsApp />

      <header className="pt-40 pb-20 px-4 md:px-16 bg-white border-b border-terracotta/5">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading mb-8"
          >
            La Galerie <span className="text-terracotta">Complète</span>
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-terracotta/40" size={20} />
              <input 
                type="text"
                placeholder="Chercher une pièce, un artisan, une ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-sand/50 border-none rounded-2xl focus:ring-2 focus:ring-terracotta shadow-inner text-sm"
              />
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-16 py-20">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <Search className="mx-auto text-terracotta/10 mb-8" size={80} />
            <h2 className="text-3xl font-heading mb-4">Aucune pièce trouvée</h2>
            <p className="text-muted-foreground font-serif italic mb-8">Votre quête n'a pas encore porté ses fruits. Essayez d'autres termes.</p>
            <Button onClick={() => {setSearchQuery(''); setSelectedCategory('Tous');}} className="bg-terracotta text-white rounded-full px-10 h-12 uppercase font-black text-xs">Réinitialiser les filtres</Button>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-16 pt-32 pb-16 border-t border-terracotta/10 text-center">
        <div className="mb-12">
          <div className="text-2xl font-heading tracking-tight text-terracotta mb-4">
            <span className="font-black">BÉNIN</span>
            <span className="font-light text-foreground">ARTISAN</span>
          </div>
          <p className="text-muted-foreground font-serif italic max-w-md mx-auto">Emportez une part de l'âme du Bénin avec vous. Chaque achat soutient directement l'économie locale et la préservation culturelle.</p>
        </div>
        <div className="flex justify-center gap-8 text-[10px] uppercase font-black tracking-widest opacity-40">
          <a href="#" className="hover:text-terracotta transition-colors">Politique de Confidentialité</a>
          <a href="#" className="hover:text-terracotta transition-colors">Conditions Générales</a>
          <a href="#" className="hover:text-terracotta transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
