//import liraries
import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View, Text, StyleSheet,Dimensions,TouchableOpacity,Animated,FlatList,ScrollView,Button, Image} from 'react-native';
import  MapView,{ Polyline, ProviderPropType,PROVIDER_GOOGLE,Marker, Circle} from 'react-native-maps';
const {width,height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDEDELTA = 0.19;
const LONGITUDEDELTA = LATITUDEDELTA*ASPECT_RATIO;
import axios from "react-native-axios";
import SlidingUpPanel from 'rn-sliding-up-panel';
import uber from '../uber.json';

// create a component
class Openhouse extends Component {


    static navigationOptions ={
        headerTitle:'Open House Search',
        headerStyle:{
          backgroundColor:'#5C6BC0',
        },
        headerTintColor:'white',
        headerTitleStyle:{
          color:'white',
        
        }
    }

    constructor(props){
        super(props)
        this.state = {
            store:[],
            visible: false,
            region:{
            latitude: null,
            longitude: null,
            latitudeDelta:LATITUDEDELTA,
            longitudeDelta:LONGITUDEDELTA
            
            },
            markers:[{
                latitude: 0, longitude:0, description:'This is my address'
             }]
          };
    }

     componentDidMount(){
         navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
              this.setState({
                  region:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta:LATITUDEDELTA,
            longitudeDelta:LONGITUDEDELTA
                  }
              });




              axios.post('https://app.morelobby.com/api/open_house_nearby',{
                circle_radius:5,
                circle_center:JSON.stringify([position.coords.latitude,position.coords.longitude])
              }).then(response => {
                  console.log(response)
                  this.setState({store:response.data.data})
                var Mew =[]
                for(let i = 0;i< response.data.data.length;i++){
                    Mew.push({latitude:response.data.data[i].latitude,longitude:response.data.data[i].longitude,description: response.data.data.Listing_Price})
                }
                this.setState({markers:Mew})
              }).catch(error => {
                console.log(error)
              })
      },
       
            
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );

         
        
    
}
detail(props){
    this.props.navigation.navigate('details',{mlnumber:props})
    this.setState({visible:false})

}

    render() {
        return (
            <View style={styles.container}>
            {this.state.region.latitude ? 
            
        
        <MapView 
        provider="google"
        region={this.state.region}
        //customMapStyle={uber}

        style={styles.map}
        showsUserLocation
        
        >
        

        <Circle center={{latitude:this.state.region.latitude,longitude:this.state.region.longitude}}
            radius={5000}
            fillColor="rgba(108,92,231,0.3)"
            strokeColor='transparent'
                />

        {this.state.markers.map((marker,i) => (
    <MapView.Marker
      key={i}
      coordinate={marker}
      //onPress={()=>this.handleMarkerPress(this.state.markers[i].latitude)} 
      //image={require('../images/placeholder.png')}
      title={marker.description}
    />
    
  ))}
        <View style={{alignItems:'center',padding:3,justifyContent:'center',borderRadius:4,backgroundColor:'white'}}>
        <Text   style={{alignSelf:'center',fontWeight:'600',fontSize:16,color:'blue'}} onPress={()=> this.setState({visible:true})}>LIST OPEN HOUSES</Text>
        </View>
        
        </MapView>
        
        : null}
     <Modal style={{backgroundColor:'white'}} isVisible={this.state.visible}>
<View style={{backgroundColor:'white'}}>

          <FlatList        
    style={{width:'100%',height:'80%'}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    //horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.store}
    renderItem={({item}) => (
        <TouchableOpacity activeOpacity={0.8} style={{width:'100%',marginHorizontal:4,marginBottom:2}} onPress={()=>this.detail(item.ML_Number)}>
        <View style={{width:'100%',height:200}}>
        <Image style={{width:'100%',height:'100%'}} source={{uri:'https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?Key='+ item.matrix_unique_id +'&TableID=5&Type=1&Number=4&Size=5'}} />
        </View>
        <Text style={{fontWeight:'800',fontSize:20,color:'green'}}>$ {Number(item.Original_Price)}</Text>
  <Text style={{fontWeight:'700'}}>Open House Upcoming</Text>
  <Text style={{marginBottom: 10}}>
    {item.OpenHouseUpcoming}
  </Text>   


        </TouchableOpacity>


     

)}

    />                      <Button title='Close' style={{backgroundColor:'purple'}} onPress={() => this.setState({visible: false})} />

    </View>
        </Modal>


            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#fff',
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
export default Openhouse;
