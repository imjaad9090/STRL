import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  StatusBar
} from 'react-native';

import MapView, { Polyline, ProviderPropType,Animated,Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 38.6681102;
const LONGITUDE = -90.4346458;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
import axios from 'react-native-axios';

class Draw extends React.Component {
constructor(props) {
  super(props);

    this.state = {
      scrollsw:true,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      mptype:'standard',
      polylines: [],
      editing: null,
      markers:[{
        latitude: 0, longitude:0, description:'This is my address'
     },
 ],
    };
  }


  static navigationOptions ={
      header:null
  }

  send(){
   
    axios.post('http://app.morelobby.com/api/search_data'+this.state.editing.coordinates)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('func')
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
      mptype:'satellite',
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
      <View
      style={styles.container}>
      
        <MapView
          provider={this.props.provider}
          style={styles.map}
          mapType={this.state.mptype}
          initialRegion={this.state.region}
          scrollEnabled={this.state.scrollsw}
          onPanDrag={e => this.onPanDrag(e)}
       >

        {this.state.markers.map((marker,i) => (
    <Marker
      key={i}
      coordinate={marker}
      //image={require('./images/mapin.png')}
      title={marker.description}
      street={marker.st}
    />
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
        <View style={styles.buttonContainer}>
        <TouchableOpacity
              onPress={() => this.setState({scrollsw:false})}
              style={[styles.bubble, styles.button]}
            >
              <Text>Draw</Text>
          </TouchableOpacity>  


              <TouchableOpacity
              onPress={() => this.setState({
                polylines:[],
              })}
              style={[styles.bubble, styles.button]}
            >
              <Text>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.send()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Send</Text>
            </TouchableOpacity>



          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

Draw.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default Draw;