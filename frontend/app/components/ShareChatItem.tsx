import React from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";


interface props {
  chatRoomId : number,
  profileImageUrl : string,
  locationName : string,
  thumbnailImageUrl : string,
  nickname : string,
  content : string,
  timestamp: number,
  receiveMemberId: number,
}

const ShareChatItem = ({chatRoomId,profileImageUrl,locationName,thumbnailImageUrl,nickname,content,timestamp,receiveMemberId}: props) => {
  const navigation = useNavigation();

  return (
    <View style={[{width: '90%', borderWidth: 1, height: 80, marginBottom: 10}]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SingleShareChat',{chatRoomId:chatRoomId,receiveMemberId:receiveMemberId})}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[{borderWidth: 1, width: 80, height: 80}]}>

          </View>
          <View style={[{flex: 1}]}>
            <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style={[{}]}>
                <Text>{nickname}</Text>
              </View>
              <View style={[{}]}>
                <Text>{locationName}</Text>
              </View>
              <View style={[{}]}>
                <Text>{timestamp}</Text>
              </View>
            </View>
            <View style={[{flex: 1}]}>
              <Text>{content}</Text>
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
