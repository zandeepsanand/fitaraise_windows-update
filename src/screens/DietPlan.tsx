/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ProgressBarAndroid} from 'react-native-elements';
import {BASE_URL} from '@env';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Text} from '../components/';
import {Animated, Easing, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import ScrollCalender from './ScrollCalender';
import ProgressBar from 'react-native-progress-step-bar';

import * as Progress from 'react-native-progress';

import {log} from 'react-native-reanimated';
import {MealContext} from '../hooks/useMeal';
import Axios from 'axios';
import PreviousDietDetails from './foodPage/PreviousDietDetails';

const isAndroid = Platform.OS === 'android';

import {useRoute} from '@react-navigation/native';
import api from '../../api';
// import { colors } from '../../app/res/colors';
// import AnimatableProgressBar from 'animateprogress';

const VerticalProgressBar = ({progress}) => {
  const fillHeight = `${(1 - progress) * 100}%`;

  return (
    <View style={styles.progressBar}>
      {/* Lottie animation for filling the progress bar */}
      <Lottie
        source={require('../assets/json/water2.json')} // Replace with the path to your fill animation JSON file
        autoPlay={true}
        loop={false}
        style={{
          position: 'absolute',
          bottom: 0,
          height: fillHeight,
          width: '100%',
        }}
      />
      {/* <View style={[styles.progressBarFill, { height: fillHeight }]} /> */}
    </View>
  );
};

const DietPlan = ({navigation, text, maxLines = 3}) => {
  const route = useRoute();

  const {data, dietPlan, formDataCopy} = route.params;

  useEffect(() => {
    // Navigate to the "Screens" screen when the Menu component is first loaded
    console.log(data , "updatess diet plan");
    
   
  }, [data , dietPlan, formDataCopy]);

  console.log(data, 'check 2');

  const [expandedItems, setExpandedItems] = useState([]); // To keep track of expanded items
  const [waterAmount, setWaterAmount] = React.useState(0);

  const increaseWater = () => {
    setWaterAmount(Math.min(waterAmount + 0.1, 1.0));
  };

  const decreaseWater = () => {
    setWaterAmount(Math.max(waterAmount - 0.1, 0.0));
  };

  // Function to toggle the expanded state of an item
  const toggleItemExpansion = (index) => {
    const updatedExpandedItems = [...expandedItems];
    if (updatedExpandedItems.includes(index)) {
      updatedExpandedItems.splice(updatedExpandedItems.indexOf(index), 1);
    } else {
      updatedExpandedItems.push(index);
    }
    setExpandedItems(updatedExpandedItems);
  };

  const {
    breakfastItems,
    lunchItems,
    eveningSnackItems,
    dinnerItems,
    deleteItem,
    morningSnackItems,
    mealItems1,
    mealItems2,
  } = useContext(MealContext);
  console.log(breakfastItems, 'breakfast from device distribution');

  // Calculate total protein, carbs, fat, and kcal for breakfast items
  const calculateTotalCalories = (items) => {
    return items.reduce((total, item) => total + item.calories, 0);
  };

  const totalBreakfastCalorie = breakfastItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalBreakfastProtein = breakfastItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalBreakfastCarb = breakfastItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalBreakfastFat = breakfastItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );
  // const totalBreakfastCalories = totalBreakfastCalorie.toFixed(2);
  // console.log("total calorie for breakfast items: ", totalBreakfastCalories);

  const totalLunchCalorie = lunchItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  // const totalLunchCalories = totalLunchCalorie.toFixed(2);
  const totalLunchProtein = lunchItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalLunchCarb = lunchItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalLunchFat = lunchItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );

  const totalDinnerCalorie = dinnerItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalDinnerProtein = dinnerItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalDinnerCarb = dinnerItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalDinnerFat = dinnerItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );
  // const totalDinnerCalories = totalDinnerCalorie.toFixed(2);

  const totalMorningSnackCalorie = morningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalmorningSnackItemsProtein = morningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalmorningSnackItemsCarb = morningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalmorningSnackItemsFat = morningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );

  // const totalMorningSnackCalories = totalMorningSnackCalorie.toFixed(2);

  const totalEveningSnackCalorie = eveningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totaleveningSnackItemsProtein = eveningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totaleveningSnackItemsCarb = eveningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totaleveningSnackItemsFat = eveningSnackItems.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );

  const totalMeal1Calorie = mealItems1.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalMeal1Protein = mealItems1.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalMeal1Carb = mealItems1.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalMeal1Fat = mealItems1.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );

  const totalMeal2Calorie = mealItems2.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalMeal2Protein = mealItems2.reduce(
    (acc, item) => acc + parseFloat(item.details.totalProtein),
    0,
  );

  const totalMeal2Carb = mealItems2.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCarb),
    0,
  );
  const totalMeal2Fat = mealItems2.reduce(
    (acc, item) => acc + parseFloat(item.details.totalFat),
    0,
  );

  // const totalEveningSnackCalories = totalEveningSnackCalorie.toFixed(2);

  // calculate total calories for the entire day
  const totalCaloriesOfAllFoods =
    totalBreakfastCalorie +
    totalLunchCalorie +
    totalDinnerCalorie +
    totalMorningSnackCalorie +
    totalEveningSnackCalorie +
    totalMeal1Calorie +
    totalMeal2Calorie;
  const ProgressCalorie = totalCaloriesOfAllFoods;
  const ProgressCalories = ProgressCalorie.toFixed(0);
  console.log(ProgressCalories, 'total Calories');

  const totalProteinfAllFoods =
    totalBreakfastProtein +
    totalLunchProtein +
    totalDinnerProtein +
    totalmorningSnackItemsProtein +
    totaleveningSnackItemsProtein +
    totalMeal1Protein +
    totalMeal2Protein;
  const ProgressProtein = totalProteinfAllFoods;
  const ProgressProteins = ProgressProtein.toFixed(0);
  console.log(ProgressProteins, 'total Protein');

  const totalFatfAllFoods =
    totalBreakfastFat +
    totalLunchFat +
    totalDinnerFat +
    totalmorningSnackItemsFat +
    totaleveningSnackItemsFat +
    totalMeal1Fat +
    totalMeal2Fat;
  const ProgressFat = totalFatfAllFoods;
  const ProgressFats = ProgressFat.toFixed(0);
  console.log(ProgressFats, 'total fat');

  const totalCarbfAllFoods =
    totalBreakfastCarb +
    totalLunchCarb +
    totalDinnerCarb +
    totalmorningSnackItemsCarb +
    totaleveningSnackItemsCarb +
    totalMeal1Carb +
    totalMeal2Carb;
  const ProgressCarb = totalCarbfAllFoods;
  const ProgressCarbs = ProgressCarb.toFixed(0);
  console.log(ProgressCarbs, 'total Carbs');

  const initialValueWithoutDecimals = Math.floor(
    data.calories - totalCaloriesOfAllFoods >= 1
      ? data.calories - totalCaloriesOfAllFoods
      : data.calories,
  );

  const handleDelete = (itemIndex: number, mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        const newBreakfastItems = [...breakfastItems];
        newBreakfastItems.splice(itemIndex, 1);
        deleteItem(newBreakfastItems, mealType);
        break;
      case 'morningSnackItems':
        const newMorningSnackItems = [...morningSnackItems];
        newMorningSnackItems.splice(itemIndex, 1);
        deleteItem(newMorningSnackItems, mealType);
        break;
      case 'lunch':
        // console.log('lunchhhh');

        const newLunchItems = [...lunchItems];
        newLunchItems.splice(itemIndex, 1);
        deleteItem(newLunchItems, mealType);
        break;
      case 'evening':
        // console.log('lunchhhh');

        const neweveningItems = [...eveningSnackItems];
        neweveningItems.splice(itemIndex, 1);
        deleteItem(neweveningItems, mealType);
        break;
      case 'dinner':
        const newDinnerItems = [...dinnerItems];
        newDinnerItems.splice(itemIndex, 1);
        deleteItem(newDinnerItems, mealType);
        break;
      case 'meal1':
        const newMealItem1 = [...mealItems1];
        newMealItem1.splice(itemIndex, 1);
        deleteItem(newMealItem1, mealType);
        break;
      case 'meal2':
        const newMealItem2 = [...mealItems2];
        newMealItem2.splice(itemIndex, 1);
        deleteItem(newMealItem2, mealType);
        break;
      default:
        break;
    }
  };

  // const totalCalories = 1579 ;
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [percentage, setPercentage] = React.useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const handlePrevStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);
  const {user} = useData();
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressValueOfProtein = ProgressProteins / data.protien_g;
  const progressValueOfCarb = ProgressCarbs / data.carb_g;
  const progressValueOfFat = ProgressFat / data.fat_g;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // State to hold the selected date and response data
  const [selectedDate, setSelectedDate] = useState('');

  // Callback function to handle date change in ScrollCalendar
  //  const handleScrollCalendarDateChange = (newSelectedDate, newResponseData) => {
  //   setSelectedDate(newSelectedDate);

  // };
  console.log(selectedDate, 'selected date');
  const currentDate = new Date().toISOString().slice(0, 10);
  const [apiData, setApiData] = useState(null);
  console.log(apiData, 'the data of diet');

  const handleScrollCalendarDateChange = async (selectedDate) => {
    console.log(selectedDate, 'hai');
    setSelectedDate(selectedDate);

    setApiData(null); // Clear previous API data when selecting a new date

    if (selectedDate === currentDate) {
      // If selected date is equal to current date, show breakfast items
      setApiData(null);
    } else {
      // Fetch data from API using Axios and update apiData state
      try {
        const response = await api.get(
          `get_diet_list_wrt_date/${formDataCopy.customer_id}/${selectedDate}`,
        );
        const responseData = response.data.data;
        console.log(responseData, 'diet data');
        setApiData(responseData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Block paddingTop={10}>
      {/* search input */}
      <Block color={colors.card} flex={0}>
        {/* <Input icon  placeholder={t('common.search')} /> */}
        {/* <CircularProgress value={80} /> */}
      </Block>
      <Block safe>
        <Block
          scroll
          paddingHorizontal={sizes.s}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.padding}}>
          <Block flex={0}>
            <Image
              background
              resizeMode="cover"
              padding={sizes.sm}
              paddingBottom={sizes.l}
              radius={sizes.cardRadius}
              source={assets.green}
              blurRadius={10}>
              <Button
                row
                flex={0}
                justify="flex-start"
                onPress={() => navigation.goBack()}>
                <Image
                  radius={0}
                  width={10}
                  height={18}
                  color={colors.white}
                  source={assets.arrow}
                  transform={[{rotate: '180deg'}]}
                />
                <Text p white marginLeft={sizes.s}>
                  {/* {t('profile.title')} */}
                </Text>
              </Button>
              <Block flex={0} align="center">
                <CircularProgress
                  // value={(initialValueWithoutDecimals - totalCaloriesOfAllFoods) >= 0 ? (initialValueWithoutDecimals - totalCaloriesOfAllFoods) : totalCaloriesOfAllFoods}
                  // value={
                  //   data.calories - totalCaloriesOfAllFoods >= data.calories
                  //     ? totalCaloriesOfAllFoods
                  //     : data.calories - totalCaloriesOfAllFoods
                  // }
                  value={totalCaloriesOfAllFoods}
                  showProgressValue={false}
                  initialValue={initialValueWithoutDecimals}
                  radius={100}
                  duration={2000}
                  activeStrokeWidth={12}
                  progressValueColor={'#ecf0f1'}
                  maxValue={data.calories}
                  circleBackgroundColor={'#353353'}
                  title={
                    totalCaloriesOfAllFoods >= data.calories
                      ? 'REACHED 🔥'
                      : `${data.calories - totalCaloriesOfAllFoods}`
                  }
                  titleColor={'white'}
                  titleStyle={{fontWeight: 'bold', fontSize: 22}}
                  subtitle={
                    totalCaloriesOfAllFoods >= data.calories
                      ? `${totalCaloriesOfAllFoods} KCAL`
                      : `KCAL LEFT 🔥`
                  }
                  subtitleStyle={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingTop: 10,
                  }}

                  // onAnimationComplete={()=>{alert('hai')}}
                  // disableAnimation={totalCaloriesOfAllFoods >= data.calories}
                />

                <Block row marginVertical={sizes.m}>
                  <Button
                    white
                    outlined
                    shadow={false}
                    radius={sizes.m}
                    margin={sizes.m}
                    //   onPress={() => {
                    //     alert(`Follow ${user?.name}`);
                    //   }}
                  >
                    <Block
                      justify="center"
                      radius={sizes.m}
                      paddingHorizontal={sizes.m}
                      paddingVertical={10}
                      color="rgba(255,255,255,0.2)">
                      <Text
                        white
                        bold
                        transform="uppercase"
                        center
                        paddingBottom={5}>
                        Protein
                      </Text>

                      <Progress.Bar
                        progress={progressValueOfProtein}
                        width={50}
                        color="white"
                      />
                      <Text
                        white
                        bold
                        // transform="uppercase"
                        center
                        paddingTop={5}>
                        {data.protien_g}g
                      </Text>
                    </Block>
                  </Button>
                  <Button
                    white
                    outlined
                    shadow={false}
                    radius={sizes.m}
                    marginBottom={sizes.m}
                    marginTop={sizes.m}
                    //   onPress={() => {
                    //     alert(`Follow ${user?.name}`);
                    //   }}
                  >
                    <Block
                      justify="center"
                      radius={sizes.m}
                      paddingHorizontal={sizes.m}
                      paddingVertical={10}
                      color="rgba(255,255,255,0.2)">
                      <Text
                        white
                        bold
                        transform="uppercase"
                        center
                        paddingBottom={5}>
                        Carbs
                      </Text>

                      <Progress.Bar
                        progress={progressValueOfCarb}
                        width={50}
                        color="white"
                      />
                      <Text
                        white
                        bold
                        // transform="uppercase"
                        center
                        paddingTop={5}>
                        {data.carb_g}g
                      </Text>
                    </Block>
                  </Button>
                  <Button
                    white
                    outlined
                    shadow={false}
                    radius={sizes.m}
                    margin={sizes.m}
                    //   onPress={() => {
                    //     alert(`Follow ${user?.name}`);
                    //   }}
                  >
                    <Block
                      justify="center"
                      radius={sizes.m}
                      paddingHorizontal={sizes.m}
                      paddingVertical={10}
                      color="rgba(255,255,255,0.2)">
                      <Text
                        white
                        bold
                        transform="uppercase"
                        center
                        paddingBottom={5}>
                        fat
                      </Text>

                      <Progress.Bar
                        progress={progressValueOfFat}
                        width={50}
                        color="white"
                      />
                      <Text
                        white
                        bold
                        // transform="uppercase"
                        center
                        paddingTop={5}>
                        {data.fat_g}g
                      </Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
            </Image>

            {/* profile: stats */}
            <Block
              flex={0}
              radius={sizes.sm}
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
              marginTop={-sizes.l}
              marginHorizontal="8%"
              color="rgba(255,255,255,0.2)">
              <TouchableOpacity
                onPress={() => {
                  if (dietPlan) {
                    navigation.navigate('unlockDiet', {
                      dietPlan,
                    });
                  }
                }}
                disabled={!dietPlan}>
                <Image
                  background
                  resizeMode="cover"
                  source={assets.card6}
                  blurRadius={5}
                  radius={sizes.cardRadius}>
                  <Block padding={sizes.padding}>
                    {/* user details */}
                    <Block row>
                      <Block>
                        <Text bold center primary>
                          UNLOCK YOUR FREE DIET PLAN
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Image>
              </TouchableOpacity>
            </Block>

            {/* profile: about me */}

            <Block card padding={0} marginTop={sizes.sm}>
              <Block
                row
                blur
                flex={0}
                intensity={100}
                radius={sizes.sm}
                overflow="hidden"
                tint={colors.blurTint}
                justify="space-evenly"
                paddingVertical={sizes.sm}
                renderToHardwareTextureAndroid>
                <ScrollCalender
                  formDataCopy={formDataCopy}
                  onDateChange={handleScrollCalendarDateChange}
                />
              </Block>
            </Block>
            {selectedDate === '' || selectedDate === currentDate ? (
              <>
                {breakfastItems.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    marginHorizontal={0}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/breakfast.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('foodPage', {
                              mealType: 'breakfast',
                              meal_type: 1,
                              data,
                              formDataCopy,
                            });
                          }}>
                          <Text p black semibold center padding={10}>
                            Breakfast ({totalBreakfastCalorie}) kcal
                          </Text>
                        </TouchableOpacity>

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'breakfast',
                            meal_type: '1',
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block margin={0} flex={1} centerContent>
                      <Block style={styles.container} margin={0}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {breakfastItems.map((item, index) => (
                          <Block style={styles.row} flex={1}>
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleDelete(index, 'breakfast')
                                  }>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        // alignContent: 'center',
                                        justifyContent: 'center',
                                      })
                                    }
                                    marginTop={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                              <Text style={styles.header}></Text>
                            </View>
                          </Block>
                        ))}

                        {/* Data Rows */}
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/breakfast.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'breakfast',
                              meal_type: 1,
                              formDataCopy,
                            })
                          }>
                          Add Breakfast
                        </Text>
                        <Text
                          black
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'breakfast',
                              meal_type: 1,
                              formDataCopy,
                            })
                          }>
                          (Recommended {Math.floor(data.calories * 0.18)} -{' '}
                          {Math.floor(data.calories * 0.25)} kcal)
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'breakfast',
                            meal_type: 1,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}

                {morningSnackItems.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/break.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {morningSnackItems.length > 1 ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('morngSnack', {
                                mealType: 'morningSnackItems',
                                meal_type: 1,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Morning Snacks ({totalMorningSnackCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('morngSnack', {
                                mealType: 'morningSnackItems',
                                meal_type: 1,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              Morning Snack ({totalMorningSnackCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                          //   <TouchableOpacity onPress={toggleExpand}>
                          //   <Text numberOfLines={expanded ? undefined : maxLines}  ellipsizeMode="tail">
                          //   {text}
                          //   </Text>
                          //   </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'morningSnackItems',
                            meal_type: 3,
                            formDataCopy,
                            data,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {morningSnackItems.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleDelete(index, 'morningSnackItems')
                                  }>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/break.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'morningSnackItems',
                              meal_type: 3,
                              formDataCopy,
                            })
                          }>
                          Add Morning Snacks
                        </Text>
                        <Text
                          black
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'morningSnackItems',
                              meal_type: 3,
                              formDataCopy,
                            })
                          }>
                          (Recommended {Math.floor(data.calories * 0.06)} -{' '}
                          {Math.floor(data.calories * 0.08)} kcal)
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'morningSnackItems',
                            meal_type: 3,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                {lunchItems.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/lunch.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {lunchItems.length > 1 ? (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('lunch', {
                                mealType: 'lunch',
                                meal_type: 3,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Lunch ({totalLunchCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('lunch', {
                                mealType: 'lunch',
                                meal_type: 3,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              Lunch ({totalLunchCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'lunch',
                            meal_type: 4,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {lunchItems.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() => handleDelete(index, 'lunch')}>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/lunch.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'lunch',
                              meal_type: 4,
                              formDataCopy,
                            })
                          }>
                          Add Lunch
                        </Text>
                        <Text
                          black
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'lunch',
                              meal_type: 4,
                              formDataCopy,
                            })
                          }>
                          (Recommended {Math.floor(data.calories * 0.27)} -{' '}
                          {Math.floor(data.calories * 0.36)} kcal)
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'lunch',
                            meal_type: 4,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                {eveningSnackItems.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/snacks.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {eveningSnackItems.length > 1 ? (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('evening', {
                                mealType: 'evening',
                                meal_type: 5,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Evening Snacks ({totalEveningSnackCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('evening', {
                                mealType: 'evening',
                                meal_type: 5,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              Evening Snack ({totalEveningSnackCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'evening',
                            meal_type: 5,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {eveningSnackItems.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleDelete(index, 'evening')
                                  }>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/snacks.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'evening',
                              meal_type: 5,
                              formDataCopy,
                            })
                          }>
                          Add Evening Snacks
                        </Text>
                        <Text
                          black
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'evening',
                              meal_type: 5,
                              formDataCopy,
                            })
                          }>
                          (Recommended {Math.floor(data.calories * 0.05)} -{' '}
                          {Math.floor(data.calories * 0.08)} kcal)
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'evening',
                            meal_type: 5,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                {dinnerItems.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/dinner.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {eveningSnackItems.length > 1 ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('dinner', {
                                mealType: 'dinner',
                                meal_type: 6,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Dinner ({totalDinnerCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('dinner', {
                                mealType: 'dinner',
                                meal_type: 6,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              Dinner ({totalDinnerCalorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'dinner',
                            meal_type: 6,
                            data,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {dinnerItems.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() => handleDelete(index, 'dinner')}>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/dinner.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'dinner',
                              meal_type: 6,
                              formDataCopy,
                              data,
                            })
                          }>
                          Add Dinner
                        </Text>
                        <Text
                          black
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'evening',
                              meal_type: 5,
                              formDataCopy,
                            })
                          }>
                          (Recommended {Math.floor(data.calories * 0.27)} -{' '}
                          {Math.floor(data.calories * 0.36)} kcal)
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'dinner',
                            meal_type: 6,
                            formDataCopy,
                            data,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                {mealItems1.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/meal.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {mealItems1.length > 1 ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('meal1', {
                                mealType: 'meal1',
                                meal_type: 7,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Meals 1 ({totalMeal1Calorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('meal1', {
                                mealType: 'meal1',
                                meal_type: 7,
                                data,
                                formDataCopy,
                              });
                            }}>
                            <Text p black semibold center padding={10}>
                              Meal 1 ({totalMeal1Calorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'meal1',
                            meal_type: 7,
                            data,
                            formDataCopy,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {mealItems1.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() => handleDelete(index, 'meal1')}>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/meal.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'meal1',
                              meal_type: 7,
                              formDataCopy,
                              data,
                            })
                          }>
                          Add Meal 1
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'meal1',
                            meal_type: 7,
                            formDataCopy,
                            data,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                {mealItems2.length > 0 ? (
                  <Block
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.s}
                    card
                    color="#f5e8fa">
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/meal2.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        {mealItems1.length > 1 ? (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('meal2', {
                                mealType: 'meal2',
                                meal_type: 8,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              {' '}
                              Meals 2 ({totalMeal2Calorie})  kcal
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('meal2', {
                                mealType: 'meal2',
                                meal_type: 8,
                                data,
                                formDataCopy,
                              })
                            }>
                            <Text p black semibold center padding={10}>
                              Meal 2 ({totalMeal2Calorie}) kcal
                            </Text>
                          </TouchableOpacity>
                        )}

                        <Block row flex={0} align="center" justify="center">
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[1, 0]}
                            start={[0, 1]}
                            gradient={gradients.divider}
                          />
                          <Text center marginHorizontal={sizes.s}></Text>
                          <Block
                            flex={0}
                            height={1}
                            width="50%"
                            end={[0, 1]}
                            start={[1, 0]}
                            gradient={gradients.divider}
                          />
                        </Block>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'meal2',
                            meal_type: 8,
                            formDataCopy,
                            data,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Block>
                      <Block style={styles.container}>
                        {/* Header */}
                        <Block style={styles.row} flex={1}>
                          <Text style={styles.header2} size={12} bold></Text>
                          <Text style={styles.header} bold size={12}>
                            Protein
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Carbs
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            Fat
                          </Text>
                          <Text style={styles.header} bold size={12}>
                            KCAL
                          </Text>
                          <Text style={styles.header}></Text>
                        </Block>

                        {/* Data Rows */}

                        <Block>
                          {mealItems2.map((item, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                              <Text
                                style={styles.header2}
                                size={12}
                                bold
                                numberOfLines={
                                  expandedItems.includes(index) ? 0 : 1
                                }>
                                {item.food_name}
                              </Text>

                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalProtein}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCarb}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalFat}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                {item.details.totalCalorie}
                              </Text>
                              <Text style={styles.header} semibold size={12}>
                                <TouchableOpacity
                                  onPress={() => handleDelete(index, 'meal2')}>
                                  <Image
                                    source={require('../assets/icons/close1.png')}
                                    color={'#fa9579'}
                                    style={
                                      (styles.data,
                                      {
                                        width: 20,
                                        height: 20,
                                        alignContent: 'center',
                                      })
                                    }
                                    margin={sizes.s}
                                  />
                                </TouchableOpacity>
                              </Text>
                            </View>
                          ))}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                ) : (
                  <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={sizes.m}
                    marginHorizontal={10}
                    card
                    color="rgb(245,232,250)"
                    center>
                    <Block row align="center">
                      <Block flex={0}>
                        <Image
                          source={require('../assets/icons/meal2.png')}
                          style={{
                            width: sizes.xl,
                            height: sizes.xl,
                          }}
                          marginLeft={sizes.s}
                        />
                      </Block>
                      <Block flex={3} style={{alignSelf: 'center'}}>
                        <Text
                          p
                          black
                          semibold
                          center
                          padding={10}
                          onPress={() =>
                            navigation.navigate('searchfood', {
                              mealType: 'meal2',
                              meal_type: 8,
                              formDataCopy,
                              data,
                            })
                          }>
                          Add Meal 2
                        </Text>
                      </Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('searchfood', {
                            mealType: 'meal2',
                            meal_type: 8,
                            formDataCopy,
                            data,
                          })
                        }>
                        <Block flex={0} style={{alignSelf: 'center'}}>
                          <Image
                            radius={0}
                            width={25}
                            height={25}
                            color={'#c58bf2'}
                            source={assets.plus}
                            transform={[{rotate: '360deg'}]}
                            margin={sizes.s}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                )}
                <Button flex={2} marginTop={sizes.m}>
                  {/* <Text black bold>
                    Water Tracker
                  </Text> */}
                </Button>

                {/* <Progress.Bar progress={0.3}  width={100}  /> */}
                <Block flex={0}>
                  <Image
                    background
                    resizeMode="cover"
                    padding={sizes.sm}
                    paddingBottom={sizes.l}
                    radius={sizes.cardRadius}
                    source={assets.green}
                    blurRadius={10}>
                    <Block flex={0}>
                      <Image source={{uri: user?.avatar}} />
                      <Lottie
                        width={64}
                        height={64}
                        marginBottom={sizes.sm}
                        source={require('../assets/json/water.json')}
                        progress={animationProgress.current}
                      />
                      <Text h5 center white>
                        {/* {user?.name} */}
                        Water Tracker
                      </Text>
                      <Text p center white>
                        {/* Target */}
                      </Text>
                      {/* <Block flex={0} align="center" padding={sizes.xl}>
                        <ProgressBar
                          steps={6}
                          ranges={[
                            '0',
                            '150',
                            '400',
                            '600',
                            '800',
                            '1000',
                            '1200',
                          ]}
                          dotDiameter={10}
                          width={325}
                          height={3}
                          currentStep={currentStep}
                          stepToStepAnimationDuration={1000}
                          withDots
                        />
                      </Block> */}
                      {/* <Block
                        row
                        justify="space-between"
                        marginBottom={sizes.base}
                        marginTop={sizes.sm}>
                        <Button
                          flex={2}
                          gradient={gradients.dark}
                          marginHorizontal={sizes.s}>
                          <TouchableOpacity onPress={handlePrevStep}>
                            <Text white bold marginHorizontal={sizes.s}>
                              -
                            </Text>
                          </TouchableOpacity>
                        </Button>
                        <Button flex={2} gradient={gradients.dark}>
                          <TouchableOpacity onPress={handleNextStep}>
                            <Text white bold marginHorizontal={sizes.sm}>
                              +
                            </Text>
                          </TouchableOpacity>
                        </Button>
                      </Block> */}
                      <Block row marginTop={25} centerContent>
                        <Block
                          flex={0}
                          width={160}
                          height={80}
                          card
                          center
                          marginTop={30}>
                          <Block
                            center
                            flex={0}
                            marginBottom={10}
                            marginRight={20}>
                            <Lottie
                              width={44}
                              height={54}
                              source={require('../assets/json/water.json')}
                              progress={animationProgress.current}
                            />
                          </Block>
                          <Block flex={0} marginLeft={30}>
                            <Text center info h5 bold>
                            {Math.round(waterAmount * 100)}% 
                            </Text>
                            <Text center semibold secondary>
                              Water intake
                            </Text>
                          </Block>
                        </Block>
                        <Block
                          flex={0}
                          // card
                          width={130}
                          marginHorizontal={10}
                          center
                          padding={10}>
                          <Block
                            flex={1}
                            centerContent
                            center
                            style={{
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}>
                            {/* <Block center marginBottom={10}>
                            <Lottie
                              width={64}
                              height={64}
                              source={require('../assets/json/water.json')}
                              progress={animationProgress.current}
                            />
                          </Block> */}
                            <Image
                              center
                              source={require('../assets/icons/glass.png')}
                              height={40}
                              width={40}></Image>
                          </Block>
                          <Block row center marginTop={10}>
                            <Block flex={0} marginRight={5}>
                              <Button info onPress={decreaseWater}>
                                <Text bold white p>
                                  -
                                </Text>
                              </Button>
                            </Block>
                            <Block flex={0}>
                              <Button
                                info
                                marginLeft={5}
                                onPress={increaseWater}>
                                <Text bold white>
                                  {' '}
                                  +{' '}
                                </Text>
                              </Button>
                            </Block>
                          </Block>
                        </Block>
                        <Block flex={1} center>
                       
                          <Block transform={[{rotate: '-90deg'}]} centerContent flex={0} width={100} margin={-20}>
                            {/* <Lottie
                             source={require('../assets/json/water2.json')} // Replace with the path to your fill animation JSON file
                             autoPlay={false}
                             loop={false}
                             style={{ width: 50, height: 100, position: 'absolute', bottom: 0 }}
                            >

                            </Lottie> */}
                            <Progress.Bar
                              progress={waterAmount}
                              width={100}
                              height={10}
                              color="skyblue"></Progress.Bar>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Image>
                </Block>
              </>
            ) : (
              <PreviousDietDetails data={apiData} />
            )}
          </Block>
        </Block>
      </Block>

      {/* toggle products list */}

      {/* products list */}
    </Block>
  );
};
const styles = StyleSheet.create({
  progressBar: {
    width: 10,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 15,
  },
  progressBarFill: {
    backgroundColor: 'skyblue',
    borderRadius: 15,
  },
  progressText: {
    fontSize: 16,
    marginVertical: 10,
  },
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
    flex: 4,
    flexDirection: 'row', // set elements horizontally, try column.
    padding: 10,
  },
  container: {
    flex: 3,
    // backgroundColor: '#f9f6ee',
    padding: 10,
  },
  mainCardView: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 15,
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
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 0,
    backgroundColor: 'transparent',
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    // alignSelf: 'center',
    minWidth: 60,
    // justifyContent:'center'
  },
  header2: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    // alignSelf: 'center',
    minWidth: 70,
    // justifyContent:'center'
  },
  header3: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    // alignSelf: 'center',
    maxWidth: 50,
  },
  data: {
    flex: 2,
    fontSize: 16,
    padding: 5,
    minWidth: 60,
    // paddingBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    flexDirection: 'row',
  },
});

export default DietPlan;
