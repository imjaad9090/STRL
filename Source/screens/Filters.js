//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,Picker,TouchableOpacity,Switch,Button } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import ImageOverlay from "react-native-image-overlay";
import Spinner from 'react-native-spinkit';
import axios from 'react-native-axios';
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
const LINK = 'https://app.morelobby.com/api/';
// create a component
class Filters extends Component {

    static navigationOptions ={
        headerTitle:'Search Filters',
        headerStyle:{
          backgroundColor:'#5C6BC0',
        },
        headerTintColor:'white',
        headerTitleStyle:{
          color:'white',
        
        }
        
    }
    constructor(props) {
        super(props);
    
        this.state = {
          garagevalue:0,
          openhousevalue:0,
          sectionvalue:'',
          section1:true,
          section2:false,
          visibleModal:null,
          countyselected:[],
          store:[],
          isVisible:false,
          county:'',
          cityselected:[],
          zipselected:[],
          elemselected:[],
          sdselected:[],
          hsselected:[],
            lotsizemin:'',
            transsactype:'Sale',
            garage:false,
            lotsizemax:'',
            sqfeetmin:'',
            sqfeetmax:'',
            soldhomes:'not',
            soldhomesyear:'6 months',
            openhouseonly:false,
            homeforsale:'not',
            index:0,
            propertytype:[],
          minp:'',
          maxp:'',
          minb:'',
          maxb:'',
          status:'Active',
          baths:'',
          proptype :[
            { name: 'House', code: '#ED4C67', id:1, added:false }, 
              { name: 'Condo/Villa', code: '#3498db', id:2, added:false  }, 
              { name: 'New Construction ', code: '#34495e', id:3, added:false }, 
            ],
            isModalVisible: false,

        };
      }


     

      componentDidMount(){
        this.setState({isVisible:true})
       
       
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
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });



    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      //console.log(response.data.data)
      this.setState({cit:response.data.data.city})
      var cnt = [ ];

      for(let i=0;i < this.state.cit.length; i++){

        cnt.push({id:i,name:this.state.cit[i].City})
        
      }
      console.log(cnt)
      this.setState({citylist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });


    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      console.log(response.data.data)
      this.setState({zip:response.data.data.zip})
      var cnt = [ ];

      for(let i=0;i < this.state.zip.length; i++){

        cnt.push({id:i,name:Number(this.state.zip[i].Zip_Code)})
        
      }
      console.log(cnt)
      this.setState({ziplist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });


    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      this.setState({elem:response.data.data.elementry})
      var cnt = [ ];

      for(let i=0;i < this.state.elem.length; i++){

        cnt.push({id:i,name:(this.state.elem[i].ELEM)})
        
      }
      console.log(cnt)
      this.setState({elemlist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });


    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      this.setState({sch:response.data.data.highScools})
      var cnt = [ ];

      for(let i=0;i < this.state.sch.length; i++){

        cnt.push({id:i,name:(this.state.sch[i].Area)})
        
      }
      console.log(cnt)
      this.setState({schlist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });



    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      this.setState({scd:response.data.data.schoolDistrict})
      var cnt = [ ];

      for(let i=0;i < this.state.scd.length; i++){

        cnt.push({id:i,name:(this.state.scd[i].SchoolDistrict)})
        
      }
      console.log(cnt)
      this.setState({scdlist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      this.setState({isVisible:false})      

    });

    this.setState({isVisible:false})      



      }

      _toggleModal = () =>
      this.setState({ isModalVisible: !this.state.isModalVisible });
   
      radios(props){
        
        this.setState({sectionvalue:props})
        if(props == 'active'){
          this.setState({section1:true})
          this.setState({section2:false})

        }
        else if(props == 'sold'){
          this.setState({section2:true})
          this.setState({section1:false})


        }
      }

/* https://app.morelobby.com/api/search?Property_Type=['Residential']
&Transaction_Type=Sale&County=['franklin']&MunicipalityTownship=['berger']&Zip_Code=['63017']&ELEM=['weg']&SRHI=['eewge']&limit=1&offset=0&listing_type=active&open_house=1&price_min=34&price_max=5758&sq_min=7&sq_max=899&lot_size_min=78&lot_size_max=56879&GRG_No=1&beds_min=5&beds_max=89&baths_min=1&sold_within=7 days */


      filter(){
        console.log(this.state)
          axios.post(LINK+'search',{

            Property_Type:JSON.stringify(this.state.propertytype),
            Transaction_Type:(this.state.transsactype),
            County:JSON.stringify(this.state.countyselected),
            MunicipalityTownship:JSON.stringify(this.state.cityselected),
            Zip_Code:JSON.stringify(this.state.zipselected),
            ELEM:JSON.stringify(this.state.elemselected),
            SRHI:JSON.stringify(this.state.hsselected),
            lsiting_type:this.state.sectionvalue,
            Status:JSON.stringify([this.state.status]),
            open_house: this.convopen(),
            price_min:this.state.minp,
            price_max:this.state.maxp,
            sq_min:this.state.sqfeetmin,
            sq_max:this.state.sqfeetmax,
            lot_size_min:this.state.lotsizemin,
            lot_size_max:this.state.lotsizemax,
            CRG_No: this.convgrarage(),
            beds_min:this.state.minb,
            beds_max:this.state.maxb,
            bath_min:this.state.baths,
            sold_within:this.state.soldhomesyear,
            SchoolDistrict:JSON.stringify(this.state.sdselected),

            
          }).then(response=>{
            console.log(response)
            if(response.data.data.length != 0){
            this.props.navigation.navigate('mapview',{
              listdata:response.data.data
            })}
            else if (response.status == 204){
              alert('no record found')
            }


          }).catch(function(error) {
console.log(error)      
          });
      }

      onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        this.setState({countyselected:selectedItems})
        console.log(this.state.countyselected)
      };

      onCititesChange = newselectedItems => {
        this.setState({ newselectedItems });
        this.setState({cityselected:newselectedItems})
        console.log(this.state.cityselected)
      };


      onZipChange = zipselectedItems => {
        this.setState({ zipselectedItems });
        this.setState({zipselected:zipselectedItems})
        console.log(this.state.zipselected)
      };

      onElemChange = elemselectedItems => {
        this.setState({ elemselectedItems });
        this.setState({elemselected:elemselectedItems})
        console.log(this.state.elemselected)
      };

      onSchChange = schselectedItems => {
        this.setState({ schselectedItems });
        this.setState({hsselected:schselectedItems})
        console.log(this.state.hsselected)
      };

      onSdChange = sdselectedItems => {
        this.setState({ sdselectedItems });
        this.setState({sdselected:sdselectedItems})
        console.log(this.state.sdselected)
      };


changeopen(){
  if(this.state.openhousevalue==0){
    this.setState({openhousevalue:1})

  }
  else if(this.state.openhousevalue==1){
    this.setState({openhousevalue:0})
  }
  }


  convopen(){
    if(this.state.openhouseonly == true){
      return 1
    }
    else if(this.state.openhouseonly == false){
      return 0
  }
}

convgrarage(){
  if(this.state.garage == true){
    return 1
  }
  else if(this.state.garage == false){
    return 0
}
}



      
        handleSwitch = () => this.setState(state =>({
            openhouseonly: !state.openhouseonly,

          }))
        

          handlegarage = () => this.setState(state =>({
            garage: !state.garage,
          }))
        
      


          years(){
            console.log(this.state)
            var currentTime = new Date()
            var year = currentTime.getFullYear()
            var list=[]

            for(var i=1900;i>year;i++){
                console.log(i++)
            }
        }

          add(props){
    let array = this.state.proptype

    var objIndex = array.findIndex((obj => obj.id === props));
    if(array[objIndex].added == false){
        array[objIndex].added = true
        var daname = array[objIndex].name

    this.state.propertytype.push(daname)
    this.setState(prevState => ({index: prevState.index + 1})); 
    
    }
    console.log(this.state)
}

    render() {

     let minpdata = [
      { label:"No min", value:"0"},
      { label:"$50K" ,value:"50000"},
      { label:"$74K" ,value:"75000"},
      { label:"$100K" ,value:"100000"},
      { label:"$125K" ,value:"125000"},
      { label:"$150K" ,value:"150000"},
      { label:"$175K" ,value:"175000"},
      { label:"$200K" ,value:"200000"},
      { label:"$225K" ,value:"225000"},
      { label:"$250K" ,value:"250000"},
      { label:"$275K" ,value:"275000"},
      { label:"$300K" ,value:"300000"},
      { label:"$325K" ,value:"325000"},
      { label:"$350K" ,value:"350000"},
      { label:"$375K" ,value:"375000"},
      { label:"$400K" ,value:"400000"},
      { label:"$425K" ,value:"425000"},
      { label:"$450K" ,value:"450000"},
      { label:"$475K" ,value:"475000"},
      { label:"$500K" ,value:"500000"},
      { label:"$550K" ,value:"550000"},
      { label:"$600K" ,value:"600000"},
      { label:"$650K" ,value:"650000"},
      { label:"$700K" ,value:"700000"},
      { label:"$750K" ,value:"750000"},
      { label:"$800K" ,value:"800000"},
      { label:"$850K" ,value:"850000"},
      { label:"$900K" ,value:"900000"},
      { label:"$950K" ,value:"950000"},
      { label:"$1M"   ,value:"1000000"},
      { label:"$1.25M",value:"1250000"},
      { label:"$1.5M" ,value:"1500000"},
      { label:"$1.75M" ,value:"1750000"},
      { label:"$2M" ,value:"2000000"},
      { label:"$2.25M" ,value:"2250000"},
      { label:"$2.5M" ,value:"2500000"},
      { label:"$2.75M" ,value:"2750000"},
      { label:"$3M" ,value:"3000000"},
      { label:"$3.25M" ,value:"3250000"},
      { label:"$3.5M" ,value:"3500000"},
      { label:"$3.75M" ,value:"3750000"},
      { label:"$4M" ,value:"4000000"},
      { label:"$4.25M" ,value:"4250000"},
      { label:"$4.5M" ,value:"4500000"},
      { label:"$4.75M" ,value:"4750000"},
      { label:"$5M" ,value:"5000000"},
      { label:"$6M" ,value:"6000000"},
      { label:"$7M" ,value:"7000000"},
      { label:"$8M" ,value:"8000000"},
      { label:"$9M" ,value:"9000000"},
      { label:"$10M" ,value:"10000000"},
    ];


     let minbdata = [
      { label:"No min", value:"0" },
      { label:"1" ,value:"1" },
      { label:"2" ,value:"2" },
      { label:"3" ,value:"3" },
      { label:"4" ,value:"4" },
      { label:"5" ,value:"5" },
      { label:"6" ,value:"6" },
     ];

     let maxbdata = [
      { label:"No max", value:"" },
      { label:"1" ,value:"1" },
      { label:"2" ,value:"2" },
      { label:"3" ,value:"3" },
      { label:"4" ,value:"4" },
      { label:"5" ,value:"5" },
      { label:"6" ,value:"6" },
     ];


     let sqfeetmindata = [
      {label:"No min", value:"" },
      {label:"500" ,value:"500" },
      {label:"750" ,value:"750" },
      {label:"1000" ,value:"1000" },
      {label:"1250" ,value:"1250" },
      {label:"1500" ,value:"1500" },
      {label:"1750" ,value:"1750" },
      {label:"2000" ,value:"2000" },
      {label:"2250" ,value:"2250" },
      {label:"2500" ,value:"2500" },
      {label:"2750" ,value:"2750" },
      {label:"3000" ,value:"3000" },
      {label:"3500" ,value:"3500" },
      {label:"4000" ,value:"4000" },
      {label:"5000" ,value:"5000" },
     ];


     let sqfeetmaxdata = [
      {label:"No max", value:"" },
      {label:"500" ,value:"500" },
      {label:"750" ,value:"750" },
      {label:"1000" ,value:"1000" },
      {label:"1250" ,value:"1250" },
      {label:"1500" ,value:"1500" },
      {label:"1750" ,value:"1750" },
      {label:"2000" ,value:"2000" },
      {label:"2250" ,value:"2250" },
      {label:"2500" ,value:"2500" },
      {label:"2750" ,value:"2750" },
      {label:"3000" ,value:"3000" },
      {label:"3500" ,value:"3500" },
      {label:"4000" ,value:"4000" },
      {label:"5000" ,value:"5000" },
     ];


     let lotsizemindata = [
      {label:"Any" ,value:"" },
        {label:"0 sq.ft" ,value:"0" },
        {label:"2500 sq.ft", value:"2500" },
        {label:"5000 sq.ft" ,value:"5000" },
        {label:"7500 sq.ft" ,value:"7500" },
        {label:"10000 sq.ft", value:"10000" },
        {label:"15000 sq.ft" ,value:"15000" },
        {label:"20000 sq.ft" ,value:"20000" },
        {label:"30000 sq.ft" ,value:"30000" },
        {label:"40000 sq.ft" ,value:"40000" },
        {label:"1 Acre" ,value:"43560" },
        {label:"2 Acre" ,value:"87120" },
        {label:"3 Acre" ,value:"130680" },
        {label:"4 Acre" ,value:"174240" },
        {label:"5 Acre" ,value:"217800" },
        {label:"10 Acre" ,value:"435600" },
     ];


     let lotsizemaxdata = [
      {label:"Any" ,value:"" },
        {label:"0 sq.ft" ,value:"0" },
        {label:"2500 sq.ft", value:"2500" },
        {label:"5000 sq.ft" ,value:"5000" },
        {label:"7500 sq.ft" ,value:"7500" },
        {label:"10000 sq.ft", value:"10000" },
        {label:"15000 sq.ft" ,value:"15000" },
        {label:"20000 sq.ft" ,value:"20000" },
        {label:"30000 sq.ft" ,value:"30000" },
        {label:"40000 sq.ft" ,value:"40000" },
        {label:"1 Acre" ,value:"43560" },
        {label:"2 Acre" ,value:"87120" },
        {label:"3 Acre" ,value:"130680" },
        {label:"4 Acre" ,value:"174240" },
        {label:"5 Acre" ,value:"217800" },
        {label:"10 Acre" ,value:"435600" },
     ];



     let statusdata = [
      {label:"Active" ,value:"Active"},
      {label:"Coming soon", value:"Coming soon"},
      {label:"Pending" ,value:"Pending"}
     ];

     let soldhomesyeardata = [
      {label:"Last 7 days" ,value:"7 days" },
      {label:"Last 1 months", value:"1 months" },
      {label:"Last 3 months" ,value:"3 months" },
      {label:"Last 6 months" ,value:"6 months" },
      {label:"Last 1 year" ,value:"1 year" },
      {label:"Last 2 year" ,value:"2 year" },
      {label:"Last 3 year" ,value:"3 year" },
      {label:"All Time" ,value:"All Time" },
     ];

     let countydata = [
      {label:"St Louis" ,value:"St Louis" },
      {label:"Sea" ,value:"Sea" },
      {label:"Havana" ,value:"Havana" },


     ];

     let bathsdata = [
      {label:"Any" ,value:"" },
      {label:"1+" ,value:"1" },
      {label:"1.25+" ,value:"1.25" },
      {label:"2+", value:"2" },
      {label:"3+" ,value:"3" },
      {label:"4+" ,value:"4" },
      {label:"5+" ,value:"5" },
      {label:"6+" ,value:"6" },
     ];


     let transacdata =[
      { label:"Sale", value:"Sale"},
      { label:"Lease" ,value:"Lease"},
     ];



      let maxpdata = [
        { label:"No max", value:""},
        { label:"$50K" ,value:"50000"},
        { label:"$74K" ,value:"75000"},
        { label:"$100K" ,value:"100000"},
        { label:"$125K" ,value:"125000"},
        { label:"$150K" ,value:"150000"},
        { label:"$175K" ,value:"175000"},
        { label:"$200K" ,value:"200000"},
        { label:"$225K" ,value:"225000"},
        { label:"$250K" ,value:"250000"},
        { label:"$275K" ,value:"275000"},
        { label:"$300K" ,value:"300000"},
        { label:"$325K" ,value:"325000"},
        { label:"$350K" ,value:"350000"},
        { label:"$375K" ,value:"375000"},
        { label:"$400K" ,value:"400000"},
        { label:"$425K" ,value:"425000"},
        { label:"$450K" ,value:"450000"},
        { label:"$475K" ,value:"475000"},
        { label:"$500K" ,value:"500000"},
        { label:"$550K" ,value:"550000"},
        { label:"$600K" ,value:"600000"},
        { label:"$650K" ,value:"650000"},
        { label:"$700K" ,value:"700000"},
        { label:"$750K" ,value:"750000"},
        { label:"$800K" ,value:"800000"},
        { label:"$850K" ,value:"850000"},
        { label:"$900K" ,value:"900000"},
        { label:"$950K" ,value:"950000"},
        { label:"$1M"   ,value:"1000000"},
        { label:"$1.25M",value:"1250000"},
        { label:"$1.5M" ,value:"1500000"},
        { label:"$1.75M" ,value:"1750000"},
        { label:"$2M" ,value:"2000000"},
        { label:"$2.25M" ,value:"2250000"},
        { label:"$2.5M" ,value:"2500000"},
        { label:"$2.75M" ,value:"2750000"},
        { label:"$3M" ,value:"3000000"},
        { label:"$3.25M" ,value:"3250000"},
        { label:"$3.5M" ,value:"3500000"},
        { label:"$3.75M" ,value:"3750000"},
        { label:"$4M" ,value:"4000000"},
        { label:"$4.25M" ,value:"4250000"},
        { label:"$4.5M" ,value:"4500000"},
        { label:"$4.75M" ,value:"4750000"},
        { label:"$5M" ,value:"5000000"},
        { label:"$6M" ,value:"6000000"},
        { label:"$7M" ,value:"7000000"},
        { label:"$8M" ,value:"8000000"},
        { label:"$9M" ,value:"9000000"},
        { label:"$10M" ,value:"10000000"},
        ];




    
  
  return (
            <View style={styles.container}>
                  {this.state.isVisible ? (
                         <View style={{alignSelf:'center',marginHorizontal:10}}>
                         <Spinner  isVisible={this.state.isVisible} size={30} type={'Pulse'} color="#283593"/>
                         </View>
                       ) : 
            <ScrollView  showsVerticalScrollIndicator={false} style={{padding:4,borderColor:'red',borderWidth:1,}}>
            
         <View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Price
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 120,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ minp: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={minpdata}
      value="No min"
      baseColor="#576574"
    /> 
      
    
    </View>
    <View style={{height:70,justifyContent:'center',alignItems:'center',marginHorizontal:3}}>
<Text style={{fontWeight:'400',fontSize:16}}>
    to
</Text>
</View>
             <View style={{height: 50, width: 120, justifyContent:'center'}}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ maxp: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={maxpdata}
      value="No max"
      baseColor="#576574"
    /> 
    </View>

             </View>
         </View>


      <View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Beds
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 120,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ minb: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={minbdata}
      value="Any"
      baseColor="#576574"
    /> 
      
    
    </View>
    <View style={{height:70,justifyContent:'center',alignItems:'center',marginHorizontal:3}}>
<Text style={{fontWeight:'400',fontSize:16}}>
    to
</Text>
</View>
             <View style={{height: 50, width: 120, justifyContent:'center'}}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ maxb: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={maxbdata}
      value="Any"
      baseColor="#576574"
    /> 
    </View>

             </View>
    </View>




         <View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Baths
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 220,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ baths: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={bathsdata}
      value={this.state.baths}
      baseColor="#576574"
    /> 
    </View>
    </View>
    </View>





      <View style={{marginVertical:3}}>
      <Text style={{fontSize:16,fontWeight:'700'}}>
                 Property Type
      </Text>
      </View>




<View style={{marginVertical:3,flexWrap:'nowrap'}}>
    <GridView
         //extraData={this.state.index}
        itemDimension={80}
        items={this.state.proptype}
        style={styles.gridView}
        renderItem={item => (
          <TouchableOpacity  activeOpacity={1.0} style={[styles.itemContainer, { backgroundColor: item.code }]} onPress={()=>this.add(item.id)}>

            <Text style={styles.itemName}>{item.name}</Text>
            <Icon name="done" size={26} color={item.added ?  '#fff' : 'transparent' } />
          </TouchableOpacity>
        )}
      />

      </View>



         <View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Transaction Type
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 220,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ transsactype: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={transacdata}
      value={this.state.transsactype}
      baseColor="#576574"
    /> 
    </View>
    </View>
    </View>








            <View style={{marginVertical:3}}>
        <RadioGroup
        onSelect = {(index, value) => this.radios(value)}
        selectedIndex={0}

      >
        <RadioButton value={'active'} >
          <Text style={{fontWeight:'700',fontSize:16}}>Homes for Sale</Text>
          
          {this.state.section1 ? (
          <View style={{flexDirection:'column'}}>
<View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Status
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 220,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ status: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={statusdata}
      value={this.state.status}
      baseColor="#576574"
    /> 
    </View>
    </View>
    </View>
<View style={{marginVertical:3}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:16,fontWeight:"700"}}>
                 Open House Only
             </Text> 
             <View>
             <Switch
             onValueChange={()=>this.handleSwitch()}
             value={this.state.openhouseonly} 
             />
             </View>    
              </View>
              </View>
          </View>):null
          }

        </RadioButton>


        <RadioButton value={'sold'} >
          <Text style={{fontWeight:'700',fontSize:16}}>Sold Homes</Text>
          <View style={{flexDirection:'column'}}>

            {this.state.section2 ? (
                <View style={{marginVertical:3}}>
                <Text style={{fontSize:16,fontWeight:'700'}}>
                    Sold Homes Year
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                
                <View style={{height: 50, width: 120,justifyContent:'center',left:4 }}>
                <Dropdown
         onChangeText={(itemValue, itemIndex) =>
           this.setState({ soldhomesyear: itemValue })
         }
         labelFontSize={15}
         rippleOpacity={0.10}
         data={soldhomesyeardata}
         value={this.state.soldhomesyear}
         baseColor="#576574"
       /> 
       </View>
       </View>
       </View>

            ): null }


          </View>


        </RadioButton>

        </RadioGroup>
        </View>



        



         








<View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Square Feet
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 120,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ sqfeetmin: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={sqfeetmindata}
      value="No min"
      baseColor="#576574"
    /> 
      
    
    </View>
    <View style={{height:70,justifyContent:'center',alignItems:'center',marginHorizontal:3}}>
<Text style={{fontWeight:'400',fontSize:16}}>
    to
</Text>
</View>
             <View style={{height: 50, width: 120, justifyContent:'center'}}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ sqfeetmax: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={sqfeetmaxdata}
      value="No max"
      baseColor="#576574"
    /> 
    </View>

             </View>
         </View>






            <View style={{marginVertical:3}}>
             <Text style={{fontSize:16,fontWeight:'700'}}>
                 Lot Size
             </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             
             <View style={{height: 50, width: 120,justifyContent:'center' }}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ lotsizemin: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={lotsizemindata}
      value="Any"
      baseColor="#576574"
    /> 
      
    
    </View>

    <View style={{height:70,justifyContent:'center',alignItems:'center',marginHorizontal:3}}>
<Text style={{fontWeight:'400',fontSize:16}}>
    to
</Text>
</View>
             <View style={{height: 50, width: 120, justifyContent:'center'}}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ lotsizemax: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={lotsizemaxdata}
      value="Any"
      baseColor="#576574"
    /> 
    </View>

             </View>
         </View>

    


    


<View style={{flexDirection:'row',marginVertical:4}}>
      <Text style={{fontSize:16}}>
                 Must Have Garage
             </Text>     
             <Switch
             onValueChange={()=>this.handlegarage()}
             value={this.state.garage} 
             />
             
              </View>



      <View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 1 })} style={{fontSize:16,fontWeight:'700'}}>
                 Select County
             </Text>
             
    </View>


    <Modal  style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 1}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.listdata}
        uniqueKey="name"
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        selectText="Pick County"
        searchInputPlaceholderText="Search Counties..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null })} />
        
          </View>

          </Modal>





<View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 2 })} style={{fontSize:16,fontWeight:'700'}}>
                 Select City
             </Text>
             
    </View>


    <Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 2}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.citylist}
        uniqueKey="name"
        onSelectedItemsChange={this.onCititesChange}
        selectedItems={this.state.newselectedItems}
        selectText="Pick City"
        searchInputPlaceholderText="Search Cities..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null,selectedItems:null })} />
        
          </View>

          </Modal>




<View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 3 })} style={{fontSize:16,fontWeight:'700'}}>
                 Select Zip
             </Text>
             
    </View>
<Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 3}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.ziplist}
        uniqueKey="name"
        onSelectedItemsChange={this.onZipChange}
        selectedItems={this.state.zipselectedItems}
        selectText="Pick Zip"
        searchInputPlaceholderText="Search Zip..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null, })} />
        
          </View>

          </Modal>





          <View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 4})} style={{fontSize:16,fontWeight:'700'}}>
                 Select Elementary
             </Text>
             
    </View>
<Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 4}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.elemlist}
        uniqueKey="name"
        onSelectedItemsChange={this.onElemChange}
        selectedItems={this.state.elemselectedItems}
        selectText="Select Elementary"
        searchInputPlaceholderText="Search elementary..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null, })} />
        
          </View>

          </Modal>





          <View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 5})} style={{fontSize:16,fontWeight:'700'}}>
                 Select High School
             </Text>
             
    </View>
<Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 5}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.schlist}
        uniqueKey="name"
        onSelectedItemsChange={this.onSchChange}
        selectedItems={this.state.schselectedItems}
        selectText="Select High School"
        searchInputPlaceholderText="Search high school..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null, })} />
        
          </View>

          </Modal>



          <View style={{marginVertical:3}}>
             <Text onPress={()=>this.setState({ visibleModal: 6})} style={{fontSize:16,fontWeight:'700'}}>
                 Select District
             </Text>
             
    </View>
<Modal style={{backgroundColor:'white',borderColor:"#0abde3",borderWidth:2,borderRadius:5}} isVisible={this.state.visibleModal === 6}>
               <View style={{height:'80%'}}>
               <MultiSelect
             fixedHeight={true}
        hideSubmitButton
        items={this.state.scdlist}
        uniqueKey="name"
        onSelectedItemsChange={this.onSdChange}
        selectedItems={this.state.sdselectedItems}
        selectText="Select school district"
        searchInputPlaceholderText="Search school district..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#444"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
                 </View>  
                <View style={{flex:1,padding:3}}> 
          <Button title="Done" color="#c39" onPress={()=>this.setState({ visibleModal: null, })} />
        
          </View>

          </Modal> 
          </ScrollView> 
          
                    
    }
        <TouchableOpacity style={{height:40,width:200,justifyContent:'center',alignSelf:'center',borderRadius:4,backgroundColor:'#5C6BC0'}} onPress={()=>this.filter()}>
<Text style={{fontSize:18,alignSelf:'center',color:'white'}}>Filter</Text>


              </TouchableOpacity>

                     
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        
        
        //alignItems: 'center',
        backgroundColor: '#fff',
    },
    gridView: {
        
        flex: 1,
        backgroundColor:'transparent'
      },
      itemContainer: {
        justifyContent: 'center',
        alignItems:'center',

        borderRadius: 5,
        padding: 6,
        height: 100,
      },
      itemName: {
        fontSize: 15,
        color: '#fff',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        
      },
});

//make this component available to the app
export default Filters;
