import React, {useState} from 'react';
import {Text, View} from "react-native";
import Modal from "react-native-modal";
import {useDispatch, useSelector} from 'react-redux'

interface props {
}
const MyHouseModal = () => {
  const isVisible = useSelector((state: any) => state.houseReducer.isVisible);
  // const dispatch = useDispatch();

  return (
    <View>
      <Modal isVisible={isVisible} hasBackdrop={true} coverScreen={false}>
        <View style={{backgroundColor: '#ffffff'}}>
          <Text>내 냉장고</Text>
        </View>
      </Modal>
    </View>
  );
};

export default MyHouseModal;
