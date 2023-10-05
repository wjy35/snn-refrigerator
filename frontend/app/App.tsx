import React,{useEffect} from 'react';
import Navigation from '@/navigations/Navigation';
import {Provider, useSelector} from "react-redux";
import store from "@/store/store";
import { LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {RootState} from "@/reducers/reducers";
import chatRoomApi from "@/apis/chatRoomApi";
import alarmApi from "@/apis/alarmApi";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreLogs(['ViewPropTypes']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); // TODO : Ignore all log notifications

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});


const App = () => {

      useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // ToDo 받은 push 알림 처리
            console.log('[Remote Message] ', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
      }, []);


  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
