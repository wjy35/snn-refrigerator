import React, {useState} from 'react';
import {Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from "@/styles/styles";
import {MAIN_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";
import timestampToTimeOnlyString from "@/utils/timestampToTimeOnlyString";
import timestampDateToast from "@/utils/timestampDateToast";
import Toast from 'react-native-simple-toast';
import timestampToDateOnlyString from "@/utils/timestampToDateOnlyString";

interface props {
  item: any;
  memberId: number;
}



const SingleChatContent = ({item, memberId}:props) => {
    const [timestampString, setTimestampString] = useState<string>(timestampToTimeOnlyString(item.timestamp));


  return (
      <TouchableWithoutFeedback
          onPressIn={()=>{
              setTimestampString(timestampToDateOnlyString(item.timestamp));
          }}
          onPressOut={()=>{
              setTimestampString(timestampToTimeOnlyString(item.timestamp));
          }}
      >
        <View style={{marginVertical: 5}}>
          {
            item.memberId === memberId ? (
                <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                  <View style={{flex: 1}}></View>
                  <View style={{padding: 5}}>
                    <Text style={[styles.font, {fontSize: 16, color: TEXT_SUB_COLOR}]}>{timestampString}</Text>
                  </View>
                  <View style={[{borderWidth: 1, backgroundColor: '#96C6F3', padding: 10, alignItems: 'center', justifyContent: 'center', maxWidth: '70%', borderRadius: 10, borderColor: '#96C6F3'}]}>
                    <Text style={[styles.font, {fontSize: 24}]}>{item.content}</Text>
                  </View>
                </View>
            ) : (
                <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                  <View style={[{borderWidth: 1, backgroundColor: 'white', padding: 10, alignItems: 'center', justifyContent: 'center', maxWidth: '70%', borderRadius: 10}]}>
                    <Text style={[styles.font, {fontSize: 24}]}>{item.content}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={[styles.font, {fontSize: 16, color: TEXT_SUB_COLOR}]}>{timestampString}</Text>
                  </View>
                  <View style={{flex: 1}}></View>
                </View>
            )
          }

        </View>

      </TouchableWithoutFeedback>
  )
}

export default SingleChatContent;
