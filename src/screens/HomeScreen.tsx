// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../components/tabs';

type HomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const tabData = [
    { label: 'Overview', content: 'Este é o conteúdo da Tab 1. Aqui você pode adicionar qualquer informação que desejar.' },
    { label: 'Reviews', content: 'Este é o conteúdo da Tab 2. Você pode personalizar esse texto conforme sua necessidade.' },
    { label: 'Staff Area', content: 'Este é o conteúdo da Tab 3. Aproveite para adicionar mais informações ou funcionalidades aqui.' },
  ];

  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <Tabs tabs={tabData} />
      <Button
        title="Next"
      />
      <Button
        title="Skip"
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
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

export default HomeScreen;
