import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtisanMarketplace from './components/ArtisanMarketplace';
import MarketplacePage from './components/MarketplacePage';
import { CartProvider } from './lib/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ArtisanMarketplace />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
