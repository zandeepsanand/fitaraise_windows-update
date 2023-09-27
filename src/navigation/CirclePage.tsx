/* eslint-disable prettier/prettier */
import React, {useState,useRoute } from 'react';
import {View, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import {DonutChart} from 'react-native-circular-chart';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {Block, Button, Text, Image} from '../components';
import {SIZES} from '../constants/light';
import Svg, {Circle} from 'react-native-svg';
import { G } from 'react-native-svg';
import {useTheme} from '../hooks';
import NextButton from './NextButton';
import DonutChart1 from './DonutChart';


const DATA = [
  {name: 'sandeep', value: 10, color: '#F44336'},
  {name: 'san', value: 30, color: '#FFC107'},
  {name: 'sandeepf', value: 20, color: '#03A9F4'},
];
// const data=
// {calories: 1648, carb_g: 206, carb_percent: "50%", fat_g: 37, fat_percent: "20%", protien_g: 124, protien_percent: "30%"}

const props = {
  activeStrokeWidth: 25,
  inActiveStrokeWidth: 25,
  inActiveStrokeOpacity: 0.2,
};

const CirclePage = ({route ,navigation}) => {
const {data ,formDataCopy, dietPlan} = route.params ;
console.log(dietPlan);
// const donutData = data.map((item) => ({
//   name: item.key,
//   value: Number(item.value.replace('%', '')),
//   color: item.svg.fill,
// }));

  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [tab, setTab] = useState<number>(0);
  const {width, height} = useWindowDimensions();
  const PADDING = 8;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = 50;
  const progressOffset = circumference - (progress / 100) * circumference;


  function checkPage(){
    navigation.navigate('tabNavigator', {
      screen: 'pie', // Screen name within the TabNavigator
      params: { data, formDataCopy, dietPlan }, // Pass your parameters here
    });;

  }
  return (
    <>
    <Block  scroll
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingVertical: sizes.padding}}>
      
      <Block
        card
        padding={SIZES.s}
        flex={2}
        marginHorizontal={10}
        style={{marginTop: 60, alignSelf: 'center', paddingTop: 30}}>
        <Block flex={2} style={{position: 'relative', paddingBottom: 0}}>
          {/* <DonutChart
            data={[
  {name: 'sandeep', value: 10, color: '#F44336'},
  {name: 'san', value: 30, color: '#FFC107'},
  {name: 'sandeepf', value: 20, color: '#03A9F4'},
]}
            strokeWidth={15}
            radius={90}
            containerWidth={width - PADDING * 2}
            containerHeight={105 * 2}
            type="round"
            startAngle={0}
            endAngle={360}
            animationType="slide"
          /> */}
          <Block card style={{width:350}}>
          <DonutChart1 navigation={navigation} route={route}/>
          <View
         style={{
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           alignItems: 'center',
           justifyContent: 'center',
         }}>
         <Text style={{fontSize: 24, fontWeight: 'bold'}}>
           {data.calories}
         </Text>
         <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}} bold>
           KCAL
         </Text>
       </View>
          </Block>
         
       
        </Block>
        <Block
          flex={1}
          center
          marginTop={20}
          marginBottom={20}
          style={{alignSelf: 'center', position: 'relative'}}>
          <Text bold style={{fontSize: 24}}>Daily recommended nutrtional values</Text>
        </Block>

        <Block flex={0} row center style={{position: 'relative'}} marginBottom={15} marginTop={10}>
          <Block  center align="center"  style={{maxHeight: 100 }}>
            <Text p black bold  >
              Energy
            </Text>
            <Text p black semibold padding={10} center>
            {data.calories} KCAL
            </Text>
          </Block>
          <Block  center align="center"  style={{maxHeight: 90}}>
            <Text p black bold>
              Protien
            </Text>
            <Text p black semibold padding={10} center>
            {data.protien_g}g ({data.protien_percent})
            </Text>
          </Block>
          <Block  center align="center"  style={{maxHeight: 90}}>
            <Text p black bold>
              Carbs
            </Text>
            <Text p black semibold padding={10} center>
            {data.carb_g}g ({data.carb_percent})
            </Text>
          </Block>
          <Block  center align="center"  style={{maxHeight: 90}}>
            <Text p black bold>
              Fats
            </Text>
            <Text p black semibold padding={10} center>
              {/* {data.protien_g} */}
              {data.fat_g}g ({data.fat_percent})
            </Text>
          </Block>
        </Block>
      </Block>
      <Block flex={1} marginTop={10}>
        <Block>
          <Block
            style={styles.mainCardView}
            flex={0}
            radius={46}
            gradient={gradients?.[tab === 0 ? 'success' : '#fffff']}>
            <Block center>
              <Text p font={fonts.semibold}>
                {'For Best Results....'}
              </Text>
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 0,
                  width: '85%',
                }}></View>
            </Block>
          </Block>
        </Block>
      </Block>
      <Block flex={1}  marginHorizontal={5} marginTop={20}>
        <Block row marginHorizontal={20}> 
        <Text bold>*  </Text>
          <Text semibold>Eat an overall balanced diet</Text>
        </Block>
        <Block row marginHorizontal={20}> 
        <Text bold>*  </Text>
          <Text semibold>Track your macros & follow your diet</Text>
        </Block>
        <Block row marginHorizontal={20}> 
        <Text bold>*  </Text>
          <Text semibold>Stay Hydrated </Text>
        </Block>
        <Block row marginHorizontal={20}> 
        <Text bold>*  </Text>
          <Text semibold>Don’t forget to do your excercise</Text>
        </Block>
        <Block row marginHorizontal={20}> 
        <Text bold>*  </Text>
          <Text semibold>Be consistent , The results will follow</Text>
        </Block>
      </Block>
    
      {/* <Block
        flex={0}
        card
        center
        style={{position: 'relative', alignSelf: 'center', margin: 10}}>
        <CircularProgressBase
          {...props}
          value={80}
          radius={125}
          activeStrokeColor={'#e84118'}
          inActiveStrokeColor={'#e84118'}>
          <CircularProgressBase
            {...props}
            value={87}
            radius={100}
            activeStrokeColor={'#badc58'}
            inActiveStrokeColor={'#badc58'}>
            <CircularProgressBase
              {...props}
              value={62}
              radius={75}
              activeStrokeColor={'#18dcff'}
              inActiveStrokeColor={'#18dcff'}
            />
          </CircularProgressBase>
        </CircularProgressBase>
      </Block> */}
     
    
     <View  style={styles.container2} >
      <TouchableOpacity  onPress={() => { checkPage(); }}>
      <Image
          source={assets.Button}
         
        />
      </TouchableOpacity>
        
      </View>
    </Block>
    {/* <View style={styles.container}>
    
      <View style={styles.contentContainer}>
      
        
      </View>
    
      <TouchableOpacity style={styles.buttonContainer}>
       <NextButton/>
      </TouchableOpacity>
    </View> */}
    
   
    
    </>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    margin:10,
    position:'relative',
    padding: 0,
   
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    flex: 1,
    // Other styles for the last section of the page
  },
  sectionText: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    position: 'absolute', // Positions the button absolutely
    bottom: 16, // Distance from the bottom of the page
    right: 16, // Distance from the right of the page
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    color:'transparent'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },

  mainCardView: {
    height: 60,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 10,
    marginBottom: 6,
  },
  sectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgray',
    backgroundColor: '#00000',
    marginVertical: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  container2: {
    flex: 0,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop:30,
    paddingRight:30,
  
  },
});

export default CirclePage;
