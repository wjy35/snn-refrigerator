import React from 'react';
import {ImageBackground, Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {styles} from "@/styles/styles";
import {TEXT_SUB_COLOR} from "@/assets/colors/colors";
import timestampToString from "@/utils/timestampToString";


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
  const shortLocationName = locationName.split(' ');
  const timestampString = timestampToString(timestamp);

  return (
    <View style={[{width: '90%', borderWidth: 1, marginBottom: 10, borderRadius: 18, borderColor: '#B2CFFF'}]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SingleShareChat',{chatRoomId:chatRoomId,receiveMemberId:receiveMemberId,nickname:nickname})}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[{width: 80, height: 80, justifyContent: 'center', alignItems: 'center'}]}>
            <ImageBackground source={{uri: profileImageUrl}}
                             resizeMode={"cover"}
                             style={{width: 70, height: 70}}
                             imageStyle={{borderRadius: 999}}
            />
          </View>
          <View style={[{flex: 1}]}>
            <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
              <View style={[{marginRight: 5}]}>
                <Text style={[styles.font, {fontSize: 20}]}>{nickname}</Text>
              </View>
              <View style={[{marginRight: 5}]}>
                <Text style={[styles.font, {color: TEXT_SUB_COLOR}]}>{shortLocationName[shortLocationName.length-1]}</Text>
              </View>
              <View style={[{}]}>
                <Text style={[styles.font, {color: TEXT_SUB_COLOR}]}>{timestampString}</Text>
              </View>
            </View>
            <View style={[{flex: 1}]}>
              <Text style={[styles.font, {fontSize: 15}]} numberOfLines={2}>{content}</Text>
            </View>
          </View>
          <View style={[{width: 80, height: 80, justifyContent: 'center', alignItems: 'center'}]}>
            <ImageBackground source={{uri: thumbnailImageUrl}}
                             resizeMode={"cover"}
                             style={{width: 70, height: 70}}
                             imageStyle={{borderRadius: 16}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ShareChatItem;
