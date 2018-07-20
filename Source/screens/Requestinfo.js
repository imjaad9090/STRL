//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput,Button,FlatList,AsyncStorage } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import axios from 'react-native-axios'
// create a component
class Requestinfo extends Component {
    static navigationOptions={
        header:null
    }

    constructor(props){
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            name:'',email:'',phone:'',comment:'',
            time:[{num1:4},{num1:5},{num1:6},{num1:7},{num1:8},{num1:9},{num1:10},],

            store:[{num1:'5:00 PM'},{num1:'5:30 PM'},{num1:'6:00 PM'},{num1:'6:30 PM'},{num1:'7:00 PM'},{num1:'7:30 PM'},{num1:'8:00 PM'},]
          };
    }


  async componentDidMount(){
        var id = await AsyncStorage.getItem('AgentID')
        console.log(JSON.parse(id))
        this.setState({idAgent:JSON.parse(id)})
    }
    
    setTime(props){
        console.log(props)
        this.setState({time1:props})
    }

    setDate(props){
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


    var kol = props +' '+monthNames[new Date().getMonth()]+' '+ new Date().getFullYear()
        this.setState({date:kol})

    }

    submit(){
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
               
             


            <Text style={{marginVertical:10,fontSize:20,color:'white',textAlign:'center'}}>Request Information</Text>

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
            <Text style={{marginVertical:3,fontSize:20,color:'white',textAlign:'center'}}>Comments : </Text>
            <TextInput
                style={{height: 100,top:3,padding: 5,borderColor:'green',borderWidth:2,
                  backgroundColor: 'transparent', 
                  textAlignVertical: 'top'}}
                  multiline={true}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={comment => this.setState({ comment })}
                />


    <TouchableOpacity activeOpacity={0.8} onPress={()=>alert('api required to be built')} style={{backgroundColor:'black',borderRadius:2,width:'75%',height:50,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
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
       justifyContent:'center',
        backgroundColor: '#0E55AB',
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
export default Requestinfo;
