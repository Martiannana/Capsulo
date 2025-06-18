import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Card } from 'react-native-paper';
import { MotiView } from 'moti';
//import { ROUTES } from '@/utils/routes';

interface Capsule {
  id: string;
  title: string;
  message?: string;
  createdAt?: firebase.firestore.Timestamp;
}

export default function ExploreScreen() { // Removed props
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('capsules')
      .where('visibility', '==', 'public')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Capsule[];
        setCapsules(data);
      });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: Capsule }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={{ marginBottom: 12 }}
    >
      <Card style={{ padding: 12, borderRadius: 12 }}>
        <Card.Title title={item.title} titleStyle={{ fontSize: 18 }} />
        <Card.Content>
          <Text style={{ color: '#555' }}>{item.message || 'No message'}</Text>
        </Card.Content>
      </Card>
    </MotiView>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Explore Public Capsules</Text>
      <FlatList
        data={capsules}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

}