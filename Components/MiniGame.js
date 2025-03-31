import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const MAIN_BG = '#143468';   // Темно-синий фон всього екрану (буде використано, якщо потрібен запасний)
const BOX_BG = '#2C6BC7';    // Синий контейнер з округленими кутами
const CARD_BG = '#2C6BC7';   // Для полів вводу, якщо потрібно
const TEXT_COLOR = '#FFFFFF';
const TRANSPARENT_WHITE = 'rgba(255,255,255,0.5)';

export default function MiniGame() {
  const navigation = useNavigation();

  // Стан: 'intro' | 'quiz' | 'end'
  const [screenState, setScreenState] = useState('intro');

  const quizData = [
    {
      id: 1,
      image: require('../assets/photo1.png'),
      answer: 'Halifax Public Gardens',
    },
    {
      id: 2,
      image: require('../assets/photo2.jpeg'),
      answer: 'Cabot Trail',
    },
    {
      id: 3,
      image: require('../assets/photo101.jpeg'),
      answer: 'Hebron Baptist Church',
    },
    {
      id: 4,
      image: require('../assets/photo7.jpeg'),
      answer: 'Citadel of Halifax',
    },
    {
      id: 5,
      image: require('../assets/photo3.jpeg'),
      answer: 'Victoria Park',
    },
    {
      id: 6,
      image: require('../assets/photo102.jpeg'),
      answer: 'Royal Nova Scotia International Tattoo',
    },
    {
      id: 7,
      image: require('../assets/photo9.jpeg'),
      answer: 'Lone Shieling',
    },
    {
      id: 8,
      image: require('../assets/photo103.jpeg'),
      answer: 'Angus L. Macdonald Bridge',
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quizData[currentIndex];
  const correctAnswer = currentQuestion?.answer || '';

  const [userAnswer, setUserAnswer] = useState('');
  const [borderColor, setBorderColor] = useState(BOX_BG);

  const startGame = () => {
    setScreenState('quiz');
  };

  const checkAnswer = () => {
    const correct = correctAnswer.trim().toLowerCase();
    const user = userAnswer.trim().toLowerCase();
    if (correct === user) {
      setBorderColor('green');
      setTimeout(() => {
        goNextQuestion();
      }, 800);
    } else {
      setBorderColor('red');
    }
  };

  const goNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizData.length) {
      setCurrentIndex(nextIndex);
      setUserAnswer('');
      setBorderColor(BOX_BG);
    } else {
      setScreenState('end');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Шапка */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mini-game</Text>
        </View>

        {/* Екран заставки */}
        {screenState === 'intro' && (
          <View style={styles.introWrapper}>
            {/* Синій контейнер, всередині картинка 3D */}
            <View style={styles.blueBox}>
              <Image
                source={require('../assets/3dWorld.png')}
                style={styles.introImage}
              />
            </View>
            {/* Кнопка Start */}
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startText}>Start &gt;&gt;</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Екран вікторини */}
        {screenState === 'quiz' && (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>What's in the photo?</Text>
            <Image
              source={currentQuestion?.image}
              style={styles.quizImage}
            />
            <TextInput
              style={[styles.input, { borderColor }]}
              placeholder="Your answer..."
              placeholderTextColor="#999"
              value={userAnswer}
              onChangeText={(val) => {
                setUserAnswer(val);
                setBorderColor(BOX_BG);
              }}
            />
            <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
              <Image
                source={require('../assets/mark.png')}
                style={styles.checkIcon}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Екран завершення */}
        {screenState === 'end' && (
          <View style={styles.endContainer}>
            <View style={styles.blueBox}>
              <Image
                source={require('../assets/3dWorld.png')}
                style={styles.introImage}
              />
            </View>
            <Text style={styles.endText}>Congratulations!</Text>
            <TouchableOpacity
              style={styles.endBackButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.endBackText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        )}
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
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
    tintColor: TEXT_COLOR,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: TEXT_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 40,
  },
  // Intro styles
  introWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBox: {
    backgroundColor: CARD_BG,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    width: width * 0.8,
  },
  introImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  // Quiz styles
  quizContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    color: TEXT_COLOR,
    fontSize: 20,
    marginBottom: 15,
  },
  quizImage: {
    width: width * 0.85,
    height: height * 0.3,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  input: {
    width: width * 0.85,
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    color: TEXT_COLOR,
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 32,
    height: 32,
    tintColor: MAIN_BG,
  },
  // End styles
  endContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    fontSize: 24,
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  endBackButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  endBackText: {
    color: MAIN_BG,
    fontWeight: '600',
    fontSize: 16,
  },
});
