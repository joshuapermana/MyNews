/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  View,
  StatusBar,
  Alert,
  FlatList,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Image, Text } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
// Imports: Redux Actions
import { connect } from 'react-redux';
import { news } from '../redux/actions/newsAction';
const StatusBarq = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news_: [],
      isLoading: false,
    };

  }

  getAllNews = () => {
    console.log(global.url + 'news')
    fetch(global.url + 'news', {
      method: 'GET',
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(response => {
        // console.log(response.result)
        this.setState({ news_: response.result })
        console.log(this.state.news_.length)
      });
  }

  componentDidMount = () => {
    this.getAllNews();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <ScrollView style={styles.cont}>
        <StatusBarq backgroundColor="#191919" barStyle="light-content" />

        {/* <StatusBar barStyle="light-content" hidden={false} backgroundColor="#FFBE24" translucent={false} /> */}
        <View>
          <View style={{ height: 70, width: '100%', backgroundColor: '#191919', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#FCFAF7', fontSize: 20, fontFamily: 'Robotto' }}>MyNews</Text>
          </View>
          <View style={{ height: 190, width: '100%', backgroundColor: '#191919', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
            <FlatList
              data={this.state.news_}
              bounces={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View>
                  {
                    item.position == "headline" ?
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("Article",{item})}>
                        <ImageBackground source={{ uri: item.urlToImage }} imageStyle={{ borderRadius: 10, opacity: 0.8 }} style={{ height: 170, width: 170, marginRight: 15, }}>
                          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(80, 81, 82,0.5)', padding: 10, width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>

                      :
                      null
                  }
                </View>
              )} />
          </View>
          <View style={{ paddingLeft: 20, paddingTop: 20 }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Latest News</Text>
            </View>
            <FlatList
              data={this.state.news_}
              bounces={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%', marginTop: 10 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View>
                  {
                    item.position == undefined ?
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("Article",{item})}>
                        <View style={{ marginRight: 15, }}>
                          {/* <Image source={{ uri: item.urlToImage }} style={{ height: 170, width: 170, }}/>
                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(80, 81, 82,0.5)', padding: 10, width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                          <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                        </View> */}
                          <Image source={{ uri: item.urlToImage }} style={{ height: 100, width: 140, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                          <View style={{ width: 140, height: 100, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 12 }}>{item.title}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      :
                      null
                  }
                </View>
              )} />
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Wall Street Journal</Text>
            </View>
            <FlatList
              data={this.state.news_.reverse()}
              bounces={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%', marginTop: 10 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Article",{item})}>
                    <View style={{ marginRight: 15, }}>
                      <Image source={{ uri: item.urlToImage }} style={{ height: 100, width: 140, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                      <View style={{ width: 140, height: 100, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 12 }}>{item.title}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )} />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    // backgroundColor: 'white',
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
    color: '#a39e9e'
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
    marginLeft: 5
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    news: state.newsReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (request) => dispatch(login(request)),
    news: (request) => dispatch(news(request)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
