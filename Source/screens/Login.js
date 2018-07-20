//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,AsyncStorage } from 'react-native';
import axios from 'react-native-axios'
import { material } from 'react-native-typography'

// create a component
class Login extends Component {


    static navigationOptions={
        header:null
    }

    constructor(props)
    {
        super(props)
        this.state={
            currentColor:'#16A085',
            email:'',
            password:'',
            warntext:false,
            warning:'Please check your email and password'
        }
    }

componentDidMount(){

}


login(){
    
    if(this.state.email.length != 0 && this.state.password.length !=0 )
    {
    
    axios.post('https://app.morelobby.com/api/agent/login?',{
        email:this.state.email,
        password:this.state.password
    }).then (response=>{
        console.log(response)
        if(response.data.data.geek_type == 0){
            alert('Logged in as agent')
        }
        else{
            alert('Logged in as seller ')
        }
        AsyncStorage.setItem('userToken',JSON.stringify('user'))
        this.props.navigation.navigate('App');

    }).catch(error=>{
        this.setState({warning:JSON.stringify(error.response.data.message)})
        this.setState({currentColor:'#e74c3c',warntext:true})
    })
}

else {
    this.setState({currentColor:'#e74c3c',warntext:true,warning:'One of the fields is empty'})

}
}




    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.state.currentColor}]}>
                <Text style={{fontSize:20,fontWeight:'600',alignSelf:'center',top:30,color:'white'}}>Login</Text>

            <View style={{marginHorizontal:5,width:'80%',marginVertical:6,alignSelf:'center',top:50,justifyContent:'center'}}>
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
        onChangeText={(password) => this.setState({password})}
        multiline={false}
        placeholder="Password (phone number)"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"

/>
            </View>
           
           
{this.state.warntext ? 
    (<View style={{alignSelf:'center',top:50}}>
       <Text style={styles.warn}>{this.state.warning}</Text>


   </View>)
  : null}
             <TouchableOpacity activeOpacity={0.8} onPress={()=>this.login()} style={{backgroundColor:'white',borderRadius:4,width:'80%',height:40,alignItems:'center',justifyContent:'center',marginVertical:15,alignSelf:'center',top:100,borderColor:'#2f3640'}}>
                <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>

             <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('register')} style={{backgroundColor:'white',borderRadius:4,width:'80%',height:40,alignItems:'center',justifyContent:'center',marginVertical:15,alignSelf:'center',top:100,borderColor:'#2f3640'}}>
                <Text style={styles.text}>REGISTER</Text>
            </TouchableOpacity>
           
           
           
           
           
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:60,
    },
    input: {
        marginVertical:5,
        height: 40,
        padding:8,
        borderWidth:2,
        borderColor:'rgba(1, 0, 120, 0.1)',
        borderRadius: 6,
        width:'100%',
        backgroundColor:'white',
        fontSize: 16,
        //color: "#2c3e50"
      },
      text:{
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.408
      }
      ,
      warn:{
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
        color:'white'
      }
      
});

//make this component available to the app
export default Login;
