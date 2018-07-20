//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,FlatList,Image,Button,TouchableOpacity,Alert,Dimensions,StatusBar,Platform,TouchableWithoutFeedback } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import {TextInputLayout} from 'rn-textinputlayout';
import  MapView,{ Polyline, ProviderPropType,PROVIDER_GOOGLE,Marker,Animated } from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import axios from 'react-native-axios';
import  Icon  from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { flipX, flipY } from 'react-navigation-transitions';
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.3000 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const DEFAULT_PADDING = { top: 120, right: 50, bottom: 120, left: 50 };
let id = 0;
CONLINK = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD_pXSfx5ZObHwSD5R_9LLjTXpXDDfWTTo&place_id='
// create a component
LINK2= 'https://app.morelobby.com/api/map_suggestion'
LINK3= 'https://app.morelobby.com/api/map_search'
class Search extends Component {

    static navigationOptions =({navigation,screenProps})=> {
        const params = navigation.state.params || {};

       return {
        headerRight:(
        <View style={{flex:1,flexDirection:'row'}}>

          <Text style={{fontSize:17,color:'white',paddingRight:15}} onPress={()=>navigation.navigate('list',{listdata:params.listingdata})}> List </Text>
        </View>),
        headerTitle:'Search',
        headerTintColor: 'white',
        //headerTransparent:true,
        headerStyle:{
            backgroundColor:'#5C6BC0',   
            
        },
        headerTitleStyle:{
            color:'white',
        },
        headerLeft:(<View style={{flex:1}}>                    
        <Text style={{fontSize:17,color:'white',paddingLeft:15}} onPress={()=>navigation.navigate('filters')}> Filters </Text>
        </View>)
    };
    };

    


    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);

        this.state={
          isLoading:true,
          maptype:'standard',
            scrollsw:true,
            polylines: [],
            editing: null,
            isVisible:false,
            markerprices:[],
            dataforall:'hello',
            available:false,
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

    handleChange(props) {
      this.setState({ region: props });
    }

    componentDidMount(){
      if(Platform.OS === 'android'){
      AndroidKeyboardAdjust.setAdjustNothing();
      }
    }



maptoggle(){
  if(this.state.maptype == 'standard'){
    this.setState({maptype:'satellite'})
  }
    else {
      this.setState({maptype:'standard'})
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
        if(response.data.data[i].latitude != 0.000000 && response.data.data[i].longitude != 0.000000){
        Mew.push({latitude: (parseFloat(response.data.data[i].latitude)),longitude: (parseFloat(response.data.data[i].longitude)), prices:(parseFloat(response.data.data[i].Original_Price))})
    }
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
      this.setState({isVisible:true})
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
      if (response.data.length == 0){
        Alert.alert('No Results Found','There are no homes for sale in this area.')
        this.setState({
          polylines:[]
        })
      }
      var Mew = []
      this.setState({dataforall:response.data.data})
  let listingdata = this.state.dataforall

  this.props.navigation.setParams({ 
    listingdata
  });
      for (let i = 0; i < response.data.data.length; i++) {
        if(response.data.data[i].latitude != 0.000000 && response.data.data[i].longitude != 0.000000)
        {
          Mew.push({latitude: (parseFloat(response.data.data[i].latitude)),longitude: (parseFloat(response.data.data[i].longitude)), prices: Number(response.data.data[i].Listing_Price)})
      }
    }
    this.setState({markers:Mew})
    this.fitAllMarkers(Mew)

    this.setState({isVisible:false})


    })
    .catch(function (error) {
      console.log(error);
      this.setState({isVisible:false})

    });
    this.setState({isVisible:false})
   
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
    let oldRegion={latitude: 31.552456,
      longitude: 74.332925,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA}
this.handleChange(oldRegion)
    this.setState({polylines:[],
      markers:[],})
      
        
    
  }



showPrice(props){
 var value = parseFloat(props)
 
 
  var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  
return (<Text>{num}</Text>)
}









render() {
        return (
            <View style={styles.container}>
                    <StatusBar
     backgroundColor="#4150a8"
     barStyle="light-content"
   />
                    {this.state.available ?(
                <Modal style={{backgroundColor:'white',borderRadius:5}} isVisible={this.state.isModalVisible}>
                <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>          
                <Image  source={{ uri:"https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?TableID=5&Type=1&Number=1&Size=5&Key=" + this.state.formodal.matrix_unique_id }} style={{width:'100%',height:200,}} />      
               
<View style={{flexDirection:'row'}}>
               <View>
               
                <View style={{marginVertical:6,flexDirection:'row'}}>
                <Icon name="compass" size={30} color="#000"/>
                </View>


                <View style={{marginVertical:6,flexDirection:'row'}}>
                <Icon name="bath" size={30} color="#000"/>
                </View>

                 <View style={{marginVertical:6,flexDirection:'row'}}>
                 <Icon name="bed" size={30} color="#000"/>
                </View>

                <View style={{marginVertical:6,flexDirection:'row'}}>
                <Icon name="dollar" size={30} color="#000"/>
                
                </View>

                      



                <View style={{marginVertical:6,flexDirection:'row',width:30,height:30}}>
                <Icon name="map" size={30} color="#000"/>
                </View>
                </View>


                <View>
                <View style={{marginVertical:6,flexDirection:'row',width:150,height:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{marginHorizontal:3}}>{this.state.formodal.Square_Footage} sq.ft</Text>
                </View>


                <View style={{marginVertical:6,flexDirection:'row',width:150,height:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{marginHorizontal:3}}>{Number(this.state.formodal.Bathrooms)}</Text>
                </View>

                 <View style={{marginVertical:6,flexDirection:'row',width:150,height:30,justifyContent:'center',alignItems:'center'}}>
                <Text style={{marginHorizontal:3}}>{Number(this.state.formodal.Bedrooms)}</Text>
                </View>

                <View style={{marginVertical:6,flexDirection:'row',width:150,height:30,flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                
                {this.showPrice(this.state.formodal.Original_Price)}
                </View>

                    

                <View style={{marginVertical:6,flexDirection:'row',width:150,height:30,justifyContent:'center'}}>
                <Text style={{marginHorizontal:3,flexWrap:'wrap',flex:1}}>{this.state.formodal.Street_Name}, {this.state.formodal.MunicipalityTownship}.</Text>
                </View>


                  </View>      










                </View>


                 </View>
          <View style={{justifyContent:"space-around",flexDirection:'row'}}>
          <Button title="Cancel" color="#c39" onPress={()=>this._toggleModal()} />
          <Button title="Details" color="#17B978" onPress={()=>console.log('Pressed')} />

          </View>

          </Modal>) : null}

                    {/*<TextInput
                        style={styles.textInput}
                        value = {this.state.input}
                        onChangeText={(text) => this.search(text)} 
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Search city or zip"
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor="gray"
                    />*/}

                    
        {/*<Text style={{color:'black',alignSelf:'center',top:20}} onPress={()=>this.openSearchModal()}>Select city</Text>*/}
            <View style={{width:'100%',height:'100%',bottom:0,backgroundColor:'#dd2200',position:'absolute'}}>
            
            
            
            
            
            
            <MapView
          ref={ref => { this.map = ref; }}
          provider={this.props.provider}

          loadingEnabled
          style={styles.map}
          mapType={this.state.maptype}
          initialRegion={this.state.region}
          scrollEnabled={this.state.scrollsw}
          onPanDrag={e => this.onPanDrag(e)}

          //onRegionChange={this.onRegionChange}
            onRegionChangeComplete={this.onRegionChangeComplete}
          
          
        
        
       >

       {this.state.markers.map((marker,i) => (
   <View>
     {this.state.isLoading ? 
    (
   <MapView.Marker
      key={i}
      coordinate={marker}
      
      onPress={()=>this.handleMarkerPress(this.state.markers[i].latitude)} 
      //image={require('../images/placeholder.png')}
      //title={marker.description}
    >
    <Image source={require('../images/placeholder.png')} style={{width:30,height:30}} />
   {/*<View style={{backgroundColor:'white'}}>
    <Text>${marker.prices}</Text>
       </View>*/}
    </MapView.Marker>) 
     : null }
    </View>
  ))}




  {this.state.polylines.map(polyline => (
            <Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor="#bb0000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
              lineJoin="bevel"
              lineCap="butt"
            />
          ))}


          {this.state.editing &&
            <Polyline
              key="editingPolyline"
              coordinates={this.state.editing.coordinates}
              strokeColor="#bb0000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
              lineJoin="round"
            />
          }

  </MapView>

 <TextInput
                        style={styles.textInput}
                        //value = {this.state.input}
                        onChangeText={(text) => this.search(text)} 
                        autoCorrect={false}
                        tintColor="#2c3e50"
                        placeholder="Search places"
                        underlineColorAndroid='transparent'
                    />



  <View style={{padding:2}}>
    <FlatList        
    style={{borderRadius:2,backgroundColor:'transparent',marginHorizontal:5}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    //horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.store}
    renderItem={({item}) => (
        <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={()=>this.select(item.name)} style={{backgroundColor:'white',height:30,paddingHorizontal:6,justifyContent:"center"}}>
    <Text style={{color:'black',fontWeight:'300',fontSize:14}}>{item.name}</Text>
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
          activeOpacity={0.7}
          onPress={() => this.setState({scrollsw:false})}
              style={[styles.bubble, styles.button]}
            >

        <Image source={require('../images/draw.png')} style={{width:30,height:30,resizeMode:'cover'}} />
  {/*<Text style={{alignSelf:'center',fontSize:10}}>Draw</Text>*/}
          </TouchableOpacity>

           <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.maptoggle()}
              style={[styles.bubble, styles.button]}
            >

        <Image source={require('../images/earth.png')} style={{width:30,height:30,resizeMode:'cover'}} />
  {/*<Text style={{alignSelf:'center',fontSize:10}}>Sattelite </Text>*/}

          </TouchableOpacity>




          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text style={{fontSize:10}}>Finish</Text>
            </TouchableOpacity>
          )}




          <TouchableOpacity
          activeOpacity={1.0}
          onPress={() => this.cancel()}
        style={[styles.bubble, styles.button]}>

<Text style={{fontSize:18,alignSelf:'center'}}>X</Text>
          </TouchableOpacity>


          <TouchableOpacity
          activeOpacity={1.0}
          onPress={() => this.props.navigation.navigate('openhouse')}
        style={[styles.bubble, styles.button]}>

        <Image source={require('../images/house.png')} style={{width:30,height:30,resizeMode:'cover'}} />
          </TouchableOpacity>

          
            </View>


            </View>
        );
    }
}
Search.propTypes = {
    provider: ProviderPropType,
  };
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f1e3',
    },
    textInput: {
        fontSize: 14,
        borderRadius:2,
        backgroundColor: '#fff',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:9,
        height:43,

        borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
        
        
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
        flexDirection:'column',
        borderWidth:1,
        borderColor:'#5C6BC0',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 7,
        marginVertical:2,
        width:50,
        height:50,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',  
      },
      button: {
        
        paddingHorizontal: 12,
        marginHorizontal:5,
        alignItems: 'center',
        justifyContent:'center',
        bottom:5
        
      },
      buttonContainer: {
        flexDirection: 'column',
        left:0,
        bottom:5,
        position:'absolute',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor: 'transparent',
      },
});

//make this component available to the app
export default Search;
