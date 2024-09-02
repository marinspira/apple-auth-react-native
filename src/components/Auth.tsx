import { Platform } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

export function Auth(): React.JSX.Element | undefined {
  const { signInWithApple } = useAuth()

  if (Platform.OS === 'ios')
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
    )
}