import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import {Text} from "react-native";
import {useFocusEffect} from "@react-navigation/native";

interface props {
  total: number;
  now: number;
}

const CircularPercent = ({total, now}: props) => {
  return (
    <>
      <ProgressCircle
        percent={(now*100)/total}
        radius={25}
        borderWidth={8}
        color='#3093EF'
        // bgColor={}
        // shadowColor={}
      >
        <Text>{now}/{total}</Text>
      </ProgressCircle>
    </>
  );
};

export default CircularPercent;
