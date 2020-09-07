/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconi from 'react-native-vector-icons/Entypo';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Landing from '../screens/landing'
import Search from '../screens/Search/search'
import Profile from '../screens/profile/profile'
const BottomTab = createBottomTabNavigator();

export default class Home extends Component {
  render() {
    return (
      <BottomTab.Navigator
        tabBarOptions={{
          // activeTintColor: 'black',
          showLabel: false,
          style: styles.topBar,
          activeTintColor: '#FCFAF7',
          inactiveTintColor: 'grey',
        }}
        
      >
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="newspaper" color={color} size={size} />
            ),
          }}

          component={Landing}
          name="Landing"
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
          component={Search}
          name="Search"
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-circle" color={color} size={size} />
            ),
          }}
          component={Profile}
          name="Profile"
        />
      </BottomTab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#191919',
    elevation: 2,
    borderRadius:10,
    // borderTopColor: 'red',
    height: 60,
    margin:10
  },
});
