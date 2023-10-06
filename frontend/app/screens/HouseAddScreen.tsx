import React, {useEffect, useState} from 'react';
import {View, Text, Button, ImageBackground, Alert, ActivityIndicator} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import ProgressPage from "@/components/ProgressPage";
import HouseAddIngredient from "@/pages/houseAdd/HouseAddIngredient";
import TopNavigator from "@/components/TopNavigator";
import HouseAddStorage from "@/pages/houseAdd/HouseAddStorage";
import HouseAddDate from "@/pages/houseAdd/HouseAddDate";
import houseApi from "@/apis/houseApi";
import axios from "axios";
import GetImageFrom from "@/components/GetImageFrom";
import ingredientExtractionApi from "@/apis/ingredientExtractionApi";
import GetSpeechFrom from "@/components/GetSpeechFrom";
import houseAddScreen from "@/screens/HouseAddScreen";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {setChangedAction} from "@/actions/houseAction";


const HouseAddScreen = ({navigation}:any) => {
  const textList = ['재료 추가', '보관방법 설정', '소비기한 설정']
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [now, setNow] = useState<number>(0);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [image, setImage] = useState<any>();
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);
  const {houseCode} = useSelector((state:RootState) => state.houseReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  function changeNow(newNum: number) {
    setNow(newNum);
  }

  function checkIngredient(item: any){
    return (
      ingredients.every((ingredient: any) => {
        // console.log("HouseAddScreen -> checkIngredient",ingredient.ingredientName, item.ingredientName);
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  async function onAddIngredient(item: any){
    const newIngredient = {ingredientName: item.ingredientName, ingredientInfoId: item.ingredientInfoId, storageType: 0, lastDate: null};
    if(checkIngredient(item)) setIngredients((ingredients) => {
      return [...ingredients, newIngredient];
    });
  }

  function onChangeIngredients(){
    setIngredients([...ingredients]);
  }

  function deleteIngredient(idx: number){
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }

  async function finishAdd(){
    for(let ingredient of ingredients){
      if(ingredient.lastDate==null && ingredient.storageType!==1){
        Alert.alert('소비기한을 설정해주세요');
        return;
      }
    }
    try {
      setLoading(true);
      const res = await houseApi.addIngredient({
        houseCode: houseCode,
        ingredients: ingredients,
      });
      if (res.status === 200) {
        setLoading(false);
        dispatch(setChangedAction(true));
        navigation.goBack();
      }
    } catch (err){
      console.log(err);
    }
  }

  function getImage(img: any){
    setImage(img);
  }

  async function getIngredient(extractText: string) {
    setSubLoading(true);
    try {
      const extractResponse = await ingredientExtractionApi.extraction(
        extractText,
      );
      for (const i of extractResponse.data.data.data) {
        await onAddIngredient({ingredientInfoId: i.ingredient.id, ingredientName : i.ingredient.name});
      }
      setSubLoading(false);
    } catch (e) {
      setSubLoading(false);
      console.log('err', e);
    }
  }

  const callGoogleVisionApi = async (base64: String) => {
    const url: string = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC6QBRMhadBvm7vfy00XFPpWuoGK1WboXA';
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [{type: 'TEXT_DETECTION', maxResults: 50}],
          },
        ],
      }),
    })
      .then(res => res.json())
      .then(data => {
        let res = data.responses[0]?.fullTextAnnotation?.text;
        if (!res) {
          return;
        }
        res.replace(/\n|\r|\s*/g, '');
        getIngredient(res);
      })
      .catch(err => console.log('error : ', err));
  };

  useEffect(()=>{
    if (!image) return;
    callGoogleVisionApi(image.assets[0].base64);
  }, [image]);

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        {
          loading ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large"/>
            </View>
          ) : (
            <>
              {
                now === 0 && (
                  <TopNavigator title='내 냉장고 등록' optionTitle='등록' optionFunction={finishAdd}/>
                )
              }
              <ProgressPage>
                <HouseAddIngredient
                  loading={subLoading}
                  textList={textList}
                  ingredients={ingredients}
                  setNow={changeNow}
                  now={now}
                  addIngredient={onAddIngredient}
                  deleteIngredient={deleteIngredient}
                  setIsImageVisible={()=>setIsImageVisible(true)}
                  setIsSpeechVisible={()=>setIsSpeechVisible(true)}/>
                <HouseAddStorage
                  textList={textList}
                  ingredients={ingredients}
                  setNow={changeNow}
                  now={now}
                  onChange={onChangeIngredients}/>
                <HouseAddDate
                  textList={textList}
                  ingredients={ingredients}
                  setNow={changeNow}
                  now={now}
                  onChange={onChangeIngredients}/>
              </ProgressPage>
              {
                isImageVisible && (
                  <GetImageFrom getImage={getImage} setIsVisible={()=>setIsImageVisible(false)} Base64={true}/>
                )
              }
              {
                isSpeechVisible && (
                  <GetSpeechFrom setIsVisible={()=>{setIsSpeechVisible(false)}} getIngredient={(extractText: string)=>{getIngredient(extractText)}}/>
                )
              }
              {
                now === 0 && (
                  <>
                    <View style={{height: 80}}></View>
                    <BottomNavigator now=''/>
                  </>
                )
              }
            </>
          )
        }
      </ImageBackground>
    </View>
  )
}

export default HouseAddScreen;
