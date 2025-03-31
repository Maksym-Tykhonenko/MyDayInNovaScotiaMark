import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const MAIN_BG = '#143468';
const CARD_BG = '#2C6BC7';
const TEXT_COLOR = '#FFFFFF';
const TRANSPARENT_WHITE = 'rgba(255,255,255,0.5)';

export default function FavoritesScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { places } = route.params;
  const favoritePlaces = places.filter((p) => p.favorite);

  const goToDetails = (place) => {
    navigation.navigate('PlaceDetails', { place });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorite Places</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.scroll}>
          {favoritePlaces.length === 0 && (
            <Text style={styles.noFavs}>No favorites yet</Text>
          )}
          {favoritePlaces.map((pl) => (
            <TouchableOpacity
              key={pl.id}
              style={styles.card}
              onPress={() => goToDetails(pl)}
            >
              <Image source={pl.image} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{pl.name}</Text>
                <Text style={styles.addr}>{pl.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 70, 
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  headerTitle: {
    alignContent:'center',
    fontSize: 22,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  noFavs: {
    color: TEXT_COLOR,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  addr: {
    color: TEXT_COLOR,
    fontSize: 14,
  },
});
