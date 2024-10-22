import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../ProfileScreen';

export type PrivateStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();

const StaffNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default StaffNavigator;
