import React from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import {styles} from "@/styles/styles";
import {TEXT_COLOR} from "@/assets/colors/colors";

const ShareDetailScreen = ({navigation}:any) => {
  const profileImageUrl = ''

  return (
    <ShareLayout title="나눔">
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={[{width: '100%', borderWidth: 1, padding: 15}]}>
            <View style={[{width: '100%', borderWidth: 1, marginBottom: 10}]}>
              <View style={[{marginVertical: 10}]}>
                <Text style={[styles.font, {fontSize: 22}]}>역삼동</Text>
              </View>
              <View>
                <Text style={[styles.font, {fontSize: 26}]}>나눔 글 제목</Text>
              </View>
            </View>
            <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style={[{flexDirection: 'row', }]}>
                <View style={{borderWidth: 1, height: 50, width: 50}}>
                  {profileImageUrl&&<Image source={{uri: profileImageUrl}}
                                           style={{height:70,width:70,borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR ,marginRight:10}}
                  />}
                </View>
                <View>
                  <Text style={[styles.font, {fontSize: 16}]}>독버섯 김석주</Text>
                </View>
              </View>
              <View style={[{justifyContent: 'flex-end'}]}>
                <Text style={[styles.font, {fontSize: 14}]}>3일 전 등록</Text>
              </View>
            </View>
            <View style={[{borderWidth: 1, minHeight: 200, marginVertical: 20, borderRadius: 16, padding: 10}]}>
              <Text style={[styles.font, {fontSize: 18}]}>Lorem itsum</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <View>
                <Text style={[styles.font, {fontSize: 14}]}>등록이미지</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{borderWidth: 1, height: 70, width: 70, margin: 5}}>
                </View>
                <View style={{borderWidth: 1, height: 70, width: 70, margin: 5}}>
                </View>
                <View style={{borderWidth: 1, height: 70, width: 70, margin: 5}}>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={[styles.font, {fontSize: 14}]}>나눔 목록</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ShareLayout>
  )
}

export default ShareDetailScreen;
