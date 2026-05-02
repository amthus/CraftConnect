import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'artisan';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({
              id: firebaseUser.uid,
              ...userDoc.data()
            } as User);
          } else {
            // Default profile for new users if not found (though registration should handle this)
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Utilisateur',
              email: firebaseUser.email || '',
              role: 'client',
              avatar: firebaseUser.photoURL || undefined
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              avatar: newUser.avatar,
              createdAt: new Date().toISOString()
            });
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
