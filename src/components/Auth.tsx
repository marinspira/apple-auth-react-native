import { Platform, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

export function Auth(): React.JSX.Element | null {
  const { signInWithApple } = useAuth();

  if (Platform.OS === 'ios') {
    return (
      <View>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={signInWithApple}
        />
      </View>
    );
  }

  return null;
}
