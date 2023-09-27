import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '@env';
import {
  Platform,
  Linking,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../../../components';
import {useData, useTheme, useTranslation} from '../../../hooks';
// import HomeWorkoutDetailsPage from '../home workout/HomeWorkoutDetailsPage';
// import HomeWorkoutDetailsPageTwo from '../home workout/HomeWorkoutDetailsPageTwo';
import Timer from '../home workout/Timer';
import TimerIntermediatePage from '../home workout/TimerIntermediatePage';
import GymWorkoutDetailsPage from './ChallengeDetailsPage';
import GymWorkoutDetailsPageTwo from './ChallengeDetailsPageTwo';

const isAndroid = Platform.OS === 'android';
function PopupPage() {
  // State to control whether the modal is visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };
}
const GymWorkoutStart = () => {
  const route = useRoute();
  const {exerciseData, completedWorkouts: initialCompletedWorkouts = []} =
    route.params;
  // console.log(exerciseData);

  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const [showRestPopup, setShowRestPopup] = useState(false);

  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0); // Start with the first workout
  // console.log(currentWorkoutIndex, 'workout index');

  const [showNextButton, setShowNextButton] = useState(false);
  const [savedDate, setCompletedDate] = useState([]);

  const [completedWorkouts, setCompletedWorkouts] = useState(
    initialCompletedWorkouts,
  );

  const currentWorkout = exerciseData[currentWorkoutIndex];

  console.log(currentWorkout, 'workout data');

  const restTimeInSeconds = currentWorkout.rest_time_in_seconds;

  const [timeLeft, setTimeLeft] = useState(
    currentWorkout.time_or_sets === 'time' ? currentWorkout.time_in_seconds : 0,
  );
  console.log(timeLeft, 'actual time left ');

  const [isTimerPaused, setIsTimerPaused] = useState(false);
  // console.log(isTimerPaused);

  const toggleTimerPause = () => {
    setIsTimerPaused((prevIsTimerPaused) => !prevIsTimerPaused);
  };
  const goToPreviousWorkout = () => {
    if (exerciseData && currentWorkoutIndex > 0) {
      setCurrentWorkoutIndex(currentWorkoutIndex - 1);
      setTimeLeft(
        exerciseData[currentWorkoutIndex - 1].time_or_sets === 'time'
          ? exerciseData[currentWorkoutIndex - 1].time_in_seconds
          : 0,
      );
      setIsTimerPaused(false); // Reset pause state to false
    }
  };

  // const goToNextWorkout = () => {
  //   if (currentWorkoutIndex < exerciseData.length - 1) {
  //     setCurrentWorkoutIndex(currentWorkoutIndex + 1);
  //     setTimeLeft(
  //       exerciseData[currentWorkoutIndex + 1].time_or_sets === 'time'
  //         ? exerciseData[currentWorkoutIndex + 1].time_in_seconds
  //         : 0,
  //     );
  //     setIsTimerPaused(false); // Reset pause state to false
  //     setShowRestPopup(true); // Show the rest time popup

  //   }
  // };
  const goToNextWorkout = () => {
    // console.log('clicked');

    if (exerciseData && currentWorkoutIndex < exerciseData.length - 1) {
      const nextWorkout = exerciseData[currentWorkoutIndex + 1];
      const newRestTime = nextWorkout.time_in_seconds;

      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
      setTimeLeft(newRestTime); // Start the new countdown timer with the new rest time
      setIsTimerPaused(false); // Reset pause state to false
      setShowRestPopup(true); // Show the rest time popup
      setShowNextButton(false); // to set show button false
    }
  };
  const handleRestPopupClose = () => {
    setShowRestPopup(false); // Close the rest time popup
  };
  function getPreviousWorkoutRestTime(currentWorkoutIndex, exerciseData) {
    // Start from the current workout's index and move backward
    for (let i = currentWorkoutIndex - 1; i >= 0; i--) {
      const previousWorkout = exerciseData[i];

      // Check if the previous workout has a non-null rest_time_in_seconds
      if (previousWorkout.rest_time_in_seconds !== null) {
        return previousWorkout.rest_time_in_seconds;
      }
    }

    // If no previous workout with non-null rest_time_in_seconds is found, return 0 or a default value
    return 0; // You can change this to a different default value if needed
  }
  const previousRestTimeInSeconds = getPreviousWorkoutRestTime(
    currentWorkoutIndex,
    exerciseData,
  );
  // console.log(previousRestTimeInSeconds, 'testing previous time');

  const [modalVisible, setModalVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // const [isTimerPaused, setIsTimerPaused] = useState(false);
  useEffect(() => {
    let interval;

    if (
      !showRestPopup &&
      currentWorkout.time_or_sets === 'time' &&
      timeLeft > 0 &&
      isTimerRunning &&
      !modalVisible // Check if the modal is not visible
    ) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsTimerRunning(false); // Timer has finished
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isTimerRunning, showRestPopup, modalVisible]);

  const handleStart = () => {
    setIsTimerRunning(true);
    setIsTimerPaused(false);
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(true);
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const completed_date = new Date().toISOString().slice(0, 10);
  // console.log(completed_date);
  const customer_id = 10;
  const workout_id = currentWorkout.workout_id;
  const excercise_id = currentWorkout.excercise;
  const home_workout_excercise = currentWorkout.id;
  const workoutData = {
    customer_id,
    workout_id,
    excercise_id,
    home_workout_excercise,
    completed_date,
  };

  const handleFinish = (currentWorkout) => {
    axios
      .post(
        `${BASE_URL}add_home_workout_excercises_done`,
        {
          customer_id,
          workout_id,
          excercise_id,
          home_workout_excercise,
          completed_date,
        },
        {
          headers: {
            Authorization: `Bearer 477|F4h2p6ibB4FFhCwx0RJLNO6rPRXhPbMttg2x1iYT`,
          },
        },
      )
      .then((response) => {
        if (response.data.success) {
          setShowNextButton(true);
          setCompletedDate([completed_date]);
          setCompletedWorkouts([
            ...completedWorkouts,
            currentWorkout.excercise,
          ]);
        }
      })
      .catch((error) => {
        console.error('Error fetching exercise data:', error);
      });
  };
  const uniqueCompletedWorkouts = [...new Set(completedWorkouts)];
  const firstUnfinishedWorkoutIndex = exerciseData.findIndex(
    (workout) => !uniqueCompletedWorkouts.includes(workout.excercise),
  );

  // console.log(firstUnfinishedWorkoutIndex, 'finished');

  const isLastWorkout = currentWorkoutIndex === exerciseData.length - 1;
  // console.log(showNextButton, 'last');

  // useEffect(() => {
  //   // Open the modal when the component mounts
  //   setModalVisible(true);

  //   // Close the modal automatically after 15 seconds
  //   const timeout = setTimeout(() => {
  //     setModalVisible(false);
  //   }, restTimeInSeconds * 1000); // 15000 milliseconds = 15 seconds

  //   // Clear the timeout if the component unmounts before the timeout
  //   return () => clearTimeout(timeout);
  // }, []); // Empty dependency array means this effect runs only once when mounted

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        // paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <View>
            {/* Button to open the modal */}

            {/* Modal */}
            <Modal
              animationType="slide" // You can choose different animation types
              transparent={false} // Makes the modal background transparent
              visible={modalVisible} // Controls the visibility of the modal
              // Function called when the Android back button is pressed
            >
              {/* Content of the modal */}
              <Block>
                {/* <Timer
                  restTimeInSeconds={restTimeInSeconds}
                  workout={currentWorkout}
                  data={exerciseData}
                /> */}
              </Block>
            </Modal>
            {/* <TimerIntermediatePage
              isVisible={showRestPopup}
              restTimeInSeconds={previousRestTimeInSeconds}
              onClose={handleRestPopupClose}
              workout={currentWorkout}
              data={exerciseData}
            /> */}
          </View>
          <Block center paddingTop={20}>
            <View style={{flex: 1}}>
              <GymWorkoutDetailsPage
                workout={currentWorkout}
                timeLeft={timeLeft}
                formattedTime={formatTime(timeLeft)}
              />

              {currentWorkout.time_or_sets === 'sets' ? (
                <Block centerContent paddingTop={50}>
                  <Button
                    tertiary
                    width={100}
                    style={{alignSelf: 'center', backgroundColor: '#fdb2b2'}}
                    onPress={() => {
                      goToNextWorkout();
                      handleFinish(currentWorkout);
                      if (isLastWorkout) {
                        handleFinish(currentWorkout);
                        navigation.navigate('GymCongratsPage', {
                          savedDate,
                          completedWorkouts,
                        }); // Replace 'YourNewPage' with the actual page name
                      }
                    }}>
                    <Text center bold>
                      DONE
                    </Text>
                  </Button>
                </Block>
              ) : timeLeft === 0 ? (
                <Block centerContent paddingTop={50}>
                  {showNextButton ? (
                    <Button
                      tertiary
                      onPress={() => {
                        goToNextWorkout();
                        setShowNextButton(false);
                        handleFinish(currentWorkout);
                        if (isLastWorkout) {
                          navigation.navigate('GymCongratsPage', {
                            savedDate,
                            completedWorkouts,
                          }); // Replace 'YourNewPage' with the actual page name
                        }
                      }}
                      white
                      width={100}
                      radius={15}
                      style={{alignSelf: 'center'}}>
                      <Text bold>Next</Text>
                    </Button>
                  ) : (
                    <Button
                      onPress={() => handleFinish(currentWorkout)}
                      color={colors.lightGreen}
                      width={100}
                      radius={15}
                      style={{alignSelf: 'center'}}>
                      <Text bold>Finish</Text>
                    </Button>
                  )}
                </Block>
              ) : (
                <Block centerContent paddingTop={50}>
                  {!isTimerRunning && !isTimerPaused && (
                    <Button
                      onPress={handleStart}
                      tertiary
                      white
                      width={100}
                      radius={15}
                      style={{alignSelf: 'center'}}
                      row>
                      <Text bold>Start</Text>
                    </Button>
                  )}
                  {isTimerRunning && (
                    <Button
                      onPress={handlePause}
                      tertiary
                      white
                      width={100}
                      radius={15}
                      style={{alignSelf: 'center'}}
                      row>
                      <Text bold>Pause</Text>
                    </Button>
                  )}
                  {/* <Button
                    tertiary
                    onPress={toggleTimerPause}
                    white
                    width={100}
                    radius={15}
                    style={{alignSelf: 'center'}}
                    row>
                    <Image
                      radius={0}
                      width={18}
                      height={20}
                      color={colors.white}
                      source={
                        isTimerPaused
                          ? require('../../../assets/icons/play.png')
                          : require('../../../assets/icons/pause.png')
                      }
                      transform={[{rotate: '0deg'}]}
                      style={{alignSelf: 'center'}}
                      marginRight={5}
                    />
                    <Text bold>{isTimerPaused ? 'Resume' : 'Pause'}</Text>
                  </Button> */}
                </Block>
              )}
              {/* <View>
                <Text>{formatTime(timeLeft)}</Text>
                {!isTimerRunning && !isTimerPaused && (
                  <Button onPress={handleStart}>
                    <Text>Start</Text>
                  </Button>
                )}
                {isTimerRunning && (
                  <Button onPress={handlePause}>
                    <Text>Pause</Text>
                  </Button>
                )}
              </View> */}

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  disabled={currentWorkoutIndex === 0}
                  onPress={goToPreviousWorkout}>
                  <Image
                    radius={0}
                    width={30}
                    height={30}
                    // color={colors.primary}
                    source={require('../../../assets/icons/nextpng.png')}
                    transform={[{rotate: '180deg'}]}
                  />
                </Button>
                <Button
                  onPress={goToNextWorkout}
                  disabled={currentWorkoutIndex === exerciseData.length - 1}>
                  <Image
                    radius={0}
                    width={30}
                    height={30}
                    // color={colors.primary}
                    source={require('../../../assets/icons/nextpng.png')}
                    transform={[{rotate: '0deg'}]}
                  />
                </Button>
              </View>
            </View>
          </Block>

          <GymWorkoutDetailsPageTwo workout={currentWorkout} />

          {/* profile: photo album */}
        </Block>
      </Block>

      {/* <TouchableOpacity>
        <Block style={styles.stickyButton} center justify="center">
          <Text style={styles.buttonText} bold>
            START
          </Text>
        </Block>
      </TouchableOpacity> */}
    </Block>
  );
};
const styles = StyleSheet.create({
  stickyButton: {
    backgroundColor: '#19F196', // Customize the button's appearance
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    height: 50, // Set the button's height as needed
    width: 150, // Set the button's width
    alignSelf: 'center', // Align the button horizontally in the center
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GymWorkoutStart;
