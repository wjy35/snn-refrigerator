import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";

interface props {
  textList: string[];
}

const RecipeCreateBasicInfo = ({textList}: props) => {
  // const textList = ['기본 정보', '필요한 재료', '조리 과정']
  return (
    <ScrollView>
      <View style={styles.marginContainer}>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <View style={styles.marginContainer}>
        <View style={styles.marginContainer}>
          <View style={[styles.flex, {width: '100%'}]}>
            <Text>요리 제목</Text>
          </View>
          <View style={[styles.flex, {width: '100%'}]}>
            <TextInput
              style={styles.input}
              placeholder='요리제목'
            />
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={[styles.flex, {width: '100%'}]}>
            <Text>레시피 제목</Text>
          </View>
          <View style={[styles.flex, {width: '100%'}]}>
            <TextInput
              style={styles.input}
              placeholder='레시피 제목'
            />
          </View>
        </View>
        <View style={styles.marginRowContainer}>
          <View style={styles.marginContainer}>
            <View style={[styles.flex, {width: '100%'}]}>
              <Text>조리 양</Text>
            </View>
            <View style={[styles.flex, {width: '100%'}]}>
              <TextInput
                style={styles.input}
                placeholder='조리 양'
              />
            </View>
          </View>
          <View style={styles.marginContainer}>
            <View style={[styles.flex, {width: '100%'}]}>
              <Text>조리 시간</Text>
            </View>
            <View style={[styles.flex, {width: '100%'}]}>
              <TextInput
                style={styles.input}
                placeholder='조리 시간'
              />
            </View>
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={[styles.flex, {width: '100%'}]}>
            <Text>사진 입력</Text>
          </View>
          <View style={[styles.flex, {width: '100%'}]}>
            <GetImageFrom/>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default RecipeCreateBasicInfo;
