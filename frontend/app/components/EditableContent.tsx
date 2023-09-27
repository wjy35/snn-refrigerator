import React from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {styles} from "@/styles/styles";


interface props{
  content: string;
  deleteContent: Function;
  index: number;
  editContent: Function;
  addContent: Function;
}

const EditableContent = ({content, deleteContent, index, editContent, addContent}: props) => {
  return (
    <View style={[styles.marginRowContainer, {justifyContent: 'space-between', margin: 3}]}>
      <View style={{flex: 1}}>
        <Text style={[styles.font, {fontSize: 24}]}>{index+1}.</Text>
      </View>
      <View style={{flex: 6}}>
        <TextInput
          style={[styles.font]}
          placeholder='내용입력'
          value={content}
          onSubmitEditing={() => addContent(index)}
          multiline={true}
          onChangeText={(newText: string)=> {editContent(index,newText)}}/>
      </View>
      <View style={{flex: 1}}>
        <Button title='삭제' onPress={()=>{deleteContent(index)}}/>
      </View>
    </View>
  );
};

export default EditableContent;
