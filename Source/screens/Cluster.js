import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'react-native-axios'
const multidata = [
  {  
    name: "Fruits",
    id: 0,
    children: [{
        name: "Apple",
        id: 10,
      },{
        name: "Strawberry",
        id: 17,
      },{
        name: "Pineapple",
        id: 13,
      },{
        name: "Banana",
        id: 14,
      },{
        name: "Watermelon",
        id: 15,
      },{
        name: "Kiwi fruit",
        id: 16,
      }]
  },
  {
    name: "Gems",
    id: 1,
    children: [{
        name: "Quartz",
        id: 20,
      },{
        name: "Zircon",
        id: 21,
      },{
        name: "Sapphire",
        id: 22,
      },{
        name: "Topaz",
        id: 23,
      }]
  },
  {
    name: "Plants",
    id: 2,
    children: [{
        name: "Mother In Law\'s Tongue",
        id: 30,
      },{
        name: "Yucca",
        id: 31,
      },{
        name: "Monsteria",
        id: 32,
      },{
        name: "Palm",
        id: 33,
      }]
  },
]


const italyCenterLatitude = 41.8962667,
      italyCenterLongitude = 11.3340056,
      radius = 600000
export default class Cluster extends Component {

  constructor(props) {
    super(props)

    this.state = {
      index:'',value:'',

      pins: [],counties:[],listdata:[],selectedItems: [],

    }
  
  }

  componentDidMount() {
    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      //console.log(response.data.data)
      this.setState({counties:response.data.data.county})
      console.log(this.state.counties[1].County)
      var cnt = [ ];

      for(let i=0;i < this.state.counties.length; i++){

        cnt.push({id:i,name:this.state.counties[i].County})
        
      }
      console.log(cnt)
      this.setState({listdata:cnt})
      let twt=[]
      
    }).catch(function(error) {
      console.log(error)
    });
  }

  onSelect(index, value){
    this.setState({
        index: index,
        value: value
    })
}        
  add(props){
  }

  onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems)
    this.state.pins.push(selectedItems)
  }

  render() {
    items = [{
      id: '92iijs7yta',
      name: 'Ondo',
    }, {
      id: 'a0s0a8ssbsd',
      name: 'Ogun',
    }, {
      id: '16hbajsabsd',
      name: 'Calabar',
    }, {
      id: 'nahs75a5sg',
      name: 'Lagos',
    }, {
      id: '667atsas',
      name: 'Maiduguri',
    }, {
      id: 'hsyasajs',
      name: 'Anambra',
    }, {
      id: 'djsjudksjd',
      name: 'Benue',
    }, {
      id: 'sdhyaysdj',
      name: 'Kaduna',
    }, {
      id: 'suudydjsjd',
      name: 'Abuja',
    }];
    
    
    return (
      <View style={styles.container} style={{flex: 1}}>

<View style={{marginVertical:3}}>
        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}>
        <RadioButton value={'Sale'} >
          <Text style={{fontWeight:'700',fontSize:16}}>Homes for Sale</Text>
        </RadioButton>

        <RadioButton value={'Lease'} >
          <Text style={{fontWeight:'700',fontSize:16}}>Homes for Lease</Text>
        </RadioButton>

        </RadioGroup>
        </View>
        <Text>  {this.state.value}</Text>


<Text style={{color:'white',borderColor:'green',borderWidth:3,top:34}} onPress={() => this.SectionedMultiSelect._toggleSelector()}
>Open Selector</Text>
<View style={{top:33}}>
<Button title="show" onPress={()=>console.log(this.state)} />
</View>    
        <View>
        <SectionedMultiSelect
          ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
          items={multidata}
          numberOfLines={1} 
          uniqueKey='name'
          subKey='children'

          hideSelect={true}
          showChips={true}
          selectText='Choose some things...'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />
      </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#dff',
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
  controlBar: {
    top: 24,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between', 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  novaLabLogo: {
    right: 8,
    bottom: 8,
    width: 64,
    height: 64,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65b',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 14,
    color: '#65bc46',
    fontWeight: '400'
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: '#65bc46',
    backgroundColor: 'white', 
  },
})