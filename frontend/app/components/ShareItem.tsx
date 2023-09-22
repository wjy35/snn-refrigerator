import React from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";


interface props {
  title: string;

}
const ShareItem = ({title}: props) => {
  const navigation = useNavigation();

  return (
    <View style={[{width: '90%', borderWidth: 1, height: 80, marginBottom: 10}]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ShareDetail')}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[{borderWidth: 1, width: 80, height: 80}]}>

          </View>
          <View style={[{flex: 1}]}>
            <View style={[{flex: 1}]}>
              <Text>{title}</Text>
            </View>
            <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style={[{flex: 1}]}>
                <Text>독버섯 김석주</Text>
              </View>
              <View style={[{flex: 1}]}>
                <Text>10일 전 등록</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ShareItem;
