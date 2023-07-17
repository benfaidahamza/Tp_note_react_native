import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, LIVRES } from '../models/data';

const ListeLivres = () => {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLivre, setSelectedLivre] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderLivre = ({ item }) => {
    const categories = CATEGORIES.filter((cat) => item.categorieId.includes(cat.id));

    const handleLivrePress = () => {
      setSelectedLivre(item);
      setModalVisible(true);
    };

    const isBookInSelectedCategory = selectedCategory ? item.categorieId.includes(selectedCategory) : true;

    if (!isBookInSelectedCategory) {
      return null;
    }

    return (
      <TouchableOpacity onPress={handleLivrePress} style={[styles.livreContainer, { backgroundColor: colors.card }]}>
        <Image source={{ uri: item.imageUrl }} style={styles.livreImage} />
        <View style={styles.livreInfo}>
          <View style={styles.livreTextContainer}>
            <Text style={[styles.livreTitre, { color: colors.text }]}>{item.titre}</Text>
            <Text style={[styles.livreDescription, { color: colors.text }]}>
              Tomes: {item.tomes}
            </Text>
            <Text style={[styles.livreDescription, { color: colors.text }]}>
                En cours: {item.enCours ? (
                    <Ionicons name="checkmark-circle" size={16} color="green" />
                ) : (
                    <Ionicons name="close-circle" size={16} color="red" />
                )}
            </Text>
            <View style={styles.livreCategories}>
              {categories.map((cat) => (
                <Text
                  key={cat.id}
                  style={[
                    styles.livreCategorie,
                    { backgroundColor: cat.couleur, color: colors.text },
                  ]}
                >
                  {cat.genre}
                </Text>
              ))}
            </View>
          </View>
          <Ionicons name="eye" size={24} color={colors.primary} style={styles.eyeIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setSelectedLivre(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === null && styles.activeFilterButton]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.filterButtonText, selectedCategory === null && styles.activeFilterButtonText]}>
            Tous
          </Text>
        </TouchableOpacity>

        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterButton,
              selectedCategory === category.id && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === category.id && styles.activeFilterButtonText,
              ]}
            >
              {category.genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={LIVRES}
        renderItem={renderLivre}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          {selectedLivre && (
            <View>
              <Text style={[styles.modalTitre, { color: colors.text }]}>
                {selectedLivre.titre}
              </Text>
              <Text style={[styles.modalDescription, { color: colors.text }]}>
                Tomes: {selectedLivre.description}
              </Text>
              <Text style={[styles.modalDescription, { color: colors.text }]}>
                Tomes: {selectedLivre.tomes}
              </Text>
              <Text style={[styles.livreDescription, { color: colors.text }]}>
                En cours: {selectedLivre.enCours ? (
                    <Ionicons name="checkmark-circle" size={16} color="green" />
                ) : (
                    <Ionicons name="close-circle" size={16} color="red" />
                )}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
                <View style={styles.livreCategories}>
               {selectedLivre.categorieId.map((categoryId) => {
                  const category = CATEGORIES.find((cat) => cat.id === categoryId);
                  return (
                    <Text
                      key={category.id}
                      style={[
                        styles.livreCategorie,
                        { backgroundColor: category.couleur, color: colors.text },
                      ]}
                    >
                      {category.genre}
                    </Text>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  activeFilterButton: {
    backgroundColor: '#333333',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  livreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  livreImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  livreInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  livreTextContainer: {
    flex: 1,
  },
  livreTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  livreDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  livreCategories: {
    flexDirection: 'row',
    marginTop: 5,
  },
  livreCategorie: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 10,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -60,
    right: 0,
  },
  eyeIcon: { marginTop:-90, 
    marginRight: 10 },
});

export default ListeLivres;
