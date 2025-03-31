// CustomTabBar.js

import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAIN_BG = '#143468';
const ACTIVE_BG = '#FFFFFF';
const INACTIVE_BG = '#143468';
const TAB_BAR_BG = '#1F51A4';
const ICON_COLOR = '#FFFFFF';
const ACTIVE_ICON_COLOR = '#1F51A4';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }, { paddingBottom:12,}]}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          let iconSource;
          if (route.name === 'MenuTab') {
            iconSource = require('../assets/pin.png');
          } else if (route.name === 'EventsTab') {
            iconSource = require('../assets/check.png');
          } else if (route.name === 'MyDayTab') {
            iconSource = require('../assets/calendar.png');
          } else {
            iconSource = require('../assets/gear.png');
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const buttonStyle = isFocused ? styles.activeTabItem : styles.tabItem;
          const iconTint = isFocused ? ACTIVE_ICON_COLOR : ICON_COLOR;

          return (
            <TouchableOpacity
              key={route.key}
              style={buttonStyle}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <Image
                source={iconSource}
                style={[styles.tabIcon, { tintColor: iconTint } , ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: MAIN_BG,
    alignItems: 'center',
    padding:14,
    
    
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: TAB_BAR_BG,
    borderRadius: 40,
    height: 70,
    width: width * 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: -5,
   
  },
  tabItem: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: INACTIVE_BG,
    alignItems: 'center',
    justifyContent: 'center',

    
    
  },
  activeTabItem: {
    backgroundColor: ACTIVE_BG,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tabIcon: {
    width: 24,
    height: 24,
    
  },
});