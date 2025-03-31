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
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import { useAudio } from './AudioContext';   
import { useVibration } from './VibrationContext'; 

const { width, height } = Dimensions.get('window');

const BLUE_BG = '#143468';
const CARD_BG = '#2C6BC7';
const WHITE_TRANSPARENT = 'rgba(255,255,255,0.5)';
const STAR_COLOR = '#FFCC00';
const TEXT_COLOR = '#FFFFFF';
const GRAY_COLOR = '#999';

const Settings = ({ navigation }) => {
  const { isMusicPlaying, setIsMusicPlaying, volume, setVolume } = useAudio();
  const { vibrationOn, setVibrationOn } = useVibration();
  const [localVolume, setLocalVolume] = useState(volume);

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const handleVolumeChange = (change) => {
    const newVolume = Math.max(0, Math.min(1, localVolume + change));
    setLocalVolume(newVolume);
    setVolume(newVolume);
  };

  useEffect(() => {
    setVolume(localVolume);
  }, [localVolume, setVolume]);

  const submitRating = () => {
    setRatingModalVisible(false);
    Alert.alert('Thank you!', 'Thank you for your feedback!');
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Settings</Text>
            <Image
              source={require('../assets/settingslog.png')}
              style={styles.icon}
            />

            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => {
                setRating(0);
                setRatingModalVisible(true);
              }}
            >
              <Text style={styles.rateButtonText}>Rate us!</Text>
            </TouchableOpacity>

            <View style={styles.settingsBlock}>
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Turn Music On/Off</Text>
                <TouchableOpacity onPress={() => setIsMusicPlaying(!isMusicPlaying)}>
                  <Text style={styles.settingItemText}>
                    {isMusicPlaying ? 'On' : 'Off'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>
                  Music Volume: {Math.round(localVolume * 100)}%
                </Text>
                <View style={styles.volumeControls}>
                  <TouchableOpacity
                    onPress={() => handleVolumeChange(-0.1)}
                    style={styles.volumeButton}
                  >
                    <Text style={styles.volumeButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleVolumeChange(0.1)}
                    style={styles.volumeButton}
                  >
                    <Text style={styles.volumeButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Enable Vibration</Text>
                <TouchableOpacity onPress={() => setVibrationOn(!vibrationOn)}>
                  <Text style={styles.settingItemText}>
                    {vibrationOn ? 'On' : 'Off'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.listButton}
              onPress={() =>
                Alert.alert(
                  'Developer Website',
                  'This feature will be available in future versions.'
                )
              }
            >
              <Text style={styles.listButtonText}>Developer Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listButton}
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'This feature will be available in future versions.'
                )
              }
            >
              <Text style={styles.listButtonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listButton}
              onPress={() =>
                Alert.alert(
                  'Terms of Use',
                  'This feature will be available in future versions.'
                )
              }
            >
              <Text style={styles.listButtonText}>Terms of Use</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.exitButton}
            >
              <Text style={styles.exitButtonText}>Return to Menu</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={ratingModalVisible}
          onRequestClose={() => setRatingModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Rate Us</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                  >
                    <Text style={styles.star}>
                      {star <= rating ? '★' : '☆'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={submitRating}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  container: {
    flex: 1,
    paddingHorizontal: width * 0.01,
  },
  scrollContainer: {
    paddingBottom: height * 0.03,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  icon: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginVertical: height * 0.02,
  },
  rateButton: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  rateButtonText: {
    fontSize: width * 0.05,
    color: '#0C2A47',
    fontWeight: '600',
  },
  settingsBlock: {
    width: '90%',
    backgroundColor: '#1E3D66',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.02,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  settingItemText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 10,
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.02,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.01,
  },
  volumeButtonText: {
    fontSize: width * 0.07,
    color: '#0C2A47',
    fontWeight: 'bold',
  },
  listButton: {
    width: '90%',
    backgroundColor: '#1E3D66',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    justifyContent: 'center',
  },
  listButtonText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  exitButton: {
    width: '90%',
    backgroundColor: '#344E71',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  exitButtonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#FFD700',
  },
  modalButton: {
    backgroundColor: '#0C2A47',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Settings;
