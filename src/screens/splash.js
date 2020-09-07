import React from 'react';
import { View, Text, Image,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}


