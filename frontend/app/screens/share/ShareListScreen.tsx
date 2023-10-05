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
import {backButton, blackLocationIcon, settingIcon} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {Shadow} from "react-native-shadow-2";

const ShareListScreen = ({navigation}:any) => {
  const shareText = useInput({
    placeholder: '검색어 입력',
  })
  const [shareList, setShareList] = useState<any[]>([
    {name: '감자 한박스 나눔합니다'}, {name: '양파 나눔이요'}, {name: '방금 캔 파 나눔 합니다'}, {name: '정말 정말 정말 정말 정말 정말 긴 바나나 나눔 합니다'}, {name: '5'},{name: '6'}, {name: '7'}, {name: '8'},
  ])
  const [isVisible, setIsVisible] = useState(true);
  const [nowLocation, setNowLocation] = useState<any>()

  function goShareCreate(){
    navigation.navigate('ShareCreate')
  }

  async function getShareList(){
    try {

      const res = await shareApi.getShareList({locationId: 1, items: 5, pageNum: 0, keyword: ''});
      if (res.status === 200){
        setShareList(res.data.data.response.sharePostResponses);
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getShareList();
  })

  function locationItem(){
    return (
      <TouchableWithoutFeedback onPress={()=>{console.log('click')}}>
        <View style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <View style={{marginRight: 5}}>
              <SvgXml
                xml={blackLocationIcon}
                width={22}
                height={22}
                style={{alignSelf:'center'}}
              />
            </View>
            <View>
              <Text style={[styles.font, {fontSize: 22}]}>역삼동</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  function locationSetting(){
    return (
      <>
        <TouchableWithoutFeedback onPress={()=>{console.log('click')}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
              <View style={{marginRight: 5}}>
                <SvgXml
                  xml={settingIcon}
                  width={22}
                  height={22}
                  style={{alignSelf:'center'}}
                />
              </View>
              <View>
                <Text style={[styles.font, {fontSize: 22}]}>내 동네 설정</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    )
  }

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
            <View style={{width: '90%', flexDirection: 'row'}}>
              {
                isVisible ? (
                  <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                    <View style={{marginRight: 5}}>
                      <SvgXml
                        xml={blackLocationIcon}
                        width={25}
                        height={25}
                        style={{alignSelf:'center'}}
                      />
                    </View>
                    <View>
                      <Text style={[styles.font, {fontSize: 25}]}>역삼동</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                      <View>
                        <View style={{transform: [{ rotate: '180deg'}], marginLeft: 10, borderRadius: 999, borderWidth: 1, width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderColor: '#B2CFFF'}} >
                          <SvgXml
                            xml={backButton}
                            width={15}
                            height={15}
                            rotation={90}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                ) : (
                  <View style={{borderWidth: 1, padding: 10, borderRadius: 16, borderColor: '#B2CFFF'}}>
                    <View style={{}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 5}}>
                          <SvgXml
                            xml={blackLocationIcon}
                            width={25}
                            height={25}
                            style={{alignSelf:'center'}}
                          />
                        </View>
                        <View>
                          <Text style={[styles.font, {fontSize: 25}]}>역삼동</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(true)}>
                          <View>
                            <View style={{marginLeft: 10, borderRadius: 999, borderWidth: 1, width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderColor: '#B2CFFF'}} >
                              <SvgXml
                                xml={backButton}
                                width={15}
                                height={15}
                                rotation={90}
                              />
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                      {locationItem()}
                      {locationItem()}
                      {locationSetting()}
                    </View>
                  </View>
                )
              }
              <View style={{flex: 1}}></View>
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
                  <ShareItem item={i}/>
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
