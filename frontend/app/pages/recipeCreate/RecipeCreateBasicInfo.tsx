import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import PlainInput from "@/components/PlainInput";
import useInput from "@/hooks/useInput";

interface props {
  textList: string[];
  setRecipeInfo: Function;
  getImage: Function;
}

const RecipeCreateBasicInfo = ({textList, setRecipeInfo, getImage}: props) => {
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
    const splitUrl = youtubeUrl.text.split('?v=');
    setShowUrl(splitUrl[1]);
  },[youtubeUrl.text])

  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}} keyboardShouldPersistTaps='handled'>
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
        <View style={styles.marginContainer}>
          <View style={styles.smallContainer}>
            <View style={[{width: '100%'}]}>
              <Text>사진 입력</Text>
            </View>
            <View style={[{width: '100%'}]}>
              <GetImageFrom getImage={getImage}/>
            </View>
          </View>
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
      </ScrollView>
    </View>
  )
}

export default RecipeCreateBasicInfo;
