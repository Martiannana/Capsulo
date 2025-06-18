// app/_layout.tsx
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Text, StyleSheet  } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/AuthContext';

interface CustomFonts {
  [fontName: string]: any;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  } as CustomFonts);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        {fontError ? (
          <Text style={styles.errorText}>Error loading fonts</Text>
        ) : (
          <ActivityIndicator size="large" color="#4A90E2" />
        )}
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#FF4C4C',
    textAlign: 'center',
    padding: 20,
  }
});