import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from "@/styles/styles";
import {MAIN_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";


interface props {
  item: any;
  memberId: number;
}

const SingleChatContent = ({item, memberId}:props) => {
  return (
    <View style={{marginVertical: 5}}>
      {
        item.memberId === memberId ? (
          <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{padding: 5}}>
              <Text style={[styles.font, {fontSize: 16, color: TEXT_SUB_COLOR}]}>{item.timestamp}</Text>
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
              <Text style={[styles.font, {fontSize: 16, color: TEXT_SUB_COLOR}]}>{item.timestamp}</Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        )
      }

    </View>
  )
}

export default SingleChatContent;
