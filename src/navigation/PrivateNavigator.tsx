import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';

export type PrivateStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();

const PrivateNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default PrivateNavigator;
