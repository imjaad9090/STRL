//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,WebView } from 'react-native';

// create a component
class Terms extends Component {

    static navigationOptions ={
        header:null
    }

    render() {
        return (
<WebView
        source={{uri: 'https://www.stlouisrealestatesearch.com/rg-terms/'}}
      />            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});

//make this component available to the app
export default Terms;
