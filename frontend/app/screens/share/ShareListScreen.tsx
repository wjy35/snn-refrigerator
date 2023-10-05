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
import {Shadow} from "react-native-shadow-2";

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
        <View style={{width: '100%', marginVertical: 20}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Text style={[styles.font, {fontSize: 20}]}>역삼동</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <PlainInput {...shareText}/>
            </View>
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
      <TouchableWithoutFeedback
          onPress={()=>{navigation.navigate('ShareChatList')}}
      >
        <View style={[{position: 'absolute', bottom: 80, alignSelf:'flex-end', flexDirection:'row', justifyContent:'center', paddingRight:20, paddingBottom:20}]}>

          <Shadow distance={4} offset={[2,2]} style={[{backgroundColor:'#3093EF', height:70,width:70,borderRadius:99, justifyContent:'center'}]}>
            <Text style={[styles.font, {color: '#FFFFFF', fontSize:25, textAlign:'center'}]}>채팅</Text>
          </Shadow>
        </View>
      </TouchableWithoutFeedback>
    </ShareLayout>
  );
};

export default ShareListScreen;
