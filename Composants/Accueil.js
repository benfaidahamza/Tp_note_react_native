import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Accueil = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/home.png')}
        style={styles.image}
      />
      <Text style={[styles.title, { color: colors.text }]}>Bienvenue sur notre application !</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>La simplicité fait la beauté.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '75%',
    height: '80%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Accueil;
