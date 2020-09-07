'use strict';
import React, { Component } from 'react';
import { AppRegistry, SafeAreaView, PermissionsAndroid, ActivityIndicator, Picker, TouchableNativeFeedback, Dimensions, Linking, KeyboardAvoidingView, Alert, RefreshControl, TouchableHighlight, BackHandler, Text, FlatList, ImageBackground, View, StatusBar, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlightBase, TouchableOpacityBase, } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
const StatusBarq = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export class listTrans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news_: [],
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    this.getAllNews()
  }
  getAllNews = () => {
    console.log(global.url + 'news')
    fetch(global.url + 'news', {
      method: 'GET',
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ news_: response.result })
        this.arrayholder = response.result
      });
  }
  searchFilterFunction = text => {
    // console.log(this.produ);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      news_: newData
    });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.viewStyles}>
        <StatusBarq backgroundColor="#191919" barStyle="light-content" />
        <View style={{ padding: 10 }}>
          <TextInput
            placeholder="Type Here"
            onChangeText={text => this.searchFilterFunction(text)}
            style={{ backgroundColor: 'rgba(196, 196, 196, 0.19)', fontSize: 12 }}
            autoCorrect={false}
          />
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>

          <FlatList
            data={this.state.news_}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{marginTop:10}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Article", { item })}>
                  <ImageBackground source={{ uri: item.urlToImage }} imageStyle={{ borderRadius: 10, opacity: 0.8 }} style={{ height: 170, width: '100%', marginRight: 15, }}>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(80, 81, 82,0.5)', padding: 10, width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )} />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  cont: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    // padding:20
  },
  container: {
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  svg: {
    width: 250,
    height: 200,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313335',
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
  textNama: {
    color: 'white',
    marginTop: 20
  },
  textNamaBawah: {
    color: 'white',
    marginTop: 5
  },
  textAtas: {
    fontSize: 12,
    color: '#a39e9e',
    marginLeft: 10
  },
  textBawah: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
    marginTop: 5
  },
  textClient: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 10
  },
  textOrderAction: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
}


const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (request) => dispatch(login(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(listTrans);