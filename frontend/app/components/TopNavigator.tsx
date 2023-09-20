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
  }

  function optionFunc(){
    optionFunction();
  }

  return (
    <View style={topNavStyles.tabContainer}>
      <View style={topNavStyles.tabItemContainer}>
        <View>
          <TouchableWithoutFeedback onPress={goBack}>
            <View style={topNavStyles.backButton}>
              <SvgXml
                xml={backButton}
                width={19}
                height={19}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={[styles.font, topNavStyles.tabFontSize]}>{title}</Text>
        </View>
        <View style={topNavStyles.optionalRightButton}>
          {
            optionTitle && (
              <TouchableWithoutFeedback onPress={optionFunction&&optionFunc} style={{borderWidth: 1}}>
                <Text style={[styles.font, topNavStyles.tabFontSize]}>{optionTitle}</Text>
              </TouchableWithoutFeedback>
            )
          }
        </View>
      </View>
    </View>
  );
};

export default TopNavigator;
