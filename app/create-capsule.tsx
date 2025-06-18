import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import { ROUTES } from '@/utils/routes';
import { firebase } from '@/firebase';
import { useRouter } from 'expo-router'; 
import LottieLoader from '@/components/LottieLoader';
import successAnimation from '@/assets/lottie/unlock.json';

const CreateCapsuleScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        const fileName = selectedUri.split('/').pop();
        if (!FileSystem.documentDirectory) {
          Alert.alert('Error', 'Document directory is not available.');
          return;
        }
        const localUri = FileSystem.documentDirectory + fileName;

        await FileSystem.copyAsync({ from: selectedUri, to: localUri });
        setMediaUri(localUri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Could not pick image.');
    }
  };

  const handleSaveCapsule = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your capsule.');
      return;
    }

    try {
      await firebase.firestore().collection('capsules').add({
        title,
        mediaUri: mediaUri || '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.replace('/(tabs)/home');
      }, 2000);
    } catch (error) {
      console.error('Error saving capsule:', error);
      Alert.alert('Error', 'Could not save capsule.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Capsule Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter capsule title"
        value={title}
        onChangeText={setTitle}
      />

      {mediaUri && (
        <Image source={{ uri: mediaUri }} style={styles.preview} />
      )}

      <Button title="Pick Image or Video" onPress={pickImage} />
      <View style={styles.spacer} />
      <Button title="Save Capsule" onPress={handleSaveCapsule} />

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <LottieLoader source={successAnimation} />
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Capsule Created!</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  spacer: {
    height: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#ffffffcc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateCapsuleScreen;

