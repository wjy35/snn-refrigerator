import React from 'react';
import Swiper from 'react-native-swiper';

const ProgressPage = ({children}: any) => {

  return (
    <>
      <Swiper loop={false}>
        {children}
      </Swiper>
    </>
  );
};

export default ProgressPage;
