import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ViewToken } from 'react-native';
import LottieView from 'lottie-react-native';
//import { useNavigation } from '@react-navigation/native';
//import { OnboardingScreenNavigationProp } from '@/types/navigation'; // Import specific type
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');



interface Slide {
  key: string;
  title: string;
  description: string;
  animation: any; // Lottie source type
}

const slides: Slide[] = [
  {
    key: '1',
    title: 'Create Time Capsules',
    description: 'Capture memories and messages you want to revisit in the future.',
    animation: require('@/assets/lottie/seal.json'),
  },
  {
    key: '2',
    title: 'Set Future Dates',
    description: 'Pick the perfect time to unlock your messages.',
    animation: require('@/assets/lottie/unlock.json'),
  },
  {
    key: '3',
    title: 'Relive The Moment',
    description: 'Get notified and unlock when the time is right.',
    animation: require('@/assets/lottie/unlock.json'),
  },
];

/*interface OnboardingScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
}*/

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);


  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  const goToNext = () => {
  if (currentIndex < slides.length - 1) {
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
  } else {
    // Use the correct route path
    router.replace('/(auth)/login');
  }
};

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={slides}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <LottieView source={item.animation} autoPlay loop style={styles.lottie} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {slides.map((_, idx) => (
            <View key={idx} style={[styles.dot, currentIndex === idx && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity onPress={goToNext} style={styles.nextBtn}>
          <Text style={styles.nextText}>{currentIndex === slides.length - 1 ? 'Start' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  lottie: { width: 300, height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
  desc: { fontSize: 16, color: '#555', marginTop: 10, textAlign: 'center' },
  bottom: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    margin: 5,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
    width: 12,
    height: 12,
  },
  nextBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
