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
    ImageBackground,
    Linking,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Image, Text } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import moment from 'moment';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { news } from '../../redux/actions/newsAction';
const StatusBarq = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


export class article extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        console.log(this.props.nn.news[1])
    }
    save() {
        this.props.news({
            news: this.props.route.params.item
        })
        ToastAndroid.show("SAVED !", ToastAndroid.SHORT)
    }
    render() {
        const { isLoading } = this.state;
        return (
            <ScrollView style={styles.cont}>
                <StatusBarq backgroundColor="#191919" barStyle="light-content" />
                <View style={{ height: 250, width: '100%', backgroundColor: '#191919' }}>
                    <ImageBackground style={{ height: 250, width: '100%' }} source={{ uri: this.props.route.params.item.urlToImage }}>
                        <View style={{ bottom: 10, left: 10, right: 10, position: 'absolute', backgroundColor: 'rgba(80, 81, 82,0.9)', padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{this.props.route.params.item.description}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.route.params.item.title}</Text>
                    <Text style={{ color: 'grey', fontSize: 10, marginTop: 10 }}>{moment(this.props.route.params.item.publishedAt).format("dddd, DD MMM YYYY")}, {this.props.route.params.item.author}</Text>
                    <Text style={{ marginTop: 20, textAlign: 'justify' }}>{this.props.route.params.item.content.slice(0, this.props.route.params.item.content.length - 13)}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(this.props.route.params.item.url)} style={{ padding: 10, backgroundColor: '#191919', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Read More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.save()}
                        style={{ padding: 10, backgroundColor: '#5e92f3', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Add to favorite</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
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
        nn: state.newsReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (request) => dispatch(login(request)),
        news: (request) => dispatch(news(request)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(article);
