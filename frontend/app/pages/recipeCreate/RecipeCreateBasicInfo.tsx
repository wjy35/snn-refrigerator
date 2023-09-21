import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import PlainInput from "@/components/PlainInput";

interface props {
  textList: string[];
}

const RecipeCreateBasicInfo = ({textList}: props) => {
  const [now, setNow] = useState<number>(0);
  const [serving, setServing] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<string>('');
  const [foodName, setFoodName] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  function onPressIn(t:number){
    setNow(t);
  }
  function onChangeServing(newText: string){
    setServing(newText);
  }

  function onChangeCookingTime(newText: string){
    setCookingTime(newText);
  }

  function onChangeFoodName(newText: string){
    setFoodName(newText);
  }

  function onChangeTitle(newText: string){
    setTitle(newText);
  }

  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}} keyboardShouldPersistTaps='handled'>
        <View style={styles.marginContainer}>
          <View style={[styles.smallContainer, {marginTop: 20}]}>
            <PlainInput title='요리 제목' placeholder='요리 제목' onPressIn={onPressIn} now={1} text={foodName} onChangeText={onChangeFoodName}/>
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={[styles.smallContainer, {marginTop: 20}]}>
            <PlainInput title='레시피 제목' placeholder='레시피 제목' onPressIn={onPressIn} now={2} text={title} onChangeText={onChangeTitle}/>
          </View>
        </View>
        <View style={[styles.marginRowContainer]}>
          <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginRight: 10}]}>
            <View style={styles.smallContainer}>
              <PlainInput title='조리 양' placeholder='조리 양' onPressIn={onPressIn} now={3} text={serving} onChangeText={onChangeServing}/>
            </View>
          </View>
          <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, marginLeft: 10}]}>
            <View style={styles.smallContainer}>
              <PlainInput title='조리 시간' placeholder='조리 시간' onPressIn={onPressIn} now={3} text={cookingTime} onChangeText={onChangeCookingTime}/>
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
              <View style={[{width: '100%'}]}>
                <Text>url 입력</Text>
              </View>
              <View style={[{width: '100%'}]}>
                <TextInput
                  style={styles.input}
                  placeholder='url 입력'
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <ShowYoutube youtubeId={'N44CCnmgv-M'} />
              </View>
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
