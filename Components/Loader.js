import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  Easing,
  ImageBackground,
} from 'react-native';

const Loader = ({ onEnd }) => {
  const appearingAnim = useRef(new Animated.Value(0)).current;    
  const disappearingAnim = useRef(new Animated.Value(1)).current; 
  const rotateAnim = useRef(new Animated.Value(0)).current;       

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      Animated.timing(disappearingAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => onEnd && onEnd());
    }, 6000);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Количество линий (лучей)
  const linesCount = 12;
  const linesArray = [...Array(linesCount).keys()];

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View style={[styles.overlay, { opacity: disappearingAnim }]}>
        <Animated.Image
          source={require('../assets/Logo.png')}
          style={[
            styles.logo,
            {
              opacity: appearingAnim,
              transform: [{ scale: appearingAnim }],
            },
          ]}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.spinnerContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          {linesArray.map((_, i) => (
            <View
              key={i}
              style={[
                styles.spinnerLine,
                {
                  transform: [
                    { translateX: -1 },
                    { rotate: `${(360 / linesCount) * i}deg` },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    aspectRatio: 1.5,
    marginBottom: 60,
  },
  spinnerContainer: {
    width: 40,
    height: 40,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerLine: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    left: '50%',
    top: 0,
  },
});
