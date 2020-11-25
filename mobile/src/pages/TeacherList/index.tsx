import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons'

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: number,
  name: string,
  subject: string,
  whats: string
}

const TeacherList: React.FC = () => {
  const [filters, setFilters] = useState(true);

  const [favorites, setFavorites] = useState<number[]>([])

  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoriteResponse = JSON.parse(response);
        const favoriteIds = favoriteResponse.map((teacher: Teacher) => {
          return teacher.id;
        })

        setFavorites(favoriteIds);
      }
    })
  }

  function handleTogleFilter() {
    setFilters(!filters);
  }

  async function handleSubmit() {
    loadFavorites();
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)

    setFilters(false);    
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleTogleFilter}>
            <Feather name="filter" size={25} color="#fff" />
          </BorderlessButton>
        )}
      >
        {filters && (
          <View style={styles.search} >
            <Text style={styles.label} >Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
            />

            <View style={styles.inputGroup} >
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock} >
                <Text style={styles.label} >Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                />
              </View>
            </View>

            <RectButton onPress={handleSubmit} style={styles.submitButton} >
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </Header>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher} 
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default TeacherList;