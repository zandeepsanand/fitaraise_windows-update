import React, {useCallback, useEffect, useState} from 'react';
import {useData, useTheme, useTranslation} from '../../../hooks';
import {Block, Button, Image, Input, Product, Text} from '../../../components';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';

import axios from 'axios';
import {BASE_URL} from '@env';

const ChallengeMain = ({navigation, route}) => {
  const {t} = useTranslation();
  const {
    formDataCopy = [],
    savedDate = [],
    completedWorkouts = [],
    workoutData,
    challenge,
  } = route.params;

  console.log(challenge, 'saved workouts');

  // console.log(savedDate, 'haiii');

  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(
    // formDataCopy.workout_level,
    '',
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data2, setData2] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const [todayWorkout, setTodayWorkout] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!challenge.id) {
          throw new Error('Please enter all details');
        }

        const config = {
          headers: {
            Authorization: `Bearer 477|F4h2p6ibB4FFhCwx0RJLNO6rPRXhPbMttg2x1iYT`, // Replace with your actual token
          },
        };

        const response = await axios.get(
          `${BASE_URL}get_workout_challenge_days/${challenge.id}`,
          config,
        );

        const responseData = response.data.data;
        console.log(responseData);

        if (responseData === null) {
          throw new Error('Turn on the network and retry');
        }

        setData(responseData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [challenge]);
  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }
  // console.log(data.day_number, "days");

  const clickStart = async (currentDayNumber) => {
    try {
      if (!challenge.id) {
        throw new Error('Please enter all details');
      }

      const config = {
        headers: {
          Authorization: `Bearer 477|F4h2p6ibB4FFhCwx0RJLNO6rPRXhPbMttg2x1iYT`, // Replace with your actual token
        },
      };

      const response = await axios.get(
        `${BASE_URL}get_workout_challenge_excercise/${challenge.id}/${currentDayNumber}`,
        config,
      );

      const responseData = response.data.data;
      console.log(responseData, 'day 1');

      setTodayWorkout(responseData);
      if (responseData === null) {
        throw new Error('Turn on the network and retry');
      } else {
        navigation.navigate('ChallengeDayAll', {
          responseData,
          completedWorkouts,
        });
      }

      // Check if the next day is completed or not
      const nextDayNumber = currentDayNumber + 1;
      const nextDayIndex = nextDayNumber - 1; // Array index starts from 0

      if (nextDayIndex < data.length) {
        const nextDay = data[nextDayIndex];
        if (nextDay.completed) {
          // The next day is completed, load the workout for the day after it
          const dayAfterNextDayNumber = currentDayNumber + 2;
          // Load the workout for the day after the completed day
          await loadWorkout(dayAfterNextDayNumber);
        } else {
          // The next day is not completed, load the workout for it
          await loadWorkout(nextDayNumber);
        }
      } else {
        // All days are completed, handle as needed
        // For example, display a message that all workouts are completed
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );
  const handleWorkoutClick = (workout) => {
    // Call the API with workoutId and fetch exercise details
    // Once you have the exercise data, navigate to the 'HomeWorkoutAll' screen
    navigation.navigate('GymWorkoutAll', {workout, data, completedWorkouts});
    console.log(completedWorkouts, 'completed workout list');
  };
  // const handleLevelChange = (level) => {
  //   setSelectedLevel(level);
  //   if (['beginner', 'intermediate', 'expert'].includes(level)) {
  //     // Make an Axios API call here with the selected level
  //     axios
  //       .get(
  //         `${BASE_URL}get_gym_workouts?gender=${formDataCopy.gender}&level=${level}`,
  //       )
  //       .then((response) => {
  //         // Handle the API response here
  //         // console.log(response.data.data, 'testing');
  //         setData2(response.data.data);
  //       })
  //       .catch((error) => {
  //         // Handle errors here
  //         console.error(error);
  //       });
  //   }
  // };
  const numberOfWeeks = Math.ceil(data.length / 7);

  const weeks = [];
  for (let week = 0; week < numberOfWeeks; week++) {
    const weekData = data.slice(week * 7, (week + 1) * 7);

    const firstRowDays = weekData.slice(0, 4); // First row with 4 days
    const secondRowDays = weekData.slice(4); // Second row with remaining days

    const firstRow = firstRowDays.map((day, index) => (
      <Block
        key={index}
        center
        style={{
          borderColor: day.completed ? '#19F196F0' : '#D9D9D9',
          borderWidth: 3,
          borderRadius: 50,
          maxWidth: 60,
          minHeight: 60,
          backgroundColor: day.completed ? '#c7fce6' : 'transparent',
        }}
        margin={10}>
        <Text center bold>
          {day.day}
        </Text>
      </Block>
    ));

    const secondRow = secondRowDays.map((day, index) => (
      <Block
        key={index}
        center
        style={{
          borderColor: day.completed ? '#19F196F0' : '#D9D9D9',
          borderWidth: 3,
          borderRadius: 50,
          maxWidth: 60,
          minHeight: 60,
          backgroundColor: day.completed ? '#c7fce6' : 'transparent',
        }}
        margin={10}>
        <Text center bold>
          {day.day}
        </Text>
      </Block>
    ));

    weeks.push(
      <Block key={week} card margin={10}>
        <Text center bold paddingTop={20} h5>
          Week {week + 1}
        </Text>
        <Block paddingHorizontal={10}>
          <Block row center paddingTop={20}>
            {firstRow}
          </Block>
          <Block row center paddingTop={20}>
            {secondRow}
          </Block>
        </Block>
        {/* Add your "Start" button or other components here */}
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              const firstDayOfCurrentWeek = week * 7 + 1; // Calculate day_number for the first day of the current week
              clickStart(firstDayOfCurrentWeek);
            }}>
            <Block
              style={styles.mainCardView1}
              gradient={gradients?.[tab === 2 ? 'success' : '#ffff']}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    // marginLeft: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}></View>
                <View>
                  <Text bold white h4>
                    Start
                  </Text>
                </View>
              </View>
            </Block>
          </TouchableWithoutFeedback>
        </View>
      </Block>,
    );
  }

  return (
    <Block safe marginTop={sizes.md} marginBottom={10}>
      <Block
        scroll
        // paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block>
          <Block
            row
            justify="space-around"
            paddingBottom={10}
            style={{borderBottomWidth: 10, borderBottomColor: '#938669'}}>
            <Block paddingLeft={20}>
              <Block center>
                <Text key={challenge.id} bold>
                  {challenge.challenge_name}
                </Text>
              </Block>
              {/* <Block row>
                <Text>Your program :</Text>
                <Text bold>
                  {' '}
                  {selectedLevel.charAt(0).toUpperCase() +
                    selectedLevel.slice(1)}
                </Text>
              </Block> */}
            </Block>
            <Block>
              <Block center>
                <SelectDropdown
                  defaultValue={'one'}
                  dropdownStyle={{borderRadius: 20}}
                  buttonStyle={{
                    height: 50,
                    width: 180,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    marginLeft: 10,
                  }}
                  data={['Home Workout', 'Gym Workout', '90 day challenge']} // Provide your options here
                  // defaultButtonText={formDataCopy.workout_level}
                  defaultButtonText={'Select an option'}
                  // onSelect={handleLevelChange}
                />
              </Block>
            </Block>
          </Block>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Block
                style={styles.mainCardView}
                gradient={gradients?.[tab === 2 ? 'success' : '#ffff']}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      marginLeft: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* <Image
                    source={assets.arrow}
                    color={colors.white}
                    radius={0}
                  /> */}
                    <Text bold danger center paddingRight={8}>
                      •
                    </Text>
                    <Text semibold gray center>
                      Level -
                    </Text>
                  </View>
                  <View style={{marginLeft: 12}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      bold
                      white>
                      {workoutData.workout_level}
                    </Text>
                  </View>
                </View>
              </Block>
            </TouchableWithoutFeedback>
          </View>
          <View>
            {weeks.map((week, index) => (
              <View key={index}>{week}</View>
            ))}
          </View>
          {/* <Block card marginHorizontal={10}>
            <Text center bold paddingTop={20} h5>
              Week 1
            </Text>
            <Block paddingHorizontal={10}>
              <Block row center paddingTop={20}>
                <Block
                  center
                  style={{
                    borderColor: '#19F196F0',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                    backgroundColor: '#c7fce6',
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 1
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 2
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 3
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 4
                  </Text>
                </Block>
              </Block>
              <Block row center paddingTop={20}>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 5
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 6
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#D9D9D9',
                    borderWidth: 3,
                    borderRadius: 50,
                    maxWidth: 60,
                    minHeight: 60,
                  }}
                  margin={10}>
                  <Text center bold>
                    DAY 7
                  </Text>
                </Block>
              </Block>
            </Block>
            <View style={styles.container}>
              <TouchableWithoutFeedback
                onPress={() => {
                  clickStart();
                }}>
                <Block
                  style={styles.mainCardView1}
                  gradient={gradients?.[tab === 2 ? 'success' : '#ffff']}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        // marginLeft: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}></View>
                    <View>
                      <Text bold white h4>
                        Start
                      </Text>
                    </View>
                  </View>
                </Block>
              </TouchableWithoutFeedback>
            </View>
          </Block> */}

          <View style={{paddingBottom: 20}}>
            {/* <GifPlayer /> */}
            {/* <GymWorkoutCalender savedDate={savedDate} /> */}
          </View>

          {/* {data2.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => handleWorkoutClick(workout)}>
              <Block center>
                <Block paddingTop={20}>
                  <Text
                    center
                    primary
                    bold
                    size={20}
                    padding={5}
                    paddingBottom={10}>
                    {workout.name}
                  </Text>
                </Block>
                <Block paddingHorizontal={10}>
                  <Image
                    // resizeMode="contain"
                    source={{
                      uri: `${workout.image}`,
                    }}
                    style={{
                      overflow: 'hidden',
                      height: 114,
                      width: 350,
                      borderRadius: 15,
                      alignSelf: 'center',
                    }}
                  />
                </Block>
              </Block>
            </TouchableOpacity>
          ))} */}
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#22faa0',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {backgroundColor: '', flexDirection: 'row', flex: 1},
  cover: {padding: 30, width: '50%', height: '10%'},
  text: {padding: 30},
  container: {
    flex: 0.1,
    flexDirection: 'row', // set elements horizontally, try column.
    padding: 20,
    // alignItems: 'center',
  },

  mainCardView: {
    height: 80,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C3585',
    borderRadius: 30,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 36,
    marginRight: 36,
  },
  mainCardView1: {
    height: 60,
    // width: 150,
    //    bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92A3FD',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    // marginTop: 6,
    marginBottom: 6,
    marginLeft: 40,
    marginRight: 40,
  },

  bottom: {
    flex: 0.5,
    justifyContent: 'flex-end', // Aligns content to the bottom of the container
    marginBottom: 40, // Optional: Adds some spacing from the bottom
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default ChallengeMain;
