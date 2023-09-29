import React, {useState} from 'react';
import {View, Text, Button, ImageBackground, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";
import PlainInput from "@/components/PlainInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import addressAutocompleteApi from "@/apis/addressAutocompleteApi";
import useInput from "@/hooks/useInput";
import {useRoute} from "@react-navigation/native";
import BasicBadge from "@/components/BasicBadge";
import {closeIcon} from "@/assets/icons/icons";
import memberApi from "@/apis/memberApi";
import {useDispatch} from "react-redux";
import {setHouseCodeAction} from "@/actions/houseAction";
import {setMemberIdAction} from "@/actions/userAction";


const SignUpScreen = ({navigation}:any) => {
  const [locationList, setLocationList] = useState<any[]>([]);
  const [now, setNow] = useState<number>(0);
  const [excludeIngredientList, setExcludeIngredientList] = useState<any[]>([]);
  const route = useRoute();
  const [locations, setLocations] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [nickNameStatus, setNickNameStatus] = useState<number>(0)

  const checkLocation = async (keyword: string) => {
    try {
      const res = await addressAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setLocationList(res.data.data.locations);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkExcludeIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setExcludeIngredientList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  }

  function checkDuplicateIngredient(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  function checkDuplicateLocation(item: any){
    return (
      locations.every((location: any) => {
        if (location.locationName !== item.locationName){
          return true;
        }
      })
    );
  }

  function onPressIn(nowNum: number){
    setNow(nowNum);
  }

  function onBlurLocation(){
    excludeIngredient.reset();
    setExcludeIngredientList([]);
  }

  function onSelectLocation(item: any) {
    if (checkDuplicateLocation(item)){
      setLocations([...locations, {...item}]);
    }

  }

  function onSelectIngredient(item: any){
    if (checkDuplicateIngredient(item)){
      setIngredients([...ingredients, {...item}]);
    }
  }

  function onBlurIngredient(){
    location.reset();
    setLocationList([]);
  }

  function removeIngredient(idx: number){
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(ingredients);
  }

  function removeLocation(idx: number) {
    const _locations = [...locations];
    _locations.splice(idx, 1);
    setLocationList(_locations);
  }

  async function checkDuplicateNickname(nickname: string){
    try {
      const res = await memberApi.checkDuplicate({
        nickname: nickname
      });
      if (res.status === 200) {
        res.data.data.isUnique?setNickNameStatus(2):setNickNameStatus(1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const nickName = useInput({
    placeholder:'닉네임',
    title: '닉네임',
    nowNum: 1,
    onChange: checkDuplicateNickname,
  });
  const houseCode = useInput({
    placeholder:'(선택) 집 공유 코드 입력',
    title: '이미 좋냉신나를 사용하고 있는 가족이 있나요?',
    nowNum: 1,
  });
  const location = useInput({
    placeholder: '검색',
    title: '우리 동네 등록',
    nowNum: 2,
    onChange: checkLocation,
  });
  const excludeIngredient = useInput({
    placeholder: '검색',
    title: '제외 식재료 등록',
    nowNum: 3,
    onChange: checkExcludeIngredient,
  });

  // 회원가입 후 홈스크린 getrecipe에서 에러
  async function signup(){
    const hateIngredientList = Array.from(ingredients, (i) => i.ingredientInfoId);
    const placeInfoList = Array.from(locations, (i) => i.locationId);
    try {
      const res = await memberApi.signup({
        nickname: nickName.text,
        memberId: route.params.id,
        hateIngredientList: hateIngredientList,
        placeInfoList: placeInfoList,
        birthday: route.params.birthday,
        email: route.params.email,
      });
      if (res.status === 200) {
        dispatch(setHouseCodeAction(res.data.data.houseCode));
      }
    } catch (err) {
      console.log('여기서 에러나는거임signup');
      console.log(err);
    }
  }

  function trySignup(){
    if (nickNameStatus === 2){
      signup().then(navigation.replace('Home'));
    } else if (nickNameStatus === 0) {
      // TODO: toast로 변경 필요
      console.log('닉네임을 입력해주세요');
    } else if (nickNameStatus === 1) {
      // TODO: toast로 변경 필요
      console.log('중복된 닉네임은 사용할 수 없습니다');
    }
  }

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <View style={[{width: '100%', height: '90%'}]}>
          <ScrollView>
            <View style={{width: '100%', padding: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.font, {fontSize: 30}]}>회원가입</Text>
              </View>
              <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={[styles.font, {fontSize: 16, color: 'gray'}]}>냉장고를 더 편하게 관리해보세요!</Text>
              </View>
            </View>
            <View style={[{alignItems: 'center'}]}>
              <View style={[{width: '90%'}]}>
                <PlainInput {...nickName}/>
                {
                  nickNameStatus === 1 && (
                    <Text style={[styles.font, {color: 'red'}]}>중복 닉네임 입니다</Text>
                  )
                }
                {
                  nickNameStatus === 2 && (
                    <Text style={[styles.font, {color: 'blue'}]}>사용 가능한 닉네임 입니다</Text>
                  )
                }
              </View>
              <View style={{width: '90%'}}>
                <AutoCompleteInput {...location} textList={locationList} onPressIn={onPressIn} onBlur={onBlurLocation} keyValue='locationId' name='locationName' onSelect={onSelectLocation}/>
                <View>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                      locations.map((i, idx) => {
                        return (
                          <React.Fragment key={`${i.locationName}${idx}`}>
                            <BasicBadge backgroundColor='#3093EF' name={i.locationName} icon={closeIcon} onPress={()=>{removeLocation(idx)}}/>
                          </React.Fragment>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
              <View style={{width: '90%'}}>
                <AutoCompleteInput {...excludeIngredient} textList={excludeIngredientList} onPressIn={onPressIn} onBlur={onBlurIngredient} keyValue='ingredientInfoId' name='ingredientName' onSelect={onSelectIngredient}/>
                <View>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                      ingredients.map((i, idx) => {
                        return (
                          <React.Fragment key={`${i.ingredientName}${idx}`}>
                            <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} icon={closeIcon} onPress={()=>{removeIngredient(idx)}}/>
                          </React.Fragment>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
              <View style={[{width: '90%', marginTop: 20}]}>
                <PlainInput {...houseCode}/>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center', height: '10%'}]}>
          <View style={[{width: '70%'}]}>
            <Button title='회원가입' onPress={trySignup}></Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignUpScreen;
