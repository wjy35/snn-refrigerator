import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {Text, View} from "react-native";

const ProgressPage = ({children}: any) => {

  // TODO: 다음 페이지로 이동하는 로직 필요
  const nextButton = ()=>{
    return (
      <>
        <View style={{position: 'absolute', top: -310, left: -30}}>
          <Text>다음</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Swiper loop={false} showsPagination={false} nextButton={nextButton()} showsButtons={true}>
        {children}
      </Swiper>
    </>
  );
};

export default ProgressPage;
