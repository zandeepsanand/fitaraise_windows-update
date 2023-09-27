/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {BASE_URL} from '@env';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Image, Input, Text} from '../components/';
import {Platform, TouchableOpacity, SectionList} from 'react-native';
import Axios from 'axios';
import {FlatList} from 'react-native';
type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};
const isAndroid = Platform.OS === 'android';
const DietPlanDynamic = ({route, navigation}) => {
  const {mealType, meal_type , formDataCopy} = route.params;
  console.log(formDataCopy);
  
  const {t} = useTranslation();
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  // console.log(meal_type);

  const fetchResults = (search_word: any) => {
    if (search_word.length >= 3) {
      try {
        Axios.get(`${BASE_URL}get_food_items/${search_word}`).then(
          (response) => {
            setSearchResults(response.data.data.data);
          },
        );
        setError(null);
      } catch (e) {
        console.log(e);
      }
    } else {
      // Clear the search results if the search word is less than three characters long
      setSearchResults([]);
    }
  };
  const handlePress = (food) => {
    if (food) {
      console.log(food, "food data");
      
      try {
        Axios.get(`${BASE_URL}get_food_item_datas_with_id/${food.id}`).then(
          (response) => {
            const responseData = response.data.data;
            navigation.navigate('searchfoodData', {
              mealType,
              responseData,
              meal_type,
              formDataCopy,
              food

            });
          },
        );
        setError(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN = (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  return (
    <Block safe>
      <Block
        color={colors.card}
        flex={0}
        paddingBottom={sizes.padding}
        paddingHorizontal={sizes.s}
        paddingTop={sizes.s}>
        <Input
          onChangeText={fetchResults}
          placeholder="Search food,meals or Brand "
        />
      </Block>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Block
              flex={0}
              radius={sizes.sm}
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
              marginTop={sizes.m}
              marginHorizontal={10}
              card
              color="rgb(245,232,250)"
              center>
              <Block row align="center">
                <Block flex={0}>
                  {item.image ===
                  'http://admin.fitaraise.com/storage/uploads/app_images/no_image.png' ? (
                    // <Image
                    //   source={require('../assets/icons/img.png')}
                    //   style={{
                    //     width: sizes.xl,
                    //     height: sizes.xl,
                    //   }}
                    //   marginLeft={sizes.s}
                    // />
                    <Block
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                        backgroundColor: '#fff',
                        borderRadius: sizes.s,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      marginLeft={sizes.s}>
                      <Text style={{fontSize: 50, color: '#fff'}} bold primary>
                        {item.food_name.charAt(0)}
                      </Text>
                    </Block>
                  ) : (
                    <Image
                      source={{uri: `${item.image}`}}
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                      }}
                      marginLeft={sizes.s}
                    />
                  )}
                </Block>
                <Block flex={3} style={{alignSelf: 'center'}}>
                  <Text p black semibold center padding={10}>
                    {item.food_name}
                  </Text>
                </Block>
                <TouchableOpacity>
                  <Block flex={0} style={{alignSelf: 'center'}}>
                    <Image
                      radius={0}
                      width={25}
                      height={25}
                      color={'#c58bf2'}
                      source={assets.plus}
                      transform={[{rotate: '360deg'}]}
                      margin={sizes.s}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          </TouchableOpacity>
        )}
      />
    </Block>
  );
};

export default DietPlanDynamic;
