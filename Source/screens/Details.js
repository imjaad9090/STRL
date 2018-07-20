//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Text,Image,ImageBackground,StatusBar,TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import  Icon  from "react-native-vector-icons/Feather";
import Spinner from 'react-native-spinkit';
import ImageSlider from 'react-native-image-slider';
IMAGESRC= 'https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?Key=37335719&TableID=5&Type=1&Number=4&Size=5'
// create a component
class Details extends Component {
    static navigationOptions= {
        headerTitle:'Details',
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor:'#5C6BC0',   
            shadowOpacity: 0.6
        },
        headerTitleStyle:{
            color:'white'
        }
    }


    constructor(props){
        super(props)

        this.state={
            isVisible:false,
            store:{},
            data:[],
            urls:['https://i.imgur.com/R9aoZuT.jpg','https://i.imgur.com/R9aoZuT.jpg','https://i.imgur.com/R9aoZuT.jpg'
            ]
        }
    }




    componentDidMount(){
        this.setState({isVisible:true})
        const { params } = this.props.navigation.state;

        //alert(params.mlnumber)
        axios.get('https://app.morelobby.com/api/get_listing/' + params.mlnumber)

  .then( (response) =>{
     
      console.log(response.data.data)
this.setState({store:response.data.data})
        var imageLinks = []

        for(var i=0;i<=response.data.data.Picture_CNT;i++){
            var link ='https://matrixmedia.marismatrix.com/mediaserver/GetMedia.ashx?Key='+response.data.data.matrix_unique_id+'&TableID=5&Type=1&Number='+ [i]+'&Size=5'
            imageLinks.push(link)
        }
        this.setState({data:imageLinks})
        //console.log(imageLinks)

        if(response.data.data.Square_Footage != 0){
        
        this.setState({ppsqf:(Number(Number(response.data.data.Selling_Price)/response.data.data.Square_Footage))})    
        }
        else {
            this.setState({ppsqf:0})
        }

        var forvisit= this.state.store.Street_Number +' '+ this.state.store.Street_Name +' '+ this.state.store.Street_Suffix +' '+ this.state.store.MunicipalityTownship +' '+ this.state.store.State
        
        
        console.log(forvisit)
        this.setState({address:forvisit,isVisible:false})




  })
  .catch((error) =>{
    console.log(error);
    this.setState({isVisible:false})

  });
    }


    showPrice(props){
        var value = parseFloat(props)
        var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        
      return (<Text style={{fontSize:17,fontWeight:'bold',color:'#5C6BC0'}}>{num}</Text>)
      }
    
    render() {
        return (
        <View style={styles.container}>
            
            
            {this.state.isVisible ? (<View style={{alignSelf:'center',top:100,marginHorizontal:10}}>
                <Spinner  isVisible={this.state.isVisible} size={50} type={'Circle'} color="#5C6BC0"/>
                </View>) :
            <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{width:'100%',height:250}}>
            <ImageBackground source={require('../images/picture.png')} style={{width:'100%',height:'100%'}} resizeMode='cover'>
            <ImageSlider          
             autoPlayWithInterval={3000}
            images={this.state.data}/>    
            </ImageBackground> 
            </View>


            <View style={{marginTop:7,padding:9,flexDirection:'row',width:'100%'}}>
            
            <View style={{flex:1,flexWrap:'wrap'}}>
{this.showPrice(this.state.store.Listing_Price)}

                <Text numberOfLines={3} style={{color:'black',flex: 1, flexWrap: 'wrap',fontSize:12}}>{this.state.store.Street_Number} {this.state.store.Street_Name} {this.state.store.Street_Suffix}, {this.state.store.MunicipalityTownship}, {this.state.store.State} </Text>


            </View>

            

            <View style={{marginLeft:'auto',flexDirection:'row',}}>
            <View style={{alignItems:'center'}}>
            <Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17}}>{Number(this.state.store.Bedrooms)}</Text>
            <Text style={{color:'black',fontSize:12}}>Beds</Text>
            </View>


<View
  style={{
    marginHorizontal:4,
    borderLeftWidth: 0.5,
    borderColor: 'black',
    height: 40,
    bottom:0
  }}
/> 


           <View style={{alignItems:'center'}}>
            <Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17}}>{Number(this.state.store.Bathrooms)}</Text>
            <Text style={{color:'black',fontSize:12}}>Baths</Text>
            </View>



      <View
  style={{
      marginHorizontal:4,
    borderLeftWidth: 0.5,
    borderColor: 'black',
    height: 40,
    bottom:0
  }}
 /> 


            <View style={{alignItems:'center'}}>
            <Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17}}>{Number(this.state.store.Square_Footage)}</Text>
            <Text style={{color:'black',fontSize:12}}>Sq. Ft</Text>
            </View>

            </View>


            </View>
            
            <View style={{marginVertical:4,padding:9}}> 
 <Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17,marginVertical:1}}>Description</Text>
 <Text textAlign="center" numberOfLines={90} style={{color:'black',fontSize:12,marginVertical:4}}>{this.state.store.Marketing_Remarks}</Text>

    </View>


<View style={{marginVertical:4,padding:9}}> 
<Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17,marginVertical:1}}>Key Details</Text>

  <View style={{flexDirection:'row'}}>

  <View style={{marginHorizontal:5}}>
      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>List Price</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>$ {Number(this.state.store.Listing_Price)}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Status</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Status}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Full Baths</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{Number(this.state.store.Total_Full_Baths)}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Total Living Area</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Square_Footage} sq. ft</Text>

      </View>



        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Subdivision</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex: 1, flexWrap: 'wrap',fontSize:12,marginVertical:2}}>{this.state.store.Subdivision_Name}</Text>
      </View>
      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Property Type</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Property_Type}</Text>

      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Bedrooms</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{Number(this.state.store.Bedrooms)}</Text>

      </View>



  </View>




<View style={{marginHorizontal:5}}>
      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sold Price</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>$ {Number(this.state.store.Selling_Price)}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Days on Market</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.CDOM}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Half Baths</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{Number(this.state.store.Total_Half_Baths)}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sq, Ft. Above</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Square_Footage} sq. ft</Text>

      </View>



        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Municipality</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.MunicipalityTownship}</Text>

      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Style Description</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.StyleDescription}</Text>

      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sq, Ft. Below</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{Number(this.state.store.Square_Footage)}</Text>

      </View>

       <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>County</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.County}</Text>

      </View>



  </View>





<View style={{marginHorizontal:5}}>
      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sold Date</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Selling_Date}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Price Per Sq.Ft</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>$ {this.state.ppsqf}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>MLS Number</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.ML_Number}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Living Sq, Ft.</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Square_Footage} sq. ft</Text>

      </View>



        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>School District</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex: 1, flexWrap: 'wrap',fontSize:12,marginVertical:2}}>{this.state.store.SchoolDistrict}</Text>
      </View>
      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Lot Size</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.Lot_Square_Footage}</Text>

      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Acres</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{Number(this.state.store.Acres)}</Text>

      </View>

  </View>

  </View>



    </View>
            


<View style={{marginVertical:4,padding:9}}> 
<Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17,marginVertical:4}}>Additional Information</Text>

<View style={{flexDirection:'row',}}>

 <View style={{marginLeft:5,marginRight:4}}>
      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Elementary School</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.ELEM}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Association Fee</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.ARCH}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Garage Spaces</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.CRG_NO}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>No of Fireplaces</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.FRP_NO} sq. ft</Text>

      </View>



        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Lot Dimensions</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex: 1, flexWrap: 'wrap',fontSize:12,marginVertical:2}}>{this.state.store.LOTD}</Text>
      </View>
      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Appliances</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex:1,flexWrap:'wrap',fontSize:12,marginVertical:2}}>{this.state.store.APPL}</Text>
      </View>
      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sewer</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.SEWR}</Text>

      </View>


      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Heat Source</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.HEATS}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Interior Decor</Text>
      <View style={{flexDirection:'row'}}> 
      <Text style={{color:'#7a7a7a',flex:1,flexWrap:'wrap',fontSize:12,marginVertical:2}}>{this.state.store.INTD}</Text>
      </View>
      </View>




      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Sr. High School</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.SROC}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Constructions</Text>
        <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',fontSize:12,flex:1,flexWrap:'wrap',marginVertical:2}}>{this.state.store.CONS} sq. ft</Text>
      </View>
      </View>



        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Basement Description</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex: 1, flexWrap: 'wrap',fontSize:12,marginVertical:2}}>{this.state.store.BSMT}</Text>
      </View>
      </View>




  </View>




<View style={{borderColor:'transparent',borderWidth:2,left:4,flex:1,flexWrap:'wrap'}}>
      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Jr. High School</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.JRHI}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Architecture</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.ARCH}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Parking Description</Text>
      
      <Text style={{color:'#7a7a7a',fontSize:12}}>{this.state.store.PRKD}</Text>
      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Fireplaces Type</Text>
        <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',fontSize:12,flex:1,flexWrap:'wrap',marginVertical:2}}>{this.state.store.FPLD} sq. ft</Text>
      </View>
      </View>



        <View style={{marginVertical:3,}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Lot Description</Text>
      
      <Text style={{color:'#7a7a7a',flex: 1, flexWrap: 'wrap',fontSize:12,marginVertical:2}}>{this.state.store.LTDS}</Text>
      
      </View>


<View style={{marginVertical:3,}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Amenities</Text>
      <Text style={{color:'#7a7a7a',flex:1,flexWrap:'wrap',fontSize:12,marginVertical:2}}>{this.state.store.AMEN}</Text>
      </View>


<View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Heating</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.HEAT}</Text>

      </View>


      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Kitchen</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.KITCH}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Taxes Paid</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.TAXS}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Special Areas</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2,flex:1,flexWrap:'wrap'}}>{this.state.store.SPEC}</Text>

      </View>


      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Cooling</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.COOL}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Water</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.WATR}</Text>

      </View>

      <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Selling Terms</Text>
      <Text style={{color:'#7a7a7a',fontSize:12,marginVertical:2}}>{this.state.store.TERMS}</Text>

      </View>

        <View style={{marginVertical:3}}>
      <Text style={{color:'black',fontWeight:'bold',fontSize:12}}>Fireplace Location</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#7a7a7a',flex:1,flexWrap:'wrap',fontSize:12,marginVertical:2}}>{this.state.store.FRPL}</Text>
      </View>
      </View>



  </View>

  </View>
  <View style={{marginTop:4,}}> 
<Text style={{color:'#5C6BC0',fontWeight:"bold",fontSize:17,marginVertical:4}}>Map Location</Text>
<Image source={{ uri:'https://maps.googleapis.com/maps/api/staticmap?zoom=16&maptype=roadmap&markers=color:purple|'+this.state.store.Latitude+','+this.state.store.Longitude+'&size=400x300&key=AIzaSyCbdLPYElO7hk4RnxBsSe_fXv0noQ90CRo'}} style={{width:'100%',resizeMode:'contain',height:300}}  />





<TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('bookvisit',{thisAddress:this.state.address})} style={{backgroundColor:'#5C6BC0',borderRadius:2,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#fff'}}>SCHEDULE TOUR</Text>
            </TouchableOpacity>



            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('requestinfo',{thisAddress:this.state.address})} style={{backgroundColor:'#FFF',borderRadius:2,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center',borderColor:'#5C6BC0',borderWidth:1}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#5C6BC0'}}>REQUEST INFORMATION</Text>
            </TouchableOpacity>

</View>
 </View>


 




            
            
            </ScrollView> 
            }  
         </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom:5,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Details;
