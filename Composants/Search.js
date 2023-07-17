import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LIVRES , CATEGORIES} from '../models/data';
import { useTheme } from '@react-navigation/native';

const SearchBar = ({ onSearch }) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === '') {
      return;
    }

    onSearch(searchText);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Rechercher un livre par titre"
        placeholderTextColor={colors.text}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        style={[styles.searchButton, { backgroundColor: colors.primary }]}
        onPress={handleSearch}
      >
        <Ionicons name="search" size={24} color={colors.buttonText} />
      </TouchableOpacity>
      {searchText.trim() === '' && (
        <Text style={[styles.errorMessage]}>
          Veuillez entrer un titre de livre.
        </Text>
      )}
    </View>
  );
};

const ResultItem = ({ livre }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.resultItemContainer, { backgroundColor: colors.card }]}>
      <Image source={{ uri: livre.imageUrl }} style={styles.resultItemImage} />
      <View style={styles.resultItemInfo}>
        <Text style={[styles.resultItemTitle, { color: colors.text }]}>{livre.titre}</Text>
                <Text style={[styles.resultItemDescription, { color: colors.text }]}>
          {livre.description}
        </Text>
              <Text style={[styles.modalDescription, { color: colors.text }]}>
                Tomes: {livre.tomes}
              </Text>
              <Text style={[styles.livreDescription, { color: colors.text }]}>
                En cours: {livre.enCours ? (
                    <Ionicons name="checkmark-circle" size={16} color="green" />
                ) : (
                    <Ionicons name="close-circle" size={16} color="red" />
                )}
              </Text>
        <View style={styles.resultItemCategories}>
          {livre.categorieId.map((categoryId) => {
            const category = CATEGORIES.find((cat) => cat.id === categoryId);
            return (
              <Text
                key={category.id}
                style={[
                  styles.resultItemCategory,
                  { backgroundColor: category.couleur, color: colors.text },
                ]}
              >
                {category.genre}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const NotFound = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.notFoundContainer, { backgroundColor: colors.card }]}>
      <Ionicons name="alert-circle" size={64} color={'red'} />
      <Text style={[styles.notFoundText]}>Aucun livre trouvé</Text>
    </View>
  );
};

const SearchResults = ({ searchResults }) => {
  if (searchResults.length === 0) {
    return <NotFound />;
  }

  return (
    <View style={styles.resultsContainer}>
      {searchResults.map((livre) => (
        <ResultItem key={livre.id} livre={livre} />
      ))}
    </View>
  );
};

const Search = () => {
  const { colors } = useTheme();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchText) => {
    const results = LIVRES.filter((livre) =>
      livre.titre.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar onSearch={handleSearch} />
      <SearchResults searchResults={searchResults} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  searchButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-230,
    height:'100%'
  },
  resultItemImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  resultItemInfo: {
    flex: 1,
  },
  resultItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultItemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  resultItemCategories: {
    flexDirection: 'row',
    marginTop: 5,
  },
  resultItemCategory: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-400,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'red'
  },
  resultsContainer: {
    flex: 1,
  },
  errorMessage: {
    fontSize: 14,
    marginTop: 10,
    marginLeft:'20%',
    color:'red'
  },
});

export default Search;
