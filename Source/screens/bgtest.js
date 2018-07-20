//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,Button,TouchableOpacity } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { Table, Row, Rows } from 'react-native-table-component';
import Communications from 'react-native-communications';
import Autocomplete from 'react-native-autocomplete-input';
const number ='03007284849';
const asset=[{title:'John Vick'},{title:'Parker'},{title:'Chicken'}]
LINK2= 'https://app.morelobby.com/api/map_suggestion'
LINK3= 'https://app.morelobby.com/api/map_search'
// create a component
class bgtest extends Component {
    static navigationOptions ={
        header:null
    }

    constructor(props){
        super(props)
        this.state={
            films: [{title:'John Vick'},{title:'Parker'},{title:'Chicken'}],
            query: ''       
         }
    }

    check(){
        const {mail} = this.state;

        var reg = /^[a-zA-Z0-9._%+-]+\@ocpgroup+\.ma$/;
        if(reg.test(mail) == true){
            console.log('true')
        }
        else {
            console.log('false')
        }

    }

    
    componentDidMount(){
        var days = 33;
        var dates = []
        for(let i=0;i<7;i++){
var date = new Date();
var res = date.setTime(date.getTime() + (i * 24 * 60 * 60 * 1000));
date = new Date(res).getDate();
dates.push(date)
        }
        console.log(dates)

    }


    render() {
           return (
            <View style={styles.container}>
        
        <Text>Some content</Text>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        //justifyContent: 'center',
        backgroundColor:'white'
    },
    input: {
        marginVertical:4,
        width:'100%',
        height: 40,
        padding:5,
        borderWidth:2,
        borderColor:'rgba(55, 62, 55, 0.3)',
        borderRadius:3,
        backgroundColor:'white',
        fontSize: 15,
        //color: "#2c3e50"
      },
      head: { height: 40, backgroundColor: '#330' },
  text: { margin: 6,flexWrap:'wrap' },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

//make this component available to the app
export default bgtest;
