import React from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";


interface props {
  title: string;

}
const ShareChatItem = ({title}: props) => {
  const navigation = useNavigation();

  return (
    <View style={[{width: '90%', borderWidth: 1, height: 80, marginBottom: 10}]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SingleShareChat')}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[{borderWidth: 1, width: 80, height: 80}]}>

          </View>
          <View style={[{flex: 1}]}>
            <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style={[{}]}>
                <Text>독버섯 김석주</Text>
              </View>
              <View style={[{}]}>
                <Text>역삼동</Text>
              </View>
              <View style={[{}]}>
                <Text>10일 전 등록</Text>
              </View>
            </View>
            <View style={[{flex: 1}]}>
              <Text>대충 채팅내용이 이렇습니다.</Text>
            </View>
          </View>
          <View style={[{borderWidth: 1, width: 80, height: 80}]}>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ShareChatItem;
