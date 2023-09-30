/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  // Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import api, {setAuthToken} from '../../api';
import {Block, Button, Image, Input, Text} from '../components';
import {useTheme} from '../hooks';
import InputField from '../components/inputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext, {loginSuccess} from '../hooks/LoginContext';
import { StackActions } from '@react-navigation/native';

const isAndroid = Platform.OS === 'android';

const LoginScreenNew = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [buttonShow, setButtonShow] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // console.log(userId, 'userId');

  const handleLogin = async () => {
    try {
      // Make the login request
      const response = await api.post('login', {email, password});
      console.log(response.data);

      if (response.data.success === false) {
        // If the server responds with a failed login message
        const errorMessage = response.data.data.error;
        alert(errorMessage);
        if (response.data.data.user_id) {
          const user_id = response.data.data.user_id;

          setButtonShow(true);
          setUserId(user_id);
        }
      } else {
        console.log(response.data.data);
        
        const {first_name, id, last_name} = response.data.data;

        // Create an object that combines token and formData
        const authData = {
          token: response.data.data.token,
          formData: {
            first_name,
            customer_id: id,
            last_name,
            // Add other formData properties here
          },
        };
        const formData = authData.formData
// console.log(formData);

        // Store the authData object as a JSON string in AsyncStorage
        await AsyncStorage.setItem('authData', JSON.stringify(authData));

        // Use the loginSuccess method from LoginContext
        setAuthToken(authData.token); // Set the token for future requests

        // You can navigate to another screen or perform other actions here
        navigation.dispatch(StackActions.replace('Loading', { formData }));
      }
    } catch (error) {
      // Handle login errors here
      console.error('Login Error:', error);
    }
  };

  const handleResend = async () => {
    try {
      console.log(userId, 'user iddsdasdasd');

      // Make the login request
      const response = await api.get(`resent_verification_email/${userId}`);
      console.log(response.data);

      if (response.data.success === true) {
        const errorMessage = response.data.message;
        alert(errorMessage);
      }
    } catch (error) {
      // Handle login errors here
      console.error('Login Error:', error);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {assets, colors, gradients, sizes} = useTheme();
  return (
    <Block safe marginTop={sizes.xl} style={{backgroundColor: '#ffff'}}>
      <Block scrollEnabled>
        <Block>
          <Image
            source={require('../assets/images/login.png')}
            height={300}
            width={300}
            style={{alignSelf: 'center'}}
          />
        </Block>
        <Block paddingHorizontal={sizes.sm}>
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/icons/Message.png')} // Replace with your icon source
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Enter text"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/icons/lock.png')} // Replace with your icon source
              style={styles.icon}
            />
            <TextInput
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <Image
                  color={'#ADA4A5'}
                  source={require('../assets/icons/show.png')}
                  style={styles.icon}
                />
              ) : (
                <Image
                  color={'#ADA4A5'}
                  source={require('../assets/icons/hide.png')}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <Button
            gradient={gradients.primary}
            shadow={!isAndroid}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            onPress={() => handleLogin()}>
            <Text bold white style={{color: 'white'}}>
              Login
            </Text>
          </Button>
        </Block>
        {buttonShow && (
          <Button
            gradient={gradients.primary}
            shadow={!isAndroid}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            onPress={() => handleResend()}>
            <Text bold white style={{color: 'white'}}>
              Resend Link
            </Text>
          </Button>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('country')}>
            <Text primary bold style={{color: 'green', fontWeight: '700'}}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderRadius: 15,
    borderWidth: 0.3,
    padding: 15,
    marginBottom: 10,
    paddingRight: 0,
  },
  icon: {
    width: 20, // Adjust icon width as needed
    height: 20, // Adjust icon height as needed
    marginRight: 10, // Adjust spacing between icon and input field as needed
  },
  input: {
    flex: 1, // Allow input field to expand to fill available space
  },
});

export default LoginScreenNew;
