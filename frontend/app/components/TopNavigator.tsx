import React from 'react';
import {View, Button, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from 'styles/styles';
import {topNavStyles} from "@/styles/topNavStyles";
import {SvgXml} from 'react-native-svg';
import {backButton} from "@/assets/icons/icons";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}
const TopNavigator = ({title, optionTitle, optionFunction}: props) => {
  const navigation: any = useNavigation();

  function goBack() {
    navigation.pop();
  };

  return (
    <View style={topNavStyles.tabContainer}>
      <View style={topNavStyles.tabItemContainer}>
        <View>
          <View style={topNavStyles.backButton}>
            <TouchableWithoutFeedback onPress={goBack}>
              <SvgXml
                xml={backButton}
                width={19}
                height={19}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View>
          <Text style={[styles.font, topNavStyles.tabFontSize]}>{title}</Text>
        </View>
        <View style={topNavStyles.optionalRightButton}>
          <TouchableWithoutFeedback onPress={()=>optionFunction}>
            <Text style={[styles.font, topNavStyles.tabFontSize]}>{optionTitle}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default TopNavigator;
