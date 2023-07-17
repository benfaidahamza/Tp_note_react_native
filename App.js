import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Accueil from './Composants/Accueil';
import ListeLivres from './Composants/ListeLivres';
import { lightTheme, darkTheme } from './Composants/theme';
import Search from './Composants/Search';
import Create from './Composants/Create';

const App = () => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;
  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;
  const customTheme = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <View style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Liste') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Create') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            }

            const iconColor = isDarkMode ? theme.activeIcon : color;

            return <Ionicons name={iconName} size={24} color={iconColor} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: isDarkMode ? theme.activeIcon : customTheme.colors.primary,
          inactiveTintColor: isDarkMode ? theme.inactiveIcon : customTheme.colors.text,
          style: {
            backgroundColor: customTheme.colors.card,
            flexDirection: 'row',
            justifyContent: 'center',
          },
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen name="Home" component={Accueil} />
        <Tab.Screen name="Liste" component={ListeLivres} />
        <Tab.Screen name="Create" component={Create} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.modeButton}>
          <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={24} color={isDarkMode ? theme.activeIcon : theme.inactiveIcon} />
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeButton: {
    position: 'absolute',
    top: 43,
    right: 10,
    padding: 10,
  },
});

export default App;
