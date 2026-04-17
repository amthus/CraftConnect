import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtisanMarketplace from './components/ArtisanMarketplace';
import MarketplacePage from './components/MarketplacePage';
import { CartProvider } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="bottom-right" richColors />
        <Router>
          <Routes>
            <Route path="/" element={<ArtisanMarketplace />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
