//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,FlatList,TouchableOpacity,Alert } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import {TextInputLayout} from 'rn-textinputlayout';
import MapView, { Polyline, ProviderPropType,PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'react-native-axios';
CONLINK = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD_pXSfx5ZObHwSD5R_9LLjTXpXDDfWTTo&place_id='
// create a component
class Social extends Component {

    static navigationOptions = {
        header :null
    }

    constructor(){
        super()
        this.state={
            input:'',
            region:{
                latitude: 31.676174,
      longitude: 74.290924,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
            }
        }
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place);
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
      }


      search(props){
        RNGooglePlaces.getAutocompletePredictions(JSON.stringify(props))
          .then((place) => {
this.setState({store:place})
          })
          .catch(error => console.log(error.message));
      }

new(){
    console.log('pressed')
    this.setState({
        region:{
      latitude: 31.645851,
      longitude: 74.086268,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
        }
    })
    
    console.log(this.state)
}


onRegionChange=(region)=> {
  this.setState({ region });
}



showLats(props){
    axios.get(CONLINK+props)
  .then( (response) =>{
      console.log(response)
    Alert.alert('Coordinates',JSON.stringify(response.data.results[0].geometry.location))
  })
  .catch((error) =>{
    console.log(error);
  });
}

    render() {
        return (
            <View style={styles.container}>
                
                <View>
                <TextInputLayout
                    style={styles.inputLayout}
                    focusColor="#2c3e50"
                    labelText='Search city or address'
                >
                    <TextInput
                        style={styles.textInput}
                        value = {this.state.input}
                        onChangeText={(text) => this.search(text)} 
                        placeholder={'Email'}
                        autoCorrect={false}
                        tintColor="#2c3e50"
                    />
                </TextInputLayout>
                <Text style={{color:'black',alignSelf:'center',top:20}} onPress={()=>this.openSearchModal()}>Select city</Text>

                </View>

    


<View style={{top:30,left:6}}>
            <FlatList
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    //horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.store}
    renderItem={({item}) => (
    <TouchableOpacity onPress={()=>this.showLats(item.placeID)} style={{marginVertical:5}}>
    <Text style={{color:'black',fontWeight:"bold",}}>{item.primaryText}</Text>
    <Text style={{color:'black'}}>{item.secondaryText}</Text>
    </TouchableOpacity>
    )}/>
</View>





            





            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f1e3',
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color:'#2c3e50'
    },
    inputLayout: {
        marginTop: 40,
        marginHorizontal: 36
    },
    map:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute'
    }
});

//make this component available to the app
export default Social;
