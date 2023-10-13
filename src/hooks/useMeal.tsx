/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {BASE_URL} from '@env';
import api from '../../api';

interface FoodItem {
  name: string;
  calories: number;
}

interface MealContextType {
  breakfastItems: any[];
  morningSnackItems: any[];
  lunchItems: any[];
  eveningSnackItems: any[];
  dinnerItems: any[];
  mealItems1: any[];
  mealItems2: any[];
  addBreakfastItem: (food: any) => void;
  addMorningSnackItem: (food: any) => void;
  addEveningSnackItem: (food: any) => void;
  addLunchItem: (food: any) => void;
  addDinnerItem: (food: any) => void;
  addMealItem1: (food: any) => void;
  addMealItem2: (food: any) => void;
  deleteItem: (items: any[], mealType: string) => void;
  totalCalories: number;
  updateBreakfastItem: (id: number, updatedDetails: any) => void;
}

export const MealContext = createContext<MealContextType>({
  breakfastItems: [],
  morningSnackItems: [],
  lunchItems: [],
  eveningSnackItems: [],
  dinnerItems: [],
  mealItems1: [],
  mealItems2: [],
  addBreakfastItem: () => {},
  addMorningSnackItem: () => {},
  addEveningSnackItem: () => {},
  addLunchItem: () => {},
  addDinnerItem: () => {},
  addMealItem1: () => {},
  addMealItem2: () => {},
  deleteItem: () => {},
  totalCalories: 0,
  updateBreakfastItem: (id: number, updatedDetails: any) => {},
});

const MealContextProvider: React.FC = ({children}) => {
  const [breakfastItems, setBreakfastItems] = useState<any[]>([]);
  const [morningSnackItems, setMorningSnackItems] = useState<any[]>([]);
  const [lunchItems, setLunchItems] = useState<any[]>([]);
  const [eveningSnackItems, setEveningSnackItems] = useState<any[]>([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [mealItems1, setMealItems1] = useState<any[]>([]);
  const [mealItems2, setMealItems2] = useState<any[]>([]);
  const [transformedData, setTransformedData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  console.log(customerId, 'useMeal customer id ');

  console.log(transformedData, 'log dinner ');

  // Mapping function to transform API data into the desired format
  function mapApiDataToDesiredFormat(apiResponse) {
    const dietDetails = apiResponse.data.diet_details;
    const dinnerData = dietDetails.find((meal) => meal.meal_type_id === 6);
    const breakfastData = dietDetails.find((meal) => meal.meal_type_id === 1);
    const result = {};
    if (dinnerData) {
      const mappedDinnerData = dinnerData.diet_list.map((item) => {
        return {
          added_by: null,
          cal_weight_200: item.calories, // Map calories from the item
          calcium_in_mg: item.calcium,
          calories: item.calories,
          carb_in_g: item.carb,
          cholestrol_in_mg: item.cholestrol,
          details: {
            id: item.id,
            selectedWeight: item.taken_weight,
            multiplication: item.quantity,
            quantity: item.quantity,
            taken_weight: item.final_weight,
            totalCalorie: item.calories,
            totalCarb: item.carb,
            totalCholesterol: item.cholestrol,
            totalFat: item.fat,
            totalFiber: item.fiber,
            totalIron: item.iron,
            totalMonounsaturatedFat: item.monounsaturated_fat,
            totalPolyunsaturatedFat: item.polyunsaturated_fat,
            totalPotassium: item.potassium,
            totalProtein: item.protienes,
            totalSodium: item.sodium,
            totalTransFat: item.trans_fat,
            totalVitaminARAE: item.vitamin_a_rae,
            totalVitaminC: item.vitamin_c,
            totalVitaminD: item.vitamin_d,
            selectedDropDown: item.serving_description,
            totalCalcium: item.calcium,
            totalSaturatedFat: item.saturated_fat,
            totalSugar: item.sugar,
            totalVitaminAIU: item.vitamin_a,
          },
          fat_in_g: item.fat,
          fiber_in_g: item.fiber,
          food_name: item.food_name,
          id: item.id,
          image: item.food_image,
          iron_in_mg: item.iron,
          monounsaturated_fat_in_g: item.monounsaturated_fat,
          polyunsaturated_fat_in_g: item.polyunsaturated_fat,
          serving_desc_1: '1 oz', // You can choose an appropriate serving description
          serving_desc_2: '1 piece', // You can choose an appropriate serving description
          serving_desc_3: '3 Piece', // You can choose an appropriate serving description          // ... Map other properties similarly
          protein_in_g: item.protienes,
          potassium_in_mg: item.potassium,
          serving_desc_4: null,
          serving_desc_5: null,
          serving_desc_6: null,
          serving_desc_7: null,
          serving_desc_8: null,
          serving_desc_9: null,
          serving_size: item.taken_weight,
          serving_weight_1: 28,
          serving_weight_2: 50,
          serving_weight_3: 180,
          serving_weight_4: null,
          serving_weight_5: null,
          serving_weight_6: null,
          serving_weight_7: null,
          serving_weight_8: null,
          serving_weight_9: null,
          sodium_in_mg: item.sodium,
          sugar_in_g: item.sugar,
          trans_fat_in_g: item.trans_fat,
          vitamin_a_in_mg: item.vitamin_a,
          vitamin_a_iu: item.vitamin_a,
          vitamin_a_rae_mg: item.vitamin_a_rae,
          vitamin_c_in_mg: item.vitamin_c,
          vitamin_d_mg: item.vitamin_d,
          weight_in_g: item.taken_weight,
        };
      });

      result.dinnerItems = mappedDinnerData;
    }
    if (breakfastData) {
      const mappedBreakfastData = breakfastData.diet_list.map((item) => {
        return {
          added_by: null,
          cal_weight_200: item.calories, // Map calories from the item
          calcium_in_mg: item.calcium,
          calories: item.calories,
          carb_in_g: item.carb,
          cholestrol_in_mg: item.cholestrol,
          details: {
            id: item.id,
            selectedWeight: item.taken_weight,
            multiplication: item.quantity,
            quantity: item.quantity,
            taken_weight: item.final_weight,
            totalCalorie: item.calories,
            totalCarb: item.carb,
            totalCholesterol: item.cholestrol,
            totalFat: item.fat,
            totalFiber: item.fiber,
            totalIron: item.iron,
            totalMonounsaturatedFat: item.monounsaturated_fat,
            totalPolyunsaturatedFat: item.polyunsaturated_fat,
            totalPotassium: item.potassium,
            totalProtein: item.protienes,
            totalSodium: item.sodium,
            totalTransFat: item.trans_fat,
            totalVitaminARAE: item.vitamin_a_rae,
            totalVitaminC: item.vitamin_c,
            totalVitaminD: item.vitamin_d,
            selectedDropDown: item.serving_description,
            totalCalcium: item.calcium,
            totalSaturatedFat: item.saturated_fat,
            totalSugar: item.sugar,
            totalVitaminAIU: item.vitamin_a,
          },
          fat_in_g: item.fat,
          fiber_in_g: item.fiber,
          food_name: item.food_name,
          id: item.food_id,
          image: item.food_image,
          iron_in_mg: item.iron,
          monounsaturated_fat_in_g: item.monounsaturated_fat,
          polyunsaturated_fat_in_g: item.polyunsaturated_fat,
          serving_desc_1: '1 oz', // You can choose an appropriate serving description
          serving_desc_2: '1 piece', // You can choose an appropriate serving description
          serving_desc_3: '3 Piece', // You can choose an appropriate serving description          // ... Map other properties similarly
          protein_in_g: item.protienes,
          potassium_in_mg: item.potassium,
          serving_desc_4: null,
          serving_desc_5: null,
          serving_desc_6: null,
          serving_desc_7: null,
          serving_desc_8: null,
          serving_desc_9: null,
          serving_size: item.taken_weight,
          serving_weight_1: 28,
          serving_weight_2: 50,
          serving_weight_3: 180,
          serving_weight_4: null,
          serving_weight_5: null,
          serving_weight_6: null,
          serving_weight_7: null,
          serving_weight_8: null,
          serving_weight_9: null,
          sodium_in_mg: item.sodium,
          sugar_in_g: item.sugar,
          trans_fat_in_g: item.trans_fat,
          vitamin_a_in_mg: item.vitamin_a,
          vitamin_a_iu: item.vitamin_a,
          vitamin_a_rae_mg: item.vitamin_a_rae,
          vitamin_c_in_mg: item.vitamin_c,
          vitamin_d_mg: item.vitamin_d,
          weight_in_g: item.taken_weight,
        };
      });
      result.breakfastItems = mappedBreakfastData;
    }

    // Return an empty array if there is no dinner data
    return result;
  }
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const authDataJSON = await AsyncStorage.getItem('authData');

        if (authDataJSON) {
          const authData = JSON.parse(authDataJSON);
          const authToken = authData.token;

          if (authToken) {
            const formDataCopy = authData.formData;
            setCustomerId(formDataCopy.customer_id);

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1,
            ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
              2,
              '0',
            )}`;

            const apiUrl = `get_diet_list_wrt_date/${formDataCopy.customer_id}/${formattedDate}`;
            // Make the API request to get data
            api
              .get(apiUrl)
              .then((response) => {
                const responseData = response.data;
                const transformedData = mapApiDataToDesiredFormat(responseData);

                if (transformedData.breakfastItems) {
                  setBreakfastItems(transformedData.breakfastItems);
                }
                if (transformedData.dinnerItems) {
                  setDinnerItems(transformedData.dinnerItems);
                }
                setIsLoading(false); // Data is loaded
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                if (error.response && error.response.data) {
                  console.error('Server Error Details:', error.response.data);
                }
                setIsLoading(false); // Handle error and still set isLoading to false
              });
          }
        }
      } catch (error) {
        console.error('Error retrieving authData:', error);
        setIsLoading(false); // Handle error and still set isLoading to false
      }
    };

    // Call the authentication check function only if data is not already loaded
    if (isLoading) {
      checkAuthenticationStatus();
    }
  }, []);


 
  const addBreakfastItem = (food: any, details: any) => {
    console.log(details.customer_id, 'customer id');
    const existingIndex = breakfastItems.findIndex(
      (item) => item.id === food.id,
    );
    if (existingIndex !== -1) {
      // Item already exists, update it
      console.log(food, 'id from db to update food');
      console.log(details, 'details id from db to update');

      const updatedItems = [...breakfastItems];
      updatedItems[existingIndex] = {...food, details};
      // setBreakfastItems(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', food.details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', food.id);
      bodyFormData.append('taken_weight', details.selectedWeight);
      bodyFormData.append('quantity', details.multiplication);
      bodyFormData.append('serving_desc_id', details.id);
      bodyFormData.append('desc_num_food_tbl', details.id);

      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          // Handle success
          console.log(response.data, 'successfully updated in the database');
          const currentDate = new Date();
          const formattedDate = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1,
          ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
            2,
            '0',
          )}`;
          const apiUrl = `get_diet_list_wrt_date/${customerId}/${formattedDate}`;
          // Make the API request to get data
          api
            .get(apiUrl)
            .then((response) => {
              const responseData = response.data;
              const transformedData = mapApiDataToDesiredFormat(responseData);

              console.log(transformedData.breakfastItems, 'breakfast adding');
              // Assuming transformedData contains the breakfast data
              if (transformedData.breakfastItems) {
                const itemToAdd = transformedData.breakfastItems.find(
                  (item) => item.id === food.id,
                );
                // Map and add each item to breakfastItems
                console.log(itemToAdd, 'the data i want');
                if (itemToAdd) {
                  console.log(itemToAdd, 'added');
                  // Add the item to breakfastItems
                  const updatedItems = [...breakfastItems];
                  updatedItems[existingIndex] = {
                    ...food,
                    details: itemToAdd.details,
                  };
                  setBreakfastItems(updatedItems);
                }
              }
            })
            .catch(function (error) {
              // Handle error when fetching data from the API
              console.error('Error fetching data from the API:', error);
            });
        })
        .catch(function (error) {
          // Handle error
          console.error(error, 'error');
        });
    } else {
      // Now, you can update the API with the newly added data
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);

      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          // Handle success
          console.log(response.data, 'successfully added to the database');

          const currentDate = new Date();
          const formattedDate = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1,
          ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
            2,
            '0',
          )}`;

          const apiUrl = `get_diet_list_wrt_date/${customerId}/${formattedDate}`;

          // Make the API request to get data
          api
            .get(apiUrl)
            .then((response) => {
              const responseData = response.data;
              const transformedData = mapApiDataToDesiredFormat(responseData);

              console.log(transformedData.breakfastItems, 'breakfast adding');
              // Assuming transformedData contains the breakfast data
              if (transformedData.breakfastItems && details.food_id) {
                const itemToAdd = transformedData.breakfastItems.find(
                  (item) => item.id === details.food_id,
                );
                // Map and add each item to breakfastItems
                console.log(itemToAdd, 'the data i want');
                if (itemToAdd) {
                  console.log(itemToAdd, 'added');
                  // Add the item to breakfastItems
                  setBreakfastItems((prevItems) => [
                    ...prevItems,
                    {...food, details: itemToAdd.details},
                  ]);
                }
              }
            })
            .catch(function (error) {
              // Handle error when fetching data from the API
              console.error('Error fetching data from the API:', error);
            });
        })
        .catch(function (error) {
          // Handle error when adding data to the database
          console.error('Error adding data to the database:', error);
        });
    }
    // setTotalCalories(totalCalories + food.calories);
  };

  const addMorningSnackItem = (food: any, details: any) => {
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = morningSnackItems.findIndex(
      (item) => item.id === food.id,
    );
    if (existingIndex !== -1) {
      const updatedItems = [...morningSnackItems];
      updatedItems[existingIndex] = {...food, details};
      setMorningSnackItems(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc_num_food_tbl', details.desc_num_food_tbl);
      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'successfully updated');
        })
        .catch(function (response) {
          //handle error
          console.error('Error response:', response.response); // Log the error response
          console.error('Error message:', response.message);
        });
    } else {
      setMorningSnackItems([...morningSnackItems, {...food, details}]);
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'success');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error update');
        });
    }
  };
  const addEveningSnackItem = (food: any, details: any) => {
    // setEveningSnackItems([...eveningSnackItems, {...food, details}]);
    // setTotalCalories(totalCalories + food.calories);
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = eveningSnackItems.findIndex(
      (item) => item.id === food.id,
    );
    if (existingIndex !== -1) {
      const updatedItems = [...eveningSnackItems];
      updatedItems[existingIndex] = {...food, details};
      setEveningSnackItems(updatedItems);
      api
        .post(`update_diet_data`, {formData})
        .then((response) => {})
        .catch((error) => {});
    } else {
      setEveningSnackItems([...eveningSnackItems, {...food, details}]);
      api
        .post(`update_diet_data`, {details})
        .then((response) => {})
        .catch((error) => {});
    }
  };

  const addLunchItem = (food: any, details: any) => {
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = lunchItems.findIndex((item) => item.id === food.id);
    if (existingIndex !== -1) {
      const updatedItems = [...lunchItems];
      updatedItems[existingIndex] = {...food, details};
      setLunchItems(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc_num_food_tbl', details.desc_num_food_tbl);
      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'successfully updated');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    } else {
      setLunchItems([...lunchItems, {...food, details}]);
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'success');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    }
  };

  const addDinnerItem = (food: any, details: any) => {
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = dinnerItems.findIndex((item) => item.id === food.id);
    if (existingIndex !== -1) {
      const updatedItems = [...dinnerItems];
      updatedItems[existingIndex] = {...food, details};
      setDinnerItems(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc_num_food_tbl', details.desc_num_food_tbl);
      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'successfully updated');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    } else {
      setDinnerItems([...dinnerItems, {...food, details}]);
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'success');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    }
  };
  const addMealItem1 = (food: any, details: any) => {
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = mealItems1.findIndex((item) => item.id === food.id);
    if (existingIndex !== -1) {
      const updatedItems = [...mealItems1];
      updatedItems[existingIndex] = {...food, details};
      setMealItems1(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc_num_food_tbl', details.desc_num_food_tbl);
      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'successfully updated');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    } else {
      setMealItems1([...mealItems1, {...food, details}]);
      axios;
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'success');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    }
  };
  const addMealItem2 = (food: any, details: any) => {
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    const existingIndex = mealItems2.findIndex((item) => item.id === food.id);
    if (existingIndex !== -1) {
      const updatedItems = [...mealItems2];
      updatedItems[existingIndex] = {...food, details};
      setMealItems2(updatedItems);
      var bodyFormData = new FormData();
      bodyFormData.append('id', details.id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc_num_food_tbl', details.desc_num_food_tbl);
      api({
        method: 'post',
        url: `update_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'successfully updated');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    } else {
      setMealItems2([...mealItems2, {...food, details}]);
      axios;
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      api({
        method: 'post',
        url: `add_diet_data`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response.data, 'success');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
        });
    }
  };
  const deleteItem = (items: any[], mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        setBreakfastItems(items);
        break;
      case 'morningSnackItems':
        setMorningSnackItems(items);
        break;
      case 'lunch':
        setLunchItems(items);
        break;
      case 'evening':
        setEveningSnackItems(items);
        break;
      case 'dinner':
        setDinnerItems(items);
        break;
      case 'meal1':
        setMealItems1(items);
        break;
      case 'meal2':
        setMealItems2(items);
        break;
      default:
        break;
    }
  };
  const updateBreakfastItem = (id: number, updatedDetails: any) => {
    const existingIndex = breakfastItems.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      const updatedItems = [...breakfastItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        ...updatedDetails,
      };
      setBreakfastItems(updatedItems);
      console.log('updated');
    }
  };

  const value: MealContextType = {
    breakfastItems,
    morningSnackItems,
    eveningSnackItems,
    lunchItems,
    dinnerItems,
    mealItems1,
    mealItems2,
    addBreakfastItem,
    addMorningSnackItem,
    addEveningSnackItem,
    addLunchItem,
    addDinnerItem,
    addMealItem1,
    addMealItem2,
    deleteItem,
    updateBreakfastItem,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};

export default MealContextProvider;
