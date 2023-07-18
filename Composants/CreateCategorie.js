import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CATEGORIES } from '../models/data';

const COLOR_OPTIONS = [
  '#FF0000', 
  '#00FF00', 
  '#0000FF', 
  '#FFFF00', 
  '#FF00FF', 
  '#00FFFF'
];

const CreateCategorie = () => {
    const [genre, setGenre] = useState('');
    const [couleur, setCouleur] = useState(COLOR_OPTIONS[0]);
    const [isValid, setIsValid] = useState(true);
  
    const { colors } = useTheme();
  
    const handleCreateCategorie = () => {
      if (!genre || !couleur) {
        setIsValid(false);
        return;
      }
  
      const newCategorie = {
        id: CATEGORIES.length + 1,
        genre,
        couleur,
      };
  
      CATEGORIES.push(newCategorie);
      setGenre('');
      setCouleur(COLOR_OPTIONS[0]);
      setIsValid(true);
    };
  
    const handleColorChange = (newColor) => {
      setCouleur(newColor);
    };
  
    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Créer une catégorie</Text>
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
          <TextInput
            style={[
              styles.input,
              { color: colors.text },
              !isValid && { borderColor: 'red' }
            ]}
            placeholder="Genre"
            placeholderTextColor={colors.text}
            value={genre}
            onChangeText={setGenre}
          />
          <Text style={[styles.colorPickerLabel, { color: colors.text }]}>Couleur :</Text>
          <View style={styles.colorPickerContainer}>
            {COLOR_OPTIONS.map((optionColor) => (
              <TouchableOpacity
                key={optionColor}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: optionColor,
                    borderColor: optionColor === couleur ? '#000000' : '#FFFFFF',
                  },
                ]}
                onPress={() => handleColorChange(optionColor)}
              />
            ))}
          </View>
          <Button title="Créer" onPress={handleCreateCategorie} color={colors.primary} />
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    formContainer: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 10,
      borderWidth: 1,
      marginBottom: 10,
    },
    colorPickerLabel: {
      fontSize: 16,
      marginBottom: 10,
    },
    colorPickerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
      marginLeft:14
    },
    colorOption: {
      width: 40,
      height: 40,
      borderWidth: 2,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
    },
  });
  
  export default CreateCategorie;
  