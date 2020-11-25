import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import bgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClass: React.FC = () => {
  const { goBack } = useNavigation();

  function handleNavigate() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.content} resizeMode="contain" >
        <Text style={styles.title} >Quer ser um proffy?</Text>
        <Text style={styles.description} >
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton style={styles.button} onPress={handleNavigate} >
        <Text style={styles.buttonText} >Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClass;