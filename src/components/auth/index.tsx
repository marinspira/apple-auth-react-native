import React from 'react';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';

import * as AppleAuthentication from 'expo-apple-authentication';

import { useAuth } from '../../contexts/AuthContext';
import { styles } from './index.styles'

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const world = {uri: '../../../assets/illustrations/world.svg'};

function AppleAuth() {
  const { signInWithApple } = useAuth();

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={100}
        style={{ width: 70, height: 70 }}
        onPress={signInWithApple}
      />
    </View>
  );
}

function GoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log(id_token);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!request}
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={styles.buttonText}>Login com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Auth(): React.JSX.Element | null {

  if (Platform.OS === 'ios') {
    return (
      <>
        <Image
          source={require('../../../assets/illustrations/world.png')}
          style={{ width: '100%', height: '40%' }}
        />
          <AppleAuth />
          <GoogleAuth />
      </>
    )
  } else {
    return <GoogleAuth />
  }

}
