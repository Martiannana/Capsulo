// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

interface Capsule {
  id: string;
  title: string;
  openDate: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    if (!uid) return;

    const unsubscribe = firebase
      .firestore()
      .collection('capsules')
      .where('ownerId', '==', uid)
      .orderBy('openDate', 'asc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Capsule[];
        setCapsules(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

 
  const renderCapsule = ({ item, index }: { item: Capsule; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/capsule-detail?capsuleId=${item.id}`)} // Use router.push
    >
 
      <MotiView
        from={{ opacity: 0, scale: 0.95, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 500,
          delay: index * 100,
        }}
        style={styles.capsule}
      >
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="clock-time-eight-outline" size={30} color="#4A90E2" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>To be opened on: {item.openDate}</Text>
        </View>
      </MotiView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Capsules</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : capsules.length === 0 ? (
        <Text style={{ marginTop: 20, fontStyle: 'italic', color: '#777' }}>
          No capsules yet. Start by creating one!
        </Text>
      ) : (
        <FlatList
          data={capsules}
          keyExtractor={item => item.id}
          renderItem={renderCapsule}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F0F4F8',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: {
    marginRight: 16,
    backgroundColor: '#E1ECF4',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
