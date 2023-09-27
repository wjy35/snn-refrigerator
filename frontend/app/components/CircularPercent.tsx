import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import {Text} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {styles} from "@/styles/styles";
import {TEXT_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";

interface props {
  total: number;
  now: number;
}

const CircularPercent = ({total, now}: props) => {
  return (
    <>
      <ProgressCircle
        percent={(now*100)/total}
        radius={30}
        borderWidth={10}
        color='#3093EF'
        // bgColor={}
        // shadowColor={}
      >
        <Text style={[styles.font, {color:TEXT_COLOR, fontSize:15}]}>{now}/{total}</Text>
      </ProgressCircle>
    </>
  );
};

export default CircularPercent;
