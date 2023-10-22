/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity , Image } from 'react-native'
import moment from 'moment'

const Date1 = ({ date, onSelectDate, selected, savedDate = []   }) => {
  // console.log(savedDate , "saved date in date");
  

  // const day = moment(date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? 'Today' : moment(date).format('ddd')
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const day = moment(date).format('DD-MM-YYYY');
  const dayText = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd');
  // const day = moment(date).format('YYYY-MM-DD');

  const isCompleted = savedDate.includes(day);
  // console.log(isCompleted , "completed");
  

  const dayNumber = moment(date).format('D')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: "#6146c6" }]}
    >
      <Text
        style={[styles.big, selected === fullDate && { color: "#fff" }]}
      >
        {dayText}
      </Text>
      <View style={{ height: 10 }} />
      {isCompleted && (
        <Image source={require('../../../../assets/icons/check.png')} style={{ width: 20, height: 20 }} />
      )}
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}


export default Date1

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 70,
    width: 58,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  medium: {
    fontSize: 12,
    fontWeight: 'bold',
    // paddingTop:10
  },
})