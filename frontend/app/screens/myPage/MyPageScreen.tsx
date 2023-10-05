import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid, Pressable, TextInput
} from 'react-native';
import MyPageLayout from "./MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";
import memberApi from "@/apis/memberApi";
import {useSelector} from "react-redux";
import {styles} from "@/styles/styles";
import {appendIcon, locationIcon, micIcon, settingIcon} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import CameraImageModal from '@/components/modal/CameraImageModal';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import BasicBadge from "@/components/BasicBadge";
import {ALERT_COLOR, MAIN_COLOR, TEXT_DEACTIVATED_COLOR, WARN_COLOR} from "@/assets/colors/colors";

const imagePickerOption = {
  mediaType: 'photo',
  includeBase64: Platform.OS === 'android',
};

const MyPageScreen = ({navigation}:any) => {
  const settings = [
    {name: '계정 설정', goto: 'AccountSetting'},{name: '알림 설정', goto: 'AlarmSetting'},{name: '내 나눔 내역', goto: 'MyShare'},{name: '즐겨찾기 레시피', goto: 'MyFavorite'}, {name:'임시 회원가입용', goto: 'SignUp'}, {name: '유저페이지', goto: 'User'}
  ];
  const memberId = useSelector((state) => state.userReducer.memberId);
  const [user, setUser] = useState<any>();
  const [userProfile, setUserProfile] = useState('');
  const [nickname, setNickname] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nickEditing, setNickEditing] = useState<boolean>(false);


  function goto(t: string){
    navigation.navigate(t)
  }

  useEffect(() => {
    !user && getUserDetail();
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function getUserDetail(){
    // console.log(memberId);
    try {
      const res = await memberApi.memberDetail(memberId);
      if (res.status === 200) {
        // console.log(res.data.data.memberInfo);
        setUser(res.data.data.memberInfo);
        setNickname(res.data.data.memberInfo.nickname);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const modalOpen = () => {
    setModalVisible(true);
  };

  const onPickImage = async res => {
    if (res.didCancel || !res) {
      return;
    }
    //console.log('PickImage', res);
    // console.log('user: ', user);
    const memberId = user.memberId;
    const formData = new FormData();

    const image = {
      name: res.assets[0].fileName,
      type: res.assets[0].type,
      uri: res.assets[0].uri,
    };

    formData.append('profileImage', image);
    const apiResponse = await memberApi.changeProfile(memberId, formData);
    let newUser = user;
    newUser.profileImageUrl = apiResponse.data.data.profileImageUrl;
    setUser(newUser);
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const saveNickname = async () => {
    // console.log(nickname);
    // console.log(user.memberId);

    try {
      const res = await memberApi.memberUpdate(user.memberId, nickname);
      if (res.status === 200) {
        setNickEditing(false);
      }
    } catch (err) {
      console.log(err);
      setNickEditing(false);
    }
  };

  const changeNickname = () => {
    setNickEditing(true);
  }

  return <>
    <MyPageLayout title="마이 페이지">
      <ScrollView style={{width: '100%'}}>
        <View style={[myPageStyles.infoContainer]}>
          <View
            style={[myPageStyles.profileImage, {marginTop: 20}]}
          >
            {
              user && <>
                <Image source={{uri: user.profileImageUrl}} style={{width: '100%', height: '100%', borderRadius: 100}}/>
                  <TouchableWithoutFeedback onPress={modalOpen}>
                    <View style={{position:'absolute', right:'7%', top: '7%',alignItems:'center', flexDirection:'row', justifyContent:'center', width: 35, height: 35, borderRadius: 100, borderWidth:1, borderColor:TEXT_DEACTIVATED_COLOR, backgroundColor:'#FFFFFF'}}>
                      <SvgXml
                          xml={settingIcon}
                          width={24}
                          height={24}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </>
            }
          </View>
          <View style={[myPageStyles.profileInfo, {alignItems: 'center', marginTop: 10}]}>
              {nickEditing ?
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                  <TextInput
                    value={nickname}
                    onChangeText={(text) => setNickname(() => text)}
                    placeholder="새로운 닉네임을 입력하세요"
                    style={[styles.input, styles.font, {fontSize: 25, width:200, height:46}]}
                  />
                </View>
              : <View style={{margin:14}}>
                  <Text style={[styles.font, {fontSize: 45}]}>
                    {nickname}
                  </Text>
                </View>
            }

            <View style={[{flexDirection: 'row'}]}>
              <SvgXml
                xml={locationIcon}
                width={20}
                height={20}
              />
              <Text style={[styles.font, {color: 'grey', fontSize: 20}]}>서울 역삼동</Text>
            </View>

            <View style={[{alignSelf:'center', flexDirection:'row', justifyContent:'center'}]}>
              {nickEditing&&
                <BasicBadge color={ALERT_COLOR} fill={false} name={' 취소 '} onPress={()=>{setNickEditing(false)}}/>
              }
              <BasicBadge color={MAIN_COLOR} fill={false} name={nickEditing?' 완료 ':' 수정 '} onPress={nickEditing?saveNickname:changeNickname}/>
            </View>
          </View>
          <View style={[myPageStyles.profileRowContainer, {height: 100}]}>

          </View>
        </View>
        <View style={myPageStyles.optionsContainer}>
          {
            settings.map((i) => {
              return <React.Fragment key={`${i.goto}`}>
                  <SettingContainer name={i.name} goto={i.goto} optionFunc={goto}/>
                </React.Fragment>
            })
          }
        </View>
      </ScrollView>
    </MyPageLayout>
    <CameraImageModal
      visible={modalVisible}
      onClose={()=>setModalVisible(false)}
      onLaunchCamera={onLaunchCamera}
      onLaunchImageLibrary={onLaunchImageLibrary}/>
  </>
}

export default MyPageScreen;
