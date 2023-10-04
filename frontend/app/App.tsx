import React from 'react';
import Navigation from '@/navigations/Navigation';
import {Provider} from "react-redux";
import store from "@/store/store";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreLogs(['ViewPropTypes']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
