import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { JwtManager } from '../utils/jwtManager.ts';

interface User {
  id: string;
  email: string;
  nome: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const jwt = useMemo(() => new JwtManager(), []);

  useEffect(() => {
    const storedToken = jwt.getTokenFromCookies();

    try {
      const decodedPayload = jwt.getDecodedToken();

      if (decodedPayload) {
        const userData: User = {
          id: decodedPayload.id,
          email: decodedPayload.email,
          nome: decodedPayload.nome,
          type: decodedPayload.type
        };

        setToken(storedToken);
        setUser(userData);
      }
    } catch (error) {
      jwt.removeToken();
      setToken(null);
      setUser(null);
    }


    setIsLoading(false);
  }, [jwt]);

  const login = (newToken: string, newUser: User) => {
    setIsLoading(true);
    try {
      jwt.setToken(newToken);
      setToken(newToken);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    jwt.removeToken();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
