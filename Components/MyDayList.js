import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

// Імпорт даних (наприклад, місця з координатами)
import PLACES_WITH_COORDS from './PlaceWithCoords';

const { width, height } = Dimensions.get('window');
const MAIN_BG = '#143468'; // Запасний фон, якщо back.png не завантажиться
const CARD_BG = '#2C6BC7';
const TEXT_COLOR = '#FFFFFF';
const TRANSPARENT_WHITE = 'rgba(255,255,255,0.5)';

/** Тестові дані */
const INITIAL_ROUTES = [
  {
    id: 1,
    title: 'Route 1',
    date: '15.02.2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    places: [
      { id: 101, name: 'Halifax Public Gardens', image: require('../assets/photo1.png') },
      { id: 102, name: 'Lone Shieling', image: require('../assets/photo2.jpeg') },
    ],
    images: [
      require('../assets/photo3.jpeg'),
      require('../assets/photo4.jpeg'),
    ],
    diary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    mainImage: require('../assets/photo2.jpeg'),
  },
  {
    id: 2,
    title: 'Route 2',
    date: '16.03.2024',
    description: 'Aenean commodo ligula eget dolor. Aenean massa.',
    places: [],
    images: [],
    diary: '',
    mainImage: require('../assets/photo1.png'),
  },
];

/** ===== 1) Екран MyDayList ===== */
export function MyDayList() {
  const navigation = useNavigation();
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const savedRoutes = await AsyncStorage.getItem('routes');
        if (savedRoutes) {
          setMyRoutes(JSON.parse(savedRoutes));
        } else {
          setMyRoutes(INITIAL_ROUTES);
        }
      } catch (error) {
        console.log('Error loading routes:', error);
        setMyRoutes(INITIAL_ROUTES);
      }
    };
    loadRoutes();
  }, []);

  useEffect(() => {
    const saveRoutes = async () => {
      try {
        await AsyncStorage.setItem('routes', JSON.stringify(myRoutes));
      } catch (error) {
        console.log('Error saving routes:', error);
      }
    };
    saveRoutes();
  }, [myRoutes]);

  const goToRouteDetails = (routeItem) => {
    navigation.navigate('RouteDetails', {
      routeItem,
      onDeleteRoute: handleDeleteRoute,
      onEditRoute: handleEditRoute,
    });
  };

  const handleDeleteRoute = (id) => {
    setMyRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEditRoute = (updatedRoute) => {
    setMyRoutes((prev) => {
      const idx = prev.findIndex((r) => r.id === updatedRoute.id);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy[idx] = updatedRoute;
      return copy;
    });
  };

  const handleAddRoute = (newRoute) => {
    setMyRoutes((prev) => [...prev, newRoute]);
  };

  const goToAddRoute = () => {
    navigation.navigate('AddRouteStep1', {
      onAddRoute: handleAddRoute,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My day</Text>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            {myRoutes.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.routeCard}
                onPress={() => goToRouteDetails(r)}
              >
                <Image source={r.mainImage} style={styles.routeImage} />
                <Text style={styles.routeName}>{r.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={goToAddRoute}>
            <Text style={styles.addButtonText}>Add  +</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/** ===== 2) Екран RouteDetails ===== */
export function RouteDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeItem, onDeleteRoute, onEditRoute } = route.params;
  const [data, setData] = useState({ ...routeItem });

  const handleDelete = () => {
    onDeleteRoute?.(data.id);
    navigation.popToTop();
  };

  const handleEdit = () => {
    navigation.navigate('AddRouteStep1', {
      existingRoute: data,
      onEditRoute,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.detailsContainer, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.bigImageWrapper}>
            <Image source={data.mainImage} style={styles.bigImage} />
            <TouchableOpacity
              style={styles.backButtonOnImage}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../assets/arrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editOnImage} onPress={handleEdit}>
              <Image
                source={require('../assets/mark.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.routeTitle}>{data.title}</Text>
            <Text style={styles.routeDate}>{data.date}</Text>
            <Text style={styles.routeDescription}>{data.description}</Text>
            <Text style={styles.sectionTitle}>Place</Text>
            {data.places.map((p) => (
              <View key={p.id} style={styles.placeItem}>
                <Image source={p.image} style={styles.placeIcon} />
                <Text style={styles.placeText}>{p.name}</Text>
              </View>
            ))}
            {data.images.length > 0 && (
              <View style={styles.imagesRow}>
                {data.images.map((img, idx) => (
                  <Image key={idx} source={img} style={styles.smallImage} />
                ))}
              </View>
            )}
            {data.diary ? (
              <View style={styles.diaryContainer}>
                <Text style={styles.diaryText}>{data.diary}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.deleteButtonText}>Delete</Text>
              <Image source={require('../assets/bin.png')} style={styles.binIcon} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/** ===== 3) Екран AddRouteStep1 ===== */
export function AddRouteStep1() {
  const navigation = useNavigation();
  const route = useRoute();
  const { onAddRoute, existingRoute, onEditRoute } = route.params || {};
  const [title, setTitle] = useState(existingRoute?.title || '');
  const [date, setDate] = useState(existingRoute?.date || '');
  const [desc, setDesc] = useState(existingRoute?.description || '');
  const [mainImage, setMainImage] = useState(existingRoute?.mainImage || null);

  const allPlaces = PLACES_WITH_COORDS.map((p) => ({
    ...p,
    selected: existingRoute ? !!existingRoute.places.find((rp) => rp.id === p.id) : false,
  }));
  const [places, setPlaces] = useState(allPlaces);

  const goBack = () => navigation.goBack();

  const pickMainImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setMainImage({ uri: response.assets[0].uri });
      }
    });
  };

  const handleNext = () => {
    if (!mainImage) {
      Alert.alert('Ошибка', 'Главное фото обязательно для создания маршрута');
      return;
    }
    const selectedPlaces = places.filter((p) => p.selected);
    if (existingRoute) {
      const updatedRoute = {
        ...existingRoute,
        title,
        date,
        description: desc,
        places: selectedPlaces,
        mainImage,
      };
      navigation.navigate('AddRouteStep2', {
        routeData: updatedRoute,
        onEditRoute,
      });
    } else {
      const newRoute = {
        id: Date.now(),
        title,
        date,
        description: desc,
        places: selectedPlaces,
        images: [],
        diary: '',
        mainImage,
      };
      navigation.navigate('AddRouteStep2', {
        routeData: newRoute,
        onAddRoute,
      });
    }
  };

  const toggleSelectPlace = (id) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.addHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.addHeaderTitle}>Add route</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleNext}>
            <Image source={require('../assets/mark.png')} style={styles.saveIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <TouchableOpacity style={styles.imageSelector} onPress={pickMainImage}>
            {mainImage ? (
              <Image source={mainImage} style={styles.bigTopImage} />
            ) : (
              <Image
                source={require('../assets/gallery.png')}
                style={styles.bigTopImage}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            placeholderTextColor="#999"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={[styles.input, { height: 60 }]}
            multiline
            placeholder="Description"
            placeholderTextColor="#999"
            value={desc}
            onChangeText={setDesc}
          />
          <Text style={styles.sectionTitle}>Add a place to a route</Text>
          {places.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.placeSelectRow}
              onPress={() => toggleSelectPlace(p.id)}
            >
              <View style={styles.placeRowLeft}>
                <Image source={p.image} style={styles.placeIconSmall} />
                <Text style={styles.placeRowText}>{p.name}</Text>
              </View>
              <View style={[styles.circleCheck, p.selected && { backgroundColor: '#FFFFFF' }]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/** ===== 4) Екран AddRouteStep2 ===== */
export function AddRouteStep2() {
  const navigation = useNavigation();
  const route = useRoute();
  const { routeData, onAddRoute, onEditRoute } = route.params;
  const [notes, setNotes] = useState(routeData.diary || '');
  const [images, setImages] = useState(routeData.images || []);

  const goBack = () => navigation.goBack();

  const pickAdditionalImage = (index) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const newImage = { uri: response.assets[0].uri };
        if (typeof index === 'number') {
          setImages((prev) => {
            const copy = [...prev];
            copy[index] = newImage;
            return copy;
          });
        } else {
          setImages((prev) => [...prev, newImage]);
        }
      }
    });
  };

  const handleSave = () => {
    const updatedRoute = {
      ...routeData,
      diary: notes,
      images: images,
    };

    if (routeData.id && onEditRoute) {
      onEditRoute(updatedRoute);
    } else if (onAddRoute) {
      onAddRoute(updatedRoute);
    }
    navigation.popToTop();
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.addHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.addHeaderTitle}>Add route</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Image source={require('../assets/mark.png')} style={styles.saveIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <ScrollView horizontal contentContainerStyle={styles.photoRow} showsHorizontalScrollIndicator={false}>
            {images.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => pickAdditionalImage(index)}>
                <Image source={img} style={styles.additionalImage} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addImageButtonRow} onPress={() => pickAdditionalImage()}>
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>+</Text>
            </TouchableOpacity>
          </ScrollView>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="Notes"
            placeholderTextColor="#999"
            value={notes}
            onChangeText={setNotes}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default {
  MyDayList,
  RouteDetails,
  AddRouteStep1,
  AddRouteStep2,
};

// ===== Стили =====
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageSelector: {
    alignItems: 'center',
    marginBottom: 15,
  },
  bigTopImage: { 
    width: width * 0.8, 
    height: height * 0.3, 
    resizeMode: 'contain', 
    borderRadius: 25, 
    backgroundColor: CARD_BG, 
    padding: 10 
  },
  container: {
    flex: 1,
    
  },
  header: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  routeCard: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
  },
  routeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  routeName: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: MAIN_BG,
    fontSize: 18,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: MAIN_BG,
  },
  bigImageWrapper: {
    position: 'relative',
    width: '100%',
    height: height * 0.3,
  },
  bigImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButtonOnImage: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  editOnImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  infoContainer: {
    marginTop: -20,
    borderRadius: 30,
    backgroundColor: CARD_BG,
    paddingTop: 20,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    paddingBottom: 30,
  },
  routeTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  routeDate: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 6,
  },
  routeDescription: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  placeText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  imagesRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  smallImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
  },
  diaryContainer: {
    marginTop: 10,
    backgroundColor: MAIN_BG,
    borderRadius: 15,
    padding: 10,
  },
  diaryText: {
    color: '#FFF',
    fontSize: 14,
  },
  deleteButton: {
    margin: 20,
    backgroundColor: '#FF0000',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  binIcon: {
    paddingLeft: 5,
    width: 17,
    height: 17,
    tintColor: '#FFF',
  },
  addHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addHeaderTitle: {
    flex: 1,
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFF',
  },
  uploadBlock: {
    width: width * 0.7,
    height: width * 0.5,
    backgroundColor: CARD_BG,
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  uploadImage: {
    width: 80,
    height: 80,
    tintColor: '#FFF',
  },
  input: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    color: '#FFF',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    height: 45,
  },
  placeSelectRow: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
  },
  placeRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  placeIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 8,
  },
  placeRowText: {
    color: '#FFF',
    fontSize: 15,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  circleCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  photoRow: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  additionalImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    resizeMode: 'cover',
  },
  addImageButtonRow: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: CARD_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

