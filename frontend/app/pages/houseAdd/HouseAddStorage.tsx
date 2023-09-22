import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";

interface props {
  textList: string[];
}

const HouseAddStorage = ({textList}: props) => {
  const isWarm = useState<boolean>(true)
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={2} total={3} textList={textList}/>
      </View>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.marginRowContainer, {width: '80%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View>
                <Text>상온</Text>
              </View>
              <View>
                <Text>냉동</Text>
              </View>
            </View>
            {
              isWarm ? (
                <View style={{borderWidth: 1, width: '80%', height: 150}}>

                </View>
              ):(
                <View style={{borderWidth: 1, width: '80%', height: 150}}>

                </View>
              )
            }
          </View>
          <View style={{borderWidth: 1, height: 80}}>

          </View>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.marginRowContainer, {width: '80%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View>
                <Text>냉장</Text>
              </View>
            </View>
            <View style={{borderWidth: 1, width: '80%', height: 150}}>

            </View>
          </View>
        </View>

      </View>
    </View>
  )
}

export default HouseAddStorage;
