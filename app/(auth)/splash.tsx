import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use the correct route path
      router.replace('/(auth)/onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, []); // Fixed dependency array

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottie/seal.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      <Text style={styles.text}>Time Capsule</Text>
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});