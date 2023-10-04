import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";
import {ingredientStyles} from "@/styles/ingredientStyles";
import {styles} from "@/styles/styles";
import IngredientIcon from "@/components/IngredientIcon";
import tw from 'twrnc';
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import Modal from "react-native-modal";
import BasicBadge from "@/components/BasicBadge";
import {deleteIcon, micIcon, modifyIcon, pictureIcon} from "@/assets/icons/icons";
import houseApi from "@/apis/houseApi";

interface props {
  ingredientName: string;
  storageType: number;
  lastDate: string;
  storageDate: string;
  houseIngredientId: number;
  ingredientInfoId: number;
  onChange: Function;
}

const SingleIngredient = ({ingredientName, storageType, storageDate, lastDate, ingredientInfoId, houseIngredientId, onChange}: props) => {
  const [lastGap, setLastGap] = useState<number>(0)
  const [storageGap, setStorageGap] = useState<number>(0)
  const [container, setContainer] = useState<any>()
  const [text, setText] = useState<any>()
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const date: Date = new Date;
    const last: Date = new Date(lastDate);
    const storage: Date = new Date(storageDate);
    // @ts-ignore date 계산 관련 ts 에러 무시
    const lastGap: number = 1+ Math.floor((last.getTime() - date) / (1000 * 60 * 60 * 24));
    setLastGap(lastGap)
    // @ts-ignore date 계산 관련 ts 에러 무시
    setStorageGap(1+ Math.floor((date-storage.getTime()) / (1000 * 60 * 60 * 24)));
    if (storageType === 1){
      setContainer(ingredientStyles.coldContainer)
      setText(ingredientStyles.coldText)
    } else if (lastGap < 0){
      setContainer(ingredientStyles.overContainer)
      setText(ingredientStyles.overText)
    } else if (lastGap < 3){
      setContainer(ingredientStyles.alertContainer)
      setText(ingredientStyles.alertText)
    } else if (lastGap < 7){
      setContainer(ingredientStyles.warnContainer)
      setText(ingredientStyles.warnText)
    } else {
      setContainer(ingredientStyles.safeContainer)
      setText(ingredientStyles.safeText)
    }
  })

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  function getDDay(){
    if(storageType===1) return '냉동';
    return `D${(lastGap<0?'+':'-')+Math.abs(lastGap)}`;
  }

  function getDateGapText(dateGap:number){

    if(dateGap==0) return '오늘';
    else if(dateGap<7) return dateGap+'일 전'
    else if(dateGap<27) return Math.floor(dateGap/7)+'주 전'
    else if(dateGap<365) return Math.floor(dateGap/30)+'개월 전'
    else return Math.floor(dateGap/365)+'년 전'
  }

  function getStorageTypeText(){
    if(storageType==0) return '냉장';
    else if(storageType==1) return '냉동';
    else if(storageType==2) return '상온';
  }

  async function deleteIngredient(){

    try {
      const res = await houseApi.deleteIngredient({houseIngredientId: houseIngredientId})
      if (res.status === 200) {
        console.log(res.data);
        onChange();
        toggleModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={[tw`w-[48%] my-[1%] mx-[1%] bg-white`,{aspectRatio:"11/5"}]}>
      {/*모달 시작*/}
      <Modal isVisible={isModalVisible} coverScreen={true} onBackdropPress={toggleModal} animationIn={"fadeIn"} animationOut={"fadeOut"} animationInTiming={100} animationOutTiming={100}>
        <View style={[{width:'95%', minHeight:200, aspectRatio:'7/4', backgroundColor:'#FFFFFF', alignSelf:'center', padding:20, borderRadius:20}]}>
          <View style={[ingredientStyles.singleTop,{flex:1}]}>

            <View style={[ingredientStyles.nameContainer,{flex:3, alignSelf:'center'}]}>
              <Text style={[styles.font, text, tw`text-5xl`, ]} numberOfLines={1} ellipsizeMode={"tail"} >{ingredientName}</Text>
            </View>
            <View style={[ingredientStyles.dDayContainer, {alignSelf:'center'}]}>
              <Text style={[styles.font, text, tw`text-right text-2xl mx-1`]}>{getDDay()}</Text>
            </View>
          </View>


          <View style={[ingredientStyles.singleMiddle]}>
            <View style={[ingredientStyles.dateContainer, {alignSelf:'center'},tw`mr-1`]}>
              <Text style={[styles.font, tw`text-sm`]}>{getDateGapText(storageGap)} 등록</Text>
            </View>
            {ingredientInfoId===0&&<View style={[{alignItems:'center'},tw`flex-wrap self-center`]}>
              <IngredientIcon storageType={-1} ingredientInfoId={ingredientInfoId}/>
              <Text style={[styles.font, tw`text-sm text-center`]}>커스텀</Text>
            </View>}
            <View style={[tw`flex-wrap self-center ml-1`]}>
              <IngredientIcon storageType={storageType} ingredientInfoId={1}/>
              <Text style={[styles.font, tw`text-sm text-center`]}>{getStorageTypeText()}</Text>
            </View>
          </View>
          <View style={[ingredientStyles.singleBottom, {flex:1,flexDirection:'row', justifyContent:'center'}]}>
            <View style={[{alignSelf:'flex-end'}]}><BasicBadge leftIcon={modifyIcon} color='#3093EF' name={'수정하기'} onPress={()=>{}}/></View>
            <View style={[{alignSelf:'flex-end'}]}><BasicBadge leftIcon={deleteIcon} color='#3093EF' name={'삭제하기'} onPress={deleteIngredient}/></View>
          </View>
        </View>
      </Modal>
      {/*모달 끝*/}



      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={[container, ingredientStyles.singleColumnContainer]}>
          <View style={ingredientStyles.singleTop}>
            <View style={ingredientStyles.dateContainer}>
              <Text style={[styles.font, tw`text-sm`]}>{getDateGapText(storageGap)} 등록</Text>
            </View>
            <View style={[tw`flex-wrap`]}>
              <IngredientIcon storageType={storageType} ingredientInfoId={ingredientInfoId}/>
            </View>
          </View>
          <View style={[ingredientStyles.singleBottom]}>
            <View style={[ingredientStyles.nameContainer,tw`self-end`]}>
              <Text style={[styles.font, text, tw`text-3xl`]} numberOfLines={1} ellipsizeMode={"tail"} >{ingredientName}</Text>
            </View>
            <View style={[ingredientStyles.dDayContainer,tw`self-end`]}>
              <Text style={[styles.font, text, tw`text-right text-lg`]}>{getDDay()}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SingleIngredient;
