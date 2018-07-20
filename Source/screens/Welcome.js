//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,AsyncStorage } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { systemWeights } from 'react-native-typography'
import axios from 'react-native-axios';
// create a component
class Welcome extends Component {
    static navigationOptions = {
        header:null
    }

    constructor(props){
      super(props)
      this.state={
        data:[],
        agent_id:2107
      }
    }


    async componentWillMount(){
      await axios.get('https://app.morelobby.com/api/agents').then(response => {
        console.log(response.data)
        var store =[{label:'No Agent',value:2107}]
        for (let i=0;i<response.data.agents.length;i++){
          store.push({label:response.data.agents[i].name,value:response.data.agents[i].geeks_id})
        }
        console.log(store)
        this.setState({data:store})
      })
    }



async store(){
  console.log(this.state.agent_id)
   AsyncStorage.setItem('AgentID',JSON.stringify(this.state.agent_id))
   console.log(this.state.agent_id)

  this.props.navigation.navigate('login')
}
    render() {
        
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.title}>St Louis Real Estate</Text>
                
                
                <View style={{top:120}}>
                <Dropdown
                itemCount={8}
                baseColor="#fff"
                fontSize={17}
                onChangeText={(itemValue, itemIndex) =>
                  this.setState({ agent_id: itemValue })
                }
                textColor="#19B5FE"
                labelFontSize={15}
                itemColor="#fff"
                selectedItemColor="#fff"
                overlayStyle={{backgroundColor:'#013243'}}
                containerStyle={{width:'60%',alignSelf:'center',backgroundColor:'#013243',shadowColor:'#0397ca'}}
                pickerStyle={{backgroundColor:'#013243'}}
                label='Select Agent'
            data={this.state.data}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={()=>this.store()} style={{backgroundColor:'#0397ca',borderRadius:4,width:'60%',height:40,alignItems:'center',justifyContent:'center',marginVertical:15,alignSelf:'center'}}>
                <Text style={{fontSize:17,fontWeight:'800',color:'#fff',}}>NEXT</Text>
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
        backgroundColor: '#013243',
    },
    title:{
        top:80,
        fontSize: 28,
    fontWeight: '300',
    lineHeight: 34,
    letterSpacing: 0.364,
    color:'white',
    alignSelf:'center',
    
    }
});

//make this component available to the app
export default Welcome;
