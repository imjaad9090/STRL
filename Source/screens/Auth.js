//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

// create a component
class Auth extends Component {

    static navigationOptions = {
        header:null,
    }



    render() {
        return (
            <View style={styles.container}>
            <Button title="Sign in with Google" color="#bb0000" onPress={()=> alert('as')} />
            <Button title="Sign in with Facebook" color="#33a" onPress={()=> alert('as')} />


            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ca',
    },
});

//make this component available to the app
export default Auth;
