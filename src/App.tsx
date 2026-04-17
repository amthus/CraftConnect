import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArtisanMarketplace from './components/ArtisanMarketplace';
import MarketplacePage from './components/MarketplacePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ForgotPasswordPage, ResetPasswordPage } from './components/AuthRecoveryPages';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
import HistoryPage from './components/HistoryPage';
import { PrivacyPolicy, TermsConditions } from './components/LegalPages';
import ContactPage from './components/ContactPage';
import { CartProvider } from './lib/CartContext';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Toaster } from 'sonner';

import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'client' | 'admin' }) => {
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
            </Routes>
          </ErrorBoundary>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
