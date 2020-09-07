/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';

// Screens
import Login from '../screens/auth/Login';
import Splash from '../screens/splash'
import Register from '../screens/auth/Register';
// Tab Screens
import Home from './Home-route';
import Article from '../screens/article/article'
// Navigator
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export class Route extends Component {
  componentDidMount() {
  }
  
  render() {
    const { loggedIn, regist } = this.props.auth;
    return (
      <Stack.Navigator>
        {/* Auth */}
        <>
          {!loggedIn && (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                component={Login}
                name={'login'}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                component={Register}
                name={'Register'}
              />
            </>
          )}
          {loggedIn && (
            <>

              <Stack.Screen
                options={{ headerShown: false }}
                component={Home}
                name={'home'}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                component={Article}
                name={'Article'}
              />
            </>
          )}
        </>
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};


const mapDispatchToProps = (dispatch) => {

  return {
    login: (request) => dispatch(login(request)),
    logout: (request) => dispatch(logout(request)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Route);
