import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { firebase } from '@/firebase';
import * as FileSystem from 'expo-file-system';
import LottieLoader from '@/components/LottieLoader';
import loadingAnimation from '@/assets/lottie/unlock.json';
import notFoundAnimation from '@/assets/lottie/seal.json';
import { useLocalSearchParams } from 'expo-router'; 
//import { ROUTES } from '@/utils/routes';

interface Capsule {
  title: string;
  mediaUri?: string;
  createdAt?: firebase.firestore.Timestamp;
}



const CapsuleDetailScreen = () => {
  const { capsuleId } = useLocalSearchParams<{ capsuleId: string }>(); // Get params from router
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mediaExists, setMediaExists] = useState<boolean>(false);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const doc = await firebase.firestore().collection('capsules').doc(capsuleId).get();
        if (doc.exists) {
          const data = doc.data() as Capsule;
          setCapsule(data);

          if (data.mediaUri) {
            const fileInfo = await FileSystem.getInfoAsync(data.mediaUri);
            setMediaExists(fileInfo.exists);
          }
        }
      } catch (error) {
        console.error('Error fetching capsule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [capsuleId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <LottieLoader source={loadingAnimation} />
        <Text style={styles.message}>Loading capsule...</Text>
      </View>
    );
  }

  if (!capsule) {
    return (
      <View style={styles.center}>
        <LottieLoader source={notFoundAnimation} />
        <Text style={styles.message}>Capsule not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capsule.title}</Text>

      {capsule.mediaUri && mediaExists ? (
        <Image source={{ uri: capsule.mediaUri }} style={styles.image} />
      ) : (
        <View style={styles.center}>
          <LottieLoader source={notFoundAnimation} />
          <Text style={styles.message}>Media not available on this device.</Text>
        </View>
      )}

      <Text style={styles.date}>
        Created at:{' '}
        {capsule.createdAt?.toDate
          ? capsule.createdAt.toDate().toLocaleString()
          : 'Unknown'}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  message: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});



export default CapsuleDetailScreen;