import { createContext, useContext, useState } from 'react';
import { User } from '@/models/user';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, userData?: { role?: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    username: string, 
    password: string, 
    userData?: { role?: string }
  ) => {
    // Mock authentication
    setUser({
      username,
      role: userData?.role || 'buyer',
      // add other user properties as needed
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};