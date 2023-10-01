/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Linking, StyleSheet} from 'react-native';


import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';

import Firstpage from './Frstpage';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = ({ route }) => {
  const { data, formDataCopy, dietPlan } = route.params ?? {};

  // console.log('ScreensStack Component - Data:', data);
  // console.log('ScreensStack Component - FormDataCopy:', formDataCopy);
  // console.log('ScreensStack Component - DietPlan:', dietPlan);

  
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens data={data} formDataCopy={formDataCopy} dietPlan={dietPlan} />
      {/* <Firstpage /> */}
    </Animated.View>
    // <Firstpage />
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {

  const {navigation ,formDataCopy} = props;
  const {t} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Tab');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);
  
  const handleEditGoalPress = () => {
    Alert.alert(
      'Edit Goal',
      'Do you want to edit your goal?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Edit',
          onPress: () => {
            // Handle the logic to navigate to the "Edit Goal" screen here
            navigation.navigate('Details'); // Replace 'Details' with the correct screen name
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  // screen list for Drawer menu
  const screens = [
    {name: "Home", to: 'Tab', icon: assets.home},
    {
      name: 'Edit Goal',
      
      to: 'DemoAlert',
      icon: assets.rental,
    },
    {name: 'Water Tracker', to: 'Pro', icon: assets.kcal},
    {name: 'Track Progress', to: 'Profile', icon: assets.office},
   
    {name:'Share App', to: 'Register', icon: assets.profile}
   
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={40}
            color={colors.primary}
            source={require('../assets/icons/fitaraise.png')}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              Fitaraise
            </Text>
            <Text size={12} semibold>
              {formDataCopy.first_name}
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p bold={isActive} color={colors[isActive ? 'primary' : 'black']}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          FITARAISE
        </Text>

        <Button
      //  color={colors.info}
      
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          // onPress={() =>
          //   handleWebLink('https://github.com/creativetimofficial')
          // }
          >
          <Block
          
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={require('../assets/icons/logout.png')}
            />
          </Block>
          <Text p color={labelColor} center>
           Logout
          </Text>
        </Button>

        {/* <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>{t('darkMode')}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
              Alert.alert('hei');
            }}
          />
        </Block> */}
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default function Menu({route}) {
  const { data, formDataCopy, dietPlan } = route.params ?? {};
  console.log(formDataCopy, data, "menu drawer check");
  

  const {gradients} = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => <DrawerContent {...props} formDataCopy={formDataCopy}/>}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} initialParams={{ data, formDataCopy, dietPlan }} />
      </Drawer.Navigator>
    </Block>
  );
};
