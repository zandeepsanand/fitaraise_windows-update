/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
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
          // created_at: item.created_at,
          // deleted_at: item.deleted_at,
          details: {
            // added_date: item.added_date,
            // customer_id: item.customer_id,
            // desc: item.desc,
            // desc_num_food_tbl: item.desc_num_food_tbl,
            food_id: item.id,
            // mealType: item.meal_type,
            // meal_type: item.meal_type_id,
            multiplication: item.quantity,
            quantity: item.quantity,
            selectedDropDown: item.serving_description,
            // selectedWeight: item.serving_weight_1, // You can choose the appropriate serving weight
            // serving_desc_id: item.serving_description_id,
            taken_weight: item.final_weight,
            // totalCalcium: item.calcium_in_mg,
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
            // totalSaturatedFat: item.saturated_fat_in_g,
            totalSodium: item.sodium,
            // totalSugar: item.sugar_in_g,
            totalTransFat: item.trans_fat,
            // totalVitaminAIU: item.vitamin_a_iu,
            totalVitaminARAE: item.vitamin_a_rae,
            totalVitaminC: item.vitamin_c,
            totalVitaminD: item.vitamin_d,
          },
          fat_in_g: item.fat,
          fiber_in_g: item.fiber,
          // food_group: item.food_group,
          food_name: item.food_name,
          id: item.id,
          image: item.food_image,
          iron_in_mg: item.iron,
          // is_active: item.is_active,
          monounsaturated_fat_in_g: item.monounsaturated_fat,
          polyunsaturated_fat_in_g: item.polyunsaturated_fat,
          // potassium_in_mg: item.potassium_in_mg,
          protein_in_g: item.protienes,
          potassium_in_mg:item.potassium,
          // saturated_fat_in_g: item.saturated_fat_in_g,
          serving_desc_1: '1 oz', // You can choose an appropriate serving description
          serving_desc_2: '1 piece', // You can choose an appropriate serving description
          serving_desc_3: '3 Piece', // You can choose an appropriate serving description
          // ... Map other properties similarly
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
            food_id: item.id,
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
          serving_desc_3: '3 Piece', // You can choose an appropriate serving description
         

          // ... Map other properties similarly
          protein_in_g: item.protienes,
          potassium_in_mg:item.potassium,

        };
      });
      result.breakfastItems = mappedBreakfastData;
    }

    // Return an empty array if there is no dinner data
    return result;
  }
  useEffect(() => {
    // Define the URL for your API request
    const apiUrl = `get_diet_list_wrt_date/15/2023-10-04`;

    // Make the API request to get data
    api
      .get(apiUrl)
      .then((response) => {
        // Handle the successful API response
        const responseData = response.data;

        // Use the mapping function to transform the data into the desired format
        const transformedData = mapApiDataToDesiredFormat(responseData);

        // Now you can use transformedData in your application
        // console.log(transformedData, 'Transformed data');
        if (transformedData.breakfastItems) {
          setBreakfastItems(transformedData.breakfastItems);
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
      });
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
    console.log(details, 'testing 123');
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
      // axios
      //   .post(`${BASE_URL}update_diet_data`, {formData})
      //   .then((response) => {
      //     console.log(response.data, 'db data insert new');
      //     // Handle the successful response from the backend if needed
      //   })
      //   .catch((error) => {
      //     // Handle the error if needed
      //   });
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
      setBreakfastItems([...breakfastItems, {...food, details}]);
      // axios
      //   .post(`${BASE_URL}add_diet_data`, {dbs})
      //   .then((response) => {
      //     console.log(response.data, 'db data insert only db ');
      //     // console.log(breakfastItems , "breakfast Items");

      //     // console.log(details , "the details of food items ");
      //     // Handle the successful response from the backend if needed
      //   })
      //   .catch((error) => {
      //     // Handle the error if error
      //   });
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
          console.log(response, 'error');
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
          console.log(response, 'error');
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
