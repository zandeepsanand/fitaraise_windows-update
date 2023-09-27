/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Platform, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme} from '../hooks/';
import {Block, Button, Input, Image, Modal, Text} from '../components/';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import Ripple from 'react-native-material-ripple';
import {Ionicons} from '@expo/vector-icons';
import TypingText from 'react-native-typing-text';
import axios from 'axios';
import {BASE_URL} from '@env';
const isAndroid = Platform.OS === 'android';

// buttons example
const Buttons = () => {
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState('01');
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <Block paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Buttons
      </Text>
      <Block>
        <Button flex={1} gradient={gradients.primary} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            Primary
          </Text>
        </Button>
        <Button
          flex={1}
          gradient={gradients.secondary}
          marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            Secondary
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.info} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            info
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.success} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            success
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.warning} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            warning
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.danger} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            danger
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.light} marginBottom={sizes.base}>
          <Text bold transform="uppercase">
            light
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.dark} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            dark
          </Text>
        </Button>
        <Block row justify="space-between" marginBottom={sizes.base}>
          <Button
            flex={1}
            row
            gradient={gradients.dark}
            onPress={() => setModal(true)}>
            <Block
              row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <Text white bold transform="uppercase" marginRight={sizes.sm}>
                {quantity}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.white}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          <Button flex={1} gradient={gradients.dark} marginHorizontal={sizes.s}>
            <Text white bold transform="uppercase" marginHorizontal={sizes.s}>
              Delete
            </Text>
          </Button>
          <Button gradient={gradients.dark}>
            <Text white bold transform="uppercase" marginHorizontal={sizes.sm}>
              Save for later
            </Text>
          </Button>
        </Block>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={['01', '02', '03', '04', '05']}
          renderItem={({item}) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setQuantity(item);
                setModal(false);
              }}>
              <Text p white semibold transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
};

// texts example
const Typography = () => {
  const {sizes} = useTheme();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Typography
      </Text>
      <Block>
        <Text h1>Heading 1</Text>
        <Text h2>Heading 2</Text>
        <Text h3>Heading 3</Text>
        <Text h4>Heading 4</Text>
        <Text h5>Heading 5</Text>
        <Text p>Paragraph</Text>
        <Text marginBottom={sizes.xs}>Text</Text>
      </Block>
    </Block>
  );
};

// inputs example
const Inputs = () => {
  const {colors, sizes} = useTheme();

  return (
    <Block
      color={colors.card}
      marginTop={sizes.m}
      paddingTop={sizes.m}
      paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Inputs
      </Text>
      <Block>
        <Input placeholder="Regular" marginBottom={sizes.sm} />
        <Input placeholder="Search" marginBottom={sizes.sm} />
        <Input
          search
          label="Search"
          marginBottom={sizes.sm}
          placeholder="Search with label"
        />
        <Input success placeholder="Success" marginBottom={sizes.sm} />
        <Input danger placeholder="Error" marginBottom={sizes.sm} />
        <Input disabled placeholder="Disabled" marginBottom={sizes.sm} />
      </Block>
    </Block>
  );
};

// switch example

// social example
const Social = () => {
  const {sizes} = useTheme();

  return (
    <Block paddingVertical={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Social
      </Text>
      <Block row justify="space-evenly">
        <Button social="facebook" />
        <Button social="twitter" />
        <Button social="dribbble" />
      </Block>
    </Block>
  );
};

// cards example
const Cards = ({route, navigation}) => {
  const {formData} = route.params;
  // console.log(formData ,"checking");
  // const formData = {
    
  //   acitivity_level: 'sedentary',
  //   age: '29',
  //   customer_id: '14',
  //   device_token: '',
  //   dob: '',
  //   email: 'saasaee@gmail.com',
  //   first_name: 'vijay',
  //   gender: 'male',
  //   height: '178',
  //   height_unit: 'cm',
  //   image: '',
  //   is_vegetarian: '1',
  //   last_name: '',
  //   mobile_number: '8606786699',
  //   weekly_goal: '1',
  //   weight: '65',
  //   weight_unit: 'kg',
  //   weight_want_to: 'gain',
  // };

  const {assets, colors, gradients, sizes} = useTheme();
  const [showModal, setModal] = useState(false);
  const [showModalCm, setModalCm] = useState(false);
  const [showModalFeet, setModalFeet] = useState(false);
  const [ feetView , setFeetView] = useState(false); 
  const [showModalKg, setModalKg] = useState(false);
  const [age, setAge] = useState('');
  const [kg, setKg] = useState('');
  const [lbs, setLbs] = useState('');
  const [cm, setCm] = useState('');
  const [feet, setFeet] = useState('');
  const [checked, setChecked] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputValueInch, setInputValueInch] = useState('');
  const [inputValueFeet, setInputValueFeet] = useState('');
  const [isKg, setIsKg] = useState(true);
  const [selectedData, setSelectedData] = useState(''); // state to store selected data
  const [isCm, setIsCm] = useState(true); // state to track if CM is selected
  const [selectedUnit, setSelectedUnit] = useState('cm');
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [gender, setGender] = useState('');
  // const [data, setData] = useState(null);
  state = {
    showButton2: false,
  };

  handlePress = () => {
    this.setState({
      showButton2: !this.state.showButton2,
    });
  };
  // const handleInputChange = (value) => {
  //   if (isKg && value <= 200) {
  //     setInputValue(value);
  //   } else if (!isKg && value <= 440) {
  //     setInputValue(value);
  //   }
  // };
  const handleInputChange = (value) => {
    if (isKg && value <= 200) {
      setInputValue(value);
      const updatedFormData = {
        ...formData,
        weight: value,
        weight_unit: 'kg',
      };
      navigation.setParams({formData: updatedFormData});
      console.log(updatedFormData);
    } else if (!isKg && value <= 440) {
      setInputValue(value);
      const updatedFormData = {
        ...formData,
        weight: value,
        weight_unit: 'lbs',
      };
      navigation.setParams({formData: updatedFormData});
      console.log(updatedFormData);
    }
  };
  const handleInputChangeFeet = (value) => {
    setInputValueFeet(value);
    const updatedFormData = {
      ...formData,
      feet: value,
      height:'',
      height_unit: 'ft',
    };
    navigation.setParams({formData: updatedFormData});
    console.log(updatedFormData);
  };
  const handleInputChangeInches = (value) => {
    setInputValueInch(value);
    const updatedFormData = {
      ...formData,
      inches: value,
      height:'',
      height_unit: 'ft',
    };
    navigation.setParams({formData: updatedFormData});
    console.log(updatedFormData , "height unit check");
  };

  const handlePrimaryPress = () => {
    setIsKg(true); // set isKg state to true when primary button is pressed
    const updatedFormData = {
      ...formData,
     
      weight_unit: 'kg',
    };
    navigation.setParams({formData: updatedFormData});
   
  };

  const handleSecondaryPress = () => {
    setIsKg(false); // set isKg state to false when secondary button is pressed
    const updatedFormData = {
      ...formData,
     
      weight_unit: 'lbs',
    };
    navigation.setParams({formData: updatedFormData});
    console.log(updatedFormData , "height unit check");
  };

  // const handleGenderSelection = (selectedGender) => {
  //   setGender(selectedGender);
  // };

  // const handleFormSubmit = () => {
  //   const formData = new FormData();
  //   formData.append('gender', gender);
  //   console.log(formData);

  //   // submit the form data to the server or do something else with it
  // };
  const handleOptionSelect = (option) => {
    const updatedFormData = {
      ...formData,
      gender: option,
    };
    setGender(option);
    navigation.setParams({formData: updatedFormData});
    // navigation.navigate('Demo1', {formData: updatedFormData});
  };
  const handleActivitySelect = (option) => {
    setActivity(option); // This sets the 'acitivity_level' in the state with the latest 'option'
    const updatedFormData = {
      ...formData,
      acitivity_level: option,
    };
    console.log(option, "new checking"); // Log the 'option', which is the latest 'acitivity_level'
  
    navigation.setParams({ formData: updatedFormData });
   
    

  };
  const handleAgeSelect = (item) => {
    const updatedFormData = {
      ...formData,
      age: item,
    };
    setAge(item);
    navigation.setParams({formData: updatedFormData});
    // navigation.navigate('Demo1', {formData: updatedFormData});
  };
  const handleHeightSelect = (item) => {
    setSelectedData(item);
    console.log(selectedData ,"height selected");
    setCm(item);
    
    const updatedFormData = {
      ...formData,
      height: item,
      height_unit: 'cm',
      feet:'',
      inches:'' ,
    };
    
    
    navigation.setParams({formData: updatedFormData});
    // navigation.navigate('Demo1', {formData: updatedFormData});
    console.log(formData ,"testing");
    
  };

  const handleUnitSelect = (unit) => {
    const updatedFormData = {
      ...formData,
      height_unit: unit,
    };
    setSelectedUnit(unit);
    // navigation.setParams({formData: updatedFormData})
  };

  // const handleHeightFeetSelect = (item) => {
  //   const updatedFormData = {
  //     ...formData,
  //     height: item,
  //   };
  //   setFeet(item);
  //   navigation.setParams({formData: updatedFormData});
  //   // navigation.navigate('Demo1', {formData: updatedFormData});
  // };
  const handleKgSelect = (item) => {
    const updatedFormData = {
      ...formData,
      weight: item,
    };
    setKg(item);
    navigation.setParams({formData: updatedFormData});

    // navigation.navigate('Demo1', {formData: updatedFormData});
  };
  // function checkPage() {

  // }
  // function checkPage(){

  //   if ( formData.gender ){
  //     console.log(formData);

  //       const fetchData = async () => {
  //         try {
  //           const response = await axios.post(`${BASE_URL}set_personal_datas`, formData);

  //           if (response.data.success) {
  //             // Call the second API
  //             const secondApiResponse = await axios.get(`${BASE_URL}get_daily_required_calories/${formData.customer_id}`);

  //             // Do something with the second API response
  //             // console.log(secondApiResponse.data);
  //             setData(secondApiResponse.data.data);
  //             console.log(data);
  //             // navigation.navigate('Progress', { data });

  //           }

  //           // Do something with the first API response
  //           // console.log(response.data);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       };
  //       fetchData();

  //      }
  //      else {
  //       alert('Please enter all details')
  //      }

  // }
  function checkPage() {
    // console.log(formData);

    if (formData.gender  && formData.weight && ((formData.feet && formData.inches) || formData.height) && formData.acitivity_level) {
      // Create a copy of the formData object
      const formDataCopy = {...formData};
      console.log(formDataCopy, 'form data');

      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}set_personal_datas`,
            formDataCopy,
          );
          console.log(formDataCopy, 'customer id ');

          console.log(response.data, 'hello ');

          if (response.data.success) {
            console.log("hai testing");
            
            // Call the second API
            const secondApiResponse = await axios.get(
              `${BASE_URL}get_daily_required_calories/${formDataCopy.customer_id}`,
            );
            // Do something with the second API response
            const data = secondApiResponse.data.data;
            // setData(secondApiResponse.data.data);
            console.log(data, 'the data of second apifffff');
            if (data === null) {
              //  alert('some error occur');
              console.log('first click');

              checkPage();
            } else {
              console.log('success');

              navigation.navigate('AnimationPage', {data , formDataCopy});
            }
            // navigation.navigate('donutchart', { data });
          }
          // Do something with the first API response
          // console.log(response.data);
        } catch (error) {
          console.error(error, 'errorsss');
         
          
        }
      };
      fetchData();
    } else {
      console.log(formData.gender, formData.weight , formData.feet ,formData.inches , formData.acitivity_level,formData.height);
      
      alert('Please enter all details');
    }
  }

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Block card padding={0}>
        <Image
          background
          resizeMode="cover"
          source={assets.greeny}
          radius={sizes.cardRadius}>
          <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
            <Text h4 white marginBottom={sizes.sm} marginTop={sizes.sm}>
              Let’s complete your profile
            </Text>
            <Text p white>
              It will help us to know more about you!
            </Text>
            {/* user details */}
            <Block row marginLeft={sizes.xs} marginTop={sizes.xxl}>
              <Image
                source={assets.avatar2}
                style={{
                  width: sizes.xl,
                  height: sizes.xl,
                  borderRadius: sizes.s,
                }}
              />
              <Block marginLeft={sizes.s}>
                <Text p white semibold>
                  {formData.first_name}
                </Text>
                <Text p white>
                  {formData.weightWantTo}
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
      <Block  marginTop={sizes.m} >
        <Block card padding={0}>
        <Image
          background
          resizeMode="cover"
          source={assets.greeny}
          radius={sizes.cardRadius}>
        <Block flex={1} center>
          <Text center h5 bold paddingTop={10}>Height & Weight</Text>
        </Block>
        <Block
          row
          justify="space-between"
          marginBottom={sizes.base}
          marginTop={sizes.m}>
         
          {feetView === true ? (
    <Button
    flex={2}
    row
    onPress={() => setModalKg(true)}
    marginRight={sizes.base}>
    <Block row align="center" justify="space-around">
      {/* <Text dark bold transform="uppercase" marginRight={sizes.sm}>
        {kg} Kg
      </Text> */}
      <Input
        placeholder={'Foot'}
        keyboardType="numeric"
        maxLength={2}
        value={inputValueFeet}
        style={{
          height: 50,
          width: 60,
        
          borderRadius: 10,
          backgroundColor: 'white',
          borderWidth: 0,
         
        }}
        onChangeText={handleInputChangeFeet}
      />
         <Input
        placeholder={"Inches"}
        keyboardType="numeric"
        maxLength={6}
        value={inputValueInch}
        style={{
          height: 50,
          width: 60,
          flex: 0.5,
          borderRadius: 10,
          backgroundColor: 'white',
          borderWidth: 0,
          marginLeft:10
        }}
        onChangeText={handleInputChangeInches}
      />
    </Block>
  </Button>
          ) : (
            <Button
            flex={2}
            row
            gradient={gradients.light}
            onPress={() => setModalCm(true)}
            marginRight={sizes.base}>
            <Block
              row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <Text dark bold transform="uppercase" marginRight={sizes.sm}>
                {selectedData} {isCm ? 'CM' : 'FEET'}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.white}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          )}
        

          <Block
            flex={4}
            style={{
              alignItems: 'center',
              shadowRadius: 8,
              shadowOpacity: 0.3,
              shadowColor: '#757575',
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <DuoToggleSwitch
              primaryText="Cm"
              secondaryText="Feet"
              onPrimaryPress={() => {
                setModalCm(true);
                setIsCm(true);
                setFeetView(false); 
                const updatedFormData = {
                  ...formData,
                 
                  height_unit: 'cm',
                };
                navigation.setParams({formData: updatedFormData});
              }}
              onSecondaryPress={() => {
                // setModalFeet(true);
                setFeetView(true)
                setIsCm(false);
                const updatedFormData = {
                  ...formData,
                 
                  height_unit: 'ft',
                };
                navigation.setParams({formData: updatedFormData});
               
              }}
              TouchableComponent={Ripple}
              primaryButtonStyle={{width: 125, height: 50}}
              secondaryButtonStyle={{width: 90, height: 50}}
              primaryTextStyle={{marginRight: 32}}
              rippleColor="#fff"
              rippleContainerBorderRadius={50}
              activeColor="#5f9b4c"
            />
          </Block>
          {/* <Button flex={2} gradient={gradients.dark} marginHorizontal={sizes.s}>
            <Text white bold transform="uppercase" marginHorizontal={sizes.s}>
              CM
            </Text>
          </Button>
          <Button flex={2} gradient={gradients.dark}>
            <Text white bold transform="uppercase" marginHorizontal={sizes.sm}>
              FEET
            </Text>
          </Button> */}
        </Block>
        <Block
          row
          justify="space-between"
          marginBottom={sizes.base}
          marginTop={sizes.sm}>
          <Button
            flex={2}
            row
            onPress={() => setModalKg(true)}
            marginRight={sizes.base}>
            <Block row align="center" justify="space-between">
              {/* <Text dark bold transform="uppercase" marginRight={sizes.sm}>
                {kg} Kg
              </Text> */}
              <Input
                placeholder={isKg ? 'Kg' : 'Lbs'}
                keyboardType="numeric"
                maxLength={6}
                value={inputValue}
                style={{
                  height: 50,
                  width: 125,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  borderWidth: 0,
                }}
                onChangeText={handleInputChange}
                // onChangeText={(value) => {
                //   {
                //     setCount(value);
                //   }
                // }}
              />
            </Block>
          </Button>
          <Block
            flex={4}
            style={{
              alignItems: 'center',
              shadowRadius: 8,
              shadowOpacity: 0.3,
              shadowColor: '#757575',
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <DuoToggleSwitch
              primaryText="Kg"
              secondaryText="Lbs"
              onPrimaryPress={handlePrimaryPress}
              onSecondaryPress={handleSecondaryPress}
              TouchableComponent={Ripple}
              primaryButtonStyle={{width: 125, height: 50}}
              secondaryButtonStyle={{width: 90, height: 50}}
              primaryTextStyle={{marginRight: 32}}
              rippleColor="#fff"
              rippleContainerBorderRadius={50}
              activeColor="#5f9b4c"
            />
          </Block>
          {/* <Button flex={2} gradient={gradients.dark} marginHorizontal={sizes.s}>
            <Text white bold  marginHorizontal={sizes.s}>
              Kg
            </Text>
          </Button>
          <Button flex={2} gradient={gradients.dark}>
            <Text white bold  marginHorizontal={sizes.sm}>
              Lbs
            </Text>
          </Button> */}
        </Block>
        </Image>
        </Block>
   
        <Block marginTop={sizes.m}>
          <Text h4>Gender & Age</Text>
          <Block
            row
            justify="space-between"
            marginBottom={sizes.base}
            marginTop={sizes.m}>
            <Button
              flex={1}
              row
              gradient={gradients.light}
              onPress={() => setModal(true)}>
              <Block
                row
                align="center"
                justify="space-between"
                paddingHorizontal={sizes.padding}>
                <Text dark bold transform="uppercase" marginRight={sizes.sm}>
                  {age} Age in years
                </Text>
                <Image
                  source={assets.arrow}
                  color={colors.white}
                  transform={[{rotate: '90deg'}]}
                />
              </Block>
            </Button>
          </Block>
          {/* <Block row justify="space-between" marginBottom={sizes.base} marginTop={sizes.sm}>
         
          <Button flex={2} gradient={gradients.light} marginHorizontal={sizes.s}>
            <Text black bold  marginHorizontal={sizes.s}>
             Male
            </Text>
          </Button>
          <Button flex={2} gradient={gradients.light}>
            <Text black bold  marginHorizontal={sizes.sm}>
              Female
            </Text>
          </Button>
        </Block> */}
          <Block
            row
            justify="space-between"
            marginBottom={sizes.base}
            marginTop={sizes.sm}>
            <Button
              flex={2}
              gradient={gender === 'male' ? gradients.success : gradients.light}
              marginHorizontal={sizes.s}
              onPress={() => {
                handleOptionSelect('male');
              }}>
              <Text black bold marginHorizontal={sizes.s}>
                Male
              </Text>
            </Button>
            <Button
              flex={2}
              gradient={
                gender === 'female' ? gradients.success : gradients.light
              }
              onPress={() => {
                handleOptionSelect('female');
              }}>
              <Text black bold marginHorizontal={sizes.sm}>
                Female
              </Text>
            </Button>
          </Block>
        </Block>
        <Block marginTop={sizes.m}>
          <Text h4>Activity Level</Text>

          <Block marginTop={sizes.sm}>
            <Block row justify="space-between" marginBottom={sizes.base}>
              <Block flex={0}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('first');
                    handleActivitySelect('sedentary');

                  }}
                />
              </Block>

              <Block flex={1}>
                <Text p semibold marginTop={sizes.s}>
                  Sedentary
                </Text>
                <Text p marginTop={sizes.s}>
                  (little or no excercise)
                </Text>
              </Block>
            </Block>
            <Block row justify="space-between" marginBottom={sizes.base}>
              <Block flex={0}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('second');
                    handleActivitySelect('lightly_active');
                  }}
                />
              </Block>

              <Block flex={1}>
                <Text p semibold marginTop={sizes.s}>
                  Lightly Active
                </Text>
                <Text p marginTop={sizes.s}>
                  (little or no excercise)
                </Text>
              </Block>
            </Block>
            <Block row justify="space-between" marginBottom={sizes.base}>
              <Block flex={0}>
                <RadioButton
                  value="third"
                  status={checked === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('third');
                    handleActivitySelect('moderately_active');
                  }}
                />
              </Block>

              <Block flex={1}>
                <Text p semibold marginTop={sizes.s}>
                  Active
                </Text>
                <Text p marginTop={sizes.s}>
                  (Exercise 4-5 times/week/Standing work)
                </Text>
              </Block>
            </Block>
            <Block row justify="space-between" marginBottom={sizes.base}>
              <Block flex={0}>
                <RadioButton
                  value="fourth"
                  status={checked === 'fourth' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('fourth');
                    handleActivitySelect('very_active');
                  }}
                />
              </Block>

              <Block flex={1}>
                <Text p semibold marginTop={sizes.s}>
                  {' '}
                  Very Active
                </Text>
                <Text p marginTop={sizes.s}>
                  {' '}
                  (Exercise 5-6 times a week/Strenous work/highly leisure
                  activity)
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39',
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50',
            '51',
            '52',
            '53',
            '54',
            '55',
            '56',
            '57',
            '58',
            '59',
            '60',
            '61',
            '62',
            '63',
            '64',
            '65',
            '66',
            '67',
            '68',
            '69',
            '70',
            '71',
            '72',
            '73',
            '74',
            '75',
            '76',
            '77',
            '78',
            '79',
            '80',
            '81',
            '82',
            '83',
            '84',
            '85',
            '86',
            '87',
            '88',
            '89',
            '90',
            '91',
            '92',
            '93',
            '94',
            '95',
            '96',
            '97',
            '98',
            '99',
          ]}
          renderItem={({item}) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                {
                  handleAgeSelect(item);
                  setModal(false);
                }
              }}>
              <Text p white semibold transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
      <Modal visible={showModalCm} onRequestClose={() => setModalCm(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[
            '100',
            '101',
            '102',
            '103',
            '104',
            '105',
            '106',
            '107',
            '108',
            '109',
            '110',
            '111',
            '112',
            '113',
            '114',
            '115',
            '116',
            '117',
            '118',
            '119',
            '120',
            '121',
            '122',
            '123',
            '124',
            '125',
            '126',
            '127',
            '128',
            '129',
            '130',
            '131',
            '132',
            '133',
            '134',
            '135',
            '136',
            '137',
            '138',
            '139',
            '140',
            '141',
            '142',
            '143',
            '144',
            '145',
            '146',
            '147',
            '148',
            '149',
            '150',
            '151',
            '152',
            '153',
            '154',
            '155',
            '156',
            '157',
            '158',
            '159',
            '160',
            '161',
            '162',
            '163',
            '164',
            '165',
            '166',
            '167',
            '168',
            '169',
            '170',
            '171',
            '172',
            '173',
            '174',
            '175',
            '176',
            '177',
            '178',
            '179',
            '180',
            '181',
            '182',
            '183',
            '184',
            '185',
            '186',
            '187',
            '188',
            '189',
            '190',
            '191',
            '192',
            '193',
            '194',
            '195',
            '196',
            '197',
            '198',
            '199',
            '200',
          ]}
          renderItem={({item}) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                {
                  handleHeightSelect(item);
                  handleUnitSelect('cm');
                  setModalCm(false);
                  console.log(formData);
                  
                }
              }}>
              <Text p white semibold transform="uppercase">
                {item} CM
              </Text>
            </Button>
          )}
        />
      </Modal>
      <Modal visible={showModalFeet} onRequestClose={() => setModalFeet(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[
            '100',
            '101',
            '102',
            '103',
            '104',
            '105',
            '106',
            '107',
            '108',
            '109',
            '110',
            '111',
            '112',
            '113',
            '114',
            '115',
            '116',
            '117',
            '118',
            '119',
            '120',
            '121',
            '122',
            '123',
            '124',
            '125',
            '126',
            '127',
            '128',
            '129',
            '130',
            '131',
            '132',
            '133',
            '134',
            '135',
            '136',
            '137',
            '138',
            '139',
            '140',
            '141',
            '142',
            '143',
            '144',
            '145',
            '146',
            '147',
            '148',
            '149',
            '150',
            '151',
            '152',
            '153',
            '154',
            '155',
            '156',
            '157',
            '158',
            '159',
            '160',
            '161',
            '162',
            '163',
            '164',
            '165',
            '166',
            '167',
            '168',
            '169',
            '170',
            '171',
            '172',
            '173',
            '174',
            '175',
            '176',
            '177',
            '178',
            '179',
            '180',
            '181',
            '182',
            '183',
            '184',
            '185',
            '186',
            '187',
            '188',
            '189',
            '190',
            '191',
            '192',
            '193',
            '194',
            '195',
            '196',
            '197',
            '198',
            '199',
            '200',
          ]}
          renderItem={({item}) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                {
                  handleHeightSelect(item);
                  handleUnitSelect('ft');
                  setModalFeet(false);
                }
              }}>
              <Text p white semibold transform="uppercase">
                {item} FEET
              </Text>
            </Button>
          )}
        />
      </Modal>
      <Modal visible={showModalKg} onRequestClose={() => setModalKg(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39',
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50',
            '51',
            '52',
            '53',
            '54',
            '55',
            '56',
            '57',
            '58',
            '59',
            '60',
            '61',
            '62',
            '63',
            '64',
            '65',
            '66',
            '67',
            '68',
            '69',
            '70',
            '71',
            '72',
            '73',
            '74',
            '75',
            '76',
            '77',
            '78',
            '79',
            '80',
            '81',
            '82',
            '83',
            '84',
            '85',
            '86',
            '87',
            '88',
            '89',
            '90',
            '91',
            '92',
            '93',
            '94',
            '95',
            '96',
            '97',
            '98',
            '99',
            '100',
            '101',
            '102',
            '103',
            '104',
            '105',
            '106',
            '107',
            '108',
            '109',
            '110',
            '111',
            '112',
            '113',
            '114',
            '115',
            '116',
            '117',
            '118',
            '119',
            '120',
            '121',
            '122',
            '123',
            '124',
            '125',
            '126',
            '127',
            '128',
            '129',
            '130',
            '131',
            '132',
            '133',
            '134',
            '135',
            '136',
            '137',
            '138',
            '139',
            '140',
            '141',
            '142',
            '143',
            '144',
            '145',
            '146',
            '147',
            '148',
            '149',
            '150',
            '151',
            '152',
            '153',
            '154',
            '155',
            '156',
            '157',
            '158',
            '159',
            '160',
            '161',
            '162',
            '163',
            '164',
            '165',
            '166',
            '167',
            '168',
            '169',
            '170',
            '171',
            '172',
            '173',
            '174',
            '175',
            '176',
            '177',
            '178',
            '179',
            '180',
            '181',
            '182',
            '183',
            '184',
            '185',
            '186',
            '187',
            '188',
            '189',
            '190',
            '191',
            '192',
            '193',
            '194',
            '195',
            '196',
            '197',
            '198',
            '199',
            '200',
          ]}
          renderItem={({item}) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                {
                  handleKgSelect(item);
                  setModalKg(false);
                }
              }}>
              <Text p white semibold transform="uppercase">
                {item} Kg
              </Text>
            </Button>
          )}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          checkPage();
        }}>
        <Block row justify="flex-end">
          <Image
            source={assets.Button}
            // color={colors.white}
            // transform={[{rotate: '90deg'}]}
          />
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

// Photo gallery example
const Gallery = () => {
  const {assets, sizes} = useTheme();
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Carousel
      </Text>
      {/* carousel example */}
      <Block marginBottom={sizes.xxl}>
        <Image
          resizeMode="cover"
          source={assets.carousel1}
          style={{width: '100%'}}
        />
        <Text p secondary marginTop={sizes.sm}>
          Private Room • 1 Guests • 1 Sofa
        </Text>
        <Text h4 marginVertical={sizes.s}>
          Single room in center
        </Text>
        <Text p lineHeight={26}>
          As Uber works through a huge amount of internal management turmoil,
          the company is also consolidating.
        </Text>
      </Block>
      {/* photo gallery */}
      <Block>
        <Block row align="center" justify="space-between">
          <Text h5 semibold>
            Album 1
          </Text>
          <Button>
            <Text p primary semibold>
              View all
            </Text>
          </Button>
        </Block>
        <Block row justify="space-between" wrap="wrap">
          <Image
            resizeMode="cover"
            source={assets?.photo1}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo2}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo3}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo4}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo5}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo6}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
        </Block>
      </Block>

      {/* vertical image */}
      <Block>
        <Block row align="center" justify="space-between">
          <Text h5 semibold>
            Album 2
          </Text>
          <Button>
            <Text p primary semibold>
              View all
            </Text>
          </Button>
        </Block>
        <Block row justify="space-between" wrap="wrap">
          <Image
            resizeMode="cover"
            source={assets?.photo1}
            style={{
              width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
              height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
            }}
          />
          <Block marginLeft={sizes.m}>
            <Image
              resizeMode="cover"
              source={assets?.photo2}
              marginBottom={IMAGE_VERTICAL_MARGIN}
              style={{
                height: IMAGE_VERTICAL_SIZE,
                width: IMAGE_VERTICAL_SIZE,
              }}
            />
            <Image
              resizeMode="cover"
              source={assets?.photo3}
              style={{
                height: IMAGE_VERTICAL_SIZE,
                width: IMAGE_VERTICAL_SIZE,
              }}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const Components = ({route, navigation}) => {
  const {formData} = route.params;
  const {assets, sizes} = useTheme();

  // const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header3}
        />
      ),
    });
  }, [assets.header3, navigation, sizes.width, headerHeight]);

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: sizes.padding}}>
        <Block>
          {/* <Buttons /> */}
          {/* <Typography /> */}
          {/* <Inputs /> */}
          {/* <Switches /> */}
          {/* <Social /> */}
          <Cards navigation={navigation} route={route} />
          {/* <Gallery /> */}
        </Block>
      </Block>
    </Block>
  );
};

export default Components;
