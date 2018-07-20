// create a component
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Platform,AsyncStorage,KeyboardAvoidingView,ScrollView} from 'react-native';
import axios from 'react-native-axios'
import { sanFranciscoWeights } from 'react-native-typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

// create a component
class Register extends Component {


    static navigationOptions={
header:null     }

    constructor(props)
    {
        super(props)
        this.state={
            name:'',
            email:'',
            phone:'',
            last_name:''
        }
    }

    register(){
        axios.post('https://app.morelobby.com/api/agent/signup?',{
            email:this.state.email,
            phone:this.state.phone,
            first_name:this.state.name,
            last_name:this.state.last_name
        }).then(response => {
            console.log(response)
            alert('user created!')
            AsyncStorage.setItem('userToken',JSON.stringify('user'))

            this.props.navigation.navigate('App');

        }).catch(error => {
            alert(JSON.stringify(error.response.data.message))
        })
    }



    componentDidMount(){
        //AndroidKeyboardAdjust.setAdjustNothing();
        if (Platform.OS === 'android'){
        AndroidKeyboardAdjust.setAdjustPan();
        }


    }


    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

        return (
                 
                <View style={styles.container}>
                <Text style={{fontSize:20,fontWeight:'600',alignSelf:'center',top:30,color:'white'}}>Register</Text>

            <View style={{marginHorizontal:5,width:'80%',marginVertical:6,alignSelf:'center',top:50,justifyContent:'center'}}>
           
           
           <Text style={{color:'white'}}>Your phone number is your password.</Text>
            <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(name) => this.setState({name})}
                multiline={false}
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={(event) => { 
                    this.refs.SecondInput.focus(); 
                  }}
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />


              <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}
                ref='SecondInput'

                onChangeText={(last_name) => this.setState({last_name})}
                multiline={false}
                placeholder="Last Name"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={(event) => { 
                    this.refs.thr.focus(); 
                  }}
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />



              <TextInput
        style={styles.input}
        selectionColor={'#3d1767'}
        ref='thr'
        onChangeText={(email) => this.setState({email})}
        multiline={false}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={(event) => { 
            this.refs.third.focus(); 
          }}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"
/>

                   <TextInput
        style={styles.input}
        selectionColor={'#3d1767'}
        ref='third'
        onChangeText={(phone) => this.setState({phone})}
        multiline={false}
        placeholder="Phone"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"
        />
            </View>


    
             <TouchableOpacity activeOpacity={0.8} onPress={()=>this.register()} style={{backgroundColor:'white',borderRadius:4,width:'80%',height:40,alignItems:'center',justifyContent:'center',marginVertical:15,alignSelf:'center',top:100,borderColor:'#2f3640'}}>
                <Text style={{fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.408}}>REGISTER</Text>
            </TouchableOpacity>
           



             <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.pop()} style={{backgroundColor:'white',borderRadius:4,width:'80%',height:40,alignItems:'center',justifyContent:'center',marginVertical:15,alignSelf:'center',top:100,borderColor:'#2f3640'}}>
                <Text style={{fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.408}}>GO BACK</Text>
            </TouchableOpacity>


           <View style={{bottom:0,position:'absolute',alignItems:'center',alignSelf:'center',paddingVertical:4}}>
               <Text style={{color:'white',textAlign:'center'}}>By registering on our site you agree
to our <Text style={{fontStyle:'italic',fontWeight:'200'}} onPress={()=>this.props.navigation.navigate('terms')}>terms</Text> and privacy policy.</Text>
           </View>


           </View>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:60,
        backgroundColor: '#192a56',
    },
    input: {
        marginVertical:5,
        height: 40,
        padding:8,
        borderWidth:2,
        borderColor:'rgba(0, 22, 0, 0.5)',
        borderRadius: 6,
        width:'100%',
        backgroundColor:'white',
        fontSize: 16,
        //color: "#2c3e50"
      },
});

//make this component available to the app
export default Register;
