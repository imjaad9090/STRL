//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,AsyncStorage } from 'react-native';

// create a component
class Authloading extends Component {

    static navigationOptions ={
        header:null
    }
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }


      // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };









    render() {
        return (
            <View style={styles.container}>
            <Image source={require('../images/cityscape.png')} style={{width:120,height:120}}/>

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
        backgroundColor: '#fff',
    },
    title:{
        marginVertical:8,
        fontSize: 28,
    fontWeight: '300',
    lineHeight: 34,
    letterSpacing: 0.364
    }
});

//make this component available to the app
export default Authloading;
