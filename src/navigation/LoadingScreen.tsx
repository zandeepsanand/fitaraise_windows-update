/* eslint-disable prettier/prettier */

import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import api from '../../api';
import {Animated, Easing} from 'react-native';
import Lottie from 'lottie-react-native';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);
    useEffect(() => {
      const checkAuthenticationStatus = async () => {
        try {
          const authDataJSON = await AsyncStorage.getItem('authData');
          if (authDataJSON) {
            const authData = JSON.parse(authDataJSON);
            const authToken = authData.token;
  
            if (authToken) {
              const requiredCalorieResponse = await api.get(`get_daily_required_calories/${authData.formData.customer_id}`);
              const diet_List = await api.get(`get_recommended_diet/${authData.formData.customer_id}`);
  
  
              const requiredCalorie = requiredCalorieResponse.data.data;
              
              const dietPlan = diet_List.data.data.recommended_diet_list;
              console.log(requiredCalorie , "calorie required");
              if ((requiredCalorieResponse.data.success === true) && (authData.formData)) {
                // Reset the navigation stack and navigate to 'Menu'
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Menu', params: { data: requiredCalorie, formDataCopy: authData.formData , dietPlan } }],
                });
              } else if (authData.formData) {
                // Reset the navigation stack and navigate to 'Frstpage'
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Frstpage', params: { formData: authData.formData } }],
                });
              } else {
                // Reset the navigation stack and navigate to 'loginNew'
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'loginNew' }],
                });
              }
            } else {
              // No authToken, navigate to 'loginNew'
              navigation.reset({
                index: 0,
                routes: [{ name: 'loginNew' }],
              });
            }
          } else {
            // authData JSON doesn't exist, navigate to 'loginNew'
            navigation.reset({
              index: 0,
              routes: [{ name: 'loginNew' }],
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Authentication Status Error:', error);
          setIsLoading(false);
        }
      };
  
      checkAuthenticationStatus();
    }, [navigation]);
  
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
          <Lottie
                   style={styles.backgroundAnimation}
                   
                    source={require('../assets/json/loader.json')}
                    progress={animationProgress.current}
                  />
        </View>
      );
    }
  
    return null;
  };
  
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default LoadingScreen;
