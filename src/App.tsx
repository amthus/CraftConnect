import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArtisanMarketplace from './components/ArtisanMarketplace';
import MarketplacePage from './components/MarketplacePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ForgotPasswordPage, ResetPasswordPage } from './components/AuthRecoveryPages';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
import ArtisanDashboard from './components/ArtisanDashboard';
import HistoryPage from './components/HistoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import ArtisansPage from './components/ArtisansPage';
import CustomOrderPage from './components/CustomOrderPage';
import { PrivacyPolicy, TermsConditions } from './components/LegalPages';
import ContactPage from './components/ContactPage';
import ProfilePage from './components/ProfilePage';
import { CartProvider } from './lib/CartContext';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Toaster } from 'sonner';

import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'client' | 'admin' | 'artisan' }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-center" richColors />
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<ArtisanMarketplace />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/artisans" element={<ArtisansPage />} />
              <Route path="/custom-order" element={<CustomOrderPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute role="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/artisan" 
                element={
                  <ProtectedRoute role="artisan">
                    <ArtisanDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
