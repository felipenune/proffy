import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClass from '../pages/GiveClass';
import TeacherTabs from './TeacherTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} >
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClass" component={GiveClass} />
        <Screen name="Teachers" component={TeacherTabs} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;