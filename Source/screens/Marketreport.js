//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Image,TextInput,ScrollView,FlatList } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import axios from 'react-native-axios';
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

// create a component
class Marketreport extends Component {
    static navigationOptions={
        headerTitle:'Create Report',
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
            available:false,
            isModalVisible:false,
            locationselect:'',
            citytoggle:false,
            countytoggle:true,
            ziptoggle:false,
            type:'',
            proptype:'Residential',
            transac:'Sale',
            loctype:'County',
            citylist:[],
            ziplist:[],
            county:'',
            city:'',
            zip:'',
            status:[],
            
            statusdata:[
                {id:0,name:'Cancelled'},
                {id:1,name:'Contingent No Kickout'},
                {id:2,name:'Coming Soon'},
                {id:3,name:'Contingent'},
                {id:4,name:'Contingent Short Sale'},
                {id:5,name:'Expired'},
                {id:6,name:'Incoming'},
                {id:7,name:'Leased'},
                {id:8,name:'Option'},
                {id:9,name:'Pending'},
                {id:10,name:'Temp. Off Mrkt'},
                {id:11,name:'Withdrawn'},



                


        ]
        }
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
   
    generate(){
        console.log(this.state)
        console.log(this.state.status)
        console.log(this.state.proptype)
        console.log(this.state.locationselect)
        axios.get('https://app.morelobby.com/api/market_report',{
            params:{
            type: this.state.loctype,
            location: this.state.locationselect,
            prop_type: this.state.proptype,
            Status: (this.state.status),
            Transaction_Type: this.state.transac
            }
        }).then(response=> {
            
            console.log(response)
            this.setState({h1:response.data.data.first_row.title,h2:response.data.data.second_row.title,h3:response.data.data.third_row.title})
            var section1=[ ];
            for(let i=0;i<response.data.data.first_row.headings.length;i++){
                section1.push({heading:response.data.data.first_row.headings[i],value:response.data.data.first_row.values[i]})
            
            }
            console.log(section1)
            this.setState({def1:response.data.data.first_row.headings})
            this.setState({def11:response.data.data.first_row.values})


            var section2=[ ];
            for(let i=0;i<response.data.data.second_row.headings.length;i++){
                section2.push({heading:response.data.data.second_row.headings[i],value:response.data.data.second_row.values[i]})
            }
            this.setState({def2:response.data.data.second_row.headings})
            this.setState({def22:response.data.data.second_row.values})



            var section3=[ ];
            for(let i=0;i<response.data.data.third_row.headings.length;i++){
                section3.push({heading:response.data.data.third_row.headings[i],value:response.data.data.third_row.values[i]})
            }
            this.setState({def3:response.data.data.third_row.headings,
                def33:response.data.data.third_row.values,
                available:true})
            console.log('done')

            this._toggleModal()
            



                
          //this.setState({isVisible:false})      
          }).catch(function(error) {
            console.log(error)
            //this.setState({isVisible:false})      
      
          });




    }


    onCititesChange = newselectedItems => {
        this.setState({ newselectedItems });
        this.setState({locationselect:newselectedItems})
        console.log(this.state.locationselect)
      };


      onZipChange = new2selectedItems => {
        this.setState({ new2selectedItems });
        this.setState({locationselect:new2selectedItems})
        console.log(this.state.locationselect)
      };


      onCountyChange = new3selectedItems => {
        this.setState({ new3selectedItems });
        this.setState({locationselect:new3selectedItems})
        console.log(this.state.locationselect)
      };

      onStatusChange = new4selectedItems => {
        this.setState({ new4selectedItems });
        this.setState({status:new4selectedItems})
        console.log(this.state.status)
      };      

    componentDidMount(){
        axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      //console.log(response.data.data)
      this.setState({cit:response.data.data.city})
      var cnt = [ ];

      for(let i=0;i < this.state.cit.length; i++){

        cnt.push({label:this.state.cit[i].City,value:this.state.cit[i].City})
        
      }
      console.log(cnt)
      this.setState({citylist:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      //this.setState({isVisible:false})      

    });


    axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
        console.log(response.data.data)
        this.setState({zip:response.data.data.zip})
        var cnt = [ ];
  
        for(let i=0;i < this.state.zip.length; i++){
  
          cnt.push({label:Number(this.state.zip[i].Zip_Code),value:Number(this.state.zip[i].Zip_Code)})
          
        }
        console.log(cnt)
        this.setState({ziplist:cnt})
      //this.setState({isVisible:false})      
      }).catch(function(error) {
        console.log(error)
        //this.setState({isVisible:false})      
  
      });



      axios.get('https://app.morelobby.com/api/location_based_filters').then(response=> {
      //console.log(response.data.data)
      this.setState({counties:response.data.data.county})
      console.log(this.state.counties[1].County)
      var cnt = [ ];

      for(let i=0;i < this.state.counties.length; i++){

        cnt.push({label:this.state.counties[i].County,value:this.state.counties[i].County})
        
      }
      console.log(cnt)
      this.setState({listdata:cnt})
    //this.setState({isVisible:false})      
    }).catch(function(error) {
      console.log(error)
      //this.setState({isVisible:false})      

    });





    }


radios(props){
    console.log(props)
    this.setState({proptype:props})
}

radios2(props){
    console.log(props)
    this.setState({transac:props})
}

radios3(props){
    if(props=='County'){
        this.setState({
            type:props,
            countytoggle:true,
            citytoggle:false,ziptoggle:false
        })
    }
    else if(props=='Zip'){
        this.setState({
            type:props,
            ziptoggle:true,
            countytoggle:false,
            citytoggle:false
        })
    }
    else if(props=='City'){
        this.setState({
            type:props,
            citytoggle:true,
            countytoggle:false,
            ziptoggle:false
        })
    }

}
rendervalue(props)
{   if(isNaN(props)){
       return  <Image source={{uri: props}} style={{width:13, height: 13,resizeMode:'contain'}} />
     
}
else {
    return <Text style={{fontSize:9,flexWrap:'wrap',textAlign:'center'}}>{props}</Text>
}
}

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
            <View style={{marginVertical:4,}}>
            <View style={{justifyContent:'center'}}>
            <Text style={{fontWeight:'600',fontSize:17,textAlign:'center'}}>Property Type :</Text>
            </View>
        <RadioGroup
        size={20}
        thickness={2}
        color='#5C6BC0'
        //highlightColor='#ccc8b9'
        onSelect = {(index, value) => this.radios(value)}
        selectedIndex={0} 
        >
        <RadioButton value={'Residential'} >
            <Text>Residential</Text>

        </RadioButton>

        <RadioButton value={'Condo/Cop/Villa'} >
        <Text>Condo/Cop/Villa</Text>


      </RadioButton>

        </RadioGroup>
        </View>




 <View style={{marginVertical:4}}>
            <View style={{justifyContent:'center'}}>
            <Text style={{fontWeight:'600',fontSize:17,textAlign:'center'}}>Transaction Type :</Text>
            </View>
        <RadioGroup
        size={20}
        thickness={2}
        color='#5C6BC0'
        //highlightColor='#ccc8b9'
        onSelect = {(index, value) => this.radios2(value)}
        selectedIndex={0} 
        >
        <RadioButton value={'Sale'} >
            <Text>Sale</Text>

        </RadioButton>

        <RadioButton value={'Lease'} >
        <Text>Lease</Text>


      </RadioButton>

        </RadioGroup>
        </View>



           
    <Modal isModalVisible={this.state.available} style={{backgroundColor:'#ECF0F1',borderColor:"#ECECEC",borderWidth:2,borderRadius:5,margin:0}} isVisible={this.state.isModalVisible}>
   <View style={{borderColor:'red',borderWidth:1,flexDirection:'column',height:'100%'}}>
    
          <View style={{marginVertical:9}}>
        <Text style={{alignSelf:'center',fontSize:15,fontWeight:'700',color:'#26A65B',textAlign:'justify'}}>{this.state.h1}</Text>
    

        <Table  style={{marginHorizontal:3}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.def1} style={styles.head} textStyle={{fontSize:9}}/>
          <Row data={this.state.def11} textStyle={styles.text}/>
        </Table>
        </View>  




<View style={{marginVertical:9}}>
        <Text style={{alignSelf:'center',fontSize:15,fontWeight:'700',color:'#26A65B',textAlign:'justify'}}>{this.state.h2}</Text>
    

        <Table  style={{marginHorizontal:3}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.def2} style={styles.head} textStyle={{fontSize:9}}/>
          <Row data={this.state.def22} textStyle={styles.text}/>
        </Table>
        </View> 


        <View style={{marginVertical:9}}>
        <Text style={{alignSelf:'center',fontSize:15,fontWeight:'700',color:'#26A65B',textAlign:'justify'}}>{this.state.h3}</Text>
    

        <Table  style={{marginHorizontal:3}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.def3} style={styles.head} textStyle={{fontSize:9}}/>
          <Row data={this.state.def33} textStyle={styles.text}/>
        </Table>
        </View>      
            

       

      






    




    <View style={{justifyContent:"flex-end",bottom:0,}}>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toggleModal()} style={{backgroundColor:'#5C6BC0',borderRadius:2,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
                <Text style={{fontSize:17,includeFontPadding:true,color:'#fff'}}>DONE</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toggleModal()} style={{backgroundColor:'#26A65B',borderRadius:2,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
                <Text style={{fontSize:17,includeFontPadding:true,color:'#fff'}}>SAVE</Text>
            </TouchableOpacity>

    </View>
    </View>
    </Modal>





           

 <View style={{marginVertical:4}}>
            <View style={{justifyContent:'center'}}>
            <Text style={{fontWeight:'600',fontSize:17,textAlign:'center'}}>Location Type :</Text>
            </View>
        
        <RadioGroup
        size={20}
        thickness={2}
        color='#5C6BC0'
        //highlightColor='#ccc8b9'
        onSelect = {(index, value) => this.radios3(value)}
        selectedIndex={0} 
        >

        <RadioButton value={'County'} >
            <Text>County</Text>

        </RadioButton>

        <RadioButton value={'City'} >
        <Text>City</Text>


      </RadioButton>

      <RadioButton value={'Zip'} >
        <Text>Zip</Text>


      </RadioButton>

        </RadioGroup>
        </View>
 

            {this.state.citytoggle ? 
            <View style={{width:'80%', alignSelf:'center'}}>
            <Dropdown
     onChangeText={(itemValue, itemIndex) =>
       this.setState({ locationselect: itemValue })
     }
     labelFontSize={15}
     rippleOpacity={0.10}
     data={this.state.citylist}
     value="select a value"
     baseColor="#576574"
   /> 
   </View>
            :null}



            {this.state.ziptoggle ? 
            
            <View style={{width:'80%', alignSelf:'center'}}>
             <Dropdown
      onChangeText={(itemValue, itemIndex) =>
        this.setState({ locationselect: itemValue })
      }
      labelFontSize={15}
      rippleOpacity={0.10}
      data={this.state.ziplist}
      value="select a value"
      baseColor="#576574"
    /> 
    </View>
            : null}



            {this.state.countytoggle ?  
          <View style={{width:'80%', alignSelf:'center'}}>
          <Dropdown
   onChangeText={(itemValue, itemIndex) =>
     this.setState({ locationselect: itemValue })
   }
   labelFontSize={15}
   rippleOpacity={0.10}
   data={this.state.listdata}
   value="select a value"
   baseColor="#576574"
 /> 
 </View>
            : null}
            

            <Text style={{fontWeight:'600',fontSize:17,textAlign:'center',top:4}}>Status :</Text>

            <View style={{width:'95%',alignSelf:'center',marginVertical:10}}>
            <MultiSelect
        numberofLines={5}
        fixedHeight={true}
        hideSubmitButton
        items={this.state.statusdata}
        uniqueKey="name"
        onSelectedItemsChange={this.onStatusChange}
        selectedItems={this.state.new4selectedItems}
        selectText=" "
        searchInputPlaceholderText="Search Status..."
        tagRemoveIconColor="#913D88"
        tagBorderColor="#9A12B3"
        tagTextColor="#000"
        selectedItemTextColor="#444"
        selectedItemIconColor='green'
        itemTextColor="#000"
        searchInputStyle={{ color: '#2d3436',height:40}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
            </View> 





<TouchableOpacity activeOpacity={0.8} onPress={()=>this.generate()} style={{backgroundColor:'#5C6BC0',borderRadius:2,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10,alignSelf:'center'}}>
                <Text style={{fontSize:17,includeFontPadding:true,color:'#fff'}}>SUBMIT</Text>
            </TouchableOpacity>

            </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    head: { height: 70, backgroundColor: '#f1f8ff' },
  text: { margin:2,fontSize:12,flexWrap:'wrap',textAlign:'center' }
});

//make this component available to the app
export default Marketreport;
