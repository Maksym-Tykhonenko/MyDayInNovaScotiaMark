// Event.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const MAIN_BG = '#143468';
const CARD_BG = '#2C6BC7';
const TEXT_COLOR = '#FFFFFF';
const TRANSPARENT_WHITE = 'rgba(255,255,255,0.5)';

const EVENTS_DATA = [
  {
    id: 1,
    name: 'Royal Nova Scotia International Tattoo',
    date: 'Friday, November 15 – Thursday, November 21',
    address: 'Spring Garden Road South Park St, Halifax, Nova Scotia B3J 3S9',
    description: `The Royal Nova Scotia International Tattoo is a show inspired by Military Tattoos given by military bands and display teams. It has taken place annually in the capital of Nova Scotia, Halifax since 1979. It is currently held in the Halifax Scotiabank Centre.

The Royal Nova Scotia International Tattoo is unique among other Tattoos in the world in that it is more theatrical in nature with a mixture of both military and civilian performers.
It takes place in the Scotiabank Centre arena, a venue that, to some degree, resembles a traditional theatre in the round. The show is heavily costumed and intensively rehearsed with technical staff, choreographers, assistant directors, wardrobe staff and designers as part of the production team, which also sets it apart from traditional Tattoos.`,
    ticketsInfo: "No official ticket detail was given besides the date range. Possibly see website for more info.",
    image: require('../assets/photo102.jpeg'),
    favorite: false,
    subscribed: false,
  },
  {
    id: 2,
    name: 'Halifax Curling Club',
    date: 'Feb 28–Mar 2, 2025',
    address: '948 South Bland St, Halifax, Nova Scotia B3H 2S5',
    description: `The Halifax Curling Club, founded in 1824, is one of the oldest active curling clubs in Canada. It has four specially equipped ice pads and is located at 948 South Bland Street. In 1874, they became the first club to build an indoor building in Nova Scotia. 
The building was located on Tower Road, but was later sold in 1892. In 1899, a new building was built on South Bland Street. This new stadium hosted the first official match between Scotland and Canada, in which the Scots won 84:78. In 1974, the club was rebuilt due to a fire. In 1928, the Halifax Curling Club became the first facility in Nova Scotia with artificial ice.`,
    ticketsInfo: "REGISTRATION OPENING THURSDAY DEC 12 AT NOON.",
    image: require('../assets/photo101.jpeg'),
    favorite: false,
    subscribed: false,
  },
  {
    id: 3,
    name: 'Hebron Baptist Church',
    date: 'Worship on Sundays, 9:30 a.m.',
    address: '21 Hillside Dr, Hebron, Nova Scotia B5A 5Z6',
    description: `Hebron began as a small town church in 1842. At the time, the congregation was no larger than a few families. Hebron was rebuilt in the 1970s to accommodate the somewhat larger town. The church had several pastors before 1978 when Larry Wynn took up the post. 
In 1998, it founded the Hebron Christian Academy. In March 2006, the church dedicated a new 4000-seat Worship Center. In 2011, Kevin Miller accepted the call to serve as Senior Pastor. In 2017, Dr. Landon Dowden became the new senior pastor. In 2018, it claimed a membership of 8,000 people.`,
    ticketsInfo: "Register online on the website",
    image: require('../assets/photo104.jpeg'),
    favorite: false,
    subscribed: false,
  },
  {
    id: 4,
    name: 'Nova Scotia in colors',
    date: 'September 20–22, 2025',
    address: '1683 Barrington St, Halifax, Nova Scotia B3J 2S9',
    description: `Join us at the unique Nova Scotia in Colors Cultural Festival, which will showcase our region's rich cultural heritage through art, music, dance, and cuisine.
Arts and Crafts: Explore the work of local artists, craftspeople, and designers. 
Musical performances: Immerse yourself in the atmosphere of music with live performances by local musicians and ensembles.Dancing and Performances: Enjoy traditional dances and cultural performances.
Culinary treats: A variety of dishes and drinks will allow you to immerse yourself in culture through taste.`,
    ticketsInfo: `Admission to the festival is $10/person.
Tickets can be purchased online on the website or at the entrance to the event.`,
    image: require('../assets/photo105.jpeg'),
    favorite: false,
    subscribed: false,
  },
];

/** ==================
 *  1) Список событий (EventsList)
 * ================== */
export function EventsList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState(EVENTS_DATA);

  const goToEventDetails = (eventItem) => {
    navigation.navigate('EventDetails', {
      eventItem,
      onToggleFavorite: toggleFavoriteInList,
    });
  };

  const toggleFavoriteInList = (id) => {
    setEvents((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((ev) => ev.id === id);
      if (idx === -1) return prev;
      const newItem = { ...updated[idx], favorite: !updated[idx].favorite };
      updated[idx] = newItem;
      if (updated[idx].favorite) {
        const [fav] = updated.splice(idx, 1);
        updated.unshift(fav);
      } else {
        const [unfav] = updated.splice(idx, 1);
        updated.push(unfav);
      }
      return updated;
    });
  };

  const goToFavoritesEvents = () => {
    const favoriteEvents = events.filter((ev) => ev.favorite);
    navigation.navigate('FavoritesEvents', {
      favoriteEvents,
      onToggleFavorite: toggleFavoriteInList,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Шапка */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Events</Text>
            <TouchableOpacity style={styles.headerHeart} onPress={goToFavoritesEvents}>
              <Image
                source={require('../assets/heart.png')}
                style={styles.headerHeartIcon}
              />
            </TouchableOpacity>
          </View>
          {/* Список карточек */}
          <View style={{ marginHorizontal: 10 }}>
            {events.map((ev) => (
              <TouchableOpacity
                key={ev.id}
                style={styles.eventCard}
                onPress={() => goToEventDetails(ev)}
              >
                <Image source={ev.image} style={styles.eventImage} />
                <Text style={styles.eventName}>{ev.name}</Text>
                {/* Сердце в карточке */}
                <TouchableOpacity
                  style={[styles.favButton, ev.favorite && { backgroundColor: '#FFD700' }]}
                  onPress={() => toggleFavoriteInList(ev.id)}
                >
                  <Image
                    source={require('../assets/heart.png')}
                    style={[styles.favIcon, ev.favorite && { tintColor: '#333' }]}
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

/** ===============================
 *  2) Детальный экран EventDetails
 * =============================== */
export function EventDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventItem, onToggleFavorite } = route.params;

  const [isFavorite, setIsFavorite] = useState(eventItem.favorite);
  const [subscribed, setSubscribed] = useState(eventItem.subscribed);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(eventItem.id);
  };

  const toggleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.detailsContainer, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Обёртка для картинки */}
          <View style={styles.imageWrapper}>
            <Image source={eventItem.image} style={styles.detailsImage} />
            <TouchableOpacity
              style={styles.backButtonOnImage}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../assets/arrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartOnImage}
              onPress={toggleFavorite}
            >
              <Image
                source={require('../assets/heart.png')}
                style={[
                  styles.topHeartIcon,
                  isFavorite && { tintColor: '#FFD700' },
                ]}
              />
            </TouchableOpacity>
          </View>
          {/* Информация */}
          <View style={styles.infoContainer}>
            <Text style={styles.detailsTitle}>{eventItem.name}</Text>
            <Text style={styles.detailsDate}>{eventItem.date}</Text>
            <Text style={styles.detailsAddress}>{eventItem.address}</Text>
            <Text style={styles.detailsDescription}>{eventItem.description}</Text>
            <Text style={styles.sectionTitle}>Tickets</Text>
            <Text style={styles.detailsTickets}>{eventItem.ticketsInfo}</Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={toggleSubscribe}
            >
              <Text style={styles.subscribeText}>
                {subscribed ? 'Unsubscribe -' : 'Subscribe +'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

/** =======================================
 *  3) Экран для отображения избранных событий (FavoritesEventsScreen)
 * ======================================= */
export function FavoritesEventsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { favoriteEvents, onToggleFavorite } = route.params;
  const [favEvents, setFavEvents] = useState(favoriteEvents);

  const goToEventDetails = (eventItem) => {
    navigation.navigate('EventDetails', {
      eventItem,
      onToggleFavorite: handleToggleFavoriteInFavs,
    });
  };

  const handleToggleFavoriteInFavs = (id) => {
    onToggleFavorite(id);
    setFavEvents((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((ev) => ev.id === id);
      if (idx === -1) return prev;
      updated[idx].favorite = !updated[idx].favorite;
      if (!updated[idx].favorite) {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Заголовок */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Favorite Events</Text>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            {favEvents.length === 0 && (
              <Text style={{ color: TEXT_COLOR, textAlign: 'center', marginTop: 20 }}>
                No favorite events yet.
              </Text>
            )}
            {favEvents.map((ev) => (
              <TouchableOpacity
                key={ev.id}
                style={styles.eventCard}
                onPress={() => goToEventDetails(ev)}
              >
                <Image source={ev.image} style={styles.eventImage} />
                <Text style={styles.eventName}>{ev.name}</Text>
                <TouchableOpacity
                  style={[
                    styles.favButton,
                    ev.favorite && { backgroundColor: '#FFD700' },
                  ]}
                  onPress={() => handleToggleFavoriteInFavs(ev.id)}
                >
                  <Image
                    source={require('../assets/heart.png')}
                    style={[
                      styles.favIcon,
                      ev.favorite && { tintColor: '#333' },
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

export default {
  EventsList,
  EventDetails,
  FavoritesEventsScreen,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: MAIN_BG, // використовуйте 'transparent' у компонентах, де потрібно бачити фон
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
    fontSize: 26,
    color: TEXT_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -20,
  },
  headerHeart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerHeartIcon: {
    width: 22,
    height: 22,
    tintColor: TEXT_COLOR,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    marginBottom: 15,
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 10,
  },
  eventName: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 18,
    fontWeight: '600',
  },
  favButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    width: 20,
    height: 20,
    tintColor: TEXT_COLOR,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: MAIN_BG,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
    marginBottom: -20,
  },
  detailsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  backButtonOnImage: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartOnImage: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFF',
  },
  topHeartIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  infoContainer: {
    borderRadius: 30,
    backgroundColor: CARD_BG,
    paddingTop: 20,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    paddingBottom: 30,
  },
  detailsTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detailsDate: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
  },
  detailsAddress: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 12,
  },
  detailsDescription: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsTickets: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 15,
  },
  subscribeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  subscribeText: {
    color: MAIN_BG,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
