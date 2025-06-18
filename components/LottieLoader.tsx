// src/components/LottieLoader.tsx
import React from 'react';
import LottieView, { LottieViewProps } from 'lottie-react-native';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

// Define props interface
interface LottieLoaderProps {
  source: LottieViewProps['source'];
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
}

const LottieLoader: React.FC<LottieLoaderProps> = ({
  source,
  style,
  autoPlay = true,
  loop = true,
}) => (
  <View style={styles.container}>
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={[styles.animation, style]}
    />
  </View>
);

// Define styles with TypeScript
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  animation: {
    width: 200,
    height: 200,
  } as ViewStyle,
});

export default LottieLoader;