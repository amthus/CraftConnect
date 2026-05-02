import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import DashboardLayout from './DashboardLayout';
import { MCard, MStatCard, MTableHead, MTableCell, MBadge } from './ui/millimeter';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  collection, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  setDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import { PRODUCTS, ARTISANS } from '../lib/constants';

const chartData = [
  { name: 'Lun', sales: 1200, orders: 12 },
  { name: 'Mar', sales: 2100, orders: 18 },
  { name: 'Mer', sales: 1800, orders: 15 },
  { name: 'Jeu', sales: 3400, orders: 24 },
  { name: 'Ven', sales: 2800, orders: 20 },
  { name: 'Sam', sales: 4200, orders: 32 },
  { name: 'Dim', sales: 3800, orders: 28 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'artisans' | 'orders' | 'users'>('overview');
  
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const [localArtisans, setLocalArtisans] = useState<any[]>([]);
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [localUsers, setLocalUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddArtisanOpen, setIsAddArtisanOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingArtisan, setEditingArtisan] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [viewingOrder, setViewingOrder] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    // Real-time synchronization with Firestore
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setLocalUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setLocalProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubArtisans = onSnapshot(collection(db, 'artisans'), (snapshot) => {
      setLocalArtisans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubRequests = onSnapshot(collection(db, 'requests'), (snapshot) => {
      setLocalOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    setIsLoading(false);

    return () => {
      unsubUsers();
      unsubProducts();
      unsubArtisans();
      unsubRequests();
    };
  }, [user]);

  const handleDeleteOrder = async (id: string) => {
    if(confirm("Supprimer cet historique ?")) {
      try {
        await deleteDoc(doc(db, 'requests', id));
        toast.success("Commande supprimée de la vue");
      } catch (error) {
        toast.error("Erreur de suppression");
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if(confirm("Révoquer l'accès de cet utilisateur ?")) {
      try {
        await deleteDoc(doc(db, 'users', id));
        toast.success("Utilisateur supprimé");
      } catch (error) {
        toast.error("Échec de la suppression");
      }
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      toast.success("Rôle mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, 'products'), {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        origin: "Bénin",
        image: "https://picsum.photos/seed/new/400/400",
        artisanId: "art-1",
        soulOfObject: formData.get('description') as string,
        textureLabel: "Standard",
        createdAt: serverTimestamp()
      });
      toast.success("Pièce ajoutée au catalogue");
      setIsAddProductOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création");
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await updateDoc(doc(db, 'products', editingProduct.id), {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        soulOfObject: formData.get('description') as string,
        updatedAt: serverTimestamp()
      });
      toast.success("Fiche produit mise à jour");
      setEditingProduct(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleCreateArtisan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image') as File;
    let imageUrl = "https://i.pravatar.cc/150?u=fallback";

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await handleUploadImage(imageFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    try {
      await addDoc(collection(db, 'artisans'), {
        name: formData.get('name') as string,
        specialty: formData.get('specialty') as string,
        bio: formData.get('bio') as string,
        journey: "Nouveau membre du réseau",
        location: "Bénin",
        techniques: [],
        image: imageUrl,
        works: [],
        createdAt: serverTimestamp()
      });
      toast.success("Artisan recruté avec succès");
      setIsAddArtisanOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création");
    }
  };

  const handleUpdateArtisan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image') as File;
    let imageUrl = editingArtisan.image;

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await handleUploadImage(imageFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    try {
      await updateDoc(doc(db, 'artisans', editingArtisan.id), {
        name: formData.get('name') as string,
        specialty: formData.get('specialty') as string,
        bio: formData.get('bio') as string,
        image: imageUrl,
        updatedAt: serverTimestamp()
      });
      toast.success("Profil artisan mis à jour");
      setEditingArtisan(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error("La création d'utilisateur manuel est désactivée. Utilisez l'invitation.");
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await updateDoc(doc(db, 'users', editingUser.id), {
        name: formData.get('name') as string,
        role: formData.get('role') as any,
        status: formData.get('status') as string,
        updatedAt: serverTimestamp()
      });
      toast.success("Permissions utilisateur modifiées");
      setEditingUser(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if(confirm("Supprimer ce produit ?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        toast.success("Produit supprimé avec succès");
      } catch (error) {
        toast.error("Échec de la suppression");
      }
    }
  };

  const handleDeleteArtisan = async (id: string) => {
    if(confirm("Supprimer cet artisan ?")) {
      try {
        await deleteDoc(doc(db, 'artisans', id));
        toast.success("Artisan retiré du réseau");
      } catch (error) {
        toast.error("Échec de la suppression");
      }
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!file) return null;
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `artisans/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setUploadingImage(false);
      return url;
    } catch (error) {
      console.error("Storage Error:", error);
      toast.error("Échec du téléchargement de l'image");
      setUploadingImage(false);
      return null;
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const stats = [
    { label: "CA Mensuel", value: "24,800€", trend: "+12.5%", icon: <TrendingUp />, color: "bg-emerald-500" },
    { label: "Nouveaux Artisans", value: "12", trend: "+2", icon: <Users />, color: "bg-amber-500" },
    { label: "Ventes Totales", value: "342", trend: "+14%", icon: <ShoppingBag />, color: "bg-terracotta" },
    { label: "Stock Alerte", value: "5", trend: "-2", icon: <Package />, color: "bg-red-500" }
  ];

  const renderOverview = () => (
    <div className="space-y-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <MStatCard 
            key={i}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={React.cloneElement(stat.icon as React.ReactElement<any>, { size: 20 })}
            color={stat.color}
            delay={i * 0.05}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MCard className="p-8 group">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-heading tracking-tight text-foreground/90 font-medium">Performance Commerciale</h3>
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/30 mt-1">Revenus vs Objectifs (7 derniers jours)</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B76E4A" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#B76E4A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid rgba(183,110,74,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#B76E4A" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" dot={{ r: 3, fill: '#B76E4A', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MCard>

        <MCard className="p-8 group">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-heading tracking-tight text-foreground/90 font-medium">Volume des Commandes</h3>
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/30 mt-1">Fréquence d'achat quotidienne</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'monospace' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(183,110,74,0.02)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid rgba(183,110,74,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                />
                <Bar dataKey="orders" fill="#B76E4A" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </MCard>
      </div>

      {/* Recent Activity Table */}
      <MCard className="overflow-hidden">
        <div className="px-8 py-6 border-b border-terracotta/5 flex justify-between items-center bg-sand/5">
          <div className="flex flex-col">
            <h3 className="text-lg font-heading tracking-tight font-medium">Commandes Récentes</h3>
            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20">Derniers flux de vente</p>
          </div>
          <Button variant="ghost" className="text-[9px] font-mono font-bold uppercase tracking-widest text-terracotta hover:bg-terracotta/5">Exporter Liste</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/10">
                <MTableHead>Produit</MTableHead>
                <MTableHead>Client</MTableHead>
                <MTableHead>Statut</MTableHead>
                <MTableHead>Montant</MTableHead>
                <th className="px-8 border-b border-terracotta/5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-terracotta/5">
              {[
                { id: 1, name: "Vase d'Abomey", client: "Sophie L.", status: "Expédié", price: 290, statusType: 'warning' as const },
                { id: 2, name: "Masque Gèlèdè", client: "Marc D.", status: "Livré", price: 450, statusType: 'success' as const },
                { id: 3, name: "Pagne Kanvo", client: "Elena R.", status: "En attente", price: 180, statusType: 'default' as const }
              ].map(order => (
                <tr key={order.id} className="hover:bg-sand/[0.03] transition-colors">
                  <MTableCell className="font-bold py-5">{order.name}</MTableCell>
                  <MTableCell className="text-muted-foreground">{order.client}</MTableCell>
                  <MTableCell>
                    <MBadge variant={order.statusType}>{order.status}</MBadge>
                  </MTableCell>
                  <MTableCell className="font-heading text-lg">{order.price}€</MTableCell>
                  <MTableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-terracotta/10 text-terracotta"><Eye size={16} /></Button>
                  </MTableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MCard>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h3 className="text-2xl font-heading tracking-tight">Inventaire des <span className="text-terracotta">Pièces</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Gestion centralisée du catalogue</p>
        </div>
        <Button 
          onClick={() => setIsAddProductOpen(true)}
          className="bg-terracotta rounded-xl px-8 h-11 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-terracotta/20 hover:scale-105 transition-all"
        >
          <Plus size={16} className="mr-2" /> Ajouter une Pièce
        </Button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-4 items-center">
         <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input type="text" placeholder="Rechercher une pièce..." className="w-full h-12 pl-12 pr-4 bg-white border border-terracotta/10 rounded-2xl text-sm focus:ring-1 focus:ring-terracotta outline-none" required />
         </div>
         <Button variant="outline" className="rounded-2xl border-terracotta/10 h-12 px-6 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
            <Filter size={16} /> Catégories
         </Button>
      </div>

      {/* Products Table */}
      <MCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/10">
                <MTableHead>Images</MTableHead>
                <MTableHead>Dénomination</MTableHead>
                <MTableHead>Origine</MTableHead>
                <MTableHead>Prix</MTableHead>
                <MTableHead>Stock</MTableHead>
                <th className="px-8 border-b border-terracotta/5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-terracotta/5">
              {localProducts.map(product => (
                <tr key={product.id} className="hover:bg-sand/[0.03] transition-colors">
                  <MTableCell className="py-4">
                    <img src={product.image} alt={product.name} className="h-14 w-14 object-cover rounded-lg border border-terracotta/5" referrerPolicy="no-referrer" />
                  </MTableCell>
                  <MTableCell>
                    <p className="font-bold text-sm tracking-tight">{product.name}</p>
                    <p className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/30">{product.category}</p>
                  </MTableCell>
                  <MTableCell className="text-muted-foreground">{product.origin}</MTableCell>
                  <MTableCell className="font-heading text-lg text-terracotta font-medium">{product.price}€</MTableCell>
                  <MTableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-12 rounded-full overflow-hidden bg-sand ${product.stock <= 5 ? 'bg-red-100' : 'bg-emerald-100'}`}>
                         <div className={`h-full ${product.stock <= 5 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(product.stock * 5, 100)}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase text-foreground/30">{product.stock} pcs</span>
                    </div>
                  </MTableCell>
                   <MTableCell className="text-right">
                    <div className="flex justify-end gap-1">
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-9 w-9 rounded-lg hover:bg-terracotta/10 text-terracotta"
                         onClick={() => setEditingProduct(product)}
                       >
                         <Edit size={16} />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500"
                         onClick={() => handleDeleteProduct(product.id)}
                       >
                         <Trash2 size={16} />
                       </Button>
                    </div>
                  </MTableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MCard>

      <AnimatePresence>
        {isAddProductOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddProductOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl font-heading mb-8">Nouvelle <span className="text-terracotta">Création</span></h2>
              <form className="grid gap-6" onSubmit={handleCreateProduct}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom de la pièce</label>
                    <input type="text" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none focus:ring-1 focus:ring-terracotta" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Catégorie</label>
                    <select className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                      <option value="">Sélectionner</option>
                      <option>Sculpture</option>
                      <option>Textile</option>
                      <option>Céramique</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Description</label>
                  <textarea rows={3} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Prix (€)</label>
                    <input type="number" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Stock Initial</label>
                    <input type="number" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setIsAddProductOpen(false)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Enregistrer</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProduct(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl font-heading mb-8">Éditer <span className="text-terracotta">La Pièce</span></h2>
              <form className="grid gap-6" onSubmit={handleUpdateProduct}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom de la pièce</label>
                    <input name="name" type="text" defaultValue={editingProduct.name} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none focus:ring-1 focus:ring-terracotta" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Catégorie</label>
                    <select name="category" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" defaultValue={editingProduct.category} required>
                      <option>Sculpture</option>
                      <option>Textile</option>
                      <option>Céramique</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Description</label>
                  <textarea name="description" rows={3} defaultValue={editingProduct.description} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Prix (€)</label>
                    <input name="price" type="number" defaultValue={editingProduct.price} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Stock</label>
                    <input name="stock" type="number" defaultValue={editingProduct.stock} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setEditingProduct(null)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Mettre à jour</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderArtisans = () => (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h3 className="text-2xl font-heading tracking-tight">Réseau des <span className="text-terracotta">Artisans</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Gérer les Maîtres et leurs biographies</p>
        </div>
        <Button 
          onClick={() => setIsAddArtisanOpen(true)}
          className="bg-terracotta rounded-xl px-8 h-11 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-terracotta/20 hover:scale-105 transition-all"
        >
          <Plus size={16} className="mr-2" /> Recruter un Artisan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {localArtisans.map(artisan => (
          <MCard key={artisan.id} className="p-6 group flex gap-6 items-center hover:border-terracotta/30">
            <div className="h-24 w-24 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-heading tracking-tight font-medium truncate">{artisan.name}</h4>
              <p className="text-[9px] uppercase font-mono font-bold tracking-widest text-terracotta mb-2">{artisan.specialty}</p>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg hover:bg-terracotta/5 text-terracotta"
                  onClick={() => setEditingArtisan(artisan)}
                >
                  <Edit size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg hover:bg-red-50 text-red-500"
                  onClick={() => handleDeleteArtisan(artisan.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </MCard>
        ))}
      </div>

      <AnimatePresence>
        {isAddArtisanOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddArtisanOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10"
            >
              <h2 className="text-3xl font-heading mb-8">Nouveau <span className="text-terracotta">Maître Artisan</span></h2>
              <form className="grid gap-6" onSubmit={handleCreateArtisan}>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom et Prénom</label>
                  <input name="name" type="text" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Spécialité</label>
                  <input name="specialty" type="text" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Bio Express</label>
                  <textarea name="bio" rows={3} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Photo de Profil</label>
                  <input name="image" type="file" accept="image/*" className="w-full h-12 px-6 py-3 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" />
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setIsAddArtisanOpen(false)} disabled={uploadingImage} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" disabled={uploadingImage} className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">
                    {uploadingImage ? 'Téléchargement...' : 'Valider Recrutement'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingArtisan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingArtisan(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10"
            >
              <h2 className="text-3xl font-heading mb-8">Éditer <span className="text-terracotta">Maître Artisan</span></h2>
              <form className="grid gap-6" onSubmit={handleUpdateArtisan}>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom et Prénom</label>
                  <input name="name" type="text" defaultValue={editingArtisan.name} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Spécialité</label>
                  <input name="specialty" type="text" defaultValue={editingArtisan.specialty} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Bio Express</label>
                  <textarea name="bio" rows={3} defaultValue={editingArtisan.bio || "Bio non renseignée"} className="w-full p-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none resize-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Mettre à jour la Photo</label>
                  <div className="flex items-center gap-6 p-4 border border-terracotta/10 rounded-xl bg-sand/5">
                    <img src={editingArtisan.image} alt="Profil" className="h-16 w-16 rounded-xl object-cover border-2 border-white shadow-sm" />
                    <input name="image" type="file" accept="image/*" className="flex-1 text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/40" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setEditingArtisan(null)} disabled={uploadingImage} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" disabled={uploadingImage} className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">
                    {uploadingImage ? 'Téléchargement...' : 'Mettre à jour'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h3 className="text-2xl font-heading tracking-tight">Suivi des <span className="text-terracotta">Commandes</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Flux de transactions et logistique internationale</p>
        </div>
      </div>

      <MCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/10">
                <MTableHead>ID</MTableHead>
                <MTableHead>Date</MTableHead>
                <MTableHead>Client</MTableHead>
                <MTableHead>Status</MTableHead>
                <MTableHead>Total</MTableHead>
                <th className="px-8 border-b border-terracotta/5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-terracotta/5">
              {localOrders.map(order => (
                <tr key={order.id} className="hover:bg-sand/[0.03] transition-colors">
                  <MTableCell className="font-mono font-bold text-terracotta">{order.id}</MTableCell>
                  <MTableCell className="text-[11px] font-mono font-bold text-foreground/40">{order.date}</MTableCell>
                  <MTableCell className="font-bold">{order.client}</MTableCell>
                  <MTableCell><MBadge variant={order.statusType}>{order.status}</MBadge></MTableCell>
                  <MTableCell className="font-heading text-lg font-medium">{order.total}€</MTableCell>
                  <MTableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-terracotta/10 text-terracotta" onClick={() => setViewingOrder(order)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500" onClick={() => handleDeleteOrder(order.id)}><Trash2 size={16} /></Button>
                      </div>
                  </MTableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MCard>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h3 className="text-2xl font-heading tracking-tight">Gestion des <span className="text-terracotta">Accès</span></h3>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/20 mt-1">Contrôle des utilisateurs et privilèges système</p>
        </div>
        <Button 
          onClick={() => setIsAddUserOpen(true)}
          className="bg-terracotta rounded-xl px-8 h-11 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-terracotta/20 hover:scale-105 transition-all"
        >
          <Plus size={16} className="mr-2" /> Créer un Utilisateur
        </Button>
      </div>

      <MCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/10">
                <MTableHead>Identité</MTableHead>
                <MTableHead>Email</MTableHead>
                <MTableHead>Rôle</MTableHead>
                <MTableHead>Statut</MTableHead>
                <th className="px-8 border-b border-terracotta/5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-terracotta/5">
              {localUsers.map(u => (
                <tr key={u.id} className="hover:bg-sand/[0.03] transition-colors">
                  <MTableCell className="font-bold">{u.name}</MTableCell>
                  <MTableCell className="text-[11px] font-mono font-bold text-foreground/40">{u.email}</MTableCell>
                  <MTableCell><MBadge variant="default">{u.role}</MBadge></MTableCell>
                  <MTableCell><MBadge variant={u.status === 'Actif' ? 'success' : 'error'}>{u.status}</MBadge></MTableCell>
                  <MTableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-terracotta/10 text-terracotta" onClick={() => setEditingUser(u)}><Edit size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500" onClick={() => handleDeleteUser(u.id)}><Trash2 size={16} /></Button>
                    </div>
                  </MTableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MCard>

      <AnimatePresence>
        {isAddUserOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddUserOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-3xl font-heading mb-8">Nouveau <span className="text-terracotta">Profil</span></h2>
              <form className="grid gap-6" onSubmit={handleCreateUser}>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom complet</label>
                  <input name="name" type="text" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Email</label>
                  <input name="email" type="email" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Rôle</label>
                  <select name="role" className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                    <option value="client">Collectionneur</option>
                    <option value="artisan">Artisan</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setIsAddUserOpen(false)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Créer l'accès</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingUser(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-3xl font-heading mb-8">Éditer <span className="text-terracotta">Profil</span></h2>
              <form className="grid gap-6" onSubmit={handleUpdateUser}>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Nom complet</label>
                  <input name="name" type="text" defaultValue={editingUser.name} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Email</label>
                  <input name="email" type="email" defaultValue={editingUser.email} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Rôle</label>
                    <select name="role" defaultValue={editingUser.role} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                      <option value="client">Collectionneur</option>
                      <option value="artisan">Artisan</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-foreground/40 ml-4">Statut</label>
                    <select name="status" defaultValue={editingUser.status} className="w-full h-12 px-6 bg-sand/[0.05] border border-terracotta/10 rounded-xl outline-none" required>
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Suspendu</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="ghost" onClick={() => setEditingUser(null)} className="flex-1 h-12 text-[10px] uppercase font-black tracking-widest">Annuler</Button>
                  <Button type="submit" className="flex-1 h-12 bg-terracotta text-white rounded-xl uppercase font-black text-[10px] tracking-widest shadow-lg shadow-terracotta/20">Sauvegarder</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <DashboardLayout title="Administration">
      <div className="mb-12">
        <div className="flex gap-8 border-b border-terracotta/5 pb-0">
          {[
            { id: 'overview', label: 'Dashboard', icon: <TrendingUp size={16}/> },
            { id: 'products', label: 'Stocks & Produits', icon: <Package size={16}/> },
            { id: 'artisans', label: 'Artisans', icon: <Users size={16}/> },
            { id: 'orders', label: 'Commandes', icon: <ShoppingBag size={16}/> },
            { id: 'users', label: 'Utilisateurs', icon: <Users size={16}/> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-[10px] uppercase font-black tracking-widest flex items-center gap-2 relative transition-all ${
                activeTab === tab.id ? 'text-terracotta' : 'text-muted-foreground opacity-50 hover:opacity-100'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'artisans' && renderArtisans()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && renderUsers()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {viewingOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingOrder(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
               <h2 className="text-2xl font-heading mb-6">Détails de la <span className="text-terracotta">Commande {viewingOrder.id}</span></h2>
               <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-terracotta/5 pb-4">
                     <p className="text-[10px] uppercase font-mono font-bold text-foreground/40">Client</p>
                     <p className="font-bold">{viewingOrder.client}</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-terracotta/5 pb-4">
                     <p className="text-[10px] uppercase font-mono font-bold text-foreground/40">Date</p>
                     <p className="font-mono text-xs">{viewingOrder.date}</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-terracotta/5 pb-4">
                     <p className="text-[10px] uppercase font-mono font-bold text-foreground/40">Montant</p>
                     <p className="text-xl font-heading text-terracotta">{viewingOrder.total}€</p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] uppercase font-mono font-bold text-foreground/40">Statut Actuel</p>
                     <MBadge variant={viewingOrder.statusType}>{viewingOrder.status}</MBadge>
                  </div>
               </div>
               <div className="mt-10">
                  <Button className="w-full h-12 bg-terracotta rounded-xl uppercase font-black text-[10px] tracking-widest" onClick={() => setViewingOrder(null)}>Fermer</Button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
