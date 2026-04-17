import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './constants';
import { toast } from 'sonner';

interface CartContextType {
  bagItems: Product[];
  addToBag: (product: Product) => void;
  removeFromBag: (id: string) => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  shippingCountry: string;
  setShippingCountry: (country: string) => void;
  totalBagPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [shippingCountry, setShippingCountry] = useState('France');

  const addToBag = (product: Product) => {
    if (product.stock === 0) {
      toast.error(`"${product.name}" est malheureusement épuisé.`);
      return;
    }
    setBagItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        toast.info(`"${product.name}" est déjà dans votre panier.`);
        return prev;
      }
      toast.success(`"${product.name}" ajouté au panier !`, {
        description: "L'âme de cet objet vous attend.",
      });
      return [...prev, product];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (id: string) => {
    setBagItems(prev => prev.filter(item => item.id !== id));
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => wishlistItems.some(item => item.id === id);

  const totalBagPrice = bagItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{
      bagItems,
      addToBag,
      removeFromBag,
      isBagOpen,
      setIsBagOpen,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      isWishlistOpen,
      setIsWishlistOpen,
      shippingCountry,
      setShippingCountry,
      totalBagPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
