import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const houseCodeStyles = StyleSheet.create({
  houseCode: {
    fontSize: 18,
    color: '#3093EF',
    marginBottom: 5,
  }
})
function PrintHouseCode({houseCode}){

  const copyHouse = ()=>{
    Clipboard.setString(`${houseCode}`);
  }

  return (
    <View>
      <Text>
        당신의 집 코드는 다음과 같습니다! 복사하려면 아래의 집 코드를 길게 눌러주세요!
      </Text>
      <Text style={houseCodeStyles.houseCode}>
        {houseCode}
      </Text>
      <Button title="복사하기" onPress={copyHouse}/>
    </View>
  );
};

export default PrintHouseCode;