import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {styles} from "@/styles/styles";
import {useFocusEffect} from "@react-navigation/native";


interface props{
  content: string;
  deleteContent: Function;
  index: number;
  editContent: Function;
  addContent: Function;
}

const EditableContent = ({content, deleteContent, index, editContent, addContent}: props) => {
  const [text, setText] = useState(content);

  useEffect(()=>{
    if (text === content) return
    editContent(index, text)
  }, [text])

  return (
    <View style={[styles.marginRowContainer, {justifyContent: 'space-between', margin: 3}]}>
      <View style={{flex: 1}}>
        <Text style={[styles.font, {fontSize: 24}]}>{index+1}.</Text>
      </View>
      <View style={{flex: 6}}>
        <TextInput
          style={[styles.font]}
          placeholder='내용입력'
          value={text}
          // onSubmitEditing={() => addContent(index+1)}
          multiline={true}
          onChangeText={(newText: string)=> {
            setText(newText)
          }}/>
      </View>
      <View style={{flex: 1}}>
        {
          index > 2 && <Button title='삭제' onPress={()=>{deleteContent(index)}}/>
        }
      </View>

    </View>
  );
};

export default EditableContent;
