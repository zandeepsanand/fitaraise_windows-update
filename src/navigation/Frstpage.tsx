/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import Lottie from 'lottie-react-native';
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';

import {
  StyleSheet,
  // Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {BlurView} from 'expo-blur';
import LoginContext from '../hooks/LoginContext';

const {height, width} = Dimensions.get('window');

const sizes = ['S', 'M', 'L'];

export default function Frstpage({
  navigation,
  route: {
    params: {formData},
  },
}) {
  console.log(formData);
  
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {
    customerId,
    isLoggedIn,

    token,
    logout, // You can access the logout function
  } = useContext(LoginContext);
  console.log(token);
  
  const handleLogout = () => {
    console.log('clicked');

    // Call the logout function to log the user out
    logout();
    navigation.navigate('loginNew');
  };
  // const [formData, setFormData] = useState({
  //   first_name: 'sandeep',
  //   last_name: '',
  //   email: '',
  //   mobile_number: '',
  //   height: '',
  //   height_unit: '',
  //   weight: '',
  //   weight_unit: '',
  //   acitivity_level: '',
  //   weekly_goal: '',
  //   is_vegetarian:'',
  //   age: '',
  //   dob: '',
  //   gender: '',
  //   device_token: '',
  //   image: '',
  //   customer_id:'',
  //   weight_want_to:'',

  // });
  // const [parsedData] = useState({
  //   first_name: 'sandeep',
  //   last_name: '',
  //   email: '',
  //   mobile_number: '',
  //   height: '',
  //   height_unit: '',
  //   weight: '',
  //   weight_unit: '',
  //   acitivity_level: '',
  //   weekly_goal: '',
  //   is_vegetarian:'',
  //   age: '',
  //   dob: '',
  //   gender: '',
  //   device_token: '',
  //   image: '',
  //   customer_id:'',
  //   weight_want_to:'',

  // });
  const [workoutData] = useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    workout_level: '',
    weekly_goal: '',
    gender: '',
    customer_id: '14',
  });

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Block>
      <Block style={styles.container1} gradient={gradients.success}>
        <Text bold font="Pacifico" style={{top: 40, padding: 16}}>
          Welcome {formData.first_name}
        </Text>
        <View style={styles.img}>
          <Image
            source={require('../assets/images/fitter-bg.png')}
            style={{width: '40%', height: '45%', top: 40}}
          />
        </View>
        <ExpoStatusBar style="auto" />
      </Block>

      <View style={styles.container}>
        <TouchableWithoutFeedback
          // onPress={() => navigation.navigate('Details')}
          activeOpacity={0.1}
          onPress={() => handleProducts(2)}
          onPressOut={() => navigation.navigate('Details', {formData})}>
          <Block
            style={styles.mainCardView}
            flex={0}
            marginTop={50}
            //  radius={30}
            gradient={gradients?.[tab === 2 ? 'success' : '#fffff']}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View flex={2}>
                <Image
                  //  source={require('../../../assets/fruit2.png')}
                  source={assets.fruit2}
                  resizeMode="contain"
                />
                {/* <Lottie
                    width={64}
                    height={64}
                    marginBottom={sizes.sm}
                    source={require('../assets/json/diet1.json')}
                    progress={animationProgress.current}
                  /> */}
              </View>
              <View flex={4} style={{alignSelf: 'center'}}>
                <Text
                  bold
                  primary
                  style={{
                    fontSize: 14,
                    color: 'black',
                  }}>
                  {'DIET PLANS'}
                </Text>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                    width: '85%',
                  }}></View>
              </View>
            </View>
            <View
              style={{
                height: 25,
                backgroundColor: 'pink',
                borderWidth: 0,
                width: 25,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Image source={assets.arrow} color={colors.white} radius={0} />
            </View>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => handleProducts(3)}
          onPressOut={() =>
            navigation.navigate('fitness', {workoutData: formData})
          }>
          <Block
            style={styles.mainCardView}
            flex={0}
            //  radius={6}
            gradient={gradients?.[tab === 3 ? 'success' : '#fffff']}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View flex={2}>
                <Image
                  // source={require('../../../assets/fitness2.png')}
                  source={assets.fitness2}
                  resizeMode="contain"
                />
              </View>
              <View flex={4} style={{alignSelf: 'center'}}>
                <Text bold primary>
                  {'WORKOUT'}
                </Text>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                    width: '85%',
                  }}></View>
              </View>
            </View>
            <View
              style={{
                height: 25,
                backgroundColor: 'pink',
                borderWidth: 0,
                width: 25,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Image source={assets.arrow} color={colors.white} radius={0} />
            </View>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          // onPressOut={() => navigation.navigate('water')}
          onPress={() => {
            handleProducts(4);
            handleLogout();
          }}>
          <Block
            style={styles.mainCardView}
            flex={0}
            //  radius={6}
            gradient={gradients?.[tab === 4 ? 'success' : '#fffff']}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View flex={2}>
                <Image
                  //  source={require('../../../assets/book2.png')}
                  source={assets.book2}
                  resizeMode="contain"
                />
              </View>
              <View flex={4} style={{alignContent: 'center'}}>
                <Text
                  bold
                  primary
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {'NUTRITION FACTS'}
                </Text>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                    width: '85%',
                  }}></View>
              </View>
            </View>
            <View
              style={{
                height: 25,
                backgroundColor: 'pink',
                borderWidth: 0,
                width: 25,
                marginLeft: -26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Image source={assets.arrow} color={colors.white} radius={0} />
            </View>
          </Block>
        </TouchableWithoutFeedback>
      </View>
    </Block>
  );
}
const styles = StyleSheet.create({
  text1: {
    fontFamily: 'Pacifico',
    fontSize: 26,
  },
  container1: {
    flex: 1,
    // backgroundColor: "#22faa0",

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
    flex: 4,
    flexDirection: 'row', // set elements horizontally, try column.
    padding: 20,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'skyblue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  powderblue: {
    width: 60,
    height: 60,
    backgroundColor: 'powderblue',
  },
  skyblue: {
    width: 60,
    height: 60,
    backgroundColor: 'skyblue',
  },
  steelblue: {
    width: 60,
    height: 60,
    backgroundColor: 'steelblue',
  },
  container: {
    flex: 3,

    // justifyContent: 'center',

    paddingHorizontal: 10,
    backgroundColor: 'rgb(255,255,255)',
  },
  mainCardView: {
    height: 150,
    alignItems: 'center',
    //   justifyContent: "center",
    backgroundColor: 'rgb(255,255,255)',

    borderRadius: 30,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    // gradient:"success"
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 0,
    // backgroundColor: "transparent",
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
