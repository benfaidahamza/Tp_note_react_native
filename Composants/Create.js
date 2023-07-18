import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LIVRES ,CATEGORIES} from '../models/data';
import CreateCategorie from './CreateCategorie';

const Create = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tomes, setTomes] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTitreValid, setIsTitreValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isTomesValid, setIsTomesValid] = useState(true);
  const [isCategorieValid, setIsCategorieValid] = useState(true);
  const [isImageUrlValid, setIsImageUrlValid] = useState(true);
  const { colors } = useTheme();

  const handleCreate = () => {
    if (!titre || !description || !categorie || !tomes || !imageUrl) {
      if (!titre) setIsTitreValid(false);
      if (!description) setIsDescriptionValid(false);
      if (!categorie) setIsCategorieValid(false);
      if (!tomes) setIsTomesValid(false);
      if (!imageUrl) setIsImageUrlValid(false);
      return;
    }

    const newLivre = {
      id: LIVRES.length + 1,
      titre,
      description,
      categorieId: [categorie],
      tomes,
      enCours,
      imageUrl,
    };

    LIVRES.push(newLivre);
    setTitre('');
    setDescription('');
    setCategorie('');
    setTomes('');
    setEnCours(false);
    setImageUrl('');
    setIsTitreValid(true);
    setIsDescriptionValid(true);
    setIsCategorieValid(true);
    setIsTomesValid(true);
    setIsImageUrlValid(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = (categoryId) => {
    setCategorie(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Créer un livre</Text>
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            !isTitreValid && { borderColor: 'red' }
          ]}
          placeholder="Titre"
          placeholderTextColor={colors.text}
          value={titre}
          onChangeText={setTitre}
        />
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            !isDescriptionValid && { borderColor: 'red' }
          ]}
          placeholder="Description"
          placeholderTextColor={colors.text}
          value={description}
          onChangeText={setDescription}
        />
      <View style={[styles.dropdown, { backgroundColor: isCategorieValid ? colors.card : 'red' }]}>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: isCategorieValid ? colors.card : 'red' }]}
          onPress={toggleDropdown}
        >
          <Text style={[styles.dropdownButtonText, { color: colors.text }]}>
            {categorie ? CATEGORIES.find((cat) => cat.id === categorie)?.genre : 'Sélectionner une catégorie'}
          </Text>
          <Ionicons name="chevron-down" size={24} color={colors.text} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={[styles.dropdownOptions, { backgroundColor: isCategorieValid ? colors.card : 'red' }]}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.dropdownOption}
                onPress={() => handleOptionPress(cat.id)}
              >
                <Text style={[styles.dropdownOptionText, { color: colors.text }]}>{cat.genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        </View>
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            !isTomesValid && { borderColor: 'red' }
          ]}
          placeholder="Nombre de tomes"
          placeholderTextColor={colors.text}
          value={tomes}
          onChangeText={setTomes}
          keyboardType="numeric"
        />
        <View style={styles.checkboxContainer}>
          <Text style={[styles.checkboxLabel, { color: colors.text }]}>En cours :</Text>
          <TouchableOpacity style={styles.checkboxButton} onPress={() => setEnCours(!enCours)}>
            {enCours ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="close-circle" size={24} color="red" />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            !isImageUrlValid && { borderColor: 'red' }
          ]}
          placeholder="URL de l'image"
          placeholderTextColor={colors.text}
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <Button title="Créer" onPress={handleCreate} color={colors.primary} />
      </View>
      <CreateCategorie/>
    </ScrollView>
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
  dropdown: {
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  dropdownButtonText: {
    flex: 1,
    marginRight: 10,
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
  },
  dropdownOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  checkboxButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
});

export default Create;
