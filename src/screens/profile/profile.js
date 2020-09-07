import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconi from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { news } from "../../redux/actions/newsAction"

const StatusBarq = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props.nn)
  }

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>

        <StatusBarq backgroundColor="#191919" barStyle="light-content" />
        <ScrollView>
          <View style={{ width: '100%', height: 120, backgroundColor: '#191919', }}>
            <View style={{ marginLeft: 'auto', paddingRight: 20, paddingTop: 20 }}>
              <TouchableOpacity onPress={() => this.props.logout()}>
              <Iconi name="window-close" style={{ fontSize: 25, color: 'white' }} />

              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -70, zIndex: 100 }}>
            <Image source={require('../../assets/jo.png')} style={{ height: 100, width: 100, borderRadius: 100, zIndex: 100 }} />
          </View>
          <View style={{ paddingTop: 75, paddingRight: 20, paddingLeft: 20, marginTop: -70, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white', }}>
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Joshua Permana</Text>
              <Text style={{ fontWeight: '500', fontSize: 10 }}>{this.props.auth.email}</Text>

            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, width: '33.3%' }}>
                  <Text style={{ fontWeight: 'bold' }}>{this.props.nn.news.length}</Text>
                  <Text>News Saved</Text>
                </View>
              </View>
            </View>
            <FlatList
              data={this.props.nn.news}
              bounces={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate("Article",{item:item.news})}>
                    <View style={{ flexDirection: 'row', height: 150, width: '100%', backgroundColor: 'white', marginTop: 20 }}>
                      <Image source={{ uri: item.news.urlToImage }} style={{ height: 150, width: 100, borderRadius: 5 }} />
                      <View style={{ paddingLeft: 10, width: '70%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.news.title}</Text>
                        <Text style={{ fontWeight: '400', fontSize: 12 }}>by {item.news.author}</Text>
                        <View style={{ marginTop: 10 }}>
                          <Text>{item.news.description.slice(0, 100)}....</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
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
    nn: state.newsReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    logout: (request) => dispatch(logout(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(profile);
