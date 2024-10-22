import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/WelcomeScreen';

export type PrivateStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Home: undefined
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();

const PrivateNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default PrivateNavigator;
