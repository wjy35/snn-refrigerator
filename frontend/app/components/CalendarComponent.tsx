import React, {Component, useState} from 'react'
import {Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

interface props {
  selectedList: any;
}

const CalendarComponent = ({selectedList}: props) => {
  const date = new Date();
  const [selected, setSelected] = useState<string>('');

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={date.toDateString()}
        onDayPress={(day) => {setSelected(day.dateString)}}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => {console.log('month changed', month)}}
        firstDay={0}
        disableAllTouchEventsForDisabledDays={true}
        markingType='multi-dot'
        renderHeader={(date) => {
          return <Text>몇월 몇일</Text>
        }}
        markedDates={{
          [date.toDateString()]: {selected: true},
          ...selectedList,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
          },
        }}
      />
    </View>
  )
}

export default CalendarComponent;