import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';

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
