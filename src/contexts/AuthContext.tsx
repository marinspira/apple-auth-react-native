import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    // Check AsyncStorage for a stored token and validate it
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/validateToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
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
            await AsyncStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error validating token', error);
        await AsyncStorage.removeItem('token');
      }
    };

    checkToken();
  }, []);

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

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
          await AsyncStorage.setItem('token', data.token);
          setLoggedUser({
            id: data.id,
            email: data.email,
            fullName: data.fullName,
            token: data.token,
          });
        } else {
          console.error('Error authenticating with Apple', data);
        }
      }
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.removeItem('token');
        setLoggedUser(null);
      } else {
        console.error('Error logging out', data);
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
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