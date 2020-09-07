/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import validator from 'validator';

import Icon from 'react-native-vector-icons/FontAwesome5';
// Imports: Firebase
import auth from '@react-native-firebase/auth';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      phone: null,
      password: null,
      password2: null,
      isLoading: false,
    };
  }

  onRegist = async () => {
    const { email, password, password2 } = this.state;
    if (email && password && password2) {
      if (validator.isEmail(email)) {
        if (validator.isByteLength(password, { min: 8, max: 14 })) {
          if (password === password2) {
            try {
              const authCheck = await auth().createUserWithEmailAndPassword(email, password);
              this.props.register({
                email: authCheck.user.email,
                uid: authCheck.user.uid,
              });
              this.props.navigation.navigate('login');
            } catch (error) {
              
              this.props.navigation.navigate('login');
              this.setState({ isLoading: false });
            }
          } else {
            ToastAndroid.show('Password not match', ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Password shoul have minimum 8 - 14 character', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Email must be valid', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('All input form must be filled', ToastAndroid.SHORT);
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.cont}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '30%', backgroundColor: '#191919' }}>
            <Icon name="newspaper" style={{fontSize:80,color:'#FCFAF7'}}  />
            <Text style={{color:'#FCFAF7'}} >Create My News Account</Text>
          </View>

          <View style={{ paddingHorizontal: 20, height: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Input
              placeholder="Email"
              onChangeText={(e) => this.setState({ email: e })}
              keyboardType="email-address"
            />
            <Input
              placeholder="Password (8 - 14 Character)"
              onChangeText={(e) => this.setState({ password: e })}
              secureTextEntry
            />
            <Input
              placeholder="Confirm Password"
              onChangeText={(e) => this.setState({ password2: e })}
              secureTextEntry
            />
            <TouchableOpacity 
              onPress={() => this.onRegist()} style={{ width: '100%', height: 50, backgroundColor: '#191919', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Text style={{ fontSize: 15, color: 'white' }}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20, height: '20%', backgroundColor: 'white', }}>
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
    // paddingHorizontal: 20,
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
    // Register
    register: (request) => dispatch(register(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Register);
