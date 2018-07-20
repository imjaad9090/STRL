//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput,Button,FlatList,AsyncStorage } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import axios from 'react-native-axios'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// create a component
class Bookvisit extends Component {
    static navigationOptions={
        headerTitle:'Schedule Visit',
        headerStyle:{
            backgroundColor:'#5C6BC0',
          },
          headerTintColor:'white',

    }

    constructor(props){
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            name:'',email:'',phone:'',time1:'',
            dates:[],
            store:[{num1:'5:00 PM',selected:false,id:1},{id:2,selected:false,num1:'5:30 PM'},{id:3,selected:false,num1:'6:00 PM'},{id:4,selected:false,num1:'6:30 PM'},{id:5,selected:false,num1:'7:00 PM'},{selected:false,id:6,num1:'7:30 PM'},{selected:false,id:7,num1:'8:00 PM'},]
          };
    }


  async componentDidMount(){

    this.setState({thisMonth:monthNames[new Date().getMonth()]})

    for(let i=0;i<7;i++){
        var date = new Date();
        var res = date.setTime(date.getTime() + (i * 24 * 60 * 60 * 1000));
        date = new Date(res).getDate();
        this.state.dates.push({num1:date,selected:false,id:Math.random()})

                }
                console.log(this.state.dates)
        var id = await AsyncStorage.getItem('AgentID')
        console.log(JSON.parse(id))
        this.setState({idAgent:JSON.parse(id)})
    }
    
    setTime(props){
        console.log(props)
        let array = this.state.store
        var objIndex = array.findIndex((obj => obj.id === props));
        var value = array[objIndex].num1
        this.setState({time1:value})

        array[objIndex].selected = true


            for(let i=0;i<7;i++){
            if(array[i].id != props)
            {array[i].selected = false}
        }

        this.setState({store:array})
        console.log(this.state.time1)


    }

     setDate(props){

        let array = this.state.dates
        var objIndex = array.findIndex((obj => obj.id === props));
        
        var value = array[objIndex].num1
        var kol =  value+' '+monthNames[new Date().getMonth()]+' '+ new Date().getFullYear()
        
        
        this.setState({date:kol})
        console.log(this.state.date)
        array[objIndex].selected = true

        for(let i=0;i<7;i++){
            if(array[i].id != props)
            {array[i].selected = false}
        }

        //console.log(array[objIndex].num1)
        this.setState({dates:array})

       

            

}

    submit(){
        console.log(this.state.date)
        const{params} = this.props.navigation.state
        console.log(params.thisAddress)
        axios.post('https://app.morelobby.com/api/visit_property?',{

        email:this.state.email,
        phone:this.state.phone,
        name:this.state.name,
        agent_id:this.state.idAgent,
        address:params.thisAddress,
        date:this.state.date,
        time:this.state.time1



        }).then(response => {
            console.log(response)
            alert('Your request has been received.')
        }).catch(error => {
            console.log(error)
        })
    }



    render() {
         // 1 day disabled
        return (
            <View style={styles.container}>
               
             


            <Text style={{marginVertical:10,fontSize:20,color:'white',textAlign:'center'}}>Book a Visit</Text>

            <View style={{marginHorizontal:10}}>


            <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(name) => this.setState({name})}
                multiline={false}
                placeholder="Your name"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />
              <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}
                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />


              <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(phone) => this.setState({phone})}
                multiline={false}
                placeholder="Phone"
                autoCapitalize="none"
                kayboard="phone-pad"
                autoCorrect={false}
                returnKeyType="done"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />
            <Text style={{marginVertical:3,fontSize:20,color:'white',textAlign:'center'}}>Select Day</Text>


            <View style={{paddingTop:4,height:100, top:5,paddingBottom:4}}>
            <FlatList        
    style={{borderRadius:2,backgroundColor:'transparent',marginHorizontal:5}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.dates}
    renderItem={({item}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.setDate(item.id)}>
        <View style={{height:'100%',width:90,borderColor:item.selected ? '#00E640' : '#fff',borderWidth:1,alignItems:'center',justifyContent:'center',marginHorizontal:2}}>
        <Text style={{fontSize:30,color:'white'}}>{item.num1}</Text>
        <Text style={{fontSize:15,color:'white'}}>{this.state.thisMonth}</Text>

        </View>
        </TouchableOpacity>
    )}            
            
            
            
            />
            </View>


            <Text style={{marginVertical:3,top:4,fontSize:20,color:'white',textAlign:'center'}}>Select Time</Text>


             <View style={{paddingTop:4,height:100, top:5,paddingBottom:4}}>
            <FlatList        
    style={{borderRadius:2,backgroundColor:'transparent',marginHorizontal:5}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.store}
    renderItem={({item}) => (
        <TouchableOpacity  activeOpacity={0.8} onPress={() => this.setTime(item.id)}>
        <View style={{height:'40%',width:80,borderColor:item.selected ? '#00E640' : '#fff',borderWidth:1,alignItems:'center',justifyContent:'center',marginHorizontal:4}}>
        <Text style={{color:'white'}}>{item.num1}</Text>

        </View>
        </TouchableOpacity>

    )}            
            
            
            
            />
            </View>


    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.submit()} style={{backgroundColor:'black',borderRadius:2,width:'75%',height:50,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
                <Text style={{fontSize:17,includeFontPadding:true,color:'#fff'}}>SUBMIT</Text>
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
        padding:5,
       justifyContent:'center',
        backgroundColor: '#013243',
    },
    input: {
        marginVertical:5,
        width:'100%',
        height: 40,
        padding:5,
        borderWidth:2,
        borderColor:'rgba(0, 0, 0, 0.1)',
        borderRadius:2,
        backgroundColor:'white',
        fontSize: 16,
        //color: "#2c3e50"
      },
});

//make this component available to the app
export default Bookvisit;
