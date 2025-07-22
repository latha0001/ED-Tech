import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'latha kadavath',
    email: 'lathakadavath@edu.com',
    password: 'teacher123',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'bhanu',
    email: 'bhanu.priya@edu.com',
    password: 'teacher123',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'kiran',
    email: 'kiran@student.edu',
    password: 'student123',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '4',
    name: 'Madno',
    email: 'madno@student.edu',
    password: 'student123',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } finally {
      setLoading(false);
    }
  };
  const signup = async (name: string, email: string, password: string, role: 'teacher' | 'student') => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (mockUsers.find(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      const newUser: User = {
        id: Date.now().toString(), name, email, role,
        avatar: role === 'teacher' 
          ? 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          : 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      };
      mockUsers.push({ ...newUser, password });
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}