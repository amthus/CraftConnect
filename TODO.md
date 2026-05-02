# Road-map : THUS ARTISAN Marketplace 🇧🇯

Voici la liste des tâches restantes pour passer d'un prototype à une application de production complète.

## 1. Persistance des Données (Backend)
- [ ] **Initialisation Firebase/Firestore :** Déplacer les constantes `PRODUCTS` et `ARTISANS` vers une base de données NoSQL.
- [ ] **Authentification Réelle :** Remplacer les appels mockés (`/api/auth/...`) par Firebase Authentication (Google Login & Email).
- [ ] **Profils Utilisateurs :** Stocker le numéro de téléphone et les préférences (wishlist) en base de données plutôt qu'en local context.

## 2. Cycle de Vente & Paiement
- [ ] **Intégration Stripe :** Implémenter le tunnel de paiement réel pour les commandes.
- [ ] **Gestion des Commandes :** Créer une collection `orders` pour suivre l'état de livraison (En préparation, Expédié, Livré).
- [ ] **Certificats d'Authenticité :** Génération automatique de PDF pour chaque pièce unique achetée.

## 3. Interfaces & Dashboards
- [x] **Structure Unifiée :** Création du `DashboardLayout` avec sidebar haute-précision et navigation millimétrique (Admin, Client, Artisan).
- [x] **Dashboard Admin :** Interface complète avec onglets Overview, Stock, et Stats visuelles.
- [x] **Dashboard Client :** Espace personnel avec historique d'acquisition, wishlist et accès conciergerie.
- [x] **Dashboard Artisan :** Console de gestion de stock et suivi des performances de vente.
- [ ] **Gestion des Stocks (Logique) :** Connecter l'interface CRUD aux appels Firestore réels.
- [ ] **Téléchargement d'Images :** Intégration de Firebase Storage pour l'upload des photos de produits et portraits d'artisans.
- [ ] **Tableau de Bord Réel :** Connecter les graphiques de l'admin aux données réelles de vente.

## 4. Expérience Client (UX/UI)
- [ ] **Recherche Avancée :** Implémenter une recherche textuelle via Firestore (ou Algolia pour plus de performance).
- [ ] **Notifications :** Emails de confirmation de commande et alertes de stock pour les pièces uniques.
- [ ] **Support en Direct :** Remplacer le chat Gemini par une véritable interface de support (ou chat hybride AI/Humain).

## 5. Optimisations Techniques
- [ ] **SEO & Partage :** Optimiser les méta-tags pour le partage des produits sur les réseaux sociaux.
- [ ] **Multi-devises :** Ajouter le support du FCFA et du Dollar en plus de l'Euro.
- [ ] **Performance :** Lazy loading des images haute résolution pour les connexions mobiles lentes.

---
*Note : Pour commencer la phase de persistances des données, l'outil `set_up_firebase` doit être activé.*
