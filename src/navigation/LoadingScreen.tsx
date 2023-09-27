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

          if (authToken && formData) {
            // Both authToken and formData exist, navigate to 'Frstpage'
            navigation.navigate('Frstpage', {formData});
          } else {
            // Either authToken or formData is missing, navigate to 'loginNew'
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
