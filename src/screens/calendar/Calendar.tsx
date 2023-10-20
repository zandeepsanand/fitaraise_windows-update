import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';
import Date ,{generateDates} from './Date';
import { Block } from '../../components';

const Calendar = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState();
  
    useEffect(() => {
      setDates(generateDates());
      getCurrentMonth();
    }, []);
  
    const getCurrentMonth = () => {
      const month = moment(dates[0]).format('MMMM');
      setCurrentMonth(month);
    };
  
    return (
      <>
        <Block style={styles.centered}>
          <Text style={styles.title}>{currentMonth}</Text>
        </Block>
        <Block style={styles.dateSection}>
          <Block style={styles.scroll}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              {dates.map((date, index) => (
                <Date
                  key={index}
                  date={date}
                  onSelectDate={onSelectDate}
                  selected={moment(date).isSame(moment(), 'day') ? selected : null}
                />
              ))}
            </ScrollView>
          </Block>
        </Block>
      </>
    );
  };
  
  export default Calendar;



const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    padding: 10,
  },
  scroll: {
    height: 100,
  },
});
