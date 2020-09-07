/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'; 
import { Provider } from 'react-redux'; 
import { store, persistor } from './redux/store'; 
import { NavigationContainer } from '@react-navigation/native';
import Routes from './route';
import '../global.js';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;