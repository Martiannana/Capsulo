import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { firebase } from '@/firebase';
import { MotiView } from 'moti';
//import { ROUTES } from '@/utils/routes';

interface Capsule {
  id: string;
  title: string;
  openDate: string;
}

export default function NotificationScreen() {// Removed props
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const today = new Date();

    if (!uid) return;

    const unsubscribe = firebase
      .firestore()
      .collection('capsules')
      .where('ownerId', '==', uid)
      .onSnapshot((snapshot) => {
        const upcoming = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Capsule))
          .filter(c => new Date(c.openDate) > today)
          .sort((a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime());

        setCapsules(upcoming);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading upcoming capsules...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Capsules</Text>

      {capsules.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No upcoming capsules yet.</Text>
        </View>
      ) : (
        <FlatList
          data={capsules}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
              style={styles.capsuleCard}
            >
              <Text style={styles.capsuleTitle}>{item.title}</Text>
              <Text style={styles.capsuleDate}>Opens on {item.openDate}</Text>
            </MotiView>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  capsuleCard: {
    padding: 16,
    backgroundColor: '#F2F6FC',
    borderRadius: 10,
    marginBottom: 12,
  },
  capsuleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  capsuleDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
});
