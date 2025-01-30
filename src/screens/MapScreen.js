import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ref, get } from 'firebase/database'; // Firebase import
import { db } from '../../firebaseConfig'; // Firebase configuration
import { useColorScheme } from 'react-native';

export default function MapScreen({ navigation }) {
  const [supermarkets, setSupermarkets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const supermarketsRef = ref(db, 'supermarkets'); // Path di Firebase
        const snapshot = await get(supermarketsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSupermarkets(formattedData);
        } else {
          console.log('No supermarkets found.');
        }
      } catch (error) {
        console.error('Error fetching supermarkets:', error.message);
      }
    };

    fetchSupermarkets();
  }, []);

  // Open Google Maps
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // Close card when clicking outside
  const closeCard = () => {
    setSelectedMarket(null);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={closeCard}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor="#ddd"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <FontAwesome name="search" size={20} color="#ddd" style={styles.icon} />
        </View>

        {/* Map View */}
        <MapView
          style={styles.map}
          mapType={colorScheme === 'dark' ? 'mutedStandard' : 'standard'} // Dark Mode
          initialRegion={{
            latitude: -6.966667, // Semarang center point
            longitude: 110.416664,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {supermarkets.map((market) => (
            <Marker
              key={market.id}
              coordinate={{
                latitude: market.latitude,
                longitude: market.longitude,
              }}
              onPress={() => setSelectedMarket(market)} // Set selected market on marker press
            />
          ))}
        </MapView>

        {/* Detail Card */}
        {selectedMarket && (
          <View style={styles.card}>
            <Image source={{ uri: selectedMarket.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{selectedMarket.name}</Text>
            <Text style={styles.cardAddress}>{selectedMarket.address}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => openGoogleMaps(selectedMarket.latitude, selectedMarket.longitude)}
            >
              <Text style={styles.cardButtonText}>Let's Go</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Home')}
          >
            <FontAwesome name="home" size={20} color="#999" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesome name="search" size={20} color="#999" />
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesome name="heart" size={20} color="#999" />
            <Text style={styles.navText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesome name="map" size={20} color="#6C63FF" />
            <Text style={styles.navText}>Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: '#0d0d1f',
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 30,
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
  card: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#0d0d1f',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
  },
});
