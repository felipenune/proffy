import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoriteResponse = JSON.parse(response);

        setFavorites(favoriteResponse);
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  return (
    <View style={styles.container}>
      <Header title="Meus proffys favoritos" />

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited
          />
        ))}        
      </ScrollView>
    </View>
  );
}

export default Favorites;