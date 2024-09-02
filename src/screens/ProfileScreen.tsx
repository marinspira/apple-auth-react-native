// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Home'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        title="Logout"
        onPress={signOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
