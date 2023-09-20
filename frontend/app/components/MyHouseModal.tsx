import React, {useState} from 'react';
import {Button, ScrollView, Text, View} from "react-native";
import Modal from "react-native-modal";
import {useDispatch, useSelector} from 'react-redux'
import {styles} from "@/styles/styles";
import {ingredientStyles} from "@/styles/ingredientStyles";
import {useNavigation} from "@react-navigation/native";

interface props {
}
const MyHouseModal = () => {
  const isVisible = useSelector((state: any) => state.houseReducer.isVisible);
  const navigation = useNavigation();

  function goHouseAdd(){

  }

  return (
    <View>
      <Modal isVisible={isVisible} hasBackdrop={false} coverScreen={false} deviceHeight={300}>
      {/*<Modal visible={isVisible} animationType="slide" transparent={true} style={{margin: 0, }}>*/}
        <View style={{alignItems: 'center', marginTop: 10, backgroundColor: '#000000'}}>
          <View style={{width: '90%', height: 300, borderWidth: 3, backgroundColor: '#ffffff', borderRadius: 20, borderColor: '#3093EF'}}>
            <View style={[styles.marginRowContainer, {justifyContent: 'space-between'}]}>
              <View>
                <Text>재료표시</Text>
              </View>
              <View>
                <Text>냉동</Text>
              </View>
              <View>
                <Text>냉장</Text>
              </View>
              <View>
                <Text>상온</Text>
              </View>
            </View>
            <View>
              <ScrollView>
                <View style={{width: '100%', borderWidth: 1, marginBottom: 5}}>
                  {/* 냉동 구분선 */}
                </View>
                <View style={[ingredientStyles.ingredientContainer, {borderWidth: 1, height: 150}]}>
                  {/* 냉동 재료 */}
                </View>
                <View style={{width: '100%', borderWidth: 1, marginBottom: 5}}>
                  {/* 냉장 상온 구분선 */}
                </View>
                <View style={[ingredientStyles.ingredientContainer, {borderWidth: 1, height: 150}]}>
                  {/* 냉장 상온 재료 */}
                </View>
              </ScrollView>
              <Button title='재료 추가' onPress={()=>navigation.navigate('HouseAdd')}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyHouseModal;
