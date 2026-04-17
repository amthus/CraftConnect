import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './constants';

interface CartContextType {
  bagItems: Product[];
  addToBag: (product: Product) => void;
  removeFromBag: (id: string) => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  shippingCountry: string;
  setShippingCountry: (country: string) => void;
  totalBagPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [shippingCountry, setShippingCountry] = useState('France');

  const addToBag = (product: Product) => {
    setBagItems(prev => [...prev, product]);
    setIsBagOpen(true);
  };

  const removeFromBag = (id: string) => {
    setBagItems(prev => prev.filter(item => item.id !== id));
  };

  const totalBagPrice = bagItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{
      bagItems,
      addToBag,
      removeFromBag,
      isBagOpen,
      setIsBagOpen,
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
