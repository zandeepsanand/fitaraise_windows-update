/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '@env';

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
  const [dinnerItems, setDinnerItems] = useState<any[]>([]);
  const [mealItems1, setMealItems1] = useState<any[]>([]);
  const [mealItems2, setMealItems2] = useState<any[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const addBreakfastItem = (food: any, details: any, db: any, dbs: any) => {
    console.log(dbs, 'testing');
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
      axios
        .post(`${BASE_URL}update_diet_data`, {formData})
        .then((response) => {})
        .catch((error) => {});
    } else {
      setEveningSnackItems([...eveningSnackItems, {...food, details}]);
      axios
        .post(`${BASE_URL}update_diet_data`, {details})
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
      axios({
        method: 'post',
        url: `${BASE_URL}update_diet_data`,
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
      axios
      var bodyFormData = new FormData();
      bodyFormData.append('customer_id', details.customer_id);
      bodyFormData.append('meal_type', details.meal_type);
      bodyFormData.append('food_id', details.food_id);
      bodyFormData.append('taken_weight', details.taken_weight);
      bodyFormData.append('quantity', details.quantity);
      bodyFormData.append('serving_desc_id', details.serving_desc_id);
      bodyFormData.append('desc', details.desc);
      bodyFormData.append('added_date', details.added_date);
      axios({
        method: 'post',
        url: `${BASE_URL}add_diet_data`,
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
