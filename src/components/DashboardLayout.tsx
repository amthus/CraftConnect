import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  User as UserIcon,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles?: ('admin' | 'client' | 'artisan')[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    // Admin Items
    { id: 'admin-overview', label: 'Vue d\'ensemble', icon: <LayoutDashboard size={20} />, path: '/admin', roles: ['admin'] },
    { id: 'admin-products', label: 'Gestion Stocks', icon: <Package size={20} />, path: '/admin/products', roles: ['admin'] },
    { id: 'admin-artisans', label: 'Artisans', icon: <Users size={20} />, path: '/admin/artisans', roles: ['admin'] },
    { id: 'admin-orders', label: 'Commandes', icon: <ShoppingBag size={20} />, path: '/admin/orders', roles: ['admin'] },
    
    // Client Items
    { id: 'client-overview', label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/dashboard', roles: ['client'] },
    { id: 'client-shop', label: 'Boutique', icon: <ShoppingBag size={20} />, path: '/marketplace', roles: ['client'] },
    
    // Artisan Items
    { id: 'artisan-overview', label: 'Mon Atelier', icon: <LayoutDashboard size={20} />, path: '/artisan', roles: ['artisan'] },
    { id: 'artisan-shop', label: 'Voir ma Boutique', icon: <Globe size={20} />, path: '/artisans', roles: ['artisan'] },
    
    // Shared
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, path: '/dashboard/messages', roles: ['admin', 'client', 'artisan'] },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={20} />, path: '/settings', roles: ['admin', 'client', 'artisan'] },
  ];

  const filteredItems = sidebarItems.filter(item => !item.roles || (user && item.roles.includes(user.role)));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if focus is in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Alt + Number shortcuts
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (filteredItems[index]) {
          navigate(filteredItems[index].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-sand/[0.03] flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-white border-r border-terracotta/10 sticky top-0 h-screen z-50">
        <div className="h-20 flex items-center px-8 border-b border-terracotta/10 shrink-0">
          <Link to="/" className="text-xl font-heading tracking-tighter text-terracotta flex items-center gap-2">
            <span className="font-black">BÉNIN</span>
            <span className="font-light text-foreground/40">/</span>
            <span className="font-light text-foreground tracking-widest text-sm uppercase">Artisan</span>
          </Link>
        </div>

        <div className="p-4 shrink-0">
           <div className="bg-sand/20 rounded-xl p-3 flex items-center gap-3 border border-terracotta/5">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/40">Système Opérationnel</span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {filteredItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.id} 
                to={item.path}
                className={`flex items-center gap-3 px-4 h-12 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? 'bg-terracotta text-white shadow-lg shadow-terracotta/25' 
                    : 'text-foreground/60 hover:text-terracotta hover:bg-terracotta/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActiveBar" 
                    className="absolute left-0 top-2 bottom-2 w-1.5 bg-white rounded-r-full" 
                  />
                )}
                <div className={`shrink-0 ${isActive ? 'text-white scale-110' : 'text-terracotta/70 group-hover:scale-110 group-hover:text-terracotta transition-transform'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18, strokeWidth: isActive ? 3 : 2 })}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-[0.15em] flex-1 ${isActive ? 'font-black' : ''}`}>
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono opacity-0 group-hover:opacity-40 transition-opacity ${isActive ? 'text-white' : 'text-foreground/40'}`}>
                    Alt+{index + 1}
                  </span>
                  {isActive && (
                    <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="ml-auto">
                      <ChevronRight size={14} className="opacity-50" />
                    </motion.div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 space-y-2 border-t border-terracotta/10 bg-sand/[0.02]">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 h-11 rounded-xl text-foreground/50 hover:text-terracotta hover:bg-terracotta/5 transition-all group"
          >
            <Globe size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Portail Public</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 h-11 rounded-xl text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
          
          <div className="pt-4 flex items-center justify-between px-4 border-t border-terracotta/5 mt-2">
            <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest">v2.4.0-stable</span>
            <div className="flex gap-1.5">
               {[1,2,3].map(i => <div key={i} className="h-1 w-1 bg-terracotta/10 rounded-full" />)}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-terracotta/10 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40 backdrop-blur-md bg-white/90">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-10 w-10 border border-terracotta/10 rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div className="flex flex-col">
               <h2 className="text-lg font-heading tracking-tight leading-none text-foreground/90">{title}</h2>
               <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-foreground/30 mt-1 hidden sm:block">Console de gestion sécurisée</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 font-sans">
            <div className="relative hidden xl:block">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-terracotta transition-colors">
                <Search size={14} />
              </div>
              <input 
                type="text" 
                placeholder="Raccourci de recherche..."
                className="bg-sand/30 border border-transparent focus:border-terracotta/20 rounded-xl pl-12 pr-6 h-11 text-[11px] font-bold tracking-wide w-72 focus:ring-4 focus:ring-terracotta/5 transition-all outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                 <kbd className="h-5 w-5 bg-white border border-terracotta/10 rounded flex items-center justify-center text-[8px] font-mono text-foreground/30 ring-1 ring-black/5 shadow-sm">⌘</kbd>
                 <kbd className="h-5 w-5 bg-white border border-terracotta/10 rounded flex items-center justify-center text-[8px] font-mono text-foreground/30 ring-1 ring-black/5 shadow-sm">K</kbd>
              </div>
            </div>
            
            <Button variant="outline" size="icon" className="relative h-11 w-11 rounded-xl border-terracotta/10 bg-white hover:bg-terracotta/5 text-foreground/40 transition-all hover:scale-105 active:scale-95">
              <Bell size={18} strokeWidth={2.5} />
              <span className="absolute top-3 right-3 h-2 w-2 bg-terracotta rounded-full ring-4 ring-white" />
            </Button>

            <div className="h-8 w-[1px] bg-terracotta/10 mx-1" />

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-foreground/80">{user?.name}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                   <div className="h-2 w-2 rounded-full border border-terracotta/30 bg-terracotta/10" />
                   <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-terracotta/60 uppercase">{user?.role}</span>
                </div>
              </div>
              
              <div className="relative group">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="relative flex items-center gap-2 group-hover:opacity-80 transition-opacity"
                >
                  <div className="absolute -inset-1 bg-terracotta/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <Avatar className="h-11 w-11 border-2 border-white ring-1 ring-terracotta/10 rounded-xl relative">
                    {user?.avatar && <AvatarImage src={user.avatar} className="object-cover" />}
                    <AvatarFallback className="bg-sand text-terracotta font-black text-xs">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileMenuOpen(false)}
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-terracotta/10 z-50 p-2 overflow-hidden shadow-terracotta/10"
                      >
                        <div className="p-4 border-b border-terracotta/5 mb-2">
                          <p className="text-[11px] font-black uppercase tracking-widest text-foreground">{user?.name}</p>
                          <p className="text-[9px] font-mono font-bold text-terracotta/60 uppercase mt-1">Niveau • {user?.role}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <Link 
                            to="/settings" 
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 h-12 rounded-xl text-foreground/70 hover:bg-terracotta/[0.03] hover:text-terracotta transition-all group"
                          >
                            <UserIcon size={16} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Gérer mon profil</span>
                          </Link>
                          
                          <Link 
                            to="/settings" 
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 h-12 rounded-xl text-foreground/70 hover:bg-terracotta/[0.03] hover:text-terracotta transition-all group"
                          >
                            <Settings size={16} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Paramètres</span>
                          </Link>
                        </div>

                        <div className="mt-2 pt-2 border-t border-terracotta/5">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
                          >
                            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Se déconnecter</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-foreground/30 z-[100] backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[101] flex flex-col p-6 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10 px-2 pt-2">
                <div className="text-xl font-heading tracking-tighter text-terracotta">
                   <span className="font-black">BÉNIN</span>
                   <span className="font-light text-foreground tracking-widest text-xs uppercase ml-1">CONSOLE</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="h-10 w-10 rounded-xl border border-terracotta/5">
                  <X size={20} />
                </Button>
              </div>

              <div className="mb-8 px-2">
                 <Link 
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-sand/20 rounded-2xl p-4 flex items-center justify-between border border-terracotta/5 hover:bg-sand/30 transition-colors group"
                 >
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm shrink-0">
                          {user?.avatar && <AvatarImage src={user.avatar} />}
                          <AvatarFallback className="bg-terracotta text-white font-black text-[10px]">
                             {user ? getInitials(user.name) : 'U'}
                          </AvatarFallback>
                       </Avatar>
                       <div className="min-w-0 text-left">
                          <p className="text-xs font-black truncate text-foreground">{user?.name}</p>
                          <p className="text-[9px] uppercase font-mono tracking-widest text-terracotta font-bold mt-0.5">{user?.role}</p>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-terracotta/40 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>

              <nav className="flex-1 space-y-1.5 px-1 overflow-y-auto">
                {filteredItems.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link 
                      key={item.id} 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-5 h-14 rounded-2xl transition-all relative ${
                        isActive 
                          ? 'bg-terracotta text-white shadow-lg shadow-terracotta/20 active:scale-95' 
                          : 'text-foreground/50 hover:bg-sand/50 active:scale-95'
                      }`}
                    >
                      <div className={isActive ? 'text-white' : 'text-terracotta/60'}>
                         {item.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.15em]">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 flex flex-col gap-3">
                <div className="px-4 py-8 bg-foreground/5 rounded-3xl border border-foreground/5 flex flex-col items-center text-center gap-2 mb-4">
                   <p className="text-[10px] uppercase font-black tracking-widest text-foreground/30">Dahomey Digital v2.4</p>
                   <p className="text-[11px] font-serif italic text-foreground/50">"Le patrimoine entre vos mains"</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-6 h-14 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-red-100/50 active:scale-95 transition-all"
                >
                  Déconnexion
                  <LogOut size={18} />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
