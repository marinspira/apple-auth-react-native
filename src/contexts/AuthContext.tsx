import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication'

interface User {
  id: any;
  email: string;
  fullName: string;
  token: string;
}

interface AuthContextType {
  loggedUser: User | null;
  signInWithApple: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log(credential)

      if (credential) {
        const { email, fullName, user, identityToken } = credential;

        const userEmail = email ?? ''; 
        const userFullName = fullName?.givenName || fullName?.familyName
          ? `${fullName?.givenName ?? ''} ${fullName?.familyName ?? ''}`
          : '';

        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/signInWithApple`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appleUserId: user,
            email: userEmail,
            fullName: userFullName,
            identityToken,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoggedUser({
            id: data.id,
            email: data.email,
            fullName: data.fullName,
            token: data.token,
          });

        } else {
          console.error('Erro ao autenticar com Apple', data);
        }
      }

    } catch (error) {
      console.error('Erro no processo de autenticação', error);
    }
  };

  const signOut = () => {
    setLoggedUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedUser, signInWithApple, signOut }}>
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
