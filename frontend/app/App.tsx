import React from 'react';
import Navigation from '@/navigations/Navigation';
import {Provider} from "react-redux";
import store from "@/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
