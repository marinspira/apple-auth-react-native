// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import Tabs from '../components/tabs/index'

type HomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Home'>;

const tabData = [
  { label: 'Overview', content: 'Este é o conteúdo da Tab 1. Aqui você pode adicionar qualquer informação que desejar.' },
  { label: 'Reviews', content: 'Este é o conteúdo da Tab 2. Você pode personalizar esse texto conforme sua necessidade.' },
  { label: 'Staff Area', content: 'Este é o conteúdo da Tab 3. Aproveite para adicionar mais informações ou funcionalidades aqui.' },
];


const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/me.jpg')}
          style={styles.image}
        />
        {/* <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}
        /> */}
      </View>
      <View style={styles.containerInferior}>
        <Text style={styles.name}>Maria Eduarda</Text>
        <Text style={styles.description}>Made in Brazil</Text>
        <Tabs tabs={tabData}/>
        <Button
          title="Logout"
          onPress={signOut}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    width: '100%',
    height: 600,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
  },
  containerInferior: {
    marginTop: -140,
    padding: 30
  },
  name: {
    color: '#fff',
    fontSize: 50,
    maxWidth: 300,
    textAlign: 'left'
  },
  description: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  }
});

export default ProfileScreen;
