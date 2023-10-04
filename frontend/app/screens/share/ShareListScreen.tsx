import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";
import ShareLayout from "@/screens/share/ShareLayout";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import PlainInput from "@/components/PlainInput";
import useInput from "@/hooks/useInput";
import ShareItem from "@/components/ShareItem";
import shareApi from "@/apis/shareApi";
import {useFocusEffect} from "@react-navigation/native";

const ShareListScreen = ({navigation}:any) => {
  const shareText = useInput({
    placeholder: '검색',
  })
  const [shareList, setShareList] = useState<any[]>([
    {name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}, {name: '5'},{name: '6'}, {name: '7'}, {name: '8'},
  ])

  function goShareCreate(){
    navigation.navigate('ShareCreate')
  }

  async function getShareList(){
    try {
      const res = await shareApi.getShareList({locationId: 1, items: 5, pageNum: 1, keyword: ''})
      if (res.status === 200){
        console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(()=>{
    getShareList()
  })

  return (
    <ShareLayout title="나눔" optionTitle='등록' optionFunction={goShareCreate}>
      {/*<Text>ShareListScreen</Text>*/}
      {/*<Button*/}
      {/*  title="개별나눔채팅"*/}
      {/*  onPress={ () => navigation.navigate('SingleShareChat')}*/}
      {/*/>*/}
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{width: '100%', height: 150, borderWidth: 1}}>
          <View>
            <Text>역삼동</Text>
          </View>
          <View style={{width: '80%'}}>
            <PlainInput {...shareText}/>
          </View>
        </View>
        <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center'}]}>
          {
            shareList.map((i, idx) => {
              return (
                <React.Fragment key={`share${idx}`}>
                  <ShareItem title={i.name}/>
                </React.Fragment>
              )
            })
          }
        </View>
      </ScrollView>
      <View style={[{width: 50, height: 50, position: 'absolute', bottom: 80, right: 50}]}>
        <Button title='채팅' onPress={() => navigation.navigate('ShareChatList')}></Button>
      </View>
    </ShareLayout>
  );
};

export default ShareListScreen;
