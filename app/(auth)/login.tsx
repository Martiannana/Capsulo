// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Removed React Navigation import
import { firebase } from '@/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.replace('/(tabs)/home');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Login failed', errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={inputStyle} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={inputStyle} />
      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 12 }}>
        Login
      </Button>
      <Text style={{ textAlign: 'center', marginTop: 12 }}>
        Do not have an account?{' '}
        <Text 
          style={{ color: 'blue' }} 
          onPress={() => router.replace('/(auth)/register')} // Changed to use router
        >
          Register
        </Text>
      </Text>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
};