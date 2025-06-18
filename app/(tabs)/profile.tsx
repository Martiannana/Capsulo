import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '@/firebase';
import { useRouter } from 'expo-router'; // Replaced useNavigation
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';

export default function ProfileScreen() {
  const user = firebase.auth().currentUser;
  const router = useRouter(); // Use Expo Router

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      router.replace('/(auth)/login'); // Use router.replace
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.profileBox}
      >
        <LottieView
          source={require('@/assets/lottie/unlock.json')}
          autoPlay
          loop
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.displayName || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300 }}
      >
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
