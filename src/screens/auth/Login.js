/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
  Image,
  Keyboard,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import validator from 'validator';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';
// Imports: Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account, login } from '../../redux/actions/authActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoading: false,
    };
  }

  onLogin = async () => {
    const { email, password } = this.state;
    if (email && password) {
      // if (validator.isEmail(email)) {
      console.log('hallo')
      if (validator.isByteLength(password, { min: 2, max: 14 })) {
        this.setState({ isLoading: true });
        try {
          Keyboard.dismiss()
          const authCheck = await auth().signInWithEmailAndPassword(email,password);
          this.props.login({
            email: authCheck.user.email,
            uid: authCheck.user.uid,
          });
          this.setState({ isLoading: false });
        } catch (error) {
          ToastAndroid.show(error.code, ToastAndroid.SHORT);
          this.setState({ isLoading: false });
        }
      } else {
        ToastAndroid.show('Password harus valid', ToastAndroid.SHORT);
      }

    } else {
      ToastAndroid.show('Semua input harus terpenuhi', ToastAndroid.SHORT);
    }

  }

  render() {
    return (
      <SafeAreaView style={styles.cont}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor="#191919" translucent={false} />
        <View style={styles.container}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '30%', backgroundColor: '#191919' }}>
          <Icon name="newspaper" style={{fontSize:80,color:'#FCFAF7'}} />
          <Text style={{color:'#FCFAF7'}}>My News</Text>
          </View>

          <View style={{ paddingHorizontal: 20, height: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Input
              placeholder="Email"
              onChangeText={(e) => this.setState({ email: e })}
              keyboardType="email-address"
            />
            <Input
              placeholder="Password"
              onChangeText={(e) => this.setState({ password: e })}
              secureTextEntry
            />
            <TouchableOpacity onPress={() => this.onLogin()} style={{ width: '100%', height: 50, backgroundColor: '#191919', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Text style={{ fontSize: 15, color: 'white' }}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20, height: '20%', backgroundColor: 'white', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', bottom: 20, left: 20, position: 'absolute' }}>
              
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Register')}style={{}}>
                <Text style={{ fontSize: 15, color: '#191919' }}>Create new account</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex:1,
    // paddingHorizontal: 20,
    // justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#313335',
    marginTop: 30,
  },
  desc: {
    marginTop: 30,
    textAlign: 'center',
    color: '#86888a',
    marginBottom: 45,
  },
  mb_10: {
    marginBottom: 10,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    account: (request) => dispatch(account(request)),
    login: (request) => dispatch(login(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Login);
