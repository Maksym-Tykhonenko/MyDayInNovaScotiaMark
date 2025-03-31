import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
const BLUE_BG = '#143468';
const CARD_BG = '#2C6BC7';
const WHITE_TRANSPARENT = 'rgba(255,255,255,0.5)';
const STAR_COLOR = '#FFCC00';
const TEXT_COLOR = '#FFFFFF';
const GRAY_COLOR = '#999';

export default function PlaceDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { place } = route.params;
  
  // Стан для відгуків та інших даних
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [userRating, setUserRating] = useState(0);
  
  // Стан для "улюбленості"
  const [isFavorite, setIsFavorite] = useState(place.favorite || false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await AsyncStorage.getItem(`reviews-${place.id}`);
      if (data) {
        setReviews(JSON.parse(data));
      } else {
        setReviews(place.defaultReviews || []);
      }
    } catch (error) {
      console.log('AsyncStorage load error:', error);
    }
  };

  const saveReviews = async (newReviews) => {
    try {
      await AsyncStorage.setItem(`reviews-${place.id}`, JSON.stringify(newReviews));
    } catch (error) {
      console.log('AsyncStorage save error:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) return;
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const addReview = async () => {
    if (!comment.trim() && !photo) return;
    const newReview = {
      user: 'You',
      rating: userRating || 5,
      text: comment.trim(),
      photo: photo || null,
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setComment('');
    setPhoto(null);
    setUserRating(0);
    await saveReviews(updatedReviews);
  };

  const toggleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
  
    if (route.params.onToggleFavorite) {
      route.params.onToggleFavorite(place.id, newFavorite);
    }
  
    try {
      AsyncStorage.setItem(`favorite-${place.id}`, JSON.stringify(newFavorite));
    } catch (error) {
      console.log('AsyncStorage favorite error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.imageWrapper}>
            <Image source={place.image} style={styles.topImage} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.heartButtonTop,
                isFavorite && { backgroundColor: '#FFD700' },
              ]}
              onPress={toggleFavorite}
            >
              <Image
                source={require('../assets/heart.png')}
                style={[
                  styles.heartIconTop,
                  isFavorite && { tintColor: '#333' },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.placeTitle}>{place.name}</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingNumber}>{place.rating.toFixed(1)}</Text>
                <Text style={styles.ratingStars}>★ ★ ★ ★ ★</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../assets/time.png')} style={styles.iconSmall} />
                <Text style={styles.infoText}>{place.schedule}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../assets/pin.png')} style={styles.iconSmall} />
                <Text style={styles.infoText}>{place.address}</Text>
              </View>
              <Text style={styles.descriptionText}>{place.description}</Text>
            </View>
          </View>
          <View style={styles.mainContainer1}>
            <View style={styles.reviewsContainer}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.reviewsInner}>
                {reviews.map((rev, index) => (
                  <View key={index} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewUser}>{rev.user}</Text>
                      <Text style={styles.reviewRating}>{'★'.repeat(rev.rating)}</Text>
                    </View>
                    {rev.photo && (
                      <Image source={{ uri: rev.photo }} style={styles.reviewPhoto} />
                    )}
                    <Text style={styles.reviewText}>{rev.text}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setUserRating(star)}
                    style={styles.starTouch}
                  >
                    <Text style={[styles.starPick, { color: star <= userRating ? STAR_COLOR : GRAY_COLOR }]}>
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.addCommentBox}>
                {photo && <Image source={{ uri: photo }} style={styles.previewPhoto} />}
                <View style={styles.commentRow}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Leave review..."
                    placeholderTextColor={GRAY_COLOR}
                    value={comment}
                    onChangeText={setComment}
                  />
                  <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                    <Image source={require('../assets/gallery.png')} style={styles.iconGallery} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sendButton} onPress={addReview}>
                    <Image source={require('../assets/send.png')} style={styles.iconSend} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>        
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
  scroll: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.35,
    position: 'relative',
    marginBottom: 5,
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE_TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
  heartButtonTop: {
    position: 'absolute',
    top: 30,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE_TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIconTop: {
    width: 22,
    height: 22,
    tintColor: TEXT_COLOR,
  },
  mainContainer: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: CARD_BG,
    marginTop: -20,
    marginHorizontal: 8,
    padding: 10,
  },
  mainContainer1: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: CARD_BG,
    marginTop: -10,
    marginHorizontal: 8,
    padding: 10,
  },
  descriptionContainer: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  placeTitle: {
    fontSize: 22,
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingNumber: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginRight: 6,
  },
  ratingStars: {
    fontSize: 16,
    color: STAR_COLOR,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconSmall: {
    width: 16,
    height: 16,
    tintColor: TEXT_COLOR,
    marginRight: 5,
  },
  infoText: {
    color: TEXT_COLOR,
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 14,
    color: TEXT_COLOR,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewsContainer: {
    backgroundColor: BLUE_BG,
    borderRadius: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewsInner: {
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewUser: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  reviewRating: {
    fontSize: 14,
    color: STAR_COLOR,
  },
  reviewText: {
    color: TEXT_COLOR,
    marginTop: 2,
    marginBottom: 6,
  },
  reviewPhoto: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  starTouch: {
    marginHorizontal: 2,
  },
  starPick: {
    fontSize: 26,
  },
  addCommentBox: {
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 8,
  },
  previewPhoto: {
    width: 120,
    height: 90,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 8,
    resizeMode: 'cover',
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE_BG,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  commentInput: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 14,
    marginRight: 6,
  },
  photoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: WHITE_TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  iconGallery: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: WHITE_TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
});

