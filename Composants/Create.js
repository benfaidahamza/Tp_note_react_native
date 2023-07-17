import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, LIVRES } from '../models/data';

const Create = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tomes, setTomes] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const { colors } = useTheme();

  const handleCreate = () => {
    if (!titre || !description || !categorie || !tomes || !imageUrl) {
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

    // Clear form fields
    setTitre('');
    setDescription('');
    setCategorie('');
    setTomes('');
    setEnCours(false);
    setImageUrl('');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Titre"
          placeholderTextColor={colors.text}
          value={titre}
          onChangeText={setTitre}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Description"
          placeholderTextColor={colors.text}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => console.log('Open dropdown')} // TODO: Handle dropdown open
        >
          <Text style={[styles.dropdownButtonText, { color: colors.text }]}>
            {categorie ? CATEGORIES.find((cat) => cat.id === categorie)?.genre : 'Sélectionner une catégorie'}
          </Text>
          <Ionicons name="chevron-down" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Nombre de tomes"
          placeholderTextColor={colors.text}
          value={tomes}
          onChangeText={setTomes}
          keyboardType="numeric"
        />
      </View>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="URL de l'image"
          placeholderTextColor={colors.text}
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>
      <Button title="Créer" onPress={handleCreate} color={colors.primary} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  dropdownContainer: {
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
