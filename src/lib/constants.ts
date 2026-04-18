import { 
  ShoppingBag, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Search,
  Maximize2,
  Package,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Share2,
  AlertCircle,
  Users,
  PenTool,
  Star,
  Eye
} from 'lucide-react';

export interface Artisan {
  id: string;
  name: string;
  specialty?: string;
  bio: string;
  journey: string;
  location: string;
  techniques: string[];
  image: string;
  works: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  origin: string;
  artisanId: string;
  image: string;
  category: string;
  soulOfObject: string;
  textureLabel: string;
  stock: number;
}

export const ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    name: 'Maman Sènan',
    specialty: 'Céramique Ancestrale',
    bio: "Héritière d'une lignée de potières de Sè, Maman Sènan façonne l'argile depuis son enfance. Sa maîtrise du feu et de la terre est reconnue dans tout le Mono.",
    journey: "Elle a commencé à aider sa grand-mère à l'âge de 6 ans. Aujourd'hui, elle dirige une coopérative qui préserve les techniques traditionnelles tout en innovant dans les formes.",
    location: "Sè, Département du Mono, Sud-Bénin",
    techniques: ["Modelage à la main", "Cuisson à ciel ouvert", "Patinage aux décoctions végétales"],
    image: "https://i.pravatar.cc/150?u=senan",
    works: [
      "https://picsum.photos/seed/p1/400/400",
      "https://picsum.photos/seed/p2/400/400",
      "https://picsum.photos/seed/p3/400/400"
    ]
  },
  {
    id: 'art-2',
    name: 'Atelier Royal dAbomey',
    specialty: 'Tissage Kanvô',
    bio: "Ce collectif d'artisans perpétue le tissage du Kanvô, le tissu des rois. Chaque motif raconte une épopée, chaque fil est un lien avec le passé glorieux du Danhomè.",
    journey: "Établi près du palais royal, l'atelier a survécu aux siècles en adaptant ses textiles sans jamais trahir les symboles royaux originels.",
    location: "Cité Historique dAbomey",
    techniques: ["Tissage sur métier horizontal", "Teinture à l'indigo naturel", "Broderie symbolique"],
    image: "https://i.pravatar.cc/150?u=abomey",
    works: [
      "https://picsum.photos/seed/k1/400/400",
      "https://picsum.photos/seed/k2/400/400",
      "https://picsum.photos/seed/k3/400/400"
    ]
  },
  {
    id: 'art-3',
    name: 'Koffi lAncien',
    specialty: 'Bronzier dArt',
    bio: "Maître bronzier spécialisé dans la technique de la cire perdue. Ses œuvres capturent l'essence spirituelle de Ouidah, entre terre et mer.",
    journey: "Formé par les grands maîtres de la fonderie du quartier des bronziers, Koffi a passé 40 ans à perfectionner l'alliage parfait pour obtenir une patine éternelle.",
    location: "Quartier des Artisans, Ouidah",
    techniques: ["Fonderie à la cire perdue", "Ciselage à froid", "Oxydation contrôlée"],
    image: "https://i.pravatar.cc/150?u=koffi",
    works: [
      "https://picsum.photos/seed/b1/400/400",
      "https://picsum.photos/seed/b2/400/400",
      "https://picsum.photos/seed/b3/400/400"
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Poterie de Sè Ancestrale',
    price: 450,
    origin: 'Sè, Mono',
    artisanId: 'art-1',
    image: 'https://picsum.photos/seed/pottery/800/1000',
    category: 'Céramique',
    soulOfObject: "Modelée avec la terre rouge du Mono, cette pièce porte les empreintes de générations de potières.",
    textureLabel: "Grain de terre cuite",
    stock: 5
  },
  {
    id: '2',
    name: 'Pagne Tissé Kanvô Royal',
    price: 850,
    origin: 'Abomey',
    artisanId: 'art-2',
    image: 'https://picsum.photos/seed/fabric/800/1000',
    category: 'Textile',
    soulOfObject: "Un tissage complexe aux motifs symbolisant la force et la sagesse des rois du Danhomè.",
    textureLabel: "Fibres de coton naturel",
    stock: 0
  },
  {
    id: '3',
    name: 'Statue Bronze dOuidah',
    price: 1200,
    origin: 'Ouidah',
    artisanId: 'art-3',
    image: 'https://picsum.photos/seed/bronze/800/1000',
    category: 'Sculpture',
    soulOfObject: "La cire perdue capturant l'esprit des ancêtres sur la côte des esclaves.",
    textureLabel: "Patine de bronze",
    stock: 2
  },
  {
    id: '4',
    name: 'Table Basse Iroko Sculptée',
    price: 2400,
    origin: 'Porto-Novo',
    artisanId: 'art-3',
    image: 'https://picsum.photos/seed/wood/800/1000',
    category: 'Mobilier',
    soulOfObject: "Taillée dans une pièce unique dIroko centenaire, représentant les liens familiaux.",
    textureLabel: "Bois massif nervuré",
    stock: 1
  },
  {
    id: '5',
    name: 'Collier Perles de Bohicon',
    price: 320,
    origin: 'Bohicon',
    artisanId: 'art-1',
    image: 'https://picsum.photos/seed/jewelry/800/1000',
    category: 'Joaillerie',
    soulOfObject: "Enfilage de perles de verre anciennes et pierres semi-précieuses du Nord Bénin.",
    textureLabel: "Éclats de verre poli",
    stock: 0
  },
  {
    id: '6',
    name: 'Masque Gèlèdé Sacré',
    price: 1800,
    origin: 'Kétou',
    artisanId: 'art-3',
    image: 'https://picsum.photos/seed/mask/800/1000',
    category: 'Sculpture',
    soulOfObject: "Masque cérémoniel honorant les mères ancestrales, sculpté dans le bois de fromager.",
    textureLabel: "Peinture naturelle mate",
    stock: 3
  }
];

export const CATEGORIES = ['Tous', 'Céramique', 'Textile', 'Sculpture', 'Mobilier', 'Joaillerie'];

export const COUNTRIES = [
  { name: 'France', shipping: 25, duties: 0.2 },
  { name: 'Suisse', shipping: 35, duties: 0.15 },
  { name: 'USA', shipping: 60, duties: 0.25 },
  { name: 'Bénin', shipping: 10, duties: 0 },
];
