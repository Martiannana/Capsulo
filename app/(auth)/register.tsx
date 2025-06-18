import React, { useState } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Added useRouter
import { firebase } from '@/firebase';

export default function RegisterScreen() {
  const router = useRouter(); // Added router
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Navigate to home after registration
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Registration failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      {/* ... existing JSX ... */}
      <Text style={{ textAlign: 'center', marginTop: 12 }}>
        Already have an account?{' '}
        <Text 
          style={{ color: 'blue' }} 
          onPress={() => router.replace('/(auth)/login')} // Fixed navigation
        >
          Login
        </Text>
      </Text>
    </View>
  );
}