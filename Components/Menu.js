import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PLACES_WITH_COORDS from './PlaceWithCoords';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAIN_BG = '#143468';
const CARD_BG = '#2C6BC7';
const CATEGORY_BG = '#2C6BC7';
const CATEGORY_ACTIVE = '#FFFFFF';
const TEXT_COLOR = '#FFFFFF';
const ICON_TINT = '#FFFFFF';
const TRANSPARENT_WHITE = 'rgba(255,255,255,0.5)';

const CATEGORIES = ['Nature', 'Food', 'Museums', 'Historical sites', 'Outdoors'];

const INITIAL_REGION = {
  latitude: 44.6488,
  longitude: -63.5752,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export default function Menu() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [places, setPlaces] = useState(PLACES_WITH_COORDS);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mapIndex, setMapIndex] = useState(0);

  const filteredPlaces = selectedCategory
    ? places.filter((p) => p.category === selectedCategory)
    : places;

  const displayedPlaces = filteredPlaces;

  useEffect(() => {
    if (displayedPlaces.length > 0 && mapIndex < displayedPlaces.length) {
      animateMap(displayedPlaces[mapIndex]);
    }
  }, [mapIndex, displayedPlaces]);

  const animateMap = (place) => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: place.coords.latitude,
        longitude: place.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      1000
    );
  };

  const goLeft = () => {
    if (displayedPlaces.length === 0) return;
    setMapIndex((prev) =>
      prev === 0 ? displayedPlaces.length - 1 : prev - 1
    );
  };

  const goRight = () => {
    if (displayedPlaces.length === 0) return;
    setMapIndex((prev) => (prev + 1) % displayedPlaces.length);
  };

  const toggleFavorite = (id) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, favorite: !p.favorite } : p
      )
    );
  };

  const goToFavorites = () => {
    navigation.navigate('FavoritesScreen', { places });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Best places</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={() => navigation.navigate('MiniGame')}
              >
                <Image
                  source={require('../assets/console.png')}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={goToFavorites}>
                <Image
                  source={require('../assets/heart.png')}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION}>
              {displayedPlaces.map((pl, i) => (
                <Marker
                  key={pl.id}
                  coordinate={pl.coords}
                  title={pl.name}
                  pinColor={i === mapIndex ? 'red' : 'purple'}
                />
              ))}
            </MapView>
            <TouchableOpacity style={styles.leftArrow} onPress={goLeft}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightArrow} onPress={goRight}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
           
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.placeContainer}>
            {displayedPlaces.map((placeItem) => (
              <TouchableOpacity
                key={placeItem.id}
                style={styles.placeCard}
                onPress={() =>
                  navigation.navigate('PlaceDetails', {
                    place: placeItem,
                    onToggleFavorite: (id, newFavorite) => {
                      setPlaces((prev) =>
                        prev.map((p) =>
                          p.id === id ? { ...p, favorite: newFavorite } : p
                        )
                      );
                    },
                  })
                }
              >
                <Image source={placeItem.image} style={styles.placeImage} />
                <Text style={styles.placeName}>{placeItem.name}</Text>
                <TouchableOpacity
                  style={[
                    styles.heartButton,
                    placeItem.favorite && { backgroundColor: '#FFD700' },
                  ]}
                  onPress={() => {
                    setPlaces((prev) =>
                      prev.map((p) =>
                        p.id === placeItem.id ? { ...p, favorite: !p.favorite } : p
                      )
                    );
                  }}
                >
                  <Image
                    source={require('../assets/heart.png')}
                    style={[
                      styles.heartIcon,
                      placeItem.favorite && { tintColor: '#333' },
                    ]}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: ICON_TINT,
  },
  mapContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    position: 'relative',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: -20,
    backgroundColor: TRANSPARENT_WHITE,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -20,
    backgroundColor: TRANSPARENT_WHITE,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryScroll: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  categoryButton: {
    marginTop: -8,
    backgroundColor: CATEGORY_BG,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 1,
  },
  categoryButtonActive: {
    backgroundColor: CATEGORY_ACTIVE,
  },
  categoryText: {
    color: '#143468',
    fontWeight: '600',
  },
  placeContainer: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    marginBottom: 15,
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
  },
  placeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  placeName: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: '#1F51A4',
    borderRadius: 40,
    height: 70,
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#143468',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: TEXT_COLOR,
  },
  activeTabItem: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  activeTabIcon: {
    tintColor: '#1F51A4',
  },
});
