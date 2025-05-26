import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Import MapView
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'; // Import BottomSheet
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Required for BottomSheet

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Home() {
  const [favoritado, setFavoritado] = useState(false);
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points for the bottom sheet
  // Adjust these values based on your desired heights
  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []); // Minimized, Mid, Expanded

  // Callback to handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === 0) { // If sheet is minimized, dismiss keyboard
        Keyboard.dismiss();
    }
  }, []);

  // Initial map region (Example: Campinas, SP)
  const initialRegion = {
    latitude: -22.9056,
    longitude: -47.0608,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Map View */}
        <MapView
          provider={PROVIDER_GOOGLE} // Use Google Maps
          style={styles.map}
          initialRegion={initialRegion}
          // Add other map props as needed (markers, etc.)
        />

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={1} // Initial snap point index (e.g., '50%')
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            {/* Content inside the bottom sheet */}
            <TouchableOpacity
              onPress={() => setFavoritado(!favoritado)}
              style={styles.starTouchable}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome
                name="star"
                size={28}
                color={favoritado ? '#FFD700' : '#666'} // Adjusted color for visibility
              />
            </TouchableOpacity>

            <Text style={styles.title}>Para onde vamos?</Text>

            <TextInput
              style={styles.input}
              placeholder="Local de partida..."
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Seu destino..."
              placeholderTextColor="#999"
            />

            <Text style={styles.footerText}>
              Deseja favoritar lugares e salvar suas preferências?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Faça login</Text>
              </TouchableOpacity>
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color for the main view
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Make map fill the container
  },
  bottomSheetBackground: {
    backgroundColor: '#19549C', // Blue background for the sheet
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  handleIndicator: {
    backgroundColor: 'white',
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10, // Adjust padding as needed
  },
  starTouchable: {
    alignSelf: 'flex-start',
    padding: 5, // Add some padding for easier touch
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12, // Slightly increased padding
    marginBottom: 12, // Increased margin
    fontSize: 16,
  },
  footerText: {
    color: 'white',
    marginTop: 20, // Increased margin
    textAlign: 'center',
    fontSize: 14,
  },
  loginLink: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

