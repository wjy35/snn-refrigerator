import React from 'react';
import {Button, Text, View} from "react-native";
import {styles} from "@/styles/styles";


interface props{
  order: number;
  content: string;
  deleteContent: Function;
}

const EditableContent = ({order, content, deleteContent}: props) => {
  return (
    <View style={[styles.marginRowContainer, {justifyContent: 'space-between', margin: 3}]}>
      <View style={{flex: 1}}>
        <Text style={[styles.font, {fontSize: 24}]}>{order}.</Text>
      </View>
      <View style={{flex: 6}}>
        <Text style={[styles.font, {fontSize: 16}]}>{content}</Text>
      </View>
      <View style={{flex: 1}}>
        <Button title='삭제'/>
      </View>
    </View>
  );
};

export default EditableContent;
