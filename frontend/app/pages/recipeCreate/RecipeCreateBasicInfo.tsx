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
  foodName: any;
  title: any;
  serving: any;
  cookingTime: any;
  youtubeUrl: any;
}

const RecipeCreateBasicInfo = ({textList, foodName, title, youtubeUrl, serving, cookingTime}: props) => {
  const [now, setNow] = useState<number>(0);
  const [showUrl, setShowUrl] = useState<string>('');
  function onPressIn(t:number){
    setNow(t);
  }

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
        <View style={[styles.marginRowContainer]}>
          <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginRight: 10}]}>
            <View style={styles.smallContainer}>
              <PlainInput {...serving} onPressIn={onPressIn} now={0}/>
            </View>
          </View>
          <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginLeft: 10}]}>
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
              <GetImageFrom/>
            </View>
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={styles.smallContainer}>
            <View>
              <PlainInput {...youtubeUrl} onPressIn={onPressIn} now={0}/>
              { showUrl !== '' && (
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
