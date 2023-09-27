import React, {useCallback, useEffect, useState} from 'react';
import {useData, useTheme, useTranslation} from '../../../hooks';
import {Block, Button, Image, Input, Product, Text} from '../../../components/';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import HomeWorkoutCalender from './HomeWorkoutCalender';
import axios from 'axios';
import {BASE_URL} from '@env';

const HomeWorkoutMain = ({navigation, route}) => {
  const {t} = useTranslation();
  const {data, formDataCopy, savedDate} = route.params;
  // const isSavedDateAvailable = savedDate !== undefined && savedDate !== null;
  // console.log(isSavedDateAvailable, 'saved mdate from congrats page ');

  console.log(data, 'haiii');

  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(
    formDataCopy.workout_level,
  );
  const [data2, setData2] = useState(data);
  console.log(data2, 'testing');

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
    navigation.navigate('HomeWorkoutAll', {workout, data});
    // console.log(workout);
  };
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    if (['beginner', 'intermediate', 'expert'].includes(level)) {
      // Make an Axios API call here with the selected level
      axios
        .get(
          `${BASE_URL}get_home_workouts?gender=${formDataCopy.gender}&level=${level}`,
        )
        .then((response) => {
          // Handle the API response here
          // console.log(response.data.data, 'testing');
          setData2(response.data.data);
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
  };
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate data loading (replace this with your actual data loading logic)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false when data is loaded
    }, 1000); // Simulate a 2-second loading time (adjust as needed)
  }, []);

  return (
    <Block scroll showsVerticalScrollIndicator={false}>
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:140}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!isLoading && (
        <Block
          // scroll
          paddingTop={50}
          // paddingHorizontal={sizes.padding}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.l}}
          paddingBottom={50}
          // centerContent
        >
          <Block
          //   centerContent
          //   center
          //   style={{justifyContent: 'center', flex: 1, marginTop: 10}}
          >
            <Block
              row
              justify="space-around"
              paddingBottom={10}
              style={{borderBottomWidth: 10, borderBottomColor: '#2FD87269'}}>
              <Block paddingLeft={10}>
                <Block>
                  <Text bold>Home Workout</Text>
                </Block>
                <Block row>
                  <Text>Your program :</Text>
                  <Text bold>
                    {' '}
                    {selectedLevel.charAt(0).toUpperCase() +
                      selectedLevel.slice(1)}
                  </Text>
                </Block>
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
                    data={['beginner', 'intermediate', 'expert']} // Provide your options here
                    // defaultButtonText={formDataCopy.workout_level}
                    defaultButtonText={selectedLevel}
                    onSelect={handleLevelChange}
                  />
                </Block>
              </Block>
            </Block>
            <Block
            // style={{
            //   borderBottomColor: 'black',
            //   borderBottomWidth: 0.11,
            //   backgroundColor: 'white',
            // }}
            // paddingBottom={10}
            ></Block>
            <View style={{paddingBottom: 20}}>
              <HomeWorkoutCalender savedDate={savedDate} />
            </View>

            {data2.map((workout) => (
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
                      resizeMode="cover"
                      source={{
                        uri: `${workout.image}`,
                      }}
                      // width={350}
                      style={{
                        overflow: 'hidden',
                        height: 150,
                        width: 350,
                        borderRadius: 15,
                        alignSelf: 'center',
                        position:'relative'
                      }}
                    />
                  
                    
                  </Block>
                </Block>
              </TouchableOpacity>
            ))}
          </Block>
        </Block>
      )}
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
    height: 250,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 30,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  mainCardView1: {
    // height: 250,
    // width: 150,
    //    bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3cf29d',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    // marginTop: 6,
    marginBottom: 6,
    marginLeft: 20,
    marginRight: 20,
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

export default HomeWorkoutMain;
