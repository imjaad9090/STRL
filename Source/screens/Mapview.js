import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,FlatList,Image,Button,TouchableOpacity,Alert,Dimensions,StatusBar,Platform,TouchableWithoutFeedback } from 'react-native';
import  MapView,{ Polyline, ProviderPropType,PROVIDER_GOOGLE,Marker,Animated} from 'react-native-maps';
import Spinner from 'react-native-spinkit';

import axios from 'react-native-axios';
import  Icon  from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.3000 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const DEFAULT_PADDING = { top: 90, right: 50, bottom: 90, left: 50 };
// create a component
class Mapview extends Component {

    static navigationOptions ={
        headerTitle:'Results',
        headerTintColor: 'white',
        //headerTransparent:true,
        headerStyle:{
            backgroundColor:'#5C6BC0',   
            
        },
        headerTitleStyle:{
            color:'white',
        },
    }


    constructor(props){
        super(props)
        this.state={
            isVisible:false,
            region:{
                latitude: 38.6530169,
                 longitude: -90.3835487,
                latitudeDelta: LATITUDE_DELTA,
                 longitudeDelta: LONGITUDE_DELTA,
            },
            markers:[]
                  
            }
    }


    componentDidMount()
    {
        const{params} = this.props.navigation.state;

        this.setState({isVisible:true})
         console.log(params.listdata)
        var mr =[]

        for(let i=0;i<params.listdata.length;i++){
            if(params.listdata[i].latitude != 0.000000 && params.listdata[i].latitude != 0.000000){

            mr.push({latitude:parseFloat(params.listdata[i].latitude),longitude:parseFloat(params.listdata[i].longitude),prices:Number(params.listdata[i].Listing_Price)})
        }
    }
        console.log(mr)
        this.setState({markers:mr}) 

        this.fitAllMarkers(mr)
        this.setState({isVisible:false})

          

    }

    fitAllMarkers(props) {
        console.log(props)
        this.map.fitToCoordinates(props, {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        });
        console.log('fitted')
      }

    render() {
        return (
            <View style={styles.container}>


            {this.state.isVisible ? (
                <View style={{alignSelf:'center',marginHorizontal:10}}>
                <Spinner  size={50} type={'Pulse'} color="#283593"/>
                </View>
               
            ) : <MapView 
            ref={ref => { this.map = ref; }}
            initialRegion={this.state.region}
            style={styles.map}
            loadingEnabled
            >
            {this.state.markers.map((marker,i) => (
    <MapView.Marker
      key={i}
      coordinate={marker}
      
      //onPress={()=>this.handleMarkerPress(this.state.markers[i].latitude)} 
      //image={require('../images/placeholder.png')}
      //title={marker.description}
    >
    <Image source={require('../images/placeholder.png')} style={{width:30,height:30}} />
   <View style={{backgroundColor:'white'}}>
    <Text>${marker.prices}</Text>
    </View>
    </MapView.Marker>
  ))}
  </MapView>
            }  
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'white',
    },
    map:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute'
    },
});

//make this component available to the app
export default Mapview;
