/* eslint-disable prettier/prettier */
// LoadingScreen.js
// import React, {useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

// const LoadingScreen = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const checkAuthenticationStatus = async () => {
//       try {
//         const authDataJSON = await AsyncStorage.getItem('authData');
//         if (authDataJSON) {
//           // Parse authData JSON
//           const authData = JSON.parse(authDataJSON);
//           const authToken = authData.token;
//           const formData = authData.formData;
//           const data = authData.data;
//           const formDataCopy = authData.formDataCopy;
//           const dietPlan = authData.dietPlan;

//           if (data && formDataCopy  ) {
//             // Both authToken and formData exist, navigate to 'Frstpage'
//             navigation.navigate('Menu', {
//             data, formDataCopy, dietPlan // Pass your parameters here
//             });
           
//           } else if (authToken && formData.height ) {
//             // Data, formDataCopy, and dietPlan exist, navigate to 'tabNavigator'
//             navigation.navigate('dietcalculation', {formData});
//           } else {
//             // Navigate to 'loginNew' if none of the required data is present
//             navigation.navigate('loginNew');
//           }
//         } else {
//           // authData JSON doesn't exist, navigate to 'loginNew'
//           navigation.navigate('loginNew');
//         }
//       } catch (error) {
//         console.error('Authentication Status Error:', error);
//       }
//     };

//     checkAuthenticationStatus();
//   }, [navigation]);

//   return null; // Loading screen has no UI
// };

// export default LoadingScreen;



import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import api from '../../api';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const authDataJSON = await AsyncStorage.getItem('authData');
        if (authDataJSON) {
          const authData = JSON.parse(authDataJSON);
          const authToken = authData.token;
         
          

          // Check if you have the authToken, if yes, make your API call using Axios
          if (authToken) {
            // Make API calls to fetch data and formDataCopy here using Axios
            // Example:
            const fetchData = async () => {
              try {
                console.log(authData.formData.customer_id ,"auth");
                const response = await api.get(`get_personal_datas/${authData.formData.customer_id}`); // Use axios.get for GET requests
                // console.log(response.data ,"checked");
                const formData = response.data.data;
                console.log(formData);
                
                const formDataCopyResponse = await api.get(`get_daily_required_calories/${authData.formData.customer_id}`);
                const diet_List = await api.get(`get_recommended_diet/${authData.formData.customer_id}`);
                
                // console.log(formDataCopyResponse.data.data, "data copy");
                
                const data = formDataCopyResponse.data.data;
                const dietPlan = diet_List.data.data.recommended_diet_list;
                console.log(dietPlan , "diet plan");
                

                // Now you have data and formDataCopy, you can navigate accordingly
                if ((formDataCopyResponse.data.success === true) && formData) {
                  navigation.navigate('Menu', {
                    data ,
                    formDataCopy: formData,
                    dietPlan
                  });
                } else if (formData) {
                  navigation.navigate('Frstpage', {
                    formData,
                  });
                } else {
                  navigation.navigate('loginNew');
                }
                setIsLoading(false); // Set loading to false when navigation is done
              } catch (error) {
                console.error('API Error:', error);
                setIsLoading(false); // Set loading to false on error
              }
            };

            fetchData();
          } else {
            // No authToken, navigate to 'loginNew'
            navigation.navigate('loginNew');
            setIsLoading(false); // Set loading to false
          }
        } else {
          // authData JSON doesn't exist, navigate to 'loginNew'
          navigation.navigate('loginNew');
          setIsLoading(false); // Set loading to false
        }
      } catch (error) {
        console.error('Authentication Status Error:', error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    checkAuthenticationStatus();
  }, [navigation]);

  if (isLoading) {
    // Render a loading indicator (e.g., a spinner)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // Loading screen has no UI
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
