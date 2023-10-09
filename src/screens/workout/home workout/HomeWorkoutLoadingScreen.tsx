/* eslint-disable prettier/prettier */

import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import api, { setAuthToken } from '../../../../api';
import {Animated, Easing} from 'react-native';
import Lottie from 'lottie-react-native';

const HomeWorkoutLoadingScreen = ({route}) => {
  // const {workoutData} = route.params ;
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

  // useEffect(() => {
  //   const checkAuthenticationStatus = async () => {
  //     try {
  //       const authDataJSON = await AsyncStorage.getItem('authData');

  //       if (authDataJSON) {
  //         const authData = JSON.parse(authDataJSON);
  //         const authToken = authData.token;

  //         if (authToken) {
  //           try {
  //             const workoutDataJSON = await AsyncStorage.getItem('workoutData');
  //             // const homeWorkoutJSON = await AsyncStorage.getItem('homeWorkout');
  //             const homeWorkoutJSON = await api.get(`get_home_workout_excercises/15`);
  // console.log(homeWorkoutJSON);

  //             if (workoutDataJSON && homeWorkoutJSON) {
  //               const workoutData = JSON.parse(workoutDataJSON);
  //               const homeWorkout = JSON.parse(homeWorkoutJSON);

  //               // Check if homeWorkout is available
  //               if (homeWorkout) {
  //                 // Navigate to 'HomeTabNavigator' with homeWorkout and workoutData
  //                 navigation.navigate('HomeTabNavigator', {
  //                   screen: 'HomeWorkoutMain',
  //                   params: { homeWorkout, workoutData },
  //                 });
  //               } else {
  //                 // Navigate to 'fitness' screen with workoutData
  //                 navigation.navigate('Gender', {
  //                   workoutData: authData.formData,
  //                 });
  //               }
  //             } else {
  //               console.log('Data not found in AsyncStorage');
  //             }

  //             setIsLoading(false);
  //           } catch (error) {
  //             console.error('Error fetching stored data:', error);
  //             setIsLoading(false);
  //           }
  //         }
  //       } else {
  //         console.log('Token not available');
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'loginNew' }],
  //         });
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error('Authentication Status Error:', error);
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuthenticationStatus();
  // }, [navigation]);
  const workoutData = {
    customer_id: 68,
    first_name: 'Sandeep S Anand',
    last_name: 'S an',

    feet: '',
    gender: 'male',
    height: 10,
    height_unit: 'cm',
    inches: '',

    weight: '10',
    weight_unit: 'lbs',
    workout_level: 'beginner',
  };
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const authDataJSON = await AsyncStorage.getItem('authData');

        if (authDataJSON) {
          const authData = JSON.parse(authDataJSON);
          const authToken = authData.token;
          console.log('token');
          

          if (authToken) {
            setIsLoading(true);
            setAuthToken(authToken);
            console.log(authToken, "token preview");
            

            try {
              // const workoutDataJSON = await AsyncStorage.getItem('workoutData');
              const workoutDataJSON = {
                customer_id: 68,
                first_name: 'Sandeep S Anand',
                last_name: 'S an',
            
                feet: '',
                gender: 'male',
                height: 10,
                height_unit: 'cm',
                inches: '',
            
                weight: '10',
                weight_unit: 'lbs',
                workout_level: 'beginner',
              };
              const homeWorkout = await api.get(
                `get_home_workouts?gender=${workoutData.gender}&level=${workoutData.workout_level}`,
              );
              const homeWorkoutJSON = homeWorkout.data.data;
              console.log(workoutDataJSON);

              // console.log(homeWorkoutJSON.data.data);

              if (homeWorkoutJSON && workoutDataJSON) {
                // const workoutData = JSON.parse(workoutDataJSON);
                const homeWorkout = homeWorkoutJSON;

                if (homeWorkout) {
                  // Navigate to 'HomeTabNavigator' with homeWorkout and workoutData
                  navigation.navigate('HomeTabNavigator', {
                    screen: 'HomeWorkoutMain',
                    params: { homeWorkout, workoutData },
                  });
                } else {
                  // Navigate to 'Gender' screen with workoutData
                  navigation.navigate('Gender', {
                    workoutData: authData.formData,
                  });
                }
              } else {
                console.log('Data not found in AsyncStorage');
              }
            } catch (error) {
              console.error('Error fetching stored data:', error);
            } finally {
              setIsLoading(false);
            }
          }
        } else {
          console.log('Token not available');
          navigation.reset({
            index: 0,
            routes: [{name: 'loginNew'}],
          });
        }
      } catch (error) {
        console.error('Authentication Status Error:', error);
      } finally {
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
          source={require('../../../assets/json/loveloader.json')}
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

export default HomeWorkoutLoadingScreen;
