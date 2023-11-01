/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import moment from 'moment-timezone';
import Date1 from './Date';

const CalendarHomeWorkout = ({ onSelectDate, selected, savedDate = [] }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const scrollRef = useRef<ScrollView | null>(null);

  moment.tz.setDefault('Asia/Kolkata');

  const getDates = () => {
    const _dates = [];
    const today = new Date();

    for (let i = -30; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      _dates.push(date);
    }

    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    // Center on the current date when the component initially mounts
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: screenWidth / 2, animated: false });
    }
  }, []);

  const getCurrentMonth = () => {
    const centerIndex = Math.round(scrollPosition / screenWidth);
    const centerDate = dates[centerIndex];
    setCurrentMonth(moment(centerDate).format('MMMM'));
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);

  return (
    <View>
      <View style={styles.centered}>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={16}
        >
          {dates.map((date, index) => (
            <Date1
              key={index}
              date={date}
              onSelectDate={onSelectDate}
              selected={selected}
              savedDate={savedDate}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default CalendarHomeWorkout;
