/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import SecondPage from './SecondPage';
import DietPlan from '../screens/DietPlan';
import LoginScreenNew from './LoginPageNew';
import TabNavigator from './TabNavigator';
import DemoAlert from '../screens/alert/DemoAlert';
import Account from '../screens/account/Account';
import NotFoundPage from '../screens/error/ErrorPage';

const Stack = createStackNavigator();

export default ({data, formDataCopy, dietPlan}) => {
  // console.log('ScreensStack Component - Data:', data);
  // console.log('ScreensStack Component - FormDataCopy:', formDataCopy);
  // console.log('ScreensStack Component - DietPlan:', dietPlan);
  const formData = formDataCopy;
  // console.log(formData , "check");
  useEffect(() => {
    // Navigate to the "Screens" screen when the Menu component is first loaded
    console.log(data , "updatess diet plan screen");
    
   
  }, [data , dietPlan, formDataCopy]);
  
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
  
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        // options={screenOptions.components}
        options={{title: ''}}
        initialParams={{data, formDataCopy, dietPlan}}
      />
       <Stack.Screen
        name="Demo"
        component={DemoAlert}
        options={{title: t('navigation.home')}}
        initialParams={{ formData }}
      />
    <Stack.Screen
        name="Details"
        component={SecondPage}
        options={{title: t('navigation.home')}}
        initialParams={{ formData }}
      />


      {/* {/* <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} /> */}

      <Stack.Screen
        name="Profile"
        component={Account}
        options={{headerShown: false}}
        initialParams={{ formData }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="NotFoundPage"
        component={NotFoundPage}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="NotFoundPage2"
        component={NotFoundPage}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="NotFoundPage3"
        component={NotFoundPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
