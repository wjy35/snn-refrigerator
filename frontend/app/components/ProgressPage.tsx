import React from 'react';
import Swiper from 'react-native-swiper';
import {View} from "react-native";

const ProgressPage = ({children}: any) => {

  return (
    <>
      <Swiper loop={false} showsPagination={false}>
        {children}
      </Swiper>
    </>
  );
};

export default ProgressPage;
