import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {ingredientStyles} from "@/styles/ingredientStyles";
import {styles} from "@/styles/styles";
import IngredientIcon from "@/components/IngredientIcon";
import tw from 'twrnc';
import Modal from "react-native-modal";
import BasicBadge from "@/components/BasicBadge";
import {backButton, deleteIcon, modifyIcon} from "@/assets/icons/icons";
import houseApi from "@/apis/houseApi";
import {Calendar} from "react-native-calendars";
import {
  ALERT_COLOR,
  COLD_COLOR,
  COOL_COLOR,
  LIGHT_BACKGROUND_COLOR,
  MAIN_COLOR, TEXT_COLOR,
  WARM_COLOR
} from "@/assets/colors/colors";
import {topNavStyles} from "@/styles/topNavStyles";
import {SvgXml} from "react-native-svg";

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
  const [isModifying, setIsModifying] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(storageType===1?new Date():new Date(lastDate)));
  const [selectedStorageType, setSelectedStorageType] = useState<number>(0);

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: Date) {
    return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-')
    );
  }


  useEffect(() => {
    const date: Date = new Date;
    const last: Date = new Date(lastDate);
    const storage: Date = new Date(storageDate);
    setIsModifying(false);
    setSelectedDate(formatDate(storageType===1?date:last));
    setSelectedStorageType(storageType);
    // @ts-ignore date 계산 관련 ts 에러 무시
    const lastGap: number = 1+ Math.floor((last.getTime() - date) / (1000 * 60 * 60 * 24));
    setLastGap(lastGap)
    // @ts-ignore date 계산 관련 ts 에러 무시
    setStorageGap(1+ Math.floor((date-storage.getTime()) / (1000 * 60 * 60 * 24)));
    setIsModified(true);
  }, [])

  useEffect(() => {
    setIsModified(false);
    const date: Date = new Date;
    const last: Date = new Date(selectedDate);
    setSelectedDate(formatDate(selectedStorageType===1?date:last));
    // @ts-ignore date 계산 관련 ts 에러 무시
    const lastGap: number = 1+ Math.floor((last.getTime() - date) / (1000 * 60 * 60 * 24));
    setLastGap(lastGap)
    // @ts-ignore date 계산 관련 ts 에러 무시
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
  }, [isModified])


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if(isModalVisible&&isModified){
      setTimeout(()=>{onChange(); setIsModified(false);},500);
    }
  };


  function getDDay(){
    if(selectedStorageType===1) return '냉동';
    return `D${(lastGap<0?'+':'-')+Math.abs(lastGap)}`;
  }

  function getDateGapText(dateGap:number){

    if(dateGap<=1) return '오늘';
    else if(dateGap<7) return dateGap+'일 전'
    else if(dateGap<27) return Math.floor(dateGap/7)+'주 전'
    else if(dateGap<365) return Math.floor(dateGap/30)+'개월 전'
    else return Math.floor(dateGap/365)+'년 전'
  }

  function getStorageTypeText(){
    if(selectedStorageType==0) return '냉장';
    else if(selectedStorageType==1) return '냉동';
    else if(selectedStorageType==2) return '상온';
  }

  async function deleteIngredient(){

    try {
      const res = await houseApi.deleteIngredient({houseIngredientId: houseIngredientId})
      if (res.status === 200) {
        onChange();
        toggleModal();
      }
    } catch (err) {
      console.log("SingleIngredient -> deleteIngredient",err);
    }
  }

  async function modifyIngredient(){

    try {
      const res = await houseApi.updateIngredient({
        houseIngredientId:houseIngredientId,
        storageType:selectedStorageType,
        lastDate:selectedDate,
      })
      if (res.status === 200) {
        // console.log(res.data);
        onChange();
        setIsModifying(false);
        setIsModified(true);
      }
    } catch (err) {
      console.log("SingleIngredient -> modifyIngredient",err);
    }
  }

  return (
    <View style={[tw`w-[48%] my-[1%] mx-[1%] bg-white`,{aspectRatio:"11/5"}]}>
      {/*모달 시작*/}
      <Modal isVisible={isModalVisible} coverScreen={true} onBackdropPress={()=> {
        if (isModifying) {
          setSelectedDate(formatDate(storageType === 1 ? new Date() : new Date(lastDate)));
          setSelectedStorageType(storageType);
          setIsModifying(false);
        }
        toggleModal()
      }} animationIn={"fadeIn"} animationOut={"fadeOut"} animationInTiming={100} animationOutTiming={100}>
      {!isModifying&&
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
              <IngredientIcon storageType={selectedStorageType} ingredientInfoId={1}/>
              <Text style={[styles.font, tw`text-sm text-center`]}>{getStorageTypeText()}</Text>
            </View>
          </View>
          <View style={[ingredientStyles.singleBottom, {flex:1,flexDirection:'row', justifyContent:'center'}]}>
            <View style={[{alignSelf:'flex-end'}]}><BasicBadge leftIcon={modifyIcon} color='#3093EF' name={'수정하기'} onPress={()=>{setIsModifying(true)}}/></View>
            <View style={[{alignSelf:'flex-end'}]}><BasicBadge leftIcon={deleteIcon} color={ALERT_COLOR} name={'삭제하기'} onPress={deleteIngredient}/></View>
          </View>
        </View>}
        {isModifying&&
            <View style={[{width:'95%', height:'auto',backgroundColor:'#FFFFFF', alignSelf:'center', padding:20, borderRadius:20, display:'flex', flexDirection:'column'}]}>

              <View style={[{marginTop:15, flexDirection:'row', justifyContent:'center'}]}>
              <TouchableWithoutFeedback onPress={()=>{
                setSelectedDate(formatDate(storageType === 1 ? new Date() : new Date(lastDate)));
                setSelectedStorageType(storageType);
                setIsModifying(false)}}>
                <View style={[topNavStyles.backButton, {flex:1, alignSelf:'center', height:60}]}>
                  <SvgXml
                      xml={backButton}
                      width={19}
                      height={19}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={[styles.font, {alignSelf:'center', color:TEXT_COLOR, flex:3}, tw`text-4xl text-center`]}>{ingredientName}</Text>
                <View style={{flex:1}} />
              </View>

              <View style={[{flexDirection: 'row', justifyContent: "space-around", marginVertical:10}]}>
                <Text style={[styles.font, {alignSelf:'center'}, tw`flex-2 text-2xl text-center mr-2`]}>보관방법</Text>
                <View style={[{flexDirection: 'row', overflow: 'hidden', backgroundColor:LIGHT_BACKGROUND_COLOR, flex:3, justifyContent: "space-around", borderRadius:99, paddingHorizontal:1,height:40}]}>
                  <TouchableWithoutFeedback
                      onPress={()=>{setSelectedStorageType(1)}}
                  >
                    <View style={[{backgroundColor:selectedStorageType===1?COLD_COLOR:LIGHT_BACKGROUND_COLOR, paddingHorizontal:7, marginRight:2,borderRadius:99, justifyContent:'center', alignItems:'center'}]}>
                      <Text style={[styles.font, {color:selectedStorageType===1?'#FFFFFF':COLD_COLOR, textAlign:'center'}, tw`text-lg text-center`]}>냉동</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                      onPress={()=>{setSelectedStorageType(0)}}
                  >
                    <View style={[{backgroundColor:selectedStorageType===0?COOL_COLOR:LIGHT_BACKGROUND_COLOR, paddingHorizontal:7, marginRight:2,borderRadius:99, justifyContent:'center', alignItems:'center'}]}>
                      <Text style={[styles.font, {color:selectedStorageType===0?'#FFFFFF':COOL_COLOR, textAlign:'center'}, tw`text-lg text-center`]}>냉장</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                      onPress={()=>{setSelectedStorageType(2)}}
                  >
                    <View style={[{backgroundColor:selectedStorageType===2?WARM_COLOR:LIGHT_BACKGROUND_COLOR, paddingHorizontal:7,borderRadius:99, justifyContent:'center', alignItems:'center'}]}>
                      <Text style={[styles.font, {color:selectedStorageType===2?'#FFFFFF':WARM_COLOR, textAlign:'center'}, tw`text-lg text-center`]}>상온</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {selectedStorageType!==1&&
                <><View style={[{flexDirection: 'row', justifyContent: "space-around", marginVertical:5}]}>
                <Text style={[styles.font, tw`flex-2 text-2xl text-center mr-2`]}>소비기한</Text>
                <View style={[{flexDirection: 'row', flex:3, justifyContent: "space-around",}]}>
                  <Text style={[styles.font, tw`text-lg text-center`]}>{selectedDate}</Text>
                </View>
              </View>

              <Calendar
                  monthFormat={'yyyy년 MM월'}
                  firstDay={0}
                  onDayPress={(day) => {setSelectedDate(day.dateString)}}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: MAIN_COLOR,
                    },
                  }}
              /></>
            }

              <View style={[{marginTop:15, flexDirection:'row', justifyContent:'center'}]}>
                <View style={[{alignSelf:'flex-end'}]}><BasicBadge leftIcon={modifyIcon} color='#3093EF' name={'수정하기'} onPress={modifyIngredient}/></View>
              </View>
            </View>
        }
      </Modal>
      {/*모달 끝*/}



      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={[container, ingredientStyles.singleColumnContainer]}>
          <View style={ingredientStyles.singleTop}>
            <View style={ingredientStyles.dateContainer}>
              <Text style={[styles.font, tw`text-sm`]}>{getDateGapText(storageGap)} 등록</Text>
            </View>
            <View style={[tw`flex-wrap`]}>
              <IngredientIcon storageType={selectedStorageType} ingredientInfoId={ingredientInfoId}/>
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
