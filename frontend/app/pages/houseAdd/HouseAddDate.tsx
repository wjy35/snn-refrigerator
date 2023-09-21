import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";

interface props {
  textList: string[];
}

const HouseAddDate = ({textList}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={3} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View>

        </View>
      </ScrollView>
    </View>
  )
}

export default HouseAddDate;
