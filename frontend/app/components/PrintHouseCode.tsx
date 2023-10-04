import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {styles} from "@/styles/styles";
import PlainInput from "@/components/PlainInput";
import memberApi from "@/apis/memberApi";
import useInput from "@/hooks/useInput";

const houseCodeStyles = StyleSheet.create({
  houseCode: {
    fontSize: 18,
    color: '#3093EF',
    marginBottom: 5,
  }
})
function PrintHouseCode({houseCode}){
  const [houseStatus, setHouseStatus] = useState<number>(0);


  const copyHouse = ()=>{
    Clipboard.setString(`${houseCode}`);
  }

  async function checkHouseExistence(text: string){
    try{
      const res = await memberApi.checkHouse(text);
      if(res.status === 200){
        res.data.data.existance?setHouseStatus(2):setHouseStatus(1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const houseCodeInput = useInput({
    placeholder:'집 공유 코드 입력',
    nowNum: 1,
    onChange: checkHouseExistence,
  });

  return (
    <View>
      <View>
        <Text style={[styles.font, {fontSize: 20}]}>우리집 코드</Text>
      </View>
      <View style={[{justifyContent: 'center', alignItems: 'center', marginTop: 10}]}>
        <TouchableWithoutFeedback onPress={copyHouse}>
          <View>
            <Text style={houseCodeStyles.houseCode}>{houseCode}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text>복사하려면 아래의 집 코드를 길게 눌러주세요!</Text>
        </View>
      </View>
      <View style={[{marginTop: 20}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={[styles.font, {fontSize: 20}]}>우리집 등록하기</Text>
          </View>
          <View>
            {
              houseStatus === 1 && (
                <Text style={[styles.font, {color: 'red'}]}>잘못된 집 코드입니다.</Text>
              )
            }
            {
              houseStatus === 2 && (
                <Text style={[styles.font, {color: 'blue'}]}>사용 가능한 집 코드 입니다.</Text>
              )
            }
          </View>
        </View>
      </View>
      <View>
        <PlainInput {...houseCodeInput}/>
      </View>
      <View style={{marginBottom: 20}}>
        {/* TODO: 우리집 등록 로직 필요*/}
        <Button title='등록하기'/>
      </View>
    </View>
  );
};

export default PrintHouseCode;