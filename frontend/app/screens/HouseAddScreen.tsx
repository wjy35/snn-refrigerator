import React, {useEffect, useState} from 'react';
import {View, Text, Button, ImageBackground} from 'react-native';
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


const HouseAddScreen = ({navigation}:any) => {
  const textList = ['재료 추가', '보관방법 설정', '소비기한 설정']
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [now, setNow] = useState<number>(0);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [image, setImage] = useState<any>();
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);

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
    try {
      const res = await houseApi.addIngredient({
        houseCode: '492f9401-c684-4966-936e-56f0941eaffe',
        ingredients: ingredients,
      });
      if (res.status === 200) {
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
    try {
      const extractResponse = await ingredientExtractionApi.extraction(
        extractText,
      );
      for (const i of extractResponse.data.data.data) {
        // console.log("HouseAddScreen -> getIngredient",i.ingredient);
        await onAddIngredient({ingredientInfoId: i.ingredient.id, ingredientName : i.ingredient.name});
      }
    } catch (e) {
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
        let res = data.responses[0].fullTextAnnotation.text;
        if (!res) return;
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
          now === 0 && (
            <TopNavigator title='내 냉장고 등록' optionTitle='등록' optionFunction={finishAdd}/>
          )
        }
        <ProgressPage>
          <HouseAddIngredient
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
            <GetImageFrom getImage={getImage} setIsVisible={()=>setIsImageVisible(false)}/>
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
      </ImageBackground>
    </View>
  )
}

export default HouseAddScreen;
