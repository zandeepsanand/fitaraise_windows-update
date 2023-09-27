import React, {useEffect, useRef, useState} from 'react';
import api, {setAuthToken} from '../../api';
import RNPickerSelect from 'react-native-picker-select';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Switch,
} from 'react-native';
import {Animated, Easing} from 'react-native';
import Lottie from 'lottie-react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/svg/login.svg';
import {Block, Button, Image, Input} from '../components';
import {useTheme} from '../hooks';
import CountryPicker from 'react-native-country-picker-modal';
// import { CountryCode, Country } from './';

import InputField from '../components/inputField';
const isAndroid = Platform.OS === 'android';

const CountrySelect = ({navigation}) => {
  const {assets, colors, gradients, sizes} = useTheme();
  const [countryCode, setCountryCode] = useState<CountryCode>('FR');
  const [country, setCountry] = useState<Country>(null);
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(true);
  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    acitivity_level: '',
    weekly_goal: '',
    is_vegetarian: '',
    age: '',
    dob: '',
    gender: '',
    device_token: '',
    image: '',
    customer_id: '',
    weight_want_to: '',
    country: null,
  });

  // const onSelect = (country: Country) => {
  //   setCountryCode(country.code);
  //   setCountry(country);
  //   setSelectedCountry(country);
  //   console.log(country.code);
  // };
  // useEffect(() => {
  //   if (selectedCountry) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       country: selectedCountry,
  //     }));
  //   }
  // }, [selectedCountry]);
  const [countryList, setCountryList] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await api.get('get_country_list');
        const countries = response.data.data;
        setCountryList(countries);
      } catch (error) {
        console.error('Error fetching country list:', error);
      }
    };

    fetchCountryList();
  }, []);

  // Handle country selection

  const handleCountrySelect = (value) => {
    setSelectedCountry(value);
  };
  const onSelect = (country) => {
    setCountryCode(country);
    setCountry(country);
    setSelectedCountry(country);
    console.log(country);
  };

  useEffect(() => {
    if (selectedCountry) {
      // Update the formData with the selected country
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: selectedCountry,
      }));
    }
  }, [selectedCountry]);
  // console.log(countryList);

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Block safe marginTop={sizes.xl} style={{backgroundColor: '#ffff'}}>
      <Block scrollEnabled>
        <Block>
          <Image
            source={require('../assets/images/country.png')}
            height={300}
            width={300}
            style={{alignSelf: 'center', zIndex: 10}}
          />
          <Lottie
            style={{position: 'absolute'}}
            marginBottom={sizes.sm}
            source={require('../assets/json/bg.json')}
            progress={animationProgress.current}
          />
        </Block>
        <Block paddingHorizontal={sizes.sm}>
          <Block align="center" flex={0} center>
            {/* <CountryPicker
              {...{
                countryCode,
                withFilter,
                withFlag,
                withCountryNameButton,
                withAlphaFilter,
                withCallingCode,
                withEmoji,
                onSelect,
              }}
              visible
            /> */}
            <RNPickerSelect
              placeholder={{label: 'Select a country', value: null}}
              onValueChange={onSelect}
              items={countryList.map((country) => ({
                label: country.country_name,
                value: country.code,
                Icon: (
                  <Image
                    source={{uri: country.image_sm}}
                    style={{width: 30, height: 20}}
                  />
                ),
              }))}
              value={selectedCountry}
              useNativeAndroidPickerStyle={false}
            />
          </Block>

          <Block center>
            <Button
              gradient={gradients.primary}
              shadow={!isAndroid}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              onPress={() => navigation.navigate('login', {country: country})}>
              <Text bold white style={{color: 'white'}}>
                Next
              </Text>
            </Button>
          </Block>
        </Block>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{color: 'green', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View> */}
      </Block>
    </Block>
  );
};

export default CountrySelect;
