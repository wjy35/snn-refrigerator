import React, {useState} from 'react';
import {TouchableWithoutFeedback, View,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {bottomTabStyles} from "@/styles/bottomTabStyles";
import {
  sendDisactive, sendActive
} from '@/assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import useInput from "@/hooks/useInput";
import PlainInput from "@/components/PlainInput";

interface props {
  onSubmit: Function,
}
const BottomChat = ({onSubmit}: props) => {
  const navigation: any = useNavigation();
  const [chatList, setChatList] = useState<any[]>([]);

  const text = useInput({
    placeholder: '메시지 보내기',
  });

  return (
    <View style={[bottomTabStyles.tabContainer, {zIndex: 100}]}>
      <View style={[bottomTabStyles.tabItemContainer, {padding: 10}]}>
        <View style={[{flex: 1}]}>
          <PlainInput {...text} onSubmit={onSubmit}/>
        </View>
        <View style={[{width: 80, height: 80, alignItems: 'center', justifyContent: 'center'}]}>
          {
            text.text ? (
              <>
                <TouchableWithoutFeedback onPress={()=>{onSubmit(text.text)}}>
                  <SvgXml
                    xml={sendActive}
                    width={40}
                    height={40}
                    style={{alignSelf:'center'}}
                  />
                </TouchableWithoutFeedback>
              </>
            ) : (
              <SvgXml
                xml={sendDisactive}
                width={40}
                height={40}
                style={{alignSelf:'center'}}
              />
            )
          }
        </View>
      </View>
    </View>
  );
};

export default BottomChat;
