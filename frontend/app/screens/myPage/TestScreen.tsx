import React from 'react';
import {Button, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useInput from "@/hooks/useInput";
import PlainInput from "@/components/PlainInput";

const TestScreen = ({navigation}: any) =>{

  const memberId = useInput({
    placeholder: '멤버 Id',
    nowNum: 1
  });

  const page = useInput({
    placeholder: '페이지',
    nowNum: 2,
  });

  const sendData = () => {
    const data = {
      id: parseInt(memberId.text),
      myId: parseInt('3029554590'),
    };
    console.log(data);
    navigation.navigate('User', data);
  };

  return (
    <View>
      <PlainInput type="number" {...memberId} />
      <Button title='moveTo' onPress={sendData}/>
    </View>
  )
}

export default TestScreen;
