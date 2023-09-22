import React, {useState} from 'react';
import {View, Button, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from 'styles/styles';
import {bottomTabStyles} from "@/styles/bottomTabStyles";
import {homeDisactive, homeActive, mypageDisactive, mypageActive, recipeActive, recipeDisactive, shareActive, shareDisactive} from '@/assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import Modal from 'react-native-modal';
import MyHouseModal from "@/components/MyHouseModal";
import {useDispatch, useSelector} from "react-redux";
import {toggleVisibleAction} from '@/actions/houseAction';
import useInput from "@/hooks/useInput";
import PlainInput from "@/components/PlainInput";

interface props {
}
const BottomNavigator = ({}: props) => {
  const navigation: any = useNavigation();
  const [chatList, setChatList] = useState<any[]>([]);

  const text = useInput({
    placeholder: '메시지 보내기',
  });

  return (
    <View style={[bottomTabStyles.tabContainer, {zIndex: 100}]}>
      <View style={[bottomTabStyles.tabItemContainer]}>
        <View style={[{width: 80, height: 80, borderWidth: 1}]}>

        </View>
        <View style={[{flex: 1}]}>
          <PlainInput {...text}/>
        </View>
        <View style={[{width: 80, height: 80, borderWidth: 1}]}>

        </View>
      </View>
    </View>
  );
};

export default BottomNavigator;
