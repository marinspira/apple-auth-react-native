import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import PrivateNavigator from './PrivateNavigator';
import { useAuth } from '../contexts/AuthContext';

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <PrivateNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;