import React, {useState} from 'react';
import {View, Text, Button, ImageBackground, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";
import PlainInput from "@/components/PlainInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import addressAutocompleteApi from "@/apis/addressAutocompleteApi";
import useInput from "@/hooks/useInput";


const SignUpScreen = ({navigation}:any) => {
  const [locationList, setLocationList] = useState<any[]>([]);
  const [now, setNow] = useState<number>(0);
  const [excludeIngredientList, setExcludeIngredientList] = useState<any[]>([]);

  const checkLocation = async (keyword: string) => {
    try {
      const res = await addressAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setLocationList(res.data.data.locations)
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

  function onPressIn(nowNum: number){
    setNow(nowNum);
  }

  function onBlurLocation(){
    location.reset();
    setLocationList([]);
  }

  function onBlurIngredient(){
    excludeIngredient.reset();
    setExcludeIngredientList([]);
  }

  const nickName = useInput({
    placeholder:'닉네임',
    title: '닉네임',
    nowNum: 1,
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

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <View style={[{width: '100%', height: '90%', borderWidth: 1}]}>
          <ScrollView>
            <View style={{width: '100%', padding: 30, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1}}>
              <View style={{flex: 1}}>
                <Text style={[styles.font, {fontSize: 30}]}>회원가입</Text>
              </View>
              <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={[styles.font, {fontSize: 16, color: 'gray'}]}>냉장고를 더 편하게 관리해보세요!</Text>
              </View>
            </View>
            <View>
              <View>
                <PlainInput {...nickName}/>
              </View>
              <View style={{width: '100%', borderWidth: 1}}>
                <AutoCompleteInput {...location} textList={locationList} onPressIn={onPressIn} onBlur={onBlurLocation} keyValue='locationId' name='locationName'/>
                <View></View>
              </View>
              <View style={{width: '100%', borderWidth: 1}}>
                <AutoCompleteInput {...excludeIngredient} textList={excludeIngredientList} onPressIn={onPressIn} onBlur={onBlurIngredient} keyValue='ingredientInfoId' name='ingredientName'/>
                <View></View>
              </View>
              <View>
                <PlainInput {...houseCode}/>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center', height: '10%'}]}>
          <View style={[{width: '70%'}]}>
            <Button title='회원가입'></Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignUpScreen;
