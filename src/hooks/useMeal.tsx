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
            id: item.serving_description_id,
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
            // console.log(formDataCopy , "form1");

            // const apiUrl = `get_diet_list_wrt_date/${formDataCopy.customer_id}/2023-10-04`;
            const currentDate = new Date();

            // Format the date as YYYY-MM-DD
            const formattedDate = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1,
            ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
              2,
              '0',
            )}`;

            // console.log(formattedDate, 'Formatted date');

            const apiUrl = `get_diet_list_wrt_date/${formDataCopy.customer_id}/${formattedDate}`;
            // Make the API request to get data
            api
              .get(apiUrl)
              .then((response) => {
                // console.log(response , "food");
                
                // Handle the successful API response
                const responseData = response.data;
                // console.log(response,'response from api food');
                // Use the mapping function to transform the data into the desired format
                const transformedData = mapApiDataToDesiredFormat(responseData);

                // Now you can use transformedData in your application
                // console.log(transformedData, 'Transformed data');
                if (transformedData.breakfastItems) {
                  setBreakfastItems(transformedData.breakfastItems);
                  console.log(transformedData.breakfastItems , "from db");
                  
                }
                if (transformedData.dinnerItems) {
                  setDinnerItems(transformedData.dinnerItems);
                }

                // Update your state with the transformed data
                // setDinnerItems(transformedData);
              })
              .catch((error) => {
                // Handle any errors that occur during the API request
                console.error('Error fetching data:', error);
                if (error.response && error.response.data) {
                  console.error('Server Error Details:', error.response.data);
                }
              });
             
          }
        }
      } catch (error) {
        console.error('Error retrieving authData:', error);
      }
    };

    // Call the authentication check function
    checkAuthenticationStatus();
    // Define the URL for your API request
  }, []);

  // Usage: Assuming you have received the API response in a variable called `apiResponse`
  // const dinnerDataInDesiredFormat = mapApiDataToDesiredFormat(apiResponse);

  // useEffect(() => {
  //   // Define the URL for your API request
  //   // Mapping function to transform API data into the desired format
  //   function mapApiDataToDesiredFormat(apiResponse) {
  //     const dietDetails = apiResponse.data.diet_details;
  //     const dinnerData = dietDetails.find((meal) => meal.meal_type_id === 6);

  //     if (dinnerData) {
  //       const mappedDinnerData = dinnerData.diet_list.map((item) => {
  //         return {
  //           added_by: null,
  //           cal_weight_200: item.calories, // Map calories from the item
  //           calcium_in_mg: item.calcium,
  //           calories: item.calories,
  //           carb_in_g: item.carb,
  //           cholestrol_in_mg: item.cholestrol,
  //           created_at: item.created_at,
  //           deleted_at: item.deleted_at,
  //           details: {
  //             added_date: item.added_date,
  //             customer_id: item.customer_id,
  //             desc: item.desc,
  //             desc_num_food_tbl: item.desc_num_food_tbl,
  //             food_id: item.id,
  //             mealType: item.meal_type,
  //             meal_type: item.meal_type_id,
  //             multiplication: 1,
  //             quantity: item.quantity,
  //             selectedDropDown: item.serving_description,
  //             selectedWeight: item.serving_weight_1, // You can choose the appropriate serving weight
  //             serving_desc_id: item.serving_description_id,
  //             taken_weight: item.taken_weight,
  //             totalCalcium: item.calcium_in_mg,
  //             totalCalorie: item.calories,
  //             totalCarb: item.carb_in_g,
  //             totalCholesterol: item.cholestrol_in_mg,
  //             totalFat: item.fat_in_g,
  //             totalFiber: item.fiber_in_g,
  //             totalIron: item.iron_in_mg,
  //             totalMonounsaturatedFat: item.monounsaturated_fat_in_g,
  //             totalPolyunsaturatedFat: item.polyunsaturated_fat_in_g,
  //             totalPotassium: item.potassium_in_mg,
  //             totalProtein: item.protein_in_g,
  //             totalSaturatedFat: item.saturated_fat_in_g,
  //             totalSodium: item.sodium_in_mg,
  //             totalSugar: item.sugar_in_g,
  //             totalTransFat: item.trans_fat_in_g,
  //             totalVitaminAIU: item.vitamin_a_iu,
  //             totalVitaminARAE: item.vitamin_a_rae,
  //             totalVitaminC: item.vitamin_c_in_mg,
  //             totalVitaminD: item.vitamin_d_mg,
  //           },
  //           fat_in_g: item.fat_in_g,
  //           fiber_in_g: item.fiber_in_g,
  //           food_group: item.food_group,
  //           food_name: item.food_name,
  //           id: item.id,
  //           image: item.food_image,
  //           iron_in_mg: item.iron_in_mg,
  //           is_active: item.is_active,
  //           monounsaturated_fat_in_g: item.monounsaturated_fat,
  //           polyunsaturated_fat_in_g: item.polyunsaturated_fat,
  //           potassium_in_mg: item.potassium_in_mg,
  //           protein_in_g: item.protein_in_g,
  //           saturated_fat_in_g: item.saturated_fat_in_g,
  //           serving_desc_1: '1 oz', // You can choose an appropriate serving description
  //           serving_desc_2: '1 piece', // You can choose an appropriate serving description
  //           serving_desc_3: '3 Piece', // You can choose an appropriate serving description
  //           // ... Map other properties similarly
  //         };
  //       });

  //       return mappedDinnerData;
  //     }

  //     // Return an empty array if there is no dinner data
  //     return [];
  //   }

  //   // Usage: Assuming you have received the API response in a variable called `apiResponse`
  //   const dinnerDataInDesiredFormat = mapApiDataToDesiredFormat(apiResponse);

  //   const apiUrl = `get_diet_list_wrt_date/15/2023-10-03`;
  //   api
  //     .get(apiUrl)
  //     .then((response) => {
  //       // Handle the successful API response
  //       const responseData = response.data;

  //       // Use the mapping function to transform the data into the desired format
  //       const transformedData = mapApiDataToDesiredFormat(responseData);

  //       // Now you can use transformedData in your application
  //       console.log(transformedData, 'Transformed data');

  //       // Update your state or perform other actions with the transformed data
  //       // setYourState(transformedData);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the API request
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const addBreakfastItem = (food: any, details: any, db: any, dbs: any) => {
    // console.log( 'again added');
    // return false;

    // console.log(details,'food details' );
    const formData = new FormData();
    formData.append('details', JSON.stringify(details));
    // console.log(formData , "hallllooooooooooo");
    // if the item already exists in the breakfastItems array, update it instead of adding a new item
    const existingIndex = breakfastItems.findIndex(
      (item) => item.id === food.id,
    );
    if (existingIndex !== -1) {
     
      const updatedItems = [...breakfastItems];
      updatedItems[existingIndex] = {...food, details};
      setBreakfastItems(updatedItems);
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
          console.log(response.data, 'successfully updated updated added db');
        })
        .catch(function (response) {
          //handle error
          console.log(response.message, 'error');
        });
    } else {
      console.log( 'existing account');
      setBreakfastItems([...breakfastItems, {...food, details}]);
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
          console.log(response.data, 'success added db');
        })
        .catch(function (response) {
          //handle error
          console.log(response, 'error');
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
