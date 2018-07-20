//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StreetView from 'react-native-streetview';

// create a component
class Streetview extends Component {

    static navigationOptions ={
        header:null
    }


    render() {
        return (
            <View style={styles.container}>
  <StreetView
    style={styles.streetView}
    allGesturesEnabled={true}
    coordinate={{
      'latitude': 45.5027718,
      'longitude': -73.5728387
    }}
  />
</View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    streetView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
});

//make this component available to the app
export default Streetview;
