import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import PlainInput from "@/components/PlainInput";
import useInput from "@/hooks/useInput";
import {MAIN_COLOR} from "@/assets/colors/colors";
import ingredientExtractionApi from '@/apis/ingredientExtractionApi'


interface props {
  textList: string[];
  setRecipeInfo: Function;
  setIsVisible: Function;
  image: any
}

const RecipeCreateBasicInfo = ({textList, setRecipeInfo, setIsVisible, image}: props) => {
  const [now, setNow] = useState<number>(0);
  const [showUrl, setShowUrl] = useState<string>('');
  function onPressIn(t:number){
    setNow(t);
  }

  const foodName = useInput({
    placeholder: '요리 제목',
    title: '요리 제목',
    nowNum: 0,
    onChange: (keyword: string) => {setRecipeInfo('foodName', keyword)}
  });

  const title = useInput({
    placeholder: '레시피 제목',
    title: '레시피 제목',
    nowNum: 0,
    onChange: (keyword: string) => {setRecipeInfo('title', keyword)}
  });

  const serving = useInput({
    placeholder: '조리 양',
    title: '조리 양',
    nowNum: 0,
    onChange: (keyword: string) => {setRecipeInfo('serving', keyword)}
  });

  const cookingTime = useInput({
    placeholder: '조리 시간',
    title: '조리 시간',
    nowNum: 0,
    onChange: (keyword: string) => {setRecipeInfo('cookingTime', keyword)}
  });

  const youtubeUrl = useInput({
    placeholder: '유튜브 링크',
    title: '유튜브 링크',
    nowNum: 0,
    onChange: (keyword: string) => {setRecipeInfo('youtubeUrl', keyword)}
  });

  useEffect(() => {
    const splitUrl = youtubeUrl.text.split('/',);
    const targetUrl = splitUrl[3]?.split('?v=');
    const target = targetUrl?.pop()
    setShowUrl(target?target.slice(0, 11):'');
  },[youtubeUrl.text])

  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}} keyboardShouldPersistTaps='handled'>
        <TouchableWithoutFeedback onPress={()=>console.log('click')}>
          <>
            <View style={styles.marginContainer}>
              <View style={[styles.smallContainer, {marginTop: 20}]}>
                <PlainInput {...foodName} onPressIn={onPressIn} now={0}/>
              </View>
            </View>
            <View style={styles.marginContainer}>
              <View style={[styles.smallContainer, {marginTop: 20}]}>
                <PlainInput {...title} onPressIn={onPressIn} now={0}/>
              </View>
            </View>
            <View style={[styles.marginRowContainer, {marginTop: 30}]}>
              <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginRight: 10}]}>
                <View style={styles.smallContainer}>
                  <PlainInput {...serving} onPressIn={onPressIn} now={0}/>
                </View>
              </View>
              <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10}]}>
                <View style={styles.smallContainer}>
                  <PlainInput {...cookingTime} onPressIn={onPressIn} now={0}/>
                </View>
              </View>
            </View>
            <View style={[styles.marginContainer, {marginTop: 30}]}>
              <View style={styles.smallContainer}>
                <View style={[{width: '100%'}]}>
                  <Text style={[styles.font, {fontSize: 20}]}>레시피 사진</Text>
                </View>
                <TouchableWithoutFeedback onPress={()=>{setIsVisible()}}>
                  <View style={[{width: '100%', height: 40, marginTop: 10, borderWidth: 1, backgroundColor: MAIN_COLOR, borderColor: MAIN_COLOR, borderRadius: 16, justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={[styles.font]}>레시피 사진 등록하기</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {
                image && (
                  <View style={{height: 200, width: '100%'}}>
                    <Image source={{uri:image.assets[0].uri}} style={[{height: 200}]}/>
                  </View>
                )
              }
            </View>
            <View style={styles.marginContainer}>
              <View style={styles.smallContainer}>
                <View>
                  <PlainInput {...youtubeUrl} onPressIn={onPressIn} now={0}/>
                  { showUrl && (
                      <View style={{alignItems: 'center'}}>
                        <ShowYoutube youtubeId={showUrl} />
                      </View>
                    )
                  }
                </View>
              </View>
              <View style={{height: 250}}>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  )
}

export default RecipeCreateBasicInfo;
