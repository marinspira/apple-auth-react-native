import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication'

interface User {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  signInWithApple: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // if (credential) {
      //   const { email, fullName, user: appleUserId, identityToken } = credential;

      //   // Faça a requisição ao backend para criar/validar o usuário no banco de dados
      //   const response = await fetch('https://your-api-endpoint.com/auth/apple', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       appleUserId,
      //       email,
      //       fullName,
      //       identityToken,
      //     }),
      //   });

      //   const data = await response.json();

      //   if (response.ok) {
      //     setUser({
      //       id: data.user.id,
      //       email: data.user.email,
      //       fullName: data.user.fullName,
      //       token: data.token,
      //     });
      //   } else {
      //     console.error('Erro ao autenticar com Apple', data);
      //   }
      // }
    } catch (error) {
      console.error('Erro no processo de autenticação', error);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
