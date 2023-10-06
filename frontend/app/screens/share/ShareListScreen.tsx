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
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {TEXT_SUB_COLOR} from "@/assets/colors/colors";

const ShareListScreen = ({navigation}:any) => {
  const shareText = useInput({
    placeholder: '검색어 입력',
  })
  const [shareList, setShareList] = useState<any[]>([])
  const [isVisible, setIsVisible] = useState(true);
  const {memberId} = useSelector((state:RootState)=>state.userReducer);
  const locations = useSelector((state: RootState)=>state.userReducer.locations);
  const [nowLocation, setNowLocation] = useState<any>();
  const items = 20;
  const [page, setPage] = useState(0);

  function goShareCreate(){
    navigation.navigate('ShareCreate');
  }

  async function getShareList(){
    if (!nowLocation) return
    try {
      const res = await shareApi.getShareList({ locationId: nowLocation.locationId, items: items, pageNum: page, keyword: shareText.text});
      if (res.status === 200){
        // console.log(res);
        setShareList(res.data.data.response.sharePostResponses);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getShareList();
  }, [nowLocation]);

  useEffect(()=>{
    setNowLocation(locations[0]);
  }, [locations])

  function locationItem(location: any){
    const shortName = location.locationName.split(' ')
    return (
      <TouchableWithoutFeedback onPress={()=>{
        setIsVisible(true);
        setNowLocation(location)}
      }>
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
              <Text style={[styles.font, {fontSize: 22}]}>{shortName[shortName.length-1]}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  function locationSetting(){
    return (
      <>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate('AccountSetting')}}>
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

  function nowShortName(){
    const shortName = nowLocation.locationName.split(' ');
    return (
      <Text style={[styles.font, {fontSize: 25}]}>{shortName[shortName.length-1]}</Text>
    )
  }

  return (
    <ShareLayout title="나눔" optionTitle={nowLocation ? '등록' : ''} optionFunction={nowLocation?goShareCreate:()=>{}}>
      {
        nowLocation ? (
          <>
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
                            {nowShortName()}
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
                                {nowShortName()}
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
                            {
                              locations.map((location, index)=>{
                                return (
                                  <React.Fragment key={`location${index}`}>
                                    {locationItem(location)}
                                  </React.Fragment>
                                )
                              })
                            }
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
                    <PlainInput {...shareText} onPressIn={()=>{setIsVisible(false)}}/>
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
          </>
        ) : (
          <View style={{width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <View style={{padding: 20}}>
                <Text style={[styles.font, {fontSize: 20}]}>내가 사는 지역을 등록해야 이용이 가능합니다</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={()=>{navigation.navigate('AccountSetting')}}>
                  <Text style={[styles.font, {fontSize: 14, color: TEXT_SUB_COLOR}]}>지역 등록하러 가기</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        )
      }

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
