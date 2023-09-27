import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginContextValue = {
  customerId: string | null;
  isLoggedIn: boolean;
  formData: {
    // Define formData structure
    first_name: string;
    last_name: string;
    id: number;
    password: string;
    // ... other properties
  } | null;
  token: string | null; // Add token
  loginSuccess: (customerId: string, formData: any, token: string) => void; // Update loginSuccess
  logout: () => void;
};

const LoginContext = createContext<LoginContextValue>({
  customerId: null,
  isLoggedIn: false,
  formData: null,
  token: null,
  loginSuccess: () => {},
  logout: () => {},
});

export const LoginProvider = ({children}) => {
  const [customerId, setCustomerId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState(null); // Initialize formData state
  const [token, setToken] = useState(null); // Initialize token state

  const loginSuccess = async (customerId, formData, token) => {
    try {
      await AsyncStorage.setItem('customerId', customerId);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('formData', JSON.stringify(formData));
      await AsyncStorage.setItem('token', token);
  
      // Update state variables as before
      setCustomerId(customerId);
      setIsLoggedIn(true);
      setFormData(formData);
      setToken(token);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };
  
  const logout = async () => {
    try {
      // Clear the stored authentication data from AsyncStorage
      await AsyncStorage.removeItem('authData');
      // Clear any other necessary data or states
  
      // Optionally, you can clear the token if you have a setAuthToken function
      // setAuthToken(null);
  
      // Set the user as logged out
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        customerId,
        isLoggedIn,
        formData,
        token,
        loginSuccess,
        logout,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
