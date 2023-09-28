/* eslint-disable prettier/prettier */
// LoadingScreen.js
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const authDataJSON = await AsyncStorage.getItem('authData');
        if (authDataJSON) {
          // Parse authData JSON
          const authData = JSON.parse(authDataJSON);
          const authToken = authData.token;
          const formData = authData.formData;
          const data = authData.data;
          const formDataCopy = authData.formDataCopy;
          const dietPlan = authData.dietPlan;

          if (data && formDataCopy  ) {
            // Both authToken and formData exist, navigate to 'Frstpage'
            navigation.navigate('Menu', {
            data, formDataCopy, dietPlan // Pass your parameters here
            });
           
          } else if (authToken && formData.height ) {
            // Data, formDataCopy, and dietPlan exist, navigate to 'tabNavigator'
            navigation.navigate('dietcalculation', {formData});
          } else {
            // Navigate to 'loginNew' if none of the required data is present
            navigation.navigate('loginNew');
          }
        } else {
          // authData JSON doesn't exist, navigate to 'loginNew'
          navigation.navigate('loginNew');
        }
      } catch (error) {
        console.error('Authentication Status Error:', error);
      }
    };

    checkAuthenticationStatus();
  }, [navigation]);

  return null; // Loading screen has no UI
};

export default LoadingScreen;
