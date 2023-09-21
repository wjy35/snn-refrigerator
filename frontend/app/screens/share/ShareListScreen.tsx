import React, {useState} from 'react';
import {View, Text, Button, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";
import ShareLayout from "@/screens/share/ShareLayout";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";

const ShareListScreen = ({navigation}:any) => {
  const [now, setNow] = useState(0)
  const [text, setText] = useState('')
  const [textList, setTextList] = useState<any[]>()

  function onChangeText(newText: string){
    setText(newText)
    check(newText)
  }

  const check = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setTextList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onPressIn(now: number){
    setNow(now)
  }

  function onBlur(){
    setNow(0)
    setText('')
    setTextList([])
  }

  return (
    <ShareLayout title="나눔">
      {/*<Text>ShareListScreen</Text>*/}
      {/*<Button*/}
      {/*  title="나눔글 생성"*/}
      {/*  onPress={ () => navigation.navigate('ShareCreate')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="나눔글 상세"*/}
      {/*  onPress={ () => navigation.navigate('ShareDetail')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="나눔채팅목록"*/}
      {/*  onPress={ () => navigation.navigate('ShareChatList')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="개별나눔채팅"*/}
      {/*  onPress={ () => navigation.navigate('SingleShareChat')}*/}
      {/*/>*/}
      <ScrollView keyboardShouldPersistTaps='handled'>
        {
          (now===0 || now===1) && (
            <AutoCompleteInput placeholder={'검색'} onChangeText={onChangeText} onPressIn={onPressIn} now={1} text={text} textList={textList} onBlur={onBlur}/>
          )
        }
        {
          (now===0 || now===2) && (
            <AutoCompleteInput placeholder={'검색'} onChangeText={onChangeText} onPressIn={onPressIn} now={2} text={text} textList={textList} onBlur={onBlur}/>
          )
        }
      </ScrollView>
    </ShareLayout>
  );
};

export default ShareListScreen;
