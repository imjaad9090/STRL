//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,FlatList,Image,Button,TouchableOpacity,Alert,Dimensions,StatusBar,Platform,TouchableWithoutFeedback } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import {TextInputLayout} from 'rn-textinputlayout';
import MapView, { Polyline, ProviderPropType,PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import axios from 'react-native-axios';
import  Icon  from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import { flipX, flipY } from 'react-navigation-transitions';
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.3000 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const DEFAULT_PADDING = { top: 90, right: 50, bottom: 90, left: 50 };

CONLINK = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD_pXSfx5ZObHwSD5R_9LLjTXpXDDfWTTo&place_id='
// create a component
LINK2= 'https://app.morelobby.com/api/map_suggestion'
LINK3= 'https://app.morelobby.com/api/map_search'
class Search extends Component {

    static navigationOptions =({navigation,screenProps})=> {
        const params = navigation.state.params || {};

       return {
        headerRight:(<Text style={{fontSize:17,color:'white',paddingRight:15}} onPress={()=>navigation.navigate('list',{listdata:params.listingdata})}> List </Text>),
        headerTitle:'Search',
        headerTintColor: 'white',
        //headerTransparent:true,
        headerStyle:{
            backgroundColor:'#5C6BC0',   
            
        },
        headerTitleStyle:{
            color:'white'
        },
        headerLeft:(<View style={{flex:1}}><Text style={{color:'transparent'}}>Bazinga</Text></View>)
    };
    };

    


    constructor(){
        super()
        this.state={
            scrollsw:true,
            polylines: [],
            editing: null,
            isVisible:false,
            markerprices:[],
            dataforall:'hello',
            available:false,
            input:null,
            isModalVisible: false,
            region:{
                latitude: 38.6530169,
      longitude: -90.3835487,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
            },
            markers:[{
                latitude: 0, longitude:0, description:'This is my address'
             }]
        }
    }
    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
    
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

       
console.log(props.length)
        
  if(props.length >= 3 ){      
axios.post(LINK2,{
            q:props
        })

  .then( (response) =>{
     
      console.log(response)
      this.setState({type:response.data.data[0].type})
      this.setState({store:response.data.data[0].data})
  })
  .catch((error) =>{
    console.log(error);
  });
  }
  else {
      this.setState({store:[],})
  }

      }

new(){
    console.log('pressed')
    this.setState({
        region:{
      latitude: 31.504985,
      longitude: 74.368002,
      latitudeDelta: 0.0900,
      longitudeDelta: 0.0900,
        }
    })
    
    console.log(this.state)
}


onRegionChange=(region)=> {
  this.setState({ region:region });
}


select(props){
    this.setState({isVisible:true})
    this.setState({store:[],input:props})
    console.log(this.state.type + props)
    axios.post(LINK3,{
        type:this.state.type,
        value:props
    })

.then( (response) =>{
 
  console.log(response)
  this.setState({dataforall:response.data.data})
  let listingdata = this.state.dataforall

  this.props.navigation.setParams({ 
    listingdata
  });
  var Mew = []
      for (let i = 0; i < response.data.data.length; i++) {
        Mew.push({latitude: (parseFloat(response.data.data[i].latitude)),longitude: (parseFloat(response.data.data[i].longitude)), prices:(parseFloat(response.data.data[i].Original_Price))})
    }

    


    //this.setState({markerprices : JSON.stringify(prices)})
    this.setState({markers : Mew})
    this.fitAllMarkers(Mew)

    this.setState({isVisible:false})
//this.new()    
    
    })
.catch((error) =>{
console.log(error);
}); 
}





handleMarkerPress(props) {
  console.log(props)
  let array = this.state.markers

  var objIndex = array.findIndex((obj => obj.latitude === props));
console.log(objIndex)
var asset=this.state.dataforall[objIndex]
this.setState({formodal:asset})
this.setState({
    available:true
}) 
this._toggleModal()

}
    fitAllMarkers(props) {
    console.log(props)
    this.map.fitToCoordinates(props, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
    console.log('fitted')
  }

  onRegionChange = (region) => {
    this.setState({ region:region });
  }
  onRegionChangeComplete =(region) => {
   if( Platform.OS === 'ios'){
        console.log('sneaky')

   }
   else if (Platform.OS === 'android'){
        this.setState({region})
   }
  }


  finish() {
    const { polylines, editing } = this.state;
    this.setState({
      polylines: [...polylines, editing],
      editing: null,
      scrollsw:true
    });
    console.log(this.state.editing.coordinates)
    axios.post('https://app.morelobby.com/api/search_data',{
      coordinates:JSON.stringify(this.state.editing.coordinates)
    })
    .then( response=> {
      console.log(response);
      var Mew = []

      for (let i = 0; i < response.data.data.length; i++) {
        
        Mew.push({latitude: (parseFloat(response.data.data[i].latitude)),longitude: (parseFloat(response.data.data[i].longitude)), description:'$ '+response.data.data[0].Selling_Price, st:response.data.data[0].Street_Name})
        
    }
    this.setState({markers:Mew})

    })
    .catch(function (error) {
      console.log(error);
    });

   
  }

  sko(){
    console.log('koioi')
  }

  onPanDrag(e) {
    
    if(this.state.scrollsw == false)
    {
    const { editing } = this.state;
    if (!editing) {

      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
        },
      });
      this.sko()

    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    }
    console.log('finished')
  }
  
  else {
    console.log('sup miamiii')
  }
      
  }




  cancel(){
    this.setState({
      polylines:[],
      markers:[{
        latitude: 0, longitude:0, description:'This is my address'
     }
 ],      region: {
        latitude: 31.552456,
        longitude: 74.332925,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    })
  }













render() {
        return (
            <View style={styles.container}>
                    <StatusBar
     backgroundColor="#4150a8"
     barStyle="light-content"
   />
                    {this.state.available ?(
                    <Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.isModalVisible}>
                <View style={{flex:1,padding:3}}>          
                <Image  source={{ uri:"https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?TableID=5&Type=1&Number=1&Size=5&Key=" + this.state.formodal.matrix_unique_id }} style={{width:'100%',height:200,}} />      
                <View style={{marginVertical:6}}>
                <Text style={{fontSize:20,fontWeight:"600",color:'#222f3e'}}>Area</Text>
                <Text>{this.state.formodal.Square_Footage} sq.ft</Text>
                </View>


                <View style={{marginVertical:6}}>
                <Text style={{fontSize:20,fontWeight:"600",color:'#222f3e'}}>Bathrooms</Text>
                <Text>{Number(this.state.formodal.Bathrooms)}</Text>
                </View>

                 <View style={{marginVertical:6}}>
                <Text style={{fontSize:20,fontWeight:"600",color:'#222f3e'}}>Bedrooms</Text>
                <Text>{Number(this.state.formodal.Bedrooms)}</Text>
                </View>

                <View style={{marginVertical:6}}>
                <Text style={{fontSize:20,fontWeight:"600",color:'#222f3e'}}>Original Price</Text>
                <Text>$ {this.state.formodal.Original_Price}</Text>
                </View>

                <View style={{marginVertical:6}}>
                <Text style={{fontSize:20,fontWeight:"600",color:'#222f3e'}}>Address</Text>
                <Text>{this.state.formodal.Street_Name}, {this.state.formodal.MunicipalityTownship}.</Text>
                </View>



                 </View>
          <View style={{justifyContent:"space-around",flexDirection:'row'}}>
          <Button title="Cancel" color="#c39" onPress={()=>this._toggleModal()} />
          <Button title="Deatails" color="#17B978" onPress={()=>this.submit()} />

          </View>

          </Modal>) : null}

                    <TextInput
                        style={styles.textInput}
                        value = {this.state.input}
                        onChangeText={(text) => this.search(text)} 
                        autoCorrect={false}
                        placeholder="Search places"
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor="gray"
                    />

                    
        {/*<Text style={{color:'black',alignSelf:'center',top:20}} onPress={()=>this.openSearchModal()}>Select city</Text>*/}
            <View style={{width:'100%',height:'100%',bottom:0,backgroundColor:'#dd2200',position:'absolute'}}>
            
            
            
            
            
            
            <MapView
          ref={ref => { this.map = ref; }}
          provider={this.props.provider}
          loadingEnabled
          style={styles.map}
          region={this.state.region}
          scrollEnabled={this.state.scrollsw}
          onPanDrag={e => this.onPanDrag(e)}

          //onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
          
          
        
        
       >

       {this.state.markers.map((marker,i) => (
    <MapView.Marker
      key={i}
      coordinate={marker}
      onPress={()=>this.handleMarkerPress(this.state.markers[i].latitude)} 
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

 <TextInput
                        style={styles.textInput}
                        value = {this.state.input}
                        onChangeText={(text) => this.search(text)} 
                        autoCorrect={false}
                        tintColor="#2c3e50"
                        placeholder="Search places"
                        underlineColorAndroid='transparent'
                    />



  <View style={{padding:2}}>
    <FlatList        
    style={{borderRadius:2,backgroundColor:'transparent'}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    //horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.store}
    renderItem={({item}) => (
        <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={()=>this.select(item.name)} style={{backgroundColor:'#2c3e50',height:30,paddingHorizontal:3,justifyContent:"center"}}>
    <Text style={{color:'white',fontWeight:'300',fontSize:16}}>{item.name}</Text>
    </TouchableOpacity>
    </View>
    )}/>
</View>
<View style={{alignSelf:'center',marginHorizontal:10}}>
 <Spinner  isVisible={this.state.isVisible} size={50} type={'Pulse'} color="#283593"/>
 </View>



</View>


<View style={styles.buttonContainer}>
        
         
          



          <TouchableOpacity
          activeOpacity={1.0}
              onPress={() => alert('er')}
              style={[styles.bubble, styles.button]}
            >

        <Image source={require('../images/draw.png')} style={{width:40,height:40,resizeMode:'cover'}} />

          </TouchableOpacity>

          
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
        fontSize: 15,
        borderRadius:2,
        backgroundColor: '#fff',
        marginTop:5,
        marginLeft:5,
        marginRight:5,

        padding:2,
        height:43,
        marginHorizontal:2,
        
        paddingHorizontal:7,
        
        borderWidth:2
    },
    inputLayout: {
        marginTop: 20,
        marginHorizontal: 36
    },
    map:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute'
    },
    bubble: {
        flexDirection:'row',

        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 20,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',
      },
      button: {
        
        paddingHorizontal: 12,
        marginHorizontal:5,
        alignItems: 'center',
        bottom:5
        
      },
      buttonContainer: {
        flexDirection: 'row',
        bottom:5,
        position:'absolute',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor: 'transparent',
      },
});

//make this component available to the app
export default Search;
