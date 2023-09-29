/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import SecondPage from './SecondPage';
import DietPlan from '../screens/DietPlan';
import LoginScreenNew from './LoginPageNew';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default ({data, formDataCopy, dietPlan}) => {
  console.log('ScreensStack Component - Data:', data);
  console.log('ScreensStack Component - FormDataCopy:', formDataCopy);
  console.log('ScreensStack Component - DietPlan:', dietPlan);
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        // options={screenOptions.components}
        options={{title: ''}}
        initialParams={{data, formDataCopy, dietPlan}}
      />

      <Stack.Screen
        name="Articles"
        component={SecondPage}
        options={{title: t('navigation.articles')}}
      />

      {/* {/* <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} /> */}

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
