
import React, { Component } from 'react';
import { View, Text,Button, StyleSheet,FlatList,TouchableOpacity,ScrollView,Image,ImageBackground,Dimensions,AsyncStorage } from 'react-native';
import ImageOverlay from "react-native-image-overlay";
import LinearGradient from 'react-native-linear-gradient';
const window = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
//import Intl from 'react-native-intl';
import Intl from 'react-native-intl'
class List extends Component {
 
    static navigationOptions= {
        headerTitle:'Listings',
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor:'#5C6BC0',  
            shadowOpacity: 0.6
        },
        headerTitleStyle:{
            color:'white'
        }
    }
 
 
    constructor(props)
    {
        super(props)
        this.state={
            data:[],
            isVisible:false
        }
    }
 
 
 
    componentDidMount(){
        this.setState({isVisible:true})
        const { params } = this.props.navigation.state;
        console.log(params.listdata)
        if(params.listdata != null){
        this.setState({data:params.listdata})
        this.setState({isVisible:false})
        }
        else{
            this.setState({data:[]})
            this.setState({isVisible:false})
 
        }
    }
    showPrice(props){
        console.log(props)
        var value = parseFloat(props)
        var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

       
      return (<Text style={{color:'#4CAF50',fontWeight:"700",fontSize:15}}>{num}</Text>)
     
    
    }



    render(){
        return(
<View style={styles.container}>
<Button title="Remove User" onPress={()=>AsyncStorage.removeItem('userToken')} />
{this.state.isVisible ? (
    <View style={{alignSelf:'center',top:40,marginHorizontal:10}}>
    <Spinner  isVisible={this.state.isVisible} size={50} type={'Pulse'} color="#283593"/>
    </View>
) : 
( <View style={{height:'100%'}}>

            <View style={{height:50,width:'100%',paddingHorizontal:5,justifyContent:'center',backgroundColor:'#f5f6fa'}}>
            <Text>{this.state.data.length} Homes For Sale </Text>
            </View>


            <FlatList
        
            showsHorizontalScrollIndicator={false}
            //extraData={this.state.index}
            //horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
            renderItem={({item}) => (

                <TouchableOpacity activeOpacity={1.0} onPress={()=>this.props.navigation.navigate('details',{mlnumber:item.ML_Number})} style={{marginVertical:0.5}}>
                

                <ImageBackground style={styles.image}  defaultSource={require('../images/picture.png')} source={{ uri:"https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?TableID=5&Type=1&Number=1&Size=5&Key=" + item.matrix_unique_id}} resizeMode="cover">
            <LinearGradient  colors={["transparent", "black"]} locations={[0.3,1.2]} style={styles.linearGradient}>
             
             
            <View style={{flexDirection:"row",bottom:5,width:'100%'}}>


             <View style={{flexDirection:'column',left:0,paddingHorizontal:4,alignItems:'center'}}>

{this.showPrice(item.Listing_Price)}
            <Text style={{color:'white',flexWrap:'wrap',fontSize:11}}>{item.Zip_Code} {item.Street_Name} {item.MunicipalityTownship}</Text>
 
            </View>




            <View style={{right:0,justifyContent:'flex-end',position:'absolute',paddingHorizontal:6,flexDirection:'row'}}>
            
            
            <View style={{flexDirection:'column',marginHorizontal:4,alignItems:'center'}}>

            <Text style={{color:'#4CAF50',fontWeight:"700",fontSize:15}}>{Number(item.Bedrooms)}</Text>
            <Text style={{color:'white',fontSize:11}}>Bedrooms</Text>
 
            </View>



            <View
  style={{
    borderLeftWidth: 0.5,
    borderColor: 'white',
    height: 37,
    bottom:0
  }}
/>        


 <View style={{flexDirection:'column',marginHorizontal:4,alignItems:'center'}}>

<Text style={{color:'#4CAF50',fontWeight:"700",fontSize:15}}>{Number(item.Bathrooms)}</Text>
<Text style={{color:'white',fontSize:11}}>Bathrooms</Text>

</View>




             </View>       






            </View>
            
            </LinearGradient>
            </ImageBackground>

                </TouchableOpacity>



            )
            } />

</View> )
}
</View>


);

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor: 'white',
    },
    linearGradient: {
        display:'flex',
        flexDirection:'column',
        justifyContent: 'flex-end',
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    image:{
        width:'100%',height:210,display:'flex',flexDirection:'column'
    }
 
});
 

export default List;