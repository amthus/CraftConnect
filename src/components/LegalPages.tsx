import React from 'react';
import { Nav, FloatingSupport } from './SharedComponents';
import { motion } from 'motion/react';
import { Shield, FileText, Lock } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <FloatingSupport />
      <header className="pt-32 pb-16 px-4 md:px-12 bg-white border-b border-terracotta/5">
        <div className="max-w-4xl mx-auto space-y-4">
          <Shield className="text-terracotta" size={32} />
          <h1 className="text-4xl font-heading">Politique de Confidentialité</h1>
          <p className="text-sm text-muted-foreground font-serif italic">Dernière mise à jour : 17 Avril 2026</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 md:px-12 py-16 prose prose-terracotta prose-sm">
        <section className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading">1. Collecte des Informations</h2>
            <p className="font-serif leading-relaxed text-muted-foreground">
              Nous collectons les informations que vous nous fournissez directement lors de la création de votre compte, de vos commandes ou de votre inscription à notre newsletter. Cela inclut votre nom, adresse email, adresse de livraison et informations de paiement.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-heading">2. Utilisation des Données</h2>
            <p className="font-serif leading-relaxed text-muted-foreground">
              Vos données sont utilisées exclusivement pour traiter vos transactions, améliorer votre expérience sur notre galerie digitale, et assurer une logistique optimale pour vos trésors béninois.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-heading">3. Protection des Données</h2>
            <p className="font-serif leading-relaxed text-muted-foreground">
              Nous mettons en œuvre des mesures de sécurité de pointe, notamment le cryptage SSL/TLS et des protocoles de stockage sécurisés, pour protéger vos informations personnelles.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-sand/10 font-sans pb-32">
      <Nav />
      <FloatingSupport />
      <header className="pt-32 pb-16 px-4 md:px-12 bg-white border-b border-terracotta/5">
        <div className="max-w-4xl mx-auto space-y-4">
          <FileText className="text-terracotta" size={32} />
          <h1 className="text-4xl font-heading">Conditions Générales</h1>
          <p className="text-sm text-muted-foreground font-serif italic">Conditions d'utilisation de la plateforme Bénin Artisan</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 md:px-12 py-16 prose prose-terracotta prose-sm">
        <section className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading">1. Accord</h2>
            <p className="font-serif leading-relaxed text-muted-foreground">
              En accédant à Bénin Artisan, vous acceptez d'être lié par ces conditions générales d'utilisation. Chaque pièce vendue est garantie authentique et issue d'artisanat local béninois.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-heading">2. Expédition Internationale</h2>
            <p className="font-serif leading-relaxed text-muted-foreground">
              Nous utilisons un système de logistique groupée pour réduire les coûts. Les délais de livraison peuvent varier en fonction du taux de remplissage du conteneur groupé, comme indiqué sur notre widget de logistique.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
