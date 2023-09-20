import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";

interface props {
  textList: string[];
}

const RecipeCreateBasicInfo = ({textList}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View style={styles.smallContainer}>
          <View style={[{width: '100%'}]}>
            <Text>요리 제목</Text>
          </View>
          <View style={[{width: '100%'}]}>
            <TextInput
              style={styles.input}
              placeholder='요리제목'
            />
          </View>
        </View>
        <View style={styles.smallContainer}>
          <View style={[{width: '100%'}]}>
            <Text>레시피 제목</Text>
          </View>
          <View style={[{width: '100%'}]}>
            <TextInput
              style={styles.input}
              placeholder='레시피 제목'
            />
          </View>
        </View>
        <View style={styles.marginRowContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.smallContainer}>
              <View style={[{width: '100%'}]}>
                <Text>조리 양</Text>
              </View>
              <View style={[{width: '100%'}]}>
                <TextInput
                  style={styles.input}
                  placeholder='조리 양'
                />
              </View>
            </View>
          </View>
          <View style={styles.marginContainer}>
            <View style={styles.smallContainer}>
              <View style={[{width: '100%'}]}>
                <Text>조리 시간</Text>
              </View>
              <View style={[{width: '100%'}]}>
                <TextInput
                  style={styles.input}
                  placeholder='조리 시간'
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.smallContainer}>
          <View style={[{width: '100%'}]}>
            <Text>사진 입력</Text>
          </View>
          <View style={[{width: '100%'}]}>
            <GetImageFrom/>
          </View>
        </View>
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
      </ScrollView>
    </View>
  )
}

export default RecipeCreateBasicInfo;
